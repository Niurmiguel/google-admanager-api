import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { GoogleAuth, JWTInput, RefreshOptions } from 'google-auth-library';
import { SCOPES } from '@common/constants';

type ScopeOptions = keyof typeof SCOPES;

export class googleSACredential {
  private _json: string | JWTInput;
  private _scopes: ScopeOptions[];
  private _options: RefreshOptions | undefined;
  protected auth: JSONClient;

  constructor(
    json: string | JWTInput,
    scopes: ScopeOptions[],
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
    const scopes = SCOPES as Record<string, string>;

    let json = this._json as JWTInput;

    if (typeof this._json === 'string') {
      json = JSON.parse(this._json);
    }

    this.auth = new GoogleAuth({
      scopes: this._scopes.map((scope) => scopes[scope]),
    }).fromJSON(json, this._options);
  }

  async getToken() {
    return await (
      await this.auth.getAccessToken()
    ).token;
  }
}
