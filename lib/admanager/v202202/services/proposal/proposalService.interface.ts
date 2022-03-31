import {
  MarketplaceCommentPage,
  Proposal,
  ProposalAction,
  ProposalPage,
} from './proposal.type';
import { Statement, UpdateResult } from '@common/types';

/**
 * Provides operations for creating, updating and retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} objects.
 */
export interface ProposalServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} objects.
   * For each proposal, the following fields are required:
   *
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal#name Proposal.name}
   *
   * @param proposals the proposals to create
   * @returns the created proposals with their IDs filled in
   */
  createProposals(proposals: Proposal[]): Promise<Proposal[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.MarketplaceCommentPage MarketplaceCommentPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.MarketplaceComment MarketplaceComment} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Statement#query Statement.query}.
   * This method only returns comments already sent to Marketplace, local draft
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.ProposalMarketplaceInfo#marketplaceComment ProposalMarketplaceInfo.marketplaceComment}
   * are not included. The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                                                       |
   * | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | proposalId   | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.MarketplaceComment#proposalId MarketplaceComment.proposalId} |
   *
   * The query must specify a proposalId, and only supports a subset of PQL syntax:
   *
   * **`[WHERE <condition> {AND <condition> ...}]`**
   * **`[ORDER BY <property> [ASC | DESC]]`**
   * **`[LIMIT {[<offset>,] <count>} | {<count> OFFSET <offset>}]`**
   *
   * Only supports ORDER BY MarketplaceComment.creationTime.
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of marketplace comments
   * @returns the marketplace comments that match the given filter
   */
  getMarketplaceCommentsByStatement(
    filterStatement: Statement,
  ): Promise<MarketplaceCommentPage>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.ProposalPage ProposalPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property         | PQL Property                                                                                                                                    |
   * | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id                   | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal#id Proposal.id}                                     |
   * | name                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal#name Proposal.name}                                 |
   * | dfpOrderId                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal#dfpOrderId Proposal.dfpOrderId}                                 |
   * | status                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal#status Proposal.status}                                 |
   * | isArchived                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal#isArchived Proposal.isArchived}                                 |
   * | approcvalStatus - *Only applicable for proposals using sales management*                | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal#approvalStatus Proposal.approvalStatus}                                 |
   * | lastModifiedDateTime | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal#lastModifiedDateTime Proposal.lastModifiedDateTime} |
   * | isProgrammatic                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal#isProgrammatic Proposal.isProgrammatic}                                 |
   * | negotiationStatus - *Only applicable for programmatic proposals*                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal#negotiationStatus Proposal.negotiationStatus}                                 |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of proposals
   * @returns the proposals that match the given filter
   */
  getProposalsByStatement(filterStatement: Statement): Promise<ProposalPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal}
   * objects that match the given {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Statement#query Statement.query}.
   * The following fields are also required when submitting proposals for approval:
   *
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal#advertiser Proposal.advertiser}
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal#primarySalesperson Proposal.primarySalesperson}
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal#primaryTraffickerId Proposal.primaryTraffickerId}
   *
   * @param proposalAction the action to perform
   * @param filterStatement 	a PQL statement used to filter proposals
   * @returns 	the result of the action performed
   */
  performProposalAction(
    proposalAction: ProposalAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} objects.
   *
   * @param proposals the proposals to update
   * @returns the updated proposals
   */
  updateProposals(proposals: Proposal[]): Promise<Proposal[]>;
}
