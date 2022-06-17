import { Client } from 'soap';

import { DaiAuthenticationKeyServiceOperations } from './daiAuthenticationKeyService.interface';
import { DaiAuthenticationKey, DaiAuthenticationKeyPage } from './daiAuthenticationKey.type';
import { DaiAuthenticationKeyAction } from './daiAuthenticationKey.action';
import { Statement, UpdateResult } from '../../../common/types';

export class DaiAuthenticationKeyService implements DaiAuthenticationKeyServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createDaiAuthenticationKeys(daiAuthenticationKeys: DaiAuthenticationKey[]): Promise<DaiAuthenticationKey[]> {
    return this._client.createDaiAuthenticationKeys({ daiAuthenticationKeys });
  }

  async getDaiAuthenticationKeysByStatement(filterStatement: Statement): Promise<DaiAuthenticationKeyPage> {
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
          'xsi:type': daiAuthenticationKeyAction.constructor.name,
        },
      },
      filterStatement,
    });
  }

  async updateDaiAuthenticationKeys(daiAuthenticationKeys: DaiAuthenticationKey[]): Promise<DaiAuthenticationKey[]> {
    return this._client.updateDaiAuthenticationKeys({ daiAuthenticationKeys });
  }
}
