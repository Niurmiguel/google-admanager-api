/**
 * Represents the actions that can be performed on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.DaiAuthenticationKey DaiAuthenticationKey} objects.
 */
export abstract class DaiAuthenticationKeyAction {}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.DaiAuthenticationKey DaiAuthenticationKey} objects.
 */
export class ActivateDaiAuthenticationKeys implements DaiAuthenticationKeyAction {}

/**
 * The action used for deactivating {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiAuthenticationKeyService.DaiAuthenticationKey DaiAuthenticationKey} objects.
 */
export class DeactivateDaiAuthenticationKeys implements DaiAuthenticationKeyAction {}
