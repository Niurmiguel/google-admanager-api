/**
 * Represents the status of ad rules and ad rule slots.
 */
export enum AdRuleStatus {
  /**
   * 	Created and ready to be served. Is user-visible.
   */
  ACTIVE = 'ACTIVE',

  /**
   * 	Paused, user-visible.
   */
  INACTIVE = 'INACTIVE',

  /**
   * 	Marked as deleted, not user-visible.
   */
  DELETED = 'DELETED',

  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Types of behavior for frequency caps within ad rules.
 */
export enum FrequencyCapBehavior {
  /**
   * 	Turn on at least one of the frequency caps.
   */
  TURN_ON = 'TURN_ON',

  /**
   * 	Turn off all frequency caps.
   */
  TURN_OFF = 'TURN_OFF',

  /**
   * 	Defer frequency cap decisions to the next ad rule in priority order.
   */
  DEFER = 'DEFER',

  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * The types of behaviors for ads within a ad rule slot.
 */
export enum AdRuleSlotBehavior {
  /**
   * 	This ad rule always includes this slot's ads.
   */
  ALWAYS_SHOW = 'ALWAYS_SHOW',

  /**
   * 	This ad rule never includes this slot's ads.
   */
  NEVER_SHOW = 'NEVER_SHOW',

  /**
   * 	Defer to lower priority rules. This ad rule doesn't specify guidelines for this slot's ads.
   */
  DEFER = 'DEFER',

  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Frequency types for mid-roll ad rule slots.
 */
export enum MidrollFrequencyType {
  /**
   * 	The ad rule slot is not a mid-roll and hence MidrollFrequency should be ignored.
   */
  NONE = 'NONE',

  /**
   * 	MidrollFrequency is a time interval and mentioned as a single numeric value in seconds. For example, "100" would mean "play a mid-roll every 100 seconds".
   */
  EVERY_N_SECONDS = 'EVERY_N_SECONDS',

  /**
   * 	MidrollFrequency is a comma-delimited list of points in time (in seconds) when an ad should play. For example, "100,300" would mean "play an ad at 100 seconds and 300 seconds".
   */
  FIXED_TIME = 'FIXED_TIME',

  /**
   * 	MidrollFrequency is a cue point interval and is a single integer value, such as "5", which means "play a mid-roll every 5th cue point".
   */
  EVERY_N_CUEPOINTS = 'EVERY_N_CUEPOINTS',

  /**
   * 	Same as FIXED_TIME, except the values represent the ordinal cue points ("1,3,5", for example).
   */
  FIXED_CUE_POINTS = 'FIXED_CUE_POINTS',

  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Types of bumper ads on an ad rule slot.
 */
export enum AdRuleSlotBumper {
  /**
   * 	Do not show a bumper ad.
   */
  NONE = 'NONE',

  /**
   * 	Show a bumper ad before the slot's other ads.
   */
  BEFORE = 'BEFORE',

  /**
   * 	Show a bumper ad after the slot's other ads.
   */
  AFTER = 'AFTER',

  /**
   * 	Show a bumper before and after the slot's other ads.
   */
  BEFORE_AND_AFTER = 'BEFORE_AND_AFTER',

  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Defines the targeting behavior of an ad spot.
 */
export enum AdSpotTargetingType {
  /**
   * 	Line items not targeting this ad spot explicitly may serve in it.
   */
  NOT_REQUIRED = 'NOT_REQUIRED',

  /**
   * 	Only line items targeting this ad spots explicitly may serve in it
   */
  EXPLICITLY_TARGETED = 'EXPLICITLY_TARGETED',

  /**
   * 	If house ads are an allowed reservation type, they may serve in the ad spot regardless of whether they explicitly target it. Ads of other reservation types (whose type is allowed in the ad spot), may serve in the ad spot only if explicitly targeted.
   */
  EXPLICITLY_TARGETED_EXCEPT_HOUSE = 'EXPLICITLY_TARGETED_EXCEPT_HOUSE',

  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * The different options for how ad spots are filled. Only some allocations of ads to subpods produce a valid final pod.
 */
export enum AdSpotFillType {
  /**
   * 	If this ad spot is empty, the overall pod is invalid.
   */
  REQUIRED = 'REQUIRED',

  /**
   * 	The ad spot is always "satisfied", whether empty or nonempty.
   */
  OPTIONAL = 'OPTIONAL',

  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
