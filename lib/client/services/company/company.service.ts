import { Client } from 'soap';

import { CompanyServiceOperations } from './companyService.interface';
import { Company, CompanyAction, CompanyPage } from './company.type';
import { Statement, UpdateResult } from '../../../common/types';

export class CompanyService implements CompanyServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createCompanies(companies: Company[]): Promise<Company[]> {
    return this._client.createCompanies({ companies });
  }

  async getCompaniesByStatement(filterStatement: Statement): Promise<CompanyPage> {
    return this._client.getCompaniesByStatement({
      filterStatement,
    });
  }

  async performCompanyAction(companyAction: CompanyAction, filterStatement: Statement): Promise<UpdateResult> {
    return this._client.performCompanyAction({
      companyAction: {
        attributes: {
          'xsi:type': companyAction,
        },
      },
      filterStatement,
    });
  }

  async updateCompanies(companies: Company[]): Promise<Company[]> {
    return this._client.updateCompanies({ companies });
  }
}
