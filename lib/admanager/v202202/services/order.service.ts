import { Client } from 'soap';

import { PageResult, Statement, UpdateResult } from '@common/types';
import { OrderServiceOperations } from '../interfaces';
import { Order, OrderAction } from '../types';

export class OrderService implements OrderServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createOrders(orders: Order[]): Promise<Order[]> {
    return this._client.createOrders({ orders });
  }

  async getOrdersByStatement(
    filterStatement: Statement,
  ): Promise<PageResult<Order>> {
    return this._client.getOrdersByStatement({
      filterStatement: { ...filterStatement },
    });
  }

  async performOrderAction(
    orderAction: OrderAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performOrderAction({
      orderAction: {
        attributes: {
          'xsi:type': orderAction,
        },
      },
      filterStatement: { ...filterStatement },
    });
  }

  async updateOrders(orders: Order[]): Promise<Order[]> {
    return this._client.updateOrders({ orders });
  }
}
