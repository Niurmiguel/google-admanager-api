import { StartDateTimeType } from '@common/enums';
import { DateTime, PageResult } from '@common/types';
import { Money, Size, Stats } from '@v202202/common/types';
import { LineItemCreativeAssociationStatus } from './lineItemCreativeAssociation.enum';

/**
 * This represents an entry in a map with a key of type Long and value of type Stats.
 */
export type Long_StatsMapEntry = {
  key: number;

  value: Stats;
};

/**
 * Contains statistics such as impressions, clicks delivered and cost for LineItemCreativeAssociation objects.
 */
export type LineItemCreativeAssociationStats = {
  /**
   *  A Stats object that holds delivered impressions and clicks statistics.
   */
  stats: Stats;

  /**
   * A map containing Stats objects for each creative belonging to a creative set, null for non creative set associations.
   */
  creativeSetStats: Long_StatsMapEntry[];

  /**
   * The revenue generated thus far by the creative from its association with the particular line item in the publisher's currency.
   */
  costInOrderCurrency: Money;
};

/**
 * A LineItemCreativeAssociation associates a {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative Creative}
 * or {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeSetService.CreativeSet CreativeSet} with a
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem}
 * so that the creative can be served in ad units targeted by the line item.
 */
export type LineItemCreativeAssociation = {
  /**
   * The ID of the LineItem to which the Creative should be associated. This attribute is required.
   */
  lineItemId: number;
  /**
   * The ID of the Creative being associated with a LineItem.
   *
   * This attribute is required if this is an association between a line item and a creative.
   * This attribute is ignored if this is an association between a line item and a creative set.
   *
   * If this is an association between a line item and a creative, when retrieving the line item creative association, the creativeId will be the creative's ID.
   * If this is an association between a line item and a creative set, when retrieving the line item creative association, the creativeId will be the ID of the master creative.
   */
  creativeId: number;
  /**
   * The ID of the CreativeSet being associated with a LineItem. This attribute is required if this is an association between a line item and a creative set.
   *
   * This field will be null when retrieving associations between line items and creatives not belonging to a set.
   */
  creativeSetId: number;
  /**
   * The weight of the Creative. This value is only used if the line item's creativeRotationType is set to CreativeRotationType.MANUAL. This attribute is optional and defaults to 10.
   */
  manualCreativeRotationWeight: number;
  /**
   * The sequential rotation index of the Creative. This value is used only if the associated line item's LineItem.creativeRotationType is set to CreativeRotationType.SEQUENTIAL. This attribute is optional and defaults to 1.
   */
  sequentialCreativeRotationIndex: number;
  /**
   * Overrides the value set for LineItem.startDateTime. This value is optional and is only valid for Ad Manager 360 networks.
   */
  startDateTime: DateTime;
  /**
   * Specifies whether to start serving to the LineItemCreativeAssociation right away, in an hour, etc.
   * This attribute is optional and defaults to StartDateTimeType.USE_START_DATE_TIME.
   */
  startDateTimeType: StartDateTimeType;
  /**
   * Overrides LineItem.endDateTime. This value is optional and is only valid for Ad Manager 360 networks.
   */
  endDateTime: DateTime;
  /**
   * Overrides the value set for HasDestinationUrlCreative.destinationUrl. This value is optional and is only valid for Ad Manager 360 networks.
   */
  destinationUrl: string;
  /**
   * Overrides the value set for Creative.size, which allows the creative to be served to ad units that would otherwise not be compatible for its actual size. This value is optional.
   */
  sizes: Size[];
  /**
   * The status of the association. This attribute is read-only.
   */
  status: LineItemCreativeAssociationStatus;
  /**
   * Contains trafficking statistics for the association.
   * This attribute is readonly and is populated by Google. This will be null in case there are no statistics for the association yet.
   */
  stats: LineItemCreativeAssociationStats;
  /**
   * The date and time this association was last modified.
   */
  lastModifiedDateTime: DateTime;
  /**
   * Specifies CreativeTargeting for this line item creative association.
   *
   * This attribute is optional. It should match the creative targeting specified on the corresponding CreativePlaceholder in the LineItem that is being associated with the Creative.
   */
  targetingName: string;
};

/**
 * Represents the actions that can be performed on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation LineItemCreativeAssociation} objects.
 */
export type LineItemCreativeAssociationAction =
  | 'ActivateLineItemCreativeAssociations'
  | 'DeactivateLineItemCreativeAssociations'
  | 'DeleteLineItemCreativeAssociations';

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation LineItemCreativeAssociation} objects.
 */
export type LineItemCreativeAssociationPage =
  PageResult<LineItemCreativeAssociation>;

/**
 * Represents the {@link https://developers.google.com/ad-manager/api/reference/v202202/NativeStyleService.NativeStyle NativeStyle}
 * of a {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative Creative} and its corresponding preview URL.
 */
export type CreativeNativeStylePreview = {
  /**
   * The id of the NativeStyle.
   */
  nativeStyleId: number;
  /**
   * The URL for previewing this creative using this particular NativeStyle
   */
  previewUrl: string;
};

/**
 * Data needed to push a creative to a mobile device.
 */
export type CreativePushOptions = {
  /**
   * The ID of the LineItem to preview.
   *
   * This field is required.
   */
  lineItemId: number;
  /**
   * The ID of the Creative to preview.
   *
   * This field is required.
   */
  creativeId: number;
  /**
   * The ID of the native style to preview the creative with.
   *
   * This field is optional but the referenced object must exist.
   */
  nativeStyleId: number;
};
