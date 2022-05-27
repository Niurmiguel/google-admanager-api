import { DateTime, PageResult } from '@common/types';
import {
  AdIdType,
  CreativePolicyViolation,
  DestinationUrlType,
  ImageDensity,
  LockedOrientation,
  RichMediaStudioChildAssetPropertyType,
  RichMediaStudioCreativeArtworkType,
  RichMediaStudioCreativeBillingAttribute,
  RichMediaStudioCreativeFormat,
  ScalableType,
  SslManualOverride,
  SslScanResult,
  VideoDeliveryType,
  MimeType,
  VastRedirectType,
} from './creative.enum';
import {
  AppliedLabel,
  BaseCustomFieldValue,
  Size,
  ThirdPartyDataDeclaration,
} from '@v202202/common/types';
import { ConversionEvent_TrackingUrlsMapEntry } from '../creativeWrapper/creativeWrapper.type';
import { SkippableAdType } from '@v202202/common/enums';

/**
 * An Ad Exchange dynamic allocation creative.
 */
export type AdExchangeCreative = {
  /**
   * Whether this creative is eligible for native ad-serving. This value is optional and defaults to false.
   */
  isNativeEligible: boolean;

  /**
   * true if this creative is interstitial. An interstitial creative will not consider an impression served until it is fully rendered in the browser.
   */
  isInterstitial: boolean;

  /**
   * true if this creative is eligible for all requested sizes.
   */
  isAllowsAllRequestedSizes: boolean;
};

/**
 * An AdSense dynamic allocation creative.
 */
export type AdSenseCreative = {};

/**
 * Dynamic allocation creative with a backfill code snippet.
 */
export type HasHtmlSnippetDynamicAllocationCreative = {
  /**
   * The code snippet (ad tag) from Ad Exchange or AdSense to traffic the dynamic allocation creative.
   * Only valid Ad Exchange or AdSense parameters will be considered. Any extraneous HTML or JavaScript will be ignored.
   */
  codeSnippet: string;
} & AdExchangeCreative &
  AdSenseCreative;

/**
 * A base class for dynamic allocation creatives.
 */
export type BaseDynamicAllocationCreative = {};

/**
 * Represents a child asset in RichMediaStudioCreative.
 */
export type RichMediaStudioChildAssetProperty = {
  /**
   * The name of the asset as known by Rich Media Studio. This attribute is readonly.
   */
  name: string;

  /**
   * Required file type of the asset. This attribute is readonly.
   */
  type: RichMediaStudioChildAssetPropertyType;

  /**
   * The total size of the asset in bytes. This attribute is readonly.
   */
  totalFileSize: number;

  /**
   * Width of the widget in pixels. This attribute is readonly.
   */
  width: number;

  /**
   * Height of the widget in pixels. This attribute is readonly.
   */
  height: number;

  /**
   * The URL of the asset. This attribute is readonly.
   */
  url: string;
};

/**
 * A Creative that is created by a Rich Media Studio. You cannot create this creative, but you can update some fields of this creative.
 */
export type RichMediaStudioCreative = {
  /**
   * A locked orientation for this creative to be displayed in.
   */
  lockedOrientation: LockedOrientation;

  /**
   * true if this is interstitial. An interstitial creative will not consider an impression served until it is fully rendered in the browser. This attribute is readonly.
   */
  isInterstitial: boolean;
};

/**
 * A Creative that is created by a Rich Media Studio.
 */
