import { Client } from 'soap';

import { CompanyServiceOperations } from './companyService.interface';
import { Statement, UpdateResult } from '../../../common/types';
import { Company, CompanyPage } from './company.type';
import { CompanyAction } from './company.action';

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
    console.log(companyAction.constructor.name);

    return this._client.performCompanyAction({
      companyAction: {
        attributes: {
          'xsi:type': companyAction.constructor.name,
        },
        ...companyAction.buildAttributes(),
      },
      statement: filterStatement,
    });
  }

  async updateCompanies(companies: Company[]): Promise<Company[]> {
    return this._client.updateCompanies({ companies });
  }
}
