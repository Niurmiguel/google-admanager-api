import { Statement, UpdateResult } from '../../../common/types';
import { CdnConfiguration, CdnConfigurationAction, CdnConfigurationPage } from './cdnConfiguration.type';

/**
 * Provides methods for creating, updating and retrieving
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.CdnConfiguration CdnConfiguration} objects.
 */
export interface CdnConfigurationServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.CdnConfiguration CdnConfiguration} objects.
   *
   * @param cdnConfigurations
   */
  createCdnConfigurations(cdnConfigurations: CdnConfiguration[]): Promise<CdnConfiguration[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.CdnConfigurationPage CdnConfigurationPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.CdnConfiguration CdnConfiguration} objects that satisfy
   * the given {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.Statement#query Statement.query}.
   * Currently only CDN Configurations of type
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.CdnConfigurationType#LIVE_STREAM_SOURCE_CONTENT CdnConfigurationType.LIVE_STREAM_SOURCE_CONTENT}
   * will be returned. The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                                               |
   * | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.CdnConfiguration#id CdnConfiguration.id}     |
   * | name         | {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.CdnConfiguration#name CdnConfiguration.name} |
   *
   * @param statement
   */
  getCdnConfigurationsByStatement(statement: Statement): Promise<CdnConfigurationPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.CdnConfiguration CdnConfiguration}
   * objects that match the given {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.Statement#query Statement.query}.
   *
   * @param cdnConfigurationAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of live stream events
   * @returns the result of the action performed
   */
  performCdnConfigurationAction(
    cdnConfigurationAction: CdnConfigurationAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.CdnConfiguration CdnConfiguration} objects.
   *
   * @param cdnConfigurations
   */
  updateCdnConfigurations(cdnConfigurations: CdnConfiguration[]): Promise<CdnConfiguration[]>;
}
