/**
 * getService() rejects with a sanitized error. The raw errors carry their
 * request: axios' (WSDL download) holds the headers sent, including the
 * Proxy-Authorization of a proxy configured with credentials in HTTP_PROXY.
 */
import { once } from 'node:events';
import { createServer, IncomingHttpHeaders, Server } from 'node:http';
import { inspect } from 'node:util';

import { AdManagerClient } from '../client';
import { AdManagerRequestError } from '../common/utils';
import { listenOnLoopback } from './support/loopback';
import { FAKE_TOKEN } from './support/fakeAdManager';

let mockWsdlUrl = '';
jest.mock('soap', () => {
  const actual = jest.requireActual('soap');
  return {
    ...actual,
    createClientAsync: (_url: string, options?: object) => actual.createClientAsync(mockWsdlUrl, options),
  };
});

const PROXY_USER = 'proxy-user';
const PROXY_PASSWORD = 'proxy-password-for-tests-0000';
const PROXY_ENV = ['http_proxy', 'HTTP_PROXY', 'no_proxy', 'NO_PROXY', 'npm_config_http_proxy', 'npm_config_no_proxy'];

const credential = { getToken: async () => FAKE_TOKEN };

function expectNoSecrets(err: unknown, ...secrets: string[]) {
  const dump = inspect(err, { depth: Infinity, showHidden: true });
  const json = JSON.stringify(err);
  for (const secret of secrets) {
    expect(dump).not.toContain(secret);
    expect(json).not.toContain(secret);
  }
}

describe('getService() errors through a proxy with credentials', () => {
  let proxy: Server;
  let seen: IncomingHttpHeaders | undefined;
  const savedEnv: Record<string, string | undefined> = {};

  beforeAll(async () => {
    // A proxy that reads the request and cuts the connection.
    proxy = createServer((req) => {
      seen = req.headers;
      req.socket.destroy();
    });
    const proxyUrl = new URL(await listenOnLoopback(proxy));
    proxyUrl.username = PROXY_USER;
    proxyUrl.password = PROXY_PASSWORD;

    for (const name of PROXY_ENV) {
      savedEnv[name] = process.env[name];
      delete process.env[name];
    }
    process.env.http_proxy = proxyUrl.href;
    // Any loopback URL: the request goes to the proxy, which never forwards it.
    mockWsdlUrl = 'http://127.0.0.1:9/svc?wsdl';
  });

  afterAll(async () => {
    for (const name of PROXY_ENV) {
      if (savedEnv[name] === undefined) delete process.env[name];
      else process.env[name] = savedEnv[name];
    }
    proxy.closeAllConnections();
    proxy.close();
    await once(proxy, 'close');
  });

  it('keeps message and code, and never the Proxy-Authorization header', async () => {
    const err = await new AdManagerClient(123, credential).getService('CompanyService').then(
      () => {
        throw new Error('expected getService to reject');
      },
      (e: unknown) => e,
    );

    // The premise: the request went through the proxy with its credentials.
    const basic = Buffer.from(`${PROXY_USER}:${PROXY_PASSWORD}`).toString('base64');
    expect(seen?.['proxy-authorization']).toBe(`Basic ${basic}`);

    expect(err).toBeInstanceOf(AdManagerRequestError);
    // The message getService() always had: String(err).
    expect(err).toMatchObject({ message: 'Error: socket hang up', code: 'ECONNRESET' });
    expect((err as Error).cause).toMatchObject({ message: 'socket hang up', code: 'ECONNRESET' });
    expectNoSecrets(err, basic, PROXY_PASSWORD, FAKE_TOKEN);
  });
});
