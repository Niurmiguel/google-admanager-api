// Generated from the Ad Manager v202608 WSDLs by scripts/generate-enums.js.
// Do not edit values or comments by hand: run `npm run generate:enums`.
// To add an enum, declare it empty (`export enum Name {}`) and run the script.

/**
 * Describes the order statuses.
 */
export enum OrderStatus {
  /**
   * Indicates that the `Order` has just been created but no approval has been requested yet.
   */
  DRAFT = 'DRAFT',
  /**
   * Indicates that a request for approval for the `Order` has been made.
   */
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  /**
   * Indicates that the `Order` has been approved and is ready to serve.
   */
  APPROVED = 'APPROVED',
  /**
   * Indicates that the `Order` has been disapproved and is not eligible to serve.
   */
  DISAPPROVED = 'DISAPPROVED',
  /**
   * This is a legacy state. Paused status should be checked on `LineItems`s within the order.
   */
  PAUSED = 'PAUSED',
  /**
   * Indicates that the `Order` has been canceled and cannot serve.
   */
  CANCELED = 'CANCELED',
  /**
   * Indicates that the `Order` has been deleted by DSM.
   */
  DELETED = 'DELETED',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
