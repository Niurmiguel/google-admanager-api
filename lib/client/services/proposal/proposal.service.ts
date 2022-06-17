import { Client } from 'soap';

import { MarketplaceCommentPage, Proposal, ProposalPage } from './proposal.type';
import { ProposalServiceOperations } from './proposalService.interface';
import { Statement, UpdateResult } from '../../../common/types';
import { ProposalAction } from './proposal.action';

export class ProposalService implements ProposalServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createProposals(proposals: Proposal[]): Promise<Proposal[]> {
    return this._client.createProposals({ proposals });
  }

  async getMarketplaceCommentsByStatement(filterStatement: Statement): Promise<MarketplaceCommentPage> {
    return this._client.getMarketplaceCommentsByStatement({
      filterStatement,
    });
  }

  async getProposalsByStatement(filterStatement: Statement): Promise<ProposalPage> {
    return this._client.getProposalsByStatement({
      filterStatement,
    });
  }

  async performProposalAction(proposalAction: ProposalAction, filterStatement: Statement): Promise<UpdateResult> {
    return this._client.performProposalAction({
      ProposalAction: {
        attributes: {
          'xsi:type': proposalAction.constructor.name,
        },
        ...proposalAction.buildAttributes(),
      },
      filterStatement,
    });
  }

  async updateProposals(proposals: Proposal[]): Promise<Proposal[]> {
    return this._client.updateProposals({ proposals });
  }
}
