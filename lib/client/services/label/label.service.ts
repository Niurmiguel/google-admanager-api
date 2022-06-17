import { Client } from 'soap';

import { Statement, UpdateResult } from '../../../common/types';
import { LabelServiceOperations } from './label.interface';
import { Label, LabelPage } from './label.type';
import { LabelAction } from './label.action';

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

  async performLabelAction(labelAction: LabelAction, filterStatement: Statement): Promise<UpdateResult> {
    return this._client.performLabelAction({
      labelAction: {
        attributes: {
          'xsi:type': labelAction.constructor.name,
        },
      },
      filterStatement,
    });
  }

  async updateLabels(labels: Label[]): Promise<Label[]> {
    return this._client.updateLabels({ labels });
  }
}
