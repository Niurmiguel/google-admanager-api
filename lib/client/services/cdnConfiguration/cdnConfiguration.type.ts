import { PageResult } from '../../../common/types';
import {
  CdnConfigurationStatus,
  CdnConfigurationType,
  OriginForwardingType,
  SecurityPolicyType,
} from './cdnConfiguration.enum';

/**
 * A set of security requirements to authenticate against in order to access video content. Different locations (e.g. different CDNs) can have different security policies.
 */
type SecurityPolicySettings = {
  /**
   * Type of security policy. This determines which other fields should be populated. This value is required for a valid security policy.
   */
  securityPolicyType: SecurityPolicyType;
  /**
   * Shared security key used to generate the Akamai HMAC token for authenticating requests.
   * This field is only applicable when the value of securityPolicyType is equal to SecurityPolicyType.AKAMAI and will be set to null otherwise.
   */
  tokenAuthenticationKey: string;
  /**
   * Whether the segment URLs should be signed using the tokenAuthenticationKey on the server.
   * This is only applicable for delivery media locations that have token authentication enabled.
   */
  disableServerSideUrlSigning: boolean;
  /**
   * The type of origin forwarding used to support Akamai authentication policies for the master playlist.
   * This field is not applicable to ingest locations, and is only applicable to delivery media locations with the securityPolicyType set to SecurityPolicyType.AKAMAI.
   * If set elsewhere it will be reset to null.
   */
  originForwardingType: OriginForwardingType;
  /**
   * The origin path prefix provided by the publisher for the master playlist.
   * This field is only applicable for delivery media locations with the value of originForwardingType set to OriginForwardingType.CONVENTIONAL, and will be set to null otherwise.
   */
  originPathPrefix: string;
  /**
   * The type of origin forwarding used to support Akamai authentication policies for media playlists.
   * This field is not applicable to ingest locations, and is only applicable to delivery media locations with the securityPolicyType set to SecurityPolicyType.AKAMAI.
   * Valid options are OriginForwardingType#NONE or OriginForwardingType#ORIGIN_PATH.
   */
  mediaPlaylistOriginForwardingType: OriginForwardingType;
  /**
   * The origin path prefix provided by the publisher for the media playlists.
   * This field is only applicable for delivery media locations with the value of mediaPlaylistOriginForwardingType
   * set to OriginForwardingType.CONVENTIONAL, and will be set to null otherwise.
   */
  mediaPlaylistOriginPathPrefix: string;
};

/**
 * Configuration that associates a media location with a security policy and the authentication credentials needed to access the content.
 */
type MediaLocationSettings = {
  /**
   * The name of the media location. This value is read-only and is assigned by Google.
   */
  name: string;
  /**
   * The url prefix of the media location. This value is required for a valid media location.
   */
  urlPrefix: string;
  /**
   * The security policy and authentication credentials needed to access the content in this media location. This value is required for a valid media location.
   */
  securityPolicy: SecurityPolicySettings;
};

/**
 * Parameters about this CDN configuration as a source of content.
 * This facilitates fetching the original content for conditioning and delivering the original content as part of a modified stream.
 */
type SourceContentConfiguration = {
  /**
   * Configuration for how DAI should ingest media. At ingest time, we match the url prefix of media in a stream's playlist with an ingest location and
   * use the authentication credentials from the corresponding ingest settings to download the media. This value is required for a valid source content configuration.
   */
  ingestSettings: MediaLocationSettings;
  /**
   * Default configuration for how DAI should deliver the non-modified media segments. At delivery time, we replace the ingest location's
   * url prefix with the delivery location's URL prefix and use the security policy from the delivery settings
   * to determine how DAI needs to deliver the media so that users can access it. This value is required for a valid source content configuration.
   */
  defaultDeliverySettings: MediaLocationSettings;
};

/**
 *
 */
export type CdnConfiguration = {
  /**
   * The unique ID of the CdnConfiguration. This value is read-only and is assigned by Google.
   */
  id: number;
  /**
   * The name of the CdnConfiguration. This value is required to create a CDN configuration and has a maximum length of 255 characters.
   */
  name: string;
  /**
   * The type of CDN configuration represented by this CdnConfiguration. This value is required to create a CDN configuration
   */
  cdnConfigurationType: CdnConfigurationType;
  /**
   * Parameters about this CDN configuration as a source of content.
   * This facilitates fetching the original content for conditioning and delivering the original content as part of a modified stream.
   */
  sourceContentConfiguration: SourceContentConfiguration;
  /**
   * The status of the CDN configuration.
   */
  cdnConfigurationStatus: CdnConfigurationStatus;
};

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.CdnConfiguration CdnConfiguration} objects.
 */
export type CdnConfigurationPage = PageResult<CdnConfiguration>;
