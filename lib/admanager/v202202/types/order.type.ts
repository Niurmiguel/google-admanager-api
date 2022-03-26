import { DateTime, PageResult, Value } from '@common/types';
import { OrderStatus } from '../enums';

/**
 * Represents a money amount.
 */
type Money = {
  /**
   * Three letter currency code in string format.
   */
  currencyCode: string;
  /**
   * Money values are always specified in terms of micros which are a millionth of the fundamental currency unit. For US dollars, $1 is 1,000,000 micros.
   */
  microAmount: number;
};

/**
 * Represents a {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label Label} that can be applied to an entity.
 * To negate an inherited label, create an **`AppliedLabel`** with **`labelId`** as the inherited label's ID and **`isNegated`** set to true.
 */
type AppliedLabel = {
  /**
   * The ID of a created {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label Label}.
   */
  labelId: number;
  /**
   * **isNegated** should be set to true to negate the effects of **labelId**.
   */
  isNegated: boolean;
};

/**
 * The value of a {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField} for a particular entity.
 */
type BaseCustomFieldValue = {
  /**
   * Id of the **CustomField** to which this value belongs. This attribute is required.
   */
  customFieldId: number;
};

/**
 * The value of a {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField}
 * that does not have a {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#dataType CustomField.dataType}
 * of {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldDataType#DROP_DOWN CustomFieldDataType.DROP_DOWN}.
 */
type CustomFieldValue = BaseCustomFieldValue & {
  /**
   * The value for this field. The appropriate type of **Value** is determined by the
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#dataType CustomField.dataType}
   * of the **CustomField** that this conforms to.
   *
   * | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldDataType CustomFieldDataType} | {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Value Value} type            |
   * | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
   * | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldDataType#STRING STRING}       | 	{@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.TextValue TextValue}        |
   * | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldDataType#NUMBER NUMBER}       | 	{@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.NumberValue NumberValue}    |
   * | {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldDataType#TOGGLE TOGGLE}       | 	{@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.BooleanValue BooleanValue}  |
   *
   */
  value: Value;
};

/**
 * A {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.CustomFieldValue CustomFieldValue} for a
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField} that has a
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField#dataType CustomField.dataType} of
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldDataType#DROP_DOWN CustomFieldDataType.DROP_DOWN}
 */
type DropDownCustomFieldValue = BaseCustomFieldValue & {
  /**
   * The {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldOption#id ID}
   * of the {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomFieldOption CustomFieldOption} for this value.
   */
  customFieldOptionId: number;
};

/**
 * An **`Order`** represents a grouping of individual {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem LineItem}
 * objects, each of which fulfill an ad request from a particular advertiser.
 */
