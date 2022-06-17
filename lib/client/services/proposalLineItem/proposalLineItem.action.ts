/**
 * Represents the actions that can be performed on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} objects.
 */
export abstract class ProposalLineItemAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for archiving {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} objects.
 */
export class ArchiveProposalLineItems implements ProposalLineItemAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for pausing {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} objects.
 */
export class PauseProposalLineItems implements ProposalLineItemAction {
  private reasonField: string;

  /**
   * Reason to describe why the {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} is being paused.
   */
  get reason() {
    return this.reasonField;
  }

  /**
   * Reason to describe why the {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} is being paused.
   */
  set reason(value: string) {
    this.reasonField = value;
  }

  buildAttributes(): object {
    return this.reason ? { reason: this.reason } : {};
  }
}

/**
 * The action used for releasing inventory for {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} objects.
 */
export class ReleaseProposalLineItems implements ProposalLineItemAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action to reserve inventory for {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} objects.
 * It does not overbook inventory unless {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ReserveProposalLineItems#allowOverbook allowOverbook} is set to `true`. This action is only applicable for programmatic proposals not using sales management.
 */
export class ReserveProposalLineItems implements ProposalLineItemAction {
  private allowOverbookField = false;

  get allowOverbook() {
    return this.allowOverbookField;
  }
  set allowOverbook(value: boolean) {
    this.allowOverbookField = value;
  }

  buildAttributes(): object {
    return { allowOverbook: this.allowOverbookField };
  }
}

/**
 * The action used for resuming {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} objects.
 */
export class ResumeProposalLineItems implements ProposalLineItemAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for unarchiving {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalLineItemService.ProposalLineItem ProposalLineItem} objects.
 */
export class UnarchiveProposalLineItems implements ProposalLineItemAction {
  buildAttributes(): object {
    return {};
  }
}
