/**
 * The declaration about third party data usage on the associated entity.
 */
export enum DeclarationType {
  /**
   * There are no companies associated. Functionally the same as DECLARED, combined with an empty company list.
   */
  NONE = 'NONE',
  /**
   * There is a set of RichMediaAdsCompanys associated with this entity.
   */
  DECLARED = 'DECLARED',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Status of the MCM child publisher's Ad Manager account with respect to delegated serving.
 * In order for the child network to be served ads for MCM, it must have accepted the invite from the parent network, and must have passed Google's policy compliance verifications.
 */
export enum AccountStatus {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * The child publisher has not acted on the invite from the parent.
   */
  INVITED = 'INVITED',
  /**
   * The child publisher has declined the invite.
   */
  DECLINED = 'DECLINED',
  /**
   * The child publisher has accepted the invite, and is awaiting Google's policy compliance verifications.
   */
  PENDING_GOOGLE_APPROVAL = 'PENDING_GOOGLE_APPROVAL',
  /**
   * The child publisher accepted the invite, and Google found it to be compliant with its policies, i.e. no policy violations were found, and the child publisher can be served ads.
   */
  APPROVED = 'APPROVED',
  /**
   * The child publisher accepted the invite, but was disapproved by Google for violating its policies.
   */
  CLOSED_POLICY_VIOLATION = 'CLOSED_POLICY_VIOLATION',
  /**
   * The child publisher accepted the invite, but was disapproved by Google for invalid activity.
   */
  CLOSED_INVALID_ACTIVITY = 'CLOSED_INVALID_ACTIVITY',
  /**
   * The child publisher has closed their own account.
   */
  CLOSED_BY_PUBLISHER = 'CLOSED_BY_PUBLISHER',
  /**
   * The child publisher accepted the invite, but was disapproved as ineligible by Google.
   */
  DISAPPROVED_INELIGIBLE = 'DISAPPROVED_INELIGIBLE',
  /**
   * The child publisher accepted the invite, but was disapproved by Google for being a duplicate of another account.
   */
  DISAPPROVED_DUPLICATE_ACCOUNT = 'DISAPPROVED_DUPLICATE_ACCOUNT',
  /**
   * The invite was sent to the child publisher more than 90 days ago, due to which it has been deactivated.
   */
  EXPIRED = 'EXPIRED',
  /**
   * Either the child publisher disconnected from the parent network, or the parent network withdrew the invite.
   */
  INACTIVE = 'INACTIVE',
  /**
   * The association between the parent and child publishers was deactivated by Google Ad Manager.
   */
  DEACTIVATED_BY_AD_MANAGER = 'DEACTIVATED_BY_AD_MANAGER',
}

/**
 * Pending onboarding tasks for the child publishers that must completed before Google's policy compliance is verified.
 */
export enum OnboardingTask {
  UNKNOWN = 'UNKNOWN',
  /**
   * Creation of the child publisher's payments billing profile.
   */
  BILLING_PROFILE_CREATION = 'BILLING_PROFILE_CREATION',
  /**
   * Verification of the child publisher's phone number.
   */
  PHONE_PIN_VERIFICATION = 'PHONE_PIN_VERIFICATION',
  /**
   * Setup of the child publisher's Ad Manager account.
   */
  AD_MANAGER_ACCOUNT_SETUP = 'AD_MANAGER_ACCOUNT_SETUP',
}

/**
 * Enum for the valid environments in which ads can be shown.
 */
export enum EnvironmentType {
  /**
   * A regular web browser.
   */
  BROWSER = 'BROWSER',
  /**
   * Video players.
   */
  VIDEO_PLAYER = 'VIDEO_PLAYER',
}

/**
 * Describes the roadblocking types.
 */
export enum RoadblockingType {
  /**
   * Only one creative from a line item can serve at a time.
   */
  ONLY_ONE = 'ONLY_ONE',
  /**
   * Any number of creatives from a line item can serve together at a time.
   */
  ONE_OR_MORE = 'ONE_OR_MORE',
  /**
   * As many creatives from a line item as can fit on a page will serve. This could mean anywhere from one to all of a line item's creatives given the size constraints of ad slots on a page.
   */
  AS_MANY_AS_POSSIBLE = 'AS_MANY_AS_POSSIBLE',
  /**
   * All or none of the creatives from a line item will serve. This option will only work if served to a GPT tag using SRA (single request architecture mode).
   */
  ALL_ROADBLOCK = 'ALL_ROADBLOCK',
  /**
   * A master/companion CreativeSet roadblocking type. A LineItem.creativePlaceholders must be set accordingly.
   */
  CREATIVE_SET = 'CREATIVE_SET',
}

/**
 * The different types of skippable ads.
 */
export enum SkippableAdType {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Skippable ad type is disabled.
   */
  DISABLED = 'DISABLED',
  /**
   * Skippable ad type is enabled.
   */
  ENABLED = 'ENABLED',
  /**
   * Skippable in-stream ad type.
   */
  INSTREAM_SELECT = 'INSTREAM_SELECT',
  /**
   * Any skippable or not skippable. This is only for programmatic case when the creative skippability is decided by the buyside.
   */
  ANY = 'ANY',
}

/**
 * LineItemType indicates the priority of a LineItem, determined by the way in which impressions are reserved to be served for it.
 */
export enum LineItemType {
  /**
   * 	The type of LineItem for which a percentage of all the impressions that are being sold are reserved.
   */
  SPONSORSHIP = 'SPONSORSHIP',

