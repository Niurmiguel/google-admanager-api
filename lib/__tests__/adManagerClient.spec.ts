import { inspect } from 'node:util';

import { AdManagerClient } from '../client';
import { AdManagerRequestError } from '../common/utils';

const rejectionOf = (client: AdManagerClient) =>
  client.getService('NetworkService').then(
    () => {
      throw new Error('expected getService to reject');
    },
    (err: AdManagerRequestError) => err,
  );

describe('AdManagerClient.getService', () => {
  it('keeps the message it always had and chains a sanitized copy of the original error as cause', async () => {
    const original = new Error('invalid_grant: account not found');
    const client = new AdManagerClient(123, { getToken: () => Promise.reject(original) });

    const error = await rejectionOf(client);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AdManagerRequestError);
    expect(error.message).toBe('Error: invalid_grant: account not found');
    expect(error.cause).not.toBe(original);
    expect(error.cause).toMatchObject({ name: 'Error', message: 'invalid_grant: account not found' });
    expect((error.cause as Error).stack).toBe(original.stack);
  });

  it('keeps status and code, never the request of the token endpoint', async () => {
    // Shaped like google-auth-library's GaxiosError: its config holds the signed JWT assertion.
    const original = Object.assign(new Error('invalid_grant: Invalid JWT Signature.'), {
      code: '400',
      config: { url: 'https://oauth2.googleapis.com/token', data: { assertion: 'signed-assertion-0000' } },
      response: { status: 400, statusText: 'Bad Request', headers: {}, config: { data: 'signed-assertion-0000' } },
    });
    const client = new AdManagerClient(123, { getToken: () => Promise.reject(original) });

    const error = await rejectionOf(client);

    expect(error).toMatchObject({ message: 'Error: invalid_grant: Invalid JWT Signature.', code: '400', status: 400 });
    expect(error).not.toHaveProperty('config');
    expect(inspect(error, { depth: Infinity, showHidden: true })).not.toContain('signed-assertion-0000');
  });

  it('keeps the message of non-Error rejections, but not the object itself', async () => {
    const original = { code: 401, message: 'unauthorized', config: { headers: { Authorization: 'Bearer x' } } };
    const client = new AdManagerClient(123, { getToken: () => Promise.reject(original) });

    const error = await rejectionOf(client);

    expect(error).toBeInstanceOf(AdManagerRequestError);
    expect(error.message).toBe('[object Object]');
    // Plain objects may be responses or configs: they are not copied.
    expect(error.cause).toBeUndefined();
  });
});
