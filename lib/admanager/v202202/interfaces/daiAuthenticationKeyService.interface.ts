import { Statement, UpdateResult } from '@common/types';
import {
  DaiAuthenticationKey,
  DaiAuthenticationKeyAction,
  DaiAuthenticationKeyPage,
} from '../types';

/**
 * Provides methods for creating, updating and retrieving
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.DaiAuthenticationKey DaiAuthenticationKey} objects.
 */
export interface DaiAuthenticationKeyServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.DaiAuthenticationKey DaiAuthenticationKey} objects.
   *
   * The following fields are required:
   *
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.DaiAuthenticationKey#name DaiAuthenticationKey.name }
   *
   * @param daiAuthenticationKeys the DAI authentication keys to create
   * @returns the created DAI authentication keys with their IDs filled in
   */
  createDaiAuthenticationKeys(
    daiAuthenticationKeys: DaiAuthenticationKey[],
  ): Promise<DaiAuthenticationKey[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.DaiAuthenticationKeyPage DaiAuthenticationKeyPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.DaiAuthenticationKey DaiAuthenticationKey} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property  | PQL Property                                                                                                                                               |
   * | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id            | {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.DaiAuthenticationKey#id DaiAuthenticationKey.id}         |
   * | status        | {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.DaiAuthenticationKey#status DaiAuthenticationKey.status} |
   * | name          | {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.DaiAuthenticationKey#name DaiAuthenticationKey.name}     |
   *
   * @param filterStatement a Publisher Query Language statement to filter a list of DAI authentication keys
   * @returns the DAI authentication keys that match the filter
   */
  getDaiAuthenticationKeysByStatement(
    filterStatement: Statement,
  ): Promise<DaiAuthenticationKeyPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.DaiAuthenticationKey DaiAuthenticationKey} objects that match the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.Statement#query Statement.query}.
   *
   * DAI authentication keys cannot be deactivated if there are active
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent LiveStreamEvent}s or Content Sources that are using them.
   *
   * @param daiAuthenticationKeyAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of live stream events
   * @returns the result of the action performed
   */
  performDaiAuthenticationKeyAction(
    daiAuthenticationKeyAction: DaiAuthenticationKeyAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.DaiAuthenticationKey DaiAuthenticationKey} objects.
   *
   * @param daiAuthenticationKeys the video DAI authentication keys to update
   * @returns the updated DAI authentication keys
   */
  updateDaiAuthenticationKeys(
    daiAuthenticationKeys: DaiAuthenticationKey[],
  ): Promise<DaiAuthenticationKey[]>;
}
