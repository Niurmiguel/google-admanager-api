/**
 * Describes the type of event the advertiser is paying for. The values here correspond to the values for the LineItem.costType field.
 */
export enum RateType {
  /**
   * The rate applies to cost per mille (CPM) revenue.
   */
  CPM = 'CPM',
  /**
   * The rate applies to cost per click (CPC) revenue.
   */
  CPC = 'CPC',
  /**
   * The rate applies to cost per day (CPD) revenue.
   */
  CPD = 'CPD',
  /**
   * The rate applies to cost per unit (CPU) revenue.
   */
  CPU = 'CPU',
  /**
   * The rate applies to flat fee revenue.
   */
  FLAT_FEE = 'FLAT_FEE',
  /**
   * The rate applies to Active View viewable cost per mille (vCPM) revenue.
   */
  VCPM = 'VCPM',
  /**
   * The rate applies to cost per mille in-target (CPM In-Target).
   */
  CPM_IN_TARGET = 'CPM_IN_TARGET',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Represents the inventory reservation status for ProposalLineItem objects.
 */
export enum ReservationStatus {
  /**
   * The inventory is reserved.
   */
  RESERVED = 'RESERVED',
  /**
   * The proposal line item's inventory is never reserved.
   */
  NOT_RESERVED = 'NOT_RESERVED',
  /**
   * The inventory is once reserved and now released.
   */
  RELEASED = 'RELEASED',
  /**
   * The reservation status of the corresponding LineItem should be used for this ProposalLineItem.
   */
  CHECK_LINE_ITEM_RESERVATION_STATUS = 'CHECK_LINE_ITEM_RESERVATION_STATUS',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * The role (buyer or seller) that performed an action in the negotiation of a Proposal.
 */
export enum NegotiationRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  UNKNOWN = 'UNKNOWN',
}
