import { LineItemTemplatePage } from './lineItemTemplate.type';
import { Statement } from '@common/types';

/**
 * Provides operations for creating, updating and retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemTemplateService.LineItemTemplate LineItemTemplate} objects.
 */
export interface LineItemTemplateServiceOperations {
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemTemplateService.LineItemTemplatePage LineItemTemplatePage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemTemplateService.LineItemTemplate LineItemTemplate} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemTemplateService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                                   |
   * | ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
   * | id           | {@link  https://developers.google.com/ad-manager/api/reference/v202202/LineItemTemplateService.LineItemTemplate#id LineItemTemplate.id} |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of line item templates
   * @returns the line item templates that match the given filter
   */
  getLineItemTemplatesByStatement(
    filterStatement: Statement,
  ): Promise<LineItemTemplatePage>;
}
