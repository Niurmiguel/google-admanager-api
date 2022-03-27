import { Client } from 'soap';

import { PageResult, Statement, UpdateResult } from '@common/types';
import { UserServiceOperations } from '../interfaces';
import { User, Role, UserAction } from '../types';

export class UserService implements UserServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createUsers(users: User[]): Promise<User[]> {
    return this._client.createUsers({ users });
  }

  async getAllRoles(): Promise<Role[]> {
    return this._client.getAllRolesAsync();
  }

  async getCurrentUser(): Promise<User> {
    return this._client.getCurrentUser();
  }

  async getUsersByStatement(
    filterStatement: Statement,
  ): Promise<PageResult<User>> {
    return this._client.getUsersByStatement({
      filterStatement,
    });
  }

  async performUserAction(
    userAction: UserAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performUserAction({
      userAction: {
        attributes: {
          'xsi:type': userAction,
        },
      },
      filterStatement,
    });
  }

  async updateUsers(users: User[]): Promise<User[]> {
    return this._client.updateUsers({ users });
  }
}
