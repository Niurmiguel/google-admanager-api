import { AdSpotTargetingType } from './adRule.enum';
import { PageResult } from '../../../common/types';
import { LineItemType } from '../../common/enums';

/**
 * A AdSpot is a targetable entity used in the creation of AdRule objects.
 *
 * A ad spot contains a variable number of ads and has constraints (ad duration, reservation type, etc) on the ads that can appear in it.
 */
export type AdSpot = {
  /**
   * The unique ID of the AdSpot. This value is readonly and is assigned by Google.
   */
  id: number;

  /**
     * Name of the AdSpot. The name is case insenstive and can be referenced in ad tags. This value is required if customSpot is true, and cannot be set otherwise.
    
    You can use alphanumeric characters and symbols other than the following: ", ', =, !, +, #, *, ~, ;, ^, (, ), <, >, [, ], the white space character.
     */
  name: string;

  /**
   * Descriptive name for the AdSpot.This value is optional if customSpot is true, and cannot be set otherwise.
   */
  displayName?: string;

  /**
   * Whether this ad spot is a custom spot. This field is optional and defaults to false.
   *
   * Custom spots can be reused and targeted in the targeting picker.
   */
  customSpot?: boolean;

  /**
   * Whether this ad spot is a flexible spot. This field is optional and defaults to false.
   *
   * Flexible spots are allowed to have no max number of ads.
   */
  flexible?: boolean;

  /**
   * The maximum total duration for this AdSpot. This field is optional, defaults to 0, and supports precision to the nearest second.
   */
  maxDurationMillis?: number;

  /**
   * The maximum number of ads allowed in the AdSpot. This field is optional and defaults to O.
   *
   * A maxNumberOfAds of 0 means that there is no maximum for the number of ads in the ad spot. No max ads is only supported for ad spots that have flexible set to true.
   */
  maxNumberOfAds?: number;

  /**
   * The SubpodTargetingType determines how this ad spot can be targeted. This field is required.
   */
  targetingType: AdSpotTargetingType;

  /**
   * Whether backfill is blocked in this ad spot. This field is optional and defaults to false.
   */
  backfillBlocked?: boolean;

  /**
   * The set of line item types that may appear in the ad spot. This field is optional and defaults to an empty set, which means that all types are allowed.
   *
   * Note, backfill reservation types are controlled via the backfillBlocked field.
   */
  allowedLineItemTypes?: LineItemType[];

  /**
   * Whether inventory sharing is blocked in this ad spot. This field is optional and defaults to false.
   */
  inventorySharingBlocked?: boolean;
};

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/AdRuleService.AdSpot AdSpot} objects.
 */
export type AdSpotPage = PageResult<AdSpot>;
