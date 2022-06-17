/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/UserTeamAssociationService.UserTeamAssociation UserTeamAssociation} objects.
 */
export abstract class UserTeamAssociationAction {}

/**
 * Action to delete the association between a {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User User} and a {@link https://developers.google.com/ad-manager/api/reference/v202202/TeamService.Team Team}.
 */
export class DeleteUserTeamAssociations implements UserTeamAssociationAction {}
