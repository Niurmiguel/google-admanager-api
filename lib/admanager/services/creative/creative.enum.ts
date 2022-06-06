/**
 * Represents the different types of policy violations that may be detected on a given creative.
 *
 * For more information about the various types of policy violations, see {@link https://support.google.com/adspolicy/answer/6008942 here}.
 */
export enum CreativePolicyViolation {
  /**
   * Malware was found in the creative.
   *
   * For more information see here.
   */
  MALWARE_IN_CREATIVE = 'MALWARE_IN_CREATIVE',

  /**
   * Malware was found in the landing page.
   *
   * For more information see here.
   */
  MALWARE_IN_LANDING_PAGE = 'MALWARE_IN_LANDING_PAGE',

  /**
   * The redirect url contains legally objectionable content.
   */
  LEGALLY_BLOCKED_REDIRECT_URL = 'LEGALLY_BLOCKED_REDIRECT_URL',
  /**
   * The creative misrepresents the product or service being advertised.
   *
   * For more information see here.
   */
  MISREPRESENTATION_OF_PRODUCT = 'MISREPRESENTATION_OF_PRODUCT',

  /**
   * The creative has been determined to be self clicking.
   */
  SELF_CLICKING_CREATIVE = 'SELF_CLICKING_CREATIVE',
  /**
   * The creative has been determined as attempting to game the Google network.
   *
   * For more information see here.
   */
  GAMING_GOOGLE_NETWORK = 'GAMING_GOOGLE_NETWORK',

  /**
   * The landing page for the creative uses a dynamic DNS.
   *
   * For more information see here.
   */
  DYNAMIC_DNS = 'DYNAMIC_DNS',

  /**
   * The creative has been determined as attempting to circumvent Google advertising systems.
   */
  CIRCUMVENTING_SYSTEMS = 'CIRCUMVENTING_SYSTEMS',
  /**
   * Phishing found in creative or landing page.
   *
   * For more information see here.
   */
  PHISHING = 'PHISHING',

  /**
   * The creative prompts the user to download a file.
   *
   * For more information see here
   */
  DOWNLOAD_PROMPT_IN_CREATIVE = 'DOWNLOAD_PROMPT_IN_CREATIVE',

  /**
   * The creative sets an unauthorized cookie on a Google domain.
   *
   * For more information see here
   */
  UNAUTHORIZED_COOKIE_DETECTED = 'UNAUTHORIZED_COOKIE_DETECTED',

  /**
   * The creative has been temporarily paused while we investigate.
   */
  TEMPORARY_PAUSE_FOR_VENDOR_INVESTIGATION = 'TEMPORARY_PAUSE_FOR_VENDOR_INVESTIGATION',
  /**
   * The landing page contains an abusive experience.
   *
   * For more information see here.
   */
  ABUSIVE_EXPERIENCE = 'ABUSIVE_EXPERIENCE',

  /**
   * The creative is designed to mislead or trick the user into interacting with it.
   *
   * For more information see here.
   */
  TRICK_TO_CLICK = 'TRICK_TO_CLICK',

  /**
   * Non-allowlisted OMID verification script.
   *
   * For more information see here.
   */
  USE_OF_NON_ALLOWLISTED_OMID_VERIFICATION_SCRIPT = 'USE_OF_NON_ALLOWLISTED_OMID_VERIFICATION_SCRIPT',

