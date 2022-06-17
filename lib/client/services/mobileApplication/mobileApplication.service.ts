import { Client } from 'soap';

import { MobileApplicationServiceOperations } from './mobileApplicationService.interface';
import { MobileApplication, MobileApplicationPage } from './mobileApplication.type';
import { MobileApplicationAction } from './mobileApplication.action';
import { Statement, UpdateResult } from '../../../common/types';

export class MobileApplicationService implements MobileApplicationServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createMobileApplications(mobileApplications: MobileApplication[]): Promise<MobileApplication[]> {
    return this._client.createMobileApplications({ mobileApplications });
  }

  async getMobileApplicationsByStatement(filterStatement: Statement): Promise<MobileApplicationPage> {
    return this._client.getMobileApplicationsByStatement({
      filterStatement,
    });
  }

  async performMobileApplicationAction(
    mobileApplicationAction: MobileApplicationAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performMobileApplicationAction({
      mobileApplicationAction: {
        attributes: {
          'xsi:type': mobileApplicationAction.constructor.name,
        },
      },
      filterStatement,
    });
  }

  async updateMobileApplications(mobileApplications: MobileApplication[]): Promise<MobileApplication[]> {
    return this._client.updateMobileApplications({ mobileApplications });
  }
}