export type BaseRichMediaStudioCreative = {
  /**
   * The creative ID as known by Rich Media Studio creative. This attribute is readonly.
   */
  studioCreativeId: number;

  /**
   * The creative format of the Rich Media Studio creative. This attribute is readonly.
   */
  creativeFormat: RichMediaStudioCreativeFormat;

  /**
   * The type of artwork used in this creative. This attribute is readonly.
   */
  artworkType: RichMediaStudioCreativeArtworkType;

  /**
   * The total size of all assets in bytes. This attribute is readonly.
   */
  totalFileSize: number;

  /**
   * Ad tag keys. This attribute is optional and updatable.
   */
  adTagKeys: string[];

  /**
   * Custom key values. This attribute is optional and updatable.
   */
  customKeyValues: string[];

  /**
   * The survey URL for this creative. This attribute is optional and updatable.
   */
  surveyUrl: string;

  /**
   * The tracking URL to be triggered when an ad starts to play, whether Rich Media or backup content is displayed. Behaves like the /imp URL that DART used to track impressions. This URL can't exceed 1024 characters and must start with http:// or https://. This attribute is optional and updatable.
   */
  allImpressionsUrl: string;

  /**
   * The tracking URL to be triggered when any rich media artwork is displayed in an ad. Behaves like the /imp URL that DART used to track impressions. This URL can't exceed 1024 characters and must start with http:// or https://. This attribute is optional and updatable.
   */
  richMediaImpressionsUrl: string;

  /**
   * The tracking URL to be triggered when the Rich Media backup image is served. This attribute is optional and updatable.
   */
  backupImageImpressionsUrl: string;

  /**
   * The override CSS. You can put custom CSS code here to repair creative styling; e.g. tr td { background-color:#FBB;}. This attribute is optional and updatable.
   */
  overrideCss: string;

  /**
   * The Flash plugin version required to view this creative; e.g. Flash 10.2/AS 3. This attribute is read only.
   */
  requiredFlashPluginVersion: string;

  /**
   * The duration of the creative in milliseconds. This attribute is optional and updatable.
   */
  duration: number;

  /**
   * The billing attribute associated with this creative. This attribute is read only.
   */
  billingAttribute: RichMediaStudioCreativeBillingAttribute;

  /**
   * The list of child assets associated with this creative. This attribute is read only.
   */
  richMediaStudioChildAssetProperties: RichMediaStudioChildAssetProperty[];

  /**
   * The SSL compatibility scan result of this creative.
   *
   * This attribute is read-only and determined by Google.
   */
  sslScanResult: SslScanResult;

  /**
   * The manual override for the SSL compatibility of this creative.
   *
   * This attribute is optional and defaults to SslManualOverride.NO_OVERRIDE.
   */
  sslManualOverride: SslManualOverride;
} & RichMediaStudioCreative;

/**
 * A creative that is used for tracking clicks on ads that are served directly from the customers' web servers or media servers.
 * NOTE: The size attribute is not used for click tracking creative and it will not be persisted upon save.
 */
export type ClickTrackingCreative = {
  /**
   * The click tracking URL. This attribute is required.
   */
  clickTrackingUrl: string;
};

/**
 * Click tags define click-through URLs for each exit on an HTML5 creative.
 * An exit is any area that can be clicked that directs the browser to a landing page.
 * Each click tag defines the click-through URL for a different exit. In Ad Manager, tracking pixels are attached to the click tags if URLs are valid.
 */
export type ClickTag = {
  /**
   * Name of the click tag, follows the regex "clickTag\\d*"
   */
  name: string;

  /**
   * URL of the click tag.
   */
  url: string;
};

/**
 * A CreativeAsset is an asset that can be used in creatives.
 */
export type CreativeAsset = {
  /**
   * The ID of the asset. This attribute is generated by Google upon creation.
   */
  assetId: number;

  /**
   * The content of the asset as a byte array. This attribute is required when creating the creative that contains this asset if an assetId is not provided.
   *
   * When updating the content, pass a new byte array, and set assetId to null. Otherwise, this field can be null.
   *
   * The assetByteArray will be null when the creative is retrieved.
   */
  assetByteArray: BinaryData;

  /**
   * The file name of the asset. This attribute is required when creating a new asset (e.g. when assetByteArray is not null).
   */
  fileName: string;

  /**
   * The file size of the asset in bytes. This attribute is read-only.
   */
  fileSize: number;

  /**
   * A URL where the asset can be previewed at. This field is read-only and set by Google.
   */
  assetUrl: string;

  /**
   * The size of the asset. Note that this may not always reflect the actual physical size of the asset, but may reflect the expected size.
   * This attribute is read-only and is populated by Google.
   */
  size: Size;

  /**
   * The click tags of the asset. This field is read-only.
   */
  clickTags: ClickTag[];

  /**
   * The display density of the image. This is the ratio between a dimension in pixels of the image and the dimension in pixels that
   * it should occupy in device-independent pixels when displayed. This attribute is optional and defaults to ONE_TO_ONE.
   */
  imageDensity: ImageDensity;
};

/**
 * A Creative intended for mobile platforms that displays an image, whose size is defined as an aspect ratio, i.e. Size.isAspectRatio.
 * It can have multiple images whose dimensions conform to that aspect ratio.
 */
