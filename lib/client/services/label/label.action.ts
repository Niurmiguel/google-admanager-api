/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label Label} objects.
 */
export abstract class LabelAction {}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label Label} objects.
 */
export class ActivateLabels implements LabelAction {}

/**
 * The action used for deactivating {@link https://developers.google.com/ad-manager/api/reference/v202202/LabelService.Label Label} objects.
 */
export class DeactivateLabels implements LabelAction {}
