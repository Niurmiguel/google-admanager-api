import { Statement, UpdateResult } from '../../../common/types';
import { Order, OrderPage } from './order.type';
import { OrderAction } from './order.action';

/**
 * Provides methods for creating, updating and retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order Order} objects.
 *
 * An order is a grouping of {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem} objects.
 * Line items have a many-to-one relationship with orders, meaning each line item can belong to only one order, but orders can have multiple line items.
 * An order can be used to manage the line items it contains.
 */
export interface OrderServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order Order} objects.
   *
   * @param orders the orders to create
   * @returns the created orders with their IDs filled in
   */
  createOrders(orders: Order[]): Promise<Order[]>;
  /**
   * Gets an {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.OrderPage OrderPage} of
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order Order}
   * objects that satisfy the given {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Statement#queryStatement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property         | PQL Property                                                                                                                              |
   * | ------------         | ----------------------------------------------------------------------------------------------------------------------------------------- |
   * | advertiserId         | {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order#advertiserId Order.advertiserId}                 |
   * | endDateTime          | {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order#endDateTime Order.endDateTime}                   |
   * | id                   | {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order#id Order.id}                                     |
   * | name                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order#name Order.name}                                 |
   * | salespersonId        | {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order#salespersonId Order.salespersonId}               |
   * | startDateTime        | {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order#startDateTime Order.startDateTime}               |
   * | status               | {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order#status Order.status}                             |
   * | traffickerId         | {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order#traffickerId Order.traffickerId}                 |
   * | lastModifiedDateTime | {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order#lastModifiedDateTime Order.lastModifiedDateTime} |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of orders
   * @returns the orders that match the given filter
   */
  getOrdersByStatement(filterStatement: Statement): Promise<OrderPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order Order}
   * objects that match the given {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Statement#query Statement.query}.
   *
   * @param orderAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of orders
   * @returns the result of the action performed
   */
  performOrderAction(orderAction: OrderAction, filterStatement: Statement): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order Order} objects.
   * @param orders the orders to update
   * @returns the updated orders
   */
  updateOrders(orders: Order[]): Promise<Order[]>;
}
