/**
 * Describes the status of a {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfile DaiEncodingProfile} object.
 */
export enum DaiEncodingProfileStatus {
  /**
   * Indicates the DaiEncodingProfile has been created and is eligible for streaming.
   */
  ACTIVE = 'ACTIVE',
  /**
   * Indicates the DaiEncodingProfile has been archived.
   */
  ARCHIVED = 'ARCHIVED',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Describes the variant playlist type that the profile represents.
 */
export enum VariantType {
  /**
   * Media variant playlist type. Media playlists may: contain audio only, video only, or audio and video.
   */
  MEDIA = 'MEDIA',
  /**
   * iFrame variant playlist type. iFrame playlists may: contain video or contain audio and video (i.e. video must be present).
   */
  IFRAME = 'IFRAME',
  /**
   * Subtitles variant playlist type.
   */
  SUBTITLES = 'SUBTITLES',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Describes the digital media container type of the underlying media.
 */
export enum ContainerType {
  /**
   * Transport stream (TS) container.
   */
  TS = 'TS',
  /**
   * Fragmented MPEG-4 (fMP4) output container.
   */
  FMP4 = 'FMP4',
  /**
   * HTTP live streaming (HLS) packed audio container.
   */
  HLS_AUDIO = 'HLS_AUDIO',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
