/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.CdnConfiguration CdnConfiguration} objects.
 */
export abstract class CdnConfigurationAction {}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.CdnConfiguration CdnConfiguration} objects.
 */
export class ActivateCdnConfigurations implements CdnConfigurationAction {}

/**
 * The action used for archiving {@link https://developers.google.com/ad-manager/api/reference/v202202/CdnConfigurationService.CdnConfiguration CdnConfiguration} objects.
 */
export class ArchiveCdnConfigurations implements CdnConfigurationAction {}
