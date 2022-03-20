import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { GoogleAuth, JWTInput, RefreshOptions } from 'google-auth-library';

import { SCOPES } from '@common/constants';

type ScopeOptions = keyof typeof SCOPES;

export class googleSACredential {
  private _json: string | JWTInput;
  private _scopes: ScopeOptions | ScopeOptions[];
  private _options: RefreshOptions | undefined;
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

    this._json = json;
    this._scopes = scopes;
    this._options = options;

    this.build();
  }

  private async build() {
    const json =
      typeof this._json === 'string' ? JSON.parse(this._json) : this._json;

    this.auth = new GoogleAuth({
      scopes:
        typeof this._scopes === 'string'
          ? SCOPES[this._scopes]
          : this._scopes.map((scope) => SCOPES[scope]),
    }).fromJSON(json, this._options);
  }

  async getToken() {
    return await (
      await this.auth.getAccessToken()
    ).token;
  }
}
