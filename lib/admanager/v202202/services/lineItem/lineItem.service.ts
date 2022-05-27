import { Client } from 'soap';

import { LineItem, LineItemAction, LineItemPage } from './lineItem.type';
import { LineItemServiceOperations } from './lineItemService.interface';
import { Statement, UpdateResult } from '@common/types';

export class LineItemService implements LineItemServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createLineItems(lineItems: LineItem[]): Promise<LineItem[]> {
    return this._client.createLineItems({ lineItems });
  }

  async getLineItemsByStatement(
    filterStatement: Statement,
  ): Promise<LineItemPage> {
    return this._client.getLineItemsByStatement({
      filterStatement,
    });
  }

  async performLineItemAction(
    lineItemAction: LineItemAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performLineItemAction({
      lineItemAction: {
        attributes: {
          'xsi:type': lineItemAction,
        },
      },
      filterStatement,
    });
  }

  async updateLineItems(lineItems: LineItem[]): Promise<LineItem[]> {
    return this._client.updateLineItems({ lineItems });
  }
}
