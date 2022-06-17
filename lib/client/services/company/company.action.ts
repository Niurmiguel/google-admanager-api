import { DelegationType } from '../../common/enums';

/**
 * Represents the actions that can be performed on `Company` objects.
 */
export abstract class CompanyAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used by the parent network to withdraw from being the MCM parent for a child.
 */
export class EndAgreementAction implements CompanyAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used by the parent network to send a new invitation with a potentially updated proposal to a rejected or withdrawn child publisher.
 */
export class ReInviteAction implements CompanyAction {
  private proposedDelegationTypeField: DelegationType;

  private proposedDelegationTypeFieldSpecified: boolean;

  private proposedRevenueShareMillipercentField: number;

  private proposedRevenueShareMillipercentFieldSpecified: boolean;

  private proposedEmailField: string;

  get proposedDelegationType(): DelegationType {
    return this.proposedDelegationTypeField;
  }

  set proposedDelegationType(value: DelegationType) {
    this.proposedDelegationTypeField = value;
    this.proposedDelegationTypeSpecified = true;
  }

  get proposedDelegationTypeSpecified(): boolean {
    return this.proposedDelegationTypeFieldSpecified;
  }

  set proposedDelegationTypeSpecified(value: boolean) {
    this.proposedDelegationTypeFieldSpecified = value;
  }

  get proposedRevenueShareMillipercent(): number {
    return this.proposedRevenueShareMillipercentField;
  }

  set proposedRevenueShareMillipercent(value: number) {
    this.proposedRevenueShareMillipercentField = value;
    this.proposedRevenueShareMillipercentSpecified = true;
  }

  get proposedRevenueShareMillipercentSpecified(): boolean {
    return this.proposedRevenueShareMillipercentFieldSpecified;
  }

  set proposedRevenueShareMillipercentSpecified(value: boolean) {
    this.proposedRevenueShareMillipercentFieldSpecified = value;
  }

  get proposedEmail(): string {
    return this.proposedEmailField;
  }

  set proposedEmail(value: string) {
    this.proposedEmailField = value;
  }

  buildAttributes(): object {
    const attributes = {};

    if (this.proposedDelegationTypeSpecified) {
      attributes['proposedDelegationType'] = this.proposedDelegationType;
    }

    if (this.proposedRevenueShareMillipercentSpecified) {
      attributes['proposedRevenueShareMillipercent'] = this.proposedRevenueShareMillipercent;
    }

    if (this.proposedEmail) {
      attributes['proposedEmail'] = this.proposedEmail;
    }

    return attributes;
  }
}

/**
 * The action used by the parent network to resend an invitation email with the same proposal to an expired child publisher.
 */
export class ResendInvitationAction implements CompanyAction {
  buildAttributes(): object {
    return {};
  }
}
