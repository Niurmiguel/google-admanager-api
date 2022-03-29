import { Client } from 'soap';

import { CdnConfigurationServiceOperations } from './cdnConfiguration.interface';
import { Statement, UpdateResult } from '@common/types';
import {
  CdnConfiguration,
  CdnConfigurationAction,
  CdnConfigurationPage,
} from './cdnConfiguration.type';

export class CdnConfigurationService
  implements CdnConfigurationServiceOperations
{
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createCdnConfigurations(
    cdnConfigurations: CdnConfiguration[],
  ): Promise<CdnConfiguration[]> {
    return this._client.createCdnConfigurations({ cdnConfigurations });
  }

  async getCdnConfigurationsByStatement(
    statement: Statement,
  ): Promise<CdnConfigurationPage> {
    return this._client.getCdnConfigurationsByStatement({
      statement,
    });
  }

  async performCdnConfigurationAction(
    cdnConfigurationAction: CdnConfigurationAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performCdnConfigurationAction({
      cdnConfigurationAction: {
        attributes: {
          'xsi:type': cdnConfigurationAction,
        },
      },
      filterStatement,
    });
  }

  async updateCdnConfigurations(
    cdnConfigurations: CdnConfiguration[],
  ): Promise<CdnConfiguration[]> {
    return this._client.updateCdnConfigurations({ cdnConfigurations });
  }
}
