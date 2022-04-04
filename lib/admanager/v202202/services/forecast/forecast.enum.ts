/**
 * Targeting dimension of targeting breakdowns.
 */
export enum TargetingDimension {
  CUSTOM_CRITERIA = 'CUSTOM_CRITERIA',
  GEOGRAPHY = 'GEOGRAPHY',
  BROWSER = 'BROWSER',
  BROWSER_LANGUAGE = 'BROWSER_LANGUAGE',
  BANDWIDTH_GROUP = 'BANDWIDTH_GROUP',
  OPERATING_SYSTEM = 'OPERATING_SYSTEM',
  USER_DOMAIN = 'USER_DOMAIN',
  CONTENT = 'CONTENT',
  VIDEO_POSITION = 'VIDEO_POSITION',
  AD_SIZE = 'AD_SIZE',
  AD_UNIT = 'AD_UNIT',
  PLACEMENT = 'PLACEMENT',
  MOBILE_CARRIER = 'MOBILE_CARRIER',
  DEVICE_CAPABILITY = 'DEVICE_CAPABILITY',
  DEVICE_CATEGORY = 'DEVICE_CATEGORY',
  DEVICE_MANUFACTURER = 'DEVICE_MANUFACTURER',
  MOBILE_APPLICATION = 'MOBILE_APPLICATION',
  FORECASTED_CREATIVE_RESTRICTION = 'FORECASTED_CREATIVE_RESTRICTION',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Type of unit represented in a GRP demographic breakdown.
 */
export enum GrpUnitType {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  IMPRESSIONS = 'IMPRESSIONS',
}

/**
 * The demographic gender associated with a GRP demographic forecast.
 */
export enum GrpGender {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * When gender is not available due to low impression levels, GRP privacy thresholds are activated and prevent us from specifying gender.
   */
  GENDER_UNKNOWN = 'GENDER_UNKNOWN',
  GENDER_FEMALE = 'GENDER_FEMALE',
  GENDER_MALE = 'GENDER_MALE',
}

/**
 * The age range associated with a GRP demographic forecast.
 */
export enum GrpAge {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * When the age range is not available due to low impression levels, GRP privacy thresholds are activated and prevent us from specifying age.
   */
  AGE_UNKNOWN = 'AGE_UNKNOWN',
  AGE_0_TO_17 = 'AGE_0_TO_17',
  AGE_18_TO_24 = 'AGE_18_TO_24',
  AGE_25_TO_34 = 'AGE_25_TO_34',
  AGE_35_TO_44 = 'AGE_35_TO_44',
  AGE_45_TO_54 = 'AGE_45_TO_54',
  AGE_55_TO_64 = 'AGE_55_TO_64',
  AGE_65_PLUS = 'AGE_65_PLUS',
  AGE_18_TO_49 = 'AGE_18_TO_49',
  AGE_21_TO_34 = 'AGE_21_TO_34',
  AGE_21_TO_49 = 'AGE_21_TO_49',
  AGE_21_PLUS = 'AGE_21_PLUS',
  AGE_25_TO_49 = 'AGE_25_TO_49',
  AGE_21_TO_44 = 'AGE_21_TO_44',
  AGE_21_TO_54 = 'AGE_21_TO_54',
  AGE_21_TO_64 = 'AGE_21_TO_64',
  AGE_35_TO_49 = 'AGE_35_TO_49',
}
