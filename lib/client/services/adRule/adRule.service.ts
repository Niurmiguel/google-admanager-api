import { Client } from 'soap';

import { AdRuleServiceOperations } from './adRuleService.interface';
import { Statement, UpdateResult } from '../../../common/types';
import { AdSpot, AdSpotPage } from './adSpot.type';
import { AdRule, AdRulePage, BreakTemplate, BreakTemplatePage, AdRuleAction } from './adRule.type';

export class AdRuleService implements AdRuleServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  createAdRules(adRules: AdRule[]): Promise<AdRule[]> {
    return this._client.createAdRules({ adRules });
  }

  createAdSpots(adSports: AdSpot[]): Promise<AdSpot[]> {
    return this._client.createAdSpots({ adSports });
  }

  createBreakTemplates(breakTemplate: BreakTemplate[]): Promise<BreakTemplate[]> {
    return this._client.createBreakTemplates({ breakTemplate });
  }

  getAdRulesByStatement(statement: Statement): Promise<AdRulePage> {
    return this._client.getAdRulesByStatement({
      statement,
    });
  }

  getAdSpotsByStatement(filterStatement: Statement): Promise<AdSpotPage> {
    return this._client.getAdSpotsByStatement({
      filterStatement,
    });
  }

  getBreakTemplatesByStatement(filterStatement: Statement): Promise<BreakTemplatePage> {
    return this._client.getBreakTemplatesByStatement({
      filterStatement,
    });
  }

  performAdRuleAction(adRuleAction: AdRuleAction, filterStatement: Statement): Promise<UpdateResult> {
    return this._client.performAdRuleAction({
      adRuleAction: {
        attributes: {
          'xsi:type': adRuleAction,
        },
      },
      filterStatement,
    });
  }

  updateAdRules(adRules: AdRule[]): Promise<AdRule[]> {
    return this._client.updateAdRules({ adRules });
  }

  updateAdSpots(adSports: AdSpot[]): Promise<AdSpot[]> {
    return this._client.updateAdSpots({ adSports });
  }

  updateBreakTemplates(breakTemplate: BreakTemplate[]): Promise<BreakTemplate[]> {
    return this._client.updateBreakTemplates({ breakTemplate });
  }
}
