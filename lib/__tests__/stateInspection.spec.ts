/**
 * Logging the library's objects must not print credentials. util.inspect
 * (console.log) walks objects at any depth and goes through Proxies to their
 * target: a service reached its SOAP client, which holds the OAuth token
 * (`security`, `lastRequestHeaders`).
 */
import { inspect } from 'node:util';

import { AdManagerClient, CompanyService } from '../client';
import { StatementBuilder } from '../common/utils';
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
