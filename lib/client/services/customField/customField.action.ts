/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField} objects.
 */
export abstract class CustomFieldAction {}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField} objects.
 */
export class ActivateCustomFields implements CustomFieldAction {}

/**
 * The action used for deactivating {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomFieldService.CustomField CustomField} objects.
 */
export class DeactivateCustomFields implements CustomFieldAction {}
