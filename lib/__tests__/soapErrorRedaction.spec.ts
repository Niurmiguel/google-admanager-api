/**
 * A failed call must not hand the OAuth token to whoever logs the error.
 * axios and node-soap attach the request (Authorization header included) to
 * their errors; the library must reject with something that does not.
 */
import { inspect } from 'node:util';
import { BearerSecurity, createClientAsync } from 'soap';

import { CompanyService } from '../client';
import { GoogleSoapService } from '../client/googleSoap.service';
import { AdManagerRequestError, promiseFromCallback, StatementBuilder } from '../common/utils';
import { FAKE_TOKEN, FakeAdManager, okEnvelope, SoapHandler, startFakeAdManager } from './support/fakeAdManager';

let mockWsdlUrl = '';
jest.mock('soap', () => {
  const actual = jest.requireActual('soap');
  return {
    ...actual,
    createClientAsync: (_url: string, options?: object) => actual.createClientAsync(mockWsdlUrl, options),
  };
});

const envelope = (body: string) =>
  `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>${body}</soap:Body></soap:Envelope>`;

const HTML =
  (status: number): SoapHandler =>
  (_req, res) => {
    res.writeHead(status, { 'content-type': 'text/html' });
    res.end(`<html><body>status ${status}</body></html>`);
  };

const CASES: Record<string, { handler: SoapHandler; expected: Record<string, unknown> }> = {
  'connection reset': {
    handler: (req) => req.socket.destroy(),
    expected: { code: 'ECONNRESET' },
  },
  'HTML 401': {
    handler: HTML(401),
    expected: {
      message: 'Cannot parse response',
      status: 401,
      body: '<html><body>status 401</body></html>',
      response: expect.objectContaining({ status: 401, data: '<html><body>status 401</body></html>' }),
    },
  },
  'HTML 502': {
    handler: HTML(502),
    expected: { message: 'Cannot parse response', status: 502, response: expect.objectContaining({ status: 502 }) },
  },
  'XML with an undefined entity': {
    handler: (_req, res) => res.end(okEnvelope('&undefinedEntity;')),
    // node-soap rejects with a plain { Fault, response, body } object here, not an Error.
    expected: { message: 'Invalid XML', Fault: expect.objectContaining({ faultstring: 'Invalid XML' }), status: 200 },
  },
  'XML with mismatched tags': {
    handler: (_req, res) => res.end(envelope('<a></b>')),
    expected: { status: 200, body: expect.stringContaining('<a></b>') },
  },
  'XML with an unclosed element': {
    handler: (_req, res) => res.end(envelope('<broken>')),
    expected: { status: 200 },
  },
};

function expectNoToken(err: unknown) {
  expect(inspect(err, { depth: Infinity, showHidden: true })).not.toContain(FAKE_TOKEN);
  expect(inspect((err as Error).cause, { depth: Infinity, showHidden: true })).not.toContain(FAKE_TOKEN);
  expect(JSON.stringify(err) ?? '').not.toContain(FAKE_TOKEN);
}

describe('rejections of failed SOAP calls do not expose the OAuth token', () => {
  let fake: FakeAdManager;
  let service: CompanyService;

  beforeAll(async () => {
    fake = await startFakeAdManager();
    mockWsdlUrl = fake.wsdlUrl;
    service = await new GoogleSoapService('CompanyService', {
      networkCode: 123,
      applicationName: 'tests',
      token: FAKE_TOKEN,
    }).createClient();
  });

  afterAll(() => fake.close());

  it.each(Object.keys(CASES))('%s', async (name) => {
    fake.handler = CASES[name].handler;

    const err = await service.getCompaniesByStatement(new StatementBuilder().limit(1).toStatement()).then(
      () => {
        throw new Error('expected the call to fail');
      },
      (e: unknown) => e,
    );

    // The token did travel: the test is not vacuous.
    expect(fake.last?.headers.authorization).toBe(`Bearer ${FAKE_TOKEN}`);
    expect(err).toBeInstanceOf(AdManagerRequestError);
    expect(err).toMatchObject(CASES[name].expected);
    expect(err).not.toHaveProperty('config');
    expect(err).not.toHaveProperty('request');
    expect((err as AdManagerRequestError).response ?? {}).not.toHaveProperty('config');
    expectNoToken(err);
  });

  it('timeout (axios error raised by node-soap with the request attached)', async () => {
    fake.handler = () => undefined; // never answers
    const client = await createClientAsync(fake.wsdlUrl);
    client.setSecurity(new BearerSecurity(FAKE_TOKEN));

    const err = await promiseFromCallback((cb) => client.getCompaniesByStatement({}, cb, { timeout: 50 })).catch(
      (e: unknown) => e,
    );

    expect(fake.last?.headers.authorization).toBe(`Bearer ${FAKE_TOKEN}`);
    expect(err).toBeInstanceOf(AdManagerRequestError);
    expect(err).toMatchObject({ code: 'ECONNABORTED', message: 'timeout of 50ms exceeded' });
    expectNoToken(err);
  });
});
