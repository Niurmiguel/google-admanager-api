/**
 * The type of a creative wrapper which is specified on the CreativeWrapper.
 */
export enum CreativeWrapperType {
  /**
   * HTML creative wrappers that include header/footer HTML snippets.
   */
  HTML = 'HTML',
  /**
   * Video Tracking URL creative wrappers that include tracking URIs.
   */
  VIDEO_TRACKING_URL = 'VIDEO_TRACKING_URL',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * All possible tracking event types. Not all events are supported by every kind of creative.
 */
export enum ConversionEvent {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Corresponds to the creativeView tracking event.
   */
  CREATIVE_VIEW = 'CREATIVE_VIEW',
  /**
   * Corresponds to the start tracking event.
   */
  START = 'START',
  /**
   * An event that is fired when a video skip button is shown, usually after 5 seconds of viewing the video. This event does not correspond to any VAST element and is implemented using an extension.
   */
  SKIP_SHOWN = 'SKIP_SHOWN',
  /**
   * Corresponds to the firstQuartile tracking event.
   */
  FIRST_QUARTILE = 'FIRST_QUARTILE',
  /**
   * Corresponds to the midpoint tracking event.
   */
  MIDPOINT = 'MIDPOINT',
  /**
   * Corresponds to the thirdQuartile tracking event.
   */
  THIRD_QUARTILE = 'THIRD_QUARTILE',
  /**
   * An event that is fired after 30 seconds of viewing the video or when the video finished (if the video duration is less than 30 seconds). This event does not correspond to any VAST element and is implemented using an extension.
   */
  ENGAGED_VIEW = 'ENGAGED_VIEW',
  /**
   * Corresponds to the complete tracking event.
   */
  COMPLETE = 'COMPLETE',
  /**
   * Corresponds to the mute tracking event.
   */
  MUTE = 'MUTE',
  /**
   * Corresponds to the unmute tracking event.
   */
  UNMUTE = 'UNMUTE',
  /**
   * Corresponds to the pause tracking event.
   */
  PAUSE = 'PAUSE',
  /**
   * Corresponds to the rewind tracking event.
   */
  REWIND = 'REWIND',
  /**
   * Corresponds to the resume tracking event.
   */
  RESUME = 'RESUME',
  /**
   * An event that is fired when a video was skipped. This event does not correspond to any VAST element and is implemented using an extension.
   */
  SKIPPED = 'SKIPPED',
  /**
   * Corresponds to the fullscreen tracking event.
   */
  FULLSCREEN = 'FULLSCREEN',
  /**
   * Corresponds to the expand tracking event.
   */
  EXPAND = 'EXPAND',
  /**
   * Corresponds to the collapse tracking event.
   */
  COLLAPSE = 'COLLAPSE',
  /**
   * Corresponds to the acceptInvitation tracking event.
   */
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
  /**
   * Corresponds to the close tracking event.
   */
  CLOSE = 'CLOSE',
  /**
   * Corresponds to the Linear.VideoClicks.ClickTracking node.
   */
  CLICK_TRACKING = 'CLICK_TRACKING',
  /**
   * Corresponds to the InLine.Survey node.
   */
  SURVEY = 'SURVEY',
  /**
   * Corresponds to the Linear.VideoClicks.CustomClick node.
   */
  CUSTOM_CLICK = 'CUSTOM_CLICK',
  /**
   * Corresponds to the measurableImpression tracking event.
   */
  MEASURABLE_IMPRESSION = 'MEASURABLE_IMPRESSION',
  /**
   * Corresponds to the viewableImpression tracking event.
   */
  VIEWABLE_IMPRESSION = 'VIEWABLE_IMPRESSION',
  /**
   * Corresponds to the abandon tracking event.
   */
  VIDEO_ABANDON = 'VIDEO_ABANDON',
  /**
   * Corresponds to the fullyViewableAudibleHalfDurationImpression tracking event.
   */
  FULLY_VIEWABLE_AUDIBLE_HALF_DURATION_IMPRESSION = 'FULLY_VIEWABLE_AUDIBLE_HALF_DURATION_IMPRESSION',
}

/**
 * Defines the order in which the header and footer HTML snippets will be wrapped around the served creative.
 * INNER snippets will be wrapped first, followed by NO_PREFERENCE and finally OUTER.
 * If the creative needs to be wrapped with more than one snippet with the same CreativeWrapperOrdering, then the order is unspecified.
 */
export enum CreativeWrapperOrdering {
  /**
   * Wrapping occurs after INNER but before OUTER
   */
  NO_PREFERENCE = 'NO_PREFERENCE',
  /**
   * Wrapping occurs as early as possible.
   */
  INNER = 'INNER',
  /**
   * Wrapping occurs after both NO_PREFERENCE and INNER
   */
  OUTER = 'OUTER',
}

/**
 * Indicates whether the CreativeWrapper is active. HTML snippets are served to creatives only when the creative wrapper is active.
 */
export enum CreativeWrapperStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
