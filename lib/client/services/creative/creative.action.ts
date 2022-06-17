/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative Creative} objects.
 */
export abstract class CreativeAction {}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative Creative} objects.
 */
export class ActivateCreatives implements CreativeAction {}

/**
 * The action used for deactivating {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative Creative} objects.
 */
export class DeactivateCreatives implements CreativeAction {}
