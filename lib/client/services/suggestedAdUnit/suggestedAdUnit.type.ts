import { AdUnitParent, AdUnitSize } from '../inventory/adUnit.type';
import { AdUnitTargetWindow } from '../inventory/adUnit.enum';
import { TargetPlatform } from './suggestedAdUnit.enum';
import { PageResult } from '../../../common/types';

/**
 * A SuggestedAdUnit represents a suggestion for a new ad unit, based on an ad tag that has been served at least ten times in the past week,
 * but which does not correspond to a defined ad unit. This type is read-only.
 */
export type SuggestedAdUnit = {
  /**
   * The unique ID of the suggested ad unit. After API version 201311 this field will be a numerical ID. Earlier versions will return a string value which is the complete path to the suggested ad unit with path elements separated by '/' characters. This attribute is read-only and is populated by Google.
   */
  id: string;
  /**
   * Returns the number of times the ad tag corresponding to this suggested ad unit has been served in the previous week. Suggested ad units are only created when they have been served at least ten times in that period. This attribute is read-only and is populated by Google.
   */
  numRequests: number;
  /**
   * The hierarchical path from the last existing ad unit after this and all suggested parent ad units have been created. Each path element is a separate ad unit code in the returned list. This attribute is read-only and is populated by Google.
   */
  path: string[];
  /**
   * The existing hierarchical path leading up to, and including, the parent of the first suggested ad unit in the ad unit hierarchy. The parentPath and the path make up the full path of the suggested ad unit after it is approved. This attribute is read-only and is populated by Google.
   *
   * Note: The ad unit code for each of the parent ad units will not be provided.
   */
  parentPath: AdUnitParent[];
  /**
   * The target attribute of the underlying ad tag, as defined in the AdUnit. This attribute is read-only and is populated by Google.
   */
  targetWindow: AdUnitTargetWindow;
  /**
   * The target platform for the browser that clicked the underlying ad tag. This attribute is read-only and is populated by Google.
   */
  targetPlatform: TargetPlatform;
  /**
   * The target sizes associated with this SuggestedAdUnit. This attribute is read-only and is populated by Google.
   */
  suggestedAdUnitSizes: AdUnitSize[];
};

/**
 * Contains a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/SuggestedAdUnitService.SuggestedAdUnit SuggestedAdUnit} objects.
 */
export type SuggestedAdUnitPage = PageResult<SuggestedAdUnit>;

/**
 * Represents the result of performing an action on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/SuggestedAdUnitService.SuggestedAdUnit SuggestedAdUnit} objects.
 */
export type SuggestedAdUnitUpdateResult = {
  /**
   * The ids of the AdUnit objects that were created in response to a performSuggestedAdUnitAction call.
   */
  newAdUnitIds: string[];
  /**
   * The number of objects that were changed as a result of performing the action.
   */
  numChanges: number;
};
