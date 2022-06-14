/**
 * Describes the contact statuses.
 */
export enum ContactStatus {
  /**
   * The contact has not been invited to see their orders.
   */
  UNINVITED = 'UNINVITED',
  /**
   * The contact has been invited to see their orders, but has not yet accepted the invitation.
   */
  INVITE_PENDNG = 'INVITE_PENDNG',
  /**
   * The contact has been invited to see their orders, but the invitation has already expired.
   */
  INVITE_EXPIRED = 'INVITE_EXPIRED',
  /**
   * The contact was invited to see their orders, but the invitation was cancelled.
   */
  INVITE_CANCELED = 'INVITE_CANCELED',
  /**
   * The contact has access to login and view their orders.
   */
  USER_ACTIVE = 'USER_ACTIVE',
  /**
   * The contact accepted an invitation to see their orders, but their access was later revoked.
   */
  USER_DISABLED = 'USER_DISABLED',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
