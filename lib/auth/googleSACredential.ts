import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { GoogleAuth, JWTInput, RefreshOptions } from 'google-auth-library';

import { SACredential } from './interfaces';
import { SCOPE } from '../common/constants';

export class GoogleSACredential implements SACredential {
  private json: string | JWTInput;
  private options: RefreshOptions | undefined;
  protected auth: JSONClient;

  /**
   *
   * @param json The input object.
   * @param options The JWT or UserRefresh options for the client
   */
  constructor(json: string | JWTInput, options?: RefreshOptions) {
    if (!json) {
      throw new Error("'json' must be set when using service account flow.");
    }

    this.json = json;
    this.options = options;

    this.build();
  }

  private async build() {
    const json = typeof this.json === 'string' ? JSON.parse(this.json) : this.json;

    this.auth = new GoogleAuth({
      scopes: SCOPE,
    }).fromJSON(json, this.options);
  }

  async getToken(): Promise<string | null | undefined> {
    return await (
      await this.auth.getAccessToken()
    ).token;
  }
}
