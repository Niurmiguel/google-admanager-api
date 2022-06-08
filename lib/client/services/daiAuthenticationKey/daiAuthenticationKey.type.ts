import { DateTime, PageResult } from '../../../common/types';
import { DaiAuthenticationKeyStatus, DaiAuthenticationKeyType } from './daiAuthenticationKey.enum';

/**
 * A DaiAuthenticationKey is used to authenticate stream requests to the IMA SDK API.
 */
export type DaiAuthenticationKey = {
  /**
   * The unique ID of the DaiAuthenticationKey. This value is read-only and is assigned by Google.
   */
  id: number;
  /**
   * The value of the secure key. This value is read-only and is assigned by Google.
   */
  key: string;
  /**
   * The date and time this DaiAuthenticationKey was created. This value is read-only and is assigned by Google.
   */
  creationDateTime: DateTime;
  /**
   * The status of this DaiAuthenticationKey. This value is read-only and is assigned by Google.
   *
   * DAI authentication keys are created in the DaiAuthenticationKeyStatus.ACTIVE state. The status can only be modified through the DaiAuthenticationKeyService.performDaiAuthenticationKeyAction method.
   *
   * Only active keys will be accepted by the IMA SDK API as valid.
   */
  status: DaiAuthenticationKeyStatus;
  /**
   * The name for this DaiAuthenticationKey.
   */
  name: string;
  /**
   * The type of this key, which determines how it should be used on stream create requests.
   */
  keyType: DaiAuthenticationKeyType;
};

/**
 * Represents the actions that can be performed on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.DaiAuthenticationKey DaiAuthenticationKey} objects.
 */
export type DaiAuthenticationKeyAction = 'ActivateDaiAuthenticationKeys' | 'DeactivateDaiAuthenticationKeys';

/**
 * Captures a page of https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.DaiAuthenticationKey DaiAuthenticationKey} objects.
 */
export type DaiAuthenticationKeyPage = PageResult<DaiAuthenticationKey>;
