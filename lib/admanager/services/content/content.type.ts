import { DateTime, PageResult } from '../../../common/types';
import {
  ContentStatus,
  ContentStatusDefinedBy,
  DaiIngestErrorReason,
  DaiIngestStatus,
} from './content.enum';

/**
 * Represents an error associated with a DAI content's status.
 */
export type DaiIngestError = {
  /**
   * The error associated with the content.
   */
  reason: DaiIngestErrorReason;
  /**
   * The field, if any, that triggered the error.
   */
  trigger: string;
};

/**
 * Contains information about {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentService.Content Content} from the CMS it was ingested from.
 */
export type CmsContent = {
  /**
   * The ID of the Content Source associated with the CMS in Ad Manager. This attribute is read-only.
   */
  id: number;
  /**
   * The display name of the CMS this content is in. This attribute is read-only.
   */
  displayName: string;
  /**
   *  The ID of the Content in the CMS. This ID will be a 3rd party ID, usually the ID of the content in a CMS (Content Management System). This attribute is read-only.
   */
  cmsContentId: string;
};

/**
 * A **Content** represents video metadata from a publisher's Content Management System (CMS) that has been synced to Ad Manager.
 *
 * Video line items can be targeted to **Content** to indicate what ads should match when the **Content** is being played.
 */
export type Content = {
  /**
   * Uniquely identifies the Content. This attribute is read-only and is assigned by Google when the content is created.
   */
  id: number;
  /**
   * The name of the Content. This attribute is read-only.
   */
  name: string;
  /**
   * The status of this Content. This attribute is read-only.
   */
  status: ContentStatus;
  /**
   * Whether the content status was defined by the user, or by the source CMS from which the content was ingested. This attribute is read-only.
   */
  statusDefinedBy: ContentStatusDefinedBy;
  /**
   * The current DAI ingest status of the HLS media for the content.
   * This attribute is read-only and is null if the content is not eligible for dynamic ad insertion or if the content does not have HLS media.
   */
  hlsIngestStatus: DaiIngestStatus;
  /**
   * The list of any errors that occurred during the most recent DAI ingestion process of the HLS media.
   * This attribute is read-only and will be null if the hlsIngestStatus is DaiIngestStatus.STATUS_SUCCESS
   * or if the content is not eligible for dynamic ad insertion or if the content does not have HLS media.
   */
  hlsIngestErrors: DaiIngestError[];
  /**
   * The date and time at which this content's HLS media was last ingested for DAI.
   * This attribute is read-only and will be null if the content is not eligible for dynamic ad insertion or if the content does not have HLS media.
   */
  lastHlsIngestDateTime: DateTime;
  /**
   * The current DAI ingest status of the DASH media for the content.
   * This attribute is read-only and is null if the content is not eligible for dynamic ad insertion or if the content does not have DASH media.
   */
  dashIngestStatus: DaiIngestStatus;
  /**
   * The list of any errors that occurred during the most recent DAI ingestion process of the DASH media.
   * This attribute is read-only and will be null if the hlsIngestStatus is DaiIngestStatus.STATUS_SUCCESS
   * or if the content is not eligible for dynamic ad insertion or if the content does not have DASH media.
   */
  dashIngestErrors: DaiIngestError[];
  /**
   * The date and time at which this content's DASH media was last ingested for DAI.
   * This attribute is read-only and will be null if the content is not eligible for dynamic ad insertion or if the content does not have DASH media.
   */
  lastDashIngestDateTime: DateTime;
  /**
   * The date and time at which this content was published. This attribute is read-only.
   */
  importDateTime: DateTime;
  /**
   * The date and time at which this content was last modified.
   * The last modified date time will always be updated when a ContentBundle association is changed,
   * but will not always be updated when a CmsMetadataValue value is changed. This attribute is read-only.
   */
  lastModifiedDateTime: DateTime;
  /**
   * Information about the content from the CMS it was ingested from. This attribute is read-only.
   */
  cmsSources: CmsContent[];
  /**
   * IDs of the ContentBundle of which this content is a member. This attribute is read-only.
   */
  contentBundleIds: number[];
  /**
   * A collection of CmsMetadataValue IDs that are associated with this content. This attribute is read-only.
   */
  cmsMetadataValueIds: number[];
  /**
   * The duration of the content in milliseconds. This attribute is read-only.
   */
  duration: number;
};

/**
 * Captures a page of Content objects.
 */
export type ContentPage = PageResult<Content>;
