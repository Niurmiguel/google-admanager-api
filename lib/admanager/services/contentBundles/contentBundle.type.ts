import { ContentBundleStatus } from './contentBundle.enum';
import { DateTime, PageResult } from '../../../common/types';

/**
 * A ContentBundle is a grouping of individual {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentService.Content?hl=pt Content}.
 * A ContentBundle is defined as including the Content that match certain filter rules, along with the option to explicitly include or exclude certain Content IDs.
 */
export type ContentBundle = {
  /**
   * ID that uniquely identifies the ContentBundle. This attribute is read-only and is assigned by Google when a content bundle is created.
   */
  id: number;
  /**
   * The name of the ContentBundle. This attribute is required and has a maximum length of 255 characters.
   */
  name: string;
  /**
   * The ContentBundleStatus of the ContentBundle. This attribute is read-only and defaults to ContentBundleStatus.INACTIVE.
   */
  status: ContentBundleStatus;
  /**
   * The date and time at which this content bundle was last modified. New content that matches this bundle will not update this field. This attribute is read-only.
   */
  lastModifiedDateTime: DateTime;
};

/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentBundleService.ContentBundle?hl=pt ContentBundle} objects.
 */
export type ContentBundleAction =
  | 'ActivateContentBundles'
  | 'DeactivateContentBundles';

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentBundleService.ContentBundle?hl=pt ContentBundle} objects.
 */
export type ContentBundlePage = PageResult<ContentBundle>;
