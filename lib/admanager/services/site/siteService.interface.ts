import { Site, SiteAction, SitePage } from './site.type';
import { Statement, UpdateResult } from '../../../common/types';

export interface SiteServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/SiteService.Site Site} objects.
   *
   * @param sites the sites to create
   * @returns the created sites with their IDs filled in
   */
  createSites(sites: Site[]): Promise<Site[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/SiteService.SitePage SitePage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/SiteService.Site Site} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/SiteService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property     | PQL Property                                                                                                                   |
   * | ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
   * | id               | {@link https://developers.google.com/ad-manager/api/reference/v202202/SiteService.Site#id Site.id}                             |
   * | url              | {@link https://developers.google.com/ad-manager/api/reference/v202202/SiteService.Site#url Site.url}                           |
   * | childNetworkCode | {@link https://developers.google.com/ad-manager/api/reference/v202202/SiteService.Site#childNetworkCode Site.childNetworkCode} |
   * | approvalStatus   | {@link https://developers.google.com/ad-manager/api/reference/v202202/SiteService.Site#approvalStatus Site.approvalStatus}     |
   * | active           | {@link https://developers.google.com/ad-manager/api/reference/v202202/SiteService.Site#active Site.active}                     |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of sites
   * @returns the sites that match the given filter
   */
  getSitesByStatement(filterStatement: Statement): Promise<SitePage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/SiteService.Site Site} objects that match the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/SiteService.Statement#query Statement.query}.
   *
   * @param siteAction the action to perform
   * @param filterStatement 	a PQL statement used to filter sites
   * @returns 	the result of the action performed
   */
  performSiteAction(
    siteAction: SiteAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/SiteService.Site Site} objects.
   *
   * The {@link https://developers.google.com/ad-manager/api/reference/v202202/SiteService.Site#childNetworkCode Site.childNetworkCode} can be updated in order to 1) change the child network, 2) move a site from O&O to represented, or 3) move a site from represented to O&O.
   *
   * @param sites the sites to update
   * @returns the updated sites
   */
  updateSites(sites: Site[]): Promise<Site[]>;
}
