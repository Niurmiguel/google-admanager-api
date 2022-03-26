/**
 * Specifies the start type to use for an entity with a start date time field. For example, a LineItem or LineItemCreativeAssociation.
 */
export enum StartDateTimeType {
  /**
   * 	Use the value in startDateTime.
   */
  USE_START_DATE_TIME = 'USE_START_DATE_TIME',

  /**
   * 	The entity will start serving immediately. startDateTime in the request is ignored and will be set to the current time. Additionally, startDateTimeType will be set to StartDateTimeType.USE_START_DATE_TIME.
   */
  IMMEDIATELY = 'IMMEDIATELY',

  /**
   * 	The entity will start serving one hour from now. startDateTime in the request is ignored and will be set to one hour from the current time. Additionally, startDateTimeType will be set to StartDateTimeType.USE_START_DATE_TIME.
   */
  ONE_HOUR_FROM_NOW = 'ONE_HOUR_FROM_NOW',

  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Represent the possible time units for frequency capping.
 */
export enum TimeUnit {
  MINUTE = 'MINUTE',

  HOUR = 'HOUR',

  DAY = 'DAY',

  WEEK = 'WEEK',

  MONTH = 'MONTH',

  LIFETIME = 'LIFETIME',

  /**
   * Per pod of ads in a video stream. Only valid for entities in a EnvironmentType.VIDEO_PLAYER environment.
   */
  POD = 'POD',

  /**
   * Per video stream. Only valid for entities in a EnvironmentType.VIDEO_PLAYER environment.
   */
  STREAM = 'STREAM',

  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Days of the week.
 */
export enum DayOfWeek {
  /**
   * 	The day of week named Monday.
   */
  MONDAY = 'MONDAY',

  /**
   * 	The day of week named Tuesday.
   */
  TUESDAY = 'TUESDAY',

  /**
   * 	The day of week named Wednesday.
   */
  WEDNESDAY = 'WEDNESDAY',

  /**
   * 	The day of week named Thursday.
   */
  THURSDAY = 'THURSDAY',

  /**
   * 	The day of week named Friday.
   */
  FRIDAY = 'FRIDAY',

  /**
   * 	The day of week named Saturday.
   */
  SATURDAY = 'SATURDAY',

  /**
   * 	The day of week named Sunday.
   */
  SUNDAY = 'SUNDAY',
}

/**
 * Minutes in an hour. Currently, only 0, 15, 30, and 45 are supported. This field is required.
 */
export enum MinuteOfHour {
  /**
   * 	Zero minutes past hour.
   */
  ZERO = 'ZERO',

  /**
   * 	Fifteen minutes past hour.
   */
  FIFTEEN = 'FIFTEEN',

  /**
   * 	Thirty minutes past hour.
   */
  THIRTY = 'THIRTY',

  /**
   * 	Forty-five minutes past hour.
   */
  FORTY_FIVE = 'FORTY_FIVE',
}
