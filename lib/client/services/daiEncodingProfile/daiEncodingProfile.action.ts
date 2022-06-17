/**
 * Represents the actions that can be performed on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfile DaiEncodingProfile} objects.
 */
export abstract class DaiEncodingProfileAction {}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfile DaiEncodingProfile} objects.
 */
export class ActivateDaiEncodingProfiles implements DaiEncodingProfileAction {}

/**
 * The action used for archiving {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfile DaiEncodingProfile} objects.
 */
export class ArchiveDaiEncodingProfiles implements DaiEncodingProfileAction {}
