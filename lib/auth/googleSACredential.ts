import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { GoogleAuth, JWTInput, RefreshOptions } from 'google-auth-library';

import { SACredential, ScopeOptions } from './interfaces';
import { SCOPES } from '../common/constants';

export class GoogleSACredential implements SACredential {
  private json: string | JWTInput;
  private scopes: ScopeOptions | ScopeOptions[];
  private options: RefreshOptions | undefined;
  protected auth: JSONClient;

  /**
   *
   * @param json The input object.
   * @param scopes Required scopes for the desired API request
   * @param options The JWT or UserRefresh options for the client
   */
  constructor(
    json: string | JWTInput,
    scopes: ScopeOptions | ScopeOptions[],
    options?: RefreshOptions,
  ) {
    if (!json) {
      throw new Error("'json' must be set when using service account flow.");
    }

    if (!scopes)
      throw new Error("'scopes' must be set when using service account flow.");

    this.json = json;
    this.scopes = scopes;
    this.options = options;

    this.build();
  }

  private async build() {
    const json =
      typeof this.json === 'string' ? JSON.parse(this.json) : this.json;

    this.auth = new GoogleAuth({
      scopes:
        typeof this.scopes === 'string'
          ? SCOPES[this.scopes]
          : this.scopes.map((scope) => SCOPES[scope]),
    }).fromJSON(json, this.options);
  }

  async getToken(): Promise<string | null | undefined> {
    return await (
      await this.auth.getAccessToken()
    ).token;
  }
}
