import { DateTime, PageResult } from '../../../common/types';
import { Targeting } from '../../common/types';
import { StartDateTimeType } from '../../../common/enums';
import {
  AdRuleSlotBehavior,
  AdRuleSlotBumper,
  AdRuleStatus,
  AdSpotFillType,
  FrequencyCapBehavior,
  MidrollFrequencyType,
} from './adRule.enum';

/**
 * Simple object representing an ad slot within an AdRule. Ad rule slots contain information about the types/number of ads to display, as well as additional information on how the ad server will generate playlists.
 */
export type BaseAdRuleSlot =
  | NoPoddingAdRuleSlot
  | OptimizedPoddingAdRuleSlot
  | StandardPoddingAdRuleSlot
  | UnknownAdRuleSlot;

/**
 * An ad rule slot with no podding. It is defined by a BaseAdRuleSlot.maxVideoAdDuration.
 */
export type NoPoddingAdRuleSlot = {
  /**
   * The AdRuleSlotBehavior for video ads for this slot. This attribute is optional and defaults to AdRuleSlotBehavior.DEFER.
   *
   * Indicates whether video ads are allowed for this slot, or if the decision is deferred to a lower-priority ad rule.
   */
  slotBehavior: AdRuleSlotBehavior;

  /**
   * The maximum duration in milliseconds of video ads within this slot. This attribute is optional and defaults to 0.
   */
  maxVideoAdDuration: number;

  /**
   * The frequency type for video ads in this ad rule slot. This attribute is required for mid-rolls, but if this is not a mid-roll, the value is set to MidrollFrequencyType.NONE.
   */
  videoMidrollFrequencyType: MidrollFrequencyType;

  /**
   * The mid-roll frequency of this ad rule slot for video ads. This attribute is required for mid-rolls, but if MidrollFrequencyType is set to MidrollFrequencyType.NONE, this value should be ignored. For example, if this slot has a frequency type of MidrollFrequencyType.EVERY_N_SECONDS and #videoMidrollFrequency = "60", this would mean " play a mid-roll every 60 seconds."
   */
  videoMidrollFrequency: string;

  /**
   * The AdRuleSlotBumper for this slot. This attribute is optional and defaults to AdRuleSlotBumper.NONE.
   */
  bumper: AdRuleSlotBumper;

  /**
   * The maximum duration of bumper ads within this slot. This attribute is optional and defaults to 0.
   */
  maxBumperDuration: number;

  /**
   * The maximum pod duration in milliseconds for this slot. This attribute is optional and defaults to 0.
   */
  maxPodDuration: number;

  /**
   * The maximum number of ads allowed in a pod in this slot. This attribute is optional and defaults to 0.
   */
  maxAdsInPod: number;

  /**
   * ID of a BreakTemplate that defines what kinds of ads show at which positions within this slot. This field is optional and only supported on OptimizedPoddingAdRuleSlot entities.
   */
  breakTemplateId: number;
};

/**
 * Ad rule slot with optimized podding. Optimized pods are defined by a BaseAdRuleSlot.maxPodDuration and a BaseAdRuleSlot.maxAdsInPod, and the ad server chooses the best ads for the alloted duration.
 */
export type OptimizedPoddingAdRuleSlot = NoPoddingAdRuleSlot & {};

/**
 * An ad rule slot with standard podding. A standard pod is a series of video ads played back to back. Standard pods are defined by a BaseAdRuleSlot.maxAdsInPod and a BaseAdRuleSlot.maxVideoAdDuration.
 */
export type StandardPoddingAdRuleSlot = NoPoddingAdRuleSlot & {};

/**
 * The BaseAdRuleSlot subtype returned if the actual type is not exposed by the requested API version.
 */
export type UnknownAdRuleSlot = NoPoddingAdRuleSlot & {};

/**
 * An AdRule contains data that the ad server will use to generate a playlist of video ads.
 */
