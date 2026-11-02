/**
 * The type of delegation of the child network to the parent network in MCM.
 */
export enum DelegationType {
  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * 	The parent network gets complete access to the child network's account
   */
  MANAGE_ACCOUNT = 'MANAGE_ACCOUNT',
  /**
   * 	A subset of the ad requests from the child are delegated to the parent, determined by the tag on the child network's web pages. The parent network does not have access to the child network, as a subset of the inventory could be owned and operated by the child network.
   */
  MANAGE_INVENTORY = 'MANAGE_INVENTORY',
}

/**
 * Status of the association between networks. When a parent network requests access, it is marked as pending.
 * Once the child network accepts the agreement, it is marked as accepted.
 */
export enum InvitationStatus {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * The association request from the parent network has been accepted by the child network.
   */
  ACCEPTED = 'ACCEPTED',
  /**
   * The invitation has expired. An invitation is valid for 90 days. Expired invitations can be resent.
   */
  EXPIRED = 'EXPIRED',
  /**
   * The child publisher has not acted on the invite from the parent.
   */
  PENDING = 'PENDING',
  /**
   * The child publisher has declined the invite.
   */
  REJECTED = 'REJECTED',
  /**
   * The parent network withdrew the invite.
   */
  WITHDRAWN = 'WITHDRAWN',
  /**
   * The invitation was disapproved by Google.
   */
  DEACTIVATED_BY_AD_MANAGER = 'DEACTIVATED_BY_AD_MANAGER',
}
