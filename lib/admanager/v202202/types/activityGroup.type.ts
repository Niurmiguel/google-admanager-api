import { PageResult } from '@common/types';
import { ActivityGroupStatus } from '../enums';

/**
 * Activities are organized within activity groups, which are sets of activities that share the same configuration.
 * You create and manage activities from within activity groups.
 */
export type ActivityGroup = {
  /**
   * The unique ID of the **ActivityGroup**. This attribute is readonly and is assigned by Google.
   */
  id: number;

  /**
   * The name of the **ActivityGroup**. This attribute is required to create an activity group and has a maximum length of 255 characters.
   */
  name: string;

  /**
   * The company ids whose ads will be included for conversion tracking on the activities in this group.
   * Only clicks and impressions of ads from these companies will lead to conversions on the containing activities.
   * This attribute is required when creating an activity group. The company types allowed are:
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company.Type#ADVERTISER Company.Type.ADVERTISER}, and
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company.Type#AD_NETWORK Company.Type.AD_NETWORK}, and
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company.Type#HOUSE_ADVERTISER Company.Type.HOUSE_ADVERTISER}
   */
  companyIds: number[];

  /**
   * Ad Manager records view-through conversions for users who have previously viewed an Ad Manager ad within the number of days
   * that you set here (1 to 30 days), then visits a webpage containing activity tags from this activity group.
   * To be counted, the ad needs to belong to one of the companies associated with the activity group.
   * This attribute is required to create an activity group.
   */
  impressionsLookback: number;

  /**
   * Ad Manager records click-through conversions for users who have previously clicked on an Ad Manager ad within the number of days
   * that you set here (1 to 30 days), then visits a webpage containing activity tags from this activity group.
   * To be counted, the ad needs to belong to one of the companies associated with the activity group.
   * This attribute is required to create an activity group.
   */
  clicksLookback: number;

  /**
   * The status of this activity group. This attribute is readonly.
   */
  status: ActivityGroupStatus;
};

/**
 * Captures a page of ActivityGroup objects.
 */
export type ActivityGroupPage = PageResult<ActivityGroup>;
