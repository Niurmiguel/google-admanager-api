/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} objects.
 */
export abstract class ProposalAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for archiving {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} objects.
 */
export class ArchiveProposals implements ProposalAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action reverting the local {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} modifications to reflect the latest terms and private data in Marketplace.
 */
export class DiscardLocalVersionEdits implements ProposalAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * Opens the fields of a {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} for edit.
 * This proposal will not receive updates from Marketplace while it's open for edit.
 * If the buyer updates the proposal while it is open for local editing,
 * Google will set {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.ProposalMarketplaceInfo#isNewVersionFromBuyer ProposalMarketplaceInfo.isNewVersionFromBuyer} to true.
 * You will then need to call DiscardProposalDrafts to revert your edits to get the buyer's latest changes,
 * and then perform this action to start making your edits again.
 */
export class EditProposalsForNegotiation implements ProposalAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for pausing programmatic {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} objects.
 */
export class PauseProposals implements ProposalAction {
  private reasonField: string;

  get reason() {
    return this.reasonField;
  }
  set reason(value: string) {
    this.reasonField = value;
  }

  buildAttributes(): object {
    return this.reason ? { reason: this.reason } : {};
  }
}

/**
 * The action used to request acceptance from the buyer for the
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} through Marketplace.
 * This action does check forecasting unless
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.RequestBuyerAcceptance#allowOverbook allowOverbook} is set to true.
 */
export class RequestBuyerAcceptance implements ProposalAction {
  private allowOverbookField = false;

  get allowOverbook() {
    return this.allowOverbookField;
  }
  set allowOverbook(value: boolean) {
    this.allowOverbookField = value;
  }

  buildAttributes(): object {
    return { allowOverbook: this.allowOverbook };
  }
}

/**
 * The action used to request buyer review for the {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal}.
 */
export class RequestBuyerReview implements ProposalAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action to reserve inventory for {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} objects.
 * It does not allow overbooking unless {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.ReserveProposals#allowOverbook allowOverbook} is set to true.
 */
export class ReserveProposals implements ProposalAction {
  private allowOverbookField = false;

  get allowOverbook() {
    return this.allowOverbookField;
  }
  set allowOverbook(value: boolean) {
    this.allowOverbookField = value;
  }

  buildAttributes(): object {
    return { allowOverbook: this.allowOverbook };
  }
}

/**
 * The action used for resuming programmatic {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} objects.
 */
export class ResumeProposals implements ProposalAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action for marking all negotiations on the {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} as terminated in Marketplace.
 */
export class TerminateNegotiations implements ProposalAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for unarchiving {@link https://developers.google.com/ad-manager/api/reference/v202202/ProposalService.Proposal Proposal} objects.
 */
export class UnarchiveProposals implements ProposalAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action to update a finalized Marketplace {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order Order} with the seller's data.
 */
export class UpdateOrderWithSellerData implements ProposalAction {
  buildAttributes(): object {
    return {};
  }
}
