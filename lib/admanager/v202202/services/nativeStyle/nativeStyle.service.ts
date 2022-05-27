import { Client } from 'soap';

import { NativeStyleServiceOperations } from './nativeStyleService.interface';
import { Statement, UpdateResult } from '@common/types';
import {
  NativeStyle,
  NativeStyleAction,
  NativeStylePage,
} from './nativeStyle.type';

export class NativeStyleService implements NativeStyleServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createNativeStyles(
    nativeStyles: NativeStyle[],
  ): Promise<NativeStyle[]> {
    return this._client.createNativeStyles({ nativeStyles });
  }

  async getNativeStylesByStatement(
    filterStatement: Statement,
  ): Promise<NativeStylePage> {
    return this._client.getNativeStylesByStatement({
      filterStatement,
    });
  }

  async performNativeStyleAction(
    NativeStyleAction: NativeStyleAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performNativeStyleAction({
      NativeStyleAction: {
        attributes: {
          'xsi:type': NativeStyleAction,
        },
      },
      filterStatement,
    });
  }

  async updateNativeStyles(
    nativeStyles: NativeStyle[],
  ): Promise<NativeStyle[]> {
    return this._client.updateNativeStyles({ nativeStyles });
  }
}
