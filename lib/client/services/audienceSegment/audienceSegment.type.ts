import { DateTime, PageResult } from '../../../common/types';
import { Money } from '../../common/types';
import {
  AudienceSegmentApprovalStatus,
  AudienceSegmentStatus,
  AudienceSegmentType,
  LicenseType,
} from './audienceSegment.enum';

/**
 * Data provider that owns this segment.
 * For a {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.FirstPartyAudienceSegment FirstPartyAudienceSegment}, it would be the
 * publisher network. For a {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.SharedAudienceSegment SharedAudienceSegment}
 * or a {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.ThirdPartyAudienceSegment ThirdPartyAudienceSegment},
 * it would be the entity that provides that {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegment AudienceSegment}.
 */
type AudienceSegmentDataProvider = {
  /**
   * Name of the data provider. This attribute is readonly and is assigned by Google.
   */
  name: string;
};

/**
 * An {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegment AudienceSegment} represents audience segment object.
 */
type AudienceSegment = {
  /**
   * Id of the AudienceSegment.
   * This attribute is readonly and is populated by Google.
   */
  id: number;
  /**
   * Name of the AudienceSegment. This attribute is required and has a maximum length of 255 characters.
   */
  name: string;
  /**
   * The ids of the categories this segment belongs to. This field is optional, it may be empty.
   */
  categoryIds: number[];
  /**
   * Description of the AudienceSegment. This attribute is optional and has a maximum length of 8192 characters.
   */
  description: string;
  /**
   * Status of the AudienceSegment. This controls whether the given segment is available for targeting or not.
   * During creation this attribute is optional and defaults to **ACTIVE**.
   * This attribute is readonly for updates.
   */
  status: AudienceSegmentStatus;
  /**
   * Number of unique identifiers in the AudienceSegment. This attribute is readonly and is populated by Google.
   */
  size: number;
  /**
   * Number of unique identifiers in the AudienceSegment for mobile web. This attribute is read-only.
   */
  mobileWebSize: number;
  /**
   * Number of unique IDFA identifiers in the AudienceSegment. This attribute is read-only.
   */
  idfaSize: number;
  /**
   * Number of unique AdID identifiers in the AudienceSegment. This attribute is read-only.
   */
  adIdSize: number;
  /**
   * Number of unique PPID (publisher provided identifiers) in the AudienceSegment. This attribute is read-only.
   */
  ppidSize: number;
  /**
   * Owner data provider of this segment. This attribute is readonly and is assigned by Google.
   */
  dataProvider: AudienceSegmentDataProvider;
  /**
   * Type of the segment. This attribute is readonly and is assigned by Google.
   */
  type: AudienceSegmentType;
};

/**
 * A {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.SharedAudienceSegment SharedAudienceSegment}
 * is an {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegment AudienceSegment}
 * owned by another entity and shared with the publisher network.
 */
type SharedAudienceSegment = AudienceSegment & {};

/**
 * A {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.ThirdPartyAudienceSegment ThirdPartyAudienceSegment} is an
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegment AudienceSegment}
 * owned by a data provider and licensed to the Ad Manager publisher.
 */
type ThirdPartyAudienceSegment = AudienceSegment & {
  /**
   * Specifies if the publisher has approved or rejected the segment.
   */
  approvalStatus: AudienceSegmentApprovalStatus;
  /**
   * Specifies CPM cost for the given segment. This attribute is readonly and is assigned by the data provider.
   *
   * The CPM cost comes from the active pricing, if there is one; otherwise it comes from the latest pricing.
   */
  cost: Money;
  /**
   * Specifies the license type of the external segment. This attribute is read-only.
   */
  licenseType: LicenseType;
  /**
   * Specifies the date and time at which this segment becomes available for use. This attribute is readonly and is assigned by the data provider.
   */
  startDateTime: DateTime;
  /**
   * Specifies the date and time at which this segment ceases to be available for use. This attribute is readonly and is assigned by the data provider.
   */
  endDateTime: DateTime;
};

/**
 * A {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.NonRuleBasedFirstPartyAudienceSegment NonRuleBasedFirstPartyAudienceSegment}
 * is a {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.FirstPartyAudienceSegment FirstPartyAudienceSegment}
 * owned by the publisher network. It doesn't contain a rule. Cookies are usually added to this segment via cookie upload.
 */
type NonRuleBasedFirstPartyAudienceSegment = AudienceSegment & {
  /**
   * Specifies the number of days after which a user's cookie will be removed from the audience segment due to inactivity.
   * This attribute is required and can be between 1 and 540.
   */
  membershipExpirationDays: number;
};

/**
 * A {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.RuleBasedFirstPartyAudienceSegmentSummary RuleBasedFirstPartyAudienceSegmentSummary}
 * is a {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.FirstPartyAudienceSegment FirstPartyAudienceSegment}
 * owned by the publisher network.
 */
type RuleBasedFirstPartyAudienceSegmentSummary = AudienceSegment & {
  /**
   * Specifies the number of times a user's cookie must match the segment rule before it's associated with the audience segment.
   * This is used in combination with FirstPartyAudienceSegment.recencyDays to determine eligibility of the association.
   * This attribute is required and can be between 1 and 12.
   */
  pageViews: number;
  /**
   * Specifies the number of days within which a user's cookie must match the segment rule before it's associated with the audience segment.
   * This is used in combination with FirstPartyAudienceSegment.pageViews to determine eligibility of the association.
   * This attribute is required only if FirstPartyAudienceSegment.pageViews is greater than 1. When required, it can be between 1 and 90.
   */
  recencyDays: number;
  /**
   * Specifies the number of days after which a user's cookie will be removed from the audience segment due to inactivity.
   * This attribute is required and can be between 1 and 540.
   */
  membershipExpirationDays: number;
};

export type FirstPartyAudienceSegment =
  | NonRuleBasedFirstPartyAudienceSegment
  | RuleBasedFirstPartyAudienceSegmentSummary;

/**
 * Represents a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/AudienceSegmentService.AudienceSegment AudienceSegment} objects.
 */
export type AudienceSegmentPage = PageResult<
  FirstPartyAudienceSegment | ThirdPartyAudienceSegment | SharedAudienceSegment
>;
