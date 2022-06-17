import { Statement, UpdateResult } from '../../../common/types';
import { Creative, CreativePage } from './creative.type';
import { CreativeAction } from './creative.action';

/**
 * Provides operations for creating, updating and retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative Creative} objects.
 *
 * For a creative to run, it must be associated with a {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem}
 * managed by the {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService LineItemCreativeAssociationService}.
 */
export interface CreativeServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative Creative} objects.
   *
   * @param creatives the creatives to create
   * @returns the created creatives with their IDs filled in
   */
  createCreatives(creatives: Creative[]): Promise<Creative[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.CreativePage CreativePage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative Creative} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property         | PQL Property                                                                                                                                    |
   * | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id                   | {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative#id Creative.id}                                     |
   * | name                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative#name Creative.name}                                 |
   * | advertiserId         | {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative#advertiserId Creative.advertiserId}                                 |
   * | width                | {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative#width Creative.width}                                 |
   * | height               | {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative#height Creative.height}                                 |
   * | lastModifiedDateTime | {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative#lastModifiedDateTime Creative.lastModifiedDateTime} |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of creatives
   * @returns the creatives that match the given filter
   */
  getCreativesByStatement(filterStatement: Statement): Promise<CreativePage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative Creative} objects that match the given Statement.
   *
   * @param CreativeAction the action to perform
   * @param filterStatement 	a PQL statement used to filter creatives
   * @returns 	the result of the action performed
   */
  performCreativeAction(creativeAction: CreativeAction, filterStatement: Statement): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative Creative} objects.
   *
   * @param creatives the creatives to update
   * @returns the updated creatives
   */
  updateCreatives(creatives: Creative[]): Promise<Creative[]>;
}
