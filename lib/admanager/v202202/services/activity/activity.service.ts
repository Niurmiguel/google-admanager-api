import { Client } from 'soap';

import { ActivityServiceOperations } from './activityService.interface';
import { Activity, ActivityPage } from './activity.type';
import { Statement } from '@common/types';

export class ActivityService implements ActivityServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createActivities(activities: Activity[]): Promise<Activity[]> {
    return this._client.createActivities({ activities });
  }

  async getActivitiesByStatement(
    filterStatement: Statement,
  ): Promise<ActivityPage> {
    return this._client.getActivitiesByStatement({
      filterStatement,
    });
  }

  async updateActivities(activities: Activity[]): Promise<Activity[]> {
    return this._client.updateActivities({ activities });
  }
}
