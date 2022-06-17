/**
 * Represents the actions that can be performed on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey CustomTargetingKey} objects.
 */
export abstract class CustomTargetingKeyAction {}

/**
 * The action used for activating inactive (i.e. deleted)
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey CustomTargetingKey} objects.
 */
export class ActivateCustomTargetingKeys implements CustomTargetingKeyAction {}

/**
 * Represents the delete action that can be performed on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingKey CustomTargetingKey} objects.
 */
export class DeleteCustomTargetingKeys implements CustomTargetingKeyAction {}

/**
 * Represents the actions that can be performed on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue CustomTargetingValue} objects.
 */
export abstract class CustomTargetingValueAction {}

/**
 * The action used for activating inactive (i.e. deleted)
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue CustomTargetingValue} objects.
 */
export class ActivateCustomTargetingValues implements CustomTargetingValueAction {}

/**
 * Represents the delete action that can be performed on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CustomTargetingService.CustomTargetingValue CustomTargetingValue} objects.
 */
export class DeleteCustomTargetingValues implements CustomTargetingValueAction {}
