/**
 * Represents an action that can be performed on native styles.
 */
export abstract class NativeStyleAction {}

/**
 * Action to activate native styles.
 */
export class ActivateNativeStyles implements NativeStyleAction {}

/**
 * Action to archive native styles.
 */
export class ArchiveNativeStyles implements NativeStyleAction {}

/**
 * Action to deactivate native styles.
 */
export class DeactivateNativeStyles implements NativeStyleAction {}