export type AspectRatioImageCreative = {
  /**
   * The images associated with this creative. The ad server will choose one based on the capabilities of the device. Each asset should have a size which is of the same aspect ratio as the Creative.size. This attribute is required and must have at least one asset.
   */
  imageAssets: CreativeAsset[];

  /**
   * The text that is served along with the image creative, primarily for accessibility. If no suitable image size is available for the device, this text replaces the image completely. This field is optional and has a maximum length of 500 characters.
   */
  altText: string;

  /**
   * An impression tracking URL to ping when this creative is displayed. This field is optional has a maximum length of 1024 characters.
   */
  thirdPartyImpressionUrl: string;

  /**
   * Allows the actual image asset sizes to differ from the creative size. This attribute is optional.
   */
  overrideSize: boolean;
};

/**
 * A Creative that contains Ad Manager hosted audio ads and is served via VAST XML. This creative is read-only.
 */
export type AudioCreative = {
  /**
   * A URL that points to the source media that will be used for transcoding.
   */
  audioSourceUrl: string;
};

/**
 * An externally hosted asset.
 */
export type RedirectAsset = {
  /**
   * The URL where the asset is hosted.
   */
  redirectUrl: string;
};

/**
 * Metadata for a video asset.
 */
export type VideoMetadata = {
  /**
   * The scalable type of the asset. This attribute is required.
   */
  scalableType: ScalableType;

  /**
   * The duration of the asset in milliseconds. This attribute is required.
   */
  duration: number;

  /**
   * The bit rate of the asset in kbps. If the asset can play at a range of bit rates (such as an Http Live Streaming video), then set the bit rate to zero and populate the minimum and maximum bit rate instead.
   */
  bitRate: number;

  /**
   * The minimum bitrate of the video in kbps. Only set this if the asset can play at a range of bit rates.
   */
  minimumBitRate: number;

  /**
   * The maximum bitrate of the video in kbps. Only set this if the asset can play at a range of bit rates.
   */
  maximumBitRate: number;

  /**
   * The size (width and height) of the asset. This attribute is required.
   */
  size: Size;

  /**
   * The mime type of the asset. This attribute is required.
   */
  mimeType: MimeType;

  /**
   * The delivery type of the asset. This attribute is required.
   */
  deliveryType: VideoDeliveryType;

  /**
   * The codecs of the asset. This attribute is optional and defaults to an empty list.
   */
  codecs: string[];
};

/**
 * An externally-hosted video asset.
 */
export type VideoRedirectAsset = {
  /**
   * Metadata related to the asset. This attribute is required.
   */
  metadata: VideoMetadata;
} & RedirectAsset;

/**
 * A Creative that contains externally hosted audio ads and is served via VAST XML.
 */
export type AudioRedirectCreative = {
  /**
   * The audio creative assets.
   */
  audioAssets: VideoRedirectAsset[];

  /**
   * The high quality mezzanine audio asset.
   */
  mezzanineFile: VideoRedirectAsset;
};

/**
 * A base type for audio creatives.
 */
export type BaseAudioCreative = {
  /**
   * The expected duration of this creative in milliseconds.
   */
  duration: number;

  /**
   * Allows the creative duration to differ from the actual asset durations. This attribute is optional.
   */
  allowDurationOverride: boolean;

  /**
   * A map from ConversionEvent to a list of URLs that will be pinged when the event happens. This attribute is optional.
   */
  trackingUrls: ConversionEvent_TrackingUrlsMapEntry[];

  /**
   * The IDs of the companion creatives that are associated with this creative. This attribute is optional.
   */
  companionCreativeIds: number[];

  /**
   * A comma separated key=value list of parameters that will be supplied to the creative, written into the VAST AdParameters node. This attribute is optional.
   */
  customParameters: string;

  /**
   * The ad id associated with the video as defined by the adIdType registry. This field is required if adIdType is not AdIdType.NONE.
   */
  adId: string;

  /**
   * The registry which the ad id of this creative belongs to. This field is optional and defaults to AdIdType.NONE.
   */
  adIdType: AdIdType;

  /**
   * The type of skippable ad.
   */
  skippableAdType: SkippableAdType;

  /**
   * An ad tag URL that will return a preview of the VAST XML response specific to this creative. This attribute is read-only.
   */
  vastPreviewUrl: string;

  /**
   * The SSL compatibility scan result of this creative.
   *
   * This attribute is read-only and determined by Google.
   */
  sslScanResult: SslScanResult;

  /**
   * The manual override for the SSL compatibility of this creative.
   *
   * This attribute is optional and defaults to SslManualOverride.NO_OVERRIDE.
   */
  sslManualOverride: SslManualOverride;
} & AudioCreative &
  AudioRedirectCreative;

