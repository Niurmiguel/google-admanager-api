import { Client } from 'soap';

import { UserTeamAssociationServiceOperations } from './userTeamAssociationService.interface';
import { UserTeamAssociation, UserTeamAssociationPage } from './userTeamAssociation.type';
import { UserTeamAssociationAction } from './userTeamAssociation.action';
import { Statement, UpdateResult } from '../../../common/types';

export class UserTeamAssociationService implements UserTeamAssociationServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createUserTeamAssociations(userTeamAssociations: UserTeamAssociation[]): Promise<UserTeamAssociation[]> {
    return this._client.createUserTeamAssociations({ userTeamAssociations });
  }

  async getUserTeamAssociationsByStatement(filterStatement: Statement): Promise<UserTeamAssociationPage> {
    return this._client.getUserTeamAssociationsByStatement({
      filterStatement,
    });
  }

  async performUserTeamAssociationAction(
    userTeamAssociationAction: UserTeamAssociationAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performUserTeamAssociationAction({
      userTeamAssociationAction: {
        attributes: {
          'xsi:type': userTeamAssociationAction.constructor.name,
        },
      },
      filterStatement,
    });
  }

  async updateUserTeamAssociations(userTeamAssociations: UserTeamAssociation[]): Promise<UserTeamAssociation[]> {
    return this._client.updateUserTeamAssociations({ userTeamAssociations });
  }
}