export type Order = {
  /**
   * The unique ID of the **Order**. This value is readonly and is assigned by Google.
   */
  id: number;
  /**
   * The name of the **Order**. This value is required to create an order and has a maximum length of 255 characters.
   */
  name: string;
  /**
   * The date and time at which the **Order** and its associated line items are eligible to begin serving.
   * This attribute is readonly and is derived from the line item of the order which has the earliest
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem#startDateTime LineItem.startDateTime}.
   */
  startDateTime: DateTime;
  /**
   * The date and time at which the **Order** and its associated line items stop being served.
   * This attribute is readonly and is derived from the line item of the order which has the latest
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem#endDateTime LineItem.endDateTime}.
   */
  endDateTime: DateTime;
  /**
   * Specifies whether or not the **Order** has an unlimited end date.
   * This attribute is readonly and is true if any of the order's line items has
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem#unlimitedEndDateTime LineItem.unlimitedEndDateTime} set to true.
   */
  unlimitedEndDateTime: boolean;
  /**
   * The status of the **Order**. This attribute is read-only.
   */
  status: OrderStatus;
  /**
   * The archival status of the **Order**. This attribute is readonly.
   */
  isArchived: boolean;

  /**
   * Provides any additional notes that may annotate the **Order**. This attribute is optional and has a maximum length of 65,535 characters.
   */
  notes: string;

  /**
   * An arbitrary ID to associate to the **Order**, which can be used as a key to an external system. This value is optional.
   */
  externalOrderId: number;

  /**
   * The purchase order number for the **Order**. This value is optional and has a maximum length of 63 characters.
   */
  poNumber: string;

  /**
   * The ISO currency code for the currency used by the **Order**. This value is read-only and is the network's currency code.
   */
  currencyCode: string;

  /**
   * The unique ID of the {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company Company},
   * which is of type {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company.Type#ADVERTISER Company.Type.ADVERTISER},
   * to which this order belongs. This attribute is required.
   */
  advertiserId: number;

  /**
   * List of IDs for advertiser contacts of the order.
   */
  advertiserContactIds: number[];

  /**
   * The unique ID of the {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company Company},
   * which is of type {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company.Type#AGENCY Company.Type.AGENCY},
   * with which this order is associated. This attribute is optional.
   */
  agencyId: number;

  /**
   * List of IDs for agency contacts of the order.
   */
  agencyContactIds: number[];

  /**
   * The unique ID of the {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User User} who created the **Order** on behalf of the advertiser. This value is readonly and is assigned by Google.
   */
  creatorId: number;

  /**
   * The unique ID of the {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User User} responsible for trafficking the **Order**. This value is required for creating an order.
   */
  traffickerId: number;

  /**
   * The IDs of the secondary traffickers associated with the order. This value is optional.
   */
  secondaryTraffickerIds: number[];

  /**
   * The unique ID of the {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.User User} responsible for the sales of the **Order**. This value is optional.
   */
  salespersonId: number;

  /**
   * The IDs of the secondary salespeople associated with the order. This value is optional.
   */
  secondarySalespersonIds: number[];

  /**
   * Total impressions delivered for all line items of this **Order**. This value is read-only and is assigned by Google.
   */
  totalImpressionsDelivered: number;

  /**
   * Total clicks delivered for all line items of this **Order**. This value is read-only and is assigned by Google.
   */
  totalClicksDelivered: number;

  /**
   * Total viewable impressions delivered for all line items of this **Order**.
   * This value is read-only and is assigned by Google.
   * Starting in v201705, this will be null when the order does not have line items trafficked against a viewable impressions goal.
   */
  totalViewableImpressionsDelivered: number;

  /**
   * Total budget for all line items of this **Order**.
   * This value is a readonly field assigned by Google and is calculated from the associated
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/ForecastService.LineItem#costPerUnit LineItem.costPerUnit} values.
   */
  totalBudget: Money;

  /**
   * The set of labels applied directly to this order.
   */
  appliedLabels: AppliedLabel[];

  /**
   * Contains the set of labels applied directly to the order as well as those inherited from the company that owns the order.
   * If a label has been negated, only the negated label is returned. This field is readonly and is assigned by Google.
   */
  effectiveAppliedLabels: AppliedLabel[];

  /**
   * The application which modified this order. This attribute is read only and is assigned by Google.
   */
  lastModifiedByApp: string;

  /**
   * Specifies whether or not the **Order** is a programmatic order. This value is optional and defaults to false.
   */
  isProgrammatic: boolean;

  /**
   * The IDs of all teams that this order is on directly.
   */
  appliedTeamIds: number[];

  /**
   * The date and time this order was last modified.
   */
  lastModifiedDateTime: DateTime;

  /**
   * The values of the custom fields associated with this order.
   */
  customFieldValues: CustomFieldValue | DropDownCustomFieldValue;
};

export type OrderAction =
  | 'ApproveOrders'
  | 'ApproveOrdersWithoutReservationChanges'
  | 'ArchiveOrders'
  | 'DeleteOrders'
  | 'DisapproveOrders'
  | 'DisapproveOrdersWithoutReservationChanges'
  | 'PauseOrders'
  | 'ResumeOrders'
  | 'RetractOrders'
  | 'RetractOrdersWithoutReservationChanges'
  | 'SubmitOrdersForApproval'
  | 'SubmitOrdersForApprovalWithoutReservationChanges'
  | 'UnarchiveOrders';

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/OrderService.Order Order} objects.
 */
export type OrderPage = PageResult<Order>;
