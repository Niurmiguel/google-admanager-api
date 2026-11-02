/**
 * ReportResponse.save() against a loopback HTTP server, through
 * ReportUtilities.getResponse() as an application calls it.
 */
import { getEventListeners } from 'node:events';
import { mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { createServer, Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

import { ReportService } from '../client';
import { ReportJobStatus } from '../client/services/report/report.enum';
import { AdsReportsException } from '../common/handlers';
import { AdManagerRequestError } from '../common/utils';
import { ReportResponse, ReportResponseOptions } from '../common/utils/reports';
import { ReportUtilities } from '../common/utils/reportUtilities.util';
import { listenOnLoopback } from './support/loopback';

const REPORT = 'a,b\n1,2\n';
/** Larger than the socket and stream buffers, so the server is left waiting on an unread response. */
const BIG_REPORT = Buffer.alloc(8 * 1024 * 1024, 'x');
const ALREADY_READ = /already read: save\(\) can be called only once/;
/**
 * Download timeout of the timing tests. Large enough that a loaded machine
 * does not pause a healthy transfer that long; the tests wait well past it.
 */
const TIMEOUT_MS = 1_000;

// Real sockets and an 8 MiB body: slower than Jest's 5 s default on a busy machine.
jest.setTimeout(30_000);

describe('ReportResponse.save()', () => {
  let server: Server;
  let base: string;
  let dir: string;
  const requests: Record<string, number> = {};

  beforeAll(async () => {
    server = createServer((req, res) => {
      // Counted by full URL: each test that counts uses its own query, so a
      // late request from another test cannot change its count.
      requests[req.url] = (requests[req.url] ?? 0) + 1;
      const path = req.url.split('?')[0];
      res.writeHead(200, { 'content-type': 'text/csv' });
      if (path === '/big.csv') return res.end(BIG_REPORT);
      if (path === '/stalls.csv') return res.write('a,b\n'); // then silence
      res.end(REPORT);
    });
    base = await listenOnLoopback(server);
    dir = await mkdtemp(join(tmpdir(), 'admanager-report-'));
  });

  afterAll(async () => {
    server.closeAllConnections();
    server.close();
    await rm(dir, { recursive: true, force: true });
  });

  beforeEach(() => {
    for (const path of Object.keys(requests)) delete requests[path];
  });

  async function getResponse(path = '/report.csv', options?: ReportResponseOptions): Promise<ReportResponse> {
    const service = {
      getReportJobStatus: async () => ReportJobStatus.COMPLETED,
      getReportDownloadUrlWithOptions: async () => `${base}${path}`,
    } as unknown as ReportService;
    return new ReportUtilities(service, 42).getResponse(options);
  }

  const exists = (path: string) =>
    stat(path).then(
      () => true,
      () => false,
    );

  const openConnections = () =>
    new Promise<number>((resolve, reject) => server.getConnections((e, n) => (e ? reject(e) : resolve(n))));

  /** Waits up to `ms` for the server to have no open connection. */
  async function connectionsAfter(ms: number): Promise<number> {
    const until = Date.now() + ms;
    while ((await openConnections()) > 0 && Date.now() < until) await sleep(10);
    return openConnections();
  }

  describe('called more than once', () => {
    it('rejects a second call instead of truncating the saved file', async () => {
      const response = await getResponse();
      const file = join(dir, 'twice.csv');
      await response.save(file);

      const second = response.save(file);

      await expect(second).rejects.toThrow(AdsReportsException);
      await expect(second).rejects.toThrow(ALREADY_READ);
      expect(await readFile(file, 'utf8')).toBe(REPORT);
    });

    it('rejects a second call to another path without creating the file', async () => {
      const response = await getResponse();
      await response.save(join(dir, 'first.csv'));
      const other = join(dir, 'other.csv');

      await expect(response.save(other)).rejects.toThrow(ALREADY_READ);
      expect(await exists(other)).toBe(false);
    });

    it('rejects a concurrent second call, and the first one saves the whole report', async () => {
      const response = await getResponse();
      const first = join(dir, 'concurrent-1.csv');
      const second = join(dir, 'concurrent-2.csv');

      const results = await Promise.allSettled([response.save(first), response.save(second)]);

      expect(results[0]).toEqual({ status: 'fulfilled', value: undefined });
      expect(results[1]).toMatchObject({ status: 'rejected', reason: expect.any(AdsReportsException) });
      expect(await readFile(first, 'utf8')).toBe(REPORT);
      expect(await exists(second)).toBe(false);
    });

    it('rejects a retry after a failed save instead of writing an empty file', async () => {
      const response = await getResponse();
      const retry = join(dir, 'retry.csv');
      await writeFile(retry, 'previous contents');

      await expect(response.save(join(dir, 'missing-dir', 'report.csv'))).rejects.toThrow(
        'Failed to save report. See inner exception for more details.',
      );
      await expect(response.save(retry)).rejects.toThrow(ALREADY_READ);
      expect(await readFile(retry, 'utf8')).toBe('previous contents');
    });
  });

  describe('download timeout', () => {
    it.each([
      ['a small report', '/report.csv', Buffer.from(REPORT)],
      ['a report larger than the socket buffers', '/big.csv', BIG_REPORT],
    ])('saves %s when save() is called long after getResponse()', async (_name, path, expected) => {
      const response = await getResponse(path, { downloadTimeoutMs: TIMEOUT_MS });
      await sleep(TIMEOUT_MS * 2.5);
      const file = join(dir, 'late.csv');

      await response.save(file);

      expect((await readFile(file)).equals(expected)).toBe(true);
    });

    it('releases the connection of an unread response after downloadTimeoutMs, and save() requests it again', async () => {
      const response = await getResponse('/big.csv?case=released', { downloadTimeoutMs: TIMEOUT_MS });
      expect(await openConnections()).toBe(1);

      expect(await connectionsAfter(TIMEOUT_MS * 5)).toBe(0);

      const file = join(dir, 'again.csv');
      await response.save(file);
      expect((await readFile(file)).equals(BIG_REPORT)).toBe(true);
      expect(requests['/big.csv?case=released']).toBe(2);
    });

    it('reads a response saved right away from the first request', async () => {
      const response = await getResponse('/big.csv?case=prompt', { downloadTimeoutMs: 10 * TIMEOUT_MS });

      await response.save(join(dir, 'prompt.csv'));

      expect(requests['/big.csv?case=prompt']).toBe(1);
    });

    it('fails a save that receives nothing for downloadTimeoutMs, and frees the connection', async () => {
      const response = await getResponse('/stalls.csv', { downloadTimeoutMs: TIMEOUT_MS });

      const err: unknown = await response.save(join(dir, 'stalled.csv')).catch((e: unknown) => e);

      expect(err).toBeInstanceOf(AdsReportsException);
      expect((err as Error).message).toBe(`Failed to save report: the server sent nothing for ${TIMEOUT_MS} ms.`);
      expect((err as Error).cause).toBeInstanceOf(AdManagerRequestError);
      expect((err as Error).cause).toMatchObject({
        code: 'ECONNABORTED',
        message: `timeout of ${TIMEOUT_MS}ms exceeded`,
      });
      expect(await connectionsAfter(5_000)).toBe(0);
    });
  });

  describe('signal', () => {
    it('aborting before save() makes it reject with the reason, and frees the connection', async () => {
      const controller = new AbortController();
      const response = await getResponse('/big.csv', { signal: controller.signal });
      const reason = new Error('shutting down');

      controller.abort(reason);

      await expect(response.save(join(dir, 'aborted-before.csv'))).rejects.toBe(reason);
      expect(await connectionsAfter(5_000)).toBe(0);
    });

    it('aborting while save() reads the report makes it reject with the reason', async () => {
      const controller = new AbortController();
      const response = await getResponse('/stalls.csv', { signal: controller.signal });
      const reason = new Error('shutting down');

      const saving = response.save(join(dir, 'aborted-during.csv'));
      await sleep(100);
      controller.abort(reason);

      await expect(saving).rejects.toBe(reason);
      expect(await connectionsAfter(5_000)).toBe(0);
    });

    it('leaves no listener on a long-lived signal once the report is saved', async () => {
      const controller = new AbortController();

      for (let i = 0; i < 3; i++) {
        const response = await getResponse('/report.csv', { signal: controller.signal });
        await response.save(join(dir, `listeners-${i}.csv`));
      }

      expect(getEventListeners(controller.signal, 'abort')).toHaveLength(0);
    });
  });
});
