import { Statement, UpdateResult } from '@common/types';
import {
  CustomField,
  CustomFieldAction,
  CustomFieldOption,
  CustomFieldPage,
} from './customField.type';

/**
 * Provides methods for the creation and management of {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField} objects.
 *
 */
export interface CustomFieldServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldOption CustomFieldOption} objects.
   *
   * The following fields are required:
   *
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#name CustomFieldOption.displayName}
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#name CustomFieldOption.customFieldId}
   *
   * @param customFieldOptions the custom fields to create
   * @returns the created custom field options with their IDs filled in
   */
  createCustomFieldOptions(
    customFieldOptions: CustomFieldOption[],
  ): Promise<CustomFieldOption[]>;
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField} objects.
   *
   * The following fields are required:
   *
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#name CustomField.name}
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#entityType CustomField.entityType}
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#dataType CustomField.dataType}
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#visibility CustomField.visibility}
   *
   * @param customFields the custom fields to create
   * @returns the created custom fields with their IDs filled in
   */
  createCustomFields(customFields: CustomField[]): Promise<CustomField[]>;
  /**
   * Returns the {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldOption CustomFieldOption}
   * uniquely identified by the given ID.
   *
   * @param customFieldOptionId the ID of the custom field option, which must already exist
   * @returns the CustomFieldOption uniquely identified by the given ID
   */
  getCustomFieldOption(customFieldOptionId: number): Promise<CustomFieldOption>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldPage CustomFieldPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                                            |
   * | ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#id CustomField.id}                 |
   * | entityType   | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#entityType CustomField.entityType} |
   * | name         | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#name CustomField.name}             |
   * | isActive     | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#isActive CustomField.isActive}     |
   * | visibility   | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#visibility CustomField.visibility} |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of custom fields.
   * @returns the custom fields that match the given filter
   */
  getCustomFieldsByStatement(
    filterStatement: Statement,
  ): Promise<CustomFieldPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField} objects that match the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.Statement#query Statement.query}.
   *
   * @param CustomFieldAction the action to perform
   * @param filterStatement	a Publisher Query Language statement used to filter a set of custom fields
   * @returns the result of the action performed
   */
  performCustomFieldAction(
    customFieldAction: CustomFieldAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldOption CustomFieldOption} objects.
   *
   * @param customFieldOptions the custom field options to update
   * @returns 	the updated custom field options
   */
  updateCustomFieldOptions(
    customFieldOptions: CustomFieldOption[],
  ): Promise<CustomFieldOption[]>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField} objects.
   *
   * @param customFields the custom fields to update
   * @returns the updated custom fields
   */
  updateCustomFields(customFields: CustomField[]): Promise<CustomField[]>;
}
