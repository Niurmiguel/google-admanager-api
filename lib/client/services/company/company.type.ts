import { AppliedLabel, ChildPublisher } from '../../common/types';
import { CompanyCreditStatus, CompanyType } from './company.enum';
import { DateTime, PageResult } from '../../../common/types';

/**
 * Settings for a {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company Company}.
 */
export type CompanySettings = {};

/**
 * Information required for {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company Company} of Type VIEWABILITY_PROVIDER.
 * It contains all of the data needed to capture viewability metrics.
 */
export type ViewabilityProvider = {
  /**
   * The key for this ad verification vendor.
   */
  vendorKey: string;
  /**
   * The URL that hosts the verification script for this vendor.
   */
  verificationScriptUrl: string;
  /**
   * The parameters that will be passed to the verification script.
   */
  verificationParameters: string;
  /**
   * The URL that should be pinged if the verification script cannot be run.
   */
  verificationRejectionTrackerUrl: string;
};

/**
 * A **Company** represents an agency, a single advertiser or an entire advertising network.
 */
export type Company = {
  /**
   * Uniquely identifies the Company. This value is read-only and is assigned by Google when the company is created. This attribute is required for updates.
   */
  id: number;
  /**
   * The full name of the company. This attribute is required and has a maximum length of 127 characters.
   */
  name: string;
  /**
   * Specifies what kind of company this is. This attribute is required.
   */
  type: CompanyType;
  /**
   * Specifies the address of the company. This attribute is optional and has a maximum length of 65,535 characters.
   */
  address: string;
  /**
   * Specifies the email of the company. This attribute is optional and has a maximum length of 128 characters.
   */
  email: string;
  /**
   * Specifies the fax phone number of the company. This attribute is optional and has a maximum length of 63 characters.
   */
  faxPhone: string;
  /**
   * Specifies the primary phone number of the company. This attribute is optional and has a maximum length of 63 characters.
   */
  primaryPhone: string;
  /**
   * Specifies the external ID of the company. This attribute is optional and has a maximum length of 255 characters.
   */
  externalId: string;
  /**
   * Specifies the comment of the company. This attribute is optional and has a maximum length of 1024 characters.
   */
  comment: string;
  /**
   * Specifies the company's credit status. This attribute is optional and defaults to CreditStatus.ACTIVE when basic credit status settings are enabled,
   * and CreditStatus.ON_HOLD when advanced credit status settings are enabled.
   */
  creditStatus: CompanyCreditStatus;
  /**
   * Specifies the default billing settings of this Company. This attribute is optional.
   */
  settings: CompanySettings;
  /**
   * The set of labels applied to this company.
   */
  appliedLabels: AppliedLabel[];
  /**
   * The ID of the Contact who is acting as the primary contact for this company. This attribute is optional.
   */
  primaryContactId: number;
  /**
   * The IDs of all teams that this company is on directly.
   */
  appliedTeamIds: number[];
  /**
   * Specifies the ID of the Google-recognized canonicalized form of this company. This attribute is optional.
   */
  thirdPartyCompanyId: number;
  /**
   * The date and time this company was last modified.
   */
  lastModifiedDateTime: DateTime;
  /**
   * Info required for when Company Type is CHILD_PUBLISHER.
   */
  childPublisher: ChildPublisher;
  /**
   * Info required for when Company Type is VIEWABILITY_PROVIDER.
   */
  viewabilityProvider: ViewabilityProvider;
};

/**
 * Represents the actions that can be performed on Company objects.
 */
// export type CompanyAction = 'EndAgreementAction' | 'ReInviteAction' | 'ResendInvitationAction';
// export type CompanyAction = EndAgreementAction | ReInviteAction | ResendInvitationAction;

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company Company} objects.
 */
export type CompanyPage = PageResult<Company>;
