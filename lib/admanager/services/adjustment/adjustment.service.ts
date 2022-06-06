import { Client } from 'soap';

import { AdjustmentServiceOperations } from './adjustmentService.interface';
import { Statement, UpdateResult } from '../../../common/types';
import {
  ForecastAdjustment,
  ForecastAdjustmentPage,
  TrafficForecastSegment,
  TrafficForecastSegmentPage,
  ForecastAdjustmentAction,
} from './adjustment.type';

export class AdjustmentService implements AdjustmentServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  calculateDailyAdOpportunityCounts(
    forecastAdjustment: ForecastAdjustment,
  ): Promise<ForecastAdjustment> {
    const res = this._client.calculateDailyAdOpportunityCounts({
      forecastAdjustment,
    });
    return res;
  }

  createForecastAdjustments(
    forecastAdjustments: ForecastAdjustment[],
  ): Promise<ForecastAdjustment[]> {
    const res = this._client.createForecastAdjustments({ forecastAdjustments });
    return res;
  }

  createTrafficForecastSegments(
    trafficForecastSegments: TrafficForecastSegment[],
  ): Promise<TrafficForecastSegment[]> {
    const res = this._client.createTrafficForecastSegments({
      trafficForecastSegments,
    });
    return res;
  }

  getForecastAdjustmentsByStatement(
    filterStatement: Statement,
  ): Promise<ForecastAdjustmentPage> {
    const res = this._client.getForecastAdjustmentsByStatement({
      filterStatement,
    });
    return res;
  }

  getTrafficForecastSegmentsByStatement(
    filterStatement: Statement,
  ): Promise<TrafficForecastSegmentPage> {
    const res = this._client.getTrafficForecastSegmentsByStatement({
      filterStatement,
    });
    return res;
  }

  performForecastAdjustmentAction(
    forecastAdjustmentAction: ForecastAdjustmentAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    const res = this._client.performForecastAdjustmentAction({
      forecastAdjustmentAction: {
        attributes: {
          'xsi:type': forecastAdjustmentAction,
        },
      },
      filterStatement,
    });
    return res;
  }

  updateForecastAdjustments(
    forecastAdjustments: ForecastAdjustment[],
  ): Promise<ForecastAdjustment[]> {
    const res = this._client.updateForecastAdjustments({ forecastAdjustments });
    return res;
  }

  updateTrafficForecastSegments(
    trafficForecastSegments: TrafficForecastSegment[],
  ): Promise<TrafficForecastSegment[]> {
    const res = this._client.updateTrafficForecastSegments({
      trafficForecastSegments,
    });
    return res;
  }
}
