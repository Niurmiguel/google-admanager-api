import { Client } from 'soap';

import { TargetingPresetServiceOperations } from './targetingPresentService.interface';
import { TargetingPreset, TargetingPresetPage } from './targetingPresent.type';
import { TargetingPresetAction } from './targetingPresent.action';
import { Statement, UpdateResult } from '../../../common/types';

export class TargetingPresetService implements TargetingPresetServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createTargetingPresets(targetingPresets: TargetingPreset[]): Promise<TargetingPreset[]> {
    return this._client.createTargetingPresets({ targetingPresets });
  }

  async getTargetingPresetsByStatement(filterStatement: Statement): Promise<TargetingPresetPage> {
    return this._client.getTargetingPresetsByStatement({
      filterStatement,
    });
  }

  async performTargetingPresetAction(
    targetingPresetAction: TargetingPresetAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performTargetingPresetAction({
      targetingPresetAction: {
        attributes: {
          'xsi:type': targetingPresetAction.constructor.name,
        },
      },
      filterStatement,
    });
  }

  async updateTargetingPresets(targetingPresets: TargetingPreset[]): Promise<TargetingPreset[]> {
    return this._client.updateTargetingPresets({ targetingPresets });
  }
}
