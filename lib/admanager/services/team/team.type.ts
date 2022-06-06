import { TeamAccessType, TeamStatus } from './team.enum';
import { PageResult } from '../../../common/types';

/**
 * A Team defines a grouping of users and what entities they have access to.
 * Users are added to teams with {@link https://developers.google.com/ad-manager/api/reference/v202202/UserTeamAssociationService.UserTeamAssociation UserTeamAssociation} objects.
 */
export type Team = {
  /**
   * The unique ID of the Team. This value is readonly and is assigned by Google. Teams that are created by Google will have negative IDs.
   */
  id: number;
  /**
   * The name of the Team. This value is required to create a team and has a maximum length of 106 characters.
   */
  name: string;
  /**
   * The description of the Team. This value is optional and has a maximum length of 255 characters.
   */
  description: string;
  /**
   * The status of the Team. This value can be TeamStatus.ACTIVE (default) or TeamStatus.INACTIVE and determines the visibility of the team in the UI.
   */
  status: TeamStatus;
  /**
   * Whether or not users on this team have access to all companies. If this value is true, then an error will be thrown if an attempt is made to associate this team with a Company.
   */
  hasAllCompanies: boolean;
  /**
   * Whether or not users on this team have access to all inventory. If this value is true, then an error will be thrown if an attempt is made to associate this team with an AdUnit.
   */
  hasAllInventory: boolean;
  /**
   * The default access to orders, for users on this team.
   */
  teamAccessType: TeamAccessType;
};

/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Team Team} objects.
 */
export type TeamAction = 'ActivateTeams' | 'DeactivateTeams';

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Team Team} objects.
 */
export type TeamPage = PageResult<Team>;