/**
 * A Creative that displays an image.
 */
export type ImageCreative = {
  /**
   * Alternative text to be rendered along with the creative used mainly for accessibility. This field is optional and has a maximum length of 500 characters.
   */
  altText: string;

  /**
   * An impression tracking URL to ping when this creative is displayed. This field is optional has a maximum length of 1024 characters.
   */
  thirdPartyImpressionUrl: string;

  /**
   * The list of secondary image assets associated with this creative. This attribute is optional.
   *
   * Secondary image assets can be used to store different resolution versions of the primary asset for use on non-standard density screens.
   */
  secondaryImageAssets: CreativeAsset[];
};

/**
 * An overlay Creative that displays an image and is served via VAST 2.0 XML.
 * Overlays cover part of the video content they are displayed on top of. This creative is read only prior to v201705.
 */
export type ImageOverlayCreative = {
  /**
   * The IDs of the companion creatives that are associated with this creative. This attribute is optional. This attribute is read-only.
   */
  companionCreativeIds: number[];

  /**
   * A map from ConversionEvent to a list of URLs that will be pinged when the event happens. This attribute is optional.
   */
  trackingUrls: ConversionEvent_TrackingUrlsMapEntry[];

  /**
   * A locked orientation for this creative to be displayed in.
   */
  lockedOrientation: LockedOrientation;

  /**
   * A comma separated key=value list of parameters that will be supplied to the creative, written into the VAST AdParameters node. This attribute is optional.
   */
  customParameters: string;

  /**
   * Minimum suggested duration in milliseconds. This attribute is optional.
   */
  duration: number;

  /**
   * An ad tag URL that will return a preview of the VAST XML response specific to this creative. This attribute is read-only.
   */
  vastPreviewUrl: string;
};

/**
 * The base type for creatives that display an image.
 */
export type BaseImageCreative = {
  /**
   * Allows the creative size to differ from the actual image asset size. This attribute is optional.
   */
  overrideSize: boolean;

  /**
   * The primary image asset associated with this creative. This attribute is required.
   */
  primaryImageAsset: CreativeAsset;
} & ImageCreative &
  ImageOverlayCreative;

/**
 * A Creative that loads an image asset from a specified URL.
 */
export type ImageRedirectCreative = {
  /**
   * Alternative text to be rendered along with the creative used mainly for accessibility. This field is optional and has a maximum length of 500 characters.
   */
  altText: string;

  /**
   * An impression tracking URL to ping when this creative is displayed. This field is optional has a maximum length of 1024 characters.
   */
  thirdPartyImpressionUrl: string;
};

/**
 * An overlay Creative that loads an image asset from a specified URL and is served via VAST XML. Overlays cover part of the video content they are displayed on top of. This creative is read only.
 */
export type ImageRedirectOverlayCreative = {
  /**
   * The size of the image asset. Note that this may differ from size if the asset is not expected to fill the entire video player. This attribute is optional.
   */
  assetSize: Size;

  /**
   * Minimum suggested duration in milliseconds. This attribute is optional.
   */
  duration: number;

  /**
   * The IDs of the companion creatives that are associated with this creative. This attribute is optional.
   */
  companionCreativeIds: number[];

  /**
   * A map from ConversionEvent to a list of URLs that will be pinged when the event happens. This attribute is optional.
   */
  trackingUrls: ConversionEvent_TrackingUrlsMapEntry[];

  /**
   * A comma separated key=value list of parameters that will be supplied to the creative, written into the VAST AdParameters node. This attribute is optional.
   */
  customParameters: string;

  /**
   * An ad tag URL that will return a preview of the VAST XML response specific to this creative. This attribute is read-only.
   */
  vastPreviewUrl: string;
};

/**
 * The base type for creatives that load an image asset from a specified URL.
 */
export type BaseImageRedirectCreative = {
  /**
   * The URL where the actual asset resides. This attribute is required and has a maximum length of 1024 characters.
   */
  imageUrl: string;
} & ImageRedirectCreative &
  ImageRedirectOverlayCreative;

