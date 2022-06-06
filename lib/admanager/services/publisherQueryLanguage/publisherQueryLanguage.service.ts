import { Client } from 'soap';

import { PublisherQueryLanguageServiceOperations } from './publisherQueryLanguageService.interface';
import { ResultSet } from './publisherQueryLanguage.type';
import { Statement } from '../../../common/types';

export class PublisherQueryLanguageService
  implements PublisherQueryLanguageServiceOperations
{
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async select(selectStatement: Statement): Promise<ResultSet> {
    return this._client.select({
      selectStatement,
    });
  }
}
