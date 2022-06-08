import { PageResult } from '../../../common/types';
import { CreativeRotationType, DeliveryRateType, LineItemType, RoadblockingType } from '../../common/enums';

/**
 * Represents the template that populates the fields of a new line item being created.
 */
export type LineItemTemplate = {
  /**
   *  Uniquely identifies the LineItemTemplate. This attribute is read-only and is assigned by Google when a template is created.
   */
  id: number;
  /**
   * The name of the LineItemTemplate. This attribute is required.
   */
  name: string;
  /**
   * Whether or not the LineItemTemplate represents the default choices for creating a LineItem. Only one default LineItemTemplate is allowed per Network. This attribute is readonly.
   */
  isDefault: boolean;
  /**
   *  The default name of a new LineItem. This attribute is optional and has a maximum length of 127 characters.
   */
  lineItemName: string;
  /**
   * The default value for the LineItem.enabledForSameAdvertiserException field of a new LineItem. This attribute is required.
   */
  enabledForSameAdvertiserException: boolean;
  /**
   * The default notes for a new LineItem. This attribute is optional and has a maximum length of 65,535 characters.
   */
  notes: string;
  /**
   * The default type of a new LineItem. This attribute is required.
   */
  lineItemType: LineItemType;
  /**
   * The default delivery strategy for a new LineItem. This attribute is required.
   */
  deliveryRateType: DeliveryRateType;
  /**
   * The default roadblocking strategy for a new LineItem. This attribute is required.
   */
  roadblockingType: RoadblockingType;
  /**
   * The default creative rotation strategy for a new LineItem. This attribute is required.
   */
  reativeRotationType: CreativeRotationType;
};

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemTemplateService.LineItemTemplate LineItemTemplate} objects.
 */
export type LineItemTemplatePage = PageResult<LineItemTemplate>;
