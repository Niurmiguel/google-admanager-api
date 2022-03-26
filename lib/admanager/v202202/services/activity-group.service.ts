import { Client } from 'soap';

import { Statement } from '@common/types';
import { ActivityGroupServiceOperations } from '../interfaces';
import { ActivityGroup, ActivityGroupPage } from '../types';

export class ActivityGroupService implements ActivityGroupServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createActivityGroups(
    activityGroups: ActivityGroup[],
  ): Promise<ActivityGroup[]> {
    return this._client.createActivityGroups({ activityGroups });
  }

  async getActivityGroupsByStatement(
    filterStatement: Statement,
  ): Promise<ActivityGroupPage> {
    return this._client.getActivityGroupsByStatement({
      filterStatement: { ...filterStatement },
    });
  }

  async updateActivityGroups(
    activityGroups: ActivityGroup[],
  ): Promise<ActivityGroup[]> {
    return this._client.updateActivityGroups({ activityGroups });
  }
}
