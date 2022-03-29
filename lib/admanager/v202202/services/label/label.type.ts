import { PageResult } from '@common/types';
import { LabelType } from './label.enum';

/**
 * A canonical ad category.
 */
export type AdCategoryDto = {
  /**
   * Canonical ID of the ad category.
   */
  id: number;
  /**
   * Localized name of the category.
   */
  displayName: string;
  /**
   * ID of the category's parent, or 0 if it has no parent.
   */
  parentId: number;
};

/**
 * A Label is additional information that can be added to an entity.
 */
export type Label = {
  /**
   * Unique ID of the Label. This value is readonly and is assigned by Google.
   */
  id: number;
  /**
   * Name of the Label. This is value is required to create a label and has a maximum length of 127 characters.
   */
  name: string;
  /**
   * A description of the label. This value is optional and its maximum length is 255 characters.
   */
  description: string;
  /**
   * Specifies whether or not the label is active. This attribute is read-only.
   */
  isActive: boolean;
  /**
   * Indicates the Ad Category associated with the label.
   */
  adCategory: AdCategoryDto;
  /**
   * The types of the Label.
   */
  types: LabelType[];
};

/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label Label} objects.
 */
export type LabelAction = 'ActivateLabels' | 'DeactivateLabels';

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label Label} objects.
 */
export type LabelPage = PageResult<Label>;
