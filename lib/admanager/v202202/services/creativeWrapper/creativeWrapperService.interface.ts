import { Statement, UpdateResult } from '@common/types';
import {
  CreativeWrapper,
  CreativeWrapperAction,
  CreativeWrapperPage,
} from './creativeWrapper.type';

/**
 * Provides methods for the creation and management of creative wrappers.
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapper CreativeWrappers} allow HTML snippets to be served along with creatives.
 *
 * Creative wrappers must be associated with a
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.LabelType#CREATIVE_WRAPPER LabelType.CREATIVE_WRAPPER}
 * label and applied to ad units by {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit#appliedLabels AdUnit.appliedLabels}.
 */
export interface CreativeWrapperServiceOperations {
  /**
   * Creates a new CreativeWrapper objects. The following fields are required:
   *
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapper#labelId CreativeWrapper.labelId }
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapper#ordering CreativeWrapper.ordering }
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapper#header CreativeWrapper.header }
   * or {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapper#footer CreativeWrapper.footer }
   *
   * @param creativeWrappers the creative wrappers to create
   * @returns the creative wrappers with their IDs filled in
   */
  createCreativeWrappers(
    creativeWrappers: CreativeWrapper[],
  ): Promise<CreativeWrapper[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapperPage CreativeWrapperPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapper CreativeWrapper} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                                                    |
   * | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapper#id CreativeWrapper.id}                                     |
   * | labelId      | {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapper#labelId CreativeWrapper.labelId}                                 |
   * | status       | {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapper#status CreativeWrapper.status}                                 |
   * | ordering     | {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapper#ordering CreativeWrapper.lastModifiedDateTime} |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of creative wrappers.
   * @returns the creative wrappers that match the given filter
   */
  getCreativeWrappersByStatement(
    filterStatement: Statement,
  ): Promise<CreativeWrapperPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapper CreativeWrapper} objects that match the given Statement.
   *
   * @param creativeWrapperAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of labels
   * @returns the result of the action performed
   */
  performCreativeWrapperAction(
    creativeWrapperAction: CreativeWrapperAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified CreativeWrapper objects.
   *
   * @param creativeWrappers the creative wrappers to update
   * @returns the updated creative wrapper objects
   */
  updateCreativeWrappers(
    creativeWrappers: CreativeWrapper[],
  ): Promise<CreativeWrapper[]>;
}
