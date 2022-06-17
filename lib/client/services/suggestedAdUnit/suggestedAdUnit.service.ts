import { Client } from 'soap';

import { SuggestedAdUnitPage, SuggestedAdUnitUpdateResult } from './suggestedAdUnit.type';
import { SuggestedAdUnitServiceOperations } from './suggestedAdUnitService.interface';
import { SuggestedAdUnitAction } from './suggestedAdUnit.action';
import { Statement } from '../../../common/types';

export class SuggestedAdUnitService implements SuggestedAdUnitServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async getSuggestedAdUnitsByStatement(filterStatement: Statement): Promise<SuggestedAdUnitPage> {
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
          'xsi:type': suggestedAdUnitAction.constructor.name,
        },
      },
      filterStatement,
    });
  }
}
