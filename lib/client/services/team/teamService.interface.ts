import { Team, TeamAction, TeamPage } from './team.type';
import { Statement, UpdateResult } from '../../../common/types';

/**
 * Provides methods for creating, updating,
 * and retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Team Team} objects.
 *
 * Teams are used to group users in order to define access to entities such as companies, inventory and orders.
 */
export interface TeamServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Team Team} objects.
   *
   * The following fields are required:
   *
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Team#name Team.name}
   *
   * @param teams the teams to create
   * @returns the created teams with their IDs filled in
   */
  createTeams(teams: Team[]): Promise<Team[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.TeamPage TeamPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Team Team} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                         |
   * | ------------ | -------------------------------------------------------------------------------------------------------------------- |
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Team#id Team.id}                   |
   * | name         | {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Team#name Team.name}               |
   * | description  | {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Team#description Team.description} |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of teams
   * @returns the teams that match the given filter
   */
  getTeamsByStatement(filterStatement: Statement): Promise<TeamPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Team Team} objects that match the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Statement#query Statement.query}.
   *
   * @param teamAction the action to perform
   * @param filterStatement	a Publisher Query Language statement used to filter a set of teams
   * @returns the result of the action performed
   */
  performTeamAction(teamAction: TeamAction, filterStatement: Statement): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Team Team} objects.
   *
   * @param teams the teams to update
   * @returns the updated teams
   */
  updateTeams(teams: Team[]): Promise<Team[]>;
}
