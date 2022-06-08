import { DateTime, PageResult } from '../../../common/types';
import { AppliedLabel, BaseCustomFieldValue, CreativePlaceholder, Money, Targeting } from '../../common/types';
import {
  AdExchangeEnvironment,
  NegotiationStatus,
  ProposalCompanyAssociationType,
  ProposalStatus,
  RfpType,
} from './proposal.enum';

/**
 * A ProposalCompanyAssociation represents a Company associated with the Proposal and a set of Contact objects belonging to the company.
 */
export type ProposalCompanyAssociation = {
  /**
   * The unique ID of the Company associated with the Proposal.
   *
   * This attribute is required.
   */
  companyId: number;
  /**
   * The association type of the Company and Proposal.
   */
  type: ProposalCompanyAssociationType;
  /**
   * List of unique IDs for Contact objects of the Company.
   */
  contactIds: number[];
};

/**
 * A SalespersonSplit represents a salesperson and their split.
 */
export type SalespersonSplit = {
  /**
   * The unique ID of the User responsible for the sales of the Proposal.
   *
   * This attribute is required.
   */
  userId: number;
  /**
   * The split can be attributed to the salesperson. The percentage value is stored as millipercents, and must be multiples of 10 with the range from 0 to 100000. The default value is 0.
   */
  split: number;
};

/**
 * Marketplace info for a proposal with a corresponding order in Marketplace.
 */
export type ProposalMarketplaceInfo = {
  /**
   * Whether the non-free-editable fields of a Proposal are opened for edit. A proposal that is open for edit will not receive buyer updates from Marketplace. If the buyer updates the proposal while this is open for local editing, Google will set isNewVersionFromBuyer to true. You will then need to call DiscardProposalDrafts to revert your edits to get the buyer's latest changes. This attribute is read-only.
   */
  hasLocalVersionEdits: boolean;
  /**
   * The negotiation status of the Proposal. This attribute is read-only.
   */
  negotiationStatus: NegotiationStatus;
  /**
   * The comment on the Proposal to be sent to the buyer.
   */
  marketplaceComment: string;
  /**
   * Indicates that the buyer has made updates to the proposal on Marketplace.
   * This attribute is only meaningful if the proposal is open for edit (i.e., hasLocalVersionEdits is true) This attribute is read-only.
   */
  isNewVersionFromBuyer: boolean;
  /**
   * The Authorized Buyers ID of the buyer that this Proposal is being negotiated with.
   *
   * This attribute is required.
   */
  buyerAccountId: number;
  /**
   * The ID used to represent Display & Video 360 client buyer partner ID (if Display & Video 360) or Authorized Buyers client buyer account ID. This field is readonly and assigned by Google. This attribute is read-only.
   */
  partnerClientId: string;
};

/**
 * Represents the buyer RFP information associated with a Proposal describing the requirements from the buyer.
 */
export type BuyerRfp = {
  /**
   * CPM for the Proposal in question. Given that this field belongs to a request for proposal (for which initially a Proposal does not yet exist),
   * this field should serve as guidance for publishers to create a Proposal with LineItems reflecting this CPM. This attribute is read-only.
   */
  costPerUnit: Money;

  /**
   * The number of impressions per day that a buyer wishes to see in the Proposal derived from the request for proposal in question. This attribute is read-only.
   */
  units: number;

  /**
   * Total amount of Money available to spend on this deal. In the case of Preferred Deal, the budget is equal to the maximum amount of money a buyer is willing to spend on a given Proposal, even though the budget might not be spent entirely, as impressions are not guaranteed. This attribute is read-only.
   */
  budget: Money;

  /**
   *  Currency code for this deal's budget and CPM. This attribute is read-only.
   */
  currencyCode: string;
  /**
   *  The DateTime in which the proposed deal should start serving. This attribute is read-only.
   */
  startDateTime: DateTime;

  /**
   *  The DateTime in which the proposed deal should end serving. This attribute is read-only.
   */
  endDateTime: DateTime;

  /**
   * A description of the proposed deal. This can be used for the buyer to tell the publisher more detailed information about the deal in question. This attribute is read-only.
   */
  description: string;

  /**
   * A list of inventory sizes in which creatives will be eventually served. This attribute is read-only.
   */
  creativePlaceholders: CreativePlaceholder[];

  /**
   * Targeting information for the proposal in question. Currently this field only contains GeoTargeting information. This attribute is read-only.
   */
  targeting: Targeting;

  /**
   * Additional terms of the deal in question. This field can be used to state more specific targeting information for the deal,
   * as well as any additional information regarding this deal. Given that this field belongs to a request for proposal (for which initially a Proposal does not yet exist),
   * this field can be populated by buyers to specify additional information that they wish publishers to incorporate into the Proposal derived from this request for proposal.
   * This attribute is read-only.
   */
  additionalTerms: string;

  /**
   * Identifies the format of the inventory or "channel" through which the ad serves.
   * Environments currently supported include AdExchangeEnvironment.DISPLAY, AdExchangeEnvironment.VIDEO, and AdExchangeEnvironment.MOBILE. This attribute is read-only.
   */
  adExchangeEnvironment: AdExchangeEnvironment;
  /**
   * Deal type; either Programmatic Guaranteed or Preferred Deal. This field corresponds to the type of Proposal that a buyer wishes to negotiate with a seller. This attribute is read-only.
   */
  rfpType: RfpType;
};

