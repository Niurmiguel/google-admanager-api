import { Statement, UpdateResult } from '../../../common/types';
import { AdUnit, AdUnitPage, AdUnitSize } from './adUnit.type';
import { AdUnitAction } from './adUnit.action';

/**
 * Provides operations for creating, updating and retrieving
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit AdUnit} objects.
 *
 * Line items connect a creative with its associated ad unit through targeting.
 *
 * An ad unit represents a piece of inventory within a publisher.
 * It contains all the settings that need to be associated with the inventory in order to serve ads.
 * For example, the ad unit contains creative size restrictions and AdSense settings.
 */
export interface InventoryServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit AdUnit} objects.
   *
   * @param adUnits the ad units to create
   * @returns the created ad units, with their IDs filled in
   */
  createAdUnits(adUnits: AdUnit[]): Promise<AdUnit[]>;
  /**
   * Returns a set of all relevant {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnitSize AdUnitSize} objects.
   *
   * The given {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.Statement Statement} is currently ignored but may be honored in future versions.
   *
   * @param filterStatement currently ignored but may be honored in future versions
   * @returns the ad unit sizes
   */
  getAdUnitSizesByStatement(filterStatement: Statement): Promise<AdUnitSize[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnitPage AdUnitPage} of
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit AdUnit} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property         | PQL Property                                                                                                                                    |
   * | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
   * | adUnitCode           | {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit#adUnitCode AdUnit.adUnitCode}                     |
   * | id                   | {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit#id AdUnit.id}                                     |
   * | name                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit#name AdUnit.name}                                 |
   * | parentId             | {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit#parentId AdUnit.parentId}                         |
   * | status               | {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit#status AdUnit.status}                             |
   * | lastModifiedDateTime | {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit#lastModifiedDateTime AdUnit.lastModifiedDateTime} |
   *
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of ad units
   * @returns the ad units that match the given filter
   */
  getAdUnitsByStatement(filterStatement: Statement): Promise<AdUnitPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit AdUnit}
   * objects that match the given {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.Statement#query Statement.query}.
   *
   * @param adUnitAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of ad units
   * @returns the result of the action performed
   */
  performAdUnitAction(adUnitAction: AdUnitAction, filterStatement: Statement): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit AdUnit} objects.
   *
   * @param adUnits	the ad units to update
   * @returns the updated ad units
   */
  updateAdUnits(adUnits: AdUnit[]): Promise<AdUnit[]>;
}
