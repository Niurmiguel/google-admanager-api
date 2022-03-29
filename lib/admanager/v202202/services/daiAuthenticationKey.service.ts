import { Client } from 'soap';

import { DaiAuthenticationKeyServiceOperations } from '../interfaces';
import { Statement, UpdateResult } from '@common/types';
import {
  DaiAuthenticationKey,
  DaiAuthenticationKeyAction,
  DaiAuthenticationKeyPage,
} from '../types';

export class DaiAuthenticationKeyService
  implements DaiAuthenticationKeyServiceOperations
{
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createDaiAuthenticationKeys(
    daiAuthenticationKeys: DaiAuthenticationKey[],
  ): Promise<DaiAuthenticationKey[]> {
    return this._client.createDaiAuthenticationKeys({ daiAuthenticationKeys });
  }

  async getDaiAuthenticationKeysByStatement(
    filterStatement: Statement,
  ): Promise<DaiAuthenticationKeyPage> {
    return this._client.getDaiAuthenticationKeysByStatement({
      filterStatement,
    });
  }

  async performDaiAuthenticationKeyAction(
    daiAuthenticationKeyAction: DaiAuthenticationKeyAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performDaiAuthenticationKeyAction({
      daiAuthenticationKeyAction: {
        attributes: {
          'xsi:type': daiAuthenticationKeyAction,
        },
      },
      filterStatement,
    });
  }

  async updateDaiAuthenticationKeys(
    daiAuthenticationKeys: DaiAuthenticationKey[],
  ): Promise<DaiAuthenticationKey[]> {
    return this._client.updateDaiAuthenticationKeys({ daiAuthenticationKeys });
  }
}
