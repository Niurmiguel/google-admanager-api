/**
 * Report polling in ReportUtilities.getResponse, driven with Jest fake timers
 * and a fake ReportService that counts status checks.
 */
import { AxiosResponse } from 'axios';
import { once } from 'node:events';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { createServer, Server } from 'node:http';
import { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { ReportService } from '../client';
import { ReportJobStatus } from '../client/services/report/report.enum';
import { AdsReportsException } from '../common/handlers';
import { HttpUtilities } from '../common/utils';
import { ReportResponse } from '../common/utils/reports';
import { ReportUtilities } from '../common/utils/reportUtilities.util';

// Jest fake timers do not patch node:timers/promises, so route it through the
// global setTimeout, which they do patch. Same contract: resolves after `ms`,
// rejects with an AbortError when the signal aborts.
jest.mock('node:timers/promises', () => ({
  setTimeout: (ms: number, value?: unknown, options?: { signal?: AbortSignal }) =>
    new Promise((resolve, reject) => {
      const signal = options?.signal;
      const abortError = () => Object.assign(new Error('The operation was aborted'), { name: 'AbortError' });
      if (signal?.aborted) return reject(abortError());
      const onAbort = () => {
        clearTimeout(timer);
        reject(abortError());
      };
      const timer = setTimeout(() => {
        signal?.removeEventListener('abort', onAbort);
        resolve(value);
      }, ms);
      signal?.addEventListener('abort', onAbort, { once: true });
    }),
}));

const DOWNLOAD_URL = 'https://storage.example/report.csv.gz';

function fakeReportService(statuses: ReportJobStatus[]) {
  const service = {
    statusChecks: 0,
    getReportJobStatus: jest.fn(async () => {
      const status = statuses[Math.min(service.statusChecks, statuses.length - 1)];
      service.statusChecks++;
      return status;
    }),
    getReportDownloadUrlWithOptions: jest.fn(async () => DOWNLOAD_URL),
  };
  return service;
}

function utilitiesFor(service: { getReportJobStatus: unknown; getReportDownloadUrlWithOptions: unknown }) {
  return new ReportUtilities(service as unknown as ReportService, 42);
}

/** Lets the pending promise chain run without moving the clock. */
const flush = () => jest.advanceTimersByTimeAsync(0);

const { IN_PROGRESS, COMPLETED, FAILED } = ReportJobStatus;

describe('ReportUtilities.getResponse', () => {
  let buildRequest: jest.SpiedFunction<typeof HttpUtilities.buildRequest>;

  beforeEach(() => {
    jest.useFakeTimers();
    buildRequest = jest
      .spyOn(HttpUtilities, 'buildRequest')
      .mockResolvedValue({ data: 'report' } as unknown as AxiosResponse);
  });

  afterEach(() => {
    buildRequest.mockRestore();
    jest.useRealTimers();
  });

  it('waits between status checks with backoff from 5 s, x1.5, capped at 60 s', async () => {
    const service = fakeReportService([...Array(9).fill(IN_PROGRESS), COMPLETED]);
    const response = utilitiesFor(service).getResponse();

    await flush();
    expect(service.statusChecks).toBe(1);

    // 5 s, then x1.5 rounded to whole milliseconds, capped at 60 s.
    const waits = [5_000, 7_500, 11_250, 16_875, 25_313, 37_970, 56_955, 60_000, 60_000];
    for (const [i, wait] of waits.entries()) {
      await jest.advanceTimersByTimeAsync(wait - 1);
      expect(service.statusChecks).toBe(i + 1);
      await jest.advanceTimersByTimeAsync(1);
      expect(service.statusChecks).toBe(i + 2);
    }

    await expect(response).resolves.toBeDefined();
    expect(service.getReportDownloadUrlWithOptions).toHaveBeenCalledTimes(1);
  });

  it('accepts custom backoff settings', async () => {
    const service = fakeReportService([IN_PROGRESS, IN_PROGRESS, IN_PROGRESS, COMPLETED]);
    const response = utilitiesFor(service).getResponse({ initialDelayMs: 1_000, backoffFactor: 2, maxDelayMs: 3_000 });

    await flush();
    await jest.advanceTimersByTimeAsync(1_000);
    expect(service.statusChecks).toBe(2);
    await jest.advanceTimersByTimeAsync(2_000);
    expect(service.statusChecks).toBe(3);
    await jest.advanceTimersByTimeAsync(3_000);
    expect(service.statusChecks).toBe(4);

    await expect(response).resolves.toBeDefined();
  });

  it('fails with AdsReportsException when the job is still running at the deadline', async () => {
    const service = fakeReportService([IN_PROGRESS]);
    const response = utilitiesFor(service).getResponse({ timeoutMs: 20_000 });
    const settled = expect(response).rejects.toThrow(AdsReportsException);

    // Checks at 0, 5 s, 12.5 s and a last one at the 20 s deadline.
    await jest.advanceTimersByTimeAsync(20_000);
    await settled;
    expect(service.statusChecks).toBe(4);
    await expect(response).rejects.toThrow('Report job 42 did not complete within 20000 ms.');
    expect(service.getReportDownloadUrlWithOptions).not.toHaveBeenCalled();
  });

  it('defaults to a finite deadline of 30 minutes', async () => {
    const service = fakeReportService([IN_PROGRESS]);
    const response = utilitiesFor(service).getResponse();
    const settled = expect(response).rejects.toThrow(AdsReportsException);

    await jest.advanceTimersByTimeAsync(30 * 60_000);
    await settled;
  });

  it('fails when the job fails', async () => {
    const service = fakeReportService([IN_PROGRESS, FAILED]);
    const response = utilitiesFor(service).getResponse();
    const settled = expect(response).rejects.toThrow(new AdsReportsException('Report job 42 failed.'));

    await jest.advanceTimersByTimeAsync(5_000);
    await settled;
    expect(service.statusChecks).toBe(2);
  });

  it('stops waiting when the signal aborts, rejecting with its reason', async () => {
    const service = fakeReportService([IN_PROGRESS]);
    const controller = new AbortController();
    const response = utilitiesFor(service).getResponse({ signal: controller.signal });
    const reason = new Error('shutting down');
    const settled = expect(response).rejects.toBe(reason);

    await jest.advanceTimersByTimeAsync(2_000);
    controller.abort(reason);
    await settled;

    await jest.advanceTimersByTimeAsync(10 * 60_000);
    expect(service.statusChecks).toBe(1);
  });

  it('does not start when the signal is already aborted', async () => {
    const service = fakeReportService([COMPLETED]);
    const controller = new AbortController();
    controller.abort();

    await expect(utilitiesFor(service).getResponse({ signal: controller.signal })).rejects.toMatchObject({
      name: 'AbortError',
    });
    expect(service.statusChecks).toBe(0);
  });

  it('rejects invalid polling options', async () => {
    const service = fakeReportService([COMPLETED]);

    await expect(utilitiesFor(service).getResponse({ initialDelayMs: 0 })).rejects.toThrow(RangeError);
    await expect(utilitiesFor(service).getResponse({ backoffFactor: 0.5 })).rejects.toThrow(RangeError);
    await expect(utilitiesFor(service).getResponse({ timeoutMs: -1 })).rejects.toThrow(RangeError);
    expect(service.statusChecks).toBe(0);
  });

  describe('API calls that never answer', () => {
    const never = () => new Promise<never>(() => undefined);

    /** Tracks whether `promise` settled, without awaiting it. */
    function track(promise: Promise<unknown>) {
      const state = { settled: false, reason: undefined as unknown };
      promise.catch((reason: unknown) => {
        state.settled = true;
        state.reason = reason;
      });
      return state;
    }

    it('a hanging status check fails at the deadline (timeoutMs 200, abort at 300)', async () => {
      const service = fakeReportService([IN_PROGRESS]);
      service.getReportJobStatus.mockImplementation(never);
      const controller = new AbortController();
      const response = utilitiesFor(service).getResponse({ timeoutMs: 200, signal: controller.signal });
      const state = track(response);

      await jest.advanceTimersByTimeAsync(300);
      controller.abort(new Error('too late'));
      await jest.advanceTimersByTimeAsync(1_200);

      expect(state.settled).toBe(true);
      expect(state.reason).toBeInstanceOf(AdsReportsException);
      expect(state.reason).toMatchObject({ message: 'Report job 42 did not complete within 200 ms.' });
    });

    it('a hanging status check stops when the signal aborts, with its reason', async () => {
      const service = fakeReportService([IN_PROGRESS]);
      service.getReportJobStatus.mockImplementation(never);
      const controller = new AbortController();
      const response = utilitiesFor(service).getResponse({ signal: controller.signal });
      const state = track(response);
      const reason = new Error('shutting down');

      await jest.advanceTimersByTimeAsync(300);
      controller.abort(reason);
      await flush();

      expect(state).toEqual({ settled: true, reason });
    });

    it('a hanging download URL call stops when the signal aborts, with its reason', async () => {
      const service = fakeReportService([COMPLETED]);
      service.getReportDownloadUrlWithOptions.mockImplementation(never);
      const controller = new AbortController();
      const response = utilitiesFor(service).getResponse({ signal: controller.signal });
      const state = track(response);
      const reason = new Error('shutting down');

      await jest.advanceTimersByTimeAsync(300);
      controller.abort(reason);
      await flush();

      expect(state).toEqual({ settled: true, reason });
      expect(buildRequest).not.toHaveBeenCalled();
    });

    it('a hanging download URL call fails at the deadline', async () => {
      const service = fakeReportService([COMPLETED]);
      service.getReportDownloadUrlWithOptions.mockImplementation(never);
      const state = track(utilitiesFor(service).getResponse({ timeoutMs: 200 }));

      await jest.advanceTimersByTimeAsync(200);

      expect(state.settled).toBe(true);
      expect(state.reason).toBeInstanceOf(AdsReportsException);
    });
  });

  it('aborting during the download rejects with the reason, not with the HTTP client error', async () => {
    const service = fakeReportService([COMPLETED]);
    buildRequest.mockImplementation(
      (_url, _method, config) =>
        new Promise((_resolve, reject) =>
          config.signal?.addEventListener('abort', () =>
            reject(Object.assign(new Error('canceled'), { name: 'CanceledError', code: 'ERR_CANCELED' })),
          ),
        ),
    );
    const controller = new AbortController();
    const response = utilitiesFor(service).getResponse({ signal: controller.signal });
    const reason = new Error('shutting down');
    const settled = expect(response).rejects.toBe(reason);

    await flush();
    expect(buildRequest).toHaveBeenCalledTimes(1);
    controller.abort(reason);
    await settled;
  });

  it('downloads with a bounded timeout by default, and a configurable one', async () => {
    const service = fakeReportService([COMPLETED]);

    await utilitiesFor(service).getResponse();
    expect(buildRequest).toHaveBeenLastCalledWith(DOWNLOAD_URL, 'GET', expect.objectContaining({ timeout: 60_000 }));

    const controller = new AbortController();
    await utilitiesFor(service).getResponse({ downloadTimeoutMs: 5_000, signal: controller.signal });
    expect(buildRequest).toHaveBeenLastCalledWith(
      DOWNLOAD_URL,
      'GET',
      expect.objectContaining({ timeout: 5_000, signal: controller.signal }),
    );
  });
});

describe('ReportUtilities download timeout (real HTTP server)', () => {
  let server: Server;
  let baseUrl: string;
  let dir: string;

  beforeAll(async () => {
    server = createServer((req, res) => {
      if (req.url === '/never-answers') return; // keeps the socket open without headers
      res.writeHead(200, { 'content-type': 'text/csv' });
      res.write('a,b\n');
      if (req.url === '/stalls') return; // headers and a first chunk, then silence
      // The rest in chunks 50 ms apart: 300 ms in total, longer than the timeout.
      let row = 0;
      const timer = setInterval(() => {
        row++;
        res.write(`${row},${row}\n`);
        if (row === 6) {
          clearInterval(timer);
          res.end();
        }
      }, 50);
    });
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    dir = await mkdtemp(join(tmpdir(), 'admanager-report-'));
  });

  afterAll(async () => {
    server.closeAllConnections();
    server.close();
    await rm(dir, { recursive: true, force: true });
  });

  const serviceFor = (path: string) => ({
    getReportJobStatus: async () => ReportJobStatus.COMPLETED,
    getReportDownloadUrlWithOptions: async () => `${baseUrl}${path}`,
  });

  it('gives up when the server does not start answering in time', async () => {
    await expect(utilitiesFor(serviceFor('/never-answers')).getResponse({ downloadTimeoutMs: 100 })).rejects.toThrow(
      'timeout of 100ms exceeded',
    );
  });

  it('does not cap the total download time while data keeps arriving', async () => {
    const response: ReportResponse = await utilitiesFor(serviceFor('/slow-body')).getResponse({
      downloadTimeoutMs: 150,
    });
    const file = join(dir, 'slow.csv');

    await response.save(file);

    expect(await readFile(file, 'utf8')).toBe('a,b\n1,1\n2,2\n3,3\n4,4\n5,5\n6,6\n');
  });

  it('fails the save, instead of hanging, when the download stalls', async () => {
    const response: ReportResponse = await utilitiesFor(serviceFor('/stalls')).getResponse({
      downloadTimeoutMs: 150,
    });

    await expect(response.save(join(dir, 'stalled.csv'))).rejects.toThrow(AdsReportsException);
  });
});
