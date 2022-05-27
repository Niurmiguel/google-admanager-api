import { Client } from 'soap';

import { CreativeSetServiceOperations } from './creativeSetService.interface';
import { CreativeSet, CreativeSetPage } from './creativeSet.type';
import { Statement } from '@common/types';

export class CreativeSetService implements CreativeSetServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createCreativeSet(creativeSet: CreativeSet): Promise<CreativeSet> {
    return this._client.createCreativeSet({ creativeSet });
  }

  async getCreativeSetsByStatement(
    filterStatement: Statement,
  ): Promise<CreativeSetPage> {
    return this._client.getCreativeSetsByStatement({
      filterStatement,
    });
  }

  async updateCreativeSet(creativeSet: CreativeSet): Promise<CreativeSet> {
    return this._client.updateCreativeSet({ creativeSet });
  }
}
