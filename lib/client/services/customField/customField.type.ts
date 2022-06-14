import { PageResult } from '../../../common/types';
import { CustomFieldDataType, CustomFieldEntityType, CustomFieldVisibility } from './customField.enum';

/**
 * An option represents a permitted value for a custom field that has a
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#dataType CustomField.dataType} of
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldDataType#DROP_DOWN CustomFieldDataType.DROP_DOWN}.
 */
export type CustomFieldOption = {
  /**
   * Unique ID of this option. This value is readonly and is assigned by Google.
   */
  id: number;
  /**
   * The id of the custom field this option belongs to.
   */
  customFieldId: number;
  /**
   * The display name of this option.
   */
  displayName: string;
};

/**
 * A custom field that has the drop-down data type.
 */
export type DropDownCustomField = {
  /**
   * The options allowed for this custom field. This is read only.
   */
  options: CustomFieldOption[];
};

/**
 * An additional, user-created field on an entity.
 */
export type CustomField = {
  /**
   * Unique ID of the CustomField. This value is readonly and is assigned by Google.
   */
  id: number;
  /**
   * Name of the CustomField. This is value is required to create a custom field. The max length is 127 characters.
   */
  name: string;
  /**
   * A description of the custom field. This value is optional. The maximum length is 511 characters
   */
  description: string;
  /**
   *  Specifies whether or not the custom fields is active. This attribute is read-only.
   */
  isActive: boolean;
  /**
   * The type of entity that this custom field is associated with. This attribute is read-only if there exists a CustomFieldValue for this field.
   */
  entityType: CustomFieldEntityType;
  /**
   * The type of data this custom field contains. This attribute is read-only if there exists a CustomFieldValue for this field.
   */
  dataType: CustomFieldDataType;
  /**
   * How visible/accessible this field is in the UI.
   */
  visibility: CustomFieldVisibility;
} & DropDownCustomField;

/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField} objects.
 */
export type CustomFieldAction = 'ActivateCustomFields' | 'DeactivateCustomFields';

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField} objects.
 */
export type CustomFieldPage = PageResult<CustomField>;
