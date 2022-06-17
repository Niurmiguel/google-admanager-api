import { TeamAccessType } from '../team/team.enum';
import { PageResult } from '../../../common/types';

/**
 * UserRecordTeamAssociation represents the association between a {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.UserRecord UserRecord}
 *  and a {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Team Team}.
 */
export type UserRecordTeamAssociation = {
  /**
   * The Team.id of the team.
   */
  teamId: number;
  /**
   * The overridden team access type. This field is null if team access type is not overridden.
   */
  overriddenTeamAccessType: TeamAccessType;
  /**
   * The default team access type Team.teamAccessType. This field is read-only and is populated by Google.
   */
  defaultTeamAccessType: TeamAccessType;
};

/**
 * UserTeamAssociation associates a {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User User}
 * with a {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Team Team} to provide the user access to the entities that belong to the team.
 */
export type UserTeamAssociation = UserRecordTeamAssociation & {
  /**
   * Refers to the User.id.
   */
  userId: number;
};

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/UserTeamAssociationService.UserTeamAssociation UserTeamAssociation} objects.
 */
export type UserTeamAssociationPage = PageResult<UserTeamAssociation>;
