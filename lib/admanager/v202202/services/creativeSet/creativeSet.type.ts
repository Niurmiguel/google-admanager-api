import { DateTime, PageResult } from '@common/types';

/**
 * A creative set is comprised of a master creative and its companion creatives.
 */
export type CreativeSet = {
  /**
   * Uniquely identifies the CreativeSet. This attribute is read-only and is assigned by Google when a creative set is created.
   */
  id: number;

  /**
   * The name of the creative set. This attribute is required and has a maximum length of 255 characters.
   */
  name: string;

  /**
   * The ID of the master creative associated with this creative set. This attribute is required.
   */
  masterCreativeId: number;

  /**
   * The IDs of the companion creatives associated with this creative set. This attribute is required.
   */
  companionCreativeIds: number[];

  /**
   * The date and time this creative set was last modified.
   */
  lastModifiedDateTime: DateTime;
};

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeSetService.CreativeSet CreativeSet} objects.
 */
export type CreativeSetPage = PageResult<CreativeSet>;
