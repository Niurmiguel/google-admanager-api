// Generated from the Ad Manager v202608 WSDLs by scripts/generate-enums.js.
// Do not edit values or comments by hand: run `npm run generate:enums`.
// To add an enum, declare it empty (`export enum Name {}`) and run the script.

export enum ReportingType {
  DISABLED = 'DISABLED',
  CLIENT = 'CLIENT',
  SERVER = 'SERVER',
  AD_MEDIA = 'AD_MEDIA',
  UNKNOWN = 'UNKNOWN',
}

export enum SamErrorType {
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  AD_REQUEST_ERROR = 'AD_REQUEST_ERROR',
  VAST_PARSE_ERROR = 'VAST_PARSE_ERROR',
  UNSUPPORTED_AD_SYSTEM = 'UNSUPPORTED_AD_SYSTEM',
  CANNOT_FIND_UNIQUE_TRANSCODE_ID = 'CANNOT_FIND_UNIQUE_TRANSCODE_ID',
  CANNOT_FIND_MEDIA_FILE_PATH = 'CANNOT_FIND_MEDIA_FILE_PATH',
  MISSING_INLINE_ELEMENTS = 'MISSING_INLINE_ELEMENTS',
  MAX_WRAPPER_DEPTH_REACHED = 'MAX_WRAPPER_DEPTH_REACHED',
  INVALID_AD_SEQUENCE_NUMBER = 'INVALID_AD_SEQUENCE_NUMBER',
  FAILED_PING = 'FAILED_PING',
  AD_TAG_PARSE_ERROR = 'AD_TAG_PARSE_ERROR',
  VMAP_PARSE_ERROR = 'VMAP_PARSE_ERROR',
  INVALID_VMAP_RESPONSE = 'INVALID_VMAP_RESPONSE',
  NO_AD_BREAKS_IN_VMAP = 'NO_AD_BREAKS_IN_VMAP',
  CUSTOM_AD_SOURCE_IN_VMAP = 'CUSTOM_AD_SOURCE_IN_VMAP',
  AD_BREAK_TYPE_NOT_SUPPORTED = 'AD_BREAK_TYPE_NOT_SUPPORTED',
  NEITHER_AD_SOURCE_NOR_TRACKING = 'NEITHER_AD_SOURCE_NOR_TRACKING',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  AD_POD_DROPPED_TO_MANY_AD_PODS = 'AD_POD_DROPPED_TO_MANY_AD_PODS',
  AD_POD_DROPPED_EMPTY_ADS = 'AD_POD_DROPPED_EMPTY_ADS',
  AD_BREAK_WITHOUT_AD_POD = 'AD_BREAK_WITHOUT_AD_POD',
  TRANSCODING_IN_PROGRESS = 'TRANSCODING_IN_PROGRESS',
  UNSUPPORTED_VAST_VERSION = 'UNSUPPORTED_VAST_VERSION',
  AD_POD_DROPPED_BUMPER_ERROR = 'AD_POD_DROPPED_BUMPER_ERROR',
  NO_VALID_MEDIAFILES_FOUND = 'NO_VALID_MEDIAFILES_FOUND',
  EXCEEDS_MAX_FILLER = 'EXCEEDS_MAX_FILLER',
  SKIPPABLE_AD_NOT_SUPPORTED = 'SKIPPABLE_AD_NOT_SUPPORTED',
  AD_REQUEST_TIMEOUT = 'AD_REQUEST_TIMEOUT',
  AD_POD_DROPPED_UNSUPPORTED_TYPE = 'AD_POD_DROPPED_UNSUPPORTED_TYPE',
  DUPLICATE_AD_TAG = 'DUPLICATE_AD_TAG',
  FOLLOW_REDIRECTS_IS_FALSE = 'FOLLOW_REDIRECTS_IS_FALSE',
  AD_POD_DROPPED_INCOMPATIBLE_TIMEOFFSET = 'AD_POD_DROPPED_INCOMPATIBLE_TIMEOFFSET',
  UNKNOWN = 'UNKNOWN',
}

/**
 * The type of the `creativeId`.
 */
export enum CreativeTranscodeIdType {
  /**
   * An ad server-defined identifier string for the ad.
   */
  AD_ID = 'AD_ID',
  /**
   * An ad server-defined identifier for the creative.
   */
  CREATIVE_ID = 'CREATIVE_ID',
  /**
   * Identifies the ad with which the creative is served.
   */
  CREATIVE_ADID = 'CREATIVE_ADID',
  /**
   * Universal Ad ID creative identifier defined in the VAST 4.0 spec.
   */
  UNIVERSAL_AD_ID = 'UNIVERSAL_AD_ID',
  /**
   * The path of the URL of the highest bitrate mediafile found in the response.
   */
  MEDIA_URI = 'MEDIA_URI',
  /**
   * The path of the URL of the highest bitrate mediafile found in the response.
   */
  MEDIA_URI_PATH = 'MEDIA_URI_PATH',
  /**
   * ID value is either the "adId" attribute in the VAST/Ad/Inline/Creative element, the "id" attribute in the VAST/Ad/Inline/Creative, or the "id" attribute in the VAST/Ad element.
   */
  CREATIVE_ADID_WITH_FALLBACK = 'CREATIVE_ADID_WITH_FALLBACK',
  /**
   * ID value is a projection of the URL of the highest bitrate mediafile found in the response.
   */
  CANONICALIZED_MEDIA_URI = 'CANONICALIZED_MEDIA_URI',
  /**
   * ID value is the Google Video Registry ID
   */
  GV_REGISTRY_ID = 'GV_REGISTRY_ID',
  /**
   * The ID type is unknown.
   */
  UNKNOWN_ID_TYPE = 'UNKNOWN_ID_TYPE',
  /**
   * ID value is the path of the URL of the highest bitrate mediafile found in the response.
   */
  MEDIA_URI_HASH = 'MEDIA_URI_HASH',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
