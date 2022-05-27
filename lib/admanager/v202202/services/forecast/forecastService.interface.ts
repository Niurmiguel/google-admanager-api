import {
  AvailabilityForecast,
  AvailabilityForecastOptions,
  DeliveryForecast,
  DeliveryForecastOptions,
  ProspectiveLineItem,
  TrafficDataRequest,
  TrafficDataResponse,
} from './forecast.type';

/**
 * Provides methods for estimating traffic (clicks/impressions) for line items.
 * Forecasts can be provided for {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem}
 * objects that exist in the system or which have not had an ID set yet.
 */
export interface ForecastServiceOperations {
  /**
   * Gets the availability forecast for a {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.ProspectiveLineItem ProspectiveLineItem}.
   * An availability forecast reports the maximum number of available units that the line item can book, and the total number of units matching the line item's targeting.
   *
   * @param lineItem the prospective line item (new or existing) to be forecasted for availability
   * @param forecastOptions options controlling the forecast
   */
  getAvailabilityForecast(
    lineItem: ProspectiveLineItem,
    forecastOptions: AvailabilityForecastOptions,
  ): Promise<AvailabilityForecast>;
  /**
   * Gets an {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.AvailabilityForecast AvailabilityForecast}
   * for an existing {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem} object.
   * An availability forecast reports the maximum number of available units that the line item can be booked with,
   * and also the total number of units matching the line item's targeting.
   *
   * Only line items having type {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItemType#SPONSORSHIP LineItemType.SPONSORSHIP}
   * or {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItemType#STANDARD LineItemType.STANDARD} are valid.
   * Other types will result in {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.ReservationDetailsError.Reason#LINE_ITEM_TYPE_NOT_ALLOWED ReservationDetailsError.Reason.LINE_ITEM_TYPE_NOT_ALLOWED}.
   *
   * @param lineItemId the ID of a LineItem to run the forecast on.
   * @param forecastOptions options controlling the forecast
   */
  getAvailabilityForecastById(
    lineItemId: number,
    forecastOptions: AvailabilityForecastOptions,
  ): Promise<AvailabilityForecast>;
  /**
   * Gets the delivery forecast for a list of {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.ProspectiveLineItem ProspectiveLineItem}
   * objects in a single delivery simulation with line items potentially contending with each other.
   * A delivery forecast reports the number of units that will be delivered to each line item given the line item goals and contentions from other line items.
   *
   * @param lineItems line items to be forecasted for delivery
   * @param forecastOptions options controlling the forecast
   */
  getDeliveryForecast(
    lineItems: ProspectiveLineItem[],
    forecastOptions: DeliveryForecastOptions,
  ): Promise<DeliveryForecast>;
  /**
   * Gets the delivery forecast for a list of existing {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem}
   * objects in a single delivery simulation.
   * A delivery forecast reports the number of units that will be delivered to each line item given the line item goals and contentions from other line items.
   *
   * @param lineItemIds the IDs of line items to be forecasted for delivery
   * @param forecastOptions options controlling the forecast
   */
  getDeliveryForecastByIds(
    lineItemIds: number[],
    forecastOptions: DeliveryForecastOptions,
  ): Promise<DeliveryForecast>;
  /**
   * Returns forecasted and historical traffic data for the segment of traffic specified by the provided request.
   *
   * Calling this endpoint programmatically is only available for Ad Manager 360 networks.
   *
   * @param trafficDataRequest the request specifying the segment of traffic for which data should be returned
   * @returns a dto containing forecasted and historical traffic data for the specified segment of traffic
   */
  getTrafficData(
    trafficDataRequest: TrafficDataRequest,
  ): Promise<TrafficDataResponse>;
}
