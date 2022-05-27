import { DateRange, DateTime } from '@common/types';
import { UnitType } from '@v202202/common/enums';
import { CreativePlaceholder, Targeting } from '@v202202/common/types';
import { LineItem } from '../lineItem/lineItem.type';
import { ProposalLineItem } from '../proposalLineItem/proposalLineItem.type';
import {
  GrpAge,
  GrpGender,
  GrpUnitType,
  TargetingDimension,
} from './forecast.enum';

/**
 * Represents a prospective line item to be forecasted.
 */
export type ProspectiveLineItem = {
  /**
   * The target of the forecast. If LineItem.id is null or no line item exists with that ID, then a forecast is computed for the subject,
   * predicting what would happen if it were added to the network. If a line item already exists with LineItem.id,
   * the forecast is computed for the subject, predicting what would happen if the existing line item's settings were modified to match the subject.
   */
  lineItem: LineItem;

  /**
   * The target of the forecast if this prospective line item is a proposal line item.
   *
   * If ProposalLineItem.id is null or no proposal line item exists with that ID, then a forecast is computed for the subject,
   * predicting what would happen if it were added to the network.
   * If a proposal line item already exists with ProposalLineItem.id, the forecast is computed for the subject,
   * predicting what would happen if the existing proposal line item's settings were modified to match the subject.
   *
   * A proposal line item can optionally correspond to an order LineItem, in which case,
   * by forecasting a proposal line item, the corresponding line item is implicitly ignored in the forecasting.
   *
   * Either lineItem or proposalLineItem should be specified but not both.
   */
  proposalLineItem: ProposalLineItem;

  /**
   * When set, the line item is assumed to be from this advertiser, and unified blocking rules will apply accordingly. If absent, line items without an existing order won't be subject to unified blocking rules.
   */
  advertiserId: number;
};

/**
 * Specifies inventory targeted by a breakdown entry.
 */
export type ForecastBreakdownTarget = {
  /**
   * An optional name for this breakdown target, to be populated in the corresponding ForecastBreakdownEntry.name field.
   */
  name: string;

  /**
   * If specified, the targeting for this breakdown.
   */
  targeting: Targeting;

  /**
   * If specified, restrict the breakdown to only inventory matching this creative.
   */
  creative: CreativePlaceholder;
};

/**
 * Configuration of forecast breakdown.
 */
export type ForecastBreakdownOptions = {
  /**
   * The boundaries of time windows to configure time breakdown.
   *
   * By default, the time window of the forecasted LineItem is assumed if none are explicitly specified in this field.
   * But if set, at least two DateTimes are needed to define the boundaries of minimally one time window.
   *
   * Also, the time boundaries are required to be in the same time zone, in strictly ascending order.
   */
  timeWindows: DateTime[];

  /**
   * For each time window, these are the breakdown targets. If none specified, the targeting of the forecasted LineItem is assumed.
   */
  targets: ForecastBreakdownTarget[];
};

/**
 * Forecasting options for line item availability forecasts.
 */
export type AvailabilityForecastOptions = {
  /**
   * When specified, forecast result for the availability line item will also include breakdowns by its targeting in AvailabilityForecast.targetingCriteriaBreakdowns.
   */
  includeTargetingCriteriaBreakdown: boolean;

  /**
   * When specified, the forecast result for the availability line item will also include contending line items in AvailabilityForecast.contendingLineItems.
   */
  includeContendingLineItems: boolean;

  breakdown: ForecastBreakdownOptions;
};

/**
 * Represents a single delivery data point, with both available and forecast number.
 */
export type BreakdownForecast = {
  matched: number;

  available: number;

  possible: number;
};

/**
 * A single forecast breakdown entry.
 */
export type ForecastBreakdownEntry = {
  /**
   * The optional name of this entry, as specified in the corresponding ForecastBreakdownTarget.name field.
   */
  name: string;

  /**
   * The forecast of this entry.
   */
  forecast: BreakdownForecast;
};

/**
 * Represents the breakdown entries for a list of targetings and/or creatives.
 */
export type ForecastBreakdown = {
  /**
   * The starting time of the represented breakdown.
   */
  startTime: DateTime;

  /**
   * The end time of the represented breakdown.
   */
  endTime: DateTime;

  /**
   * The forecast breakdown entries in the same order as in the ForecastBreakdownOptions.targets field.
   */
  breakdownEntries: ForecastBreakdownEntry[];
};

/**
 * A single targeting criteria breakdown result.
 */
