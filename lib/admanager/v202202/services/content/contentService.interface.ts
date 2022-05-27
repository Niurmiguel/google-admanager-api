import { ContentPage } from './content.type';
import { Statement } from '@common/types';

/**
 * Service for retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentService.Content Content}.
 *
 * Content entities can be targeted in video {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem}s.
 *
 * You can query for content that belongs to a particular category or has assigned metadata. Categories and metadata for Content are stored in DFP as
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/AdRuleService.CustomCriteria CustomCriteria}.
 *
 * For example, to find all Content that is "genre=comedy", you would:
 *
 * - Retrieve the custom targeting key corresponding to "genre" using
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService#getCustomTargetingKeysByStatement CustomTargetingService.getCustomTargetingKeysByStatement}
 *
 * - Using the {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService#getCustomTargetingValuesByStatement CustomTargetingService.getCustomTargetingValuesByStatement}
 * method and a filter like "WHERE customTargetingKeyId = :genreKeyId and name = 'comedy'", retrieve the ID for the "comedy" custom targeting value.
 *
 * - Call {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentService#getContentByStatementAndCustomTargetingValue getContentByStatementAndCustomTargetingValue}
 * with a filter like "WHERE status = 'ACTIVE'" and the ID of the custom targeting value from step 2.
 */
export interface ContentServiceOperations {
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentService.ContentPage ContentPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentService.Content Content} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property          | PQL Property                                                                                                                                      |
   * | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id                    | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentService.Content#id Content.id}                                       |
   * | status                | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentService.Content#status Content.status}                               |
   * | name                  | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentService.Content#name Content.name}                                   |
   * | lastModifiedDateTime  | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentService.Content#lastModifiedDateTime Content.lastModifiedDateTime}   |
   * | lastDaiIngestDateTime | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentService.Content#lastDaiIngestDateTime Content.lastDaiIngestDateTime} |
   * | daiIngestStatus       | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentService.Content#daiIngestStatus Content.daiIngestStatus}             |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of content
   * @returns the content that match the given filter
   */
  getContentByStatement(statement: Statement): Promise<ContentPage>;
}
