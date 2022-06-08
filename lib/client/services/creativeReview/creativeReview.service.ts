import { Client } from 'soap';

import { CreativeReviewServiceOperations } from './creativeReviewService.interface';
import { Statement, UpdateResult } from '../../../common/types';
import { CreativeReviewAction, CreativeReviewPage } from './creativeReview.type';

export class CreativeReviewService implements CreativeReviewServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async getCreativeReviewsByStatement(filterStatement: Statement): Promise<CreativeReviewPage> {
    return this._client.getCreativeReviewsByStatement({
      filterStatement,
    });
  }

  async performCreativeReviewAction(
    creativeReviewAction: CreativeReviewAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performCreativeReviewAction({
      creativeReviewAction: {
        attributes: {
          'xsi:type': creativeReviewAction,
        },
      },
      filterStatement,
    });
  }
}
