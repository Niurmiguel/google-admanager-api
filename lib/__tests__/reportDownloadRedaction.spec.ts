/**
 * A report download URL is signed: its query is a credential. When the
 * download fails, the error must name the URL without it.
 */
import { mkdtemp, rm } from 'node:fs/promises';
import { createServer, Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Readable } from 'node:stream';
import { inspect } from 'node:util';

import { ReportService } from '../client';
import { ReportJobStatus } from '../client/services/report/report.enum';
import { AdsReportsException } from '../common/handlers';
import { AdManagerRequestError, HttpUtilities } from '../common/utils';
import { ReportResponse } from '../common/utils/reports';
import { ReportUtilities } from '../common/utils/reportUtilities.util';
import { listenOnLoopback } from './support/loopback';

/** Obviously fake, so secret scanners do not flag it. */
const SIGNATURE = 'fake-signature-for-tests-0000';
const QUERY = `?GoogleAccessId=tests%40example.invalid&Expires=1&Signature=${SIGNATURE}`;

function expectNoSignature(err: unknown) {
  expect(inspect(err, { depth: Infinity, showHidden: true })).not.toContain(SIGNATURE);
  expect(JSON.stringify(err) ?? '').not.toContain(SIGNATURE);
  expect(String(err)).not.toContain(SIGNATURE);
}

async function rejection(promise: Promise<unknown>) {
  return promise.then(
    () => {
      throw new Error('expected a rejection');
    },
    (err: unknown) => err,
  );
}

describe('failed report downloads do not expose the signed URL', () => {
  let server: Server;
  let base: string;
  let dir: string;

  beforeAll(async () => {
    server = createServer((req, res) => {
      if (req.url.startsWith('/forbidden')) {
        res.writeHead(403, { 'content-type': 'text/plain' });
        res.end('denied');
      } else if (req.url.startsWith('/reset')) {
        req.socket.destroy();
      } else if (req.url.startsWith('/stalls')) {
        res.writeHead(200, { 'content-type': 'text/csv' });
        res.write('a,b\n'); // then silence
      }
      // '/never-answers': no headers at all.
    });
    base = await listenOnLoopback(server);
    dir = await mkdtemp(join(tmpdir(), 'admanager-report-'));
  });

  afterAll(async () => {
    server.closeAllConnections();
    server.close();
    await rm(dir, { recursive: true, force: true });
  });

  const openSockets = () =>
    new Promise<number>((resolve, reject) => server.getConnections((e, n) => (e ? reject(e) : resolve(n))));

  it('HTTP error status: AdsReportsException with origin and path, status in the cause', async () => {
    const err = await rejection(HttpUtilities.buildRequest(`${base}/forbidden/report.csv${QUERY}`, 'GET', {}));

    expect(err).toBeInstanceOf(AdsReportsException);
    expect((err as Error).message).toBe(
      `Failed to download the report from ${base}/forbidden/report.csv: Request failed with status code 403`,
    );
    const cause = (err as Error).cause as AdManagerRequestError;
    expect(cause).toBeInstanceOf(AdManagerRequestError);
    expect(cause).toMatchObject({ status: 403, code: 'ERR_BAD_REQUEST', response: { status: 403 } });
    expect((err as AdsReportsException).innerException).toBe(cause);
    expectNoSignature(err);
  });

  it('frees the socket of the error response', async () => {
    await rejection(HttpUtilities.buildRequest(`${base}/forbidden/again.csv${QUERY}`, 'GET', {}));

    for (let i = 0; i < 100 && (await openSockets()) > 0; i++) await new Promise((r) => setTimeout(r, 10));
    expect(await openSockets()).toBe(0);
  });

  it('network error', async () => {
    const err = await rejection(HttpUtilities.buildRequest(`${base}/reset/report.csv${QUERY}`, 'GET', {}));

    expect(err).toBeInstanceOf(AdsReportsException);
    expect((err as Error).cause).toMatchObject({ code: 'ECONNRESET' });
    expectNoSignature(err);
  });

  const utilitiesFor = (path: string) =>
    new ReportUtilities(
      {
        getReportJobStatus: async () => ReportJobStatus.COMPLETED,
        getReportDownloadUrlWithOptions: async () => `${base}${path}${QUERY}`,
      } as unknown as ReportService,
      42,
    );

  it('through ReportUtilities.getResponse', async () => {
    const err = await rejection(utilitiesFor('/forbidden/report.csv').getResponse());

    expect(err).toBeInstanceOf(AdsReportsException);
    expectNoSignature(err);
  });

  it('when the response headers do not arrive in time', async () => {
    const err = await rejection(utilitiesFor('/never-answers/report.csv').getResponse({ downloadTimeoutMs: 100 }));

    expect(err).toBeInstanceOf(AdsReportsException);
    expect((err as Error).message).toBe(
      `Failed to download the report from ${base}/never-answers/report.csv: timeout of 100ms exceeded`,
    );
    expectNoSignature(err);
  });

  it('when the download stalls while saving, through getResponse', async () => {
    // Long enough for the headers to arrive on a busy machine; the save then stalls past it.
    const response = await utilitiesFor('/stalls/report.csv').getResponse({ downloadTimeoutMs: 600 });

    const err = await rejection(response.save(join(dir, 'stalled-again.csv')));

    expect(err).toBeInstanceOf(AdsReportsException);
    expectNoSignature(err);
  });

  // Neither axios nor Node quote the URL in their messages today, but an
  // adapter or an application's axios interceptor may: the query is removed
  // from any message or stack copied into the error.
  it('when the error message quotes the URL', async () => {
    const err = await rejection(
      HttpUtilities.buildRequest(`${base}/quoted/report.csv${QUERY}`, 'GET', {
        adapter: async (config) => {
          throw new Error(`GET ${config.url} failed`);
        },
      }),
    );

    expect((err as Error).message).toBe(
      `Failed to download the report from ${base}/quoted/report.csv: GET ${base}/quoted/report.csv failed`,
    );
    expectNoSignature(err);
  });

  it('when the error of the body while saving quotes the URL', async () => {
    const response = new ReportResponse(
      await HttpUtilities.buildRequest(`${base}/quoted/report.csv${QUERY}`, 'GET', {
        adapter: async (config) => ({
          data: new Readable({
            read() {
              this.destroy(new Error(`reading ${config.url} failed`));
            },
          }),
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        }),
      }),
    );

    const err = await rejection(response.save(join(dir, 'quoted.csv')));

    expect((err as AdsReportsException).innerException).toMatchObject({
      message: `reading ${base}/quoted/report.csv failed`,
    });
    expectNoSignature(err);
  });

  it('when the download fails while saving', async () => {
    const response = new ReportResponse(
      await HttpUtilities.buildRequest(`${base}/stalls/report.csv${QUERY}`, 'GET', { timeout: 100 }),
    );

    const err = await rejection(response.save(join(dir, 'stalled.csv')));

    expect(err).toBeInstanceOf(AdsReportsException);
    expect((err as Error).message).toBe('Failed to save report. See inner exception for more details.');
    // The response stream fails with "aborted" when axios gives up on it.
    expect((err as AdsReportsException).innerException).toMatchObject({ message: expect.any(String) });
    expect((err as Error).cause).toBe((err as AdsReportsException).innerException);
    expectNoSignature(err);
  });
});
