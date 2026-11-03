/**
 * Contract checks against Google's public WSDLs. They need network access, so
 * they only run when ADMANAGER_NETWORK_TESTS=1 and are skipped otherwise:
 *
 *   ADMANAGER_NETWORK_TESTS=1 npx jest --config jestconfig.json wsdl.network
 *
 * No credentials are needed: WSDLs are public and the authentication check
 * uses a fake token on purpose.
 *
 * They also check that the fixtures the offline specs rely on match the live
 * WSDLs: fixtures/wsdl-inputs.<version>.json (serviceArguments spec, read with
 * node-soap) and fixtures/wsdl-schema.<version>.json (wsdlSchema spec, read
 * with scripts/wsdl-schema.js). To regenerate both (for instance after
 * changing API_VERSION):
 *
 *   ADMANAGER_NETWORK_TESTS=1 ADMANAGER_UPDATE_WSDL_FIXTURE=1 npx jest --config jestconfig.json wsdl.network
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { inspect } from 'node:util';
import { Client, createClientAsync } from 'soap';

import { API_VERSION, SERVICE_MAP } from '../common/constants';
import { AdManagerClient } from '../client';
import { AdManagerRequestError } from '../common/utils';
import { FAKE_TOKEN } from './support/fakeAdManager';
import { WsdlModel, buildSchema, formatSchema, parseWsdl, wsdlUrl } from '../../scripts/wsdl-schema';

const enabled = process.env.ADMANAGER_NETWORK_TESTS === '1';
const updateFixture = process.env.ADMANAGER_UPDATE_WSDL_FIXTURE === '1';
const describeNetwork = enabled ? describe : describe.skip;
const fixturePath = join(__dirname, 'fixtures', `wsdl-inputs.${API_VERSION}.json`);
const schemaPath = join(__dirname, 'fixtures', `wsdl-schema.${API_VERSION}.json`);

type ServiceName = keyof typeof SERVICE_MAP;

const serviceNames = Object.keys(SERVICE_MAP).sort() as ServiceName[];

/** Calls every wrapper method with a recording client and returns the SOAP operations it uses. */
async function operationsCalledBy(name: ServiceName): Promise<string[]> {
  const called = new Set<string>();
  const recorder = new Proxy(
    {},
    {
      get: (_target, op) => async () => {
        called.add(String(op));
        return null;
      },
    },
  ) as unknown as Client;
  const Service = SERVICE_MAP[name] as unknown as new (
    client: Client,
  ) => Record<string, (...args: unknown[]) => unknown>;
  const service = new Service(recorder);
  const placeholder = { constructor: { name: 'Placeholder' }, buildAttributes: () => ({}) };

  for (const method of Object.getOwnPropertyNames(Service.prototype)) {
    if (method === 'constructor') continue;
    await service[method](placeholder, placeholder, placeholder);
  }

  // node-soap also exposes every operation with an "Async" suffix.
  return [...called].map((op) => op.replace(/Async$/, ''));
}

/** Input element names of every operation, in order, as node-soap describes them. */
function operationInputs(client: Client): Record<string, string[]> {
  const ports = Object.values(client.describe())[0] as Record<string, Record<string, { input: object }>>;
  const operations = Object.values(ports)[0];

  return Object.fromEntries(
    Object.keys(operations)
      .sort()
      // Arrays are described as "name[]".
      .map((op) => [op, Object.keys(operations[op].input).map((arg) => arg.replace(/\[\]$/, ''))]),
  );
}

describeNetwork(`Ad Manager ${API_VERSION} public WSDLs`, () => {
  jest.setTimeout(60_000);

  let fixture: Record<string, Record<string, string[]>>;
  const live: Record<string, Record<string, string[]>> = {};

  beforeAll(async () => {
    fixture = updateFixture ? {} : JSON.parse(await readFile(fixturePath, 'utf8'));
  });

  afterAll(async () => {
    if (updateFixture && Object.keys(live).length === serviceNames.length) {
      const sorted = Object.fromEntries(
        Object.keys(live)
          .sort()
          .map((name) => [name, live[name]]),
      );
      await writeFile(fixturePath, JSON.stringify(sorted, null, 2) + '\n');
    }
  });

  const models: Record<string, WsdlModel> = {};

  /** The WSDL text, for scripts/wsdl-schema.js (node-soap does not keep it). */
  async function downloadWsdl(url: string): Promise<string> {
    const res = await fetch(url, { signal: AbortSignal.timeout(60_000) });
    if (!res.ok) throw new Error(`GET ${url}: HTTP ${res.status}`);
    return res.text();
  }

  it.each(serviceNames)('%s: WSDL loads and declares every operation the wrapper calls', async (name) => {
    const url = wsdlUrl(API_VERSION, name);
    const [client, xml] = await Promise.all([createClientAsync(url), downloadWsdl(url)]);
    const inputs = operationInputs(client);
    live[name] = inputs;
    models[name] = parseWsdl(xml);

    const missing = (await operationsCalledBy(name)).filter((op) => !(op in inputs));

    expect(missing).toEqual([]);
    if (!updateFixture) {
      // The offline serviceArguments spec checks argument names against this fixture.
      expect(fixture[name]).toEqual(inputs);
    }
  });

  it('the offline schema fixture matches the live WSDLs', async () => {
    // Needs every service: runs after the tests above (Jest keeps the order of a file).
    expect(Object.keys(models).sort()).toEqual(serviceNames);
    const schema = buildSchema(models);

    if (updateFixture) {
      await writeFile(schemaPath, formatSchema(schema));
    } else {
      expect(schema).toEqual(JSON.parse(await readFile(schemaPath, 'utf8')));
    }
  });

  it('rejects a fake token with a sanitized AdManagerRequestError for the HTTP 401', async () => {
    const adManager = new AdManagerClient(123456, { getToken: async () => FAKE_TOKEN }, 'wsdl-contract-test');
    const networkService = await adManager.getService('NetworkService');

    const error = await networkService.getCurrentNetwork().then(
      () => {
        throw new Error('expected the call to be rejected');
      },
      (err: unknown) => err,
    );

    expect(error).toBeInstanceOf(AdManagerRequestError);
    expect(error).toMatchObject({ message: 'Error http status codes', status: 401, response: { status: 401 } });
    // The token went out in the Authorization header; neither the error nor the service shows it.
    expect(inspect(error, { depth: Infinity, showHidden: true })).not.toContain(FAKE_TOKEN);
    expect(JSON.stringify(error)).not.toContain(FAKE_TOKEN);
    expect(inspect(networkService, { depth: Infinity })).not.toContain(FAKE_TOKEN);
  });
});
