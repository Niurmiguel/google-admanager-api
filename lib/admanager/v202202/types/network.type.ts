import { ChildPublisher } from '.';

export type Network = {
  /**
   * The unique ID of the Network. This value is readonly and is assigned by Google.
   */
  id: number;
  /**
   * The display name of the network.
   */
  displayName: string;
  /**
   * The network code. If the current login has access to multiple networks, then the network code must be provided in the SOAP request headers for all requests. Otherwise, it is optional to provide the network code in the SOAP headers. This field is read-only.
   */
  networkCode: string;
  /**
   * The property code. This field is read-only.
   */
  propertyCode: string;
  /**
   * The time zone associated with the delivery of orders and reporting. This field is read-only.
   */
  timeZone: string;
  /**
   * The primary currency code. This field is read-only.
   */
  currencyCode: string;
  /**
   * Currencies that can be used as an alternative to the Network.currencyCode for trafficking line items.
   */
  secondaryCurrencyCodes: string[];
  /**
   * The AdUnit.id of the top most ad unit to which descendant ad units can be added. Should be used for the AdUnit.parentId when first building inventory hierarchy. This field is read-only.
   */
  effectiveRootAdUnitId: string;
  /**
   * Whether this is a test network. This field is read-only.
   */
  isTest: boolean;
  /**
   * The child networks that have been invited by, have approved, or have rejected this parent network for Multiple Customer Management.
   *
   * This field is read-only
   */
  childPublishers: ChildPublisher[];
};
