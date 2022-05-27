import { ApprovalStatus, DisapprovalReasonType } from './site.enum';
import { PageResult } from '@common/types';

export type DisapprovalReason = {
  type: DisapprovalReasonType;
  details: string;
};

export type Site = {
  id: number;
  url: string;
  childNetworkCode: string;
  approvalStatus: ApprovalStatus;
  active: boolean;
  disapprovalReasons: DisapprovalReason[];
};

export type SiteAction = 'DeactivateSite' | 'SubmitSiteForApproval';

export type SitePage = PageResult<Site>;
