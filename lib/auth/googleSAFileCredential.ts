import { inspect, InspectOptionsStylized } from 'node:util';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { GoogleAuth } from 'google-auth-library';

import { SACredential } from './interfaces';
import { SCOPE } from '../common/constants';
import { setHiddenProperty } from '../common/utils/hiddenProperty.util';

export class GoogleSAFileCredential implements SACredential {
  private _keyFile: string;
  /**
   * Once it has read the key file, it holds the private key and the cached
   * access token. Non-enumerable: out of JSON.stringify(), Object.keys() and
   * spreads.
   */
  protected auth: GoogleAuth<JSONClient>;

  /**
   *
   * @param keyFile Path to a .json, .pem, or .p12 key file
   */
  constructor(keyFile: string) {
    if (!keyFile) {
      throw new Error("'keyFile' must be set when using service account flow.");
    }

    this._keyFile = keyFile;
    // Synchronous: GoogleAuth reads the key file lazily, on the first token request.
    setHiddenProperty(
      this,
      'auth',
      new GoogleAuth({
        keyFile: this._keyFile,
        scopes: SCOPE,
      }),
    );
  }

  async getToken() {
    return await this.auth.getAccessToken();
  }

  /** What JSON.stringify() shows: the key file path, as console.log() does. */
  toJSON(): { keyFile: string } {
    return { keyFile: this._keyFile };
  }

  /** What console.log() and util.inspect() show: the class and the key file path. */
  [inspect.custom](_depth: number, options: InspectOptionsStylized, inspectFn: typeof inspect = inspect): string {
    return `${this.constructor.name} ${inspectFn(this.toJSON(), options)}`;
  }
}
