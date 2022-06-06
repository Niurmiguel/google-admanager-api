/**
 * Indicates the type of CDN configuration for {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.CdnConfiguration CdnConfiguration}.
 */
export enum CdnConfigurationType {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * A configuration that specifies where and how LiveStreamEvent content should be ingested and delivered.
   */
  LIVE_STREAM_SOURCE_CONTENT = 'LIVE_STREAM_SOURCE_CONTENT',
}

/**
 * Indicates the status of the {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.CdnConfiguration CdnConfiguration}.
 */
export enum CdnConfigurationStatus {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * The CDN configuration is in use.
   */
  ACTIVE = 'ACTIVE',
  /**
   * The CDN configuration is no longer used.
   */
  ARCHIVED = 'ARCHIVED',
}

/**
 * Indicates the type of security policy associated with access to a CDN. Different security policies require different parameters in a **`SecurityPolicy`**.
 */
export enum SecurityPolicyType {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Indicates that no authentication is necessary.
   */
  NONE = 'NONE',
  /**
   * Security policy for accessing content on the Akamai CDN.
   */
  AKAMAI = 'AKAMAI',
}

/**
 * Indicates the type of origin forwarding used to support Akamai authentication policies for
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent LiveStreamEvent}
 */
export enum OriginForwardingType {
  /**
   * Indicates that origin forwarding is set up by passing an originpath query string parameter (necessary for Akamai dynamic packaging to work)
   */
  ORIGIN_PATH = 'ORIGIN_PATH',
  /**
   * Indicates that conventional origin forwarding is used.
   */
  CONVENTIONAL = 'CONVENTIONAL',
  /**
   * Indicates that origin forwarding is not being used.
   */
  NONE = 'NONE',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
