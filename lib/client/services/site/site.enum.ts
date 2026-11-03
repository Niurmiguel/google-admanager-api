// Generated from the Ad Manager v202608 WSDLs by scripts/generate-enums.js.
// Do not edit values or comments by hand: run `npm run generate:enums`.
// To add an enum, declare it empty (`export enum Name {}`) and run the script.

export enum ApprovalStatus {
  DRAFT = 'DRAFT',
  UNCHECKED = 'UNCHECKED',
  APPROVED = 'APPROVED',
  DISAPPROVED = 'DISAPPROVED',
  REQUIRES_REVIEW = 'REQUIRES_REVIEW',
  UNKNOWN = 'UNKNOWN',
}

/**
 * The list of possible policy violation types for a `Site`.
 */
export enum DisapprovalReasonType {
  /**
   * The site has content that violates policy.
   */
  CONTENT = 'CONTENT',
  /**
   * The parent must be an authorized seller of the child network's inventory.
   */
  OWNERSHIP = 'OWNERSHIP',
  /**
   * Generic error type.
   */
  OTHER = 'OTHER',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
