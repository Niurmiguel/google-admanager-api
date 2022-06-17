import { Client } from 'soap';

import { CmsMetadataKeyAction, CmsMetadataValueAction } from './cmsMetadata.action';
import { CmsMetadataServiceOperations } from './cmsMetadataService.interface';
import { CmsMetadataKeyPage, CmsMetadataValuePage } from './cmsMetadata.type';
import { Statement, UpdateResult } from '../../../common/types';

export class CmsMetadataService implements CmsMetadataServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async getCmsMetadataKeysByStatement(statement: Statement): Promise<CmsMetadataKeyPage> {
    return this._client.getCmsMetadataKeysByStatement({
      statement,
    });
  }

  async getCmsMetadataValuesByStatement(statement: Statement): Promise<CmsMetadataValuePage> {
    return this._client.getCmsMetadataValuesByStatement({
      statement,
    });
  }

  async performCmsMetadataKeyAction(
    cmsMetadataKeyAction: CmsMetadataKeyAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performCmsMetadataKeyAction({
      cmsMetadataKeyAction: {
        attributes: {
          'xsi:type': cmsMetadataKeyAction.constructor.name,
        },
      },
      filterStatement,
    });
  }

  async performCmsMetadataValueAction(
    cmsMetadataValueAction: CmsMetadataValueAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performCmsMetadataValueAction({
      cmsMetadataValueAction: {
        attributes: {
          'xsi:type': cmsMetadataValueAction.constructor.name,
        },
      },
      filterStatement,
    });
  }
}
