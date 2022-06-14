import { DateTime, PageResult } from '../../../common/types';
import {
  AllowedFormats,
  CompanionDeliveryOption,
  ComputedStatus,
  DeliveryRateType,
  EnvironmentType,
  LineItemType,
  ProgrammaticCreativeSource,
  RoadblockingType,
  SkippableAdType,
} from '../../common/enums';
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
  Targeting,
  ThirdPartyMeasurementSettings,
} from '../../common/types';
import { NegotiationRole, RateType, ReservationStatus } from './proposalLineItem.enum';

/**
 * Marketplace info for ProposalLineItem with a corresponding deal in Marketplace.
 */
export type ProposalLineItemMarketplaceInfo = {};

/**
 * Makegood info for a ProposalLineItemDto.
 */
export type ProposalLineItemMakegoodInfo = {
  /**
   * The ID of the original proposal line item on which this makegood is based. This attribute is read-only.
   */
  originalProposalLineItemId: number;
  /**
   * The publisher-provided reason why this makegood was initiated. This is free form text. The following predefined values can be used to render predefined options in the UI.
   * UNDERDELIVERY: 'Impression underdelivery', SECONDARY_DELIVERY_TERMS: 'Did not meet secondary delivery terms ', PERFORMANCE: 'Performance issues',
   */
  reason: string;
};

/**
 * A ProposalLineItem is added to a programmatic {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal}
 * and is similar to a delivery {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem}.
 * It contains delivery details including information like impression goal or quantity, start and end times, and targeting.
 */
