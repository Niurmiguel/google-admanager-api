/**
 * The type of the company. Once a company is created, it is not possible to change its type.
 */
export enum CompanyType {
  /**
   * The publisher's own advertiser. When no outside advertiser buys its inventory, the publisher may run its own advertising campaigns.
   */
  HOUSE_ADVERTISER = 'HOUSE_ADVERTISER',
  /**
   * The publisher's own agency.
   */
  HOUSE_AGENCY = 'HOUSE_AGENCY',
  /**
   * A business entity that buys publisher inventory to run advertising campaigns. An advertiser is optionally associated with one or more agencies.
   */
  ADVERTISER = 'ADVERTISER',
  /**
   * A business entity that offers services, such as advertising creation, placement, and management, to advertisers.
   */
  AGENCY = 'AGENCY',
  /**
   * A company representing multiple advertisers and agencies.
   */
  AD_NETWORK = 'AD_NETWORK',
  /**
   * A company representing a partner.
   */
  PARTNER = 'PARTNER',
  /**
   * A company representing a child network.
   */
  CHILD_PUBLISHER = 'CHILD_PUBLISHER',
  /**
   * A company representing a viewability provider.
   */
  VIEWABILITY_PROVIDER = 'VIEWABILITY_PROVIDER',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Specifies the credit-worthiness of the company for which the publisher runs an order.
 * By doing so, the publisher can control the running of campaigns for the company.
 * A publisher can choose between Basic and Advanced Credit Status settings.
 * This feature needs to be enabled in the Ad Manager web site. Also the kind of setting you need - Basic or Advanced must be configured.
 * If Basic is enabled then, the values allowed are ACTIVE and INACTIVE. If Advanced is chosen, then all values are allowed.
 * Choosing an Advanced setting when only the Basic feature has been enabled, or using the Basic setting without turning the feature on will result in an error.
 */
export enum CompanyCreditStatus {
  /**
   * When the credit status is active, all line items in all orders belonging to the company will be served. This is a Basic as well as an Advanced Credit Status setting.
   */
  ACTIVE = 'ACTIVE',
  /**
   * When the credit status is on hold, the publisher cannot activate new line items of the company. However, line items that were activated before the credit status change will remain active. You can still create orders and line items for the company. This is an Advanced Credit Status setting.
   */
  ON_HOLD = 'ON_HOLD',
  /**
   * When the credit status is credit stop, the publisher cannot activate new line items of the company. However, line items that were activated before the credit status change will remain active. You cannot create any new orders or line items for the company. This is an Advanced Credit Status setting.
   */
  CREDIT_STOP = 'CREDIT_STOP',
  /**
   * When the credit status is inactive, the publisher cannot activate new line items of the company. However, line items that were activated before the credit status change will remain active. You cannot create any new orders or line items for the company. It is used to mark companies with which business is to be discontinued. Such companies are not listed in Ad Manager web site. This is a Basic as well as an Advanced Credit Status setting.
   */
  INACTIVE = 'INACTIVE',
  /**
   * When the credit status of a company is marked blocked, then all active line items belonging to the company will stop serving with immediate effect. You cannot active new line items of the company nor can you create any new orders or line items belonging to the company. This is an Advanced Credit Status setting.
   */
  BLOCKED = 'BLOCKED',
}
