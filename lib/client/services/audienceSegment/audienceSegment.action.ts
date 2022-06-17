/**
 * Action that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegment AudienceSegment} objects.
 */
export abstract class AudienceSegmentAction {}

/**
 * Action that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.FirstPartyAudienceSegment FirstPartyAudienceSegment} objects to activate them.
 */
export class ActivateAudienceSegments implements AudienceSegmentAction {}

/**
 * Action that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.ThirdPartyAudienceSegment ThirdPartyAudienceSegment} objects to approve them.
 */
export class ApproveAudienceSegments implements AudienceSegmentAction {}

/**
 * Action that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.FirstPartyAudienceSegment FirstPartyAudienceSegment} objects to deactivate them.
 */
export class DeactivateAudienceSegments implements AudienceSegmentAction {}

/**
 * Action that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.FirstPartyAudienceSegment FirstPartyAudienceSegment} objects to populate them based on last 30 days of traffic.
 */
export class PopulateAudienceSegments implements AudienceSegmentAction {}

/**
 * Action that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.ThirdPartyAudienceSegment ThirdPartyAudienceSegment} objects to reject them.
 */
export class RejectAudienceSegments implements AudienceSegmentAction {}
