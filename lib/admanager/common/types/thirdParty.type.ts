import {
  ThirdPartyBrandLiftIntegrationPartner,
  ThirdPartyReachIntegrationPartner,
  ThirdPartyViewabilityIntegrationPartner,
} from '../enums';

/**
 * Contains third party auto-pixeling settings for cross-sell Partners.
 */
export type ThirdPartyMeasurementSettings = {
  /**
   * A field to determine the type of ThirdPartyViewabilityIntegrationPartner. This field default is NONE.
   */
  viewabilityPartner: ThirdPartyViewabilityIntegrationPartner;
  /**
   * The third party partner id for YouTube viewability verification.
   */
  viewabilityClientId: string;
  /**
   * The reporting id that maps viewability partner data with a campaign (or a group of related campaigns) specific data.
   */
  viewabilityReportingId: string;
  /**
   * A field to determine the type of publisher's viewability partner. This field default is NONE.
   */
  publisherViewabilityPartner: ThirdPartyViewabilityIntegrationPartner;
  /**
   * The third party partner id for YouTube viewability verification for publisher.
   */
  publisherViewabilityClientId: string;
  /**
   * The reporting id that maps viewability partner data with a campaign (or a group of related campaigns) specific data for publisher.
   */
  publisherViewabilityReportingId: string;
  /**
   * A field to determine the type of ThirdPartyBrandLiftIntegrationPartner. This field default is NONE.
   */
  brandLiftPartner: ThirdPartyBrandLiftIntegrationPartner;
  /**
   * The third party partner id for YouTube brand lift verification.
   */
  brandLiftClientId: string;
  /**
   * The reporting id that maps brand lift partner data with a campaign (or a group of related campaigns) specific data.
   */
  brandLiftReportingId: string;
  /**
   * A field to determine the type of advertiser's ThirdPartyReachIntegrationPartner. This field default is UNKNOWN.
   */
  reachPartner: ThirdPartyReachIntegrationPartner;
  /**
   * The third party partner id for YouTube reach verification for advertiser.
   */
  reachClientId: string;
  /**
   * The reporting id that maps reach partner data with a campaign (or a group of related campaigns) specific data for advertiser.
   */
  reachReportingId: string;
  /**
   * A field to determine the type of publisher's ThirdPartyReachIntegrationPartner. This field default is UNKNOWN.
   */
  publisherReachPartner: ThirdPartyReachIntegrationPartner;
  /**
   * The third party partner id for YouTube reach verification for publisher.
   */
  publisherReachClientId: string;
  /**
   * The reporting id that maps reach partner data with a campaign (or a group of related campaigns) specific data for publisher.
   */
  publisherReachReportingId: string;
};
