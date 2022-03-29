import { TimeUnit } from '@common/enums';
import { Value } from '@common/types';
import {
  AccountStatus,
  DeclarationType,
  DelegationStatus,
  DelegationType,
  OnboardingTask,
} from '../enums';

/**
 * Represents a set of declarations about what (if any) third party companies are associated with a given creative.
 *
 * This can be set at the network level, as a default for all creatives, or overridden for a particular creative.
 *
 */
export type ThirdPartyDataDeclaration = {
  declarationType: DeclarationType;
  thirdPartyCompanyIds: number[];
};

export type ChildPublisher = {
  approvedDelegationType: DelegationType;
  proposedDelegationType: DelegationType;
  status: DelegationStatus;
  accountStatus: AccountStatus;
  childNetworkCode: string;
  sellerId: string;
  proposedRevenueShareMillipercent: number;
  onboardingTasks: OnboardingTask[];
};

/**
 * Represents a money amount.
 */
export type Money = {
  /**
   * Three letter currency code in string format.
   */
  currencyCode: string;
  /**
   * Money values are always specified in terms of micros which are a millionth of the fundamental currency unit. For US dollars, $1 is 1,000,000 micros.
   */
  microAmount: number;
};

/**
 * Represents the dimensions of an {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit AdUnit},
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem} or
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative Creative}.
 *
 * For interstitial size (out-of-page), native, ignored and fluid size,
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.Size Size} must be 1x1.
 */
export type Size = {
  /**
   *  The width of the AdUnit, LineItem or Creative.
   */
  width: number;
  /**
   * The height of the AdUnit, LineItem or Creative.
   */
  height: number;
  /**
   * Whether this size represents an aspect ratio.
   */
  isAspectRatio: boolean;
};

/**
 * The value of a {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField} for a particular entity.
 */
export type BaseCustomFieldValue = {
  /**
   * Id of the **CustomField** to which this value belongs. This attribute is required.
   */
  customFieldId: number;
} & CustomFieldValue &
  DropDownCustomFieldValue;

/**
 * The value of a {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField}
 * that does not have a {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#dataType CustomField.dataType}
 * of {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldDataType#DROP_DOWN CustomFieldDataType.DROP_DOWN}.
 */
type CustomFieldValue = {
  /**
   * The value for this field. The appropriate type of **Value** is determined by the
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#dataType CustomField.dataType}
   * of the **CustomField** that this conforms to.
   *
   * | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldDataType CustomFieldDataType} | {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Value Value} type            |
   * | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
   * | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldDataType#STRING STRING}       | 	{@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.TextValue TextValue}        |
   * | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldDataType#NUMBER NUMBER}       | 	{@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.NumberValue NumberValue}    |
   * | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldDataType#TOGGLE TOGGLE}       | 	{@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.BooleanValue BooleanValue}  |
   *
   */
  value: Value;
};

/**
 * A {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.CustomFieldValue CustomFieldValue} for a
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField} that has a
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#dataType CustomField.dataType} of
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldDataType#DROP_DOWN CustomFieldDataType.DROP_DOWN}
 */
type DropDownCustomFieldValue = {
  /**
   * The {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldOption#id ID}
   * of the {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldOption CustomFieldOption} for this value.
   */
  customFieldOptionId: number;
};

/**
 * Represents a limit on the number of times a single viewer can be exposed to the same
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem} in a specified time period.
 */
export type FrequencyCap = {
  /**
   * The maximum number of impressions than can be served to a user within a specified time period.
   */
  maxImpressions: number;
  /**
   * The number of FrequencyCap#timeUnit to represent the total time period.
   */
  numTimeUnits: number;
  /**
   * The unit of time for specifying the time period.
   */
  timeUnit: TimeUnit;
};
