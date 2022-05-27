import { ActivityGroup, ActivityGroupPage } from './activityGroup.type';
import { Statement } from '@common/types';

/**
 * Provides methods for creating, updating and retrieving
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityGroupService.ActivityGroup ActivityGroup} objects.
 *
 * An activity group contains {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityService.Activity Activity} objects.
 * Activities have a many-to-one relationship with activity groups, meaning each activity can belong to only one activity group,
 * but activity groups can have multiple activities. An activity group can be used to manage the activities it contains.
 */
export interface ActivityGroupServiceOperations {
  /**
   * Creates a new ActivityGroup objects.
   *
   * @param activityGroups the activity groups to be created.
   * @returns the created activity groups with their IDs filled in.
   */
  createActivityGroups(
    activityGroups: ActivityGroup[],
  ): Promise<ActivityGroup[]>;
  /**
   * Gets an {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityGroupService.ActivityGroupPage ActivityGroupPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityGroupService.ActivityGroup ActivityGroup} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityGroupService.Statement#query Statement.query}. The following fields are supported for filtering:
   *
   * | PQL Property        | PQL Property                                                                                                                                                    |
   * | ------------        | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id                  | {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityGroupService.ActivityGroup##id ActivityGroup.id}                                  |
   * | name                | {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityGroupService.ActivityGroup##name ActivityGroup.name}                              |
   * | impressionsLookback | {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityGroupService.ActivityGroup#impressionsLookback ActivityGroup.impressionsLookback} |
   * | clicksLookback      | {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityGroupService.ActivityGroup##clicksLookback Order.clicksLookback}                  |
   * | status              | {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityGroupService.ActivityGroup##status ActivityGroup.status}                          |
   *
   * @param filterStatement a statement used to filter a set of activity groups
   * @returns the activity groups that match the given filter
   */
  getActivityGroupsByStatement(
    filterStatement: Statement,
  ): Promise<ActivityGroupPage>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/ActivityGroupService.ActivityGroup ActivityGroup} objects.
   *
   * @param activityGroups the activity groups to update.
   * @returns 	the updated activity groups.
   */
  updateActivityGroups(
    activityGroups: ActivityGroup[],
  ): Promise<ActivityGroup[]>;
}
