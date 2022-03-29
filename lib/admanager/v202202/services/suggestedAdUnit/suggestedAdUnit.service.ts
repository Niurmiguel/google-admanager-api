import { Client } from 'soap';

import { SuggestedAdUnitServiceOperations } from './suggestedAdUnitService.interface';
import { Statement } from '@common/types';
import {
  SuggestedAdUnitAction,
  SuggestedAdUnitPage,
  SuggestedAdUnitUpdateResult,
} from './suggestedAdUnit.type';

export class SuggestedAdUnitService
  implements SuggestedAdUnitServiceOperations
{
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async getSuggestedAdUnitsByStatement(
    filterStatement: Statement,
  ): Promise<SuggestedAdUnitPage> {
    return this._client.getSuggestedAdUnitsByStatement({
      filterStatement,
    });
  }

  async performSuggestedAdUnitAction(
    suggestedAdUnitAction: SuggestedAdUnitAction,
    filterStatement: Statement,
  ): Promise<SuggestedAdUnitUpdateResult> {
    return this._client.performSuggestedAdUnitAction({
      suggestedAdUnitAction: {
        attributes: {
          'xsi:type': suggestedAdUnitAction,
        },
      },
      filterStatement,
    });
  }
}
