/**
 * Represents the actions that can be performed on ForecastAdjustment objects.
 */
export abstract class ForecastAdjustmentAction {}

/**
 * The action used for activating ForecastAdjustment objects.
 */
export class ActivateForecastAdjustments implements ForecastAdjustmentAction {}

/**
 * DeactivateForecastAdjustments
 */
export class DeactivateForecastAdjustments implements ForecastAdjustmentAction {}