/**
 * A Creative that will be served into cable set-top boxes. There are no assets for this creative type, as they are hosted by external cable systems.
 */
export type SetTopBoxCreative = {
  /**
   * An external asset identifier that is used in the cable system. This attribute is read-only after creation.
   */
  externalAssetId: string;

  /**
   * An identifier for the provider in the cable system. This attribute is read-only after creation.
   */
  providerId: string;

  /**
   * IDs of regions where the creative is available to serve from a local cable video-on-demand server. This attribute is optional.
   */
  availabilityRegionIds: string[];

  /**
   * The date and time that this creative can begin serving from a local cable video-on-demand server. This attribute is optional.
   */
  licenseWindowStartDateTime: DateTime;

  /**
   * The date and time that this creative can no longer be served from a local cable video-on-demand server. This attribute is optional.
   */
  licenseWindowEndDateTime: DateTime;
};

/**
 * A Creative that contains Ad Manager hosted video ads and is served via VAST XML.
 */
export type VideoCreative = {
  /**
   * A URL that points to the source media that will be used for transcoding.
   */
  videoSourceUrl: string;
};

/**
 * A Creative that contains externally hosted video ads and is served via VAST XML.
 */
export type VideoRedirectCreative = {
  /**
   * The video creative assets.
   */
  videoAssets: VideoRedirectAsset[];

  /**
   * The high quality mezzanine video asset.
   */
  mezzanineFile: VideoRedirectAsset;
};

/**
 * A base type for video creatives.
 */
export type BaseVideoCreative = {
  /**
   * The expected duration of this creative in milliseconds.
   */
  duration: number;

  /**
   * Allows the creative duration to differ from the actual asset durations. This attribute is optional.
   */
  allowDurationOverride: boolean;

  /**
   * A map from ConversionEvent to a list of URLs that will be pinged when the event happens. This attribute is optional.
   */
  trackingUrls: ConversionEvent_TrackingUrlsMapEntry[];

  /**
   * The IDs of the companion creatives that are associated with this creative. This attribute is optional.
   */
  companionCreativeIds: number[];

  /**
   * A comma separated key=value list of parameters that will be supplied to the creative, written into the VAST AdParameters node. This attribute is optional.
   */
  customParameters: string;

  /**
   * The ad id associated with the video as defined by the adIdType registry. This field is required if adIdType is not AdIdType.NONE.
   */
  adId: string;

  /**
   *  The registry which the ad id of this creative belongs to. This field is optional and defaults to AdIdType.NONE.
   */
  adIdType: AdIdType;

  /**
   *  The type of skippable ad.
   */
  skippableAdType: SkippableAdType;

  /**
   *  An ad tag URL that will return a preview of the VAST XML response specific to this creative. This attribute is read-only.
   */
  vastPreviewUrl: string;

  /**
   * The SSL compatibility scan result of this creative.
   *
   * This attribute is read-only and determined by Google.
   */
  sslScanResult: SslScanResult;

  /**
   * The manual override for the SSL compatibility of this creative.
   *
   * This attribute is optional and defaults to SslManualOverride.NO_OVERRIDE.
   */
  sslManualOverride: SslManualOverride;
} & SetTopBoxCreative &
  VideoCreative &
  VideoRedirectCreative;

/**
 * A CustomCreativeAsset is an association between a CustomCreative and an asset. Any assets that are associated with a creative can be inserted into its HTML snippet.
 */
export type CustomCreativeAsset = {
  /**
   * The name by which the associated asset will be referenced. For example, if the value is "foo", then the asset can be inserted into an HTML snippet using the macro: "%%FILE:foo%%".
   */
  macroName: string;

  /**
   * The asset. This attribute is required. To view the asset, use CreativeAsset.assetUrl.
   */
  asset: CreativeAsset;
};

/**
 * A Creative that contains an arbitrary HTML snippet and file assets.
 */
