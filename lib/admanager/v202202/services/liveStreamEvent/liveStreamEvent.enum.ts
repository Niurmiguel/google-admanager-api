/**
 * Describes the status of a {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent LiveStreamEvent} object.
 */
export enum LiveStreamEventStatus {
  /**
   * Indicates the LiveStreamEvent has been created and is eligible for streaming.
   */
  ACTIVE = 'ACTIVE',
  /**
   * Indicates the LiveStreamEvent has been archived.
   */
  ARCHIVED = 'ARCHIVED',
  /**
   * Indicates the LiveStreamEvent has been paused. This can be made ACTIVE at later time.
   */
  PAUSED = 'PAUSED',
  /**
   * Indicates that the stream is still being served, but ad insertion should be paused temporarily.
   */
  ADS_PAUSED = 'ADS_PAUSED',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Describes what should be used to fill an empty ad break during a live stream.
 */
export enum AdBreakFillType {
  /**
   * Ad break should be filled with slate.
   */
  SLATE = 'SLATE',
  /**
   * Ad break should be filled with underlying content.
   */
  UNDERLYING_CONTENT = 'UNDERLYING_CONTENT',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Describes the type of the playlist associated with this live stream. This is analagous to the EXT-X-PLAYLIST-TYPE HLS tag.
 * Use PlaylistType.EVENT for streams with the value "#EXT-X-PLAYLIST-TYPE:EVENT" and use PlaylistType.LIVE for streams without the tag.
 */
export enum PlaylistType {
  /**
   * The playlist is an event, which means that media segments can only be added to the end of the playlist. This allows viewers to scrub back to the beginning of the playlist.
   */
  EVENT = 'EVENT',
  /**
   * The playlist is a live stream and there are no restrictions on whether media segments can be removed from the beginning of the playlist.
   */
  LIVE = 'LIVE',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Enumerates the different ways an HLS master playlist on a live stream will can be refreshed.
 */
export enum RefreshType {
  /**
   * The master playlist will automatically be refreshed.
   */
  AUTOMATIC = 'AUTOMATIC',
  /**
   * The master playlist will only be refreshed when requested.
   */
  MANUAL = 'MANUAL',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Describes how the live stream will have ads dynamically inserted into playlists.
 */
export enum DynamicAdInsertionType {
  /**
   * Content manifest is served by Google DAI. Content and ads are stitched together into a unique video manifest per user.
   */
  LINEAR = 'LINEAR',
  /**
   * Content manifest is served by the partner, embedding Google DAI ad segment URLs which redirect to unique Google DAI ad segments per user.
   */
  POD_SERVING_REDIRECT = 'POD_SERVING_REDIRECT',
  /**
   * Ads manifest is served by Google DAI, containing unique ad pod segments for the video player to switch to from the content stream, or for the partner to stitch directly into the user content manifest.
   */
  POD_SERVING_MANIFEST = 'POD_SERVING_MANIFEST',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * The {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent LiveStreamEvent} streaming format.
 */
export enum StreamingFormat {
  /**
   * The format of the live stream media is HTTP Live Streaming.
   */
  HLS = 'HLS',
  /**
   * The format of the live stream media is MPEG-DASH.
   */
  DASH = 'DASH',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Describes the SCTE ad break markups for a LiveStreamEvent.
 */
export enum AdBreakMarkupType {
  /**
   * The CUE-OUT/CUE-IN ad break marker type. This mark up type is only applicable for HLS live streams.
   */
  AD_BREAK_MARKUP_HLS_EXT_CUE = 'AD_BREAK_MARKUP_HLS_EXT_CUE',
  /**
   * The CUE (Adobe/Azure Prime Time) ad break marker type. This mark up type is only applicable for HLS live streams.
   */
  AD_BREAK_MARKUP_HLS_PRIMETIME_SPLICE = 'AD_BREAK_MARKUP_HLS_PRIMETIME_SPLICE',
  /**
   * The DATERANGE (Anvato) ad break marker type. This mark up type is only applicable for HLS live streams.
   */
  AD_BREAK_MARKUP_HLS_DATERANGE_SPLICE = 'AD_BREAK_MARKUP_HLS_DATERANGE_SPLICE',
  /**
   * The SCTE35 XML Splice In/Out ad break marker type. This markup type is only applicable for DASH live streams.
   */
  AD_BREAK_MARKUP_SCTE35_XML_SPLICE_INSERT = 'AD_BREAK_MARKUP_SCTE35_XML_SPLICE_INSERT',
  /**
   * The SCTE35 Binary Splice Insert ad break marker type. This mark up type is only applicable for HLS and DASH live streams.
   */
  AD_BREAK_MARKUP_SCTE35_BINARY_SPLICE_INSERT = 'AD_BREAK_MARKUP_SCTE35_BINARY_SPLICE_INSERT',
  /**
   * The SCTE35 Binary Time Signal: Provider Ad Start/End ad break marker type. This mark up type is only applicable for HLS and DASH live streams.
   */
  AD_BREAK_MARKUP_SCTE35_BINARY_PROVIDER_AD_START_END = 'AD_BREAK_MARKUP_SCTE35_BINARY_PROVIDER_AD_START_END',
  /**
   * The SCTE35 Binary Time Signal: Provider Placement Opportunity Start/End ad break marker type. This mark up type is only applicable for HLS and DASH live streams.
   */
  AD_BREAK_MARKUP_SCTE35_BINARY_PROVIDER_PLACEMENT_OP_START_END = 'AD_BREAK_MARKUP_SCTE35_BINARY_PROVIDER_PLACEMENT_OP_START_END',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Indicates how the ads of the live stream should be served.
 */
export enum AdServingFormat {
  /**
   * The ads are served through Google Ad Manager DAI.
   */
  AD_MANAGER_DAI = 'AD_MANAGER_DAI',
  /**
   * The ads are served through Google Ad Manager Ad Serving.
   */
  DIRECT = 'DIRECT',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Describes the status of a Slate object.
 */
export enum SlateStatus {
  /**
   * Indicates the Slate has been created and is eligible for streaming.
   */
  ACTIVE = 'ACTIVE',
  /**
   * Indicates the Slate has been archived.
   */
  ARCHIVED = 'ARCHIVED',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Possible server side transcoding states.
 */
export enum TranscodeStatus {
  UNKNOWN = 'UNKNOWN',
  NOT_READY = 'NOT_READY',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  NEEDS_TRANSCODE = 'NEEDS_TRANSCODE',
  IN_PROGRESS = 'IN_PROGRESS',
}
