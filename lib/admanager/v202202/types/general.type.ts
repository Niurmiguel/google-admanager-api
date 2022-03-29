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
