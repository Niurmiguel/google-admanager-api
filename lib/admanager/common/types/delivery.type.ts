/**
 * Indicates the delivery performance of the LineItem.
 */
export type DeliveryIndicator = {
  /**
   * How much the LineItem was expected to deliver as a percentage of LineItem.primaryGoal.
   */
  expectedDeliveryPercentage: number;
  /**
   * How much the line item actually delivered as a percentage of LineItem.primaryGoal.
   */
  actualDeliveryPercentage: number;
};

/**
 * Holds the number of clicks or impressions, determined by LineItem.costType, delivered for a single line item for the last 7 days
 */
export type DeliveryData = {
  /**
   *  Clicks or impressions delivered for the last 7 days.
   */
  units: number[];
};
