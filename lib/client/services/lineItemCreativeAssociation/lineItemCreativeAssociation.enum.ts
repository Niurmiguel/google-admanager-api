// Generated from the Ad Manager v202608 WSDLs by scripts/generate-enums.js.
// Do not edit values or comments by hand: run `npm run generate:enums`.
// To add an enum, declare it empty (`export enum Name {}`) and run the script.

/**
 * Describes the status of the association.
 */
export enum LineItemCreativeAssociationStatus {
  /**
   * The association is active and the associated `Creative` can be served.
   */
  ACTIVE = 'ACTIVE',
  /**
   * The association is inactive and the associated `Creative` is ineligible for being served.
   */
  INACTIVE = 'INACTIVE',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