/**
 * A Proposal represents an agreement between an interactive advertising seller and a buyer that specifies the details of an advertising campaign.
 */
export type Proposal = {
  /**
   * The unique ID of the Proposal. This attribute is read-only.
   */
  id: number;
  /**
   * Flag that specifies whether this Proposal is for programmatic deals. This value is default to false.
   */
  isProgrammatic: boolean;
  /**
   * The unique ID of corresponding Order. This will be null if the Proposal has not been pushed to Ad Manager. This attribute is read-only.
   */
  dfpOrderId: number;
  /**
   * The name of the Proposal. This value has a maximum length of 255 characters. This value is copied to Order.name when the proposal turns into an order. This attribute can be configured as editable after the proposal has been submitted. Please check with your network administrator for editable fields configuration.
   *
   * This attribute is required.
   */
  name: string;
  /**
   * The date and time at which the order and line items associated with the Proposal are eligible to begin serving.
   * This attribute is derived from the proposal line item of the proposal which has the earliest ProposalLineItem.startDateTime.
   * This attribute will be null, if this proposal has no related line items, or none of its line items have a start time. This attribute is read-only.
   */
  startDateTime: DateTime;
  /**
   * The date and time at which the order and line items associated with the Proposal stop being served.
   * This attribute is derived from the proposal line item of the proposal which has the latest ProposalLineItem.endDateTime.
   * This attribute will be null, if this proposal has no related line items, or none of its line items have an end time. This attribute is read-only.
   */
  endDateTime: DateTime;
  /**
   * The status of the Proposal. This attribute is read-only.
   */
  status: ProposalStatus;
  /**
   * The archival status of the Proposal. This attribute is read-only.
   */
  isArchived: boolean;
  /**
   * The advertiser, to which this Proposal belongs, and a set of Contact objects associated with the advertiser.
   * The ProposalCompanyAssociation.type of this attribute should be ProposalCompanyAssociationType.ADVERTISER.
   * This attribute is required when the proposal turns into an order, and its ProposalCompanyAssociation.companyId will be copied to Order.advertiserId.
   * This attribute becomes readonly once the Proposal has been pushed.
   */
  advertiser: ProposalCompanyAssociation;
  /**
   * List of agencies and the set of Contact objects associated with each agency. This attribute is optional.
   * A Proposal only has at most one Company with ProposalCompanyAssociationType.PRIMARY_AGENCY type,
   * but a Company can appear more than once with different ProposalCompanyAssociationType values.
   * If primary agency exists, its ProposalCompanyAssociation.companyId will be copied to Order.agencyId when the proposal turns into an order.
   */
  agencies: ProposalCompanyAssociation[];
  /**
   * Provides any additional notes that may annotate the Proposal. This attribute is optional and has a maximum length of 65,535 characters.
   * This attribute can be configured as editable after the proposal has been submitted. Please check with your network administrator for editable fields configuration.
   */
  internalNotes: string;
  /**
   * The primary salesperson who brokered the transaction with the advertiser. This attribute is required when the proposal turns into an order.
   * This attribute can be configured as editable after the proposal has been submitted. Please check with your network administrator for editable fields configuration.
   */
  primarySalesperson: SalespersonSplit;
  /**
   * List of unique IDs of User objects who are the sales planners of the Proposal. This attribute is optional.
   * A proposal could have 8 sales planners at most. This attribute can be configured as editable after the proposal has been submitted.
   * Please check with your network administrator for editable fields configuration.
   */
  salesPlannerIds: number[];
  /**
   * The unique ID of the User who is primary trafficker and is responsible for trafficking the Proposal.
   * This attribute is required when the proposal turns into an order, and will be copied to Order.primaryTraffickerId.
   * This attribute can be configured as editable after the proposal has been submitted. Please check with your network administrator for editable fields configuration.
   */
  primaryTraffickerId: number;
  /**
   * users who are the seller's contacts.
   */
  sellerContactIds: number[];
  /**
   * The IDs of all teams that the Proposal is on directly. This attribute is optional.
   * This attribute can be configured as editable after the proposal has been submitted. Please check with your network administrator for editable fields configuration.
   */
  appliedTeamIds: number[];
  /**
   * The values of the custom fields associated with the Proposal. This attribute is optional.
   * This attribute can be configured as editable after the proposal has been submitted.
   * Please check with your network administrator for editable fields configuration.
   */
  customFieldValues: BaseCustomFieldValue[];
  /**
   * The set of labels applied directly to the Proposal. This attribute is optional.
   */
  appliedLabels: AppliedLabel[];
  /**
   * Contains the set of labels applied directly to the proposal as well as those inherited ones.
   * If a label has been negated, only the negated label is returned. This attribute is read-only.
   */
  effectiveAppliedLabels: AppliedLabel[];
  /**
   * The currency code of this Proposal. This attribute is optional and defaults to network's currency code.
   */
  currencyCode: string;
  /**
   * Indicates whether the proposal has been sold, i.e., corresponds to whether the status of an Order is OrderStatus.APPROVED or OrderStatus.PAUSED. This attribute is read-only.
   */
  isSold: boolean;
  /**
   * The date and time this Proposal was last modified. This attribute is read-only.
   */
  lastModifiedDateTime: DateTime;
  /**
   * The marketplace info of this proposal if it has a corresponding order in Marketplace.
   */
  marketplaceInfo: ProposalMarketplaceInfo;
  /**
   * The buyer RFP associated with this Proposal, which is optional. This field will be null if the proposal is not initiated from RFP.
   */
  buyerRfp: BuyerRfp;
  /**
   * Whether a Proposal contains a BuyerRfp field. If this field is true, it indicates that the Proposal in question orignated from a buyer.
   */
  hasBuyerRfp: boolean;
  /**
   * Whether pausing is consented for the Proposal. This field is optional and defaults to true.
   * If false, it indicates that the buyer and the seller agree that the proposal should not be paused.
   */
  deliveryPausingEnabled: boolean;
};

