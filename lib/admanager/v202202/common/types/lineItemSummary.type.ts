import { StartDateTimeType } from '@common/enums';
import { DateTime } from '@common/types';
import {
  AppliedLabel,
  BaseCustomFieldValue,
  CreativePlaceholder,
  DeliveryData,
  DeliveryIndicator,
  FrequencyCap,
  Goal,
  GrpSettings,
  Money,
  Stats,
  ThirdPartyMeasurementSettings,
} from '.';
import {
  AllowedFormats,
  ChildContentEligibility,
  CompanionDeliveryOption,
  CompetitiveConstraintScope,
  ComputedStatus,
  CostType,
  CreativeRotationType,
  CustomPacingGoalUnit,
  DeliveryForecastSource,
  DeliveryRateType,
  EnvironmentType,
  LineItemDiscountType,
  LineItemSummaryReservationStatus,
  LineItemType,
  ProgrammaticCreativeSource,
  RoadblockingType,
  SkippableAdType,
} from '../enums';

/**
 * An interval of a {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.CustomPacingCurve CustomPacingCurve}.
 * A custom pacing goal contains a start time and an amount.
 * The goal will apply until either the next custom pacing goal's getStartTime or the line item's end time if it is the last goal.
 */
export type CustomPacingGoal = {
  /**
   * The start date and time of the goal. This field is required unless useLineItemStartDateTime is true.
   */
  startDateTime: DateTime;

  /**
   * Whether the LineItem.startDateTime should be used for the start date and time of this goal. This field is not persisted and if it is set to true, the startDateTime field will be populated by the line item's start time.
   */
  useLineItemStartDateTime: boolean;

  amount: number;
};

/**
 * A LineItemActivityAssociation associates a {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem}
 * with an {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity Activity} so that the conversions of the
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity Activity} can be counted against the
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem}.
 */
export type LineItemActivityAssociation = {
  /**
   * The ID of the Activity to which the LineItem should be associated. This attribute is required.
   */
  activityId: number;

  /**
   * The amount of money to attribute per click through conversion. This attribute is required for creating a LineItemActivityAssociation. The currency code is readonly and should match the LineItem.
   */
  clickThroughConversionCost: Money;

  /**
   * The amount of money to attribute per view through conversion. This attribute is required for creating a LineItemActivityAssociation. The currency code is readonly and should match the LineItem.
   */
  viewThroughConversionCost: Money;
};

/**
 * A curve consisting of {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.CustomPacingGoal CustomPacingGoal} objects that is used to pace line item delivery.
 */
export type CustomPacingCurve = {
  /**
   *  The unit of the CustomPacingGoalDto.amount values.
   */
  customPacingGoalUnit: CustomPacingGoalUnit;
  /**
   * The list of goals that make up the custom pacing curve.
   */
  customPacingGoals: CustomPacingGoal[];
};

/**
 * Data transfer object for the exchange deal info of a line item.
 */
export type LineItemDealInfoDto = {
  /**
   * The external deal ID shared between seller and buyer. This field is only present if the deal has been finalized. This attribute is read-only and is assigned by Google.
   */
  externalDealId: number;
};

/**
 * The LineItemSummary represents the base class from which a LineItem is derived.
 */
