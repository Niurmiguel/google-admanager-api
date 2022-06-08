/**
 * The strategy to use for displaying multiple {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative Creative} \
 * objects that are associated with a {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem}.
 */
export enum CreativeRotationType {
  /**
   * Creatives are displayed roughly the same number of times over the duration of the line item.
   */
  EVEN = 'EVEN',
  /**
   * Creatives are served roughly proportionally to their performance.
   */
  OPTIMIZED = 'OPTIMIZED',
  /**
   * Creatives are served roughly proportionally to their weights, set on the LineItemCreativeAssociation.
   */
  MANUAL = 'MANUAL',
  /**
   * Creatives are served exactly in sequential order, aka Storyboarding. Set on the LineItemCreativeAssociation.
   */
  SEQUENTIAL = 'SEQUENTIAL',
}

/**
 * Options for the unit of the custom pacing goal amounts.
 */
export enum CustomPacingGoalUnit {
  /**
   * The custom pacing goal amounts represent absolute numbers corresponding to the line item's Goal.unitType.
   */
  ABSOLUTE = 'ABSOLUTE',
  /**
   * The custom pacing goal amounts represent a millipercent. For example, 15000 millipercent equals 15%.
   */
  MILLI_PERCENT = 'MILLI_PERCENT',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Describes the {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} actions that are billable.
 */
export enum CostType {
  /**
   * Cost per action. The LineItem.lineItemType must be one of:
   *
   * - LineItemType.SPONSORSHIP
   * - LineItemType.STANDARD
   * - LineItemType.BULK
   * - LineItemType.NETWORK
   */
  CPA = 'CPA',
  /**
   * Cost per click. The LineItem.lineItemType must be one of:
   *
   * - LineItemType.SPONSORSHIP
   * - LineItemType.STANDARD
   * - LineItemType.BULK
   * - LineItemType.NETWORK
   * - LineItemType.PRICE_PRIORITY
   * - LineItemType.HOUSE
   */
  CPC = 'CPC',
  /**
   * Cost per day. The LineItem.lineItemType must be one of:
   *
   * - LineItemType.SPONSORSHIP
   * - LineItemType.NETWORK
   */
  CPD = 'CPD',
  /**
   * Cost per mille (cost per thousand impressions). The LineItem.lineItemType must be one of:
   *
   * - LineItemType.SPONSORSHIP
   * - LineItemType.STANDARD
   * - LineItemType.BULK
   * - LineItemType.NETWORK
   * - LineItemType.PRICE_PRIORITY
   * - LineItemType.HOUSE
   */
  CPM = 'CPM',
  /**
   * Cost per thousand Active View viewable impressions. The LineItem.lineItemType must be LineItemType.STANDARD.
   *
   */
  VCPM = 'VCPM',
  /**
   * Cost per thousand in-target impressions. The LineItem.lineItemType must be LineItemType.STANDARD.
   */
  CPM_IN_TARGET = 'CPM_IN_TARGET',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Describes the possible discount types on the cost of booking a {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem}.
 */
export enum LineItemDiscountType {
  /**
   * An absolute value will be discounted from the line item's cost.
   */
  ABSOLUTE_VALUE = 'ABSOLUTE_VALUE',
  /**
   * A percentage of the cost will be applied as discount for booking the line item.
   */
  PERCENTAGE = 'PERCENTAGE',
}

/**
 * Specifies the reservation status of the LineItem.
 */
export enum LineItemSummaryReservationStatus {
  /**
   * Indicates that inventory has been reserved for the line item.
   */
  RESERVED = 'RESERVED',
  /**
   * Indicates that inventory has not been reserved for the line item.
   */
  UNRESERVED = 'UNRESERVED',
}

/**
 * The scope to which the assignment of any competitive exclusion labels for a video line item is limited.
 */
export enum CompetitiveConstraintScope {
  /**
   * The competitive exclusion label applies to all line items within a single pod (or group).
   */
  POD = 'POD',
  /**
   * The competitive exclusion label applies to all line items within the entire stream of content.
   */
  STREAM = 'STREAM',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Child content eligibility designation.
 *
 * This field is optional and defaults to ChildContentEligibility.DISALLOWED. This field has no effect on serving enforcement unless you opt to "Child content enforcement" in the network's Child Content settings.
 */
export enum ChildContentEligibility {
  UNKNOWN = 'UNKNOWN',
  /**
   * This line item is not eligible to serve on any requests that are child-directed.
   */
  DISALLOWED = 'DISALLOWED',
  /**
   * This line item is eligible to serve on requests that are child-directed.
   */
  ALLOWED = 'ALLOWED',
}
