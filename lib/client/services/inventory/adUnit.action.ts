/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit AdUnit} objects.
 */
export abstract class AdUnitAction {}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit AdUnit} objects.
 */
export class ActivateAdUnits implements AdUnitAction {}

/**
 * The action used for archiving {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit AdUnit} objects.
 */
export class ArchiveAdUnits implements AdUnitAction {}

/**
 * The action used for deactivating {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit AdUnit} objects.
 */
export class DeactivateAdUnits implements AdUnitAction {}
