/**
 * Describes the {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} status.
 */
export enum ProposalStatus {
  /**
   * Indicates that the Proposal has just been created or retracted but no approval has been requested yet.
   */
  DRAFT = 'DRAFT',
  /**
   * Indicates that a request for approval has been made for the Proposal.
   */
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  /**
   * Indicates that the Proposal has been approved and is ready to serve.
   */
  APPROVED = 'APPROVED',
  /**
   * Indicates that the Proposal has been rejected in the approval workflow.
   */
  REJECTED = 'REJECTED',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Describes the type of a Company associated with a Proposal.
 */
export enum ProposalCompanyAssociationType {
  /**
   * The company is a primary agency.
   */
  PRIMARY_AGENCY = 'PRIMARY_AGENCY',
  /**
   * The company is a billing agency.
   */
  BILLING_AGENCY = 'BILLING_AGENCY',
  /**
   * The company is a branding agency.
   */
  BRANDING_AGENCY = 'BRANDING_AGENCY',
  /**
   * The company is other type of agency.
   */
  OTHER_AGENCY = 'OTHER_AGENCY',
  /**
   * The company is advertiser.
   */
  ADVERTISER = 'ADVERTISER',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Represents the proposal's negotiation status for Marketplace.
 */
export enum NegotiationStatus {
  /**
   * Indicates that a new Proposal has been created by the seller and has not been sent to Marketplace yet.
   */
  SELLER_INITIATED = 'SELLER_INITIATED',
  /**
   * Indicates that a new Proposal has been created by the buyer and is awaiting seller action.
   */
  BUYER_INITIATED = 'BUYER_INITIATED',
  /**
   * Indicates that a Proposal has been updated by the buyer and is awaiting seller approval.
   */
  AWAITING_SELLER_REVIEW = 'AWAITING_SELLER_REVIEW',
  /**
   * Indicates that a Proposal has been updated by the seller and is awaiting buyer approval.
   */
  AWAITING_BUYER_REVIEW = 'AWAITING_BUYER_REVIEW',
  /**
   * Indicates that the seller has accepted the Proposal and is awaiting the buyer's acceptance.
   */
  ONLY_SELLER_ACCEPTED = 'ONLY_SELLER_ACCEPTED',
  /**
   * Indicates that the Proposal has been accepted by both the buyer and the seller.
   */
  FINALIZED = 'FINALIZED',
  /**
   * Indicates that negotiations for the Proposal have been cancelled.
   */
  CANCELLED = 'CANCELLED',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Identifies the format of inventory or "channel" in which ads serve.
 */
export enum AdExchangeEnvironment {
  /**
   * Ads serve in a browser.
   */
  DISPLAY = 'DISPLAY',
  /**
   * In-stream video ads serve in a video.
   */
  VIDEO = 'VIDEO',
  /**
   * In-stream video ads serve in a game.
   */
  GAMES = 'GAMES',
  /**
   * Ads serve in a mobile app.
   */
  MOBILE = 'MOBILE',
  /**
   * Out-stream video ads serve in a mobile app. Examples include mobile app interstitials and mobile app rewarded ads.
   */
  MOBILE_OUTSTREAM_VIDEO = 'MOBILE_OUTSTREAM_VIDEO',
  /**
   * Out-stream video ads serve in a browser. Examples include in-feed and in-banner video ads.
   */
  DISPLAY_OUTSTREAM_VIDEO = 'DISPLAY_OUTSTREAM_VIDEO',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Decribes the type of BuyerRfp.
 */
export enum RfpType {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Indicates the BuyerRfp is a Programmatic Guaranteed RFP.
   */
  PROGRAMMATIC_GUARANTEED = 'PROGRAMMATIC_GUARANTEED',
  /**
   * Indicates the BuyerRfp is a Preferred Deal RFP.
   */
  PREFERRED_DEAL = 'PREFERRED_DEAL',
}
