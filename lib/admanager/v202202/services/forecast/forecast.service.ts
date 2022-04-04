import { Client } from 'soap';

import { ForecastServiceOperations } from './forecastService.interface';
import {
  ProspectiveLineItem,
  AvailabilityForecastOptions,
  AvailabilityForecast,
  DeliveryForecastOptions,
  DeliveryForecast,
  TrafficDataRequest,
  TrafficDataResponse,
} from './forecast.type';

export class ForecastService implements ForecastServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }
  getAvailabilityForecast(
    lineItem: ProspectiveLineItem,
    forecastOptions: AvailabilityForecastOptions,
  ): Promise<AvailabilityForecast> {
    return this._client.getAvailabilityForecast({ lineItem, forecastOptions });
  }

  getAvailabilityForecastById(
    lineItemId: number,
    forecastOptions: AvailabilityForecastOptions,
  ): Promise<AvailabilityForecast> {
    return this._client.getAvailabilityForecastById({
      lineItemId,
      forecastOptions,
    });
  }

  getDeliveryForecast(
    lineItems: ProspectiveLineItem[],
    forecastOptions: DeliveryForecastOptions,
  ): Promise<DeliveryForecast> {
    return this._client.getDeliveryForecast({ lineItems, forecastOptions });
  }

  getDeliveryForecastByIds(
    lineItemIds: number[],
    forecastOptions: DeliveryForecastOptions,
  ): Promise<DeliveryForecast> {
    return this._client.getDeliveryForecastByIds({
      lineItemIds,
      forecastOptions,
    });
  }

  getTrafficData(
    trafficDataRequest: TrafficDataRequest,
  ): Promise<TrafficDataResponse> {
    return this._client.getTrafficData({ trafficDataRequest });
  }
}
