/**
 * Specifies the types for CustomTargetingKey objects.
 */
export enum CustomTargetingKeyType {
  /**
   * Target audiences by criteria values that are defined in advance.
   */
  PREDEFINED = 'PREDEFINED',
  /**
   * Target audiences by adding criteria values when creating line items.
   */
  FREEFORM = 'FREEFORM',
}

/**
 * Enum to represent the type of values that will be passed for this key.
 */
export enum ValueDeclarationType {
  /**
   * Values are not user-related data and will be used in all ad requests.
   */
  NON_USER_DATA = 'NON_USER_DATA',
  /**
   * Values are declared as user data that will not be used in sensitive ad requests' targeting.
   */
  USER_DATA = 'USER_DATA',
  /**
   * Values are declared as user identifiers that will not be used in targeting and will be encrypted in DT using a publisher-provided public key.
   */
  USER_ID = 'USER_ID',
}

/**
 * Describes the statuses for CustomTargetingKey objects.
 */
export enum CustomTargetingKeyStatus {
  /**
   * The object is active.
   */
  ACTIVE = 'ACTIVE',
  /**
   * The object is no longer active.
   */
  INACTIVE = 'INACTIVE',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Represents the reportable state of a custom key.
 */
export enum ReportableType {
  UNKNOWN = 'UNKNOWN',
  /**
   * Available for reporting in the Ad Manager query tool.
   */
  ON = 'ON',
  /**
   * Not available for reporting in the Ad Manager query tool.
   */
  OFF = 'OFF',
  /**
   * Custom dimension available for reporting in the AdManager query tool.
   */
  CUSTOM_DIMENSION = 'CUSTOM_DIMENSION',
}

/**
 * Represents the ways in which
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue#name CustomTargetingValue.name} strings will be matched with ad requests.
 */
export enum CustomTargetingValueMatchType {
  /**
   * Used for exact matching. For example, the targeting value car=honda will only match to the ad request car=honda.
   */
  EXACT = 'EXACT',
  /**
   * Used for lenient matching when at least one of the words in the ad request matches the targeted value.
   * The targeting value car=honda will match to ad requests containing the word honda.
   * So ad requests car=honda or car=honda civic or car=buy honda or car=how much does a honda cost will all have the line item delivered.
   *
   * This match type can not be used within an audience segment rule.
   */
  BROAD = 'BROAD',
  /**
   * Used for 'starts with' matching when the first few characters in the ad request match all of the characters in the targeted value. The targeting value car=honda will match to ad requests car=honda or car=hondas for sale but not to car=I want a honda.
   */
  PREFIX = 'PREFIX',
  /**
   * This is a combination of MatchType#BROAD and MatchType#PREFIX matching.
   * The targeting value car=honda will match to ad requests that contain words that start with the characters in the targeted value, for example with car=civic hondas.
   *
   * This match type can not be used within an audience segment rule.
   */
  BROAD_PREFIX = 'BROAD_PREFIX',
  /**
   * Used for 'ends with' matching when the last characters in the ad request match all of the characters in the targeted value.
   * The targeting value car=honda will match with ad requests car=honda or car=I want a honda but not to car=hondas for sale.
   *
   * This match type can not be used within line item targeting.
   */
  SUFFIX = 'SUFFIX',
  /**
   * Used for 'within' matching when the string in the ad request contains the string in the targeted value.
   * The targeting value car=honda will match with ad requests car=honda, car=I want a honda, and also with car=hondas for sale, but not with car=misspelled hond a.
   *
   * This match type can not be used within line item targeting.
   */
  CONTAINS = 'CONTAINS',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Describes the statuses for CustomTargetingValue objects.
 */
export enum CustomTargetingValueStatus {
  /**
   * The object is active.
   */
  ACTIVE = 'ACTIVE',
  /**
   * The object is no longer active.
   */
  INACTIVE = 'INACTIVE',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
