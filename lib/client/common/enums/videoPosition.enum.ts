/**
 * Represents a targetable position within a video.
 */
export enum VideoPositionType {
  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',

  /**
   * 	This position targets all of the above video positions.
   */
  ALL = 'ALL',

  /**
   * 	The position defined as showing before the video starts playing.
   */
  PREROLL = 'PREROLL',

  /**
   * 	The position defined as showing within the middle of the playing video.
   */
  MIDROLL = 'MIDROLL',

  /**
   * 	The position defined as showing after the video is completed.
   */
  POSTROLL = 'POSTROLL',
}

/**
 * Represents the options for targetable bumper positions, surrounding an ad pod, within a video stream. This includes before and after the supported ad pod positions, VideoPositionType.PREROLL, VideoPositionType.MIDROLL, and VideoPositionType.POSTROLL.
 */
export enum VideoBumperType {
  /**
   * 	Represents the bumper position before the ad pod.
   */
  BEFORE = 'BEFORE',

  /**
   * 	Represents the bumper position after the ad pod.
   */
  AFTER = 'AFTER',
}
