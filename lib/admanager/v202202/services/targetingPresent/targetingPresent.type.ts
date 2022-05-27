import { PageResult } from '@common/types';

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
 * Captures a paged query of TargetingPresetDto objects.
 */
export type TargetingPresetPage = PageResult<AdUnitTargeting>;
