/**
 * Represents the actions that can be performed on TargetingPreset objects.
 */
export abstract class TargetingPresetAction {}

/**
 * Action to delete saved targeting expressions.
 */
export class DeleteTargetingPresetAction implements TargetingPresetAction {}
