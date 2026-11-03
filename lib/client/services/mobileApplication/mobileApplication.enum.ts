// Generated from the Ad Manager v202608 WSDLs by scripts/generate-enums.js.
// Do not edit values or comments by hand: run `npm run generate:enums`.
// To add an enum, declare it empty (`export enum Name {}`) and run the script.

/**
 * A store a `MobileApplication` is available on.
 */
export enum MobileApplicationStore {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  APPLE_ITUNES = 'APPLE_ITUNES',
  GOOGLE_PLAY = 'GOOGLE_PLAY',
  ROKU = 'ROKU',
  AMAZON_FIRETV = 'AMAZON_FIRETV',
  PLAYSTATION = 'PLAYSTATION',
  XBOX = 'XBOX',
  SAMSUNG_TV = 'SAMSUNG_TV',
  AMAZON_APP_STORE = 'AMAZON_APP_STORE',
  OPPO_APP_STORE = 'OPPO_APP_STORE',
  SAMSUNG_APP_STORE = 'SAMSUNG_APP_STORE',
  VIVO_APP_STORE = 'VIVO_APP_STORE',
  XIAOMI_APP_STORE = 'XIAOMI_APP_STORE',
  LG_TV = 'LG_TV',
}

/**
 * A platform a `MobileApplication` can run on.
 */
export enum MobileApplicationPlatform {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * The value returned if the actual value is not supported by Ad Manager.
   */
  UNSUPPORTED = 'UNSUPPORTED',
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  ROKU = 'ROKU',
  AMAZON_FIRETV = 'AMAZON_FIRETV',
  PLAYSTATION = 'PLAYSTATION',
  XBOX = 'XBOX',
  SAMSUNG_TV = 'SAMSUNG_TV',
  LG_TV = 'LG_TV',
}

/**
 * The approval status of the mobile application.
 */
export enum MobileApplicationApprovalStatus {
  /**
   * Unknown approval status.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * The application is not yet ready for review.
   */
  DRAFT = 'DRAFT',
  /**
   * The application has not yet been reviewed.
   */
  UNCHECKED = 'UNCHECKED',
  /**
   * The application can serve ads.
   */
  APPROVED = 'APPROVED',
  /**
   * The application failed approval checks and it cannot serve any ads.
   */
  DISAPPROVED = 'DISAPPROVED',
  /**
   * The application is disapproved but has a pending review status, signaling an appeal.
   */
  APPEALING = 'APPEALING',
}
