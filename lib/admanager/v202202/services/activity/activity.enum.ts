/**
 * The activity status.
 */
export enum ActivityStatus {
  ACTIVE = 'ACTIVE	',
  INACTIVE = 'INACTIVE',
}

/**
 * The activity type.
 */
export enum ActivityType {
  /**
   * Tracks conversions for each visit to a webpage. This is a counter type.
   */
  PAGE_VIEWS = 'PAGE_VIEWS',
  /**
   * Tracks conversions for visits to a webpage, but only counts one conversion per user per day, even if a user visits the page multiple times. This is a counter type.
   */
  DAILY_VISITS = 'DAILY_VISITS',
  /**
   * Tracks conversions for visits to a webpage, but only counts one conversion per user per user session. Session length is set by the advertiser. This is a counter type.
   */
  CUSTOM = 'CUSTOM',
  /**
   * Tracks conversions where the user has made a purchase, the monetary value of each purchase, plus the number of items that were purchased and the order ID. This is a sales type.
   */
  ITEMS_PURCHASED = 'ITEMS_PURCHASED',
  /**
   * Tracks conversions where the user has made a purchase, the monetary value of each purchase, plus the order ID (but not the number of items purchased). This is a sales type.
   */
  TRANSACTIONS = 'TRANSACTIONS',
  /**
   * Tracks conversions where the user has installed an iOS application. This is a counter type.
   */
  IOS_APPLICATION_DOWNLOADS = 'IOS_APPLICATION_DOWNLOADS',
  /**
   * Tracks conversions where the user has installed an Android application. This is a counter type.
   */
  ANDROID_APPLICATION_DOWNLOADS = 'ANDROID_APPLICATION_DOWNLOADS',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
