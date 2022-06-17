/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication mobile applications}.
 */
export abstract class MobileApplicationAction {}

/**
 * The action used to deactivate {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication MobileApplication} objects.
 */
export class ArchiveMobileApplications implements MobileApplicationAction {}

/**
 * The action used to activate {@link https://developers.google.com/ad-manager/api/reference/v202202/MobileApplicationService.MobileApplication MobileApplication} objects.
 */
export class UnarchiveMobileApplications implements MobileApplicationAction {}