export type AdRule = {
  /**
   * The unique ID of the AdRule. This value is readonly and is assigned by Google.
   */
  id?: number;

  /**
   * The unique name of the AdRule. This attribute is required to create an ad rule and has a maximum length of 255 characters.
   */
  name: string;

  /**
   * The priority of the AdRule. This attribute is required and can range from 1 to 1000, with 1 being the highest possible priority.
   *
   * Changing an ad rule's priority can affect the priorities of other ad rules. For example, increasing an ad rule's priority from 5 to 1 will shift the ad rules that were previously in priority positions 1 through 4 down one.
   */
  priority: number;

  /**
   * The targeting criteria of the AdRule. This attribute is required.
   */
  targeting: Targeting;

  /**
   * This AdRule object's start date and time. This attribute is required and must be a date in the future for new ad rules.
   */
  startDateTime: DateTime;

  /**
   * Specifies whether to start using the AdRule right away, in an hour, etc. This attribute is optional and defaults to StartDateTimeType.USE_START_DATE_TIME.
   */
  startDateTimeType: StartDateTimeType;

  /**
   * This AdRule object's end date and time. This attribute is required unless unlimitedEndDateTime is set to true. If specified, it must be after the startDateTime.
   */
  endDateTime: DateTime;

  /**
   * Specifies whether the AdRule has an end time. This attribute is optional and defaults to false.
   */
  unlimitedEndDateTime: boolean;

  /**
   * The AdRuleStatus of the ad rule. This attribute is read-only and defaults to AdRuleStatus.INACTIVE.
   */
  status: AdRuleStatus;

  /**
   * The FrequencyCapBehavior of the AdRule. This attribute is optional and defaults to FrequencyCapBehavior.DEFER.
   */
  frequencyCapBehavior: FrequencyCapBehavior;

  /**
   * This AdRule object's frequency cap for the maximum impressions per stream. This attribute is optional and defaults to 0.
   */
  maxImpressionsPerLineItemPerStream: number;

  /**
   * This AdRule object's frequency cap for the maximum impressions per pod. This attribute is optional and defaults to 0.
   */
  maxImpressionsPerLineItemPerPod: number;

  /**
   * This AdRule object's pre-roll slot. This attribute is required.
   */
  preroll: BaseAdRuleSlot;

  /**
   * This AdRule object's mid-roll slot. This attribute is required.
   */
  midroll: BaseAdRuleSlot;

  /**
   * This AdRule object's post-roll slot. This attribute is required.
   */
  postroll: BaseAdRuleSlot;
};

/**
 * A building block of a pod template.
 */
export type BreakTemplateMember = {
  /**
   * The ID of the AdSpot that has the settings about what kinds of ads can appear in this position of the BreakTemplate.
   */
  adSpotId?: number;

  /**
   * The behavior for how the AdSpot should be filled in the context of the BreakTemplate.
   */
  adSpotFillType: AdSpotFillType;
};

/**
 * A BreakTemplate defines what kinds of ads show at which positions within a pod.
 *
 * Break templates are made up of AdSpot objects. A break template must have a single ad spot that has AdSpot#flexible set to true.
 */
export type BreakTemplate = {
  /**
   * The unique ID of the BreakTemplate. This value is readonly and is assigned by Google.
   */
  id?: number;

  /**
   * Whether this is custom template. Custom templates get created outside of the ad rule workflow and can be referenced in ad tags.
   *
   * Only custom templates can have names and display names.
   */
  customTemplate: boolean;

  /**
   * Name of the BreakTemplate. The name is case insenstive and can be referenced in ad tags. This value is required if customTemplate is true, and cannot be set otherwise.
   *
   * You can use alphanumeric characters and symbols other than the following: ", ', =, !, +, #, *, ~, ;, ^, (, ), <, >, [, ], the white space character.
   */
  name: string;

  /**
   * Descriptive name for the BreakTemplateDto. This value is optional if customTemplate is true, and cannot be set otherwise.
   */
  displayName?: string;

  /**
   * The list of the BreakTemplateMember objects in the order in which they should appear in the ad pod. Each BreakTemplateMember has a reference to a AdSpot, which defines what kinds of ads can appear at that position, as well as other metadata that defines how each ad spot should be filled.
   */
  breakTemplateMembers: BreakTemplateMember[];
};

/**
 * Represents the actions that can be performed on AdRule objects.
 */
export type AdRuleAction =
  | 'ActivateAdRules'
  | 'DeactivateAdRules'
  | 'DeleteAdRules';

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/AdRuleService.AdRule AdRule} objects.
 */
export type AdRulePage = PageResult<AdRule>;

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/AdRuleService.BreakTemplate BreakTemplate} objects.
 */
export type BreakTemplatePage = PageResult<BreakTemplate>;
