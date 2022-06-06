/**
 * A store a {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication MobileApplication} is available on.
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
}

/**
 * A platform a {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication MobileApplication} can run on.
 */
export enum MobileApplicationPlatform {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  ROKU = 'ROKU',
  AMAZON_FIRETV = 'AMAZON_FIRETV',
  PLAYSTATION = 'PLAYSTATION',
  XBOX = 'XBOX',
  SAMSUNG_TV = 'SAMSUNG_TV',
}
