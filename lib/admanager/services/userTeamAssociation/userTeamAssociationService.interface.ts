import { Statement, UpdateResult } from '../../../common/types';
import {
  UserTeamAssociation,
  UserTeamAssociationAction,
  UserTeamAssociationPage,
} from './userTeamAssociation.type';

/**
 * Provides methods for creating, updating,
 * and retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/UserTeamAssociationService.UserTeamAssociation UserTeamAssociation} objects.
 *
 * UserTeamAssociation objects are used to add users to teams in order to define access to entities such as companies,
 * inventory and orders and to override the team's access type to orders for a user.
 */
export interface UserTeamAssociationServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/UserTeamAssociationService.UserTeamAssociation UserTeamAssociation} objects.
   *
   * @param userTeamAssociations the user team associations to create
   * @returns the created user team associations with their IDs filled in
   */
  createUserTeamAssociations(
    userTeamAssociations: UserTeamAssociation[],
  ): Promise<UserTeamAssociation[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/UserTeamAssociationService.UserTeamAssociationPage UserTeamAssociationPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/UserTeamAssociationService.UserTeamAssociation UserTeamAssociation} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                                             |
   * | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
   * | userId       | {@link https://developers.google.com/ad-manager/api/reference/v202202/UserTeamAssociationService.UserTeamAssociation#userId Team.userId} |
   * | teamId       | {@link https://developers.google.com/ad-manager/api/reference/v202202/UserTeamAssociationService.UserTeamAssociation#teamId Team.teamId} |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of user team associations
   * @returns the user team associations that match the given filter
   */
  getUserTeamAssociationsByStatement(
    filterStatement: Statement,
  ): Promise<UserTeamAssociationPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/UserTeamAssociationService.UserTeamAssociation UserTeamAssociation} objects that match the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Statement#query Statement.query}.
   *
   * @param teamAction the action to perform
   * @param statement
   * @returns the result of the action performed
   */
  performUserTeamAssociationAction(
    userTeamAssociationAction: UserTeamAssociationAction,
    statement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/UserTeamAssociationService.UserTeamAssociation UserTeamAssociation} objects.
   *
   * @param userTeamAssociations the user team associations to update
   * @returns the updated user team associations
   */
  updateUserTeamAssociations(
    userTeamAssociations: UserTeamAssociation[],
  ): Promise<UserTeamAssociation[]>;
}
