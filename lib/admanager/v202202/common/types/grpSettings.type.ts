import {
  GrpProvider,
  GrpTargetGender,
  NielsenCtvPacingType,
  PacingDeviceCategorizationType,
} from '../enums';

/**
 * GrpSettings contains information for a line item that will have a target demographic when serving.
 * This information will be used to set up tracking and enable reporting on the demographic information.
 */
export type GrpSettings = {
  /**
   * Specifies the minimum target age (in years) of the LineItem. This field is only applicable if provider is not null.
   */
  minTargetAge: number;
  /**
   * Specifies the maximum target age (in years) of the LineItem. This field is only applicable if provider is not null.
   */
  maxTargetAge: number;
  /**
   * Specifies the target gender of the LineItem. This field is only applicable if provider is not null.
   */
  targetGender: GrpTargetGender;
  /**
   * Specifies the GRP provider of the LineItem.
   */
  provider: GrpProvider;
  /**
   * Specifies the impression goal for the given target demographic. This field is only applicable if provider is not null and demographics-based goal is selected by the user. If this field is set, LineItem.primaryGoal will have its Goal.units value set by Google to represent the estimated total quantity.
   */
  targetImpressionGoal: number;
  /**
   * Estimate for the in-target ratio given the line item's audience targeting. This field is only applicable if provider is Nielsen, LineItem.primaryGoal is in-target impressions, and LineItem.CostType is in-target CPM. This field determines the in-target ratio to use for pacing Nielsen line items before Nielsen reporting data is available. Represented as a milli percent, so 55.7% becomes 55700.
   */
  inTargetRatioEstimateMilliPercent: number;

  /**
   * Specifies which pacing computation to apply in pacing to impressions from connected devices. This field is required if enableNielsenCoViewingSupport is true.
   */
  nielsenCtvPacingType: NielsenCtvPacingType;
  /**
   * Specifies whether to use Google or Nielsen device breakdown in Nielsen Line Item auto pacing.
   */
  pacingDeviceCategorizationType: PacingDeviceCategorizationType;
  applyTrueCoview: boolean;
};
