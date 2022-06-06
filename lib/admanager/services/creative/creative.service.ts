import { Client } from 'soap';

import { CreativeServiceOperations } from './creativeService.interface';
import { Creative, CreativeAction, CreativePage } from './creative.type';
import { Statement, UpdateResult } from '../../../common/types';

export class CreativeService implements CreativeServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createCreatives(creatives: Creative[]): Promise<Creative[]> {
    return this._client.createCreatives({ creatives });
  }

  async getCreativesByStatement(
    filterStatement: Statement,
  ): Promise<CreativePage> {
    return this._client.getCreativesByStatement({
      filterStatement,
    });
  }

  async performCreativeAction(
    creativeAction: CreativeAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performCreativeAction({
      creativeAction: {
        attributes: {
          'xsi:type': creativeAction,
        },
      },
      filterStatement,
    });
  }

  async updateCreatives(creatives: Creative[]): Promise<Creative[]> {
    return this._client.updateCreatives({ creatives });
  }
}
