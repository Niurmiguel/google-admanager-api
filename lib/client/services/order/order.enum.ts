/**
 * Describes the order statuses.
 */
export enum OrderStatus {
  /**
   * Indicates that the {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order Order}
   * has just been created but no approval has been requested yet.
   */
  DRAFT = 'DRAFT',
  /**
   * Indicates that a request for approval for the Order has been made.
   */
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  /**
   * Indicates that the {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order Order}
   * has been approved and is ready to serve.
   */
  APPROVED = 'APPROVED',
  /**
   * Indicates that the {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order Order}
   * has been disapproved and is not eligible to serve.
   */
  DISAPPROVED = 'DISAPPROVED',
  /**
   * This is a legacy state. Paused status should be checked on **LineItems**`s within the order.
   */
  PAUSED = 'PAUSED',
  /**
   * Indicates that the {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order Order}
   * has been canceled and cannot serve.
   */
  CANCELED = 'CANCELED',
  /**
   * Indicates that the {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order Order}
   * has been deleted by DSM.
   */
  DELETED = 'DELETED',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
