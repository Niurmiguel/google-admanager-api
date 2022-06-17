import { Client } from 'soap';

import { CdnConfigurationServiceOperations } from './cdnConfiguration.interface';
import { CdnConfiguration, CdnConfigurationPage } from './cdnConfiguration.type';
import { CdnConfigurationAction } from './cdnConfiguration.action';
import { Statement, UpdateResult } from '../../../common/types';

export class CdnConfigurationService implements CdnConfigurationServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createCdnConfigurations(cdnConfigurations: CdnConfiguration[]): Promise<CdnConfiguration[]> {
    return this._client.createCdnConfigurations({ cdnConfigurations });
  }

  async getCdnConfigurationsByStatement(statement: Statement): Promise<CdnConfigurationPage> {
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
          'xsi:type': cdnConfigurationAction.constructor.name,
        },
      },
      filterStatement,
    });
  }

  async updateCdnConfigurations(cdnConfigurations: CdnConfiguration[]): Promise<CdnConfiguration[]> {
    return this._client.updateCdnConfigurations({ cdnConfigurations });
  }
}
