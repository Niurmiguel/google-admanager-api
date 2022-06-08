import { Statement } from '../../../common/types';
import { SuggestedAdUnitAction, SuggestedAdUnitPage, SuggestedAdUnitUpdateResult } from './suggestedAdUnit.type';

/**
 * This service provides operations for retrieving and approving
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/SuggestedAdUnitService.SuggestedAdUnit SuggestedAdUnit} objects.
 *
 * Publishers may create ad tags that lack a corresponding ad unit defined in DFP,
 * in order to gather information about potential ads without needing to create dummy ad units and make them available for targeting in line items.
 * Any undefined ad unit to receive more than ten serving requests in the past week is treated as a 'suggested ad unit'.
 * These can be queried by the client and selectively approved. Approval causes a new ad unit to be created based on the suggested ad unit.
 * Unapproved suggested ad units cease to exist whenever their corresponding ad tag has been served fewer than ten times in the past seven days.
 *
 * This service is only available to Premium publishers. Before use, suggested ad units must be enabled for the client's network.
 * This can be done in the UI: in the Inventory tab, click "Network settings" in the left-hand panel, then enable the checkbox "Get suggestions for new ad units."
 * If suggested ad units are not enabled, then getSuggestedAdUnitsByStatement will always return an empty page.
 */
export interface SuggestedAdUnitServiceOperations {
  /**
   * Gets a {@linkhttps://developers.google.com/ad-manager/api/reference/v202202/SuggestedAdUnitService.SuggestedAdUnitPage SuggestedAdUnitPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/SuggestedAdUnitService.SuggestedAdUnit SuggestedAdUnit} objects that satisfy the filter query.
   * There is a system-enforced limit of 1000 on the number of suggested ad units that are suggested at any one time.
   *
   *
   * | PQL Property | PQL Property                                                                                                                                          |
   * | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/SuggestedAdUnitService.SuggestedAdUnit#id SuggestedAdUnit.id}                   |
   * | numRequests  | {@link https://developers.google.com/ad-manager/api/reference/v202202/SuggestedAdUnitService.SuggestedAdUnit#numRequests SuggestedAdUnit.numRequests} |
   *
   * **Note**: After API version 201311, the id field will only be numerical.
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of suggested ad units
   * @returns the suggested ad units that match the given filter
   */
  getSuggestedAdUnitsByStatement(filterStatement: Statement): Promise<SuggestedAdUnitPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/SuggestedAdUnitService.SuggestedAdUnit SuggestedAdUnit} objects that match the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/SuggestedAdUnitService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                                                          |
   * | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/SuggestedAdUnitService.SuggestedAdUnit#id SuggestedAdUnit.id}                   |
   * | numRequests  | {@link https://developers.google.com/ad-manager/api/reference/v202202/SuggestedAdUnitService.SuggestedAdUnit#numRequests SuggestedAdUnit.numRequests} |
   *
   * @param suggestedAdUnitAction the action to perform
   * @param filterStatement	a Publisher Query Language statement used to filter a set of suggested ad units
   * @returns the result of the action performed
   */
  performSuggestedAdUnitAction(
    suggestedAdUnitAction: SuggestedAdUnitAction,
    filterStatement: Statement,
  ): Promise<SuggestedAdUnitUpdateResult>;
}