export type TargetingCriteriaBreakdown = {
  /**
   * The dimension of this breakdown
   */
  targetingDimension: TargetingDimension;

  /**
   * The unique ID of the targeting criteria.
   */
  targetingCriteriaId: number;

  /**
   * The name of the targeting criteria.
   */
  targetingCriteriaName: string;

  /**
   * When true, the breakdown is negative.
   */
  excluded: boolean;

  /**
   * The available units for this breakdown.
   */
  availableUnits: number;

  /**
   * The matched units for this breakdown.
   */
  matchedUnits: number;
};

/**
 * Describes contending line items for a Forecast.
 */
export type ContendingLineItem = {
  /**
   * The Id of the contending line item.
   */
  lineItemId: number;

  /**
   * Number of impressions contended for by both the forecasted line item and this line item, but served to this line item in the forecast simulation.
   */
  contendingImpressions: number;
};

/**
 * A view of the forecast in terms of an alternative unit type.
 *
 * For example, a forecast for an impressions goal may include this to express the matched, available, and possible viewable impressions.
 */
export type AlternativeUnitTypeForecast = {
  /**
   * The alternative unit type being presented.
   */
  unitType: UnitType;

  /**
   * The number of units, defined by unitType, that match the specified targeting and delivery settings.
   */
  matchedUnits: number;

  /**
   * The number of units, defined by unitType, that can be booked without affecting the delivery of any reserved line items. Exceeding this value will not cause an overbook, but lower-priority line items may not run.
   */
  availableUnits: number;

  /**
   * The maximum number of units, defined by unitType, that could be booked by taking inventory away from lower-priority line items.
   */
  possibleUnits: number;
};

/**
 * GRP forecast breakdown counts associated with a gender and age demographic.
 */
export type GrpDemographicBreakdown = {
  /**
   * The number of units matching the demographic breakdown that can be booked without affecting the delivery of any reserved line items.
   */
  availableUnits: number;

  /**
   * The number of units matching the demographic and matching specified targeting and delivery settings.
   */
  matchedUnits: number;

  /**
   * The GrpUnitType associated with this demographic breakdown.
   */
  unitType: GrpUnitType;

  /**
   * The GrpGender associated with this demographic breakdown.
   */
  gender: GrpGender;

  /**
   *  The GrpAge associated with this demographic breakdown.
   */
  age: GrpAge;
};

/**
 * Describes predicted inventory availability for a {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.ProspectiveLineItem ProspectiveLineItem}.
 *
 * Inventory has three threshold values along a line of possible inventory. From least to most, these are:
 *
 * - Available units -- How many units can be booked without affecting any other line items. Booking more than this number can cause lower and same priority line items to underdeliver.
 * - Possible units -- How many units can be booked without affecting any higher priority line items. Booking more than this number can cause the line item to underdeliver.
 * - Matched (forecast) units -- How many units satisfy all specified criteria.
 *
 * Underdelivery is caused by overbooking. However, if more impressions are served than are predicted, the extra available inventory might enable all inventory guarantees to be met without overbooking.
 */
export type AvailabilityForecast = {
  /**
   * Uniquely identifies this availability forecast. This value is read-only and is assigned by Google when the forecast is created. The attribute will be either the ID of the LineItem object it represents, or null if the forecast represents a prospective line item.
   */
  lineItemId: number;

  /**
   * The unique ID for the Order object that this line item belongs to, or null if the forecast represents a prospective line item without an LineItem.orderId set.
   */
  orderId: number;

  /**
   * The unit with which the goal or cap of the LineItem is defined. Will be the same value as Goal.unitType for both a set line item or a prospective one.
   */
  unitType: UnitType;

  /**
   * The number of units, defined by Goal.unitType, that can be booked without affecting the delivery of any reserved line items. Exceeding this value will not cause an overbook, but lower priority line items may not run.
   */
  availableUnits: number;

  /**
   * The number of units, defined by Goal.unitType, that have already been served if the reservation is already running.
   */
  deliveredUnits: number;

  /**
   * The number of units, defined by Goal.unitType, that match the specified targeting and delivery settings.
   */
  matchedUnits: number;

  /**
   * The maximum number of units, defined by Goal.unitType, that could be booked by taking inventory away from lower priority line items and some same priority line items.
   *
   * Please note: booking this number may cause lower priority line items and some same priority line items to underdeliver.
   */
  possibleUnits: number;

  /**
   * The number of reserved units, defined by Goal.unitType, requested. This can be an absolute or percentage value.
   */
  reservedUnits: number;

  /**
   * The breakdowns for each time window defined in ForecastBreakdownOptions.timeWindows.
   */
  breakdowns: ForecastBreakdown[];

  /**
   * The forecast result broken down by the targeting of the forecasted line item.
   */
  targetingCriteriaBreakdowns: TargetingCriteriaBreakdown[];

  /**
   * List of contending line items for this forecast.
   */
  contendingLineItems: ContendingLineItem[];

  /**
   * Views of this forecast, with alternative unit types.
   */
  alternativeUnitTypeForecasts: AlternativeUnitTypeForecast[];

  /**
   * The forecast result broken down by demographics.
   */
  demographicBreakdowns: GrpDemographicBreakdown[];
};