  /**
   * 	The type of LineItem for which a fixed quantity of impressions or clicks are reserved.
   */
  STANDARD = 'STANDARD',

  /**
   * 	The type of LineItem most commonly used to fill a site's unsold inventory if not contractually obligated to deliver a requested number of impressions. Users specify the daily percentage of unsold impressions or clicks when creating this line item.
   */
  NETWORK = 'NETWORK',

  /**
   * 	The type of LineItem for which a fixed quantity of impressions or clicks will be delivered at a priority lower than the LineItemType.STANDARD type.
   */
  BULK = 'BULK',

  /**
   * 	The type of LineItem most commonly used to fill a site's unsold inventory if not contractually obligated to deliver a requested number of impressions. Users specify the fixed quantity of unsold impressions or clicks when creating this line item.
   */
  PRICE_PRIORITY = 'PRICE_PRIORITY',

  /**
   * 	The type of LineItem typically used for ads that promote products and services chosen by the publisher. These usually do not generate revenue and have the lowest delivery priority.
   */
  HOUSE = 'HOUSE',

  /**
   * 	Represents a legacy LineItem that has been migrated from the DFP system. Such line items cannot be created any more. Also, these line items cannot be activated or resumed.
   */
  LEGACY_DFP = 'LEGACY_DFP',

  /**
   * 	The type of LineItem used for ads that track ads being served externally of Ad Manager, for example an email newsletter. The click through would reference this ad, and the click would be tracked via this ad.
   */
  CLICK_TRACKING = 'CLICK_TRACKING',

  /**
   * 	A LineItem using dynamic allocation backed by AdSense.
   */
  ADSENSE = 'ADSENSE',

  /**
   * 	A LineItem using dynamic allocation backed by the Google Ad Exchange.
   */
  AD_EXCHANGE = 'AD_EXCHANGE',

  /**
   * 	Represents a non-monetizable video LineItem that targets one or more bumper positions, which are short house video messages used by publishers to separate content from ad breaks.
   */
  BUMPER = 'BUMPER',

  /**
   * 	A LineItem using dynamic allocation backed by AdMob.
   */
  ADMOB = 'ADMOB',

  /**
   * 	The type of LineItem for which there are no impressions reserved, and will serve for a second price bid. All LineItems of type LineItemType.PREFERRED_DEAL should be created via a ProposalLineItem with a matching type. When creating a LineItem of type LineItemType.PREFERRED_DEAL, the ProposalLineItem.estimatedMinimumImpressions field is required.
   */
  PREFERRED_DEAL = 'PREFERRED_DEAL',

  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * The formats that a publisher allows on their programmatic
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} or
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.ProposalLineItem ProposalLineItem}.
 */
