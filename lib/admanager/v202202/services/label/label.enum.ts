/**
 * Represents the types of labels supported.
 */
export enum LabelType {
  /**
   * Allows for the creation of labels to exclude competing ads from showing on the same page.
   */
  COMPETITIVE_EXCLUSION = 'COMPETITIVE_EXCLUSION',
  /**
   * Allows for the creation of limits on the frequency that a user sees a particular type of creative over a portion of the inventory.
   */
  AD_UNIT_FREQUENCY_CAP = 'AD_UNIT_FREQUENCY_CAP',
  /**
   * Allows for the creation of labels to exclude ads from showing against a tag that specifies the label as an exclusion.
   */
  AD_EXCLUSION = 'AD_EXCLUSION',
  /**
   * Allows for the creation of labels that can be used to force the wrapping of a delivering creative with header/footer creatives. These labels are paired with a CreativeWrapper.
   */
  CREATIVE_WRAPPER = 'CREATIVE_WRAPPER',
  /**
   * Allows for the creation of labels mapped to a Google canonical ad category, which can be used for competitive exclusions and blocking across Google systems.
   */
  CANONICAL_CATEGORY = 'CANONICAL_CATEGORY',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
