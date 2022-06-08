import { Statement, UpdateResult } from '../../../common/types';
import { CreativeReviewAction, CreativeReviewPage } from './creativeReview.type';

export interface CreativeReviewServiceOperations {
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeReviewService.CreativeReviewPage CreativeReviewPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeReviewService.CreativeReview CreativeReview} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeReviewService.Statement#query Statement.query}.
   * This will allow you to review creatives that have displayed (or could have displayed) on your pages or apps in the last 30 days.
   * To ensure that you are always reviewing the most important creatives first, the CreativeReview objects are ranked according to the number of impressions that they've received.
   *
   * @param statement a Publisher Query Language statement used to specify the page of CreativeReview to be fetch. Only LIMIT is supported.
   * @returns the CreativeReviews that match the given filter
   */
  getCreativeReviewsByStatement(statement: Statement): Promise<CreativeReviewPage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeReviewService.CreativeReview CreativeReview} objects that match the given Statement.
   *
   * @param creativeReviewAction the action to perform
   * @param filterStatement 	a Publisher Query Language statement used to filter a set of creative reviews. Only "WHERE id = <value>" and "WHERE id IN <list>" are supported.
   * @returns the result of the action performed
   */
  performCreativeReviewAction(
    creativeReviewAction: CreativeReviewAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
}
