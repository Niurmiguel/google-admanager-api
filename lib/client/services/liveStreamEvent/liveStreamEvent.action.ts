/**
 * Represents the actions that can be performed on {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent LiveStreamEvent} objects.
 */
export abstract class LiveStreamEventAction {}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent LiveStreamEvent} objects.
 */
export class ActivateLiveStreamEvents implements LiveStreamEventAction {}

/**
 * The action used for archiving {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent LiveStreamEvent} objects.
 */
export class ArchiveLiveStreamEvents implements LiveStreamEventAction {}

/**
 * The action used for pausing ads {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent LiveStreamEvent} objects.
 */
export class PauseLiveStreamEventAds implements LiveStreamEventAction {}

/**
 * The action used for pausing {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent LiveStreamEvent} objects.
 */
export class PauseLiveStreamEvents implements LiveStreamEventAction {}

/**
 * The action used for refreshing the master playlists of
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent LiveStreamEvent} objects.
 * This action will only get applied to live streams with a refresh type of
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.RefreshType#MANUAL RefreshType.MANUAL}.
 */
export class RefreshLiveStreamEventMasterPlaylists implements LiveStreamEventAction {}
