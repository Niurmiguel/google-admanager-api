/**
 * SOAP calls end: a server that never answers makes the call reject when the
 * timeout passes, and closes the connection. A signal cancels them.
 */
import { getEventListeners } from 'node:events';
import { inspect } from 'node:util';

import { AdManagerClient, CompanyService } from '../client';
import { AdManagerRequestError, StatementBuilder } from '../common/utils';
import { FAKE_TOKEN, FakeAdManager, okEnvelope, startFakeAdManager } from './support/fakeAdManager';

let mockWsdlUrl = '';
jest.mock('soap', () => {
  const actual = jest.requireActual('soap');
  return {
    ...actual,
    createClientAsync: (_url: string, options?: object) => actual.createClientAsync(mockWsdlUrl, options),
  };
});

// Real sockets and real-time timeouts of several seconds.
jest.setTimeout(30_000);

const credential = { getToken: async () => FAKE_TOKEN };
const query = () => new StatementBuilder().limit(1).toStatement();

/** Settles with the outcome, or with 'pending' if the promise is still unsettled after `ms` (real time). */
async function outcomeOf(promise: Promise<unknown>, ms: number) {
  let timer: NodeJS.Timeout | undefined;
  const pending = new Promise<{ state: 'pending' }>((resolve) => {
    timer = setTimeout(() => resolve({ state: 'pending' }), ms);
  });
  try {
    return await Promise.race([
      promise.then(
        (value) => ({ state: 'resolved' as const, value }),
        (reason: unknown) => ({ state: 'rejected' as const, reason }),
      ),
      pending,
    ]);
  } finally {
    clearTimeout(timer);
  }
}

/** Waits until the server has no open sockets, up to `ms`. */
async function connectionsAfter(fake: FakeAdManager, ms = 1_000) {
  const until = Date.now() + ms;
  let open = await fake.connections();
  while (open > 0 && Date.now() < until) {
    await new Promise((resolve) => setImmediate(resolve));
    open = await fake.connections();
  }
  return open;
}

