import { PageResult } from '@common/types';
import {
  MobileApplicationPlatform,
  MobileApplicationStore,
} from './mobileApplication.enum';

/**
 * A mobile application that has been added to or "claimed" by the network to be used for targeting purposes. These mobile apps can come from various app stores.
 */
export type MobileApplication = {
  /**
   * Uniquely identifies the mobile application. This attribute is read-only and is assigned by Google when a mobile application is claimed.
   */
  id: number;

  /**
   * Uniquely identifies the mobile application. This attribute is read-only and is assigned by Google when a mobile application is claimed. The id field is being deprecated in favor of this new ID space.
   */
  applicationId: number;

  /**
   * The display name of the mobile application. This attribute is required and has a maximum length of 255 characters.
   */
  displayName: string;

  /**
   * The app store ID of the app to claim. This attribute is required for creation and then is read-only.
   */
  appStoreId: string;

  /**
   * The app stores the mobile application belongs to. This attribute is required for creation and is mutable to allow for third party app store linking.
   */
  appStores: MobileApplicationStore[];

  /**
   * The archival status of the mobile application. This attribute is read-only.
   */
  isArchived: boolean;

  /**
   * The name of the application on the app store. This attribute is read-only and populated by Google.
   */
  appStoreName: string;

  /**
   * The application code used to identify the app in the SDK. This attribute is read-only and populated by Google.
   *
   * Note that the UI refers to this as "App ID".
   */
  applicationCode: string;

  /**
   * The name of the developer of the mobile application. This attribute is read-only and populated by Google.
   */
  developerName: string;

  /**
   * The platform the mobile application runs on. This attribute is read-only and populated by Google.
   */
  platform: MobileApplicationPlatform;

  /**
   * Whether the mobile application is free on the app store it belongs to. This attribute is read-only and populated by Google.
   */
  isFree: boolean;

  /**
   * The download URL of the mobile application on the app store it belongs to. This attribute is read-only and populated by Google.
   */
  downloadUrl: string;
};

/**
 * Represents the actions that can be performed on mobile applications.
 */
export type MobileApplicationAction =
  | 'ArchiveMobileApplications'
  | 'UnarchiveMobileApplications';

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication mobile applications}.
 */
export type MobileApplicationPage = PageResult<MobileApplication>;