export type LineItemSummary = {
  /**
   * The ID of the Order to which the LineItem belongs. This attribute is required.
   */
  orderId: number;

  /**
   * Uniquely identifies the LineItem. This attribute is read-only and is assigned by Google when a line item is created.
   */
  id: number;

  /**
   * The name of the line item. This attribute is required and has a maximum length of 255 characters.
   */
  name: string;

  /**
   * An identifier for the LineItem that is meaningful to the publisher. This attribute is optional and has a maximum length of 255 characters.
   */
  externalId: string;

  /**
   * The name of the Order. This value is read-only.
   */
  orderName: string;

  /**
   * The date and time on which the LineItem is enabled to begin serving. This attribute is required and must be in the future.
   */
  startDateTime: DateTime;

  /**
   * Specifies whether to start serving to the LineItem right away, in an hour, etc. This attribute is optional and defaults to StartDateTimeType.USE_START_DATE_TIME.
   */
  startDateTimeType: StartDateTimeType;
  /**
   * The date and time on which the LineItem will stop serving. This attribute is required unless LineItem.unlimitedEndDateTime is set to true.
   * If specified, it must be after the LineItem.startDateTime. This end date and time does not include auto extension days.
   */
  endDateTime: DateTime;

  /**
   * The number of days to allow a line item to deliver past its endDateTime. A maximum of 7 days is allowed. This is feature is only available for Ad Manager 360 accounts.
   */
  autoExtensionDays: number;

  /**
   * Specifies whether or not the LineItem has an end time. This attribute is optional and defaults to false.
   * It can be be set to true for only line items of type LineItemType.SPONSORSHIP, LineItemType.NETWORK, LineItemType.PRICE_PRIORITY and LineItemType.HOUSE.
   */
  unlimitedEndDateTime: boolean;

  /**
   * The strategy used for displaying multiple Creative objects that are associated with the LineItem. This attribute is required.
   */
  creativeRotationType: CreativeRotationType;
  /**
   * The strategy for delivering ads over the course of the line item's duration.
   * This attribute is optional and defaults to DeliveryRateType.EVENLY or DeliveryRateType.FRONTLOADED depending on the network's configuration.
   */
  deliveryRateType: DeliveryRateType;
  /**
   * Strategy for choosing forecasted traffic shapes to pace line items. This field is optional and defaults to DeliveryForecastSource.HISTORICAL.
   */
  deliveryForecastSource: DeliveryForecastSource;
  /**
   * The curve that is used to pace the line item's delivery. This field is required if and only if the delivery forecast source is DeliveryForecastSource.CUSTOM_PACING_CURVE.
   */
  customPacingCurve: CustomPacingCurve;

  /**
   * The strategy for serving roadblocked creatives, i.e. instances where multiple creatives must be served together on a single web page. This attribute is optional and defaults to RoadblockingType.ONE_OR_MORE.
   */
  roadblockingType: RoadblockingType;
  /**
   * The nature of the line item's creatives' skippability. This attribute is optional,
   * only applicable for video line items, and defaults to SkippableAdType.NOT_SKIPPABLE.
   */
  skippableAdType: SkippableAdType;
  /**
   * The set of frequency capping units for this LineItem. This attribute is optional.
   */
  frequencyCaps: FrequencyCap[];

  /**
   * Indicates the line item type of a LineItem. This attribute is required. The line item type determines the default priority of the line item. More information can be found on the Ad Manager Help Center.
   */
  lineItemType: LineItemType;
  /**
   * The priority for the line item. Valid values range from 1 to 16. This field is optional and defaults to the default priority of the
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItemType LineItemType}.
   */
  priority: number;
  /**
   * The amount of money to spend per impression or click. This attribute is required for creating a LineItem.
   */
  costPerUnit: Money;

  /**
   * An amount to help the adserver rank inventory. LineItem.valueCostPerUnit artificially raises the value of inventory over the LineItem.costPerUnit but avoids raising the actual LineItem.costPerUnit. This attribute is optional and defaults to a Money object in the local currency with Money.microAmount 0.
   */
  valueCostPerUnit: Money;

  /**
   * The method used for billing this LineItem. This attribute is required.
   */
  costType: CostType;
  /**
   * The type of discount being applied to a LineItem, either percentage based or absolute. This attribute is optional and defaults to LineItemDiscountType.PERCENTAGE.
   */
  discountType: LineItemDiscountType;
  /**
   * The number here is either a percentage or an absolute value depending on the LineItemDiscountType. If the LineItemDiscountType is LineItemDiscountType.PERCENTAGE, then only non-fractional values are supported.
   */
  discount: number;
  /**
   * This attribute is only applicable for certain line item types and acts as an "FYI" or note, which does not impact adserving or other backend systems.
   *
   * For LineItemType.SPONSORSHIP line items, this represents the minimum quantity, which is a lifetime impression volume goal for reporting purposes only.
   *
   * For LineItemType.STANDARD line items, this represent the contracted quantity, which is the number of units specified in the contract the advertiser has bought for this LineItem. This field is just a "FYI" for traffickers to manually intervene with the LineItem when needed. This attribute is only available for LineItemType.STANDARD line items if you have this feature enabled on your network.
   */
  contractedUnitsBought: number;
  /**
   * Details about the creatives that are expected to serve through this LineItem. This attribute is required and replaces the creativeSizes attribute.
   */
  creativePlaceholders: CreativePlaceholder[];
  /**
   * This attribute is required and meaningful only if the LineItem.costType is CostType.CPA.
   */
  activityAssociations: LineItemActivityAssociation[];
  /**
   * The environment that the LineItem is targeting. The default value is EnvironmentType.BROWSER. If this value is EnvironmentType.VIDEO_PLAYER, then this line item can only target AdUnits that have AdUnitSizes whose environmentType is also VIDEO_PLAYER.
   */
  environmentType: EnvironmentType;
  /**
   * The set of allowedFormats that this programmatic line item can have. If the set is empty, this line item allows all formats.
   */
  allowedFormats: AllowedFormats[];

  /**
   * The delivery option for companions. Setting this field is only meaningful if the following conditions are met:
   *
   * - The Guaranteed roadblocks feature is enabled on your network.
   * - One of the following is true (both cannot be true, these are mutually exclusive).
   *   - The environmentType is EnvironmentType.VIDEO_PLAYER.
   *   - The roadblockingType is RoadblockingType.CREATIVE_SET.
   *
   * This field is optional and defaults to CompanionDeliveryOption.OPTIONAL if the above conditions are met.
   * In all other cases it defaults to CompanionDeliveryOption.UNKNOWN and is not meaningful.
   */
  companionDeliveryOption: CompanionDeliveryOption;

  /**
   * The flag indicates whether overbooking should be allowed when creating or updating reservations of line item types LineItemType.SPONSORSHIP and LineItemType.STANDARD. When true, operations on this line item will never trigger a ForecastError, which corresponds to an overbook warning in the UI. The default value is false.
   *
   * Note: this field will not persist on the line item itself, and the value will only affect the current request.
   */
  allowOverbook: boolean;

  /**
   * The flag indicates whether the inventory check should be skipped when creating or updating a line item. The default value is false.
   *
   * Note: this field will not persist on the line item itself, and the value will only affect the current request.
   */
  skipInventoryCheck: boolean;

  /**
   * True to skip checks for warnings from rules applied to line items targeting inventory shared by a distributor partner for cross selling when performing
   * an action on this line item. The default is false.
   */
  skipCrossSellingRuleWarningChecks: boolean;

  /**
   * The flag indicates whether inventory should be reserved when creating a line item of types LineItemType.SPONSORSHIP and LineItemType.STANDARD in an unapproved Order.
   * The default value is false.
   */
  reserveAtCreation: boolean;

  /**
   * Contains trafficking statistics for the line item. This attribute is readonly and is populated by Google.
   * This will be null in case there are no statistics for a line item yet.
   */
  stats: Stats;

  /**
   * Indicates how well the line item has been performing. This attribute is readonly and is populated by Google. This will be null if the delivery indicator information is not available due to one of the following reasons:
   *
   * - The line item is not delivering.
   * - The line item has an unlimited goal or cap.
   * - The line item has a percentage based goal or cap.
   */
  deliveryIndicator: DeliveryIndicator;

  /**
   * Delivery data provides the number of clicks or impressions delivered for a LineItem in the last 7 days. This attribute is readonly and is populated by Google. This will be null if the delivery data cannot be computed due to one of the following reasons:
   *
   * - The line item is not deliverable.
   * - The line item has completed delivering more than 7 days ago.
   * - The line item has an absolute-based goal. LineItem.deliveryIndicator should be used to track its progress in this case.
   */
  deliveryData: DeliveryData;

  /**
   * The amount of money allocated to the LineItem. This attribute is readonly and is populated by Google. The currency code is readonly.
   */
  budget: Money;

  /**
   * The status of the LineItem. This attribute is readonly.
   */
  status: ComputedStatus;

  /**
   * Describes whether or not inventory has been reserved for the LineItem. This attribute is readonly and is assigned by Google.
   */
  reservationStatus: LineItemSummaryReservationStatus;

  /**
   * The archival status of the LineItem. This attribute is readonly.
   */
  isArchived: boolean;

  /**
   * The web property code used for dynamic allocation line items.
   * This web property is only required with line item types LineItemType.AD_EXCHANGE and LineItemType.ADSENSE.
   */
  webPropertyCode: string;

  /**
   * The set of labels applied directly to this line item.
   */
  appliedLabels: AppliedLabel[];

  /**
   * Contains the set of labels inherited from the order that contains this line item and the advertiser that owns the order.
   * If a label has been negated, only the negated label is returned. This field is readonly and is assigned by Google.
   */
  effectiveAppliedLabels: AppliedLabel[];

  /**
   * If a line item has a series of competitive exclusions on it, it could be blocked from serving with line items from the same advertiser.
   * Setting this to true will allow line items from the same advertiser to serve regardless of the other competitive exclusion labels being applied.
   */
  disableSameAdvertiserCompetitiveExclusion: boolean;

  /**
   * The application that last modified this line item. This attribute is read only and is assigned by Google.
   */
  lastModifiedByApp: string;

  /**
   * Provides any additional notes that may annotate the LineItem. This attribute is optional and has a maximum length of 65,535 characters.
   */
  notes: string;

  /**
   * The CompetitiveConstraintScope for the competitive exclusion labels assigned to this line item.
   * This field is optional, defaults to CompetitiveConstraintScope.POD, and only applies to video line items.
   */
  competitiveConstraintScope: CompetitiveConstraintScope;

  /**
   * The date and time this line item was last modified.
   */
  lastModifiedDateTime: DateTime;

  /**
   * This attribute may be null for line items created before this feature was introduced.
   */
  creationDateTime: DateTime;

  /**
   * The values of the custom fields associated with this line item.
   */
  customFieldValues: BaseCustomFieldValue[];

  /**
   * Indicates if a LineItem is missing any creatives for the creativePlaceholders specified.
   *
   * Creatives can be considered missing for several reasons including:
   *
   * - Not enough creatives of a certain size have been uploaded, as determined by CreativePlaceholder.expectedCreativeCount. For example a LineItem specifies 750x350, 400x200 but only a 750x350 was uploaded. Or LineItem specifies 750x350 with an expected count of 2, but only one was uploaded.
   *
   * - The Creative.appliedLabels of an associated Creative do not match the CreativePlaceholder.effectiveAppliedLabels of the LineItem. For example LineItem specifies 750x350 with a Foo AppliedLabel but a 750x350 creative without a AppliedLabel was uploaded.
   */
  isMissingCreatives: boolean;

  /**
   * Indicates the ProgrammaticCreativeSource of the programmatic line item. This is a read-only field. Any changes must be made on the ProposalLineItem.
   */
  programmaticCreativeSource: ProgrammaticCreativeSource;

  thirdPartyMeasurementSettings: ThirdPartyMeasurementSettings;
  /**
   * The max duration of a video creative associated with this LineItem in milliseconds.
   *
   * This attribute is only meaningful for video line items. For version v202011 and earlier, this attribute is optional and defaults to 0.
   * For version v202102 and later, this attribute is required for video line items and must be greater than 0.
   */
  videoMaxDuration: number;

  /**
   * The primary goal that this LineItem is associated with, which is used in its pacing and budgeting.
   */
  primaryGoal: Goal;

  /**
   * The secondary goals that this LineItem is associated with.
   * It is required and meaningful only if the LineItem.costType is CostType.CPA or if the LineItem.lineItemType is
   * LineItemType.SPONSORSHIP and LineItem.costType is CostType.CPM.
   */
  secondaryGoals: Goal[];

  /**
   * Contains the information for a line item which has a target GRP demographic.
   */
  grpSettings: GrpSettings;

  /**
   * The deal information associated with this line item, if it is programmatic.
   */
  dealInfo: LineItemDealInfoDto;

  /**
   * Optional IDs of the Company that provide ad verification for this line item. Company.Type.VIEWABILITY_PROVIDER.
   */
  viewabilityProviderCompanyIds: number[];

  /**
   * Child content eligibility designation for this line item.
   *
   * This field is optional and defaults to ChildContentEligibility.DISALLOWED.
   */
  childContentEligibility: ChildContentEligibility;

  /**
   * Custom XML to be rendered in a custom VAST response at serving time.
   */
  customVastExtension: string;
};
