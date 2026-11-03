// Generated from the Ad Manager v202608 WSDLs by scripts/generate-enums.js.
// Do not edit values or comments by hand: run `npm run generate:enums`.
// To add an enum, declare it empty (`export enum Name {}`) and run the script.

/**
 * Specifies the statuses for `AudienceSegment` objects.
 */
export enum AudienceSegmentStatus {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Active status means this audience segment is available for targeting.
   */
  ACTIVE = 'ACTIVE',
  /**
   * Inactive status means this audience segment is not available for targeting.
   */
  INACTIVE = 'INACTIVE',
  /**
   * Unused status means this audience segment was deactivated by Google because it is unused.
   */
  UNUSED = 'UNUSED',
}

/**
 * Specifies types for `AudienceSegment` objects.
 */
export enum AudienceSegmentType {
  /**
   * First party segments created and owned by the publisher.
   */
  FIRST_PARTY = 'FIRST_PARTY',
  /**
   * First party segments shared by other clients.
   */
  SHARED = 'SHARED',
  /**
   * Third party segments licensed by the publisher from data providers. This doesn't include Google-provided licensed segments.
   */
  THIRD_PARTY = 'THIRD_PARTY',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Approval status values for `ThirdPartyAudienceSegment` objects.
 */
export enum AudienceSegmentApprovalStatus {
  /**
   * Specifies that this segment is waiting to be approved or rejected. It cannot be targeted.
   */
  UNAPPROVED = 'UNAPPROVED',
  /**
   * Specifies that this segment is approved and can be targeted.
   */
  APPROVED = 'APPROVED',
  /**
   * Specifies that this segment is rejected and cannot be targeted.
   */
  REJECTED = 'REJECTED',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Specifies the license type of a `ThirdPartyAudienceSegment`.
 */
export enum LicenseType {
  /**
   * A direct license is the result of a direct contract between the data provider and the publisher.
   */
  DIRECT_LICENSE = 'DIRECT_LICENSE',
  /**
   * A global license is the result of an agreement between Google and the data provider, which agrees to license their audience segments to all the publishers and/or advertisers of the Google ecosystem.
   */
  GLOBAL_LICENSE = 'GLOBAL_LICENSE',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
