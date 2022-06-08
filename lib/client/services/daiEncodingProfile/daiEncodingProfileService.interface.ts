import { Statement, UpdateResult } from '../../../common/types';
import { DaiEncodingProfile, DaiEncodingProfileAction, DaiEncodingProfilePage } from './daiEncodingProfile.type';

/**
 * Provides methods for creating, updating and retrieving
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfile DaiEncodingProfile} objects.
 *
 * This feature is not yet openly available for GAM Video publishers. Publishers will need to apply for access for this feature through their account managers.
 */
export interface DaiEncodingProfileServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfile DaiEncodingProfile} objects.
   *
   * @param daiEncodingProfiles the profiles to create
   * @returns the created profiles with their IDs filled in
   */
  createDaiEncodingProfiles(daiEncodingProfiles: DaiEncodingProfile[]): Promise<DaiEncodingProfile[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfilePage DaiEncodingProfilePage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfile DaiEncodingProfile} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                                                         |
   * | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfile#id DaiEncodingProfile.id}         |
   * | name         | {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfile#name DaiEncodingProfile.name}     |
   * | status       | {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfile#status DaiEncodingProfile.status} |
   *
   * @param filterStatement a Publisher Query Language statement to filter a list of profiles
   * @returns the profiles that match the filter
   */
  getDaiEncodingProfilesByStatement(filterStatement: Statement): Promise<DaiEncodingProfilePage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfile DaiEncodingProfile}
   *  objects that match the given {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.Statement#query Statement.query}.
   *
   * @param daiEncodingProfileAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of profiles
   * @returns the result of the action performed
   */
  performDaiEncodingProfileAction(
    daiEncodingProfileAction: DaiEncodingProfileAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfile DaiEncodingProfile} objects.
   *
   * @param daiEncodingProfiles the content profiles to update
   * @returns the updated profiles
   */
  updateDaiEncodingProfiles(daiEncodingProfiles: DaiEncodingProfile[]): Promise<DaiEncodingProfile[]>;
}
