/**
 * Logging the library's objects must not print credentials. util.inspect
 * (console.log) walks objects at any depth and goes through Proxies to their
 * target: a service reached its SOAP client, which holds the OAuth token
 * (`security`, `lastRequestHeaders`); a report response reached the signed
 * download URL; a credential, the private key.
 */
import { generateKeyPairSync } from 'node:crypto';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createServer, Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inspect } from 'node:util';
import { AuthClient } from 'google-auth-library';

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

/**
 * JSON.stringify as loggers do it (pino, safe-stable-stringify...): an object
 * already seen becomes '[Circular]' instead of throwing.
 */
function stringifyTolerant(value: unknown): string {
  const seen = new WeakSet<object>();
  return JSON.stringify(value, (_key, v: unknown) => {
    if (typeof v === 'object' && v !== null) {
      if (seen.has(v)) return '[Circular]';
      seen.add(v);
    }
    return v;
  });
}

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

/**
 * JSON.stringify() does not use inspect.custom: it walked the credential's
 * auth client (the private key, and the access token once there is one), and
 * reached it through the client and the services. These run the real token
 * request, signed with a generated key, against a loopback endpoint.
 */
describe('credentials in JSON', () => {
  const ACCESS_TOKEN = 'fake-access-token-for-tests-0000';
  const EMAIL = 'tests@example.invalid';
  const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 1024 });
  const pem = privateKey.export({ type: 'pkcs8', format: 'pem' }) as string;
  const serviceAccount = { type: 'service_account', client_email: EMAIL, private_key: pem };

  let tokenServer: Server;
  let tokenUrl: string;
  let tokenRequests = 0;
  let fake: FakeAdManager;
  let keyDir: string;
  let keyFile: string;

  /**
   * Sends the client's OAuth token requests to the loopback endpoint instead
   * of Google. With the global fetch: gaxios otherwise loads node-fetch with a
   * dynamic import(), which Jest's CommonJS runtime rejects.
   */
  function useLoopbackTokenEndpoint(client: AuthClient): void {
    client.transporter.interceptors.request.add({
      resolved: async (options) => {
        if (!String(options.url).endsWith('/token')) throw new Error(`unexpected request to ${options.url}`);
        return { ...options, url: new URL(tokenUrl), fetchImplementation: fetch };
      },
    });
  }

  /** Reaches the protected `auth` the way a subclass does. */
  class LoopbackSACredential extends GoogleSACredential {
    constructor() {
      super(serviceAccount);
      useLoopbackTokenEndpoint(this.auth);
    }

    get cachedToken() {
      return this.auth.credentials.access_token;
    }
  }

  class LoopbackSAFileCredential extends GoogleSAFileCredential {
    async useLoopback(): Promise<this> {
      useLoopbackTokenEndpoint((await this.auth.getClient()) as AuthClient);
      return this;
    }

    async cachedToken() {
      return ((await this.auth.getClient()) as AuthClient).credentials.access_token;
    }
  }

  beforeAll(async () => {
    tokenServer = createServer((req, res) => {
      req.resume();
      req.on('end', () => {
        tokenRequests++;
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ access_token: ACCESS_TOKEN, expires_in: 3600, token_type: 'Bearer' }));
      });
    });
    tokenUrl = `${await listenOnLoopback(tokenServer)}/token`;
    fake = await startFakeAdManager();
    mockWsdlUrl = fake.wsdlUrl;
    keyDir = await mkdtemp(join(tmpdir(), 'admanager-tests-'));
    keyFile = join(keyDir, 'key.json');
    await writeFile(keyFile, JSON.stringify(serviceAccount));
  });

  afterAll(async () => {
    tokenServer.closeAllConnections();
    tokenServer.close();
    await fake.close();
    await rm(keyDir, { recursive: true, force: true });
  });

  beforeEach(() => {
    tokenRequests = 0;
  });

  /** Neither the private key nor the access token, in plain or cycle-tolerant JSON. */
  function expectNoSecrets(value: unknown): void {
    for (const json of [JSON.stringify(value), stringifyTolerant(value)]) {
      expect(json).not.toContain('PRIVATE KEY');
      expect(json).not.toContain(ACCESS_TOKEN);
    }
  }

  it('a credential, its client and a service keep the key and the token out of JSON', async () => {
    const credential = new LoopbackSACredential();
    const client = new AdManagerClient(123, credential);

    expectNoSecrets(credential);
    expectNoSecrets(client);
    expect(JSON.stringify(credential)).toBe(JSON.stringify({ email: EMAIL }));

    const companies = await client.getService('CompanyService');
    await companies.getCompaniesByStatement(new StatementBuilder().limit(1).toStatement());
    // The premise: the token came from the loopback endpoint, went out with
    // the call, and the auth client keeps it.
    expect(tokenRequests).toBe(1);
    expect(fake.last?.headers.authorization).toBe(`Bearer ${ACCESS_TOKEN}`);
    expect(credential.cachedToken).toBe(ACCESS_TOKEN);

    expectNoSecrets(credential);
    expectNoSecrets(client);
    expectNoSecrets(companies);
    expectNoSecrets({ credential, client, companies });
    expect(JSON.stringify(credential)).toBe(JSON.stringify({ email: EMAIL }));
  });

  it('a key file credential, before and after it reads the key', async () => {
    const credential = new LoopbackSAFileCredential(keyFile);
    const client = new AdManagerClient(123, credential);

    expectNoSecrets(credential);
    expect(JSON.stringify(credential)).toBe(JSON.stringify({ keyFile }));

    await credential.useLoopback();
    await expect(credential.getToken()).resolves.toBe(ACCESS_TOKEN);
    const companies = await client.getService('CompanyService');
    // The premise: the auth client now holds the key it read and the token.
    expect(await credential.cachedToken()).toBe(ACCESS_TOKEN);
    expect(tokenRequests).toBe(1);

    expectNoSecrets(credential);
    expectNoSecrets(client);
    expectNoSecrets(companies);
    expect(JSON.stringify(credential)).toBe(JSON.stringify({ keyFile }));
  });

  it('no secret field is enumerable, and console.log is unchanged', () => {
    const credential = new GoogleSACredential(serviceAccount);
    const fileCredential = new GoogleSAFileCredential(keyFile);
    const client = new AdManagerClient(123, credential);

    expect(Object.keys(credential)).not.toContain('auth');
    expect(Object.keys(fileCredential)).not.toContain('auth');
    // A subclass can still assign it, and it stays hidden.
    class Reassigning extends GoogleSACredential {
      reassign(): this {
        this.auth = new GoogleSACredential(serviceAccount)['auth'];
        return this;
      }
    }
    expect(Object.keys(new Reassigning(serviceAccount).reassign())).toEqual([]);
    expect(Object.keys(client)).not.toContain('credential');
    expect({ ...credential }).toEqual({});
    expect(dump(credential)).toBe(`GoogleSACredential { email: '${EMAIL}' }`);
    expect(dump(new GoogleSAFileCredential('./key.json'))).toBe("GoogleSAFileCredential { keyFile: './key.json' }");
  });

  it('a subclass prints with its own name', () => {
    expect(dump(new LoopbackSACredential())).toBe(`LoopbackSACredential { email: '${EMAIL}' }`);
    expect(dump(new LoopbackSAFileCredential('./key.json'))).toBe("LoopbackSAFileCredential { keyFile: './key.json' }");
  });
});
