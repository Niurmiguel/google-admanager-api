import { Client } from 'soap';

import { CustomTargetingServiceOperations } from '../interfaces';
import { Statement, UpdateResult } from '@common/types';
import {
  CustomTargetingKey,
  CustomTargetingKeyAction,
  CustomTargetingKeyPage,
  CustomTargetingValue,
  CustomTargetingValueAction,
  CustomTargetingValuePage,
} from '../types';

export class CustomTargetingService
  implements CustomTargetingServiceOperations
{
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createCustomTargetingKeys(
    keys: CustomTargetingKey[],
  ): Promise<CustomTargetingKey[]> {
    return this._client.createCustomTargetingKeys({ keys });
  }

  async createCustomTargetingValues(
    values: CustomTargetingValue[],
  ): Promise<CustomTargetingValue[]> {
    return this._client.createCustomTargetingValues({ values });
  }

  async getCustomTargetingKeysByStatement(
    filterStatement: Statement,
  ): Promise<CustomTargetingKeyPage> {
    return this._client.getCustomTargetingKeysByStatement({
      filterStatement,
    });
  }

  async getCustomTargetingValuesByStatement(
    filterStatement: Statement,
  ): Promise<CustomTargetingValuePage> {
    return this._client.getCustomTargetingValuesByStatement({
      filterStatement,
    });
  }

  async performCustomTargetingKeyAction(
    customTargetingKeyAction: CustomTargetingKeyAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performCustomTargetingKeyAction({
      customTargetingKeyAction: {
        attributes: {
          'xsi:type': customTargetingKeyAction,
        },
      },
      filterStatement,
    });
  }

  async performCustomTargetingValueAction(
    customTargetingValueAction: CustomTargetingValueAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performCustomTargetingValueAction({
      customTargetingValueAction: {
        attributes: {
          'xsi:type': customTargetingValueAction,
        },
      },
      filterStatement,
    });
  }

  async updateCustomTargetingKeys(
    keys: CustomTargetingKey[],
  ): Promise<CustomTargetingKey[]> {
    return this._client.updateCustomTargetingKeys({ keys });
  }

  async updateCustomTargetingValues(
    values: CustomTargetingValue[],
  ): Promise<CustomTargetingValue[]> {
    return this._client.updateCustomTargetingValues({ values });
  }
}
