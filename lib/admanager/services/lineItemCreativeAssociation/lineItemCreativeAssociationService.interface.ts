import { Statement, UpdateResult } from '../../../common/types';
import {
  CreativeNativeStylePreview,
  CreativePushOptions,
  LineItemCreativeAssociation,
  LineItemCreativeAssociationAction,
  LineItemCreativeAssociationPage,
} from './lineItemCreativeAssociation.type';

/**
 * Provides operations for creating, updating and retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation LineItemCreativeAssociation} objects.
 *
 * A line item creative association (LICA) associates a {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative Creative}
 * with a {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem}.
 * When a line item is selected to serve, the LICAs specify which creatives can appear for the ad units that are targeted by the line item.
 * In order to be associated with a line item, the creative must have a size that exists within the attribute
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem#creativePlaceholders LineItem.creativePlaceholders}.
 *
 * Each LICA has a start and end date and time that defines when the creative should be displayed.
 *
 * To read more about associating creatives with line items, see this{@link https://support.google.com/dfp_premium/answer/3187916  DFP Help Center} article.
 */
export interface LineItemCreativeAssociationServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation LineItemCreativeAssociation} objects.
   *
   * @param lineItemCreativeAssociations the line item creative associations to create
   * @returns the created line item creative associations with their IDs filled in
   */
  createLineItemCreativeAssociations(
    lineItemCreativeAssociations: LineItemCreativeAssociation[],
  ): Promise<LineItemCreativeAssociation[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociationPage LineItemCreativeAssociationPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation LineItemCreativeAssociation} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property                 | PQL Property                                                                                                                                                                                                                |
   * | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | creativeId                   | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation#creativeId LineItemCreativeAssociation.creativeId}                                     |
   * | manualCreativeRotationWeight | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation#manualCreativeRotationWeight LineItemCreativeAssociation.manualCreativeRotationWeight} |
   * | destinationUrl               | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation#destinationUrl LineItemCreativeAssociation.destinationUrl}                             |
   * | lineItemId                   | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation#lineItemId LineItemCreativeAssociation.lineItemId}                                     |
   * | status                       | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation#status LineItemCreativeAssociation.status}                                             |
   * | lastModifiedDateTime         | {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation#lastModifiedDateTime LineItemCreativeAssociation.lastModifiedDateTime}                 |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of line item creative associations
   * @returns the line item creative associations that match the given filter
   */
  getLineItemCreativeAssociationsByStatement(
    filterStatement: Statement,
  ): Promise<LineItemCreativeAssociationPage>;
  /**
   * Returns an insite preview URL that references the specified site URL with the specified creative from the association served to it.
   * For Creative Set previewing you may specify the master creative Id.
   *
   * @param lineItemId the ID of the line item, which must already exist
   * @param creativeId the ID of the creative, which must already exist
   * @param siteUrl the URL of the site that the creative should be previewed in
   *
   * @returns a URL that references the specified site URL with the specified creative served to it
   */
  getPreviewUrl(
    lineItemId: number,
    creativeId: number,
    siteUrl: string,
  ): Promise<string>;
  /**
   * Returns a list of URLs that reference the specified site URL with the specified creative from the association served to it.
   * For Creative Set previewing you may specify the master creative Id.
   * Each URL corresponds to one available native style for previewing the specified creative.
   *
   * @param lineItemId the ID of the line item, which must already exist
   * @param creativeId the ID of the creative, which must already exist and must be a native creative
   * @param siteUrl the URL of the site that the creative should be previewed in
   *
   * @returns the URLs that references the specified site URL and can be used to preview the specified creative with the available native styles
   */
  getPreviewUrlsForNativeStyles(
    lineItemId: number,
    creativeId: number,
    siteUrl: string,
  ): Promise<CreativeNativeStylePreview[]>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation LineItemCreativeAssociation}
   * objects that match the given {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.Statement#query Statement.query}.
   *
   * @param LineItemCreativeAssociationAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of line item creative associations
   * @returns	the result of the action performed
   */
  performLineItemCreativeAssociationAction(
    lineItemCreativeAssociationAction: LineItemCreativeAssociationAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Pushes a creative to devices that that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.Statement#query Statement.query}. *
   *
   * @param filterStatement a Publisher Query Language statement on the ID, Name, UserId and LinkedDeviceVisibility fields of the LinkedDevice table.
   * @param options criteria to use to push a given creative.
   */
  pushCreativeToDevices(
    filterStatement: Statement,
    options: CreativePushOptions,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation LineItemCreativeAssociation} objects.
   *
   * @param lineItemCreativeAssociations the line item creative associations to update
   * @returns the updated line item creative associations
   */
  updateLineItemCreativeAssociations(
    lineItemCreativeAssociations: LineItemCreativeAssociation[],
  ): Promise<LineItemCreativeAssociation[]>;
}
