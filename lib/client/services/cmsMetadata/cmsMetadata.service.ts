import { Client } from 'soap';

import { CmsMetadataServiceOperations } from './cmsMetadataService.interface';
import { Statement, UpdateResult } from '../../../common/types';
import {
  CmsMetadataKeyAction,
  CmsMetadataKeyPage,
  CmsMetadataValueAction,
  CmsMetadataValuePage,
} from './cmsMetadata.type';

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
          'xsi:type': cmsMetadataKeyAction,
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
          'xsi:type': cmsMetadataValueAction,
        },
      },
      filterStatement,
    });
  }
}
