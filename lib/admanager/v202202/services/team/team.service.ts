import { Client } from 'soap';

import { TeamServiceOperations } from './teamService.interface';
import { Team, TeamAction, TeamPage } from './team.type';
import { Statement, UpdateResult } from '@common/types';

export class TeamService implements TeamServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createTeams(teams: Team[]): Promise<Team[]> {
    return this._client.createTeams({ teams });
  }

  async getTeamsByStatement(filterStatement: Statement): Promise<TeamPage> {
    return this._client.getTeamsByStatement({
      filterStatement,
    });
  }

  async performTeamAction(
    teamAction: TeamAction,
    filterStatement: Statement,
  ): Promise<UpdateResult> {
    return this._client.performTeamAction({
      teamAction: {
        attributes: {
          'xsi:type': teamAction,
        },
      },
      filterStatement,
    });
  }

  async updateTeams(teams: Team[]): Promise<Team[]> {
    return this._client.updateTeams({ teams });
  }
}
