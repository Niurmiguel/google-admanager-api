import { Statement, UpdateResult } from '../../../common/types';
import {
  CmsMetadataKeyAction,
  CmsMetadataKeyPage,
  CmsMetadataValueAction,
  CmsMetadataValuePage,
} from './cmsMetadata.type';

/**
 * Provides methods for querying CMS metadata keys and values.
 *
 * A CMS metadata value corresponds to one key value pair ingested from a publisher's CMS and is used to target all the content with which it is associated in the CMS.
 */
export interface CmsMetadataServiceOperations {
  /**
   * Returns a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataKey CmsMetadataKey}s
   * matching the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.Statement Statement}.
   * The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                                                              |
   * | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataKey#cmsMetadataKeyId CmsMetadataKey.cmsMetadataKeyId} |
   * | cmsKey       | {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataKey#keyName CmsMetadataKey.keyName}                   |
   * | status       | {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataKey#status CmsMetadataKey.status}                     |
   *
   * @param statement
   */
  getCmsMetadataKeysByStatement(
    statement: Statement,
  ): Promise<CmsMetadataKeyPage>;
  /**
   * Returns a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataValue CmsMetadataValue}s
   * matching the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.Statement Statement}.
   * The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                                                                      |
   * | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataValue#cmsMetadataValueId CmsMetadataValue.cmsMetadataValueId} |
   * | cmsValue     | {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataValue#valueName CmsMetadataValue.valueName}                   |
   * | cmsKey       | {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataValue#key CmsMetadataValue.key}                               |
   * | cmsKeyId     | {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataValue#key CmsMetadataValue.key}                               |
   * | status       | {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataValue#status CmsMetadataValue.status}                         |
   *
   * @param statement
   */
  getCmsMetadataValuesByStatement(
    statement: Statement,
  ): Promise<CmsMetadataValuePage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataKey CmsMetadataKey}
   * objects that match the given {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.Statement#query Statement.query}.
   *
   * @param keyAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of cms metadata keys.
   * @returns the result of the action performed
   */
  performCmsMetadataKeyAction(
    keyAction: CmsMetadataKeyAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataValue CmsMetadataValue}
   * objects that match the given {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.Statement#query Statement.query}.
   *
   * @param keyAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of cms metadata values.
   * @returns the result of the action performed
   */
  performCmsMetadataValueAction(
    valueAction: CmsMetadataValueAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
}
