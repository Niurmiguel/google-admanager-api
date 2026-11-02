import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { GoogleAuth, JWTInput, RefreshOptions } from 'google-auth-library';

import { SACredential } from './interfaces';
import { SCOPE } from '../common/constants';

/**
 * Parses the service account JSON. The error message never includes the
 * input: V8 quotes part of it, and it holds the private key.
 */
function parseCredentials(json: string): JWTInput {
  try {
    return JSON.parse(json);
  } catch (err) {
    const position = /at position (\d+)/.exec((err as Error).message)?.[1];
    throw new SyntaxError(`'json' is not valid JSON${position ? ` (at position ${position})` : ''}.`);
  }
}

export class GoogleSACredential implements SACredential {
  protected auth: JSONClient;

  /**
   * @param json The service account key, as a JSON string or an object.
   * @param options The JWT or UserRefresh options for the client
   * @throws SyntaxError if `json` is a string that is not valid JSON, or the
   * google-auth-library error if it is not a usable credential.
   */
  constructor(json: string | JWTInput, options?: RefreshOptions) {
    if (!json) {
      throw new Error("'json' must be set when using service account flow.");
    }

    // Everything here is synchronous: an invalid credential fails right here,
    // where the caller can catch it, instead of as an unhandled rejection.
    const credentials = typeof json === 'string' ? parseCredentials(json) : json;
    this.auth = new GoogleAuth({ scopes: SCOPE }).fromJSON(credentials, options);
  }

  async getToken(): Promise<string | null | undefined> {
    return (await this.auth.getAccessToken()).token;
  }
}
