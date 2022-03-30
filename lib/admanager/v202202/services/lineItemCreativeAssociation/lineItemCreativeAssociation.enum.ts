/**
 * Describes the status of the association.
 */
export enum LineItemCreativeAssociationStatus {
  /**
   * The association is active and the associated Creative can be served.
   */
  ACTIVE = 'ACTIVE',
  /**
   * The association is active but the associated Creative may not be served, because its size is not targeted by the line item.
   */
  NOT_SERVING = 'NOT_SERVING',
  /**
   * The association is inactive and the associated Creative is ineligible for being served.
   */
  INACTIVE = 'INACTIVE',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