export enum AllowedFormats {
  /**
   * Audio format. This is only relevant for programmatic video line items.
   */
  AUDIO = 'AUDIO',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Describes the computed LineItem status that is derived from the current state of the line item.
 */
export enum ComputedStatus {
  /**
   * The LineItem has past its LineItem.endDateTime with an auto extension, but hasn't met its goal.
   */
  DELIVERY_EXTENDED = 'DELIVERY_EXTENDED',
  /**
   * The LineItem has begun serving.
   */
  DELIVERING = 'DELIVERING',
  /**
   * The LineItem has been activated and is ready to serve.
   */
  READY = 'READY',
  /**
   * The LineItem has been paused from serving.
   */
  PAUSED = 'PAUSED',
  /**
   * The LineItem is inactive. It is either caused by missing creatives or the network disabling auto-activation.
   */
  INACTIVE = 'INACTIVE',
  /**
   * The LineItem has been paused and its reserved inventory has been released. The LineItem will not serve.
   */
  PAUSED_INVENTORY_RELEASED = 'PAUSED_INVENTORY_RELEASED',
  /**
   * The LineItem has been submitted for approval.
   */
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  /**
   * The LineItem has completed its run.
   */
  COMPLETED = 'COMPLETED',
  /**
   * The LineItem has been disapproved and is not eligible to serve.
   */
  DISAPPROVED = 'DISAPPROVED',
  /**
   * The LineItem is still being drafted.
   */
  DRAFT = 'DRAFT',
  /**
   * The LineItem has been canceled and is no longer eligible to serve. This is a legacy status imported from Google Ad Manager orders.
   */
  CANCELED = 'CANCELED',
}

/**
 * Types of programmatic creative sources.
 */
export enum ProgrammaticCreativeSource {
  /**
   * Indicates that the programmatic line item is associated with creatives provided by the publisher.
   */
  PUBLISHER = 'PUBLISHER',
  /**
   * Indicates that the programmatic line item is associated with creatives provided by the advertiser.
   */
  ADVERTISER = 'ADVERTISER',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Specifies the type of the goal for a {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem}.
 */
export enum GoalType {
  /**
   * No goal is specified for the number of ads delivered. The LineItem.lineItemType must be one of:
   *
   * - LineItemType.PRICE_PRIORITY
   * - LineItemType.AD_EXCHANGE
   * - LineItemType.CLICK_TRACKING
   */
  NONE = 'NONE',
  /**
   * There is a goal on the number of ads delivered for this line item during its entire lifetime. The LineItem.lineItemType must be one of:
   *
   * - LineItemType.STANDARD
   * - LineItemType.BULK
   * - LineItemType.PRICE_PRIORITY
   * - LineItemType.ADSENSE
   * - LineItemType.AD_EXCHANGE
   * - LineItemType.ADMOB
   * - LineItemType.CLICK_TRACKING
   */
  LIFETIME = 'LIFETIME',
  /**
   * There is a daily goal on the number of ads delivered for this line item. The LineItem.lineItemType must be one of:
   *
   * - LineItemType.SPONSORSHIP
   * - LineItemType.NETWORK
   * - LineItemType.PRICE_PRIORITY
   * - LineItemType.HOUSE
   * - LineItemType.ADSENSE
   * - LineItemType.AD_EXCHANGE
   * - LineItemType.ADMOB
   * - LineItemType.BUMPER
   */
  DAILY = 'DAILY',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Indicates the type of unit used for defining a reservation.
 * The {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.CostType CostType} can differ from the
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.UnitType UnitType} - an ad can have an impression goal, but be billed by its click.
 * Usually {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.CostType CostType} and
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.UnitType UnitType} will refer to the same unit.
 */
export enum UnitType {
  /**
   * The number of impressions served by creatives associated with the line item. Line items of all LineItemType support this UnitType.
   */
  IMPRESSIONS = 'IMPRESSIONS',
  /**
   * The number of clicks reported by creatives associated with the line item. The LineItem.lineItemType must be LineItemType.STANDARD, LineItemType.BULK or LineItemType.PRICE_PRIORITY.
   */
  CLICKS = 'CLICKS',
  /**
   * The number of click-through Cost-Per-Action (CPA) conversions from creatives associated with the line item. This is only supported as secondary goal and the LineItem.costType must be CostType.CPA.
   */
  CLICK_THROUGH_CPA_CONVERSIONS = 'CLICK_THROUGH_CPA_CONVERSIONS',
  /**
   * The number of view-through Cost-Per-Action (CPA) conversions from creatives associated with the line item. This is only supported as secondary goal and the LineItem.costType must be CostType.CPA.
   */
  VIEW_THROUGH_CPA_CONVERSIONS = 'VIEW_THROUGH_CPA_CONVERSIONS',
  /**
   * The number of total Cost-Per-Action (CPA) conversions from creatives associated with the line item. This is only supported as secondary goal and the LineItem.costType must be CostType.CPA.
   */
  TOTAL_CPA_CONVERSIONS = 'TOTAL_CPA_CONVERSIONS',
  /**
   * The number of viewable impressions reported by creatives associated with the line item. The LineItem.lineItemType must be LineItemType.STANDARD.
   */
  VIEWABLE_IMPRESSIONS = 'VIEWABLE_IMPRESSIONS',
  /**
   * The number of in-target impressions reported by third party measurements. The LineItem.lineItemType must be LineItemType.STANDARD.
   */
  IN_TARGET_IMPRESSIONS = 'IN_TARGET_IMPRESSIONS',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
