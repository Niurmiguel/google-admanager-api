import { TargetingPresetPage } from './targetingPresent.type';
import { Statement } from '../../../common/types';

/**
 * Service for interacting with Targeting Presets.
 */
export interface TargetingPresetServiceOperations {
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/TargetingPresetService.TargetingPresetPage TargetingPresetPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/TargetingPresetService.TargetingPreset TargetingPreset} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/TargetingPresetService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                                            |
   * | ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/TargetingPresetService.TargetingPreset#id TargetingPreset.id}     |
   * | name         | {@link https://developers.google.com/ad-manager/api/reference/v202202/TargetingPresetService.TargetingPreset#name TargetingPreset.name} |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of labels.
   * @returns the targeting presets that match the given filter
   */
  getTargetingPresetsByStatement(
    filterStatement: Statement,
  ): Promise<TargetingPresetPage>;
}
