import { PageResult } from '../../../common/types';
import { RoleStatus } from './user.enum';

/**
 * The **`UserRecord`** represents the base class from which a **`User`** is derived.
 */
type UserRecord = {
  /**
   * The unique ID of the **User**. This attribute is readonly and is assigned by Google.
   */
  id: number;
  /**
   * The name of the **User**. It has a maximum length of 128 characters.
   */
  name: string;
  /**
   * The email or login of the **User**. In order to create a new user, you must already have a {@link https://www.google.com/accounts/ManageAccount Google Account}.
   */
  email: string;
  /**
   * The unique role ID of the **User**. Roles that are created by Google will have negative IDs.
   */
  roleId: number;
  /**
   * The name of the role assigned to the **User**. This attribute is readonly.
   */
  roleName: string;
};

/**
 * Represents a user of the system.
 *
 * Users may be assigned at most one {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.Role Role} per network.
 * Each role provides a user with permissions to perform specific operations.
 * Without a role, they will not be able to perform any actions.
 */
export type User = UserRecord & {
  /**
   * Specifies whether or not the **User** is active. An inactive user cannot log in to the system or perform any operations. This attribute is read-only.
   */
  isActive: boolean;
  /**
   * Specifies whether or not the User wants to permit the Publisher Display Ads system to send email notifications to their email address.
   * This attribute is optional and defaults to true.
   */
  isEmailNotificationAllowed: boolean;
  /**
   * An identifier for the **User** that is meaningful to the publisher.
   * This attribute is optional and has a maximum length of 255 characters.
   */
  externalId: string;
  /**
   * Whether the user is an OAuth2 service account user.
   * This attribute is read-only. Service account users can only be added through the UI.
   */
  isServiceAccount: boolean;
  /**
   * The long format timezone id (e.g. "America/Los_Angeles") used in the orders and line items UI for this **User**.
   * Set this to **null** to indicate that no such value is defined for the **User** - UI then defaults to using the Network's timezone.
   * This setting only affects the UI for this user and does not in particular affect the timezone of any dates and times returned in API responses.
   */
  ordersUiLocalTimeZoneId: string;
};

/**
 * Each **`Role`** provides a user with permissions to perform specific operations in the system.
 */
export type Role = {
  /**
   * The unique ID of the role. This value is readonly and is assigned by Google.
   * Roles that are created by Google will have negative IDs.
   */
  id: number;

  /**
   * The name of the role. This value is readonly and is assigned by Google.
   */
  name: string;

  /**
   * The description of the role. This value is readonly and is assigned by Google.
   */
  description: string;

  /**
   * The status of the {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.Role Role}.
   * This field is read-only and can have the values {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.RoleStatus#ACTIVE RoleStatus.ACTIVE}
   * (default) or {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.RoleStatus#INACTIVE RoleStatus.INACTIVE},
   * which determines the visibility of the role in the UI.
   */
  status: RoleStatus;
};

/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User User} objects.
 */
export type UserAction = {
  action: 'ActivateUsers' | 'DeactivateUsers';
};

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User User} objects
 */
export type UserPage = PageResult<User>;
