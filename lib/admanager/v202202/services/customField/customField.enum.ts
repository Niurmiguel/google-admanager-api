/**
 * Entity types recognized by custom fields
 */
export enum CustomFieldEntityType {
  /**
   * Represents the LineItem type.
   */
  LINE_ITEM = 'LINE_ITEM',
  /**
   * Represents the Order type.
   */
  ORDER = 'ORDER',
  /**
   * Represents the Creative type.
   */
  CREATIVE = 'CREATIVE',
  /**
   * Represents the ProductTemplate type.
   */
  PRODUCT_TEMPLATE = 'PRODUCT_TEMPLATE',
  /**
   * Represents the Product type.
   */
  PRODUCT = 'PRODUCT',
  /**
   * Represents the Proposal type.
   */
  PROPOSAL = 'PROPOSAL',
  /**
   * Represents the ProposalLineItem type.
   */
  PROPOSAL_LINE_ITEM = 'PROPOSAL_LINE_ITEM',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * The data types allowed for {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField} objects.
 */
export enum CustomFieldDataType {
  /**
   * A string field. The max length is 255 characters.
   */
  STRING = 'STRING',
  /**
   * A number field.
   */
  NUMBER = 'NUMBER',
  /**
   * A boolean field. Values may be "true", "false", or empty.
   */
  TOGGLE = 'TOGGLE',
  /**
   * A drop-down field. Values may only be the ids of CustomFieldOption objects.
   */
  DROP_DOWN = 'DROP_DOWN',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * The visibility levels of a custom field.
 */
export enum CustomFieldVisibility {
  /**
   * Only visible through the API.
   */
  API_ONLY = 'API_ONLY',
  /**
   * Visible in the UI, but only editable through the API
   */
  READ_ONLY = 'READ_ONLY',
  /**
   * Visible and editable both in the API and the UI.
   */
  FULL = 'FULL',
}
