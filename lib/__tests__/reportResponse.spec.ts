/**
 * ReportResponse.save() against a loopback HTTP server, through
 * ReportUtilities.getResponse() as an application calls it.
 */
import { mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { createServer, Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { ReportService } from '../client';
import { ReportJobStatus } from '../client/services/report/report.enum';
import { AdsReportsException } from '../common/handlers';
import { ReportResponse } from '../common/utils/reports';
import { ReportUtilities } from '../common/utils/reportUtilities.util';
import { listenOnLoopback } from './support/loopback';

const REPORT = 'a,b\n1,2\n';
const ALREADY_READ = /already read: save\(\) can be called only once/;

describe('ReportResponse.save()', () => {
  let server: Server;
  let base: string;
  let dir: string;

  beforeAll(async () => {
    server = createServer((req, res) => {
      res.writeHead(200, { 'content-type': 'text/csv' });
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

  async function getResponse(): Promise<ReportResponse> {
    const service = {
      getReportJobStatus: async () => ReportJobStatus.COMPLETED,
      getReportDownloadUrlWithOptions: async () => `${base}/report.csv`,
    } as unknown as ReportService;
    return new ReportUtilities(service, 42).getResponse();
  }

  const exists = (path: string) =>
    stat(path).then(
      () => true,
      () => false,
    );

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
