/**
 * Logging the library's objects must not print credentials. util.inspect
 * (console.log) walks objects at any depth and goes through Proxies to their
 * target: a service reached its SOAP client, which holds the OAuth token
 * (`security`, `lastRequestHeaders`); a report response reached the signed
 * download URL; a credential, the private key.
 */
import { generateKeyPairSync } from 'node:crypto';
import { createServer, Server } from 'node:http';
import { inspect } from 'node:util';

import { GoogleSACredential, GoogleSAFileCredential } from '../auth';
import { AdManagerClient, CompanyService, ReportService } from '../client';
import { ReportJobStatus } from '../client/services/report/report.enum';
import { StatementBuilder } from '../common/utils';
import { ReportResponse } from '../common/utils/reports';
import { ReportDownload } from '../common/utils/reports/reportDownload';
import { ReportUtilities } from '../common/utils/reportUtilities.util';
import { listenOnLoopback } from './support/loopback';
import { FAKE_TOKEN, FakeAdManager, okEnvelope, startFakeAdManager } from './support/fakeAdManager';

let mockWsdlUrl = '';
jest.mock('soap', () => {
  const actual = jest.requireActual('soap');
  return {
    ...actual,
    createClientAsync: (_url: string, options?: object) => actual.createClientAsync(mockWsdlUrl, options),
  };
});

jest.setTimeout(30_000);

const SIGNATURE = 'fake-signature-for-tests-0000';
const QUERY = `?GoogleAccessId=tests%40example.invalid&Expires=1&Signature=${SIGNATURE}`;

/** What console.log prints, at any depth. `showHidden` also shows non-enumerable properties. */
const dump = (value: unknown, showHidden = false) => inspect(value, { depth: Infinity, showHidden });

describe('a service after a call', () => {
  let fake: FakeAdManager;
  let companies: CompanyService;

  beforeAll(async () => {
    fake = await startFakeAdManager();
    mockWsdlUrl = fake.wsdlUrl;
    companies = await new AdManagerClient(123, { getToken: async () => FAKE_TOKEN }).getService('CompanyService');
    await companies.getCompaniesByStatement(new StatementBuilder().limit(1).toStatement());
    // The premise: the token went out with the request.
    expect(fake.last?.headers.authorization).toBe(`Bearer ${FAKE_TOKEN}`);
  });

  afterAll(() => fake.close());

  it('does not show the token in console.log', () => {
    expect(dump(companies)).not.toContain(FAKE_TOKEN);
  });

  it('does not show it with showHidden either', () => {
    expect(dump(companies, true)).not.toContain(FAKE_TOKEN);
  });

  it('does not show it in JSON.stringify', () => {
    expect(JSON.stringify(companies)).not.toContain(FAKE_TOKEN);
  });

  it('still works', async () => {
    fake.handler = (_req, res) => res.end(okEnvelope('again'));

    await expect(companies.getCompaniesByStatement(new StatementBuilder().toStatement())).resolves.toBe('again');
  });
});

describe('a report response', () => {
  let server: Server;
  let base: string;

  beforeAll(async () => {
    server = createServer((_req, res) => {
      res.writeHead(200, { 'content-type': 'text/csv' });
      res.end('a,b\n');
    });
    base = await listenOnLoopback(server);
  });

  afterAll(() => {
    server.closeAllConnections();
    server.close();
  });

  const reportService = () =>
    ({
      getReportJobStatus: async () => ReportJobStatus.COMPLETED,
      getReportDownloadUrlWithOptions: async () => `${base}/report.csv${QUERY}`,
    }) as unknown as ReportService;

  it('does not show the signed URL in console.log, with or without showHidden', async () => {
    const response: ReportResponse = await new ReportUtilities(reportService(), 1).getResponse();

    expect(dump(response)).not.toContain(SIGNATURE);
    expect(dump(response, true)).not.toContain(SIGNATURE);
    expect(dump(response)).toMatch(/^ReportResponse \{/);
    expect(dump(response)).toContain(`url: '${base}/report.csv'`);
    await response.save('/dev/null');
  });

  it('nor does the download it comes from', async () => {
    const download = await ReportDownload.open(`${base}/report.csv${QUERY}`, { timeoutMs: 0 });
    try {
      expect(dump(download)).not.toContain(SIGNATURE);
      expect(dump(download, true)).not.toContain(SIGNATURE);
    } finally {
      download.close();
    }
  });
});

describe('credentials', () => {
  const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 1024 });
  const pem = privateKey.export({ type: 'pkcs8', format: 'pem' }) as string;

  it('a client does not show the private key of its credential', () => {
    const credential = new GoogleSACredential({
      type: 'service_account',
      client_email: 'tests@example.invalid',
      private_key: pem,
      private_key_id: 'fake-key-id-0000',
    });
    const client = new AdManagerClient(123, credential);

    for (const value of [credential, client]) {
      expect(dump(value)).not.toContain('PRIVATE KEY');
      expect(dump(value, true)).not.toContain('PRIVATE KEY');
    }
    expect(dump(credential)).toBe("GoogleSACredential { email: 'tests@example.invalid' }");
  });

  it('a key file credential shows its path only', () => {
    expect(dump(new GoogleSAFileCredential('./credentials.json'))).toBe(
      "GoogleSAFileCredential { keyFile: './credentials.json' }",
    );
  });
});
