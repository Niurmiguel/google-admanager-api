import { Client } from 'soap';

import { LabelServiceOperations } from './label.interface';
import { Label, LabelAction, LabelPage } from './label.type';
import { Statement, UpdateResult } from '@common/types';

export class LabelService implements LabelServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createLabels(labels: Label[]): Promise<Label[]> {
    return this._client.createLabels({ labels });
  }

  async getLabelsByStatement(filterStatement: Statement): Promise<LabelPage> {
    return this._client.getLabelsByStatement({
      filterStatement,
    });
  }

  async performLabelAction(
    labelAction: LabelAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performLabelAction({
      labelAction: {
        attributes: {
          'xsi:type': labelAction,
        },
      },
      filterStatement,
    });
  }

  async updateLabels(labels: Label[]): Promise<Label[]> {
    return this._client.updateLabels({ labels });
  }
}
