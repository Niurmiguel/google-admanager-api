import { Client } from 'soap';

import { InventoryServiceOperations } from './inventoryService.interface';
import { Statement, UpdateResult } from '../../../common/types';
import { AdUnit, AdUnitPage, AdUnitSize } from './adUnit.type';
import { AdUnitAction } from './adUnit.action';

export class InventoryService implements InventoryServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createAdUnits(adUnits: AdUnit[]): Promise<AdUnit[]> {
    return this._client.createAdUnits({ adUnits });
  }

  async getAdUnitSizesByStatement(filterStatement: Statement): Promise<AdUnitSize[]> {
    return this._client.getAdUnitSizesByStatement({
      filterStatement,
    });
  }

  async getAdUnitsByStatement(filterStatement: Statement): Promise<AdUnitPage> {
    return this._client.getAdUnitsByStatement({
      filterStatement,
    });
  }

  async performAdUnitAction(adUnitAction: AdUnitAction, filterStatement: Statement): Promise<UpdateResult> {
    return this._client.performAdUnitAction({
      adUnitAction: {
        attributes: {
          'xsi:type': adUnitAction.constructor.name,
        },
      },
      filterStatement,
    });
  }

  async updateAdUnits(adUnits: AdUnit[]): Promise<AdUnit[]> {
    return this._client.updateAdUnits({ adUnits });
  }
}
