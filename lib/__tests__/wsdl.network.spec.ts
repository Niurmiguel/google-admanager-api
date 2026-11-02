/**
 * Contract checks against Google's public WSDLs. They need network access, so
 * they only run when ADMANAGER_NETWORK_TESTS=1 and are skipped otherwise:
 *
 *   ADMANAGER_NETWORK_TESTS=1 npx jest --config jestconfig.json wsdl.network
 *
 * No credentials are needed: WSDLs are public and the authentication check
 * uses a fake token on purpose.
 */
import { Client, createClientAsync } from 'soap';

import { API_VERSION, SERVICE_MAP } from '../common/constants';
import { AdManagerClient } from '../client';

const enabled = process.env.ADMANAGER_NETWORK_TESTS === '1';
const describeNetwork = enabled ? describe : describe.skip;

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

describeNetwork(`Ad Manager ${API_VERSION} public WSDLs`, () => {
  jest.setTimeout(60_000);

  it.each(serviceNames)('%s: WSDL loads and declares every operation the wrapper calls', async (name) => {
    const client = await createClientAsync(`https://ads.google.com/apis/ads/publisher/${API_VERSION}/${name}?wsdl`);
    const ports = Object.values(client.describe())[0] as Record<string, Record<string, unknown>>;
    const declared = Object.keys(Object.values(ports)[0]);

    const missing = (await operationsCalledBy(name)).filter((op) => !declared.includes(op));

    expect(missing).toEqual([]);
  });

  it('rejects a fake token with the HTTP 401 error raised by node-soap', async () => {
    const adManager = new AdManagerClient(123456, { getToken: async () => 'fake-token' }, 'wsdl-contract-test');
    const networkService = await adManager.getService('NetworkService');

    // NetworkService methods are typed as synchronous but return a promise at
    // runtime; the async wrapper keeps this test independent of that typing.
    const getCurrentNetwork = async () => networkService.getCurrentNetwork();
    const error = await getCurrentNetwork().then(
      () => {
        throw new Error('expected the call to be rejected');
      },
      (err: unknown) => err as Error & { response?: { status?: number } },
    );

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Error http status codes');
    expect(error.response?.status).toBe(401);
  });
});
