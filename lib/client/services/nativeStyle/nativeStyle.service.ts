import { Client } from 'soap';

import { NativeStyleServiceOperations } from './nativeStyleService.interface';
import { NativeStyle, NativeStylePage } from './nativeStyle.type';
import { Statement, UpdateResult } from '../../../common/types';
import { NativeStyleAction } from './nativeStyle.action';

export class NativeStyleService implements NativeStyleServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createNativeStyles(nativeStyles: NativeStyle[]): Promise<NativeStyle[]> {
    return this._client.createNativeStyles({ nativeStyles });
  }

  async getNativeStylesByStatement(filterStatement: Statement): Promise<NativeStylePage> {
    return this._client.getNativeStylesByStatement({
      filterStatement,
    });
  }

  async performNativeStyleAction(
    nativeStyleAction: NativeStyleAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performNativeStyleAction({
      NativeStyleAction: {
        attributes: {
          'xsi:type': nativeStyleAction.constructor.name,
        },
      },
      filterStatement,
    });
  }

  async updateNativeStyles(nativeStyles: NativeStyle[]): Promise<NativeStyle[]> {
    return this._client.updateNativeStyles({ nativeStyles });
  }
}