export type ProposalLineItem = {
  /**
   * The unique ID of the ProposalLineItem. This attribute is read-only.
   */
  idproposals: number;
  /**
   * The unique ID of the Proposal, to which the ProposalLineItem belongs. This attribute is required for creation and then is readonly.
   *
   * This attribute is required.
   */
  proposalIdproposals: number;
  /**
   * The name of the ProposalLineItem which should be unique under the same Proposal. This attribute has a maximum length of 255 characters. This attribute can be configured as editable after the proposal has been submitted. Please check with your network administrator for editable fields configuration.
   *
   * This attribute is required.
   */
  nameproposals: string;
  /**
   * The date and time at which the line item associated with the ProposalLineItem is enabled to begin serving. This attribute is optional during creation, but required and must be in the future when it turns into a line item. The DateTime.timeZoneID is required if start date time is not null. This attribute becomes readonly once the ProposalLineItem has started delivering.
   */
  startDateTime: DateTime;
  /**
   * The date and time at which the line item associated with the ProposalLineItem stops beening served. This attribute is optional during creation, but required and must be after the startDateTime. The DateTime.timeZoneID is required if end date time is not null.
   */
  endDateTime: DateTime;
  /**
   * The time zone ID in tz database format (e.g. "America/Los_Angeles") for this ProposalLineItem. The number of serving days is calculated in this time zone. So if rateType is RateType.CPD, it will affect the cost calculation. The startDateTime and endDateTime will be returned in this time zone. This attribute is optional and defaults to the network's time zone. This attribute is read-only.
   */
  timeZoneIdproposals: string;
  /**
   * Provides any additional notes that may annotate the ProposalLineItem. This attribute is optional and has a maximum length of 65,535 characters. This attribute can be configured as editable after the proposal has been submitted. Please check with your network administrator for editable fields configuration.
   */
  internalNotesproposals: string;
  /**
   * The archival status of the ProposalLineItem. This attribute is read-only.
   */
  isArchivedproposals: boolean;
  /**
   * The goal(i.e. contracted quantity, quantity or limit) that this ProposalLineItem is associated with, which is used in its pacing and budgeting.
   * Goal.units must be greater than 0 when the proposal line item turns into a line item, Goal.goalType and Goal.unitType are readonly.
   * For a Preferred deal ProposalLineItem, the goal type can only be GoalType.NONE.
   *
   * This attribute is required.
   */
  goal: Goal;
  /**
   * The contracted number of impressions or clicks. If this is a LineItemType.SPONSORSHIP ProposalLineItem, has RateType.CPD as a rate type, and isProgrammatic is false,
   * then this represents the lifetime minimum impression. If this is a LineItemType.SPONSORSHIP ProposalLineItem, has RateType.CPD as a rate type, and isProgrammatic is true,
   * then this represents the daily minimum impression.
   *
   * This attribute is required for percentage-based-goal proposal line items. It does not impact ad-serving and is for reporting purposes only.
   */
  contractedUnitsBoughtproposals: number;
  /**
   * The strategy for delivering ads over the course of the ProposalLineItem's duration. This attribute is optional and default value is DeliveryRateType.EVENLY.
   * For a Preferred deal ProposalLineItem, the value can only be DeliveryRateType.FRONTLOADED.
   */
  deliveryRateType: DeliveryRateType;
  /**
   * The strategy for serving roadblocked creatives, i.e. instances where multiple creatives must be served together on a single web page.
   * This attribute is optional during creation and defaults to the product's roadblocking type, or RoadblockingType.ONE_OR_MORE if not specified by the product.
   */
  roadblockingType: RoadblockingType;
  /**
   * The delivery option for companions. This is only valid if the roadblocking type is RoadblockingType.CREATIVE_SET.
   * The default value for roadblocking creatives is CompanionDeliveryOption.OPTIONAL. The default value in other cases is CompanionDeliveryOption.UNKNOWN.
   * Providing something other than CompanionDeliveryOption.UNKNOWN will cause an error.
   */
  companionDeliveryOption: CompanionDeliveryOption;
  /**
   * The max duration of a video creative associated with this ProposalLineItem in milliseconds. This attribute is optional,
   * defaults to the Product.videoMaxDuration on the Product it was created with, and only meaningful if this is a video proposal line item.
   */
  videoMaxDuration: number;

  /**
   * The proposal line item's creatives' skippability. This attribute is optional, only applicable for video proposal line items, and defaults to SkippableAdType.NOT_SKIPPABLE.
   */
  videoCreativeSkippableAdType: SkippableAdType;
  /**
   * The set of frequency capping units for this ProposalLineItem.
   * This attribute is optional during creation and defaults to the product's frequency caps if Product.allowFrequencyCapsCustomization is false.
   */
  frequencyCaps: FrequencyCap[];

  /**
   * The unique ID of corresponding LineItem. This will be null if the Proposal has not been pushed to Ad Manager. This attribute is read-only.
   */
  dfpLineItemId: number;

  /**
   * The corresponding LineItemType of the ProposalLineItem. For a programmatic ProposalLineItem, the value can only be one of:
   *
   * - LineItemType.SPONSORSHIP
   * - LineItemType.STANDARD
   * - LineItemType.PREFERRED_DEAL
   */
  lineItemType: LineItemType;
  /**
   * The priority for the corresponding LineItem of the ProposalLineItem. This attribute is optional during creation and defaults to the product's priority, or a default value assigned by Google. See LineItem.priority for more information.
   */
  lineItemPriority: number;

  /**
   * The method used for billing the ProposalLineItem. This attribute is read-only.
   */
  rateType: RateType;
  /**
   * Details about the creatives that are expected to serve through the ProposalLineItem. This attribute is optional during creation and defaults to the product's creative placeholders.
   *
   * This attribute is required.
   */
  creativePlaceholders: CreativePlaceholder[];

  /**
   * Contains the targeting criteria for the ProposalLineItem. This attribute is optional during creation and defaults to the product's targeting.
   */
  targeting: Targeting;
  /**
   * The values of the custom fields associated with the ProposalLineItem. This attribute is optional.
   * This attribute can be configured as editable after the proposal has been submitted. Please check with your network administrator for editable fields configuration.
   */
  customFieldValues: BaseCustomFieldValue[];
  /**
   * The set of labels applied directly to the ProposalLineItem. This attribute is optional.
   */
  appliedLabels: AppliedLabel[];
  /**
   * Contains the set of labels applied directly to the proposal as well as those inherited ones. If a label has been negated, only the negated label is returned. This attribute is read-only.
   *
   * disableSameAdvertiserCompetitiveExclusion:boolean
   *
   * If a line item has a series of competitive exclusions on it, it could be blocked from serving with line items from the same advertiser. Setting this to true will allow line items from the same advertiser to serve regardless of the other competitive exclusion labels being applied.
   *
   * This attribute is optional and defaults to false.
   */
  effectiveAppliedLabels: AppliedLabel[];
  /**
   * Indicates whether this ProposalLineItem has been sold. This attribute is read-only.
   */
  isSold: boolean;
  /**
   * The amount of money to spend per impression or click in proposal currency. It supports precision of 4 decimal places in terms of the fundamental currency unit, so the Money.getAmountInMicros must be multiples of 100. It doesn't include agency commission.
   *
   * For example, if Proposal.currencyCode is 'USD', then $123.4567 could be represented as 123456700, but further precision is not supported.
   *
   * When using sales management, at least one of the four fields ProposalLineItem.netRate, ProposalLineItem.grossRate, ProposalLineItem.netCost and ProposalLineItem.grossCost is required.
   *
   * When not using sales management, at least one of the two fields ProposalLineItem.netRate and ProposalLineItem.netCost is required.
   */
  netRate: Money;
  /**
   * The cost of the ProposalLineItem in proposal currency. It supports precision of 2 decimal places in terms of the fundamental currency unit, so the Money.getAmountInMicros must be multiples of 10000. It doesn't include agency commission.
   *
   * For example, if Proposal.currencyCode is 'USD', then $123.45 could be represented as 123450000, but further precision is not supported.
   *
   * When using sales management, at least one of the four fields ProposalLineItem.netRate, ProposalLineItem.grossRate, ProposalLineItem.netCost and ProposalLineItem.grossCost is required.
   *
   * When not using sales management, at least one of the two fields ProposalLineItem.netRate and ProposalLineItem.netCost is required.
   */
  netCost: Money;
  /**
   * Indicates how well the line item generated from this proposal line item has been performing. This will be null if the delivery indicator information is not available due to one of the following reasons:
   *
   * - The proposal line item has not pushed to Ad Manager.
   * - The line item is not delivering.
   * - The line item has an unlimited goal or cap.
   * - The line item has a percentage based goal or cap.
   *
   * This attribute is read-only.
   */
  deliveryIndicator: DeliveryIndicator;
  /**
   * Delivery data provides the number of clicks or impressions delivered for the LineItem generated from this proposal line item in the last 7 days. This will be null if the delivery data cannot be computed due to one of the following reasons:
   *
   * - The proposal line item has not pushed to Ad Manager.
   * - The line item is not deliverable.
   * - The line item has completed delivering more than 7 days ago.
   * - The line item has an absolute-based goal. ProposalLineItem.deliveryIndicator should be used to track its progress in this case.
   *
   * This attribute is read-only.
   */
  deliveryData: DeliveryData;
  /**
   * The status of the LineItem generated from this proposal line item. This will be null if the proposal line item has not pushed to Ad Manager. This attribute is read-only.
   */
  computedStatus: ComputedStatus;
  /**
   * The date and time this ProposalLineItem was last modified.
   *
   * This attribute is assigned by Google when a ProposalLineItem is updated. This attribute is read-only.
   */
  lastModifiedDateTime: DateTime;
  /**
   * The reservation status of the ProposalLineItem. This attribute is read-only.
   */
  reservationStatus: ReservationStatus;
  /**
   * The last DateTime when the ProposalLineItem reserved inventory. This attribute is read-only.
   */
  lastReservationDateTime: DateTime;
  /**
   * The environment that the ProposalLineItem is targeting. The default value is EnvironmentType.BROWSER. If this value is EnvironmentType.VIDEO_PLAYER, then this ProposalLineItem can only target ad units that have sizes whose AdUnitSize.environmentType is also EnvironmentType.VIDEO_PLAYER.
   *
   * This field can only be changed if the linkStatus is LinkStatus.UNLINKED. Otherwise its value is read-only and set to Product.environmentType of the product this proposal line item was created from.
   */
  environmentType: EnvironmentType;
  /**
   * The set of AllowedFormats that this proposal line item can have. If the set is empty, this proposal line item allows all formats.
   */
  allowedFormats: AllowedFormats[];
  /**
   * Whether or not the Proposal for this ProposalLineItem is a programmatic deal. This attribute is populated from Proposal.isProgrammatic. This attribute is read-only.
   */
  isProgrammatic: boolean;

  /**
   * The marketplace info if this proposal line item is programmatic, null otherwise.
   */
  marketplaceInfo: ProposalLineItemMarketplaceInfo;

  /**
   * Additional terms shown to the buyer in Marketplace.
   */
  additionalTerms: string;

  /**
   * Indicates the ProgrammaticCreativeSource of the programmatic line item.
   */
  programmaticCreativeSource: ProgrammaticCreativeSource;
  /**
   * Contains the information for a proposal line item which has a target GRP demographic.
   */
  grpSettings: GrpSettings;

  /**
   * The estimated minimum impressions that should be delivered for a proposal line item.
   */
  estimatedMinimumImpressions: number;

  /**
   * Contains third party measurement settings for cross-sell Partners
   */
  thirdPartyMeasurementSettings: ThirdPartyMeasurementSettings;
  /**
   * Makegood info for this proposal line item. Immutable once created.
   *
   * Null if this proposal line item is not a makegood.
   */
  makegoodInfo: ProposalLineItemMakegoodInfo;
  /**
   * Whether this proposal line item has an associated makegood. This attribute is read-only.
   */
  hasMakegood: boolean;
  /**
   * Whether a new makegood associated with this line item can be created. This attribute is read-only.
   */
  canCreateMakegood: boolean;
  /**
   * The NegotiationRole that paused the proposal line item, i.e. NegotiationRole.seller or NegotiationRole.buyer, or null when the proposal is not paused. This attribute is read-only.
   */
  pauseRole: NegotiationRole;
  /**
   * The reason for pausing the ProposalLineItem, provided by the pauseRole. It is null when the ProposalLineItem is not paused. This attribute is read-only.
   */
  pauseReason: string;
};

/**
 * Represents the actions that can be performed on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} objects.
 */
export type ProposalLineItemAction =
  | 'ArchiveProposalLineItems'
  | 'PauseProposalLineItems'
  | 'ReleaseProposalLineItems'
  | 'ReserveProposalLineItems'
  | 'ResumeProposalLineItems'
  | 'UnarchiveProposalLineItems';

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} objects.
 */
export type ProposalLineItemPage = PageResult<ProposalLineItem>;
