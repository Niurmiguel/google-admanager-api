import { Client } from 'soap';

import { TargetingPresetServiceOperations } from './targetingPresentService.interface';
import { TargetingPresetPage } from './targetingPresent.type';
import { Statement } from '@common/types';

export class TargetingPresetService
  implements TargetingPresetServiceOperations
{
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async getTargetingPresetsByStatement(
    filterStatement: Statement,
  ): Promise<TargetingPresetPage> {
    return this._client.getTargetingPresetsByStatement({
      filterStatement,
    });
  }
}
