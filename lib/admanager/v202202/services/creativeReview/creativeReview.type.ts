import { PageResult } from '@common/types';

export type CreativeReview = {
  /**
   * This attribute is read-only.
   */
  id: string;
  /**
   * This attribute is read-only.
   */
  reviewableUrl: string;
  /**
   * This attribute is read-only.
   */
  impressions: number;
};

export type CreativeReviewAction =
  | 'ApproveCreativeReviews'
  | 'ArchiveCreativeReviews'
  | 'DisapproveCreativeReviews';

export type CreativeReviewPage = PageResult<CreativeReview>;
