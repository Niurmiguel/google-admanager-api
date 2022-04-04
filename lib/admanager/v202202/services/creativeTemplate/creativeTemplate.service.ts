import { Client } from 'soap';

import { CreativeTemplateServiceOperations } from './creativeTemplateService.interface';
import { CreativeTemplatePage } from './creativeTemplate.type';
import { Statement } from '@common/types';

export class CreativeTemplateService
  implements CreativeTemplateServiceOperations
{
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async getCreativeTemplatesByStatement(
    filterStatement: Statement,
  ): Promise<CreativeTemplatePage> {
    return this._client.getCreativeTemplatesByStatement({
      filterStatement,
    });
  }
}
