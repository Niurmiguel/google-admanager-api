/**
 * Represents the actions that can be performed on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order Order} objects.
 */
export abstract class OrderAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for approving
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order Order} objects.
 * All {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem}
 * objects within the order will be approved as well.
 * For more information on what happens to an order and its line items when it is approved,
 * see the {@link https://support.google.com/dfp_premium/answer/177334 Ad Manager Help Center}.
 */
export class ApproveOrders implements OrderAction {
  private skipInventoryCheckField = false;

  get skipInventoryCheck() {
    return this.skipInventoryCheckField;
  }
  set skipInventoryCheck(value: boolean) {
    this.skipInventoryCheckField = value;
  }

  buildAttributes(): object {
    return { skipInventoryCheck: this.skipInventoryCheck };
  }
}

/**
 * The action used for approving
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order Order} objects.
 * All {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem}
 * objects within the order will be approved as well.
 * This action does not make any changes to the
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem#reservationStatus LineItem.reservationStatus}
 * of the line items within the order.
 * If there are reservable line items that have not been reserved the operation will not succeed.
 */
export class ApproveOrdersWithoutReservationChanges implements OrderAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for archiving Order objects.
 */
export class ArchiveOrders implements OrderAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for deleting Order objects.
 * All line items within that order are also deleted.
 * Orders can only be deleted if none of its line items have been eligible to serve.
 * This action can be used to delete proposed orders and line items if they are no longer valid.
 */
export class DeleteOrders implements OrderAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for disapproving Order objects.
 * All {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem} objects within the order will be disapproved as well.
 */
export class DisapproveOrders implements OrderAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for disapproving Order objects.
 * All {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem} objects within the order will be disapproved as well.
 * This action does not make any changes to the
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem#reservationStatus LineItem.reservationStatus}
 * of the line items within the order.
 */
export class DisapproveOrdersWithoutReservationChanges implements OrderAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for pausing all {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem} objects within an order.
 */
export class PauseOrders implements OrderAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for resuming Order objects.
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem} objects within the order that are legible to resume will resume as well.
 */
export class ResumeOrders implements OrderAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for retracting Order objects.
 */
export class RetractOrders implements OrderAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for retracting Order objects.
 * This action does not make any changes to the
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem#reservationStatus LineItem.reservationStatus} of the line items within the order.
 */
export class RetractOrdersWithoutReservationChanges implements OrderAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for submitting Order objects for approval.
 */
export class SubmitOrdersForApproval implements OrderAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for submitting Order objects for approval.
 * This action does not make any changes to the {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem#reservationStatus LineItem.reservationStatus}
 * of the line items within the order.
 */
export class SubmitOrdersForApprovalWithoutReservationChanges implements OrderAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for unarchiving Order objects.
 */
export class UnarchiveOrders implements OrderAction {
  buildAttributes(): object {
    return {};
  }
}
