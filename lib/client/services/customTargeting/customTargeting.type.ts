import { PageResult } from '../../../common/types';
import {
  CustomTargetingKeyStatus,
  CustomTargetingKeyType,
  CustomTargetingValueMatchType,
  CustomTargetingValueStatus,
  ReportableType,
  ValueDeclarationType,
} from './customTargeting.enum';

/**
 * **`CustomTargetingKey`** represents a key used for custom targeting.
 */
export type CustomTargetingKey = {
  /**
   * The ID of the CustomTargetingKey. This value is readonly and is populated by Google.
   */
  id: number;
  /**
   * Name of the key. This can be used for encoding .
   * If you don't want users to be able to see potentially sensitive targeting information in the ad tags of your site, you can encode your key/values.
   * For example, you can create key/value g1=abc to represent gender=female.
   * Keys can contain up to 10 characters each.
   * You can use alphanumeric characters and symbols other than the following: ", ', =, !, +, #, *, ~, ;, ^, (, ), <, >, [, ], the white space character.
   */
  name: string;
  /**
   * Descriptive name for the key.
   */
  displayName: string;
  /**
   * Indicates whether users will select from predefined values or create new targeting values, while specifying targeting criteria for a line item.
   */
  type: CustomTargetingKeyType;
  /**
   * Indicates the type of values being passed for this key in ad requests. This field is nullable for a key until it is set, after which it cannot be reset back to null.
   */
  valueDeclarationType: ValueDeclarationType;
  /**
   * Status of the CustomTargetingKey. This field is read-only. A key can be activated and deactivated by calling CustomTargetingService.performCustomTargetingKeyAction.
   */
  status: CustomTargetingKeyStatus;
  /**
   * Reportable state of a {@CustomTargetingKey} as defined in ReportableType.
   */
  reportableType: ReportableType;
};

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey CustomTargetingKey} objects.
 */
export type CustomTargetingKeyPage = PageResult<CustomTargetingKey>;

/**
 * CustomTargetingValue represents a value used for custom targeting.
 */
export type CustomTargetingValue = {
  /**
   * The ID of the CustomTargetingKey for which this is the value.
   */
  customTargetingKeyId: number;

  /**
   * The ID of the CustomTargetingValue. This value is readonly and is populated by Google.
   */
  id: number;

  /**
   * Name of the value. This can be used for encoding .
   * If you don't want users to be able to see potentially sensitive targeting information in the ad tags of your site, you can encode your key/values.
   * For example, you can create key/value g1=abc to represent gender=female. Values can contain up to 40 characters each.
   * You can use alphanumeric characters and symbols other than the following: ", ', =, !, +, #, *, ~, ;, ^, (, ), <, >, [, ].
   * Values are not data-specific; all values are treated as string. For example, instead of using "age>=18 AND <=34", try "18-34"
   */
  name: string;

  /**
   * Descriptive name for the value.
   */
  displayName: string;

  /**
   *  The way in which the CustomTargetingValue.name strings will be matched.
   */
  matchType: CustomTargetingValueMatchType;
  /**
   * Status of the CustomTargetingValue. This field is read-only.
   * A value can be activated and deactivated by calling CustomTargetingService.performCustomTargetingValueAction.
   */
  status: CustomTargetingValueStatus;
};

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue CustomTargetingValue} objects.
 */
export type CustomTargetingValuePage = PageResult<CustomTargetingValue>;
