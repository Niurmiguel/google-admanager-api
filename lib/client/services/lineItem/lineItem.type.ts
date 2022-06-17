import { LineItemSummary } from '../../common/types/lineItemSummary.type';
import { CreativeTargeting, Targeting } from '../../common/types';
import { PageResult } from '../../../common/types';

/**
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem}
 * is an advertiser's commitment to purchase a specific number of ad impressions, clicks, or time.
 */
export type LineItem = LineItemSummary & {
  /**
   * Contains the targeting criteria for the ad campaign. This attribute is required.
   */
  targeting: Targeting;

  /**
   * A list of CreativeTargeting objects that can be used to specify creative level targeting for this line item.
   * Creative level targeting is specified in a creative placeholder's CreativePlaceholder.targetingName field by referencing the creative targeting's name.
   * It also needs to be re-specified in the LineItemCreativeAssociation.targetingName field when associating a line item with a creative that fits into that placeholder.
   */
  creativeTargetings: CreativeTargeting[];
};

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} objects.
 */
export type LineItemPage = PageResult<LineItem>;
