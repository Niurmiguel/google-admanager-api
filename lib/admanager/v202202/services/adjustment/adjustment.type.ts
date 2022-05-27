import { DateRange, DateTime, PageResult } from '@common/types';
import { Targeting } from '@v202202/common/types';
import {
  ForecastAdjustmentStatus,
  ForecastAdjustmentVolumeType,
} from './adjustment.enum';

/**
 * Settings to specify daily ad opportunity counts that will be used as the expected future traffic volume for a forecast adjustment.
 *
 * For example: [10000, 20000, 5000] indicates expected traffic for the targeting specified on the parent traffic forecast segment of 10,000
 * ad opportunities for the first day, 20,000 ad opportunities for the second, and 5,000 for the third.
 */
type DailyVolumeSettings = {
  /**
   * The list of ad opportunity counts. Each value in this list represents the expected number of ad opportunities on the corresponding day of the adjustment date range.
   *
   * The number of values provided must match the number of days in the adjustment date range, inclusive.
   * For example, an adjustment date range of June 5-June 7 would need 3 values in this list, one for June 5, one for June 6, and one for June 7.
   *
   * *This attribute is required.*
   */
  adOpportunityCounts: number[];
};

/**
 * Settings to specify a single total traffic volume that will be used as the expected total future volume for a forecast adjustment.
 *
 * For example, an adOpportunityCount of 3,000 indicates a forecast goal for the targeting specified on the parent traffic forecast segment of 3,000
 * ad opportunities over the entire duration of the adjustment.
 */
type TotalVolumeSettings = {
  /**
   * The total ad opportunity count over the entire forecast adjustment date range.
   *
   * *This attribute is required.*
   */
  adOpportunityCount: number;
};

/**
 * Settings to specify the volume of ad opportunities per day over the
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.ForecastAdjustment ForecastAdjustment}
 * date range based on the traffic volume of a historical reference period.
 *
 * The daily historical traffic for the provided targeting and date range is fetched, multiplied by the provided multiplier,
 * and used as the daily expected traffic for the adjustment.
 *
 * The number of days included in the historical date range does *not* need to be the same as the number of days included in the adjustment date range.
 */
type HistoricalBasisVolumeSettings = {
  /**
   * Whether the parent traffic forecast segment targeting's or the targeting's historical volume data should be used.
   *
   * *This attribute is required.*
   */
  useParentTrafficForecastSegmentTargeting: boolean;

  /**
   * The targeting criteria to use as the source of the historical volume data. This field is required if useParentTrafficForecastSegmentTargeting is false and ignored otherwise.
   */
  targeting: Targeting;

  /**
   * The date range to use for the historical ad opportunity volume.
   *
   * *This attribute is required.*
   */
  historicalDateRange: DateRange;
  /**
   * The multiplier to apply to the historical traffic volume, expressed in thousandths of a percent.
   * For example, to set the forecasted traffic as 130% of the historical traffic, this value would be 130,000.
   *
   * *This attribute is required.*
   */
  multiplierMilliPercent: number;
};

/**
 * Provides information about the expected volume and composition of traffic over a date range for a traffic forecast segment.
 */
export type ForecastAdjustment = {
  /**
   * The unique ID of the ForecastAdjustment. This field is read-only. This attribute is read-only.
   */
  id: number;
  /**
   * The ID of the parent TrafficForecastSegment. This field is required and immutable after creation.
   *
   * *This attribute is required.*
   */
  trafficForecastSegmentId: number;
  /**
   * Name of the ForecastAdjustment.
   *
   * *This attribute is required.*
   */
  name: string;
  /**
   * The start and end date range of the adjustment.
   *
   * *This attribute is required.*
   */
  dateRange: DateRange;
  /**
   * The status of the adjustment. Changes to this field should be made via performForecastAdjustmentAction This attribute is read-only.
   */
  status: ForecastAdjustmentStatus;
  /**
   * The volume type of the adjustment.
   */
  volumeType: ForecastAdjustmentVolumeType;
  /**
   * Whether to allow provided volume settings to increase the current forecast by more than 300%.
   * Due to system constraints, adjusting the forecast by more than 300% may have unintended consequences for other parts of the forecast.
   *
   * Note that this field will not persist on the adjustment itself, and will only affect the current request.
   */
  allowAdjustingForecastAboveRecommendedLimit: boolean;
  /**
   * The daily number of ad opportunities for each day in the adjustment date range.
   * This field is required if volumeType is ForecastAdjustmentVolumeType#DAILY_VOLUME and ignored othewise.
   */
  dailyVolumeSettings: DailyVolumeSettings;
  /**
   * The total number of ad opportunities for the entire adjustment date range.
   * This field is required if volumeType is ForecastAdjustmentVolumeType#TOTAL_VOLUME and ignored othewise.
   */
  totalVolumeSettings: TotalVolumeSettings;
  /**
   * The daily number of ad opportunities for each day in the adjustment date range, determined by reference to the ad opportunity volume of a historical reference period.
   * This field is required if volumeType is ForecastAdjustmentVolumeType#HISTORICAL_BASIS_VOLUME and ignored othewise.
   */
  historicalBasisVolumeSettings: HistoricalBasisVolumeSettings;
  /**
   * The daily number of ad opportunities calculated to satisfy the provided volume settings.
   * Each value in this list represents the calculated ad opportunities on the corresponding day of the adjustment date range.
   * For example: for a dateRange of 2001-8-15 to 2001-8-17, this field will contain one value for 2001-8-15, one value for 2001-8-16, and one value for 2001-8-17.
   *
   * This field is read-only and is populated by Google after forecast adjustment creation or update. This attribute is read-only.
   */
  calculatedDailyAdOpportunityCounts: number[];
};

/**
 * An entity that defines a segment of traffic that will be adjusted or explored.
 */
export type TrafficForecastSegment = {
  /**
   * The unique ID of the TrafficForecastSegment. This field is read-only and set by Google. This attribute is read-only.
   */
  id: number;
  /**
   * Name of the TrafficForecastSegment. This field must be unique among all segments for this network.
   *
   * *This attribute is required.*
   */
  name: string;
  /**
   * The targeting that defines a segment of traffic. Targeting cannot be changed after segment creation.
   *
   * *This attribute is required.*
   */
  targeting: Targeting;
  /**
   * The number of active forecast adjustments associated with the TrafficForecastSegment. This attribute is read-only.
   */
  activeForecastAdjustmentCount: number;
  /**
   * The date and time that the TrafficForecastSegment was created. This attribute is read-only.
   */
  creationDateTime: DateTime;
};

export type ForecastAdjustmentAction =
  | 'ActivateForecastAdjustments'
  | 'DeactivateForecastAdjustments';

/**
 * A page of **`ForecastAdjustmentDto`** objects.
 */
export type ForecastAdjustmentPage = PageResult<ForecastAdjustment>;

/**
 * A page of **`TrafficForecastSegmentDto`** objects.
 */
export type TrafficForecastSegmentPage = PageResult<TrafficForecastSegment>;
