import { DateTime } from '../types';

/**
 * A utility class that allows you to build Datetime objects from strings.
 */
export class DateTimeUtilities {
  /**
   * Converts the string in format yyyyMMdd HH:mm:ss to a DateTime object
   * with the specified time zone.
   * @param dateString The date string.
   * @param timeZoneId The timeZoneId to set.
   * @returns A AdManager Datetime object.
   */
  public fromString(dateString: string, timeZoneId: string): DateTime {
    const date = new Date(dateString);
    return this.fromDate(date, timeZoneId);
  }

  /**
   * Converts Date object to a AdManager DateTime object with the specified
   * timeZoneId. Does not perform time zone conversion. This means the returned DateTime
   * value may not represent the same instant as the Date value.
   * @param date The Date object.
   * @param timeZoneId The timeZoneId to use.
   * @returns A AdManager Datetime object.
   */
  public fromDate(date: Date, timeZoneId: string = Intl.DateTimeFormat().resolvedOptions().timeZone): DateTime {
    return {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      },
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      timeZoneId,
    };
  }

  /**
   * Converts AdManager DateTime object to a string.
   * @param dateTime The DateTime object.
   * @returns A string.
   */
  public toString(dateTime: DateTime): string {
    const date = new Date(
      `${dateTime.date.year}/${dateTime.date.month}/${dateTime.date.day} ${dateTime.hour}:${dateTime.minute}:${dateTime.second}`,
    );

    date.toLocaleString('en-US', {
      timeZone: dateTime.timeZoneId,
    });

    return date.toString();
  }
}
