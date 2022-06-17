import { NativeStyle, NativeStylePage } from './nativeStyle.type';
import { Statement, UpdateResult } from '../../../common/types';
import { NativeStyleAction } from './nativeStyle.action';

/**
 * Provides operations for creating, updating and retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/NativeStyleService.NativeStyle NativeStyle} objects.
 */
export interface NativeStyleServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/NativeStyleService.NativeStyle NativeStyle} objects.
   *
   * @param nativeStyles the native styles to create
   * @returns the created native styles with their IDs filled in
   */
  createNativeStyles(nativeStyles: NativeStyle[]): Promise<NativeStyle[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/NativeStyleService.NativeStylePage NativeStylePage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/NativeStyleService.NativeStyle NativeStyle} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/NativeStyleService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property         | PQL Property                                                                                                                                    |
   * | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id                   | {@link https://developers.google.com/ad-manager/api/reference/v202202/NativeStyleService.NativeStyle#id NativeStyle.id}                                     |
   * | name                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/NativeStyleService.NativeStyle#name NativeStyle.name}                                 |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of native styles
   * @returns the native styles that match the given filter
   */
  getNativeStylesByStatement(filterStatement: Statement): Promise<NativeStylePage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/NativeStyleService.NativeStyle native styles} objects that match the given Statement.
   *
   * @param nativeStyleAction the action to perform
   * @param filterStatement a PQL statement used to filter native styles
   * @returns the result of the action performed
   */
  performNativeStyleAction(nativeStyleAction: NativeStyleAction, filterStatement: Statement): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/NativeStyleService.NativeStyle NativeStyle} objects.
   *
   * @param nativeStyles the native styles to update
   * @returns the updated native styles
   */
  updateNativeStyles(nativeStyles: NativeStyle[]): Promise<NativeStyle[]>;
}
