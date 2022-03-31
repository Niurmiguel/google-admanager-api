import { Statement, UpdateResult } from '@common/types';
import {
  ProposalLineItem,
  ProposalLineItemAction,
  ProposalLineItemMakegoodInfo,
  ProposalLineItemPage,
} from './proposalLineItem.type';

/**
 * Provides operations for creating, updating and retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} objects.
 */
export interface ProposalLineItemServiceOperations {
  /**
   * Creates makegood proposal line items given the specifications provided.
   *
   * @param makegoodInfos
   */
  createMakegoods(
    makegoodInfos: ProposalLineItemMakegoodInfo[],
  ): Promise<ProposalLineItem[]>;
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} objects.
   *
   * @param proposalLineItems the proposal line items to create
   * @returns the created proposal line items with their IDs filled in
   */
  createProposalLineItems(
    proposalLineItems: ProposalLineItem[],
  ): Promise<ProposalLineItem[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItemPage ProposalLineItemPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property         | PQL Property                                                                                                                                    |
   * | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id                   | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem#id ProposalLineItem.id}                                     |
   * | name                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem#name ProposalLineItem.name}                                 |
   * | proposalId                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem#proposalId ProposalLineItem.proposalId}                                 |
   * | startDateTime                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem#startDateTime ProposalLineItem.startDateTime}                                 |
   * | endDateTime                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem#endDateTime ProposalLineItem.endDateTime}                                 |
   * | isArchived                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem#isArchived ProposalLineItem.isArchived}                                 |
   * | lastModifiedDateTime | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem#lastModifiedDateTime ProposalLineItem.lastModifiedDateTime} |
   * | isProgrammatic                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem#isProgrammatic ProposalLineItem.isProgrammatic}                                 |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of proposal line items
   * @returns the proposal line items that match the given filter
   */
  getProposalLineItemsByStatement(
    filterStatement: Statement,
  ): Promise<ProposalLineItemPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} objects that match the given Statement.
   *
   * @param ProposalLineItemAction the action to perform
   * @param filterStatement 	a PQL statement used to filter proposal line items
   * @returns 	the result of the action performed
   */
  performProposalLineItemAction(
    proposalLineItemAction: ProposalLineItemAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} objects.
   *
   * @param proposalLineItems the proposal line items to update
   * @returns the updated proposal line items
   */
  updateProposalLineItems(
    proposalLineItems: ProposalLineItem[],
  ): Promise<ProposalLineItem[]>;
}
