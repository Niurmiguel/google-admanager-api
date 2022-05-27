import { MinuteOfHour } from '../enums';

/**
 * Represents a date.
 */
export type Date = {
  year: number;
  month: number;
  day: number;
};

/**
 * Represents a date combined with the time of day.
 */
export type DateTime = {
  date: Date;
  hour: number;
  minute: number;
  second: number;
  timeZoneId: string;
};

/**
 * Represents a range of dates (combined with time of day) that has an upper and/or lower bound.
 */
export type DateTimeRange = {
  /**
   * The start date time of this range. This field is optional and if it is not set then there is no lower bound on the date time range. If this field is not set then endDateTime must be specified.
   */
  startDateTime: DateTime;

  /**
   * The end date time of this range. This field is optional and if it is not set then there is no upper bound on the date time range. If this field is not set then startDateTime must be specified.
   */
  endDateTime: DateTime;
};

/**
 * Represents a range of dates that has an upper and a lower bound.
 *
 * An open ended date range can be described by only setting either one of the
 * bounds, the upper bound or the lower bound.
 */
export type DateRange = {
  /**
   * The start date of this range. This field is optional and if it is not set
   * then there is no lower bound on the date range. If this field is not set
   * then endDate must be specified.
   */
  startDate: Date;

  /**
   * The end date of this range. This field is optional and if it is not set
   * then there is no upper bound on the date range. If this field is not set
   * then startDate must be specified.
   */
  endDate: Date;
};

/**
 * Represents a specific time in a day.
 */
export type TimeOfDay = {
  /**
   * Hour in 24 hour time (0..24). This field must be between 0 and 24, inclusive. This field is required.
   */
  hour: number;

  /**
   * Minutes in an hour. Currently, only 0, 15, 30, and 45 are supported. This field is required.
   */
  minute: MinuteOfHour;
};
