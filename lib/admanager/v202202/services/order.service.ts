import { Client } from 'soap';

import { Order, OrderAction, OrderPage } from '../types';
import { Statement, UpdateResult } from '@common/types';
import { OrderServiceOperations } from '../interfaces';

export class OrderService implements OrderServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createOrders(orders: Order[]): Promise<Order[]> {
    return this._client.createOrders({ orders });
  }

  async getOrdersByStatement(filterStatement: Statement): Promise<OrderPage> {
    return this._client.getOrdersByStatement({
      filterStatement,
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
      filterStatement,
    });
  }

  async updateOrders(orders: Order[]): Promise<Order[]> {
    return this._client.updateOrders({ orders });
  }
}
