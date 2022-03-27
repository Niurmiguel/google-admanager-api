export * from './customCriteria.enum';
export * from './activityGroup.enum';
export * from './videoPosition.enum';
export * from './adjustment.enum';
export * from './delegation.enum';
export * from './delivery.enum';
export * from './activity.enum';
export * from './lineItem.enum';
export * from './adRule.enum';
export * from './order.enum';
export * from './user.enum';

/**
 * The declaration about third party data usage on the associated entity.
 */
export enum DeclarationType {
  /**
   * There are no companies associated. Functionally the same as DECLARED, combined with an empty company list.
   */
  NONE = 'NONE',
  /**
   * There is a set of RichMediaAdsCompanys associated with this entity.
   */
  DECLARED = 'DECLARED',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Status of the MCM child publisher's Ad Manager account with respect to delegated serving.
 * In order for the child network to be served ads for MCM, it must have accepted the invite from the parent network, and must have passed Google's policy compliance verifications.
 */
export enum AccountStatus {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * The child publisher has not acted on the invite from the parent.
   */
  INVITED = 'INVITED',
  /**
   * The child publisher has declined the invite.
   */
  DECLINED = 'DECLINED',
  /**
   * The child publisher has accepted the invite, and is awaiting Google's policy compliance verifications.
   */
  PENDING_GOOGLE_APPROVAL = 'PENDING_GOOGLE_APPROVAL',
  /**
   * The child publisher accepted the invite, and Google found it to be compliant with its policies, i.e. no policy violations were found, and the child publisher can be served ads.
   */
  APPROVED = 'APPROVED',
  /**
   * The child publisher accepted the invite, but was disapproved by Google for violating its policies.
   */
  CLOSED_POLICY_VIOLATION = 'CLOSED_POLICY_VIOLATION',
  /**
   * The child publisher accepted the invite, but was disapproved by Google for invalid activity.
   */
  CLOSED_INVALID_ACTIVITY = 'CLOSED_INVALID_ACTIVITY',
  /**
   * The child publisher has closed their own account.
   */
  CLOSED_BY_PUBLISHER = 'CLOSED_BY_PUBLISHER',
  /**
   * The child publisher accepted the invite, but was disapproved as ineligible by Google.
   */
  DISAPPROVED_INELIGIBLE = 'DISAPPROVED_INELIGIBLE',
  /**
   * The child publisher accepted the invite, but was disapproved by Google for being a duplicate of another account.
   */
  DISAPPROVED_DUPLICATE_ACCOUNT = 'DISAPPROVED_DUPLICATE_ACCOUNT',
  /**
   * The invite was sent to the child publisher more than 90 days ago, due to which it has been deactivated.
   */
  EXPIRED = 'EXPIRED',
  /**
   * Either the child publisher disconnected from the parent network, or the parent network withdrew the invite.
   */
  INACTIVE = 'INACTIVE',
  /**
   * The association between the parent and child publishers was deactivated by Google Ad Manager.
   */
  DEACTIVATED_BY_AD_MANAGER = 'DEACTIVATED_BY_AD_MANAGER',
}

/**
 * Pending onboarding tasks for the child publishers that must completed before Google's policy compliance is verified.
 */
export enum OnboardingTask {
  UNKNOWN = 'UNKNOWN',
  /**
   * Creation of the child publisher's payments billing profile.
   */
  BILLING_PROFILE_CREATION = 'BILLING_PROFILE_CREATION',
  /**
   * Verification of the child publisher's phone number.
   */
  PHONE_PIN_VERIFICATION = 'PHONE_PIN_VERIFICATION',
  /**
   * Setup of the child publisher's Ad Manager account.
   */
  AD_MANAGER_ACCOUNT_SETUP = 'AD_MANAGER_ACCOUNT_SETUP',
}
