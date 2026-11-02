import { AdManagerClient } from '../client';

describe('AdManagerClient.getService', () => {
  it('keeps the message it always had and chains the original error as cause', async () => {
    const original = new Error('invalid_grant: account not found');
    const client = new AdManagerClient(123, { getToken: () => Promise.reject(original) });

    const error: Error = await client.getService('NetworkService').then(
      () => {
        throw new Error('expected getService to reject');
      },
      (err: Error) => err,
    );

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Error: invalid_grant: account not found');
    expect(error.cause).toBe(original);
  });

  it('keeps non-Error rejections as cause too', async () => {
    const original = { code: 401, message: 'unauthorized' };
    const client = new AdManagerClient(123, { getToken: () => Promise.reject(original) });

    await expect(client.getService('NetworkService')).rejects.toMatchObject({
      message: '[object Object]',
      cause: original,
    });
  });
});
