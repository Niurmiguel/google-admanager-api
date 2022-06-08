/**
 * Represents the time zone to be used for DayPartTargeting.
 */
export enum DeliveryTimeZone {
  /**
   * 	Use the time zone of the publisher.
   */
  PUBLISHER = 'PUBLISHER',

  /**
   * 	Use the time zone of the browser.
   */
  BROWSER = 'BROWSER',
}

/**
 * Represents the platform which requests and renders the ad.
 */
export enum RequestPlatform {
  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',

  /**
   * 	Represents a request made from a web browser. This includes both desktop and mobile web.
   */
  BROWSER = 'BROWSER',

  /**
   * 	Represents a request made from a mobile application. This includes mobile app interstitial and rewarded video requests.
   */
  MOBILE_APP = 'MOBILE_APP',

  /**
   * 	Represents a request made from a video player that is playing publisher content. This includes video players embedded in web pages and mobile applications, and connected TV screens.
   */
  VIDEO_PLAYER = 'VIDEO_PLAYER',
}

/**
 * Possible delivery rates for a LineItem, which dictate the manner in which they are served.
 */
export enum DeliveryRateType {
  /**
   * 	Line items are served as evenly as possible across the number of days specified in a line item's LineItem.duration.
   */
  EVENLY = 'EVENLY',

  /**
   * 	Line items are served more aggressively in the beginning of the flight date.
   */
  FRONTLOADED = 'FRONTLOADED',

  /**
   * 	The booked impressions for a line item may be delivered well before the LineItem.endDateTime. Other lower-priority or lower-value line items will be stopped from delivering until this line item meets the number of impressions or clicks it is booked for.
   */
  AS_FAST_AS_POSSIBLE = 'AS_FAST_AS_POSSIBLE',
}

/**
 * Strategies for choosing forecasted traffic shapes to pace line items.
 */
export enum DeliveryForecastSource {
  /**
   * 	The line item's historical traffic shape will be used to pace line item delivery.
   */
  HISTORICAL = 'HISTORICAL',

  /**
   * 	The line item's projected future traffic will be used to pace line item delivery.
   */
  FORECASTING = 'FORECASTING',

  /**
   * 	A user specified custom pacing curve will be used to pace line item delivery.
   */
  CUSTOM_PACING_CURVE = 'CUSTOM_PACING_CURVE',

  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * The delivery option for companions.
 * Used for line items whose environmentType is {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.EnvironmentType#VIDEO_PLAYER EnvironmentType.VIDEO_PLAYER}.
 */
export enum CompanionDeliveryOption {
  /**
   * Companions are not required to serve a creative set. The creative set can serve to inventory that has zero or more matching companions.
   */
  OPTIONAL = 'OPTIONAL',
  /**
   * At least one companion must be served in order for the creative set to be used.
   */
  AT_LEAST_ONE = 'AT_LEAST_ONE',
  /**
   * All companions in the set must be served in order for the creative set to be used. This can still serve to inventory that has more companions than can be filled.
   */
  ALL = 'ALL',
  /**
   * The delivery type is unknown.
   */
  UNKNOWN = 'UNKNOWN',
}
