/**
 * getService() gets a token and downloads a WSDL. Both are bounded by the
 * same `timeout` and `signal` as the SOAP calls: a WSDL server or a token
 * endpoint that never answers must not keep getService() pending forever,
 * nor its connection open.
 */
import { getEventListeners, once } from 'node:events';
import { createServer, Server } from 'node:http';
import { Socket } from 'node:net';

import { AdManagerClient } from '../client';
import { AdManagerRequestError } from '../common/utils';
import { listenOnLoopback } from './support/loopback';
import { FAKE_TOKEN, FakeAdManager, startFakeAdManager } from './support/fakeAdManager';

jest.setTimeout(30_000);

let mockWsdlUrl = '';
jest.mock('soap', () => {
  const actual = jest.requireActual('soap');
  return {
    ...actual,
    createClientAsync: (_url: string, options?: object) => actual.createClientAsync(mockWsdlUrl, options),
  };
});

/** Settles with the outcome, or with 'pending' if the promise is still unsettled after `ms` (real time). */
async function outcomeOf(promise: Promise<unknown>, ms = 10_000) {
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

const reasonOf = (outcome: { state: string }) => (outcome as unknown as { reason: unknown }).reason;

/** A WSDL server that accepts the request and never answers. */
type Silent = { url: string; requests: number; sockets: Set<Socket>; close(): Promise<void> };

async function startSilentServer(): Promise<Silent> {
  const sockets = new Set<Socket>();
  const silent = { url: '', requests: 0, sockets } as Silent;
  const server: Server = createServer(() => {
    silent.requests++; // never answers
  });
  server.on('connection', (socket: Socket) => {
    sockets.add(socket);
    socket.on('close', () => sockets.delete(socket));
  });
  silent.url = `${await listenOnLoopback(server)}/svc?wsdl`;
  silent.close = async () => {
    server.closeAllConnections();
    server.close();
    await once(server, 'close');
  };
  return silent;
}

/** Waits until `condition()` holds, up to `ms` (real time). */
async function until(condition: () => boolean, ms = 10_000): Promise<boolean> {
  const end = Date.now() + ms;
  while (!condition() && Date.now() < end) await new Promise((resolve) => setTimeout(resolve, 5));
  return condition();
}

const credential = { getToken: async () => FAKE_TOKEN };
const hangingCredential = () => ({ getToken: jest.fn(() => new Promise<string>(() => undefined)) });

describe('getService() timeout and cancellation', () => {
  let silent: Silent;

  beforeAll(async () => {
    silent = await startSilentServer();
  });

  beforeEach(() => {
    mockWsdlUrl = silent.url;
    silent.requests = 0;
  });

  afterEach(() => jest.useRealTimers());

  afterAll(() => silent.close());

  it('rejects with ETIMEDOUT when the WSDL does not arrive in time, and closes the connection', async () => {
    const outcome = await outcomeOf(
      new AdManagerClient(123, credential).getService('CompanyService', { timeout: 500 }),
    );

    expect(outcome.state).toBe('rejected');
    expect(reasonOf(outcome)).toBeInstanceOf(AdManagerRequestError);
    expect(reasonOf(outcome)).toMatchObject({
      code: 'ETIMEDOUT',
      message: "getService('CompanyService') timed out after 500 ms",
    });
    expect(silent.requests).toBe(1);
    // The signal reached axios: the request was aborted, not only abandoned.
    expect(await until(() => silent.sockets.size === 0)).toBe(true);
  });

  it('rejects with signal.reason when the signal aborts during the download, and closes the connection', async () => {
    const controller = new AbortController();
    const reason = new Error('shutting down');
    const service = new AdManagerClient(123, credential).getService('CompanyService', {
      timeout: 0,
      signal: controller.signal,
    });
    expect(await until(() => silent.requests === 1)).toBe(true);

    controller.abort(reason);

    const outcome = await outcomeOf(service);
    expect(outcome).toEqual({ state: 'rejected', reason });
    expect(await until(() => silent.sockets.size === 0)).toBe(true);
    expect(getEventListeners(controller.signal, 'abort')).toHaveLength(0);
  });

  it('rejects right away, without a token or a request, when the signal is already aborted', async () => {
    const controller = new AbortController();
    controller.abort();
    const hanging = hangingCredential();

    await expect(
      new AdManagerClient(123, hanging, 'tests', { signal: controller.signal }).getService('CompanyService'),
    ).rejects.toMatchObject({ name: 'AbortError' });
    expect(hanging.getToken).not.toHaveBeenCalled();
    expect(silent.requests).toBe(0);
  });

  it('bounds a token request that never settles: timeout', async () => {
    const outcome = await outcomeOf(
      new AdManagerClient(123, hangingCredential()).getService('CompanyService', { timeout: 500 }),
    );

    expect(outcome.state).toBe('rejected');
    expect(reasonOf(outcome)).toBeInstanceOf(AdManagerRequestError);
    expect(reasonOf(outcome)).toMatchObject({ code: 'ETIMEDOUT' });
    expect(silent.requests).toBe(0);
  });

  it('bounds a token request that never settles: signal', async () => {
    const controller = new AbortController();
    const reason = new Error('cancelled');
    const hanging = hangingCredential();
    const service = new AdManagerClient(123, hanging).getService('CompanyService', {
      timeout: 0,
      signal: controller.signal,
    });
    expect(await until(() => hanging.getToken.mock.calls.length === 1)).toBe(true);

    controller.abort(reason);

    expect(await outcomeOf(service)).toEqual({ state: 'rejected', reason });
    expect(getEventListeners(controller.signal, 'abort')).toHaveLength(0);
  });

  it('defaults to the 5-minute timeout of the calls', async () => {
    jest.useFakeTimers({ doNotFake: ['nextTick', 'setImmediate', 'queueMicrotask'] });
    const service = new AdManagerClient(123, hangingCredential()).getService('CompanyService');
    const settled = jest.fn();
    service.then(settled, settled);

    await jest.advanceTimersByTimeAsync(5 * 60_000 - 1);
    expect(settled).not.toHaveBeenCalled();
    await jest.advanceTimersByTimeAsync(1);
    await expect(service).rejects.toMatchObject({ code: 'ETIMEDOUT' });
  });
});

describe('getService() leaves nothing behind when it succeeds', () => {
  let fake: FakeAdManager;

  beforeAll(async () => {
    fake = await startFakeAdManager();
  });

  beforeEach(() => {
    mockWsdlUrl = fake.wsdlUrl;
  });

  afterAll(() => fake.close());

  it('removes its listener from a shared signal', async () => {
    const controller = new AbortController();
    const client = new AdManagerClient(123, credential, 'tests', { signal: controller.signal });

    await Promise.all(Array.from({ length: 5 }, () => client.getService('CompanyService')));

    expect(getEventListeners(controller.signal, 'abort')).toHaveLength(0);
  });

  it('clears its timer', async () => {
    const timers = () => process.getActiveResourcesInfo().filter((type) => type === 'Timeout').length;
    const before = timers();

    await new AdManagerClient(123, credential).getService('CompanyService', { timeout: 60_000 });

    expect(timers()).toBe(before);
  });
});
