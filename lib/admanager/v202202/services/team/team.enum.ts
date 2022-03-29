/**
 * Represents the status of a team, whether it is active or inactive.
 */
export enum TeamStatus {
  /**
   * The status of an active team. (i.e. visible in the UI)
   */
  ACTIVE = 'ACTIVE',
  /**
   * The status of an inactive team. (i.e. hidden in the UI)
   */
  INACTIVE = 'INACTIVE',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Represents the types of team access supported for orders.
 */
export enum TeamAccessType {
  /**
   * The level of access in which team members cannot view or edit a team's orders.
   */
  NONE = 'NONE',
  /**
   * The level of access in which team members can only view a team's orders.
   */
  READ_ONLY = 'READ_ONLY',
  /**
   * The level of access in which team members can view and edit a team's orders.
   */
  READ_WRITE = 'READ_WRITE',
}
