import { ActivityStatus, ActivityType } from '../enums';
import { PageResult } from '@common/types';

/**
 * An activity is a specific user action that an advertiser wants to track, such as the completion of a purchase or a visit to a webpage.
 * You create and manage activities in Ad Manager. When a user performs the action after seeing an advertiser's ad, that's a conversion.
 *
 * For example, you set up an activity in Ad Manager to track how many users visit an advertiser's promotional website after viewing or clicking on an ad.
 * When a user views an ad, then visits the page, that's one conversion.
 */
export type Activity = {
  /**
   * The unique ID of the **Activity**. This attribute is readonly and is assigned by Google.
   */
  id: number;
  /**
   * The ID of the {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityGroupService.ActivityGroup ActivityGroup} \
   * that this {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity Activity} belongs to.
   */
  activityGroupId: number;
  /**
   * The name of the **Activity**.This attribute is required and has a maximum length of 255 characters.
   */
  name: string;
  /**
   * The URL of the webpage where the tags from this activity will be placed. This attribute is optional.
   */
  expectedURL: string;
  /**
   *  The status of this activity. This attribute is readonly.
   */
  status: ActivityStatus;
  /**
   * The activity type. This attribute is optional and defaults to
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity.Type#PAGE_VIEWS Activity.Type.PAGE_VIEWS}
   */
  type: ActivityType;
};

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity Activity} objects.
 */
export type ActivityPage = PageResult<Activity>;
