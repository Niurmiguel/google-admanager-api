// Generated from the Ad Manager v202608 WSDLs by scripts/generate-enums.js.
// Do not edit values or comments by hand: run `npm run generate:enums`.
// To add an enum, declare it empty (`export enum Name {}`) and run the script.

/**
 * The status of a forecast adjustment. Inactive adjustments are not applied during forecasting.
 */
export enum ForecastAdjustmentStatus {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Indicates the current adjustment is active.
   */
  ACTIVE = 'ACTIVE',
  /**
   * Indicates the current adjustment is inactive.
   */
  INACTIVE = 'INACTIVE',
}

/**
 * Options for how the volume settings of a `ForecastAdjustment` are defined.
 */
export enum ForecastAdjustmentVolumeType {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Volume is defined by a series of daily ad opportunity counts.
   */
  DAILY_VOLUME = 'DAILY_VOLUME',
  /**
   * Volume is defined by a single total ad opportunity count.
   */
  TOTAL_VOLUME = 'TOTAL_VOLUME',
  /**
   * Volume is defined by historical volume data.
   */
  HISTORICAL_BASIS_VOLUME = 'HISTORICAL_BASIS_VOLUME',
}