/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} objects.
 */
export type ProposalAction =
  | 'ArchiveProposals'
  | 'DiscardLocalVersionEdits'
  | 'EditProposalsForNegotiation'
  | 'PauseProposals'
  | 'RequestBuyerAcceptance'
  | 'RequestBuyerReview'
  | 'ReserveProposals'
  | 'ResumeProposals'
  | 'TerminateNegotiations'
  | 'UnarchiveProposals'
  | 'UpdateOrderWithSellerData';

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} objects.
 */
export type ProposalPage = PageResult<Proposal>;

/**
 * A comment associated with a programmatic {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal}
 * that has been sent to Marketplace.
 */
export type MarketplaceComment = {
  /**
   * The unique ID of the Proposal the comment belongs to.
   */
  proposalId: number;
  /**
   * The comment made on the Proposal.
   */
  comment: string;
  /**
   * The creation DateTime of this MarketplaceComment.
   */
  creationTime: DateTime;
  /**
   * Indicates whether the MarketplaceComment was created by seller.
   */
  createdBySeller: boolean;
};

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.MarketplaceComment MarketplaceComment} objects.
 */
export type MarketplaceCommentPage = {
  /**
   * The absolute index in the total result set on which this page begins.
   */
  startIndex: number;
  /**
   * The collection of results contained within this page.
   */
  results: MarketplaceComment[];
};
