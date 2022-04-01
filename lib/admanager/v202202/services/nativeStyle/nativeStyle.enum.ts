/**
 * Describes status of the native style.
 */
export enum NativeStyleStatus {
  /**
   * The native style is active. Active native styles are used in ad serving.
   */
  ACTIVE = 'ACTIVE',
  /**
   * The native style is archived. Archived native styles are not visible in the UI and not used in ad serving.
   */
  ARCHIVED = 'ARCHIVED',
  /**
   * The native style is inactive. Inactive native styles are not used in ad serving, but visible in the UI.
   */
  INACTIVE = 'INACTIVE',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
