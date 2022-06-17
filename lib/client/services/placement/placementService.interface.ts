import { Statement, UpdateResult } from '../../../common/types';
import { Placement, PlacementPage } from './placement.type';
import { PlacementAction } from './placement.action';

/**
 * Provides operations for creating, updating and retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Placement Placement} objects.
 *
 * You can use a placement to group ad units. For example, you might have a placement that focuses on sports sites, which may be spread across different branches of your inventory.
 * You might also have a "fire sale" placement that includes ad units that have not been selling and are consequently priced very attractively.
 */
export interface PlacementServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Placement Placement} objects.
   *
   * @param placements the placements to create
   * @returns the created placements with their IDs filled in
   */
  createPlacements(placements: Placement[]): Promise<Placement[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.PlacementPage PlacementPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Placement Placement} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property         | PQL Property                                                                                                                                          |
   * | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | description          | {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Placement#description Placement.description}                   |
   * | id                   | {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Placement#id Placement.id}                                     |
   * | name                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Placement#name Placement.name}                                 |
   * | placementCode        | {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Placement#placementCode Placement.placementCode}               |
   * | status               | {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Placement#status Placement.status}                             |
   * | lastModifiedDateTime | {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Placement#lastModifiedDateTime Placement.lastModifiedDateTime} |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of placements
   * @returns the placements that match the given filter
   */
  getPlacementsByStatement(filterStatement: Statement): Promise<PlacementPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Placement Placement} objects that match the given Statement.
   *
   * @param PlacementAction the action to perform
   * @param filterStatement 	a PQL statement used to filter placements
   * @returns 	the result of the action performed
   */
  performPlacementAction(placementAction: PlacementAction, filterStatement: Statement): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Placement Placement} objects.
   *
   * @param placements the placements to update
   * @returns the updated placements
   */
  updatePlacements(placements: Placement[]): Promise<Placement[]>;
}
