import { Role, User, UserAction, UserPage } from '../types';
import { Statement, UpdateResult } from '@common/types';

/**
 * Provides operations for creating, updating and retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User User} objects.
 *
 * A user is assigned one of several different roles.
 * Each {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.Role Role} type has a unique ID that is used to identify that role in an organization.
 * Role types and their IDs can be retrieved by invoking {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService#getAllRoles getAllRoles}.
 */
export interface UserServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User User} objects.
   *
   * @param users the users to create
   * @returns the created users with their IDs filled in
   */
  createUsers(users: User[]): Promise<User[]>;
  /**
   * Returns the {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.Role Role} objects that are defined for the users of the network.
   *
   * @returns the roles defined for the user's network
   */
  getAllRoles(): Promise<Role[]>;
  /**
   * Returns the current {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User User}.
   *
   * @returns the current user
   */
  getCurrentUser(): Promise<User>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.UserPage UserPage} of
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User User}
   * objects that satisfy the given Statement.query. The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                                                                    |
   * | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                                                                                                   |
   * | email        | 	{@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User#email User.email}                                                      |
   * | id           | 	{@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User#id User.id}                                                            |
   * | name         | 	{@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User#name User.name}                                                        |
   * | roleId       | 	{@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User#roleId User.roleId}                                                    |
   * | rolename     | 	{@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User#rolename User.rolename}                                                |
   * | status       | 	**ACTIVE** if {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User#isActive User.isActive} is true; **INACTIVE** otherwise  |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of users
   * @returns the users that match the given filter
   */
  getUsersByStatement(filterStatement: Statement): Promise<UserPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User User}
   * objects that match the given {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.Statement#query Statement.query}.
   *
   * @param userAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of users
   * @returns the result of the action performed
   */
  performUserAction(
    userAction: UserAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User User} objects.
   * @param users the users to update
   * @returns the updated users
   */
  updateUsers(users: User[]): Promise<User[]>;
}
