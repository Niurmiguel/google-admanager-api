/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Placement Placement} objects.
 */
export abstract class PlacementAction {}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Placement Placement} objects.
 */
export class ActivatePlacements implements PlacementAction {}

/**
 * The action used for archiving {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Placement Placement} objects.
 */
export class ArchivePlacements implements PlacementAction {}

/**
 * The action used for deactivating {@link https://developers.google.com/ad-manager/api/reference/v202202/PlacementService.Placement Placement} objects.
 */
export class DeactivatePlacements implements PlacementAction {}
