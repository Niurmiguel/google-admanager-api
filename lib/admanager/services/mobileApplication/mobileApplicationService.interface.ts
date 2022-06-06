import { Statement, UpdateResult } from '../../../common/types';
import {
  MobileApplication,
  MobileApplicationAction,
  MobileApplicationPage,
} from './mobileApplication.type';

/**
 * Provides operations for creating, updating and retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication MobileApplication} objects.
 */
export interface MobileApplicationServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication mobile applications} objects.
   *
   * @param mobileApplications the mobile applications to create
   * @returns the created mobile applications with their IDs filled in
   */
  createMobileApplications(
    mobileApplications: MobileApplication[],
  ): Promise<MobileApplication[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplicationPage MobileApplicationPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication MobileApplication} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property         | PQL Property                                                                                                                                    |
   * | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id                   | {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication#id MobileApplication.id}                                     |
   * | displayName                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication#displayName MobileApplication.displayName}                                 |
   * | appStore                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication#appStore MobileApplication.appStore}                                 |
   * | appStoreId | {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication#appStoreId MobileApplication.appStoreId} |
   * | isArchived | {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication#isArchived MobileApplication.isArchived} |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of mobile applications.
   * @returns the mobile applications that match the given filter
   */
  getMobileApplicationsByStatement(
    filterStatement: Statement,
  ): Promise<MobileApplicationPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication MobileApplication}.
   *
   * @param mobileApplicationAction the action to perform
   * @param filterStatement 	a PQL statement used to filter mobile applications
   * @returns 	the result of the action performed
   */
  performMobileApplicationAction(
    mobileApplicationAction: MobileApplicationAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication MobileApplication} objects.
   *
   * @param mobileApplications the mobile applications to update
   * @returns the updated mobile applications
   */
  updateMobileApplications(
    mobileApplications: MobileApplication[],
  ): Promise<MobileApplication[]>;
}
