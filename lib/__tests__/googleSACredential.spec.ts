import { JWT } from 'google-auth-library';

import { GoogleSACredential } from '../auth';

const SERVICE_ACCOUNT = {
  type: 'service_account',
  client_email: 'reporting@example-project.iam.gserviceaccount.com',
  private_key: 'not-a-real-key',
};

describe('GoogleSACredential', () => {
  const unhandled: unknown[] = [];
  const onUnhandled = (reason: unknown) => unhandled.push(reason);

  beforeAll(() => process.on('unhandledRejection', onUnhandled));
  afterAll(() => process.off('unhandledRejection', onUnhandled));
  beforeEach(() => {
    unhandled.length = 0;
  });
  afterEach(async () => {
    // A floating rejection would surface after a turn of the event loop.
    await new Promise((resolve) => setImmediate(resolve));
    expect(unhandled).toEqual([]);
    jest.restoreAllMocks();
  });

  it('throws from the constructor on invalid JSON, without leaking its content', () => {
    const secret = '{"private_key": "not-a-real-key" oops';

    expect(() => new GoogleSACredential(secret)).toThrow(SyntaxError);
    expect(() => new GoogleSACredential(secret)).toThrow(/^'json' is not valid JSON \(at position \d+\)\.$/);
  });

  it('throws from the constructor when the JSON is not a usable credential', () => {
    expect(() => new GoogleSACredential('{}')).toThrow(/client_email/);
  });

  it('builds the client synchronously and gets the token from it', async () => {
    // getAccessToken is overloaded (callback and promise forms); the promise form is the one used.
    const tokenResponse = (async () => ({ token: 'ya29.token' })) as unknown as JWT['getAccessToken'];
    const getAccessToken = jest.spyOn(JWT.prototype, 'getAccessToken').mockImplementation(tokenResponse);

    const fromString = new GoogleSACredential(JSON.stringify(SERVICE_ACCOUNT));
    const fromObject = new GoogleSACredential(SERVICE_ACCOUNT);

    await expect(fromString.getToken()).resolves.toBe('ya29.token');
    await expect(fromObject.getToken()).resolves.toBe('ya29.token');
    expect(getAccessToken).toHaveBeenCalledTimes(2);
  });
});
