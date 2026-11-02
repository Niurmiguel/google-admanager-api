import { ApprovalStatus, DisapprovalReasonType } from './site.enum';
import { DateTime, PageResult } from '../../../common/types';

export type DisapprovalReason = {
  type: DisapprovalReasonType;
  details: string;
};

export type Site = {
  id: number;
  url: string;
  childNetworkCode: string;
  approvalStatus: ApprovalStatus;
  disapprovalReasons: DisapprovalReason[];
  /**
   * The latest site approval status change time.
   */
  approvalStatusUpdateTime?: DateTime;
};

export type SitePage = PageResult<Site>;
