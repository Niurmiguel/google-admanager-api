/**
 * Represents the status of the role, weather the role is active or inactive.
 */
export enum RoleStatus {
  /**
   * 	The status of an active role. (i.e. visible in the UI)
   */
  ACTIVE = 'ACTIVE',
  /**
   * 	The status of an inactive role. (i.e. hidden in the UI)
   */
  INACTIVE = 'INACTIVE',
  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

export enum UserAction {
  Activate = 'ActivateUsers',
  Deactivate = 'DeactivateUsers',
}