export type CustomCreative = {
  /**
   * The HTML snippet that this creative delivers. This attribute is required.
   */
  htmlSnippet: string;

  /**
   * A list of file assets that are associated with this creative, and can be referenced in the snippet.
   */
  customCreativeAssets: CustomCreativeAsset[];

  /**
   * true if this custom creative is interstitial. An interstitial creative will not consider an impression served until it is fully rendered in the browser.
   */
  isInterstitial: boolean;

  /**
   *  A locked orientation for this creative to be displayed in.
   */
  lockedOrientation: LockedOrientation;

  /**
   * The SSL compatibility scan result of this creative.
   *
   * This attribute is read-only and determined by Google.
   */
  sslScanResult: SslScanResult;

  /**
   * The manual override for the SSL compatibility of this creative.
   *
   * This attribute is optional and defaults to SslManualOverride.NO_OVERRIDE.
   */
  sslManualOverride: SslManualOverride;

  /**
   * Whether the Creative is compatible for SafeFrame rendering.
   *
   * This attribute is optional and defaults to true.
   */
  isSafeFrameCompatible: boolean;

  /**
   * A list of impression tracking URLs to ping when this creative is displayed. This field is optional.
   */
  thirdPartyImpressionTrackingUrls: string[];
};

/**
 * A Creative that has a destination url
 */
export type HasDestinationUrlCreative = {
  /**
   * The URL that the user is directed to if they click on the creative. This attribute is required unless the destinationUrlType is DestinationUrlType.NONE, and has a maximum length of 1024 characters.
   */
  destinationUrl: string;

  /**
   * The action that should be performed if the user clicks on the creative. This attribute is optional and defaults to DestinationUrlType.CLICK_TO_WEB.
   */
  destinationUrlType: DestinationUrlType;
} & AspectRatioImageCreative &
  BaseAudioCreative &
  BaseImageCreative &
  BaseImageRedirectCreative &
  BaseVideoCreative &
  CustomCreative;

/**
 * A Creative that contains a zipped HTML5 bundle asset, a list of third party impression trackers, and a third party click tracker.
 */
export type Html5Creative = {
  /**
   * Allows the creative size to differ from the actual HTML5 asset size. This attribute is optional.
   */
  overrideSize: boolean;

  /**
   * Impression tracking URLs to ping when this creative is displayed. This field is optional.
   */
  thirdPartyImpressionTrackingUrls: string[];

  /**
   * A click tracking URL to ping when this creative is clicked. This field is optional.
   */
  thirdPartyClickTrackingUrl: string;

  /**
   * A locked orientation for this creative to be displayed in.
   */
  lockedOrientation: LockedOrientation;

  /**
   * The SSL compatibility scan result of this creative.
   *
   * This attribute is read-only and determined by Google.
   */
  sslScanResult: SslScanResult;

  /**
   * The manual override for the SSL compatibility of this creative.
   *
   * This attribute is optional and defaults to SslManualOverride.NO_OVERRIDE.
   */
  sslManualOverride: SslManualOverride;

  /**
   * Whether the Creative is compatible for SafeFrame rendering.
   *
   * This attribute is optional and defaults to true.
   */
  isSafeFrameCompatible: boolean;

  /**
   * The HTML5 asset. To preview the HTML5 asset, use the CreativeAsset.assetUrl. In this field, the CreativeAsset.assetByteArray must be a zip bundle and the CreativeAsset.fileName must have a zip extension. This attribute is required.
   */
  html5Asset: CreativeAsset;
};

/**
 * A Creative hosted by Campaign Manager 360.
 *
 * Similar to third-party creatives, a Campaign Manager 360 tag is used to retrieve a creative asset.
 * However, Campaign Manager 360 tags are not sent to the user's browser. Instead, they are processed internally within the Google Marketing Platform system..
 */
export type InternalRedirectCreative = {
  /**
   * A locked orientation for this creative to be displayed in.
   */
  lockedOrientation: LockedOrientation;

  /**
   * The asset size of an internal redirect creative. Note that this may differ from size if users set overrideSize to true. This attribute is read-only and is populated by Google.
   */
  assetSize: Size;

  /**
   * The internal redirect URL of the DFA or DART for Publishers hosted creative. This attribute is required and has a maximum length of 1024 characters.
   */
  internalRedirectUrl: string;

  /**
   * Allows the creative size to differ from the actual size specified in the internal redirect's url. This attribute is optional.
   */
  overrideSize: boolean;

  /**
   * true if this internal redirect creative is interstitial.
   */
  isInterstitial: boolean;

  /**
   * The SSL compatibility scan result for this creative.
   *
   * This attribute is read-only and determined by Google.
   */
  sslScanResult: SslScanResult;

  /**
   * The manual override for the SSL compatibility of this creative.
   *
   * This attribute is optional and defaults to SslManualOverride.NO_OVERRIDE.
   */
  sslManualOverride: SslManualOverride;

  /**
   * A list of impression tracking URLs to ping when this creative is displayed. This field is optional.
   */
  thirdPartyImpressionTrackingUrls: string[];
};

