import { Client } from 'soap';

import { DaiEncodingProfileServiceOperations } from './daiEncodingProfileService.interface';
import { DaiEncodingProfile, DaiEncodingProfilePage } from './daiEncodingProfile.type';
import { DaiEncodingProfileAction } from './daiEncodingProfile.action';
import { Statement, UpdateResult } from '../../../common/types';

export class DaiEncodingProfileService implements DaiEncodingProfileServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createDaiEncodingProfiles(daiEncodingProfiles: DaiEncodingProfile[]): Promise<DaiEncodingProfile[]> {
    return this._client.createDaiEncodingProfiles({ daiEncodingProfiles });
  }

  async getDaiEncodingProfilesByStatement(filterStatement: Statement): Promise<DaiEncodingProfilePage> {
    return this._client.getDaiEncodingProfilesByStatement({
      filterStatement,
    });
  }

  async performDaiEncodingProfileAction(
    daiEncodingProfileAction: DaiEncodingProfileAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performDaiEncodingProfileAction({
      daiEncodingProfileAction: {
        attributes: {
          'xsi:type': daiEncodingProfileAction.constructor.name,
        },
      },
      filterStatement,
    });
  }

  async updateDaiEncodingProfiles(daiEncodingProfiles: DaiEncodingProfile[]): Promise<DaiEncodingProfile[]> {
    return this._client.updateDaiEncodingProfiles({ daiEncodingProfiles });
  }
}
