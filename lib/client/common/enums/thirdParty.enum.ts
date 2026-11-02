/**
 * Possible options for third-party viewabitility integration.
 */
export enum ThirdPartyViewabilityIntegrationPartner {
  /**
   * Indicates there's no third-party viewability integration partner.
   */
  NONE = 'NONE',
  /**
   * Indicates third-party viewability integration partner Oracle Moat.
   */
  MOAT = 'MOAT',
  /**
   * Indicates third-party viewability integration partner Double Verify.
   */
  DOUBLE_VERIFY = 'DOUBLE_VERIFY',
  /**
   * Indicates third-party viewability integration partner Integral Ad Science.
   */
  INTEGRAL_AD_SCIENCE = 'INTEGRAL_AD_SCIENCE',
  /**
   * Indicates third-party viewability integration partner Comscore.
   */
  COMSCORE = 'COMSCORE',
  /**
   * Indicates third-party viewability integration partner Telemetry.
   */
  TELEMETRY = 'TELEMETRY',
  /**
   * Indicates third-party viewability integration partner Meetrics.
   */
  MEETRICS = 'MEETRICS',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Possible options for third-party brand lift integration.
 */
export enum ThirdPartyBrandLiftIntegrationPartner {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Indicates there's no third-party brand lift integration partner.
   */
  NONE = 'NONE',
  /**
   * Indicates third-party brand lift integration partner Kantar.
   */
  KANTAR_MILLWARD_BROWN = 'KANTAR_MILLWARD_BROWN',
  /**
   * Indicates third-party brand lift integration partner Dynata.
   */
  DYNATA = 'DYNATA',
  /**
   * Indicates third-party brand lift integration partner Intage.
   */
  INTAGE = 'INTAGE',
  /**
   * Indicates third-party brand lift integration partner Macromill.
   */
  MACROMILL = 'MACROMILL',
}

/**
 * Possible options for third-party reach integration.
 */
export enum ThirdPartyReachIntegrationPartner {
  /**
   * Indicates there's no third-party reach integration partner.
   */
  NONE = 'NONE',
  /**
   * Indicates third-party reach integration partner Comscore.
   */
  COMSCORE = 'COMSCORE',
  /**
   * Indicates third-party reach integration partner Nielsen.
   */
  NIELSEN = 'NIELSEN',
  /**
   * Indicates third-party reach integration partner Kantar.
   */
  KANTAR_MILLWARD_BROWN = 'KANTAR_MILLWARD_BROWN',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Indicates third-party reach integration partner VideoAmp
   */
  VIDEO_AMP = 'VIDEO_AMP',
  /**
   * Indicates third-party reach integration partner iSpot.TV
   */
  ISPOT_TV = 'ISPOT_TV',
  /**
   * Indicates third-party reach integration partner Audience Project
   */
  AUDIENCE_PROJECT = 'AUDIENCE_PROJECT',
}