/**
 * A Creative that isn't supported by Google DFP, but was migrated from DART. Creatives of this type cannot be created or modified.
 */
export type LegacyDfpCreative = {};

/**
 * A Creative used for programmatic trafficking. This creative will be auto-created with the right approval from the buyer. This creative cannot be created through the API. This creative can be updated.
 */
export type ProgrammaticCreative = {};

/**
 * Stores values of CreativeTemplateVariable of VariableType.ASSET.
 */
export type AssetCreativeTemplateVariableValue = {
  /**
   * The associated asset. This attribute is required when creating a new TemplateCreative. To view the asset, use CreativeAsset.assetUrl.
   */
  asset: CreativeAsset;
};

/**
 * Stores values of CreativeTemplateVariable of VariableType.LONG.
 */
export type LongCreativeTemplateVariableValue = {
  /**
   * The long value of CreativeTemplateVariable
   */
  value: number;
};

/**
 * Stores values of CreativeTemplateVariable of VariableType.STRING and VariableType.LIST.
 */
export type StringCreativeTemplateVariableValue = {
  /**
   * The string value of CreativeTemplateVariable
   */
  value: string;
};

/**
 * Stores values of CreativeTemplateVariable of VariableType.URL.
 */
export type UrlCreativeTemplateVariableValue = {
  /**
   * The url value of CreativeTemplateVariable
   */
  value: string;
};

/**
 * A base class for storing values of the CreativeTemplateVariable.
 */
export type BaseCreativeTemplateVariableValue = {
  /**
   * A uniqueName of the CreativeTemplateVariable.
   */
  uniqueName: string;
} & AssetCreativeTemplateVariableValue &
  LongCreativeTemplateVariableValue &
  StringCreativeTemplateVariableValue &
  UrlCreativeTemplateVariableValue;

/**
 * A Creative that is created by the specified creative template.
 */
export type TemplateCreative = {
  /**
   * Creative template ID that this creative is created from.
   */
  creativeTemplateId: number;

  /**
   * true if this template instantiated creative is interstitial. This attribute is read-only and is assigned by Google based on the creative template.
   */
  isInterstitial: boolean;

  /**
   * true if this template instantiated creative is eligible for native adserving. This attribute is read-only and is assigned by Google based on the creative template.
   */
  isNativeEligible: boolean;

  /**
   * Whether the Creative is compatible for SafeFrame rendering.
   *
   * This attribute is read-only and is assigned by Google based on the CreativeTemplate.
   */
  isSafeFrameCompatible: boolean;

  /**
   * The URL the user is directed to if they click on the creative. This attribute is only required if the template snippet contains the %u or %%DEST_URL%% macro. It has a maximum length of 1024 characters.
   */
  destinationUrl: string;

  /**
   * Stores values of CreativeTemplateVariable in the CreativeTemplate.
   */
  creativeTemplateVariableValues: BaseCreativeTemplateVariableValue[];

  /**
   * The SSL compatibility scan result for this creative.
   *
   * This attribute is read-only and determined by Google.
   */
  sslScanResult: SslScanResult;

  /**
   * The manual override for the SSL compatibility of this creative.
   *
   * This attribute is optional and defaults to SslManualOverride.NO_OVERRIDE.
   */
  sslManualOverride: SslManualOverride;

  /**
   * A locked orientation for this creative to be displayed in.
   */
  lockedOrientation: LockedOrientation;
};

/**
 * A Creative that is served by a 3rd-party vendor.
 */
