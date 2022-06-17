/**
 * Represents the actions that can be performed on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataKey CmsMetadataKey} objects.
 */
export abstract class CmsMetadataKeyAction {}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataKey CmsMetadataKey} objects.
 */
export class ActivateCmsMetadataKeys implements CmsMetadataKeyAction {}

/**
 * The action used for deactivating {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataKey CmsMetadataKey} objects.
 */
export class DeactivateCmsMetadataKeys implements CmsMetadataKeyAction {}

/**
 * Represents the actions that can be performed on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataValue CmsMetadataValue} objects.
 */
export abstract class CmsMetadataValueAction {}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataValue CmsMetadataValue} objects.
 */
export class ActivateCmsMetadataValues implements CmsMetadataValueAction {}

/**
 * The action used for deactivating {@link https://developers.google.com/ad-manager/api/reference/v202202/CmsMetadataService.CmsMetadataValue CmsMetadataValue} objects.
 */
export class DeactivateCmsMetadataValues implements CmsMetadataValueAction {}
