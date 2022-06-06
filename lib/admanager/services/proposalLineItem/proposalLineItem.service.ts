import { Client } from 'soap';

import { ProposalLineItemServiceOperations } from './proposalLineItemService.interface';
import {
  ProposalLineItem,
  ProposalLineItemAction,
  ProposalLineItemMakegoodInfo,
  ProposalLineItemPage,
} from './proposalLineItem.type';
import { Statement, UpdateResult } from '../../../common/types';

export class ProposalLineItemService
  implements ProposalLineItemServiceOperations
{
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createMakegoods(
    makegoodInfos: ProposalLineItemMakegoodInfo[],
  ): Promise<ProposalLineItem[]> {
    return this._client.createMakegoods({ makegoodInfos });
  }

  async createProposalLineItems(
    proposalLineItems: ProposalLineItem[],
  ): Promise<ProposalLineItem[]> {
    return this._client.createProposalLineItems({ proposalLineItems });
  }

  async getProposalLineItemsByStatement(
    filterStatement: Statement,
  ): Promise<ProposalLineItemPage> {
    return this._client.getProposalLineItemsByStatement({
      filterStatement,
    });
  }

  async performProposalLineItemAction(
    proposalLineItemAction: ProposalLineItemAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performProposalLineItemAction({
      proposalLineItemAction: {
        attributes: {
          'xsi:type': proposalLineItemAction,
        },
      },
      filterStatement,
    });
  }

  async updateProposalLineItems(
    proposalLineItems: ProposalLineItem[],
  ): Promise<ProposalLineItem[]> {
    return this._client.updateProposalLineItems({ proposalLineItems });
  }
}
