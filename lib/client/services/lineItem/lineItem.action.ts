/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} objects.
 */
export abstract class LineItemAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} objects.
 */
export class ActivateLineItems implements LineItemAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for archiving {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} objects.
 */
export class ArchiveLineItems implements LineItemAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for deleting {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} objects.
 * A line item can be deleted if it has never been eligible to serve.
 * Note: deleted line items will still count against your network limits.
 * For more information, see the {@link https://support.google.com/admanager/answer/1628457 Help Center}.
 */
export class DeleteLineItems implements LineItemAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for pausing {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} objects.
 */
export class PauseLineItems implements LineItemAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for releasing {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} objects.
 */
export class ReleaseLineItems implements LineItemAction {
  buildAttributes(): object {
    return {};
  }
}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} objects.
 */
export class ReserveLineItems implements LineItemAction {
  private skipInventoryCheckField = false;

  /**
   * Indicates whether the inventory check should be skipped when performing this action. The default value is false.
   */
  get skipInventoryCheck() {
    return this.skipInventoryCheckField;
  }

  /**
   * Indicates whether the inventory check should be skipped when performing this action. The default value is false.
   */
  set skipInventoryCheck(value: boolean) {
    this.skipInventoryCheckField = value;
  }

  buildAttributes(): object {
    return this.skipInventoryCheck ? { skipInventoryCheck: true } : { skipInventoryCheck: false };
  }
}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} objects.
 */
export class ResumeLineItems implements LineItemAction {
  private skipInventoryCheckField = false;

  /**
   * Indicates whether the inventory check should be skipped when performing this action. The default value is false.
   */
  get skipInventoryCheck() {
    return this.skipInventoryCheckField;
  }

  /**
   * Indicates whether the inventory check should be skipped when performing this action. The default value is false.
   */
  set skipInventoryCheck(value: boolean) {
    this.skipInventoryCheckField = value;
  }

  buildAttributes(): object {
    return this.skipInventoryCheck ? { skipInventoryCheck: true } : { skipInventoryCheck: false };
  }
}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemService.LineItem LineItem} objects.
 */
export class UnarchiveLineItems implements LineItemAction {
  buildAttributes(): object {
    return {};
  }
}
