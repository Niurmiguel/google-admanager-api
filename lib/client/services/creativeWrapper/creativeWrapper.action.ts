/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapper CreativeWrapper} objects.
 */
export abstract class CreativeWrapperAction {}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapper CreativeWrapper} objects.
 */
export class ActivateCreativeWrappers implements CreativeWrapperAction {}

/**
 * The action used for deactivating {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapper CreativeWrapper} objects.
 */
export class DeactivateCreativeWrappers implements CreativeWrapperAction {}
