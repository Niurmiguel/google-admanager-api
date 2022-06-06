import { Client } from 'soap';

import { CustomFieldServiceOperations } from './customFieldService.interface';
import { Statement, UpdateResult } from '../../../common/types';
import {
  CustomField,
  CustomFieldAction,
  CustomFieldOption,
  CustomFieldPage,
} from './customField.type';

export class CustomFieldService implements CustomFieldServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createCustomFieldOptions(
    customFieldOptions: CustomFieldOption[],
  ): Promise<CustomFieldOption[]> {
    return this._client.createCustomFieldOptions({ customFieldOptions });
  }

  async createCustomFields(
    customFields: CustomField[],
  ): Promise<CustomField[]> {
    return this._client.createCustomFields({ customFields });
  }

  async getCustomFieldOption(
    customFieldOptionId: number,
  ): Promise<CustomFieldOption> {
    return this._client.getCustomFieldsByStatement({
      customFieldOptionId,
    });
  }

  async getCustomFieldsByStatement(
    filterStatement: Statement,
  ): Promise<CustomFieldPage> {
    return this._client.getCustomFieldsByStatement({
      filterStatement,
    });
  }

  async performCustomFieldAction(
    customFieldAction: CustomFieldAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performCustomFieldAction({
      customFieldAction: {
        attributes: {
          'xsi:type': customFieldAction,
        },
      },
      filterStatement,
    });
  }

  async updateCustomFieldOptions(
    customFieldOptions: CustomFieldOption[],
  ): Promise<CustomFieldOption[]> {
    return this._client.updateCustomFields({ customFieldOptions });
  }

  async updateCustomFields(
    CustomFields: CustomField[],
  ): Promise<CustomField[]> {
    return this._client.updateCustomFields({ CustomFields });
  }
}
