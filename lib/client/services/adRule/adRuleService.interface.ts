import { Statement, UpdateResult } from '../../../common/types';
import { AdSpot, AdSpotPage } from './adSpot.type';
import { AdRule, BreakTemplate, AdRulePage, BreakTemplatePage, AdRuleAction } from './adRule.type';

/**
 * Provides methods for creating, updating and retrieving AdRule objects.
 *
 * Ad rules contain data that the ad server uses to generate a playlist of video ads.
 */
export interface AdRuleServiceOperations {
  /**
   * Creates new AdRule objects.
   *
   * @param adRules the ad rules to create
   * @returns the created ad rules with their IDs filled in
   */
  createAdRules(adRules: AdRule[]): Promise<AdRule[]>;

  /**
   * Creates new AdSpot objects.
   *
   * @param adSports the ad spots to create
   * @returns the created ad spots with their IDs filled in
   */
  createAdSpots(adSports: AdSpot[]): Promise<AdSpot[]>;

  /**
   * Creates new breakTemplate objects.
   *
   * @param breakTemplate the break template to create
   * @returns the created break template with their IDs filled in
   */
  createBreakTemplates(breakTemplate: BreakTemplate[]): Promise<BreakTemplate[]>;

  /**
   * Gets an AdRulePage of AdRule objects that satisfy the given Statement.query. The following fields are supported for filtering:
   * 
   * id - AdRule.id (AdRule.adRuleId beginning in v201702)
   * 
   * name - AdRule.name
   * 
   * priority - AdRule.priority
   * 
   * status - AdRule.status

   * @param statement
   * @returns the ad rules that match the given filter
   */
  getAdRulesByStatement(statement: Statement): Promise<AdRulePage>;

  /**
   * Gets a AdSpotPage of AdSpot objects that satisfy the given Statement.query.
   *
   * @param filterStatement a Publisher Query Language statement to filter a list of ad spots
   * @returns the ad spots that match the filter
   */
  getAdSpotsByStatement(filterStatement: Statement): Promise<AdSpotPage>;

  /**
   * Gets a BreakTemplatePage of BreakTemplate objects that satisfy the given Statement.query.
   *
   * @param filterStatement a Publisher Query Language statement to filter a list of breakTemplate
   * @returns the break template that match the filter
   */
  getBreakTemplatesByStatement(filterStatement: Statement): Promise<BreakTemplatePage>;

  /**
   * Performs actions on AdRule objects that match the given Statement.query.
   *
   * @param adRuleAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of ad rules
   * @returns the result of the action performed
   */
  performAdRuleAction(adRuleAction: AdRuleAction, filterStatement: Statement): Promise<UpdateResult>;

  /**
   * Updates the specified AdRule objects.
   *
   * @param adRules the ad rules to update
   * @returns the updated ad rules
   */
  updateAdRules(adRules: AdRule[]): Promise<AdRule[]>;

  /**
   * Updates the specified AdSpot objects.
   *
   * @param adSports the ad spots to update
   * @returns the updated ad spots
   */
  updateAdSpots(adSports: AdSpot[]): Promise<AdSpot[]>;

  /**
   * Updates the specified breakTemplate objects.
   *
   * @param breakTemplate the break template to update
   * @returns the updated break template
   */
  updateBreakTemplates(breakTemplate: BreakTemplate[]): Promise<BreakTemplate[]>;
}