/**
 * Forecasting options for line item delivery forecasts.
 */
export type DeliveryForecastOptions = {
  /**
   * Line item IDs to be ignored while performing the delivery simulation.
   */
  ignoredLineItemIds: number[];
};

/**
 * The forecasted delivery of a ProspectiveLineItem.
 */
export type LineItemDeliveryForecast = {
  /**
   * Uniquely identifies this line item delivery forecast. This value is read-only and will be either the ID of the LineItem object it represents, or null if the forecast represents a prospective line item.
   */
  lineItemId: number;

  /**
   * The unique ID for the Order object that this line item belongs to, or null if the forecast represents a prospective line item without an LineItem.orderId set.
   */
  orderId: number;

  /**
   * The unit with which the goal or cap of the LineItem is defined. Will be the same value as Goal.unitType for both a set line item or a prospective one.
   */
  unitType: UnitType;

  /**
   * The number of units, defined by Goal.unitType, that will be delivered by the line item. Delivery of existing line items that are of same or lower priorities may be impacted.
   */
  predictedDeliveryUnits: number;

  /**
   * The number of units, defined by Goal.unitType, that have already been served if the reservation is already running.
   */
  deliveredUnits: number;

  /**
   * The number of units, defined by Goal.unitType, that match the specified LineItem.targeting and delivery settings.
   */
  matchedUnits: number;
};

/**
 * The forecast of delivery for a list of ProspectiveLineItem objects to be reserved at the same time.
 */
export type DeliveryForecast = {
  /**
   * The delivery forecasts of the forecasted line items.
   */
  lineItemDeliveryForecasts: LineItemDeliveryForecast[];
};

/**
 * Defines a segment of traffic for which traffic data should be returned.
 */
export type TrafficDataRequest = {
  /**
   * The TargetingDto that defines a segment of traffic.
   *
   * This attribute is required.
   */
  targeting: Targeting;

  /**
   * The date range for which traffic data are requested. This range may cover historical dates, future dates, or both.
   *
   * The data returned are not guaranteed to cover the entire requested date range.
   * If sufficient data are not available to cover the entire requested date range, a response may be returned with a later start date, earlier end date, or both.
   *
   * This attribute is required.
   */
  requestedDateRange: DateRange;
};

/**
 * Represents a chronological sequence of daily values.
 */
export type TimeSeries = {
  /**
   * The date range of the time series.
   */
  timeSeriesDateRange: DateRange;

  /**
   * The daily values constituting the time series.
   *
   * The number of time series values must equal the number of days spanned by the time series date range, inclusive.
   * E.g.: timeSeriesDateRange of 2001-08-15 to 2001-08-17 should contain one value for the 15th, one value for the 16th, and one value for the 17th.
   */
  values: number[];
};

/**
 *
 */
export type TrafficDataResponse = {
  /**
   * Time series of historical traffic ad opportunity counts.
   *
   * This may be null if the requested date range did not contain any historical dates, or if no historical data are available for the requested traffic segment. This attribute is read-only.
   */
  historicalTimeSeries: TimeSeries;

  /**
   * Time series of forecasted traffic ad opportunity counts.
   *
   * This may be null if the requested date range did not contain any future dates, or if no forecasted data are available for the requested traffic segment.
   * This attribute is read-only.
   */
  forecastedTimeSeries: TimeSeries;

  /**
   * Time series of future traffic volumes forecasted to be sold.
   *
   * This may be null if the requested date range did not contain any future dates, or if no sell-through data are available for the requested traffic segment.
   * This attribute is read-only.
   */
  forecastedAssignedTimeSeries: TimeSeries;

  /**
   * The overall date range spanned by the union of all time series in the response.
   *
   * This is a summary field for convenience. The value will be set such that the start date is equal to the earliest start date of all time series included, and the end date is equal to the latest end date of all time series included.
   *
   * If all time series fields are null, this field will also be null. This attribute is read-only.
   */
  overallDateRange: DateRange;
};
