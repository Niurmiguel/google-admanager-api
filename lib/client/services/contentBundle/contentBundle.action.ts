/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentBundleService.ContentBundle?hl=pt ContentBundle} objects.
 */
export abstract class ContentBundleAction {}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentBundleService.ContentBundle?hl=pt ContentBundle} objects.
 */
export class ActivateContentBundles implements ContentBundleAction {}

/**
 * The action used for deactivating {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentBundleService.ContentBundle?hl=pt ContentBundle} objects.
 */
export class DeactivateContentBundles implements ContentBundleAction {}
