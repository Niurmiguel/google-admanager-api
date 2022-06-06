/**
 * Status for **ContentBundle** objects.
 */
export enum ContentBundleStatus {
  /**
   * The object is active and stats are collected.
   */
  ACTIVE = 'ACTIVE',
  /**
   * The object is no longer active and no stats collected.
   */
  INACTIVE = 'INACTIVE',
  /**
   * The object has been archived.
   */
  ARCHIVED = 'ARCHIVED',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
