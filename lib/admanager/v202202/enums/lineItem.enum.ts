/**
 * LineItemType indicates the priority of a LineItem, determined by the way in which impressions are reserved to be served for it.
 */
export enum LineItemType {
  /**
   * 	The type of LineItem for which a percentage of all the impressions that are being sold are reserved.
   */
  SPONSORSHIP = 'SPONSORSHIP',

  /**
   * 	The type of LineItem for which a fixed quantity of impressions or clicks are reserved.
   */
  STANDARD = 'STANDARD',

  /**
   * 	The type of LineItem most commonly used to fill a site's unsold inventory if not contractually obligated to deliver a requested number of impressions. Users specify the daily percentage of unsold impressions or clicks when creating this line item.
   */
  NETWORK = 'NETWORK',

  /**
   * 	The type of LineItem for which a fixed quantity of impressions or clicks will be delivered at a priority lower than the LineItemType.STANDARD type.
   */
  BULK = 'BULK',

  /**
   * 	The type of LineItem most commonly used to fill a site's unsold inventory if not contractually obligated to deliver a requested number of impressions. Users specify the fixed quantity of unsold impressions or clicks when creating this line item.
   */
  PRICE_PRIORITY = 'PRICE_PRIORITY',

  /**
   * 	The type of LineItem typically used for ads that promote products and services chosen by the publisher. These usually do not generate revenue and have the lowest delivery priority.
   */
  HOUSE = 'HOUSE',

  /**
   * 	Represents a legacy LineItem that has been migrated from the DFP system. Such line items cannot be created any more. Also, these line items cannot be activated or resumed.
   */
  LEGACY_DFP = 'LEGACY_DFP',

  /**
   * 	The type of LineItem used for ads that track ads being served externally of Ad Manager, for example an email newsletter. The click through would reference this ad, and the click would be tracked via this ad.
   */
  CLICK_TRACKING = 'CLICK_TRACKING',

  /**
   * 	A LineItem using dynamic allocation backed by AdSense.
   */
  ADSENSE = 'ADSENSE',

  /**
   * 	A LineItem using dynamic allocation backed by the Google Ad Exchange.
   */
  AD_EXCHANGE = 'AD_EXCHANGE',

  /**
   * 	Represents a non-monetizable video LineItem that targets one or more bumper positions, which are short house video messages used by publishers to separate content from ad breaks.
   */
  BUMPER = 'BUMPER',

  /**
   * 	A LineItem using dynamic allocation backed by AdMob.
   */
  ADMOB = 'ADMOB',

  /**
   * 	The type of LineItem for which there are no impressions reserved, and will serve for a second price bid. All LineItems of type LineItemType.PREFERRED_DEAL should be created via a ProposalLineItem with a matching type. When creating a LineItem of type LineItemType.PREFERRED_DEAL, the ProposalLineItem.estimatedMinimumImpressions field is required.
   */
  PREFERRED_DEAL = 'PREFERRED_DEAL',

  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
