/**
 * Every wrapper method of every service must call an operation that exists in
 * the WSDL, with exactly the argument names of that operation's input element
 * and in the same order (the input is an xs:sequence and node-soap serializes
 * keys in object order).
 *
 * The expected names come from fixtures/wsdl-inputs.<version>.json: the input
 * element names of every operation, extracted with node-soap from the public
 * WSDLs (about 13 KB, against 9 MB of WSDL). The opt-in network spec checks
 * that this fixture still matches the live WSDLs and can regenerate it.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Client } from 'soap';

import { API_VERSION, SERVICE_MAP } from '../common/constants';

type ServiceName = keyof typeof SERVICE_MAP;
type WsdlInputs = Record<string, Record<string, string[]>>;
type Call = { op: string; args: unknown };

const serviceNames = Object.keys(SERVICE_MAP).sort() as ServiceName[];

/** Calls every method of a service with a client that records what it receives. */
async function recordCalls(name: ServiceName): Promise<{ method: string; calls: Call[] }[]> {
  let calls: Call[] = [];
  const recorder = new Proxy(
    {},
    {
      get: (_target, op) => async (args: unknown) => {
        calls.push({ op: String(op), args });
        return null;
      },
    },
  ) as unknown as Client;
  const Service = SERVICE_MAP[name] as unknown as new (
    client: Client,
  ) => Record<string, (...args: unknown[]) => unknown>;
  const service = new Service(recorder);
  // Stands in for any argument: a statement, an entity, an action...
  const placeholder = { constructor: { name: 'Placeholder' }, buildAttributes: () => ({}) };

  const recorded: { method: string; calls: Call[] }[] = [];
  for (const method of Object.getOwnPropertyNames(Service.prototype)) {
    if (method === 'constructor') continue;
    calls = [];
    await service[method](placeholder, placeholder, placeholder, placeholder);
    recorded.push({ method, calls });
  }
  return recorded;
}

describe(`service arguments match the ${API_VERSION} WSDLs`, () => {
  let wsdl: WsdlInputs;

  beforeAll(async () => {
    wsdl = JSON.parse(await readFile(join(__dirname, 'fixtures', `wsdl-inputs.${API_VERSION}.json`), 'utf8'));
  });

  it('has a fixture entry for every service', () => {
    expect(Object.keys(wsdl).sort()).toEqual(serviceNames);
  });

  it.each(serviceNames)('%s', async (name) => {
    const operations = wsdl[name];
    const mismatches: string[] = [];

    for (const { method, calls } of await recordCalls(name)) {
      if (calls.length === 0) mismatches.push(`${method}: calls no operation`);
      for (const { op, args } of calls) {
        const expected = operations[op];
        if (!expected) {
          mismatches.push(`${method}: calls ${op}, which is not in the WSDL`);
          continue;
        }
        if (op !== method) mismatches.push(`${method}: calls ${op}`);
        const sent = Object.keys(args ?? {});
        if (JSON.stringify(sent) !== JSON.stringify(expected)) {
          mismatches.push(`${method}: sends [${sent}], WSDL expects [${expected}]`);
        }
      }
    }

    expect(mismatches).toEqual([]);
  });
});
