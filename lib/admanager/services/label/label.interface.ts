import { Label, LabelAction, LabelPage } from './label.type';
import { Statement, UpdateResult } from '../../../common/types';

/**
 * Provides methods for the creation and management of Labels.
 */
export interface LabelServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label Label} objects.
   *
   * @param labels the labels to create
   * @returns the created labels with their IDs filled in
   */
  createLabels(labels: Label[]): Promise<Label[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.LabelPage LabelPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label Label} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                            |
   * | ------------ | ----------------------------------------------------------------------------------------------------------------------- |
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label#id Label.id}                   |
   * | type         | {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label#type Label.type}               |
   * | name         | {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label#name Label.name}               |
   * | description  | {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label#description Label.description} |
   * | isActive     | {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label#isActive Label.isActive}       |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of labels.
   * @returns the labels that match the given filter
   */
  getLabelsByStatement(filterStatement: Statement): Promise<LabelPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label Label} objects that match the given Statement.
   *
   * @param labelAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of labels
   * @returns	the result of the action performed
   */
  performLabelAction(
    labelAction: LabelAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label Label} objects.
   *
   * @param labels the labels to update
   * @returns the updated labels
   */
  updateLabels(labels: Label[]): Promise<Label[]>;
}