describe('SOAP call timeout and cancellation', () => {
  let fake: FakeAdManager;
  let requests: number;

  beforeAll(async () => {
    fake = await startFakeAdManager();
    mockWsdlUrl = fake.wsdlUrl;
  });

  beforeEach(() => {
    requests = 0;
    fake.handler = () => {
      requests++; // never answers
    };
  });

  afterEach(() => jest.useRealTimers());

  afterAll(() => fake.close());

  const service = (clientOptions?: object, serviceOptions?: object): Promise<CompanyService> =>
    new AdManagerClient(123, credential, 'tests', clientOptions).getService('CompanyService', serviceOptions);

  it('rejects when the timeout passes, and closes the connection', async () => {
    // 5 s, not less: the request must reach the server before the timeout,
    // and on a heavily loaded machine sending it took more than 1 s.
    const companies = await service({ timeout: 5_000 });

    const outcome = await outcomeOf(companies.getCompaniesByStatement(query()), 20_000);

    expect(outcome.state).toBe('rejected');
    const err = (outcome as { reason: unknown }).reason;
    expect(err).toBeInstanceOf(AdManagerRequestError);
    expect(err).toMatchObject({
      code: 'ETIMEDOUT',
      message: 'CompanyService.getCompaniesByStatement timed out after 5000 ms',
    });
    expect(inspect(err, { depth: Infinity, showHidden: true })).not.toContain(FAKE_TOKEN);
    expect(requests).toBe(1);
    expect(await connectionsAfter(fake, 5_000)).toBe(0);
  });

  it('defaults to 5 minutes', async () => {
    const companies = await service();
    jest.useFakeTimers({ doNotFake: ['nextTick', 'setImmediate', 'queueMicrotask'] });

    const call = companies.getCompaniesByStatement(query());
    const settled = jest.fn();
    call.then(settled, settled);
    while (requests === 0) await new Promise((resolve) => setImmediate(resolve));

    await jest.advanceTimersByTimeAsync(5 * 60_000 - 1);
    expect(settled).not.toHaveBeenCalled();
    await jest.advanceTimersByTimeAsync(1);
    await expect(call).rejects.toMatchObject({ code: 'ETIMEDOUT' });
  });

  it('timeout 0 disables it; the signal still cancels the call, with its reason', async () => {
    const controller = new AbortController();
    const companies = await service({ timeout: 0, signal: controller.signal });
    jest.useFakeTimers({ doNotFake: ['nextTick', 'setImmediate', 'queueMicrotask'] });

    const call = companies.getCompaniesByStatement(query());
    const settled = jest.fn();
    call.then(settled, settled);
    while (requests === 0) await new Promise((resolve) => setImmediate(resolve));
    await jest.advanceTimersByTimeAsync(60 * 60_000);
    expect(settled).not.toHaveBeenCalled();

    const reason = new Error('shutting down');
    controller.abort(reason);
    await expect(call).rejects.toBe(reason);
    jest.useRealTimers();
    expect(await connectionsAfter(fake)).toBe(0);
  });

  it('does not send the request when the signal is already aborted', async () => {
    const controller = new AbortController();
    const companies = await service({}, { signal: controller.signal });
    controller.abort();

    await expect(companies.getCompaniesByStatement(query())).rejects.toMatchObject({ name: 'AbortError' });
    expect(requests).toBe(0);
  });

  it('getService options replace the client ones', async () => {
    // getService() is bounded by the same timeout: load the WSDL into node-soap's cache first.
    await service();
    const companies = await service({ timeout: 60_000 }, { timeout: 50 });

    await expect(companies.getCompaniesByStatement(query())).rejects.toMatchObject({
      message: 'CompanyService.getCompaniesByStatement timed out after 50 ms',
    });
  });

  it('a call that answers in time is not affected', async () => {
    fake.handler = (_req, res) => res.end(okEnvelope('fine'));
    // Far above what a loaded machine takes to answer on loopback.
    const companies = await service({ timeout: 10_000 });

    await expect(companies.getCompaniesByStatement(query())).resolves.toBe('fine');
  });

  describe('cleanup after each call', () => {
    const ok = () => (fake.handler = (_req, res) => res.end(okEnvelope()));
    const failing = () =>
      (fake.handler = (_req, res) => {
        res.writeHead(502, { 'content-type': 'text/html' });
        res.end('<html>bad gateway</html>');
      });
    /** Timers that keep the process alive. */
    const timers = () => process.getActiveResourcesInfo().filter((type) => type === 'Timeout').length;

    it('removes its listener from a shared signal', async () => {
      const controller = new AbortController();
      const companies = await service({ signal: controller.signal });

      ok();
      for (let i = 0; i < 10; i++) await companies.getCompaniesByStatement(query());
      failing();
      for (let i = 0; i < 3; i++) await expect(companies.getCompaniesByStatement(query())).rejects.toBeDefined();
      ok();
      await Promise.all(Array.from({ length: 5 }, () => companies.getCompaniesByStatement(query())));

      expect(getEventListeners(controller.signal, 'abort')).toHaveLength(0);
    });

    it('clears its timeout', async () => {
      const companies = await service({ timeout: 60_000 });
      const before = timers();

      ok();
      for (let i = 0; i < 3; i++) await companies.getCompaniesByStatement(query());
      failing();
      for (let i = 0; i < 3; i++) await expect(companies.getCompaniesByStatement(query())).rejects.toBeDefined();

      expect(timers()).toBe(before);
    });
  });

  it.each([-1, 1.5, NaN, Infinity, 2 ** 31])('rejects timeout %p', async (timeout) => {
    expect(() => new AdManagerClient(123, credential, 'tests', { timeout })).toThrow(RangeError);
    await expect(new AdManagerClient(123, credential).getService('CompanyService', { timeout })).rejects.toThrow(
      RangeError,
    );
  });
});
