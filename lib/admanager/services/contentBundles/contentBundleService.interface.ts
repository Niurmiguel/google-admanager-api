import { Statement, UpdateResult } from '../../../common/types';
import {
  ContentBundle,
  ContentBundleAction,
  ContentBundlePage,
} from './contentBundle.type';

/**
 * Provides methods for creating, updating and retrieving
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentBundleService.ContentBundle ContentBundle} objects.
 *
 * A **ContentBundle** is a grouping of Content that match filter rules as well as taking into account explicitly included or excluded Content.
 */
export interface ContentBundleServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentBundleService.ContentBundle ContentBundle} objects.
   *
   * @param contentBundles the content bundles to create
   * @returns the created content bundles with their IDs filled in
   */
  createContentBundles(
    contentBundles: ContentBundle[],
  ): Promise<ContentBundle[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentBundleService.ContentBundlePage ContentBundlePage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentBundleService.ContentBundle ContentBundle} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentBundleService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                                          |
   * | ------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentBundleService.ContentBundle#id ContentBundle.id}         |
   * | name         | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentBundleService.ContentBundle#name ContentBundle.name}     |
   * | status       | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentBundleService.ContentBundle#status ContentBundle.status} |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of content bundles
   * @returns the content bundles that match the given filter
   */
  getContentBundlesByStatement(
    filterStatement: Statement,
  ): Promise<ContentBundlePage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentBundleService.ContentBundle ContentBundle} objects that match the given Statement.
   *
   * @param contentBundleAction the action to perform
   * @param filterStatement 	a PQL statement used to filter content bundles
   * @returns 	the result of the action performed
   */
  performContentBundleAction(
    contentBundleAction: ContentBundleAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentBundleService.ContentBundle ContentBundle} objects.
   *
   * @param contentBundles the content bundles to update
   * @returns the updated content bundles
   */
  updateContentBundles(
    contentBundles: ContentBundle[],
  ): Promise<ContentBundle[]>;
}
