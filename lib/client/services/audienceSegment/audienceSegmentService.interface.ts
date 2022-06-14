import { Statement, UpdateResult } from '../../../common/types';
import { AudienceSegmentAction, AudienceSegmentPage, FirstPartyAudienceSegment } from './audienceSegment.type';

/**
 * Provides operations for creating, updating and retrieving
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegment AudienceSegment} objects.
 *
 */
export interface AudienceSegmentServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.FirstPartyAudienceSegment FirstPartyAudienceSegment} objects.
   *
   * @param segments first-party audience segments to create
   * @returns created first-party audience segments
   */
  createAudienceSegments(segments: FirstPartyAudienceSegment[]): Promise<FirstPartyAudienceSegment[]>;
  /**
   * Gets an {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegmentPage AudienceSegmentPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegment AudienceSegment}
   * objects that satisfy the given {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property     | PQL Property                                                                                                                                                                    |
   * | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | id               | {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegment#id AudienceSegment.id}                                             |
   * | name             | {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegment#name AudienceSegment.name}                                         |
   * | status           | {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegment#status AudienceSegment.status}                                     |
   * | type             | {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegment#type AudienceSegment.type}                                         |
   * | size             | {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegment#size AudienceSegment.size}                                         |
   * | dataProviderName | {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegmentDataProvider#name AudienceSegmentDataProvider.name}                 |
   * | segmentType      | {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegment#type AudienceSegment.type}                                         |
   * | approvalStatus   | {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.ThirdPartyAudienceSegment#approvalStatus ThirdPartyAudienceSegment.approvalStatus} |
   * | cost             | {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.ThirdPartyAudienceSegment#cost ThirdPartyAudienceSegment.cost}                     |
   * | startDateTime    | {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.ThirdPartyAudienceSegment#startDateTime ThirdPartyAudienceSegment.startDateTime}   |
   * | endDateTime      | {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.ThirdPartyAudienceSegment#endDateTime ThirdPartyAudienceSegment.endDateTime}       |
   *
   * @param filterStatement a Publisher Query Language statement used to filter a set of audience segments (the only supported operator is AND)
   * @returns the audience segments that match the given filter
   */
  getAudienceSegmentsByStatement(filterStatement: Statement): Promise<AudienceSegmentPage>;
  /**
   * Performs the given AudienceSegmentAction on the set of segments identified by the given statement.
   *
   * @param action AudienceSegmentAction to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of audience segments (the only supported operator is AND)
   * @returns UpdateResult indicating the result
   */
  performAudienceSegmentAction(action: AudienceSegmentAction, filterStatement: Statement): Promise<UpdateResult>;
  /**
   * Updates the given {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.FirstPartyAudienceSegment FirstPartyAudienceSegment} objects.
   *
   * @param segments first-party audience segments to update
   * @returns updated first-party audience segments
   */
  updateAudienceSegments(segments: FirstPartyAudienceSegment[]): Promise<FirstPartyAudienceSegment[]>;
}
