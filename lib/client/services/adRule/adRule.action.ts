/**
 * Represents the actions that can be performed on AdRule objects.
 */
export abstract class AdRuleAction {}

/**
 * The action used for resuming AdRule objects.
 */
export class ActivateAdRules implements AdRuleAction {}

/**
 * The action used for pausing AdRule objects.
 */
export class DeactivateAdRules implements AdRuleAction {}

/**
 * The action used for deleting AdRule objects.
 */
export class DeleteAdRules implements AdRuleAction {}
