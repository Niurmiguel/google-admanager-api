import { Statement, UpdateResult } from '../../../common/types';
import {
  CustomTargetingKey,
  CustomTargetingKeyAction,
  CustomTargetingKeyPage,
  CustomTargetingValue,
  CustomTargetingValueAction,
  CustomTargetingValuePage,
} from './customTargeting.type';

/**
 * Provides operations for creating, updating and retrieving
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey CustomTargetingKey}
 * and {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue CustomTargetingValue} objects.
 *
 */
export interface CustomTargetingServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey CustomTargetingKey} objects.
   * The following fields are required:
   *
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey#name CustomTargetingKey.name }
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey#type CustomTargetingKey.type }
   *
   * @param keys the custom targeting keys to update
   * @returns the updated custom targeting keys
   */
  createCustomTargetingKeys(
    keys: CustomTargetingKey[],
  ): Promise<CustomTargetingKey[]>;
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue CustomTargetingValue} objects.
   * The following fields are required:
   *
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue#customTargetingKeyId CustomTargetingValue.customTargetingKeyId }
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey#name CustomTargetingValue.name }
   *
   * @param values 	the custom targeting values to update
   * @returns the updated custom targeting values
   */
  createCustomTargetingValues(
    values: CustomTargetingValue[],
  ): Promise<CustomTargetingValue[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKeyPage CustomTargetingKeyPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey CustomTargetingKey} objects that satisfy
   * the given {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                                                                |
   * | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey#id CustomTargetingKey.id}                  |
   * | name         | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey#name CustomTargetingKey.name}               |
   * | displayName  | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey#displayName CustomTargetingKey.displayName} |
   * | type         | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey#type CustomTargetingKey.type}               |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of custom targeting keys
   * @returns the custom targeting keys that match the given filter
   */
  getCustomTargetingKeysByStatement(
    filterStatement: Statement,
  ): Promise<CustomTargetingKeyPage>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValuePage CustomTargetingValuePage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue CustomTargetingValue} objects that satisfy
   * the given {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.Statement#query Statement.query}.
   *
   * The WHERE clause in the Statement.query must always contain CustomTargetingValue.customTargetingKeyId as one of its columns in a way that it is
   * AND'ed with the rest of the query. So, if you want to retrieve values for a known set of key ids, valid Statement.query would look like:
   *
   * - "WHERE customTargetingKeyId IN ('17','18','19')" retrieves all values that are associated with keys having ids 17, 18, 19.
   * - "WHERE customTargetingKeyId = '17' AND name = 'red'" retrieves values that are associated with keys having id 17 and value name is 'red'.
   *
   * The following fields are supported for filtering:
   *
   * | PQL Property         | PQL Property                                                                                                                                                                      |
   * | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id                   | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue#id CustomTargetingValue.id}                                     |
   * | customTargetingKeyId | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue#customTargetingKeyId CustomTargetingValue.customTargetingKeyId} |
   * | name                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue#name CustomTargetingValue.name}                                 |
   * | displayName          | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue#displayName CustomTargetingValue.displayName}                   |
   * | matchType            | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue#matchType CustomTargetingValue.matchType}                       |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of custom targeting values
   * @returns the custom targeting values that match the given filter
   */
  getCustomTargetingValuesByStatement(
    filterStatement: Statement,
  ): Promise<CustomTargetingValuePage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey CustomTargetingKey}
   * objects that match the given {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.Statement#query Statement.query}.
   *
   * @param customTargetingKeyAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of custom targeting keys
   * @returns the result of the action performed
   */
  performCustomTargetingKeyAction(
    customTargetingKeyAction: CustomTargetingKeyAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue CustomTargetingValue}
   * objects that match the given {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.Statement#query Statement.query}.
   *
   * @param customTargetingKeyAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of ad units
   * @returns the result of the action performed
   */
  performCustomTargetingValueAction(
    customTargetingValueAction: CustomTargetingValueAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey CustomTargetingKey} objects.
   *
   * @param keys the custom targeting keys to update
   * @returns the updated custom targeting keys
   */
  updateCustomTargetingKeys(
    keys: CustomTargetingKey[],
  ): Promise<CustomTargetingKey[]>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue CustomTargetingValue} objects.
   *
   * @param values the custom targeting values to update
   * @returns the updated custom targeting values
   */
  updateCustomTargetingValues(
    values: CustomTargetingValue[],
  ): Promise<CustomTargetingValue[]>;
}
