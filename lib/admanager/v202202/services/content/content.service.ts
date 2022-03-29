import { Client } from 'soap';

import { ContentServiceOperations } from './contentService.interface';
import { ContentPage } from './content.type';
import { Statement } from '@common/types';

export class ContentService implements ContentServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async getContentByStatement(statement: Statement): Promise<ContentPage> {
    return this._client.getContentByStatement({
      statement,
    });
  }
}
