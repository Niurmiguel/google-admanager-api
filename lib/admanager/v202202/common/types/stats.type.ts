/**
 * Stats contains trafficking statistics for LineItem and LineItemCreativeAssociation objects
 */
export type Stats = {
  /**
   * The number of impressions delivered.
   */
  impressionsDelivered: number;
  /**
   * The number of clicks delivered.
   */
  clicksDelivered: number;
  /**
   * The number of video completions delivered.
   */
  videoCompletionsDelivered: number;
  /**
   * The number of video starts delivered.
   */
  videoStartsDelivered: number;
  /**
   * The number of viewable impressions delivered.
   */
  viewableImpressionsDelivered: number;
};
