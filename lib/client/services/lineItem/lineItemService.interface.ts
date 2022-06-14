import { LineItem, LineItemAction, LineItemPage } from './lineItem.type';
import { Statement, UpdateResult } from '../../../common/types';

/**
 * Provides operations for creating, updating and retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} objects.
 *
 * Line items define the campaign. For example, line items define:
 *
 * - a budget
 * - a span of time to run
 * - ad unit targeting
 *
 * In short, line items connect all of the elements of an ad campaign.
 *
 * Line items and creatives can be associated with each other through LineItemCreativeAssociation objects.
 * An ad unit will host a creative through both this association and the LineItem.targeting to it.
 * The delivery of a line item depends on its priority. More information on line item priorities can be found on the DFP Help Center.
 */
export interface LineItemServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} objects.
   *
   * @param lineItems the line items to create
   * @returns the created line items with their IDs filled in
   */
  createLineItems(lineItems: LineItem[]): Promise<LineItem[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItemPage LineItemPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property         | PQL Property                                                                                                                                       |
   * | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | CostType             | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem#costType LineItem.costType}                         |
   * | CreationDateTime     | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem#creationDateTime LineItem.creationDateTime}         |
   * | DeliveryRateType     | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem#deliveryRateType LineItem.deliveryRateType}         |
   * | EndDateTime          | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem#endDateTime LineItem.endDateTime}                   |
   * | externalId           | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem#externalId LineItem.externalId}                     |
   * | Id                   | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem#id LineItem.id}                                     |
   * | IsMissingCreatives   | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem#isMissingCreatives LineItem.isMissingCreatives}     |
   * | IsSetTopBoxEnabled   | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem#isSetTopBoxEnabled LineItem.isSetTopBoxEnabled}     |
   * | LastModifiedDateTime | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem#lastModifiedDateTime LineItem.lastModifiedDateTime} |
   * | LineItemType         | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem#lineItemType LineItem.lineItemType}                 |
   * | Name                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem#name LineItem.name}                                 |
   * | OrderId              | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem#orderId LineItem.orderId}                           |
   * | StartDateTime        | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem#startDateTime LineItem.startDateTime}               |
   * | Status               | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem#status LineItem.status}                             |
   * | UnitsBought          | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem#unitsBought LineItem.unitsBought}                   |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of line items.
   * @returns the line items that match the given filter
   */
  getLineItemsByStatement(filterStatement: Statement): Promise<LineItemPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} objects that match the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.Statement#query Statement.query}.
   *
   * @param lineItemAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of line items
   * @returns the result of the action performed
   */
  performLineItemAction(lineItemAction: LineItemAction, filterStatement: Statement): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} objects.
   *
   * @param lineItems the line items to update.
   * @returns the updated line items
   */
  updateLineItems(lineItems: LineItem[]): Promise<LineItem[]>;
}
