import { TargetingPreset, TargetingPresetPage } from './targetingPresent.type';
import { TargetingPresetAction } from './targetingPresent.action';
import { Statement, UpdateResult } from '../../../common/types';

/**
 * Service for interacting with Targeting Presets.
 */
export interface TargetingPresetServiceOperations {
  /**
   * Creates new TargetingPreset objects.
   *
   * @param targetingPresets the targeting presets to create
   * @returns the created targeting presets with their IDs filled in
   */
  createTargetingPresets(targetingPresets: TargetingPreset[]): Promise<TargetingPreset[]>;
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
  getTargetingPresetsByStatement(filterStatement: Statement): Promise<TargetingPresetPage>;
  /**
   * Performs actions on TargetingPreset objects that match the given Statement.query.
   *
   * @param targetingPresetAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of targeting presets
   * @returns the result of the action performed
   */
  performTargetingPresetAction(
    targetingPresetAction: TargetingPresetAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified TargetingPreset objects.
   *
   * @param targetingPresets the targeting presets to update
   * @returns the updated targeting presets
   */
  updateTargetingPresets(targetingPresets: TargetingPreset[]): Promise<TargetingPreset[]>;
}
