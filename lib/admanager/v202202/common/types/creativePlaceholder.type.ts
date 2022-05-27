import { AppliedLabel, Size } from '.';
import { CreativeSizeType } from '../enums';

/**
 * A CreativePlaceholder describes a slot that a creative is expected to fill.
 * This is used primarily to help in forecasting, and also to validate that the correct creatives are associated with the line item.
 * A CreativePlaceholder must contain a size, and it can optionally contain companions.
 * Companions are only valid if the line item's environment type is EnvironmentType.VIDEO_PLAYER.
 */
export type CreativePlaceholder = {
  /**
   * The dimensions that the creative is expected to have. This attribute is required.
   */
  size: Size;
  /**
   * The native creative template ID.
   *
   * This value is only required if creativeSizeType is CreativeSizeType.NATIVE.
   */
  creativeTemplateId: number;
  /**
   * The companions that the creative is expected to have. This attribute can only be set if the line item it belongs to has a LineItem.environmentType of EnvironmentType.VIDEO_PLAYER or LineItem.roadblockingType of RoadblockingType.CREATIVE_SET.
   */
  companions: CreativePlaceholder[];
  /**
   * The set of label frequency caps applied directly to this creative placeholder.
   */
  appliedLabels: AppliedLabel[];
  /**
   * Contains the set of labels applied directly to this creative placeholder as well as those inherited from the creative template from which this creative placeholder was instantiated. This field is readonly and is assigned by Google.
   */
  effectiveAppliedLabels: AppliedLabel[];
  /**
   * Expected number of creatives that will be uploaded corresponding to this creative placeholder. This estimate is used to improve the accuracy of forecasting; for example, if label frequency capping limits the number of times a creative may be served.
   */
  expectedCreativeCount: number;
  /**
   * Describes the types of sizes a creative can be. By default, the creative's size is CreativeSizeType.PIXEL, which is a dimension based size (width-height pair).
   */
  creativeSizeType: CreativeSizeType;
  /**
   * The name of the CreativeTargeting for creatives this placeholder represents.
   *
   * This attribute is optional. Specifying creative targeting here is for forecasting purposes only and has no effect on serving. The same creative targeting should be specified on a LineItemCreativeAssociation when associating a Creative with the LineItem.
   */
  targetingName: string;
  /**
   * Indicate if the expected creative of this placeholder has an AMP only variant.
   *
   * This attribute is optional. It is for forecasting purposes only and has no effect on serving.
   */
  isAmpOnly: boolean;
};