  /**
   * OMID sdk injected by creative. < p>For more information see here.
   */
  MISUSE_OF_OMID_API = 'MISUSE_OF_OMID_API',
  /**
   * Unacceptable HTML5 ad.
   *
   * For more information see here.
   */
  UNACCEPTABLE_HTML_AD = 'UNACCEPTABLE_HTML_AD',

  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Different creative format supported by Rich Media Studio creative.
 */
export enum RichMediaStudioCreativeFormat {
  /**
   * In-page creatives are served into an ad slot on publishers page. In-page implies that they maintain a static size, e.g, 468x60 and do not break out of these dimensions.
   */
  IN_PAGE = 'IN_PAGE',
  /**
   * Expanding creatives expand/collapse on user interaction such as mouse over. It consists of an initial, or collapsed and an expanded creative area.
   */
  EXPANDING = 'EXPANDING',
  /**
   * Creatives that are served in an instant messenger application such as AOL Instant Messanger or Yahoo! Messenger. This can also be used in desktop applications such as weatherbug.
   */
  IM_EXPANDING = 'IM_EXPANDING',
  /**
   * Floating creatives float on top of publishers page and can be closed with a close button.
   */
  FLOATING = 'FLOATING',
  /**
   * Peel-down creatives show a glimpse of your ad in the corner of a web page. When the user interacts, the rest of the ad peels down to reveal the full message.
   */
  PEEL_DOWN = 'PEEL_DOWN',
  /**
   * An In-Page with Floating creative is a dual-asset creative consisting of an in-page asset and a floating asset. This creative type lets you deliver a static primary ad to a webpage, while inviting a user to find out more through a floating asset delivered when the user interacts with the creative.
   */
  IN_PAGE_WITH_FLOATING = 'IN_PAGE_WITH_FLOATING',
  /**
   * A Flash ad that renders in a Flash environment. The adserver will serve this using VAST, but it is not a proper VAST XML ad. It's an amalgamation of the proprietary InStream protocol, rendered inside VAST so that we can capture some standard behavior such as companions.
   */
  FLASH_IN_FLASH = 'FLASH_IN_FLASH',
  /**
   * An expanding flash ad that renders in a Flash environment. The adserver will serve this using VAST, but it is not a proper VAST XML ad. It's an amalgamation of the proprietary InStream protocol, rendered inside VAST so that we can capture some standard behavior such as companions.
   */
  FLASH_IN_FLASH_EXPANDING = 'FLASH_IN_FLASH_EXPANDING',
  /**
   * In-app creatives are served into an ad slot within a publisher's app. In-app implies that they maintain a static size, e.g, 468x60 and do not break out of these dimensions.
   */
  IN_APP = 'IN_APP',
  /**
   * The creative format is unknown or not supported in the API version in use.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Rich Media Studio creative artwork types.
 */
export enum RichMediaStudioCreativeArtworkType {
  /**
   * The creative is a Flash creative.
   */
  FLASH = 'FLASH',
  /**
   * The creative is HTML5.
   */
  HTML5 = 'HTML5',
  /**
   * The creative is Flash if available, and HTML5 otherwise.
   */
  MIXED = 'MIXED',
}

/**
 * Rich Media Studio creative supported billing attributes.
 *
 * This is determined by Rich Media Studio based on the content of the creative and is not updateable.
 */
export enum RichMediaStudioCreativeBillingAttribute {
  /**
   * Applies to any RichMediaStudioCreativeFormat.IN_PAGE, without Video.
   */
  IN_PAGE = 'IN_PAGE',
  /**
   * Applies to any of these following RichMediaStudioCreativeFormat, without Video: RichMediaStudioCreativeFormat.EXPANDING, RichMediaStudioCreativeFormat.IM_EXPANDING, RichMediaStudioCreativeFormat.FLOATING, RichMediaStudioCreativeFormat.PEEL_DOWN, RichMediaStudioCreativeFormat.IN_PAGE_WITH_FLOATING
   */
  FLOATING_EXPANDING = 'FLOATING_EXPANDING',
  /**
   * Applies to any creatives that includes a video.
   */
  VIDEO = 'VIDEO',
  /**
   * Applies to any RichMediaStudioCreativeFormat.FLASH_IN_FLASH, without Video.
   */
  FLASH_IN_FLASH = 'FLASH_IN_FLASH',
}

/**
 * Type of RichMediaStudioChildAssetProperty
 */
export enum RichMediaStudioChildAssetPropertyType {
  /**
   * SWF files
   */
  FLASH = 'FLASH',
  /**
   * FLVS and any other video file types
   */
  VIDEO = 'VIDEO',
  /**
   * Image files
   */
  IMAGE = 'IMAGE',
  /**
   * The rest of the supported file types .txt, .xml, etc.
   */
  DATA = 'DATA',
}

/**
 * Enum to store the creative SSL compatibility scan result.
 */
export enum SslScanResult {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  UNSCANNED = 'UNSCANNED',
  SCANNED_SSL = 'SCANNED_SSL',
  SCANNED_NON_SSL = 'SCANNED_NON_SSL',
}

/**
 * Enum to store the creative SSL compatibility manual override. Its three states are similar to that of SslScanResult.
 */
export enum SslManualOverride {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  NO_OVERRIDE = 'NO_OVERRIDE',
  SSL_COMPATIBLE = 'SSL_COMPATIBLE',
  NOT_SSL_COMPATIBLE = 'NOT_SSL_COMPATIBLE',
}

/**
 * Describes the orientation that a creative should be served with.
 */
export enum LockedOrientation {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  FREE_ORIENTATION = 'FREE_ORIENTATION',
  PORTRAIT_ONLY = 'PORTRAIT_ONLY',
  LANDSCAPE_ONLY = 'LANDSCAPE_ONLY',
}

/**
 * The valid actions that a destination URL may perform if the user clicks on the ad.
 */
export enum DestinationUrlType {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Navigate to a web page. (a.k.a. "Click-through URL").
   */
  CLICK_TO_WEB = 'CLICK_TO_WEB',
  /**
   * Start an application.
   */
  CLICK_TO_APP = 'CLICK_TO_APP',
  /**
   * Make a phone call.
   */
  CLICK_TO_CALL = 'CLICK_TO_CALL',
  /**
   * Destination URL not present. Useful for video creatives where a landing page or a product isn't necessarily applicable.
   */
  NONE = 'NONE',
}

/**
 * Image densities.
 */
export enum ImageDensity {
  /**
   * Indicates that there is a 1:1 ratio between the dimensions of the raw image and the dimensions that it should be displayed at in device-independent pixels.
   */
  ONE_TO_ONE = 'ONE_TO_ONE',
  /**
   * Indicates that there is a 3:2 ratio between the dimensions of the raw image and the dimensions that it should be displayed at in device-independent pixels.
   */
  THREE_TO_TWO = 'THREE_TO_TWO',
  /**
   * Indicates that there is a 2:1 ratio between the dimensions of the raw image and the dimensions that it should be displayed at in device-independent pixels.
   */
  TWO_TO_ONE = 'TWO_TO_ONE',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * The registry that an ad ID belongs to.
 */
export enum AdIdType {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * The ad ID is registered with ad-id.org.
   */
  AD_ID = 'AD_ID',
  /**
   * The ad ID is registered with clearcast.co.uk.
   */
  CLEARCAST = 'CLEARCAST',
  /**
   * The creative does not have an ad ID outside of Ad Manager.
   */
  NONE = 'NONE',
}

/**
 * The different ways a video/flash can scale.
 */
export enum ScalableType {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * The creative should not be scaled.
   */
  NOT_SCALABLE = 'NOT_SCALABLE',
  /**
   * The creative can be scaled and its aspect-ratio must be maintained.
   */
  RATIO_SCALABLE = 'RATIO_SCALABLE',
  /**
   * The creative can be scaled and its aspect-ratio can be distorted.
   */
  STRETCH_SCALABLE = 'STRETCH_SCALABLE',
}

/**
 *
 */
export enum MimeType {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * application/x-asp
   */
  ASP = 'ASP',
  /**
   * audio/aiff
   */
  AUDIO_AIFF = 'AUDIO_AIFF',
  /**
   * audio/basic
   */
  AUDIO_BASIC = 'AUDIO_BASIC',
  /**
   * audio/flac
   */
  AUDIO_FLAC = 'AUDIO_FLAC',
  /**
   * audio/mid
   */
  AUDIO_MID = 'AUDIO_MID',
  /**
   * audio/mpeg
   */
  AUDIO_MP3 = 'AUDIO_MP3',
  /**
   * audio/mp4
   */
  AUDIO_MP4 = 'AUDIO_MP4',
  /**
   * audio/x-mpegurl
   */
  AUDIO_MPEG_URL = 'AUDIO_MPEG_URL',
  /**
   * audio/x-ms-wma
   */
  AUDIO_MS_WMA = 'AUDIO_MS_WMA',
  /**
   * audio/ogg
   */
  AUDIO_OGG = 'AUDIO_OGG',
  /**
   * audio/x-pn-realaudio-plugin
   */
  AUDIO_REAL_AUDIO_PLUGIN = 'AUDIO_REAL_AUDIO_PLUGIN',
  /**
   * audio/x-wav
   */
  AUDIO_WAV = 'AUDIO_WAV',
  /**
   * application/binary
   */
  BINARY = 'BINARY',
  /**
   * application/dash+xml
   */
  DASH = 'DASH',
  /**
   * application/x-director
   */
  DIRECTOR = 'DIRECTOR',
  /**
   * application/x-shockwave-flash
   */
  FLASH = 'FLASH',
  /**
   * application/graphicconverter
   */
  GRAPHIC_CONVERTER = 'GRAPHIC_CONVERTER',
  /**
   * application/x-javascript
   */
  JAVASCRIPT = 'JAVASCRIPT',
  /**
   * application/json
   */
  JSON = 'JSON',
  /**
   * image/x-win-bitmap
   */
  IMAGE_BITMAP = 'IMAGE_BITMAP',
  /**
   * image/bmp
   */
  IMAGE_BMP = 'IMAGE_BMP',
  /**
   * image/gif
   */
  IMAGE_GIF = 'IMAGE_GIF',
  /**
   * image/jpeg
   */
  IMAGE_JPEG = 'IMAGE_JPEG',
  /**
   * image/photoshop
   */
  IMAGE_PHOTOSHOP = 'IMAGE_PHOTOSHOP',
  /**
   * image/png
   */
  IMAGE_PNG = 'IMAGE_PNG',
  /**
   * image/tiff
   */
  IMAGE_TIFF = 'IMAGE_TIFF',
  /**
   * image/vnd.wap.wbmp
   */
  IMAGE_WBMP = 'IMAGE_WBMP',
  /**
   * application/x-mpegURL
   */
  M3U8 = 'M3U8',
  /**
   * application/mac-binhex40
   */
  MAC_BIN_HEX_40 = 'MAC_BIN_HEX_40',
  /**
   * application/vnd.ms-excel
   */
  MS_EXCEL = 'MS_EXCEL',
  /**
   * application/ms-powerpoint
   */
  MS_POWERPOINT = 'MS_POWERPOINT',
  /**
   * application/msword
   */
  MS_WORD = 'MS_WORD',
  /**
   * application/octet-stream
   */
  OCTET_STREAM = 'OCTET_STREAM',
  /**
   * application/pdf
   */
  PDF = 'PDF',
  /**
   * application/postscript
   */
  POSTSCRIPT = 'POSTSCRIPT',
  /**
   * application/vnd.rn-realmedia
   */
  RN_REAL_MEDIA = 'RN_REAL_MEDIA',
  /**
   * message/rfc822
   */
  RFC_822 = 'RFC_822',
  /**
   * application/rtf
   */
  RTF = 'RTF',
  /**
   * text/calendar
   */
  TEXT_CALENDAR = 'TEXT_CALENDAR',
  /**
   * text/css
   */
  TEXT_CSS = 'TEXT_CSS',
  /**
   * text/csv
   */
  TEXT_CSV = 'TEXT_CSV',
  /**
   * text/html
   */
  TEXT_HTML = 'TEXT_HTML',
  /**
   * text/java
   */
  TEXT_JAVA = 'TEXT_JAVA',
  /**
   * text/plain
   */
  TEXT_PLAIN = 'TEXT_PLAIN',
  /**
   * video/3gpp
   */
  VIDEO_3GPP = 'VIDEO_3GPP',
  /**
   * video/3gpp2
   */
  VIDEO_3GPP2 = 'VIDEO_3GPP2',
  /**
   * video/avi
   */
  VIDEO_AVI = 'VIDEO_AVI',
  /**
   * video/x-flv
   */
  VIDEO_FLV = 'VIDEO_FLV',
  /**
   * video/mp4
   */
  VIDEO_MP4 = 'VIDEO_MP4',
  /**
   * video/mp4v-es
   */
  VIDEO_MP4V_ES = 'VIDEO_MP4V_ES',
  /**
   * video/mpeg
   */
  VIDEO_MPEG = 'VIDEO_MPEG',
  /**
   * video/x-ms-asf
   */
  VIDEO_MS_ASF = 'VIDEO_MS_ASF',
  /**
   * video/x-ms-wm
   */
  VIDEO_MS_WM = 'VIDEO_MS_WM',
  /**
   * video/x-ms-wmv
   */
  VIDEO_MS_WMV = 'VIDEO_MS_WMV',
  /**
   * video/x-ms-wvx
   */
  VIDEO_MS_WVX = 'VIDEO_MS_WVX',
  /**
   * video/ogg
   */
  VIDEO_OGG = 'VIDEO_OGG',
  /**
   * video/x-quicktime
   */
  VIDEO_QUICKTIME = 'VIDEO_QUICKTIME',
  /**
   * video/webm
   */
  VIDEO_WEBM = 'VIDEO_WEBM',
  /**
   * application/xaml+xml
   */
  XAML = 'XAML',
  /**
   * application/xhtml+xml
   */
  XHTML = 'XHTML',
  /**
   * application/xml
   */
  XML = 'XML',
  /**
   * application/zip
   */
  ZIP = 'ZIP',
}

/**
 * The video delivery type.
 */
export enum VideoDeliveryType {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Video will be served through a progressive download.
   */
  PROGRESSIVE = 'PROGRESSIVE',
  /**
   * Video will be served via a streaming protocol like RTMP.
   */
  STREAMING = 'STREAMING',
}

/**
 * The types of VAST ads that a VastRedirectCreative can point to.
 */
export enum VastRedirectType {
  /**
   * The VAST XML contains only linear ads.
   */
  LINEAR = 'LINEAR',
  /**
   * The VAST XML contains only nonlinear ads.
   */
  NON_LINEAR = 'NON_LINEAR',
  /**
   * The VAST XML contains both linear and nonlinear ads.
   */
  LINEAR_AND_NON_LINEAR = 'LINEAR_AND_NON_LINEAR',
}
