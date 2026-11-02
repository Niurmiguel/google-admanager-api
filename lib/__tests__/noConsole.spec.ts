/**
 * A library must not write to the console of the application using it.
 * Calls every method of every service and checks that nothing is logged.
 */
import { Client } from 'soap';

import { SERVICE_MAP } from '../common/constants';

type ServiceName = keyof typeof SERVICE_MAP;

const METHODS = ['log', 'info', 'warn', 'error', 'debug', 'trace'] as const;

describe('services do not write to the console', () => {
  afterEach(() => jest.restoreAllMocks());

  it.each(Object.keys(SERVICE_MAP).sort() as ServiceName[])('%s', async (name) => {
    const spies = METHODS.map((method) => jest.spyOn(console, method).mockImplementation(() => undefined));
    const client = new Proxy({}, { get: () => async () => null }) as unknown as Client;
    const Service = SERVICE_MAP[name] as unknown as new (
      client: Client,
    ) => Record<string, (...args: unknown[]) => unknown>;
    const service = new Service(client);
    const placeholder = { constructor: { name: 'Placeholder' }, buildAttributes: () => ({}) };

    for (const method of Object.getOwnPropertyNames(Service.prototype)) {
      if (method !== 'constructor') await service[method](placeholder, placeholder, placeholder, placeholder);
    }

    expect(spies.flatMap((spy) => spy.mock.calls)).toEqual([]);
  });
});