export type ThirdPartyCreative = {
  /**
   * The HTML snippet that this creative delivers. This attribute is required.
   */
  snippet: string;

  /**
   * The HTML snippet that this creative delivers with macros expanded. This attribute is read-only and is set by Google.
   */
  expandedSnippet: string;

  /**
   * The SSL compatibility scan result for this creative.
   *
   * This attribute is read-only and determined by Google.
   */
  sslScanResult: SslScanResult;

  /**
   * The manual override for the SSL compatibility of this creative.
   *
   * This attribute is optional and defaults to SslManualOverride.NO_OVERRIDE.
   */
  sslManualOverride: SslManualOverride;

  /**
   * A locked orientation for this creative to be displayed in.
   */
  lockedOrientation: LockedOrientation;

  /**
   * Whether the Creative is compatible for SafeFrame rendering.
   *
   * This attribute is optional and defaults to true.
   */
  isSafeFrameCompatible: boolean;

  /**
   * A list of impression tracking URLs to ping when this creative is displayed. This field is optional.
   */
  thirdPartyImpressionTrackingUrls: string[];
};

/**
 * A Creative that isn't supported by this version of the API. This object is readonly and when encountered should be reported on the Ad Manager API forum.
 */
export type UnsupportedCreative = {
  /**
   * The creative type that is unsupported by this API version.
   */
  unsupportedCreativeType: string;
};

/**
 * A Creative that points to an externally hosted VAST ad and is served via VAST XML as a VAST Wrapper.
 */
export type VastRedirectCreative = {
  /**
   * The URL where the 3rd party VAST XML is hosted. This attribute is required.
   */
  vastXmlUrl: string;

  /**
   * The type of VAST ad that this redirects to. This attribute is required.
   */
  vastRedirectType: VastRedirectType;

  /**
   * The duration of the VAST ad in milliseconds. This attribute is required.
   */
  duration: number;

  /**
   * The IDs of the companion creatives that are associated with this creative. This attribute is optional.
   */
  companionCreativeIds: number[];

  /**
   * A map from ConversionEvent to a list of URLs that will be pinged when the event happens. This attribute is optional.
   */
  trackingUrls: ConversionEvent_TrackingUrlsMapEntry;

  /**
   * The SSL compatibility scan result for this creative.
   *
   * This attribute is read-only and determined by Google.
   */
  sslScanResult: SslScanResult;

  /**
   * The manual override for the SSL compatibility of this creative.
   *
   * This attribute is optional and defaults to SslManualOverride.NO_OVERRIDE.
   */
  sslManualOverride: SslManualOverride;

  /**
   * Whether the 3rd party VAST XML points to an audio ad. When true, VastRedirectCreative.size will always be 1x1.
   */
  isAudio: boolean;
};

/**
 * A Creative represents the media for the ad being served.
 *
 * Read more about creatives on the {@link https://support.google.com/dfp_premium/answer/3185155 Ad Manager Help Center}.
 */
export type Creative = {
  /**
   * The ID of the advertiser that owns the creative. This attribute is required.
   */
  advertiserId: number;

  /**
   * Uniquely identifies the Creative. This value is read-only and is assigned by Google when the creative is created. This attribute is required for updates.
   */
  id: number;

  /**
   * The name of the creative. This attribute is required and has a maximum length of 255 characters.
   */
  name: string;

  /**
   * The Size of the creative. This attribute is required for creation and then is read-only.
   */
  size: Size;

  /**
   * The URL of the creative for previewing the media. This attribute is read-only and is assigned by Google when a creative is created.
   */
  previewUrl: string;

  /**
   * Set of policy labels detected for this creative. This attribute is read-only.
   */
  policyLabels: CreativePolicyViolation[];

  /**
   * The set of labels applied to this creative.
   */
  appliedLabels: AppliedLabel[];

  /**
   * The date and time this creative was last modified.
   */
  lastModifiedDateTime: DateTime;

  /**
   * The values of the custom fields associated with this creative.
   */
  customFieldValues: BaseCustomFieldValue[];

  /**
   * The third party companies associated with this creative.
   *
   * This is distinct from any associated companies that Google may detect programmatically.
   */
  thirdPartyDataDeclaration: ThirdPartyDataDeclaration;
} & BaseDynamicAllocationCreative &
  BaseRichMediaStudioCreative &
  ClickTrackingCreative &
  HasDestinationUrlCreative &
  Html5Creative &
  InternalRedirectCreative &
  LegacyDfpCreative &
  ProgrammaticCreative &
  TemplateCreative &
  ThirdPartyCreative &
  UnsupportedCreative &
  VastRedirectCreative;

/**
 * Represents the actions that can be performed on Creative objects.
 */
export type CreativeAction = 'ActivateCreatives' | 'DeactivateCreatives';

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeService.Creative Creative} objects.
 */
export type CreativePage = PageResult<Creative>;
