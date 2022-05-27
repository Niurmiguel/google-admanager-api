import { Client } from 'soap';

import { StreamActivityMonitorServiceOperations } from './streamActivityMonitorService.interface';
import { SamSession } from './streamActivityMonitor.type';
import { Statement } from '@common/types';

export class StreamActivityMonitorService
  implements StreamActivityMonitorServiceOperations
{
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async getSamSessionsByStatement(statement: Statement): Promise<SamSession[]> {
    return this._client.getSamSessionsByStatement({
      statement,
    });
  }

  async registerSessionsForMonitoring(sessionIds: string[]): Promise<string[]> {
    return this._client.registerSessionsForMonitoring({ sessionIds });
  }
}
