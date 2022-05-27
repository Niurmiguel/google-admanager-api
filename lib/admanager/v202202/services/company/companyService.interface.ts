import { Company, CompanyAction, CompanyPage } from './company.type';
import { Statement, UpdateResult } from '@common/types';

/**
 * Provides operations for creating, updating and retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company Company} objects.
 */
export interface CompanyServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company Company} objects.
   *
   * @param companies the companies to create
   * @returns the created companies with their IDs filled in
   */
  createCompanies(companies: Company[]): Promise<Company[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.CompanyPage CompanyPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company Company} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property         | PQL Property                                                                                                                                    |
   * | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id                   | {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company#id Company.id}                                     |
   * | name                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company#name Company.name}                                 |
   * | type                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company#type Company.type}                                 |
   * | lastModifiedDateTime | {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company#lastModifiedDateTime Company.lastModifiedDateTime} |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of companies
   * @returns the companies that match the given filter
   */
  getCompaniesByStatement(filterStatement: Statement): Promise<CompanyPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company Company} objects that match the given Statement.
   *
   * @param companyAction the action to perform
   * @param filterStatement 	a PQL statement used to filter companies
   * @returns 	the result of the action performed
   */
  performCompanyAction(
    companyAction: CompanyAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company Company} objects.
   *
   * @param companies the companies to update
   * @returns the updated companies
   */
  updateCompanies(companies: Company[]): Promise<Company[]>;
}
