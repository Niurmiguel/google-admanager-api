// Generated from the Ad Manager v202608 WSDLs by scripts/generate-enums.js.
// Do not edit values or comments by hand: run `npm run generate:enums`.
// To add an enum, declare it empty (`export enum Name {}`) and run the script.

/**
 * Represents the status of the role, weather the role is active or inactive.
 */
export enum RoleStatus {
  /**
   * The status of an active role. (i.e. visible in the UI)
   */
  ACTIVE = 'ACTIVE',
  /**
   * The status of an inactive role. (i.e. hidden in the UI)
   */
  INACTIVE = 'INACTIVE',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
