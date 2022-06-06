import { Client } from 'soap';

import { CreativeWrapperServiceOperations } from './creativeWrapperService.interface';
import { Statement, UpdateResult } from '../../../common/types';
import {
  CreativeWrapper,
  CreativeWrapperAction,
  CreativeWrapperPage,
} from './creativeWrapper.type';

export class CreativeWrapperService
  implements CreativeWrapperServiceOperations
{
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createCreativeWrappers(
    creativeWrappers: CreativeWrapper[],
  ): Promise<CreativeWrapper[]> {
    return this._client.createCreativeWrappers({ creativeWrappers });
  }

  async getCreativeWrappersByStatement(
    filterStatement: Statement,
  ): Promise<CreativeWrapperPage> {
    return this._client.getCreativeWrappersByStatement({
      filterStatement,
    });
  }

  async performCreativeWrapperAction(
    creativeWrapperAction: CreativeWrapperAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performCreativeWrapperAction({
      creativeWrapperAction: {
        attributes: {
          'xsi:type': creativeWrapperAction,
        },
      },
      filterStatement,
    });
  }

  async updateCreativeWrappers(
    creativeWrappers: CreativeWrapper[],
  ): Promise<CreativeWrapper[]> {
    return this._client.updateCreativeWrappers({ creativeWrappers });
  }
}
