import { PageResult } from '../../../common/types';
import { Targeting } from '../../common/types';

/**
 * Represents targeted or excluded ad units.
 */
export type AdUnitTargeting = {
  /**
   * Included or excluded ad unit id.
   */
  adUnitId: string;
  /**
   * Whether or not all descendants are included (or excluded) as part of including (or excluding) this ad unit. By default, the value is true which means targeting this ad unit will target all of its descendants.
   */
  includeDescendants: boolean;
};

/**
 * User-defined preset targeting criteria.
 */
export type TargetingPreset = {
  /**
   * The unique ID of the TargetingPreset. This value is readonly and is assigned by Google.
   */
  id: number;
  /**
   * The name of the TargetingPreset. This value is required to create a targeting preset and has a maximum length of 255 characters.
   */
  name: string;
  /**
   * Contains the targeting criteria for the TargetingPreset. This attribute is required.
   */
  targeting: Targeting;
};

/**
 * Captures a paged query of TargetingPreset objects.
 */
export type TargetingPresetPage = PageResult<TargetingPreset>;
