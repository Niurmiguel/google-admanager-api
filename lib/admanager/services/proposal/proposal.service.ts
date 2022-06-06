import { Client } from 'soap';

import { ProposalServiceOperations } from './proposalService.interface';
import { Statement, UpdateResult } from '../../../common/types';
import {
  MarketplaceCommentPage,
  Proposal,
  ProposalAction,
  ProposalPage,
} from './proposal.type';

export class ProposalService implements ProposalServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createProposals(proposals: Proposal[]): Promise<Proposal[]> {
    return this._client.createProposals({ proposals });
  }

  async getMarketplaceCommentsByStatement(
    filterStatement: Statement,
  ): Promise<MarketplaceCommentPage> {
    return this._client.getMarketplaceCommentsByStatement({
      filterStatement,
    });
  }

  async getProposalsByStatement(
    filterStatement: Statement,
  ): Promise<ProposalPage> {
    return this._client.getProposalsByStatement({
      filterStatement,
    });
  }

  async performProposalAction(
    ProposalAction: ProposalAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performProposalAction({
      ProposalAction: {
        attributes: {
          'xsi:type': ProposalAction,
        },
      },
      filterStatement,
    });
  }

  async updateProposals(proposals: Proposal[]): Promise<Proposal[]> {
    return this._client.updateProposals({ proposals });
  }
}
