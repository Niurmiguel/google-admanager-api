/**
 * Describes the status of a {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentService.Content?hl=pt Content} object.
 */
export enum ContentStatus {
  /**
   * Indicates the Content has been created and is eligible to have ads served against it.
   */
  ACTIVE = 'ACTIVE',
  /**
   * Indicates the Content has been deactivated and cannot have ads served against it.
   */
  INACTIVE = 'INACTIVE',
  /**
   * Indicates the Content has been archived; user-visible.
   */
  ARCHIVED = 'ARCHIVED',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Describes who defined the effective status of the Content.
 */
export enum ContentStatusDefinedBy {
  /**
   * Indicates that the status of the Content is defined by the CMS.
   */
  CMS = 'CMS',
  /**
   * Indicates that the status of the Content is defined by the user.
   */
  USER = 'USER',
}

/**
 * The status of the DAI ingestion process. Only content with a status of {@link https://developers.google.com/ad-manager/api/reference/v202202/ContentService.DaiIngestStatus#SUCCESS SUCCESS} will be available for dynamic ad insertion.
 */
export enum DaiIngestStatus {
  /**
   * The content was successfully ingested for DAI.
   */
  SUCCESS = 'SUCCESS',
  /**
   * There was a non-fatal issue during the DAI ingestion proccess.
   */
  WARNING = 'WARNING',
  /**
   * There was a non-fatal issue during the DAI ingestion proccess and the content is not available for dynamic ad insertion.
   */
  FAILURE = 'FAILURE',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Describes what caused the DAI content to fail during the ingestion process.
 */
export enum DaiIngestErrorReason {
  /**
   * The ingest URL provided in the publisher's content source feed is invalid. The trigger for this error is the ingest URL specified in the publisher's feed.
   */
  INVALID_INGEST_URL = 'INVALID_INGEST_URL',
  /**
   * The closed caption URL provided in the publisher's content source feed is invalid. The trigger for this error is the closed caption URL specified in the publisher's feed.
   */
  INVALID_CLOSED_CAPTION_URL = 'INVALID_CLOSED_CAPTION_URL',
  /**
   * There is no closed caption URL for a content in the publisher's content source feed. There is no trigger for this error.
   */
  MISSING_CLOSED_CAPTION_URL = 'MISSING_CLOSED_CAPTION_URL',
  /**
   * There was an error while trying to fetch the HLS from the specified ingest URL. The trigger for this error is the ingest URL specified in the publisher's feed.
   */
  COULD_NOT_FETCH_HLS = 'COULD_NOT_FETCH_HLS',
  /**
   * There was an error while trying to fetch the subtitles from the specified closed caption url. The trigger for this error is the closed caption URL specified in the publisher's feed.
   */
  COULD_NOT_FETCH_SUBTITLES = 'COULD_NOT_FETCH_SUBTITLES',
  /**
   * One of the subtitles from the closed caption URL is missing a language. The trigger for this error is the closed caption URL that does not have a language associated with it.
   */
  MISSING_SUBTITLE_LANGUAGE = 'MISSING_SUBTITLE_LANGUAGE',
  /**
   * Error fetching the media files from the URLs specified in the master HLS playlist. The trigger for this error is a media playlist URL within the publisher's HLS playlist that could not be fetched.
   */
  COULD_NOT_FETCH_MEDIA = 'COULD_NOT_FETCH_MEDIA',
  /**
   * The media from the publisher's CDN is malformed and cannot be conditioned. The trigger for this error is a media playlist URL within the publisher's HLS playlist that is malformed.
   */
  MALFORMED_MEDIA_BYTES = 'MALFORMED_MEDIA_BYTES',
  /**
   * A chapter time for the content is outside of the range of the content's duration. The trigger for this error is the chapter time (a parsable long representing the time in ms) that is out of bounds.
   */
  CHAPTER_TIME_OUT_OF_BOUNDS = 'CHAPTER_TIME_OUT_OF_BOUNDS',
  /**
   * An internal error occurred while conditioning the content. There is no trigger for this error.
   */
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  /**
   * The content has chapter times but the content's source has no CDN settings for midrolls. There is no trigger for this error.
   */
  CONTENT_HAS_CHAPTER_TIMES_BUT_NO_MIDROLL_SETTINGS = 'CONTENT_HAS_CHAPTER_TIMES_BUT_NO_MIDROLL_SETTINGS',
  /**
   * There is bad/missing/malformed data in a media playlist. The trigger for this error is the URL that points to the malformed media playlist.
   */
  MALFORMED_MEDIA_PLAYLIST = 'MALFORMED_MEDIA_PLAYLIST',
  /**
   * Multiple ways of denoting ad breaks were detected in a media playlist (e.g. placement opportunity tags, cue markers, etc.)
   */
  MIXED_AD_BREAK_TAGS = 'MIXED_AD_BREAK_TAGS',
  /**
   * The ad break tags in the preconditioned content are not in the same locations across all variant playlists.
   */
  AD_BREAK_TAGS_INCONSISTENT_ACROSS_VARIANTS = 'AD_BREAK_TAGS_INCONSISTENT_ACROSS_VARIANTS',
  /**
   * There is bad/missing/malformed data in a subtitles file. The trigger for this error is the URL that points to the malformed subtitles.
   */
  MALFORMED_SUBTITLES = 'MALFORMED_SUBTITLES',
  /**
   * A playlist item has a URL that does not begin with the ingest common path provided in the DAI settings. The trigger for this error is the playlist item URL.
   */
  PLAYLIST_ITEM_URL_DOES_NOT_MATCH_INGEST_COMMON_PATH = 'PLAYLIST_ITEM_URL_DOES_NOT_MATCH_INGEST_COMMON_PATH',
  /**
   * Uploading split media segments failed due to an authentication error.
   */
  COULD_NOT_UPLOAD_SPLIT_MEDIA_AUTHENTICATION_FAILED = 'COULD_NOT_UPLOAD_SPLIT_MEDIA_AUTHENTICATION_FAILED',
  /**
   * Uploading spit media segments failed due to a connection error.
   */
  COULD_NOT_UPLOAD_SPLIT_MEDIA_CONNECTION_FAILED = 'COULD_NOT_UPLOAD_SPLIT_MEDIA_CONNECTION_FAILED',
  /**
   * Uploading split media segments failed due to a write error.
   */
  COULD_NOT_UPLOAD_SPLIT_MEDIA_WRITE_FAILED = 'COULD_NOT_UPLOAD_SPLIT_MEDIA_WRITE_FAILED',
  /**
   * Variants in a playlist do not have the same number of discontinuities. The trigger for this error is the master playlist URI.
   */
  PLAYLISTS_HAVE_DIFFERENT_NUMBER_OF_DISCONTINUITIES = 'PLAYLISTS_HAVE_DIFFERENT_NUMBER_OF_DISCONTINUITIES',
  /**
   * The playlist does not have a starting PTS value. The trigger for this error is the master playlist URI.
   */
  PLAYIST_HAS_NO_STARTING_PTS_VALUE = 'PLAYIST_HAS_NO_STARTING_PTS_VALUE',
  /**
   * The PTS at a discontinuity varies too much between the different variants. The trigger for this error is the master playlist URI.
   */
  PLAYLIST_DISCONTINUITY_PTS_VALUES_DIFFER_TOO_MUCH = 'PLAYLIST_DISCONTINUITY_PTS_VALUES_DIFFER_TOO_MUCH',
  /**
   * A media segment has no PTS. The trigger for this error is the segment data URI.
   */
  SEGMENT_HAS_NO_PTS = 'SEGMENT_HAS_NO_PTS',
  /**
   * The language in the subtitles file does not match the language specified in the feed. The trigger for this error is the feed language and the parsed language separated by a semi-colon, e.g. "en;sp".
   */
  SUBTITLE_LANGUAGE_DOES_NOT_MATCH_LANGUAGE_IN_FEED = 'SUBTITLE_LANGUAGE_DOES_NOT_MATCH_LANGUAGE_IN_FEED',
  /**
   * There are multiple subtitles files at the closed caption URI, and none of them match the language defined in the feed. The trigger for this error is language in the feed.
   */
  CANNOT_DETERMINE_CORRECT_SUBTITLES_FOR_LANGUAGE = 'CANNOT_DETERMINE_CORRECT_SUBTITLES_FOR_LANGUAGE',
  /**
   * No CDN configuration found for the content. The trigger for this error is the content's master playlist URI.
   */
  NO_CDN_CONFIGURATION_FOUND = 'NO_CDN_CONFIGURATION_FOUND',
  /**
   * The content has midrolls but there was no split content config on the CDN configuration for that content so the content was not conditioned. There is no trigger for this error.
   */
  CONTENT_HAS_MIDROLLS_BUT_NO_SPLIT_CONTENT_CONFIG = 'CONTENT_HAS_MIDROLLS_BUT_NO_SPLIT_CONTENT_CONFIG',
  /**
   * The content has midrolls but the source the content was ingested from has mid-rolls disabled, so the content was not conditioned. There is no trigger for this error.
   */
  CONTENT_HAS_MIDROLLS_BUT_SOURCE_HAS_MIDROLLS_DISABLED = 'CONTENT_HAS_MIDROLLS_BUT_SOURCE_HAS_MIDROLLS_DISABLED',
  /**
   * Error parsing ADTS while splitting the content. The trigger for this error is the variant URL and the cue-point separated by a semi-colon, e.g. "www.variant2.com;5000".
   */
  ADTS_PARSE_ERROR = 'ADTS_PARSE_ERROR',
  /**
   * Error splitting an AAC segment. The trigger for this error is the variant URL and the cue-point separated by a semi-colon, e.g. "www.variant2.com;5000".
   */
  AAC_SPLIT_ERROR = 'AAC_SPLIT_ERROR',
  /**
   * Error parsing an AAC file while splitting the content. The trigger for this error is the variant URL and the cue-point separated by a semi-colon, e.g. "www.variant2.com;5000".
   */
  AAC_PARSE_ERROR = 'AAC_PARSE_ERROR',
  /**
   * Error parsing a TS file while splitting the content. The trigger for this error is the variant URL and the cue-point separated by a semi-colon, e.g. "www.variant2.com;5000".
   */
  TS_PARSE_ERROR = 'TS_PARSE_ERROR',
  /**
   * Error splitting a TS file while splitting the content. The trigger for this error is the variant URL and the cue-point separated by a semi-colon, e.g. "www.variant2.com;5000".
   */
  TS_SPLIT_ERROR = 'TS_SPLIT_ERROR',
  /**
   * Encountered an unsupported container format while splitting the content. The trigger for this error is the variant URL and the cue-point separated by a semi-colon, e.g. "www.variant2.com;5000".
   */
  UNSUPPORTED_CONTAINER_FORMAT = 'UNSUPPORTED_CONTAINER_FORMAT',
  /**
   * Encountered multiple elementary streams of the same media type (audio, video) within a transport stream. The trigger for this error is the variant URL and the cue-point separated by a semi-colon, e.g. "www.variant2.com;5000".
   */
  MULTIPLE_ELEMENTARY_STREAMS_OF_SAME_MEDIA_TYPE_IN_TS = 'MULTIPLE_ELEMENTARY_STREAMS_OF_SAME_MEDIA_TYPE_IN_TS',
  /**
   * Encountered an unsupported TS media format while splitting the content. The trigger for this error is the variant URL and the cue-point separated by a semi-colon, e.g. "www.variant2.com;5000".
   */
  UNSUPPORTED_TS_MEDIA_FORMAT = 'UNSUPPORTED_TS_MEDIA_FORMAT',
  /**
   * Error splitting because there were no i-frames near the target split point. The trigger for this error is the variant URL and the cue-point separated by a semi-colon, e.g. "www.variant2.com;5000".
   */
  NO_IFRAMES_NEAR_CUE_POINT = 'NO_IFRAMES_NEAR_CUE_POINT',
  /**
   * Error splitting an AC-3 segment. The trigger for this error is the variant URL and the cue-point separated by a semi-colon, e.g. "www.variant2.com;5000".
   */
  AC3_SPLIT_ERROR = 'AC3_SPLIT_ERROR',
  /**
   * Error parsing an AC-3 file while splitting the content. The trigger for this error is the variant URL and the cue-point separated by a semi-colon, e.g. "www.variant2.com;5000".
   */
  AC3_PARSE_ERROR = 'AC3_PARSE_ERROR',
  /**
   * Error splitting an E-AC-3 segment. The trigger for this error is the variant URL and the cue-point separated by a semi-colon, e.g. "www.variant2.com;5000".
   */
  EAC3_SPLIT_ERROR = 'EAC3_SPLIT_ERROR',
  /**
   * Error caused by an invalid encryption key. The trigger for this error is a media playlist URL within the publisher's HLS playlist that has the invalid encryption key.
   */
  INVALID_ENCRYPTION_KEY = 'INVALID_ENCRYPTION_KEY',
  /**
   * Error parsing an E-AC-3 file while splitting the content. The trigger for this error is the variant URL and the cue-point separated by a semi-colon, e.g. "www.variant2.com;5000".
   */
  EAC3_PARSE_ERROR = 'EAC3_PARSE_ERROR',
  /**
   * Error caused by the number of PTS being a different value than the number of cue points + 1.
   */
  CUE_POINT_COUNT_DOES_NOT_MATCH_PTS_COUNT = 'CUE_POINT_COUNT_DOES_NOT_MATCH_PTS_COUNT',
  /**
   * The subtitle language code should not contain "$$$$$".
   */
  CLOSED_CAPTION_LANGUAGE_VALUE_INVALID = 'CLOSED_CAPTION_LANGUAGE_VALUE_INVALID',
  /**
   * The subtitle name should not contain "$$$$$".
   */
  CLOSED_CAPTION_NAME_VALUE_INVALID = 'CLOSED_CAPTION_NAME_VALUE_INVALID',
  /**
   * The common subtitle characteristics values listed in the HLS spec are: 1)"public.accessibility.transcribes-spoken-dialog", 2)"public.accessibility.describes-music-and-sound", 3)"public.easy-to-read";
   */
  CLOSED_CAPTION_CHARACTERISTICS_VALUE_UNEXPECTED = 'CLOSED_CAPTION_CHARACTERISTICS_VALUE_UNEXPECTED',
  /**
   * Closed captions for a content should be unique by 'language + name'.
   */
  CLOSED_CAPTIONS_WITH_DUPLICATE_KEYS = 'CLOSED_CAPTIONS_WITH_DUPLICATE_KEYS',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}
