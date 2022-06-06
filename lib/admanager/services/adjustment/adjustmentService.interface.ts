import { Statement, UpdateResult } from '../../../common/types';
import {
  ForecastAdjustment,
  ForecastAdjustmentAction,
  ForecastAdjustmentPage,
  TrafficForecastSegment,
  TrafficForecastSegmentPage,
} from './adjustment.type';

/**
 * Provides methods for creating, updating, and retrieving
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.ForecastAdjustment ForecastAdjustment}s and
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.TrafficForecastSegment TrafficForecastSegment}s.
 *
 * Forecast adjustments allow editing the volume and traffic composition of forecasted inventory.
 * Traffic forecast segments divide forecasted inventory into segments to which forecast adjustments can be applied.
 */
export interface AdjustmentServiceOperations {
  /**
   * Takes a prospective forecast adjustment and calculates the daily ad opportunity counts corresponding to its provided volume settings.
   *
   * @param forecastAdjustment the prospective forecast adjustment
   * @returns a forecast adjustment matching the one passed in, but with its calculatedDailyAdOpportunityCounts field populated
   */
  calculateDailyAdOpportunityCounts(
    forecastAdjustment: ForecastAdjustment,
  ): Promise<ForecastAdjustment>;
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.ForecastAdjustment ForecastAdjustment} objects.
   *
   * @param forecastAdjustments the forecast adjustments to create
   * @returns the persisted forecast adjustments with their IDs populated
   */
  createForecastAdjustments(
    forecastAdjustments: ForecastAdjustment[],
  ): Promise<ForecastAdjustment[]>;
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.TrafficForecastSegment TrafficForecastSegment} objects.
   *
   * @param trafficForecastSegments the traffic forecast segments to create
   * @returns the persisted traffic forecast segments with their IDs populated
   */
  createTrafficForecastSegments(
    trafficForecastSegments: TrafficForecastSegment[],
  ): Promise<TrafficForecastSegment[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.ForecastAdjustmentPage ForecastAdjustmentPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.ForecastAdjustment ForecastAdjustment}
   * objects that satisfy the given {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.Statement#query Statement.query}.
   *
   * The following fields are supported for filtering:
   *
   * | PQL Property             | PQL Property                                                                                                                                                                     |
   * | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id                       | {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.ForecastAdjustment#id ForecastAdjustment.id}                                             |
   * | trafficForecastSegmentId | {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.ForecastAdjustment#trafficForecastSegmentId ForecastAdjustment.trafficForecastSegmentId} |
   * | name                     | {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.ForecastAdjustment#name ForecastAdjustment.name}                                         |
   * | startDate                | {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.ForecastAdjustment#startDate ForecastAdjustment.startDate}                               |
   * | endDate                  | {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.ForecastAdjustment#endDate ForecastAdjustment.endDate}                                   |
   * | status                   | {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.ForecastAdjustment#status ForecastAdjustment.status}                                     |
   *
   * @param filterStatement a Publisher Query Language statement to filter a list of traffic forecast segments
   * @returns a page of forecast adjustments that match the filter
   */
  getForecastAdjustmentsByStatement(
    filterStatement: Statement,
  ): Promise<ForecastAdjustmentPage>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.TrafficForecastSegmentPage TrafficForecastSegmentPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.TrafficForecastSegment TrafficForecastSegment}
   * objects that satisfy the given {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.Statement#query Statement.query}.
   *
   * The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                                                                     |
   * | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.TrafficForecastSegment#id TrafficForecastSegment.id}                     |
   * | name         | {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.TrafficForecastSegment#name TrafficForecastSegment.name}                 |
   * | creationTime | {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.TrafficForecastSegment#creationTime TrafficForecastSegment.creationTime} |
   *
   * @param filterStatement a Publisher Query Language statement to filter a list of traffic forecast segments
   * @returns a page of traffic forecast segments that match the filter
   */
  getTrafficForecastSegmentsByStatement(
    filterStatement: Statement,
  ): Promise<TrafficForecastSegmentPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.ForecastAdjustment ForecastAdjustment}
   *  objects that match the given {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.Statement#query Statement.query}.
   *
   * @param forecastAdjustmentAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter
   * a set of forecast adjustments
   *
   * @returns the result of the action performed
   */
  performForecastAdjustmentAction(
    forecastAdjustmentAction: ForecastAdjustmentAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;

  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.ForecastAdjustment ForecastAdjustment} objects.
   *
   * @param forecastAdjustments the forecast adjustments to update
   * @returns the updated forecast adjustments
   */
  updateForecastAdjustments(
    forecastAdjustments: ForecastAdjustment[],
  ): Promise<ForecastAdjustment[]>;

  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/AdjustmentService.TrafficForecastSegment TrafficForecastSegment} objects.
   *
   * @param trafficForecastSegments the traffic forecast segments to update
   * @returns the updated traffic forecast segments
   */
  updateTrafficForecastSegments(
    trafficForecastSegments: TrafficForecastSegment[],
  ): Promise<TrafficForecastSegment[]>;
}
