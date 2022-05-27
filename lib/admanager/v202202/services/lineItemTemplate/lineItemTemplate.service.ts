import { Client } from 'soap';

import { LineItemTemplateServiceOperations } from './lineItemTemplateService.interface';
import { LineItemTemplatePage } from './lineItemTemplate.type';
import { Statement } from '@common/types';

export class LineItemTemplateService
  implements LineItemTemplateServiceOperations
{
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async getLineItemTemplatesByStatement(
    filterStatement: Statement,
  ): Promise<LineItemTemplatePage> {
    return this._client.getLineItemTemplatesByStatement({
      filterStatement,
    });
  }
}
