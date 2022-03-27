import { Activity, ActivityPage } from '../types';
import { Statement } from '@common/types';

/**
 * Provides methods for creating, updating and retrieving
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity Activity} objects.
 *
 * An activity group contains {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity Activity} objects.
 * Activities have a many-to-one relationship with activity groups, meaning each activity can belong to only one activity group,
 * but activity groups can have multiple activities. An activity group can be used to manage the activities it contains.
 */
export interface ActivityServiceOperations {
  /**
   * Creates a new {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity Activity} objects.
   *
   * @param activities the activity to be created.
   * @returns the created activities with its IDs filled in.
   */
  createActivities(activities: Activity[]): Promise<Activity[]>;
  /**
   * Gets an {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.ActivityPage ActivityPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity Activity} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Statement#query Statement.query}. The following fields are supported for filtering:
   *
   * | PQL Property    | PQL Property                                                                                                                          |
   * | --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
   * | id              | {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity#id Activity.id}                        |
   * | name            | {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity#name Activity.name}                    |
   * | expectedURL     | {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity#expectedURL Activity.expectedURL}      |
   * | status          | {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity#status Activity.status}                |
   * | activityGroupId | {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity#activityGroupId Order.activityGroupId} |
   *
   * @param filterStatement a statement used to filter a set of activities.
   * @returns the activities that match the given filter.
   */
  getActivitiesByStatement(filterStatement: Statement): Promise<ActivityPage>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity Activity} objects.
   *
   * @param activities the activities to update.
   * @returns 	the updated activities.
   */
  updateActivities(activities: Activity[]): Promise<Activity[]>;
}
