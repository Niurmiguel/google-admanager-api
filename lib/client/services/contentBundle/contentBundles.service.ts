import { Client } from 'soap';

import { ContentBundleServiceOperations } from './contentBundleService.interface';
import { ContentBundle, ContentBundlePage } from './contentBundle.type';
import { Statement, UpdateResult } from '../../../common/types';
import { ContentBundleAction } from './contentBundle.action';

export class ContentBundleService implements ContentBundleServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createContentBundles(contentBundles: ContentBundle[]): Promise<ContentBundle[]> {
    return this._client.createContentBundles({ contentBundles });
  }

  async getContentBundlesByStatement(filterStatement: Statement): Promise<ContentBundlePage> {
    return this._client.getContentBundlesByStatement({
      filterStatement,
    });
  }

  async performContentBundleAction(
    contentBundleAction: ContentBundleAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performContentBundleAction({
      contentBundleAction: {
        attributes: {
          'xsi:type': contentBundleAction.constructor.name,
        },
      },
      filterStatement,
    });
  }

  async updateContentBundles(contentBundles: ContentBundle[]): Promise<ContentBundle[]> {
    return this._client.updateContentBundles({ contentBundles });
  }
}
