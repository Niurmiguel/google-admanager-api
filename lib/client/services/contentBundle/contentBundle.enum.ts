// Generated from the Ad Manager v202608 WSDLs by scripts/generate-enums.js.
// Do not edit values or comments by hand: run `npm run generate:enums`.
// To add an enum, declare it empty (`export enum Name {}`) and run the script.

/**
 * Status for `ContentBundle` objects.
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
