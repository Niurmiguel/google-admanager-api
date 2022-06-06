import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { GoogleAuth } from 'google-auth-library';

import { SACredential, ScopeOptions } from './interfaces';
import { SCOPES } from '../common/constants';

export class GoogleSAFileCredential implements SACredential {
  private _keyFile: string;
  private _scopes: ScopeOptions | ScopeOptions[];
  protected auth: GoogleAuth<JSONClient>;

  /**
   *
   * @param keyFile Path to a .json, .pem, or .p12 key file
   * @param scopes Required scopes for the desired API request
   */
  constructor(keyFile: string, scopes: ScopeOptions | ScopeOptions[]) {
    if (!keyFile) {
      throw new Error("'keyFile' must be set when using service account flow.");
    }

    if (!scopes)
      throw new Error("'scopes' must be set when using service account flow.");

    this._keyFile = keyFile;
    this._scopes = scopes;

    this.build();
  }

  private async build() {
    this.auth = new GoogleAuth({
      keyFile: this._keyFile,
      scopes:
        typeof this._scopes === 'string'
          ? SCOPES[this._scopes]
          : this._scopes.map((scope) => SCOPES[scope]),
    });
  }

  async getToken() {
    return await this.auth.getAccessToken();
  }
}
