// Generated from the Ad Manager v202608 WSDLs by scripts/generate-enums.js.
// Do not edit values or comments by hand: run `npm run generate:enums`.
// To add an enum, declare it empty (`export enum Name {}`) and run the script.

/**
 * The file formats available for creating the report.
 */
export enum ExportFormat {
  /**
   * The report file is generated as a list of Tab Separated Values.
   */
  TSV = 'TSV',
  /**
   * The report file is generated as a list of tab-separated values for Excel.
   */
  TSV_EXCEL = 'TSV_EXCEL',
  /**
   * The report file is generated as a list of Comma Separated Values, to be used with automated machine processing.
   *
   * - There is no pretty printing for the output, and no total row.
   * - Column headers are the qualified name e.g. "Dimension.ORDER_NAME".
   * - Network currency Monetary amounts are represented as micros in the currency of the network.
   * - Starting from v201705, local currency Monetary amounts are represented as currency symbol + ' ' + micros.
   * - Dates are formatted according to the ISO 8601 standard YYYY-MM-DD
   * - DateTimes are formatted according to the ISO 8601 standard YYYY-MM-DDThh:mm:ss[+-]hh:mm
   */
  CSV_DUMP = 'CSV_DUMP',
  /**
   * The report file is generated as XML.
   */
  XML = 'XML',
  /**
   * The report file is generated as an Office Open XML spreadsheet designed for Excel 2007+.
   */
  XLSX = 'XLSX',
}

/**
 * Represents the status of a `ReportJob` running on the server.
 */
export enum ReportJobStatus {
  /**
   * The `ReportJob` has completed successfully and is ready to download.
   */
  COMPLETED = 'COMPLETED',
  /**
   * The `ReportJob` is still being executed.
   */
  IN_PROGRESS = 'IN_PROGRESS',
  /**
   * The `ReportJob` has failed to run to completion.
   */
  FAILED = 'FAILED',
}

/**
 * `Dimension` provides the break-down and filterable types available for running a `ReportJob`. Aggregate and percentage columns will be calculated based on these groupings.
 */
export enum Dimension {
  /**
   * Breaks down reporting data by month and year in the network time zone. Can be used to filter on month using ISO 4601 format 'YYYY-MM'.
   *
   * Corresponds to "Month and year" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Partner finance, YouTube consolidated.
   */
  MONTH_AND_YEAR = 'MONTH_AND_YEAR',
  /**
   * Breaks down reporting data by week of the year in the network time zone. Cannot be used for filtering.
   *
   * Corresponds to "Week" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, YouTube consolidated.
   */
  WEEK = 'WEEK',
  /**
   * Breaks down reporting data by date in the network time zone. Can be used to filter by date using ISO 8601's format 'YYYY-MM-DD'".
   *
   * Corresponds to "Date" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video, YouTube consolidated.
   */
  DATE = 'DATE',
  /**
   * Breaks down reporting data by day of the week in the network time zone. Can be used to filter by day of the week using the index of the day (from 1 for Monday is 1 to 7 for Sunday).
   *
   * Corresponds to "Day of week" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, YouTube consolidated.
   */
  DAY = 'DAY',
  /**
   * Breaks down reporting data by hour of the day in the network time zone. Can be used to filter by hour of the day (from 0 to 23).
   *
   * Corresponds to "Hour" in the Ad Manager UI. Compatible with any of the following report types: Historical, Real-time video.
   */
  HOUR = 'HOUR',
  /**
   * Breaks down reporting data by date in the PT time zone. Can be used to filter by date using ISO 8601's format 'YYYY-MM-DD'". Can only be used when time zone type is PACIFIC.
   *
   * Compatible with the "Historical" report type.
   */
  DATE_PT = 'DATE_PT',
  /**
   * Breaks down reporting data by week of the year in the PT time zone. Cannot be used for filtering. Can only be used when time zone type is PACIFIC.
   *
   * Compatible with the "Historical" report type.
   */
  WEEK_PT = 'WEEK_PT',
  /**
   * Breaks down reporting data by month and year in the PT time zone. Can be used to filter on month using ISO 4601 format 'YYYY-MM'. Can only be used when time zone type is PACIFIC.
   *
   * Compatible with the "Historical" report type.
   */
  MONTH_YEAR_PT = 'MONTH_YEAR_PT',
  /**
   * Breaks down reporting data by day of the week in the PT time zone. Can be used to filter by day of the week using the index of the day (from 1 for Monday is 1 to 7 for Sunday). Can only be used when time zone type is PACIFIC.
   *
   * Compatible with the "Historical" report type.
   */
  DAY_OF_WEEK_PT = 'DAY_OF_WEEK_PT',
  /**
   * Breaks down reporting data by `LineItem.id`. Can be used to filter by `LineItem.id`.
   *
   * Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  LINE_ITEM_ID = 'LINE_ITEM_ID',
  /**
   * Breaks down reporting data by line item. `LineItem.name` and `LineItem.id` are automatically included as columns in the report. Can be used to filter by `LineItem.name`.
   *
   * Corresponds to "Line item" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  LINE_ITEM_NAME = 'LINE_ITEM_NAME',
  /**
   * Breaks down reporting data by `LineItem.lineItemType`. Can be used to filter by line item type using `LineItemType` enumeration names.
   *
   * Corresponds to "Line item type" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  LINE_ITEM_TYPE = 'LINE_ITEM_TYPE',
  /**
   * Breaks down reporting data by `Order.id`. Can be used to filter by `Order.id`.
   *
   * Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed.
   */
  ORDER_ID = 'ORDER_ID',
  /**
   * Breaks down reporting data by order. `Order.name` and `Order.id` are automatically included as columns in the report. Can be used to filter by `Order.name`.
   *
   * Corresponds to "Order" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed.
   */
  ORDER_NAME = 'ORDER_NAME',
  /**
   * Delivery status of the order. Not available as a dimension to report on, but exists as a dimension in order to filter on it using PQL. Valid values are 'STARTED', 'NOT_STARTED' and 'COMPLETED'.
   *
   * Compatible with the "Historical" report type.
   */
  ORDER_DELIVERY_STATUS = 'ORDER_DELIVERY_STATUS',
  /**
   * Breaks down reporting data by advertising company `Company.id`. Can be used to filter by `Company.id`.
   *
   * Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed.
   */
  ADVERTISER_ID = 'ADVERTISER_ID',
  /**
   * Breaks down reporting data by advertising company. `Company.name` and `Company.id` are automatically included as columns in the report. Can be used to filter by `Company.name`.
   *
   * Corresponds to "Advertiser" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed.
   */
  ADVERTISER_NAME = 'ADVERTISER_NAME',
  /**
   * The network that provided the ad for SDK ad mediation.
   *
   * If selected for a report, that report will include only SDK mediation ads and will not contain non-SDK mediation ads.
   *
   * SDK mediation ads are ads for mobile devices. They have a list of ad networks which can provide ads to serve. Not every ad network will have an ad to serve so the device will try each network one-by-one until it finds an ad network with an ad to serve. The ad network that ends up serving the ad will appear here. Note that this id does not correlate to anything in the companies table and is not the same id as is served by `ADVERTISER_ID`.
   *
   * Compatible with the "Historical" report type.
   */
  AD_NETWORK_ID = 'AD_NETWORK_ID',
  /**
   * The name of the network defined in `AD_NETWORK_ID`.
   *
   * Corresponds to "Ad network name" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_NETWORK_NAME = 'AD_NETWORK_NAME',
  /**
   * Breaks down reporting data by salesperson `User.id`. Can be used to filter by `User.id`.
   *
   * Compatible with any of the following report types: Historical, Future sell-through, Reach.
   */
  SALESPERSON_ID = 'SALESPERSON_ID',
  /**
   * Breaks down reporting data by salesperson. `User.name` and `User.id` of the salesperson are automatically included as columns in the report. Can be used to filter by `User.name`.
   *
   * Corresponds to "Salesperson" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach.
   */
  SALESPERSON_NAME = 'SALESPERSON_NAME',
  /**
   * Breaks down reporting data by `Creative.id` or creative set id (master's `Creative.id`) if the creative is part of a creative set. Can be used to filter by `Creative.id`.
   *
   * Compatible with any of the following report types: Historical, Ad speed, Real-time video.
   */
  CREATIVE_ID = 'CREATIVE_ID',
  /**
   * Breaks down reporting data by creative. `Creative.name` and `Creative.id` are automatically included as columns in the report. Can be used to filter by `Creative.name`.
   *
   * Corresponds to "Creative" in the Ad Manager UI. Compatible with any of the following report types: Historical, Ad speed, Real-time video.
   */
  CREATIVE_NAME = 'CREATIVE_NAME',
  /**
   * Breaks down reporting data by creative type.
   *
   * Corresponds to "Creative type" in the Ad Manager UI. Compatible with any of the following report types: Historical, Ad speed.
   */
  CREATIVE_TYPE = 'CREATIVE_TYPE',
  /**
   * Breaks down reporting data by creative billing type.
   *
   * Corresponds to "Creative billing type" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  CREATIVE_BILLING_TYPE = 'CREATIVE_BILLING_TYPE',
  /**
   * Breaks down reporting data by custom event ID.
   *
   * Compatible with the "Historical" report type.
   */
  CUSTOM_EVENT_ID = 'CUSTOM_EVENT_ID',
  /**
   * Breaks down reporting data by custom event name.
   *
   * Corresponds to "Custom event" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  CUSTOM_EVENT_NAME = 'CUSTOM_EVENT_NAME',
  /**
   * Breaks down reporting data by custom event type (timer/exit/counter).
   *
   * Corresponds to "Custom event type" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  CUSTOM_EVENT_TYPE = 'CUSTOM_EVENT_TYPE',
  /**
   * Breaks down reporting data by `Creative.size`. Cannot be used for filtering.
   *
   * Corresponds to "Creative size" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  CREATIVE_SIZE = 'CREATIVE_SIZE',
  /**
   * Breaks down reporting data by `AdUnit.id`. Can be used to filter by `AdUnit.id`. `AD_UNIT_NAME`, i.e. `AdUnit.name`, is automatically included as a dimension in the report.
   *
   * Compatible with any of the following report types: Historical, Future sell-through, Ad speed, Real-time video.
   */
  AD_UNIT_ID = 'AD_UNIT_ID',
  /**
   * Breaks down reporting data by ad unit. `AdUnit.name` and `AdUnit.id` are automatically included as columns in the report. Can be used to filter by `AdUnit.name`.
   *
   * Corresponds to "Ad unit" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Ad speed, Real-time video.
   */
  AD_UNIT_NAME = 'AD_UNIT_NAME',
  /**
   * Used to filter on all the descendants of an ad unit by `AdUnit.id`. Not available as a dimension to report on.
   *
   * Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  PARENT_AD_UNIT_ID = 'PARENT_AD_UNIT_ID',
  /**
   * Used to filter on all the descendants of an ad unit by `AdUnit.name`. Not available as a dimension to report on.
   *
   * Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  PARENT_AD_UNIT_NAME = 'PARENT_AD_UNIT_NAME',
  /**
   * Breaks down reporting data by `Placement.id`. Can be used to filter by `Placement.id`.
   *
   * Compatible with any of the following report types: Historical, Future sell-through, Reach.
   */
  PLACEMENT_ID = 'PLACEMENT_ID',
  /**
   * Breaks down reporting data by placement. `Placement.name` and `Placement.id` are automatically included as columns in the report. Can be used to filter by `Placement.name`.
   *
   * Corresponds to "Placement" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach.
   */
  PLACEMENT_NAME = 'PLACEMENT_NAME',
  /**
   * Status of the placement. Not available as a dimension to report on, but exists as a dimension in order to filter on it using PQL. Can be used to filter on `Placement.status` by using `InventoryStatus` enumeration names.
   *
   * Compatible with any of the following report types: Historical, Future sell-through.
   */
  PLACEMENT_STATUS = 'PLACEMENT_STATUS',
  /**
   * Breaks down reporting data by criteria predefined by Ad Manager like the operating system, browser etc. Cannot be used for filtering.
   *
   * Corresponds to "Targeting" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TARGETING = 'TARGETING',
  /**
   * Breaks down reporting data by browser criteria predefined by Ad Manager.
   *
   * Corresponds to "Browser" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  BROWSER_NAME = 'BROWSER_NAME',
  /**
   * The ID of the device category to which an ad is being targeted. Can be used to filter by device category ID.
   *
   * Compatible with any of the following report types: Historical, Ad speed, Real-time video.
   */
  DEVICE_CATEGORY_ID = 'DEVICE_CATEGORY_ID',
  /**
   * The category of device (smartphone, feature phone, tablet, or desktop) to which an ad is being targeted. Can be used to filter by device category name.
   *
   * Corresponds to "Device category" in the Ad Manager UI. Compatible with any of the following report types: Historical, Ad speed, Real-time video.
   */
  DEVICE_CATEGORY_NAME = 'DEVICE_CATEGORY_NAME',
  /**
   * Breaks down reporting data by country criteria ID. Can be used to filter by country criteria ID.
   *
   * Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, YouTube consolidated.
   */
  COUNTRY_CRITERIA_ID = 'COUNTRY_CRITERIA_ID',
  /**
   * Breaks down reporting data by country code.
   *
   * Compatible with the "Historical" report type.
   */
  COUNTRY_CODE = 'COUNTRY_CODE',
  /**
   * Breaks down reporting data by country name. The country name and the country criteria ID are automatically included as columns in the report. Can be used to filter by country name using the US English name.
   *
   * Corresponds to "Country" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, YouTube consolidated.
   */
  COUNTRY_NAME = 'COUNTRY_NAME',
  /**
   * Breaks down reporting data by region criteria ID. Can be used to filter by region criteria ID.
   *
   * Compatible with the "Historical" report type.
   */
  REGION_CRITERIA_ID = 'REGION_CRITERIA_ID',
  /**
   * Breaks down reporting data by region name. The region name and the region criteria ID are automatically included as columns in the report. Can be used to filter by region name using the US English name.
   *
   * Corresponds to "Region" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  REGION_NAME = 'REGION_NAME',
  /**
   * Breaks down reporting data by city criteria ID. Can be used to filter by city criteria ID.
   *
   * Compatible with the "Historical" report type.
   */
  CITY_CRITERIA_ID = 'CITY_CRITERIA_ID',
  /**
   * Breaks down reporting data by city name. The city name and the city criteria ID are automatically included as columns in the report. Can be used to filter by city name using the US English name.
   *
   * Corresponds to "City" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  CITY_NAME = 'CITY_NAME',
  /**
   * Breaks down reporting data by metro criteria ID. Can be used to filter by metro criteria ID.
   *
   * Compatible with the "Historical" report type.
   */
  METRO_CRITERIA_ID = 'METRO_CRITERIA_ID',
  /**
   * Breaks down reporting data by metro name. The metro name and the metro criteria ID are automatically included as columns in the report. Can be used to filter by metro name using the US English name.
   *
   * Corresponds to "Metro" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  METRO_NAME = 'METRO_NAME',
  /**
   * Breaks down reporting data by postal code criteria ID. Can be used to filter by postal code criteria ID.
   *
   * Compatible with the "Historical" report type.
   */
  POSTAL_CODE_CRITERIA_ID = 'POSTAL_CODE_CRITERIA_ID',
  /**
   * Breaks down reporting data by postal code. The postal code and the postal code criteria ID are automatically included as columns in the report. Can be used to filter by postal code.
   *
   * Corresponds to "Postal code" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  POSTAL_CODE = 'POSTAL_CODE',
  /**
   * Breaks down reporting data by `CustomTargetingValue.id`. Can be used to filter by `CustomTargetingValue.id`.
   *
   * Compatible with the "Historical" report type.
   */
  CUSTOM_TARGETING_VALUE_ID = 'CUSTOM_TARGETING_VALUE_ID',
  /**
   * Breaks down reporting data by custom criteria. The `CustomTargetingValue` is displayed in the form:
   *
   * - car=honda when value match type is `CustomTargetingValue.MatchType.EXACT`
   * - car~honda when value match type is `CustomTargetingValue.MatchType.BROAD`
   * - car=*honda when value match type is `CustomTargetingValue.MatchType.PREFIX`
   * - car~*honda when value match type is `CustomTargetingValue.MatchType.BROAD_PREFIX`
   *
   * `CUSTOM_TARGETING_VALUE_ID`, i.e. `CustomTargetingValue.id` is automatically included as a column in the report. Cannot be used for filtering; use `CUSTOM_TARGETING_VALUE_ID` instead.
   *
   * When using this `Dimension`, metrics for freeform key values are only reported on when they are registered with `CustomTargetingService`.
   *
   * Corresponds to "Key-values" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  CUSTOM_CRITERIA = 'CUSTOM_CRITERIA',
  /**
   * Breaks down reporting data by `Content.id`. Can be used to filter by `Content.id`.
   *
   * Compatible with any of the following report types: Historical, Future sell-through, YouTube consolidated.
   */
  CONTENT_ID = 'CONTENT_ID',
  /**
   * Breaks down reporting data by content. `Content.name` and `Content.id` are automatically included as columns in the report. Can be used to filter by `Content.name`.
   *
   * Corresponds to "Content" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, YouTube consolidated.
   */
  CONTENT_NAME = 'CONTENT_NAME',
  /**
   * Breaks down reporting data by `ContentBundle.id`. Can be used to filter by `ContentBundle.id`.
   *
   * Compatible with any of the following report types: Historical, Future sell-through, YouTube consolidated.
   */
  CONTENT_BUNDLE_ID = 'CONTENT_BUNDLE_ID',
  /**
   * Breaks down reporting data by content bundle. `ContentBundle.name` and `ContentBundle.id` are automatically included as columns in the report. Can be used to filter by `ContentBundle.name`.
   *
   * Corresponds to "Content bundle" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, YouTube consolidated.
   */
  CONTENT_BUNDLE_NAME = 'CONTENT_BUNDLE_NAME',
  /**
   * Breaks down reporting data by CMS metadata. To use this dimension in API, a list of cms metadata key IDs must be specified in `ReportQuery.cmsMetadataKeyIds`.
   *
   * This dimension can be used as a filter in the `Statement` in PQL syntax: CMS_METADATA_KEY[keyId]_ID = CMS metadata value ID
   *
   * For example: WHERE CMS_METADATA_KEY[4242]_ID = 53423
   */
  CMS_METADATA = 'CMS_METADATA',
  /**
   * Breaks down reporting data by the fallback position of the video ad, i.e., `NON_FALLBACK`, `FALLBACK_POSITION_1`, `FALLBACK_POSITION_2`, etc. Can be used for filtering.
   *
   * Corresponds to "Fallback position" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_FALLBACK_POSITION = 'VIDEO_FALLBACK_POSITION',
  /**
   * Breaks down reporting data by the position of the video ad within the video stream, i.e., `UNKNOWN_POSITION`, `PREROLL`, `POSTROLL`, `UNKNOWN_MIDROLL`, `MIDROLL_1`, `MIDROLL_2`, etc. `UNKNOWN_MIDROLL` represents a midroll, but which specific midroll is unknown. Can be used for filtering.
   *
   * Corresponds to "Position of pod" in the Ad Manager UI. Compatible with any of the following report types: Historical, Real-time video.
   */
  POSITION_OF_POD = 'POSITION_OF_POD',
  /**
   * Breaks down reporting data by the position of the video ad within the pod, i.e., `UNKNOWN_POSITION`, `POSITION_1`, `POSITION_2`, etc. Can be used for filtering.
   *
   * Corresponds to "Position in pod" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  POSITION_IN_POD = 'POSITION_IN_POD',
  /**
   * Breaks down reporting data by `AdSpot.id`. Can be used to filter by `AdSpot.id`.
   *
   * Compatible with the "Historical" report type.
   */
  CUSTOM_SPOT_ID = 'CUSTOM_SPOT_ID',
  /**
   * Breaks down reporting data by content. `AdSpot.name` and `AdSpot.id` are automatically included as columns in the report. Can be used to filter by `AdSpot.name`.
   *
   * Corresponds to "Custom spot" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  CUSTOM_SPOT_NAME = 'CUSTOM_SPOT_NAME',
  /**
   * Breaks down reporting data by video redirect vendor.
   *
   * Corresponds to "Video redirect third party" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_REDIRECT_THIRD_PARTY = 'VIDEO_REDIRECT_THIRD_PARTY',
  /**
   * The filter to break down reporting data by video break type. Not available as a dimension to report on.
   *
   * Compatible with the "Historical" report type.
   */
  VIDEO_BREAK_TYPE = 'VIDEO_BREAK_TYPE',
  /**
   * The filter to break down reporting data by video break type. Can only be used with the following string values: "Unknown", "Single ad video request", "Optimized pod video request". Not available as a dimension to report on.
   *
   * Compatible with the "Historical" report type.
   */
  VIDEO_BREAK_TYPE_NAME = 'VIDEO_BREAK_TYPE_NAME',
  /**
   * Breaks down reporting data by vast version type name.
   *
   * Corresponds to "VAST version" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VAST_VERSION = 'VIDEO_VAST_VERSION',
  /**
   * Breaks down reporting data by video request duration bucket.
   *
   * Compatible with the "Historical" report type.
   */
  VIDEO_AD_REQUEST_DURATION_ID = 'VIDEO_AD_REQUEST_DURATION_ID',
  /**
   * Breaks down reporting data by video request duration bucket name.
   *
   * Corresponds to "Video ad request duration" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_AD_REQUEST_DURATION = 'VIDEO_AD_REQUEST_DURATION',
  /**
   * Breaks down reporting data by the ID of the type of video placement as defined by the updated IAB definition. The values of "in-stream" and "accompanying content" are declared via publisher inputted URL parameters. The values of "interstitial" and "no content" are populated automatically based on the declared inventory type. The video placement dimension only applies to backfill traffic.
   */
  VIDEO_PLCMT_ID = 'VIDEO_PLCMT_ID',
  /**
   * Breaks down reporting data by the name of the type of video placement as defined by the updated IAB definition. The values of "in-stream" and "accompanying content" are declared via publisher inputted URL parameters. The values of "interstitial" and "no content" are populated automatically based on the declared inventory type. The video placement dimension only applies to backfill traffic.
   *
   * Corresponds to "Video placement" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_PLCMT_NAME = 'VIDEO_PLCMT_NAME',
  /**
   * Breaks down impressions by inventory format id.
   *
   * Compatible with the "Historical" report type.
   */
  INVENTORY_FORMAT = 'INVENTORY_FORMAT',
  /**
   * Breaks down impressions by inventory format name.
   *
   * Corresponds to "Inventory format" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  INVENTORY_FORMAT_NAME = 'INVENTORY_FORMAT_NAME',
  /**
   * Breaks down reporting data by partner `Company.id`.
   *
   * Compatible with any of the following report types: Historical, Partner finance.
   */
  PARTNER_MANAGEMENT_PARTNER_ID = 'PARTNER_MANAGEMENT_PARTNER_ID',
  /**
   * Breaks down reporting data by partner `Company.name` and `Company.id` are automatically included as columns in the report.
   *
   * Corresponds to "Partner management partner" in the Ad Manager UI. Compatible with any of the following report types: Historical, Partner finance.
   */
  PARTNER_MANAGEMENT_PARTNER_NAME = 'PARTNER_MANAGEMENT_PARTNER_NAME',
  /**
   * Breaks down reporting data by partner label `Label.id`.
   *
   * Compatible with any of the following report types: Historical, Partner finance.
   */
  PARTNER_MANAGEMENT_PARTNER_LABEL_ID = 'PARTNER_MANAGEMENT_PARTNER_LABEL_ID',
  /**
   * Breaks down reporting data by partner label. `Label.name` and `Label.id` are automatically included as columns in the report.
   *
   * Corresponds to "Partner label" in the Ad Manager UI. Compatible with any of the following report types: Historical, Partner finance.
   */
  PARTNER_MANAGEMENT_PARTNER_LABEL_NAME = 'PARTNER_MANAGEMENT_PARTNER_LABEL_NAME',
  /**
   * Breaks down reporting data by partner assignment id.
   *
   * Compatible with any of the following report types: Historical, Partner finance.
   */
  PARTNER_MANAGEMENT_ASSIGNMENT_ID = 'PARTNER_MANAGEMENT_ASSIGNMENT_ID',
  /**
   * Breaks down reporting data by partner assignment name. PartnerAssignment name and id are automatically included as columns in the report.
   *
   * Corresponds to "Partner management assignment" in the Ad Manager UI. Compatible with any of the following report types: Historical, Partner finance.
   */
  PARTNER_MANAGEMENT_ASSIGNMENT_NAME = 'PARTNER_MANAGEMENT_ASSIGNMENT_NAME',
  /**
   * Breaks down reporting data by inventory sharing assignment ID.
   *
   * Compatible with the "Historical" report type.
   */
  INVENTORY_SHARE_ASSIGNMENT_ID = 'INVENTORY_SHARE_ASSIGNMENT_ID',
  /**
   * Breaks down reporting data by inventory sharing assignment name.
   *
   * Corresponds to "Inventory share assignment" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  INVENTORY_SHARE_ASSIGNMENT_NAME = 'INVENTORY_SHARE_ASSIGNMENT_NAME',
  /**
   * Breaks down reporting data by inventory sharing outcome.
   *
   * Corresponds to "Inventory share outcome" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  INVENTORY_SHARE_OUTCOME = 'INVENTORY_SHARE_OUTCOME',
  /**
   * Breaks down reporting data by gender and age group, i.e., MALE_13_TO_17, MALE_18_TO_24, MALE_25_TO_34, MALE_35_TO_44, MALE_45_TO_54, MALE_55_TO_64, MALE_65_PLUS, FEMALE_13_TO_17, FEMALE_18_TO_24, FEMALE_25_TO_34, FEMALE_35_TO_44, FEMALE_45_TO_54, FEMALE_55_TO_64, FEMALE_65_PLUS, UNKNOWN_0_TO_17 and UNKNOWN. Whenever this dimension is selected, `COUNTRY_NAME` must be selected.
   *
   * This dimension is supported only for GRP columns.
   *
   * Can correspond to any of the following in the Ad Manager UI: Demographics, comScore vCE demographics. Compatible with the "Reach" report type.
   */
  GRP_DEMOGRAPHICS = 'GRP_DEMOGRAPHICS',
  /**
   * Breaks down reporting data by the ad unit sizes specified in ad requests.
   *
   * Formatted as comma separated values, e.g. "300x250,300x250v,300x60".
   *
   * This dimension is supported only for sell-through columns.
   *
   * Corresponds to "Ad request sizes" in the Ad Manager UI. Compatible with the "Future sell-through" report type.
   */
  AD_REQUEST_AD_UNIT_SIZES = 'AD_REQUEST_AD_UNIT_SIZES',
  /**
   * Breaks down reporting data by the custom criteria specified in ad requests.
   *
   * Formatted as comma separated key-values, where a key-value is formatted as `key1=value_1|...|value_n,key2=value_1|...|value_n,...`.
   *
   * This dimension is supported only for sell-through columns.
   *
   * Corresponds to "Key-values" in the Ad Manager UI. Compatible with the "Future sell-through" report type.
   */
  AD_REQUEST_CUSTOM_CRITERIA = 'AD_REQUEST_CUSTOM_CRITERIA',
  /**
   * Break down the report by a boolean indicator. It's TRUE for Ad Exchange traffic fulfilled by First Look Deals. It can be used both as a dimension or dimension filter. As a filter, it can only be used with the string values "true" and "false".
   *
   * Corresponds to "Is First Look" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  IS_FIRST_LOOK_DEAL = 'IS_FIRST_LOOK_DEAL',
  /**
   * Break down the report by a boolean indicator. It's TRUE for AdX Direct traffic. It can be used both as a dimension or dimension filter. As a filter, it can only be used with the string values "true" and "false".
   *
   * Corresponds to "Is AdX Direct" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  IS_ADX_DIRECT = 'IS_ADX_DIRECT',
  /**
   * Breaks down reporting data by yield group ID.
   *
   * Compatible with the "Historical" report type.
   */
  YIELD_GROUP_ID = 'YIELD_GROUP_ID',
  /**
   * Breaks down reporting data by yield group name.
   *
   * Corresponds to "Yield group" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  YIELD_GROUP_NAME = 'YIELD_GROUP_NAME',
  /**
   * Breaks down reporting data by yield partner.
   *
   * Corresponds to "Yield partner" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  YIELD_PARTNER = 'YIELD_PARTNER',
  /**
   * Breaks down reporting data by the tag of a yield partner in a yield group.
   *
   * Corresponds to "Yield partner tag" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  YIELD_PARTNER_TAG = 'YIELD_PARTNER_TAG',
  /**
   * The ID of an exchange bidding deal.
   *
   * Corresponds to "Exchange bidding deal id" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  EXCHANGE_BIDDING_DEAL_ID = 'EXCHANGE_BIDDING_DEAL_ID',
  /**
   * The type of an exchange bidding deal.
   *
   * Corresponds to "Exchange bidding deal type" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  EXCHANGE_BIDDING_DEAL_TYPE = 'EXCHANGE_BIDDING_DEAL_TYPE',
  /**
   * The ID of a classified advertiser.
   *
   * Compatible with the "Ad speed" report type.
   */
  CLASSIFIED_ADVERTISER_ID = 'CLASSIFIED_ADVERTISER_ID',
  /**
   * The name of a classified advertiser.
   *
   * Corresponds to "Advertiser (classified)" in the Ad Manager UI. Compatible with any of the following report types: Historical, Ad speed.
   */
  CLASSIFIED_ADVERTISER_NAME = 'CLASSIFIED_ADVERTISER_NAME',
  /**
   * The ID of a classified brand.
   *
   * Compatible with the "Ad speed" report type.
   */
  CLASSIFIED_BRAND_ID = 'CLASSIFIED_BRAND_ID',
  /**
   * The name of a classified brand.
   *
   * Corresponds to "Brand (classified)" in the Ad Manager UI. Compatible with any of the following report types: Historical, Ad speed.
   */
  CLASSIFIED_BRAND_NAME = 'CLASSIFIED_BRAND_NAME',
  /**
   * Breaks down reporting data by mediation type. A mediation type can be web, mobile app or video.
   *
   * Corresponds to "Mediation type" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  MEDIATION_TYPE = 'MEDIATION_TYPE',
  /**
   * Breaks down reporting data by native template (also known as creative template) ID.
   *
   * Compatible with the "Historical" report type.
   */
  NATIVE_TEMPLATE_ID = 'NATIVE_TEMPLATE_ID',
  /**
   * Breaks down reporting data by native template (also known as creative template) name.
   *
   * Corresponds to "Native ad format name" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  NATIVE_TEMPLATE_NAME = 'NATIVE_TEMPLATE_NAME',
  /**
   * Breaks down reporting data by native style ID.
   *
   * Compatible with the "Historical" report type.
   */
  NATIVE_STYLE_ID = 'NATIVE_STYLE_ID',
  /**
   * Breaks down reporting data by native style name.
   *
   * Corresponds to "Native style name" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  NATIVE_STYLE_NAME = 'NATIVE_STYLE_NAME',
  /**
   * Breaks down reporting data by child network code in MCM "Manage Inventory".
   *
   * This dimension only works for MCM "Manage Inventory" parent publishers.
   *
   * Corresponds to "Child network code" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  CHILD_NETWORK_CODE = 'CHILD_NETWORK_CODE',
  /**
   * Breaks down reporting data by mobile app ID received in the ad request (which may be made up). If app ID is not available, '(Not applicable)' will be returned. Special values like 'null' and 'unidentified' will be reported as '(Not applicable)'. Can be used for filtering.
   *
   * Corresponds to "App ID" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  MOBILE_APP_RESOLVED_ID = 'MOBILE_APP_RESOLVED_ID',
  /**
   * Breaks down reporting data by mobile app name. Can be used for filtering.
   *
   * Corresponds to "App names" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  MOBILE_APP_NAME = 'MOBILE_APP_NAME',
  /**
   * Breaks down reporting data by device name. Can be used for filtering.
   *
   * Corresponds to "Devices" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  MOBILE_DEVICE_NAME = 'MOBILE_DEVICE_NAME',
  /**
   * Breaks down reporting data by inventory type. Can be used for filtering.
   *
   * Corresponds to "Inventory types" in the Ad Manager UI. Compatible with any of the following report types: Historical, Ad speed.
   */
  MOBILE_INVENTORY_TYPE = 'MOBILE_INVENTORY_TYPE',
  /**
   * Breaks down reporting data by OS version id.
   *
   * Compatible with the "Historical" report type.
   */
  OPERATING_SYSTEM_VERSION_ID = 'OPERATING_SYSTEM_VERSION_ID',
  /**
   * Breaks down reporting data by OS version name.
   *
   * Corresponds to "Operating system" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  OPERATING_SYSTEM_VERSION_NAME = 'OPERATING_SYSTEM_VERSION_NAME',
  /**
   * Breaks down reporting data by request type. Can be used for filtering.
   *
   * Corresponds to "Request type" in the Ad Manager UI. Compatible with any of the following report types: Historical, Ad speed.
   */
  REQUEST_TYPE = 'REQUEST_TYPE',
  /**
   * Status of the ad unit. Not available as a dimension to report on, but exists as a dimension in order to filter on it using PQL. Valid values correspond to `InventoryStatus`.
   *
   * Compatible with any of the following report types: Historical, Future sell-through, Ad speed, Real-time video.
   */
  AD_UNIT_STATUS = 'AD_UNIT_STATUS',
  /**
   * Breaks down reporting data by `Creative.id`. This includes regular creatives, and master and companions in case of creative sets.
   *
   * Compatible with the "Historical" report type.
   */
  MASTER_COMPANION_CREATIVE_ID = 'MASTER_COMPANION_CREATIVE_ID',
  /**
   * Breaks down reporting data by creative. This includes regular creatives, and master and companions in case of creative sets.
   *
   * Corresponds to "Master and Companion creative" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  MASTER_COMPANION_CREATIVE_NAME = 'MASTER_COMPANION_CREATIVE_NAME',
  /**
   * Breaks down reporting data by billable audience segment ID.
   *
   * Compatible with the "Historical" report type.
   */
  AUDIENCE_SEGMENT_ID = 'AUDIENCE_SEGMENT_ID',
  /**
   * Breaks down reporting data by billable audience segment name.
   *
   * Corresponds to "Audience segment (billable)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AUDIENCE_SEGMENT_NAME = 'AUDIENCE_SEGMENT_NAME',
  /**
   * Breaks down reporting data by audience segment data provider name.
   *
   * Corresponds to "Data partner" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AUDIENCE_SEGMENT_DATA_PROVIDER_NAME = 'AUDIENCE_SEGMENT_DATA_PROVIDER_NAME',
  /**
   * Breaks down data by web property code.
   *
   * Compatible with the "Historical" report type.
   */
  WEB_PROPERTY_CODE = 'WEB_PROPERTY_CODE',
  /**
   * Breaks down reporting data by agency.
   *
   * Corresponds to "Buying agency" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  BUYING_AGENCY_NAME = 'BUYING_AGENCY_NAME',
  /**
   * Breaks down reporting data by buyer network Id.
   *
   * Compatible with the "Historical" report type.
   */
  BUYER_NETWORK_ID = 'BUYER_NETWORK_ID',
  /**
   * Breaks down reporting data by buyer network name.
   *
   * Corresponds to "Buyer network" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  BUYER_NETWORK_NAME = 'BUYER_NETWORK_NAME',
  /**
   * Breaks down reporting data by Bidder ID.
   *
   * Compatible with the "Historical" report type.
   */
  BIDDER_ID = 'BIDDER_ID',
  /**
   * Breaks down reporting data by Bidder name.
   *
   * Corresponds to "Bidder" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  BIDDER_NAME = 'BIDDER_NAME',
  /**
   * Breaks down reporting data by advertiser domain.
   *
   * Corresponds to "Landing page domain" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADVERTISER_DOMAIN_NAME = 'ADVERTISER_DOMAIN_NAME',
  /**
   * Breaks down reporting data by optimization type.
   *
   * Corresponds to "Optimization type" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  AD_EXCHANGE_OPTIMIZATION_TYPE = 'AD_EXCHANGE_OPTIMIZATION_TYPE',
  /**
   * Breaks down reporting data by advertiser vertical.
   *
   * Corresponds to "Advertiser vertical" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADVERTISER_VERTICAL_NAME = 'ADVERTISER_VERTICAL_NAME',
  /**
   * Campaign date segment of Nielsen Digital Ad Ratings reporting.
   *
   * Corresponds to "Nielsen Digital Ad Ratings segment" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_SEGMENT = 'NIELSEN_SEGMENT',
  /**
   * Breaks down reporting data by gender and age group, i.e., MALE_18_TO_20, MALE_21_TO_24, MALE_25_TO_29, MALE_30_TO_35, MALE_35_TO_39, MALE_40_TO_44, MALE_45_TO_49, MALE_50_TO_54, MALE_55_TO_64, MALE_65_PLUS, FEMALE_18_TO_20, FEMALE_21_TO_24, FEMALE_25_TO_29, FEMALE_30_TO_34, FEMALE_35_TO_39, FEMALE_40_TO_44, FEMALE_45_TO_49, FEMALE_50_TO_54, FEMALE_55_TO_64, FEMALE_65_PLUS, and OTHER.
   */
  NIELSEN_DEMOGRAPHICS = 'NIELSEN_DEMOGRAPHICS',
  /**
   * Data restatement date of Nielsen Digital Ad Ratings data.
   *
   * Corresponds to "Nielsen Digital Ad Ratings restatement date" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_RESTATEMENT_DATE = 'NIELSEN_RESTATEMENT_DATE',
  /**
   * Breaks down reporting data by device type, i.e., Computer, Mobile and other types.
   *
   * This dimension is supported only for Nielsen columns.
   *
   * Compatible with the "Reach" report type.
   */
  NIELSEN_DEVICE_ID = 'NIELSEN_DEVICE_ID',
  /**
   * Breaks down reporting data by device type, i.e., Computer, Mobile and other types.
   *
   * This dimension is supported only for Nielsen columns.
   *
   * Corresponds to "Nielsen Digital Ad Ratings device" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_DEVICE_NAME = 'NIELSEN_DEVICE_NAME',
  /**
   * Breaks down reporting data by `ProposalMarketplaceInfo.buyerAccountId`.
   *
   * Compatible with any of the following report types: Historical, Reach.
   */
  PROGRAMMATIC_BUYER_ID = 'PROGRAMMATIC_BUYER_ID',
  /**
   * Breaks down reporting data by programmatic buyer name.
   *
   * Corresponds to "Deal buyer" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  PROGRAMMATIC_BUYER_NAME = 'PROGRAMMATIC_BUYER_NAME',
  /**
   * Breaks down reporting data by requested ad size(s). This can be a chain of sizes or a single size.
   *
   * Corresponds to "Requested ad sizes" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  REQUESTED_AD_SIZES = 'REQUESTED_AD_SIZES',
  /**
   * Breaks down reporting data by the creative size the ad was delivered to.
   *
   * Corresponds to "Creative size (delivered)" in the Ad Manager UI. Compatible with any of the following report types: Historical, Ad speed.
   */
  CREATIVE_SIZE_DELIVERED = 'CREATIVE_SIZE_DELIVERED',
  /**
   * Breaks down reporting data by the type of transaction that occurred in Ad Exchange.
   *
   * Compatible with the "Historical" report type.
   */
  PROGRAMMATIC_CHANNEL_ID = 'PROGRAMMATIC_CHANNEL_ID',
  /**
   * Breaks down reporting data by the type of transaction that occurred in Ad Exchange.
   *
   * Corresponds to "Programmatic channel" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  PROGRAMMATIC_CHANNEL_NAME = 'PROGRAMMATIC_CHANNEL_NAME',
  /**
   * Breaks down data by detected yield partner name.
   *
   * Corresponds to "Yield partner (classified)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  CLASSIFIED_YIELD_PARTNER_NAME = 'CLASSIFIED_YIELD_PARTNER_NAME',
  /**
   * Breaks down Demand reporting data by date in the network time zone. Can be used to filter by date using ISO 8601's format 'YYYY-MM-DD'".
   *
   * Corresponds to "Date" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_DATE = 'DP_DATE',
  /**
   * Breaks down Demand reporting data by week of the year in the network time zone. Cannot be used for filtering.
   *
   * Corresponds to "Week" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_WEEK = 'DP_WEEK',
  /**
   * Breaks down Demand reporting data by month and year in the network time zone. Cannot be used to filter.
   *
   * Corresponds to "Month and year" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_MONTH_YEAR = 'DP_MONTH_YEAR',
  /**
   * Breaks down Demand reporting data by country criteria ID. Can be used to filter by country criteria ID.
   *
   * Compatible with the "Ad Connector" report type.
   */
  DP_COUNTRY_CRITERIA_ID = 'DP_COUNTRY_CRITERIA_ID',
  /**
   * Breaks down Demand reporting data by country name. The country name and the country criteria ID are automatically included as columns in the report. Can be used to filter by country name using the US English name.
   *
   * Corresponds to "Country" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_COUNTRY_NAME = 'DP_COUNTRY_NAME',
  /**
   * Breaks down Demand reporting data by inventory type.
   *
   * Corresponds to "Inventory type" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_INVENTORY_TYPE = 'DP_INVENTORY_TYPE',
  /**
   * Breaks down Demand reporting data by the creative size the ad was delivered to.
   *
   * Corresponds to "Creative size" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_CREATIVE_SIZE = 'DP_CREATIVE_SIZE',
  /**
   * Breaks down Demand reporting data by the brand name that bids on ads.
   *
   * Corresponds to "Brand" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_BRAND_NAME = 'DP_BRAND_NAME',
  /**
   * Breaks down Demand reporting data by the advertiser name that bid on ads.
   *
   * Corresponds to "Advertiser" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_ADVERTISER_NAME = 'DP_ADVERTISER_NAME',
  /**
   * Breaks down Demand reporting data by Ad Exchange ad network name. Example: Google Adwords.
   *
   * Corresponds to "Buyer network" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_ADX_BUYER_NETWORK_NAME = 'DP_ADX_BUYER_NETWORK_NAME',
  /**
   * Breaks down reporting data by device name.
   *
   * Corresponds to "Device" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_MOBILE_DEVICE_NAME = 'DP_MOBILE_DEVICE_NAME',
  /**
   * Breaks down reporting data by the category of device (smartphone, feature phone, tablet, or desktop).
   *
   * Corresponds to "Device category" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_DEVICE_CATEGORY_NAME = 'DP_DEVICE_CATEGORY_NAME',
  /**
   * Breaks down reporting data by the tag id provided by the publisher in the ad request.
   *
   * Corresponds to "Tag ID" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_TAG_ID = 'DP_TAG_ID',
  /**
   * Breaks down reporting data by the deal id provided by the publisher in the ad request.
   *
   * Corresponds to "Deal IDs" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_DEAL_ID = 'DP_DEAL_ID',
  /**
   * Breaks down reporting data by mobile app ID.
   *
   * Corresponds to "App ID" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_APP_ID = 'DP_APP_ID',
  /**
   * Breaks down reporting data by the `CustomTargetingKey`s marked as dimensions in inventory key-values setup. To use this dimension, a list of custom targeting key IDs must be specified in `ReportQuery.customDimensionKeyIds`.
   */
  CUSTOM_DIMENSION = 'CUSTOM_DIMENSION',
  /**
   * Breaks down reporting data by demand channels.
   *
   * Compatible with any of the following report types: Historical, Reach, Ad speed.
   */
  DEMAND_CHANNEL_ID = 'DEMAND_CHANNEL_ID',
  /**
   * Breaks down reporting data by demand channel name.
   *
   * Corresponds to "Demand channel" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach, Ad speed.
   */
  DEMAND_CHANNEL_NAME = 'DEMAND_CHANNEL_NAME',
  /**
   * Breaks down reporting data by top private domain.
   *
   * Corresponds to "Domain" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  DOMAIN = 'DOMAIN',
  /**
   * Breaks down reporting data by serving restriction id.
   *
   * Compatible with the "Historical" report type.
   */
  SERVING_RESTRICTION_ID = 'SERVING_RESTRICTION_ID',
  /**
   * Breaks down reporting data by serving restriction name.
   *
   * Corresponds to "Serving restriction" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  SERVING_RESTRICTION_NAME = 'SERVING_RESTRICTION_NAME',
  /**
   * Breaks down reporting data by pricing rule id.
   *
   * Compatible with the "Historical" report type.
   */
  UNIFIED_PRICING_RULE_ID = 'UNIFIED_PRICING_RULE_ID',
  /**
   * Breaks down reporting data by pricing rule name.
   *
   * Corresponds to "Pricing rule" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  UNIFIED_PRICING_RULE_NAME = 'UNIFIED_PRICING_RULE_NAME',
  /**
   * Breaks down reporting data by first price pricing rule id.
   *
   * Compatible with the "Historical" report type.
   */
  FIRST_LOOK_PRICING_RULE_ID = 'FIRST_LOOK_PRICING_RULE_ID',
  /**
   * Breaks down reporting data by first price pricing rule name.
   *
   * Corresponds to "First look pricing rule" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  FIRST_LOOK_PRICING_RULE_NAME = 'FIRST_LOOK_PRICING_RULE_NAME',
  /**
   * Breaks down reporting data by the range within which the bid falls, divided into $0.10 buckets.
   *
   * Corresponds to "Bid range" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  BID_RANGE = 'BID_RANGE',
  /**
   * Breaks down reporting data by the ID of the reason the bid lost or did not participate in the auction.
   *
   * Compatible with the "Historical" report type.
   */
  BID_REJECTION_REASON = 'BID_REJECTION_REASON',
  /**
   * Breaks down reporting data by the reason the bid lost or did not participate in the auction.
   *
   * Corresponds to "Bid rejection reason" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  BID_REJECTION_REASON_NAME = 'BID_REJECTION_REASON_NAME',
  /**
   * Breaks down reporting data by the domain of the ad technology provider (ATP) associated with the bid.
   *
   * Corresponds to "Ad technology provider domain" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_TECHNOLOGY_PROVIDER_DOMAIN = 'AD_TECHNOLOGY_PROVIDER_DOMAIN',
  /**
   * Breaks down reporting data by programmatic deal ID.
   *
   * Corresponds to "Deal ID" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  PROGRAMMATIC_DEAL_ID = 'PROGRAMMATIC_DEAL_ID',
  /**
   * Breaks down reporting data by programmatic deal name.
   *
   * Corresponds to "Deal name" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  PROGRAMMATIC_DEAL_NAME = 'PROGRAMMATIC_DEAL_NAME',
  /**
   * Breaks down reporting data by the ID of the ad technology provider (ATP) associated with the bid.
   *
   * Corresponds to "Ad technology provider ID" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_TECHNOLOGY_PROVIDER_ID = 'AD_TECHNOLOGY_PROVIDER_ID',
  /**
   * Breaks down reporting data by the ad technology provider (ATP) associated with the bid.
   *
   * Corresponds to "Ad technology provider" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_TECHNOLOGY_PROVIDER_NAME = 'AD_TECHNOLOGY_PROVIDER_NAME',
  /**
   * Breaks down reporting data by the ID of the ad technology provider as it appears on the Global Vendor List (GVL).
   *
   * Corresponds to "TCF vendor ID" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TCF_VENDOR_ID = 'TCF_VENDOR_ID',
  /**
   * Breaks down reporting data by the name of the ad technology provider as it appears on the Global Vendor List (GVL).
   *
   * Corresponds to "TCF vendor" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TCF_VENDOR_NAME = 'TCF_VENDOR_NAME',
  /**
   * Breaks down reporting data by site.
   *
   * Corresponds to "Site" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  SITE_NAME = 'SITE_NAME',
  /**
   * Breaks down reporting data by channels.
   *
   * Corresponds to "Channel" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  CHANNEL_NAME = 'CHANNEL_NAME',
  /**
   * Breaks down reporting data by URL ID.
   *
   * Compatible with the "Historical" report type.
   */
  URL_ID = 'URL_ID',
  /**
   * Breaks down reporting data by URL name.
   *
   * Corresponds to "URL" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  URL_NAME = 'URL_NAME',
  /**
   * Breaks down reporting data by video ad duration.
   *
   * Corresponds to "Video ad duration" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_AD_DURATION = 'VIDEO_AD_DURATION',
  /**
   * Breaks down reporting data by video ad type Id.
   *
   * Compatible with the "Historical" report type.
   */
  VIDEO_AD_TYPE_ID = 'VIDEO_AD_TYPE_ID',
  /**
   * Breaks down reporting data by video ad type.
   *
   * Corresponds to "Video ad type" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_AD_TYPE_NAME = 'VIDEO_AD_TYPE_NAME',
  /**
   * Breaks down reporting data by Ad Exchange product code.
   *
   * Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_PRODUCT_CODE = 'AD_EXCHANGE_PRODUCT_CODE',
  /**
   * Breaks down reporting data by Ad Exchange product.
   *
   * Corresponds to "Ad Exchange product" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_PRODUCT_NAME = 'AD_EXCHANGE_PRODUCT_NAME',
  /**
   * Breaks down reporting data by Dynamic allocation ID.
   *
   * Compatible with the "Historical" report type.
   */
  DYNAMIC_ALLOCATION_ID = 'DYNAMIC_ALLOCATION_ID',
  /**
   * Breaks down reporting data by Dynamic allocation.
   *
   * Corresponds to "Dynamic allocation" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  DYNAMIC_ALLOCATION_NAME = 'DYNAMIC_ALLOCATION_NAME',
  /**
   * Breaks down reporting data by Ad type ID.
   *
   * Compatible with the "Historical" report type.
   */
  AD_TYPE_ID = 'AD_TYPE_ID',
  /**
   * Breaks down reporting data by Ad type.
   *
   * Corresponds to "Ad type" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_TYPE_NAME = 'AD_TYPE_NAME',
  /**
   * Breaks down reporting data by Ad location ID.
   *
   * Compatible with the "Historical" report type.
   */
  AD_LOCATION_ID = 'AD_LOCATION_ID',
  /**
   * Breaks down reporting data by Ad location.
   *
   * Corresponds to "Ad location" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_LOCATION_NAME = 'AD_LOCATION_NAME',
  /**
   * Breaks down reporting data by Targeting type code.
   *
   * Compatible with the "Historical" report type.
   */
  TARGETING_TYPE_CODE = 'TARGETING_TYPE_CODE',
  /**
   * Breaks down reporting data by Targeting type.
   *
   * Corresponds to "Targeting type" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TARGETING_TYPE_NAME = 'TARGETING_TYPE_NAME',
  /**
   * Breaks down reporting data by Branding type code.
   *
   * Compatible with the "Historical" report type.
   */
  BRANDING_TYPE_CODE = 'BRANDING_TYPE_CODE',
  /**
   * Breaks down reporting data by Branding type.
   *
   * Corresponds to "Branding type" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  BRANDING_TYPE_NAME = 'BRANDING_TYPE_NAME',
  /**
   * Breaks down reporting data by Bandwidth Id.
   *
   * Compatible with the "Historical" report type.
   */
  BANDWIDTH_ID = 'BANDWIDTH_ID',
  /**
   * Breaks down reporting data by Bandwidth name.
   *
   * Corresponds to "Bandwidth" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  BANDWIDTH_NAME = 'BANDWIDTH_NAME',
  /**
   * Breaks down reporting data by Carrier Id.
   *
   * Compatible with the "Historical" report type.
   */
  CARRIER_ID = 'CARRIER_ID',
  /**
   * Breaks down reporting data by Carrier name.
   *
   * Corresponds to "Carrier" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  CARRIER_NAME = 'CARRIER_NAME',
}

/**
 * A view for an ad unit report.
 */
export enum ReportQueryAdUnitView {
  /**
   * Only the top level ad units. Metrics include events for their descendants that are not filtered out.
   */
  TOP_LEVEL = 'TOP_LEVEL',
  /**
   * All the ad units. Metrics do not include events for the descendants.
   */
  FLAT = 'FLAT',
  /**
   * Use the ad unit hierarchy. There will be as many ad unit columns as levels of ad units in the generated report:
   *
   * - The column `Dimension.AD_UNIT_NAME` is replaced with columns "Ad unit 1", "Ad unit 2", ... "Ad unit n". If level is not applicable to a row, "N/A" is returned as the value.
   * - The column `Dimension.AD_UNIT_ID` is replaced with columns "Ad unit ID 1", "Ad unit ID 2", ... "Ad unit ID n". If level is not applicable to a row, "N/A" is returned as the value.
   *
   * Metrics do not include events for the descendants.
   */
  HIERARCHICAL = 'HIERARCHICAL',
}

/**
 * `Column` provides all the trafficking statistics and revenue information available for the chosen `Dimension` objects.
 *
 * Columns with `INVENTORY_LEVEL` should not be used with dimensions relating to line items, orders, companies and creatives, such as `Dimension.LINE_ITEM_NAME`. Columns with `LINE_ITEM_LEVEL` can only be used if you have line item-level dynamic allocation enabled on your network.
 */
export enum Column {
  /**
   * The number of impressions delivered by the ad server.
   *
   * Corresponds to "Ad server impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_IMPRESSIONS = 'AD_SERVER_IMPRESSIONS',
  /**
   * The number of begin-to-render impressions delivered by the ad server.
   *
   * Corresponds to "Ad server begin to render impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_BEGIN_TO_RENDER_IMPRESSIONS = 'AD_SERVER_BEGIN_TO_RENDER_IMPRESSIONS',
  /**
   * The number of impressions delivered by the ad server by explicit custom criteria targeting.
   *
   * Corresponds to "Ad server targeted impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_TARGETED_IMPRESSIONS = 'AD_SERVER_TARGETED_IMPRESSIONS',
  /**
   * The number of clicks delivered by the ad server.
   *
   * Corresponds to "Ad server clicks" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_CLICKS = 'AD_SERVER_CLICKS',
  /**
   * The number of clicks delivered by the ad server by explicit custom criteria targeting.
   *
   * Corresponds to "Ad server targeted clicks" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_TARGETED_CLICKS = 'AD_SERVER_TARGETED_CLICKS',
  /**
   * The CTR for an ad delivered by the ad server.
   *
   * Corresponds to "Ad server CTR" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_CTR = 'AD_SERVER_CTR',
  /**
   * The CPM and CPC revenue earned, calculated in publisher currency, for the ads delivered by the ad server.
   *
   * Corresponds to "Ad server CPM and CPC revenue" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_CPM_AND_CPC_REVENUE = 'AD_SERVER_CPM_AND_CPC_REVENUE',
  /**
   * The CPM and CPC revenue earned, calculated in publisher currency, for the ads delivered by the ad server. This includes pre-rev-share revenue for Programmatic traffic. This is a temporary metric to help with the transition from gross to net revenue reporting.
   *
   * Corresponds to "Ad server CPM and CPC revenue (gross)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_CPM_AND_CPC_REVENUE_GROSS = 'AD_SERVER_CPM_AND_CPC_REVENUE_GROSS',
  /**
   * The CPD revenue earned, calculated in publisher currency, for the ads delivered by the ad server.
   *
   * Corresponds to "Ad server CPD revenue" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_CPD_REVENUE = 'AD_SERVER_CPD_REVENUE',
  /**
   * All revenue earned, calculated in publisher currency, for the ads delivered by the ad server.
   *
   * Corresponds to "Ad server total revenue" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_ALL_REVENUE = 'AD_SERVER_ALL_REVENUE',
  /**
   * All gross revenue earned, calculated in publisher currency, for the ads delivered by the ad server. This includes pre-rev-share revenue for Programmatic traffic. This is a temporary metric to help with the transition from gross to net revenue reporting.
   *
   * Corresponds to "Ad server total revenue (gross)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_ALL_REVENUE_GROSS = 'AD_SERVER_ALL_REVENUE_GROSS',
  /**
   * The average estimated cost-per-thousand-impressions earned from the CPM and CPC ads delivered by the ad server.
   *
   * Corresponds to "Ad server average eCPM" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_WITHOUT_CPD_AVERAGE_ECPM = 'AD_SERVER_WITHOUT_CPD_AVERAGE_ECPM',
  /**
   * The average estimated cost-per-thousand-impressions earned from all ads delivered by the ad server.
   */
  AD_SERVER_WITH_CPD_AVERAGE_ECPM = 'AD_SERVER_WITH_CPD_AVERAGE_ECPM',
  /**
   * The ratio of the number of impressions delivered to the total impressions delivered by the ad server for line item-level dynamic allocation. Represented as a percentage.
   *
   * Corresponds to "Ad server impressions (%)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_LINE_ITEM_LEVEL_PERCENT_IMPRESSIONS = 'AD_SERVER_LINE_ITEM_LEVEL_PERCENT_IMPRESSIONS',
  /**
   * The ratio of the number of clicks delivered to the total clicks delivered by the ad server for line item-level dynamic allocation. Represented as a percentage.
   *
   * Corresponds to "Ad server clicks (%)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_LINE_ITEM_LEVEL_PERCENT_CLICKS = 'AD_SERVER_LINE_ITEM_LEVEL_PERCENT_CLICKS',
  /**
   * The ratio of revenue generated by ad server to the total CPM and CPC revenue earned by the ads delivered for line item-level dynamic allocation. Represented as a percentage.
   *
   * Corresponds to "Ad server revenue (%)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_LINE_ITEM_LEVEL_WITHOUT_CPD_PERCENT_REVENUE = 'AD_SERVER_LINE_ITEM_LEVEL_WITHOUT_CPD_PERCENT_REVENUE',
  /**
   * The ratio of revenue generated by ad server to the total CPM, CPC and CPD revenue earned by the ads delivered for line item-level dynamic allocation. Represented as a percentage.
   */
  AD_SERVER_LINE_ITEM_LEVEL_WITH_CPD_PERCENT_REVENUE = 'AD_SERVER_LINE_ITEM_LEVEL_WITH_CPD_PERCENT_REVENUE',
  /**
   * The number of downloaded impressions delivered by the ad server including impressions recognized as spam.
   *
   * Corresponds to "Ad server unfiltered downloaded impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_UNFILTERED_IMPRESSIONS = 'AD_SERVER_UNFILTERED_IMPRESSIONS',
  /**
   * The number of begin to render impressions delivered by the ad server including impressions recognized as spam.
   *
   * Corresponds to "Ad server unfiltered begin to render impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_UNFILTERED_BEGIN_TO_RENDER_IMPRESSIONS = 'AD_SERVER_UNFILTERED_BEGIN_TO_RENDER_IMPRESSIONS',
  /**
   * The number of clicks delivered by the ad server including clicks recognized as spam.
   *
   * Corresponds to "Ad server unfiltered clicks" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_UNFILTERED_CLICKS = 'AD_SERVER_UNFILTERED_CLICKS',
  /**
   * The number of impressions an AdSense ad delivered for line item-level dynamic allocation.
   *
   * Corresponds to "AdSense impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_LINE_ITEM_LEVEL_IMPRESSIONS = 'ADSENSE_LINE_ITEM_LEVEL_IMPRESSIONS',
  /**
   * The number of impressions an AdSense ad delivered for line item-level dynamic allocation by explicit custom criteria targeting.
   *
   * This metric is deprecated.
   *
   * Corresponds to "AdSense targeted impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_LINE_ITEM_LEVEL_TARGETED_IMPRESSIONS = 'ADSENSE_LINE_ITEM_LEVEL_TARGETED_IMPRESSIONS',
  /**
   * The number of clicks an AdSense ad delivered for line item-level dynamic allocation.
   *
   * Corresponds to "AdSense clicks" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_LINE_ITEM_LEVEL_CLICKS = 'ADSENSE_LINE_ITEM_LEVEL_CLICKS',
  /**
   * The number of clicks an AdSense ad delivered for line item-level dynamic allocation by explicit custom criteria targeting.
   *
   * This metric is deprecated.
   *
   * Corresponds to "AdSense targeted clicks" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_LINE_ITEM_LEVEL_TARGETED_CLICKS = 'ADSENSE_LINE_ITEM_LEVEL_TARGETED_CLICKS',
  /**
   * The ratio of clicks an AdSense reservation ad delivered to the number of impressions it delivered, including line item-level dynamic allocation.
   *
   * Corresponds to "AdSense CTR" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_LINE_ITEM_LEVEL_CTR = 'ADSENSE_LINE_ITEM_LEVEL_CTR',
  /**
   * Revenue generated from AdSense ads delivered for line item-level dynamic allocation.
   *
   * Corresponds to "AdSense revenue" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_LINE_ITEM_LEVEL_REVENUE = 'ADSENSE_LINE_ITEM_LEVEL_REVENUE',
  /**
   * The average estimated cost-per-thousand-impressions earned from the ads delivered by AdSense for line item-level dynamic allocation.
   *
   * Corresponds to "AdSense average eCPM" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_LINE_ITEM_LEVEL_AVERAGE_ECPM = 'ADSENSE_LINE_ITEM_LEVEL_AVERAGE_ECPM',
  /**
   * The ratio of the number of impressions delivered by AdSense reservation ads to the total impressions delivered for line item-level dynamic allocation. Represented as a percentage.
   *
   * Corresponds to "AdSense impressions (%)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_LINE_ITEM_LEVEL_PERCENT_IMPRESSIONS = 'ADSENSE_LINE_ITEM_LEVEL_PERCENT_IMPRESSIONS',
  /**
   * The ratio of the number of clicks delivered by AdSense reservation ads to the total clicks delivered for line item-level dynamic allocation. Represented as a percentage.
   *
   * Corresponds to "AdSense clicks (%)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_LINE_ITEM_LEVEL_PERCENT_CLICKS = 'ADSENSE_LINE_ITEM_LEVEL_PERCENT_CLICKS',
  /**
   * The ratio of revenue to the total revenue earned from the CPM and CPC ads delivered by AdSense for line item-level dynamic allocation. Represented as a percentage.
   *
   * Corresponds to "AdSense revenue (%)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_LINE_ITEM_LEVEL_WITHOUT_CPD_PERCENT_REVENUE = 'ADSENSE_LINE_ITEM_LEVEL_WITHOUT_CPD_PERCENT_REVENUE',
  /**
   * The ratio of revenue to the total revenue earned from all ads delivered by AdSense for line item-level dynamic allocation. Represented as a percentage.
   */
  ADSENSE_LINE_ITEM_LEVEL_WITH_CPD_PERCENT_REVENUE = 'ADSENSE_LINE_ITEM_LEVEL_WITH_CPD_PERCENT_REVENUE',
  /**
   * The number of impressions an Ad Exchange ad delivered for line item-level dynamic allocation.
   *
   * Corresponds to "Ad Exchange impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_LINE_ITEM_LEVEL_IMPRESSIONS = 'AD_EXCHANGE_LINE_ITEM_LEVEL_IMPRESSIONS',
  /**
   * The number of bids associated with the selected dimensions.
   *
   * Corresponds to "Bids" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  BID_COUNT = 'BID_COUNT',
  /**
   * The average CPM associated with these bids.
   *
   * Corresponds to "Average bid CPM" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  BID_AVERAGE_CPM = 'BID_AVERAGE_CPM',
  /**
   * Number of times a yield partner is asked to return bid to fill a yield group request.
   *
   * Only applies to Open Bidding; not Mediation.
   *
   * This data is available for 45 days after the event.
   *
   * Corresponds to "Yield group callouts" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  YIELD_GROUP_CALLOUTS = 'YIELD_GROUP_CALLOUTS',
  /**
   * Number of times a yield group buyer successfully returned a bid in response to a yield group callout, even if that response is "no bids."
   *
   * Only applies to Open Bidding; not Mediation.
   *
   * This data is available for 45 days after the event.
   *
   * Corresponds to "Yield group successful responses" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  YIELD_GROUP_SUCCESSFUL_RESPONSES = 'YIELD_GROUP_SUCCESSFUL_RESPONSES',
  /**
   * Number of bids received from Open Bidding buyers, regardless of whether the returned bid competes in an auction. This number might be greater than Yield group callouts because a buyer can return multiple bids.
   *
   * Only applies to Open Bidding; not Mediation.
   *
   * This data is available for 45 days after the event.
   *
   * Corresponds to "Yield group bids" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  YIELD_GROUP_BIDS = 'YIELD_GROUP_BIDS',
  /**
   * Number of bids received from Open Bidding buyers that competed in the auction.
   *
   * Some bids may be filtered out before the auction runs if the bidder's response omits required fields or contains a creative that violates Google's policies. Learn more about policies and enforcement.
   *
   * Only applies to Open Bidding; not Mediation.
   *
   * This data is available for 45 days after the event.
   *
   * Corresponds to "Yield group bids in auction" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  YIELD_GROUP_BIDS_IN_AUCTION = 'YIELD_GROUP_BIDS_IN_AUCTION',
  /**
   * Number of winning bids received from Open Bidding buyers, even when the winning bid is placed at the end of a mediation for mobile apps chain.
   *
   * Only applies to Open Bidding; not Mediation.
   *
   * This data is available for 45 days after the event.
   *
   * Corresponds to "Yield group auctions won" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  YIELD_GROUP_AUCTIONS_WON = 'YIELD_GROUP_AUCTIONS_WON',
  /**
   * Number of bid requests sent for each deal.
   *
   * Must be broken down by `PROGRAMMATIC_DEAL_ID` or `PROGRAMMATIC_DEAL_NAME`.
   *
   * Not tracked for Programmatic Guaranteed deals (will show zero on those rows).
   *
   * Corresponds to "Deals bid requests" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  DEALS_BID_REQUESTS = 'DEALS_BID_REQUESTS',
  /**
   * Number of bids placed on each deal.
   *
   * Not tracked for Programmatic Guaranteed deals (will show zero on those rows).
   *
   * Corresponds to "Deals bids" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  DEALS_BIDS = 'DEALS_BIDS',
  /**
   * Bid rate for each deal.
   *
   * Must be broken down by `PROGRAMMATIC_DEAL_ID` or `PROGRAMMATIC_DEAL_NAME`.
   *
   * Not tracked for Programmatic Guaranteed deals (will show N/A on those rows).
   *
   * Corresponds to "Deals bid rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  DEALS_BID_RATE = 'DEALS_BID_RATE',
  /**
   * Number of winning bids for each deal.
   *
   * Not tracked for Programmatic Guaranteed deals (will show zero on those rows).
   *
   * Corresponds to "Deals winning bids" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  DEALS_WINNING_BIDS = 'DEALS_WINNING_BIDS',
  /**
   * Win rate for each deal.
   *
   * Not tracked for Programmatic Guaranteed deals (will show N/A on those rows).
   *
   * Corresponds to "Deals win rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  DEALS_WIN_RATE = 'DEALS_WIN_RATE',
  /**
   * Number of matched yield group requests where a yield partner delivered their ad to publisher inventory.
   *
   * Corresponds to "Yield group impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  YIELD_GROUP_IMPRESSIONS = 'YIELD_GROUP_IMPRESSIONS',
  /**
   * Total net revenue earned by a yield group, based upon the yield group estimated CPM and yield group impressions recorded. This revenue already excludes Google revenue share.
   *
   * Corresponds to "Yield group estimated revenue" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  YIELD_GROUP_ESTIMATED_REVENUE = 'YIELD_GROUP_ESTIMATED_REVENUE',
  /**
   * The estimated net rate for yield groups or individual yield group partners.
   *
   * Corresponds to "Yield group estimated CPM" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  YIELD_GROUP_ESTIMATED_CPM = 'YIELD_GROUP_ESTIMATED_CPM',
  /**
   * Yield group Mediation fill rate indicating how often a network fills an ad request.
   *
   * Corresponds to "Mediation fill rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  YIELD_GROUP_MEDIATION_FILL_RATE = 'YIELD_GROUP_MEDIATION_FILL_RATE',
  /**
   * Passbacks are counted when an ad network is given a chance to serve but does not deliver an impression, and Ad Manager Mediation moves on to the next ad network in the mediation chain.
   *
   * Passbacks are not currently counted for the "Ad server" demand channel.
   *
   * Corresponds to "Mediation passbacks" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  YIELD_GROUP_MEDIATION_PASSBACKS = 'YIELD_GROUP_MEDIATION_PASSBACKS',
  /**
   * Revenue per thousand impressions based on data collected by Ad Manager from third-party ad network reports. Displays zero if data collection is not enabled.
   *
   * Corresponds to "Mediation third-party eCPM" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  YIELD_GROUP_MEDIATION_THIRD_PARTY_ECPM = 'YIELD_GROUP_MEDIATION_THIRD_PARTY_ECPM',
  /**
   * Total requests where a Mediation chain was served, even if none of the ad networks delivered an impression.
   *
   * Corresponds to "Mediation chains served" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  YIELD_GROUP_MEDIATION_CHAINS_SERVED = 'YIELD_GROUP_MEDIATION_CHAINS_SERVED',
  /**
   * Mediation third-party average cost-per-thousand-impressions.
   *
   * Compatible with the "Historical" report type.
   */
  MEDIATION_THIRD_PARTY_ECPM = 'MEDIATION_THIRD_PARTY_ECPM',
  /**
   * The number of impressions an Ad Exchange ad delivered for line item-level dynamic allocation by explicit custom criteria targeting.
   *
   * This metric is deprecated.
   *
   * Corresponds to "Ad Exchange targeted impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_LINE_ITEM_LEVEL_TARGETED_IMPRESSIONS = 'AD_EXCHANGE_LINE_ITEM_LEVEL_TARGETED_IMPRESSIONS',
  /**
   * The number of clicks an Ad Exchange ad delivered for line item-level dynamic allocation.
   *
   * Corresponds to "Ad Exchange clicks" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_LINE_ITEM_LEVEL_CLICKS = 'AD_EXCHANGE_LINE_ITEM_LEVEL_CLICKS',
  /**
   * The number of clicks an Ad Exchange ad delivered for line item-level dynamic allocation by explicit custom criteria targeting.
   *
   * This metric is deprecated.
   *
   * Corresponds to "Ad Exchange targeted clicks" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_LINE_ITEM_LEVEL_TARGETED_CLICKS = 'AD_EXCHANGE_LINE_ITEM_LEVEL_TARGETED_CLICKS',
  /**
   * The ratio of clicks an Ad Exchange ad delivered to the number of impressions it delivered for line item-level dynamic allocation.
   *
   * Corresponds to "Ad Exchange CTR" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_LINE_ITEM_LEVEL_CTR = 'AD_EXCHANGE_LINE_ITEM_LEVEL_CTR',
  /**
   * The ratio of the number of impressions delivered to the total impressions delivered by Ad Exchange for line item-level dynamic allocation. Represented as a percentage.
   *
   * Corresponds to "Ad Exchange impressions (%)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_LINE_ITEM_LEVEL_PERCENT_IMPRESSIONS = 'AD_EXCHANGE_LINE_ITEM_LEVEL_PERCENT_IMPRESSIONS',
  /**
   * The ratio of the number of clicks delivered to the total clicks delivered by Ad Exchange for line item-level dynamic allocation. Represented as a percentage.
   *
   * Corresponds to "Ad Exchange clicks (%)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_LINE_ITEM_LEVEL_PERCENT_CLICKS = 'AD_EXCHANGE_LINE_ITEM_LEVEL_PERCENT_CLICKS',
  /**
   * Revenue generated from Ad Exchange ads delivered for line item-level dynamic allocation. Represented in publisher currency and time zone.
   *
   * Corresponds to "Ad Exchange revenue" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_LINE_ITEM_LEVEL_REVENUE = 'AD_EXCHANGE_LINE_ITEM_LEVEL_REVENUE',
  /**
   * The ratio of revenue generated by Ad Exchange to the total revenue earned by CPM and CPC ads delivered for line item-level dynamic allocation. Represented as a percentage.
   *
   * Corresponds to "Ad Exchange revenue (%)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_LINE_ITEM_LEVEL_WITHOUT_CPD_PERCENT_REVENUE = 'AD_EXCHANGE_LINE_ITEM_LEVEL_WITHOUT_CPD_PERCENT_REVENUE',
  /**
   * The ratio of revenue generated by Ad Exchange to the total revenue earned by CPM, CPC and CPD ads delivered for line item-level dynamic allocation. Represented as a percentage.
   */
  AD_EXCHANGE_LINE_ITEM_LEVEL_WITH_CPD_PERCENT_REVENUE = 'AD_EXCHANGE_LINE_ITEM_LEVEL_WITH_CPD_PERCENT_REVENUE',
  /**
   * The average estimated cost-per-thousand-impressions earned from the delivery of Ad Exchange ads for line item-level dynamic allocation.
   *
   * Corresponds to "Ad Exchange average eCPM" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_LINE_ITEM_LEVEL_AVERAGE_ECPM = 'AD_EXCHANGE_LINE_ITEM_LEVEL_AVERAGE_ECPM',
  /**
   * The total number of impressions delivered including line item-level dynamic allocation.
   *
   * Corresponds to "Total impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_LINE_ITEM_LEVEL_IMPRESSIONS = 'TOTAL_LINE_ITEM_LEVEL_IMPRESSIONS',
  /**
   * The total number of impressions delivered including line item-level dynamic allocation by explicit custom criteria targeting.
   *
   * Corresponds to "Total targeted impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_LINE_ITEM_LEVEL_TARGETED_IMPRESSIONS = 'TOTAL_LINE_ITEM_LEVEL_TARGETED_IMPRESSIONS',
  /**
   * The total number of clicks delivered including line item-level dynamic allocation.
   *
   * Corresponds to "Total clicks" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_LINE_ITEM_LEVEL_CLICKS = 'TOTAL_LINE_ITEM_LEVEL_CLICKS',
  /**
   * The total number of clicks delivered including line item-level dynamic allocation by explicit custom criteria targeting
   *
   * Corresponds to "Total targeted clicks" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_LINE_ITEM_LEVEL_TARGETED_CLICKS = 'TOTAL_LINE_ITEM_LEVEL_TARGETED_CLICKS',
  /**
   * The ratio of total clicks on ads delivered by the ad servers to the total number of impressions delivered for an ad including line item-level dynamic allocation.
   *
   * Corresponds to "Total CTR" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_LINE_ITEM_LEVEL_CTR = 'TOTAL_LINE_ITEM_LEVEL_CTR',
  /**
   * The total CPM and CPC revenue generated by the ad servers including line item-level dynamic allocation.
   *
   * Corresponds to "Total CPM and CPC revenue" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_LINE_ITEM_LEVEL_CPM_AND_CPC_REVENUE = 'TOTAL_LINE_ITEM_LEVEL_CPM_AND_CPC_REVENUE',
  /**
   * The total CPM, CPC and CPD revenue generated by the ad servers including line item-level dynamic allocation.
   *
   * Corresponds to "Total revenue" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_LINE_ITEM_LEVEL_ALL_REVENUE = 'TOTAL_LINE_ITEM_LEVEL_ALL_REVENUE',
  /**
   * Estimated cost-per-thousand-impressions (eCPM) of CPM and CPC ads delivered by the ad servers including line item-level dynamic allocation.
   *
   * Corresponds to "Total average eCPM" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_LINE_ITEM_LEVEL_WITHOUT_CPD_AVERAGE_ECPM = 'TOTAL_LINE_ITEM_LEVEL_WITHOUT_CPD_AVERAGE_ECPM',
  /**
   * Estimated cost-per-thousand-impressions (eCPM) of CPM, CPC and CPD ads delivered by the ad servers including line item-level dynamic allocation.
   */
  TOTAL_LINE_ITEM_LEVEL_WITH_CPD_AVERAGE_ECPM = 'TOTAL_LINE_ITEM_LEVEL_WITH_CPD_AVERAGE_ECPM',
  /**
   * The total number of times that the code for an ad is served by the ad server including inventory-level dynamic allocation.
   *
   * Corresponds to "Total code served count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_CODE_SERVED_COUNT = 'TOTAL_CODE_SERVED_COUNT',
  /**
   * The total number of times that an ad request is sent to the ad server including dynamic allocation.
   *
   * Corresponds to "Total ad requests" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_AD_REQUESTS = 'TOTAL_AD_REQUESTS',
  /**
   * The total number of times that an ad is served by the ad server including dynamic allocation.
   *
   * Corresponds to "Total responses served" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_RESPONSES_SERVED = 'TOTAL_RESPONSES_SERVED',
  /**
   * The total number of times that an ad is not returned by the ad server.
   *
   * Corresponds to "Total unmatched ad requests" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_UNMATCHED_AD_REQUESTS = 'TOTAL_UNMATCHED_AD_REQUESTS',
  /**
   * The fill rate indicating how often an ad request is filled by the ad server including dynamic allocation.
   *
   * Corresponds to "Total fill rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_FILL_RATE = 'TOTAL_FILL_RATE',
  /**
   * The total number of times that an ad is served by the ad server.
   *
   * Corresponds to "Ad server responses served" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_RESPONSES_SERVED = 'AD_SERVER_RESPONSES_SERVED',
  /**
   * The total number of times that an AdSense ad is delivered.
   *
   * Corresponds to "AdSense responses served" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_RESPONSES_SERVED = 'ADSENSE_RESPONSES_SERVED',
  /**
   * The total number of times that an Ad Exchange ad is delivered.
   *
   * Corresponds to "Ad Exchange responses served" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_RESPONSES_SERVED = 'AD_EXCHANGE_RESPONSES_SERVED',
  /**
   * Total number of ad responses served from programmatic demand sources. Includes Ad Exchange, Open Bidding, and Preferred Deals.
   *
   * Differs from Ad Exchange responses served, which doesn't include Open Bidding matched ad requests.
   *
   * Corresponds to "Programmatic responses served" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  PROGRAMMATIC_RESPONSES_SERVED = 'PROGRAMMATIC_RESPONSES_SERVED',
  /**
   * The number of programmatic responses served divided by the number of requests eligible for programmatic. Includes Ad Exchange, Open Bidding, and Preferred Deals.
   *
   * Corresponds to "Programmatic match rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  PROGRAMMATIC_MATCH_RATE = 'PROGRAMMATIC_MATCH_RATE',
  /**
   * The total number of ad requests eligible for programmatic inventory, including Programmatic Guaranteed, Preferred Deals, backfill, and open auction.
   *
   * For optimized pods, this metric will count a single opportunity when the pod doesn't fill with programmatic demand. When it does fill, it will count each matched query.
   *
   * Corresponds to "Programmatic eligible ad requests" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_PROGRAMMATIC_ELIGIBLE_AD_REQUESTS = 'TOTAL_PROGRAMMATIC_ELIGIBLE_AD_REQUESTS',
  /**
   * The total number of video opportunities.
   *
   * Corresponds to "True opportunities" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_VIDEO_OPPORTUNITIES = 'TOTAL_VIDEO_OPPORTUNITIES',
  /**
   * The total number of video capped opportunities.
   *
   * Corresponds to "Capped opportunities" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_VIDEO_CAPPED_OPPORTUNITIES = 'TOTAL_VIDEO_CAPPED_OPPORTUNITIES',
  /**
   * The total number of video matched opportunities.
   *
   * Corresponds to "Matched opportunities" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_VIDEO_MATCHED_OPPORTUNITIES = 'TOTAL_VIDEO_MATCHED_OPPORTUNITIES',
  /**
   * The total filled duration in ad breaks.
   *
   * Corresponds to "Matched duration (seconds)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_VIDEO_MATCHED_DURATION = 'TOTAL_VIDEO_MATCHED_DURATION',
  /**
   * The total duration in ad breaks.
   *
   * Corresponds to "Total duration (seconds)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_VIDEO_DURATION = 'TOTAL_VIDEO_DURATION',
  /**
   * The total number of break starts.
   *
   * Corresponds to "Break start" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_VIDEO_BREAK_START = 'TOTAL_VIDEO_BREAK_START',
  /**
   * The total number of break ends.
   *
   * Corresponds to "Break end" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_VIDEO_BREAK_END = 'TOTAL_VIDEO_BREAK_END',
  /**
   * The total number of missed impressions due to the ad servers' inability to find ads to serve, including inventory-level dynamic allocation.
   *
   * Corresponds to "Unfilled impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_INVENTORY_LEVEL_UNFILLED_IMPRESSIONS = 'TOTAL_INVENTORY_LEVEL_UNFILLED_IMPRESSIONS',
  /**
   * Corresponds to "Average impressions/unique visitor" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  UNIQUE_REACH_FREQUENCY = 'UNIQUE_REACH_FREQUENCY',
  /**
   * Corresponds to "Total reach impressions" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  UNIQUE_REACH_IMPRESSIONS = 'UNIQUE_REACH_IMPRESSIONS',
  /**
   * Corresponds to "Total unique visitors" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  UNIQUE_REACH = 'UNIQUE_REACH',
  /**
   * The number of impressions for a particular SDK mediation creative.
   *
   * Corresponds to "SDK mediation creative impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  SDK_MEDIATION_CREATIVE_IMPRESSIONS = 'SDK_MEDIATION_CREATIVE_IMPRESSIONS',
  /**
   * The number of clicks for a particular SDK mediation creative.
   *
   * Corresponds to "SDK mediation creative clicks" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  SDK_MEDIATION_CREATIVE_CLICKS = 'SDK_MEDIATION_CREATIVE_CLICKS',
  /**
   * The number of forecasted impressions for future sell-through reports.
   *
   * This metric is available for the next 90 days with a daily break down and for the next 12 months with a monthly break down.
   *
   * Corresponds to "Forecasted impressions" in the Ad Manager UI. Compatible with the "Future sell-through" report type.
   */
  SELL_THROUGH_FORECASTED_IMPRESSIONS = 'SELL_THROUGH_FORECASTED_IMPRESSIONS',
  /**
   * The number of partner-sold impressions served to the YouTube partner ad inventory.
   *
   * Corresponds to "Partner-sold impressions" in the Ad Manager UI. Compatible with the "YouTube consolidated" report type.
   */
  PARTNER_SALES_PARTNER_IMPRESSIONS = 'PARTNER_SALES_PARTNER_IMPRESSIONS',
  /**
   * The number of times the ad server responded to a request for the YouTube partner ad inventory.
   *
   * Corresponds to "Partner-sold code served count" in the Ad Manager UI. Compatible with the "YouTube consolidated" report type.
   */
  PARTNER_SALES_PARTNER_CODE_SERVED = 'PARTNER_SALES_PARTNER_CODE_SERVED',
  /**
   * The number of Google-sold impressions served to the YouTube partner ad inventory.
   *
   * Corresponds to "Google-sold impressions" in the Ad Manager UI. Compatible with the "YouTube consolidated" report type.
   */
  PARTNER_SALES_GOOGLE_IMPRESSIONS = 'PARTNER_SALES_GOOGLE_IMPRESSIONS',
  /**
   * The number of Google-sold reservation impressions served to the YouTube partner ad inventory.
   *
   * Corresponds to "Google-sold reservation impressions" in the Ad Manager UI. Compatible with the "YouTube consolidated" report type.
   */
  PARTNER_SALES_GOOGLE_RESERVATION_IMPRESSIONS = 'PARTNER_SALES_GOOGLE_RESERVATION_IMPRESSIONS',
  /**
   * The number of Google-sold auction impressions served to the YouTube partner ad inventory.
   *
   * Corresponds to "Google-sold auction impressions" in the Ad Manager UI. Compatible with the "YouTube consolidated" report type.
   */
  PARTNER_SALES_GOOGLE_AUCTION_IMPRESSIONS = 'PARTNER_SALES_GOOGLE_AUCTION_IMPRESSIONS',
  /**
   * The total number of ad requests that were eligible to serve to the YouTube partner ad inventory.
   *
   * Corresponds to "Total ad requests" in the Ad Manager UI. Compatible with the "YouTube consolidated" report type.
   */
  PARTNER_SALES_QUERIES = 'PARTNER_SALES_QUERIES',
  /**
   * The number of ad requests for the YouTube partner ad inventory that were filled with at least 1 ad. This includes both partner-sold and Google-sold requests.
   *
   * Google-sold can fill at most 2 ads, while partner-sold can fill at most 1 ad.
   *
   * Corresponds to "Filled ad requests" in the Ad Manager UI. Compatible with the "YouTube consolidated" report type.
   */
  PARTNER_SALES_FILLED_QUERIES = 'PARTNER_SALES_FILLED_QUERIES',
  /**
   * The fill rate percentage of filled requests to total ad requests.
   *
   * Corresponds to "Fill rate" in the Ad Manager UI. Compatible with the "YouTube consolidated" report type.
   */
  PARTNER_SALES_SELL_THROUGH_RATE = 'PARTNER_SALES_SELL_THROUGH_RATE',
  /**
   * The number of available impressions for future sell-through reports.
   *
   * This metric is available for the next 90 days with a daily break down and for the next 12 months with a monthly break down.
   *
   * Corresponds to "Available impressions" in the Ad Manager UI. Compatible with the "Future sell-through" report type.
   */
  SELL_THROUGH_AVAILABLE_IMPRESSIONS = 'SELL_THROUGH_AVAILABLE_IMPRESSIONS',
  /**
   * The number of reserved impressions for future sell-through reports.
   *
   * This metric is available for the next 90 days with a daily break down and for the next 12 months with a monthly break down.
   *
   * Corresponds to "Reserved impressions" in the Ad Manager UI. Compatible with the "Future sell-through" report type.
   */
  SELL_THROUGH_RESERVED_IMPRESSIONS = 'SELL_THROUGH_RESERVED_IMPRESSIONS',
  /**
   * The sell-through rate for impressions for future sell-through reports.
   *
   * This metric is available for the next 90 days with a daily break down and for the next 12 months with a monthly break down.
   *
   * Corresponds to "Sell-through rate" in the Ad Manager UI. Compatible with the "Future sell-through" report type.
   */
  SELL_THROUGH_SELL_THROUGH_RATE = 'SELL_THROUGH_SELL_THROUGH_RATE',
  /**
   * The total number of times a backup image is served in place of a rich media ad.
   *
   * Corresponds to "Backup image impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_BACKUP_IMAGES = 'RICH_MEDIA_BACKUP_IMAGES',
  /**
   * The amount of time(seconds) that each rich media ad is displayed to users.
   *
   * Corresponds to "Total display time" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_DISPLAY_TIME = 'RICH_MEDIA_DISPLAY_TIME',
  /**
   * The average amount of time(seconds) that each rich media ad is displayed to users.
   *
   * Corresponds to "Average display time" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_AVERAGE_DISPLAY_TIME = 'RICH_MEDIA_AVERAGE_DISPLAY_TIME',
  /**
   * The number of times an expanding ad was expanded.
   *
   * Corresponds to "Total expansions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_EXPANSIONS = 'RICH_MEDIA_EXPANSIONS',
  /**
   * The average amount of time(seconds) that an expanding ad is viewed in an expanded state.
   *
   * Corresponds to "Average expanding time" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_EXPANDING_TIME = 'RICH_MEDIA_EXPANDING_TIME',
  /**
   * The average amount of time(seconds) that a user interacts with a rich media ad.
   *
   * Corresponds to "Interaction time" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_INTERACTION_TIME = 'RICH_MEDIA_INTERACTION_TIME',
  /**
   * The number of times that a user interacts with a rich media ad.
   *
   * Corresponds to "Total interactions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_INTERACTION_COUNT = 'RICH_MEDIA_INTERACTION_COUNT',
  /**
   * The ratio of rich media ad interactions to the number of times the ad was displayed. Represented as a percentage.
   *
   * Corresponds to "Interaction rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_INTERACTION_RATE = 'RICH_MEDIA_INTERACTION_RATE',
  /**
   * The average amount of time(seconds) that a user interacts with a rich media ad.
   *
   * Corresponds to "Average interaction time" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_AVERAGE_INTERACTION_TIME = 'RICH_MEDIA_AVERAGE_INTERACTION_TIME',
  /**
   * The number of impressions where a user interacted with a rich media ad.
   *
   * Corresponds to "Interactive impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_INTERACTION_IMPRESSIONS = 'RICH_MEDIA_INTERACTION_IMPRESSIONS',
  /**
   * The number of times that a user manually closes a floating, expanding, in-page with overlay, or in-page with floating ad.
   *
   * Corresponds to "Manual closes" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_MANUAL_CLOSES = 'RICH_MEDIA_MANUAL_CLOSES',
  /**
   * A metric that measures an impression only once when a user opens an ad in full screen mode.
   *
   * Corresponds to "Full-screen impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_FULL_SCREEN_IMPRESSIONS = 'RICH_MEDIA_FULL_SCREEN_IMPRESSIONS',
  /**
   * The number of times a user clicked on the graphical controls of a video player.
   *
   * Corresponds to "Total video interactions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_VIDEO_INTERACTIONS = 'RICH_MEDIA_VIDEO_INTERACTIONS',
  /**
   * The ratio of video interactions to video plays. Represented as a percentage.
   *
   * Corresponds to "Video interaction rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_VIDEO_INTERACTION_RATE = 'RICH_MEDIA_VIDEO_INTERACTION_RATE',
  /**
   * The number of times a rich media video was muted.
   *
   * Corresponds to "Mute" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_VIDEO_MUTES = 'RICH_MEDIA_VIDEO_MUTES',
  /**
   * The number of times a rich media video was paused.
   *
   * Corresponds to "Pause" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_VIDEO_PAUSES = 'RICH_MEDIA_VIDEO_PAUSES',
  /**
   * The number of times a rich media video was played.
   *
   * Corresponds to "Plays" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_VIDEO_PLAYES = 'RICH_MEDIA_VIDEO_PLAYES',
  /**
   * The number of times a rich media video was played up to midpoint.
   *
   * Corresponds to "Midpoint" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_VIDEO_MIDPOINTS = 'RICH_MEDIA_VIDEO_MIDPOINTS',
  /**
   * The number of times a rich media video was fully played.
   *
   * Corresponds to "Complete" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_VIDEO_COMPLETES = 'RICH_MEDIA_VIDEO_COMPLETES',
  /**
   * The number of times a rich media video was restarted.
   *
   * Corresponds to "Replays" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_VIDEO_REPLAYS = 'RICH_MEDIA_VIDEO_REPLAYS',
  /**
   * The number of times a rich media video was stopped.
   *
   * Corresponds to "Stops" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_VIDEO_STOPS = 'RICH_MEDIA_VIDEO_STOPS',
  /**
   * The number of times a rich media video was unmuted.
   *
   * Corresponds to "Unmute" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_VIDEO_UNMUTES = 'RICH_MEDIA_VIDEO_UNMUTES',
  /**
   * The average amount of time(seconds) that a rich media video was viewed per view.
   *
   * Corresponds to "Average view time" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_VIDEO_VIEW_TIME = 'RICH_MEDIA_VIDEO_VIEW_TIME',
  /**
   * The percentage of a video watched by a user.
   *
   * Corresponds to "View rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_VIDEO_VIEW_RATE = 'RICH_MEDIA_VIDEO_VIEW_RATE',
  /**
   * The amount of time (seconds) that a user interacts with a rich media ad.
   *
   * Corresponds to "Custom event - time" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_CUSTOM_EVENT_TIME = 'RICH_MEDIA_CUSTOM_EVENT_TIME',
  /**
   * The number of times a user views and interacts with a specified part of a rich media ad.
   *
   * Corresponds to "Custom event - count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  RICH_MEDIA_CUSTOM_EVENT_COUNT = 'RICH_MEDIA_CUSTOM_EVENT_COUNT',
  /**
   * The number of impressions where the video was played.
   *
   * Corresponds to "Start" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_START = 'VIDEO_VIEWERSHIP_START',
  /**
   * The number of times the video played to 25% of its length.
   *
   * Corresponds to "First quartile" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_FIRST_QUARTILE = 'VIDEO_VIEWERSHIP_FIRST_QUARTILE',
  /**
   * The number of times the video reached its midpoint during play.
   *
   * Corresponds to "Midpoint" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_MIDPOINT = 'VIDEO_VIEWERSHIP_MIDPOINT',
  /**
   * The number of times the video played to 75% of its length.
   *
   * Corresponds to "Third quartile" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_THIRD_QUARTILE = 'VIDEO_VIEWERSHIP_THIRD_QUARTILE',
  /**
   * The number of times the video played to completion.
   *
   * Corresponds to "Complete" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_COMPLETE = 'VIDEO_VIEWERSHIP_COMPLETE',
  /**
   * Average percentage of the video watched by users.
   *
   * Corresponds to "Average view rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_AVERAGE_VIEW_RATE = 'VIDEO_VIEWERSHIP_AVERAGE_VIEW_RATE',
  /**
   * Average time(seconds) users watched the video.
   *
   * Corresponds to "Average view time" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_AVERAGE_VIEW_TIME = 'VIDEO_VIEWERSHIP_AVERAGE_VIEW_TIME',
  /**
   * Percentage of times the video played to the end.
   *
   * Corresponds to "Completion rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_COMPLETION_RATE = 'VIDEO_VIEWERSHIP_COMPLETION_RATE',
  /**
   * The number of times an error occurred, such as a VAST redirect error, a video playback error, or an invalid response error.
   *
   * Corresponds to "Total error count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_TOTAL_ERROR_COUNT = 'VIDEO_VIEWERSHIP_TOTAL_ERROR_COUNT',
  /**
   * Duration of the video creative.
   *
   * Corresponds to "Video length" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_VIDEO_LENGTH = 'VIDEO_VIEWERSHIP_VIDEO_LENGTH',
  /**
   * The number of times a skip button is shown in video.
   *
   * Corresponds to "Skip button shown" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_SKIP_BUTTON_SHOWN = 'VIDEO_VIEWERSHIP_SKIP_BUTTON_SHOWN',
  /**
   * The number of engaged views i.e. ad is viewed to completion or for 30s, whichever comes first.
   *
   * Corresponds to "Engaged view" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_ENGAGED_VIEW = 'VIDEO_VIEWERSHIP_ENGAGED_VIEW',
  /**
   * View-through rate represented as a percentage.
   *
   * Corresponds to "View-through rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_VIEW_THROUGH_RATE = 'VIDEO_VIEWERSHIP_VIEW_THROUGH_RATE',
  /**
   * Number of times that the publisher specified a video ad played automatically.
   *
   * Corresponds to "Auto-plays" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_AUTO_PLAYS = 'VIDEO_VIEWERSHIP_AUTO_PLAYS',
  /**
   * Number of times that the publisher specified a video ad was clicked to play.
   *
   * Corresponds to "Click-to-plays" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_CLICK_TO_PLAYS = 'VIDEO_VIEWERSHIP_CLICK_TO_PLAYS',
  /**
   * Error rate is the percentage of video error count from (error count + total impressions).
   *
   * Corresponds to "Total error rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_VIEWERSHIP_TOTAL_ERROR_RATE = 'VIDEO_VIEWERSHIP_TOTAL_ERROR_RATE',
  /**
   * The drop-off rate.
   *
   * Corresponds to "Drop-off rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  DROPOFF_RATE = 'DROPOFF_RATE',
  /**
   * Number of times a video ad has been viewed to completion or watched to 30 seconds, whichever happens first.
   *
   * Corresponds to "TrueView views" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_TRUEVIEW_VIEWS = 'VIDEO_TRUEVIEW_VIEWS',
  /**
   * Percentage of times a user clicked Skip.
   *
   * Corresponds to "TrueView skip rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_TRUEVIEW_SKIP_RATE = 'VIDEO_TRUEVIEW_SKIP_RATE',
  /**
   * TrueView views divided by TrueView impressions.
   *
   * Corresponds to "TrueView VTR" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_TRUEVIEW_VTR = 'VIDEO_TRUEVIEW_VTR',
  /**
   * Number of VAST video errors of type 100.
   *
   * Corresponds to "VAST error 100 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_100_COUNT = 'VIDEO_ERRORS_VAST_ERROR_100_COUNT',
  /**
   * Number of VAST video errors of type 101.
   *
   * Corresponds to "VAST error 101 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_101_COUNT = 'VIDEO_ERRORS_VAST_ERROR_101_COUNT',
  /**
   * Number of VAST video errors of type 102.
   *
   * Corresponds to "VAST error 102 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_102_COUNT = 'VIDEO_ERRORS_VAST_ERROR_102_COUNT',
  /**
   * Number of VAST video errors of type 200.
   *
   * Corresponds to "VAST error 200 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_200_COUNT = 'VIDEO_ERRORS_VAST_ERROR_200_COUNT',
  /**
   * Number of VAST video errors of type 201.
   *
   * Corresponds to "VAST error 201 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_201_COUNT = 'VIDEO_ERRORS_VAST_ERROR_201_COUNT',
  /**
   * Number of VAST video errors of type 202.
   *
   * Corresponds to "VAST error 202 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_202_COUNT = 'VIDEO_ERRORS_VAST_ERROR_202_COUNT',
  /**
   * Number of VAST video errors of type 203.
   *
   * Corresponds to "VAST error 203 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_203_COUNT = 'VIDEO_ERRORS_VAST_ERROR_203_COUNT',
  /**
   * Number of VAST video errors of type 300.
   *
   * Corresponds to "VAST error 300 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_300_COUNT = 'VIDEO_ERRORS_VAST_ERROR_300_COUNT',
  /**
   * Number of VAST video errors of type 301.
   *
   * Corresponds to "VAST error 301 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_301_COUNT = 'VIDEO_ERRORS_VAST_ERROR_301_COUNT',
  /**
   * Number of VAST video errors of type 302.
   *
   * Corresponds to "VAST error 302 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_302_COUNT = 'VIDEO_ERRORS_VAST_ERROR_302_COUNT',
  /**
   * Number of VAST video errors of type 303.
   *
   * Corresponds to "VAST error 303 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_303_COUNT = 'VIDEO_ERRORS_VAST_ERROR_303_COUNT',
  /**
   * Number of VAST video errors of type 400.
   *
   * Corresponds to "VAST error 400 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_400_COUNT = 'VIDEO_ERRORS_VAST_ERROR_400_COUNT',
  /**
   * Number of VAST video errors of type 401.
   *
   * Corresponds to "VAST error 401 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_401_COUNT = 'VIDEO_ERRORS_VAST_ERROR_401_COUNT',
  /**
   * Number of VAST video errors of type 402.
   *
   * Corresponds to "VAST error 402 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_402_COUNT = 'VIDEO_ERRORS_VAST_ERROR_402_COUNT',
  /**
   * Number of VAST video errors of type 403.
   *
   * Corresponds to "VAST error 403 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_403_COUNT = 'VIDEO_ERRORS_VAST_ERROR_403_COUNT',
  /**
   * Number of VAST video errors of type 405.
   *
   * Corresponds to "VAST error 405 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_405_COUNT = 'VIDEO_ERRORS_VAST_ERROR_405_COUNT',
  /**
   * Number of VAST video errors of type 500.
   *
   * Corresponds to "VAST error 500 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_500_COUNT = 'VIDEO_ERRORS_VAST_ERROR_500_COUNT',
  /**
   * Number of VAST video errors of type 501.
   *
   * Corresponds to "VAST error 501 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_501_COUNT = 'VIDEO_ERRORS_VAST_ERROR_501_COUNT',
  /**
   * Number of VAST video errors of type 502.
   *
   * Corresponds to "VAST error 502 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_502_COUNT = 'VIDEO_ERRORS_VAST_ERROR_502_COUNT',
  /**
   * Number of VAST video errors of type 503.
   *
   * Corresponds to "VAST error 503 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_503_COUNT = 'VIDEO_ERRORS_VAST_ERROR_503_COUNT',
  /**
   * Number of VAST video errors of type 600.
   *
   * Corresponds to "VAST error 600 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_600_COUNT = 'VIDEO_ERRORS_VAST_ERROR_600_COUNT',
  /**
   * Number of VAST video errors of type 601.
   *
   * Corresponds to "VAST error 601 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_601_COUNT = 'VIDEO_ERRORS_VAST_ERROR_601_COUNT',
  /**
   * Number of VAST video errors of type 602.
   *
   * Corresponds to "VAST error 602 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_602_COUNT = 'VIDEO_ERRORS_VAST_ERROR_602_COUNT',
  /**
   * Number of VAST video errors of type 603.
   *
   * Corresponds to "VAST error 603 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_603_COUNT = 'VIDEO_ERRORS_VAST_ERROR_603_COUNT',
  /**
   * Number of VAST video errors of type 604.
   *
   * Corresponds to "VAST error 604 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_604_COUNT = 'VIDEO_ERRORS_VAST_ERROR_604_COUNT',
  /**
   * Number of VAST video errors of type 900.
   *
   * Corresponds to "VAST error 900 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_900_COUNT = 'VIDEO_ERRORS_VAST_ERROR_900_COUNT',
  /**
   * Number of VAST video errors of type 901.
   *
   * Corresponds to "VAST error 901 count" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_ERRORS_VAST_ERROR_901_COUNT = 'VIDEO_ERRORS_VAST_ERROR_901_COUNT',
  /**
   * Video interaction event: The number of times user paused ad clip.
   *
   * Corresponds to "Pause" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_INTERACTION_PAUSE = 'VIDEO_INTERACTION_PAUSE',
  /**
   * Video interaction event: The number of times the user unpaused the video.
   *
   * Corresponds to "Resume" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_INTERACTION_RESUME = 'VIDEO_INTERACTION_RESUME',
  /**
   * Video interaction event: The number of times a user rewinds the video.
   *
   * Corresponds to "Rewind" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_INTERACTION_REWIND = 'VIDEO_INTERACTION_REWIND',
  /**
   * Video interaction event: The number of times video player was in mute state during play of ad clip.
   *
   * Corresponds to "Mute" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_INTERACTION_MUTE = 'VIDEO_INTERACTION_MUTE',
  /**
   * Video interaction event: The number of times a user unmutes the video.
   *
   * Corresponds to "Unmute" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_INTERACTION_UNMUTE = 'VIDEO_INTERACTION_UNMUTE',
  /**
   * Video interaction event: The number of times a user collapses a video, either to its original size or to a different size.
   *
   * Corresponds to "Collapse" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_INTERACTION_COLLAPSE = 'VIDEO_INTERACTION_COLLAPSE',
  /**
   * Video interaction event: The number of times a user expands a video.
   *
   * Corresponds to "Expand" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_INTERACTION_EXPAND = 'VIDEO_INTERACTION_EXPAND',
  /**
   * Video interaction event: The number of times ad clip played in full screen mode.
   *
   * Corresponds to "Full screen" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_INTERACTION_FULL_SCREEN = 'VIDEO_INTERACTION_FULL_SCREEN',
  /**
   * Video interaction event: The number of user interactions with a video, on average, such as pause, full screen, mute, etc.
   *
   * Corresponds to "Average interaction rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_INTERACTION_AVERAGE_INTERACTION_RATE = 'VIDEO_INTERACTION_AVERAGE_INTERACTION_RATE',
  /**
   * Video interaction event: The number of times a skippable video is skipped.
   *
   * Corresponds to "Video skipped" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_INTERACTION_VIDEO_SKIPS = 'VIDEO_INTERACTION_VIDEO_SKIPS',
  /**
   * The number of control starts.
   *
   * Corresponds to "Control starts" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_OPTIMIZATION_CONTROL_STARTS = 'VIDEO_OPTIMIZATION_CONTROL_STARTS',
  /**
   * The number of optimized starts.
   *
   * Corresponds to "Optimized starts" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_OPTIMIZATION_OPTIMIZED_STARTS = 'VIDEO_OPTIMIZATION_OPTIMIZED_STARTS',
  /**
   * The number of control completes.
   *
   * Corresponds to "Control completes" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_OPTIMIZATION_CONTROL_COMPLETES = 'VIDEO_OPTIMIZATION_CONTROL_COMPLETES',
  /**
   * The number of optimized completes.
   *
   * Corresponds to "Optimized completes" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_OPTIMIZATION_OPTIMIZED_COMPLETES = 'VIDEO_OPTIMIZATION_OPTIMIZED_COMPLETES',
  /**
   * The rate of control completions.
   *
   * Corresponds to "Control completion rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_OPTIMIZATION_CONTROL_COMPLETION_RATE = 'VIDEO_OPTIMIZATION_CONTROL_COMPLETION_RATE',
  /**
   * The rate of optimized completions.
   *
   * Corresponds to "Optimized completion rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_OPTIMIZATION_OPTIMIZED_COMPLETION_RATE = 'VIDEO_OPTIMIZATION_OPTIMIZED_COMPLETION_RATE',
  /**
   * The percentage by which optimized completion rate is greater than the unoptimized completion rate. This is calculated as (( `Column.VIDEO_OPTIMIZATION_OPTIMIZED_COMPLETION_RATE`/ `Column.VIDEO_OPTIMIZATION_CONTROL_COMPLETION_RATE`) - 1) * 100 for an ad for which the optimization feature has been enabled.
   *
   * Corresponds to "Completion rate lift" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_OPTIMIZATION_COMPLETION_RATE_LIFT = 'VIDEO_OPTIMIZATION_COMPLETION_RATE_LIFT',
  /**
   * The number of control skip buttons shown.
   *
   * Corresponds to "Control skip button shown" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_OPTIMIZATION_CONTROL_SKIP_BUTTON_SHOWN = 'VIDEO_OPTIMIZATION_CONTROL_SKIP_BUTTON_SHOWN',
  /**
   * The number of optimized skip buttons shown.
   *
   * Corresponds to "Optimized skip button shown" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_OPTIMIZATION_OPTIMIZED_SKIP_BUTTON_SHOWN = 'VIDEO_OPTIMIZATION_OPTIMIZED_SKIP_BUTTON_SHOWN',
  /**
   * The number of control engaged views.
   *
   * Corresponds to "Control engaged view" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_OPTIMIZATION_CONTROL_ENGAGED_VIEW = 'VIDEO_OPTIMIZATION_CONTROL_ENGAGED_VIEW',
  /**
   * The number of optimized engaged views.
   *
   * Corresponds to "Optimized engaged view" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_OPTIMIZATION_OPTIMIZED_ENGAGED_VIEW = 'VIDEO_OPTIMIZATION_OPTIMIZED_ENGAGED_VIEW',
  /**
   * The control view-through rate.
   *
   * Corresponds to "Control view-through rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_OPTIMIZATION_CONTROL_VIEW_THROUGH_RATE = 'VIDEO_OPTIMIZATION_CONTROL_VIEW_THROUGH_RATE',
  /**
   * The optimized view-through rate.
   *
   * Corresponds to "Optimized view-through rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_OPTIMIZATION_OPTIMIZED_VIEW_THROUGH_RATE = 'VIDEO_OPTIMIZATION_OPTIMIZED_VIEW_THROUGH_RATE',
  /**
   * The percentage by which optimized view-through rate is greater than the unoptimized view-through rate. This is calculated as (( `Column.VIDEO_OPTIMIZATION_OPTIMIZED_VIEW_THROUGH_RATE`/ `Column.VIDEO_OPTIMIZATION_CONTROL_VIEW_THROUGH_RATE`) - 1) * 100 for an ad for which the optimization feature has been enabled.
   *
   * Corresponds to "View-through rate lift" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  VIDEO_OPTIMIZATION_VIEW_THROUGH_RATE_LIFT = 'VIDEO_OPTIMIZATION_VIEW_THROUGH_RATE_LIFT',
  /**
   * Total impressions from the Google Ad Manager server, AdSense, Ad Exchange, and yield group partners.
   *
   * Corresponds to "Total impressions" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_IMPRESSIONS_REAL_TIME = 'VIDEO_IMPRESSIONS_REAL_TIME',
  /**
   * Total number of matched queries.
   *
   * Corresponds to "Total responses served" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_MATCHED_QUERIES_REAL_TIME = 'VIDEO_MATCHED_QUERIES_REAL_TIME',
  /**
   * Total number of unmatched queries.
   *
   * Corresponds to "Total unmatched ad requests" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_UNMATCHED_QUERIES_REAL_TIME = 'VIDEO_UNMATCHED_QUERIES_REAL_TIME',
  /**
   * Total number of ad requests.
   *
   * Corresponds to "Total ad requests" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_TOTAL_QUERIES_REAL_TIME = 'VIDEO_TOTAL_QUERIES_REAL_TIME',
  /**
   * Total number of creatives served.
   *
   * Corresponds to "Total creative serves" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_CREATIVE_SERVE_REAL_TIME = 'VIDEO_CREATIVE_SERVE_REAL_TIME',
  /**
   * Number of VAST video errors of type 100.
   *
   * Corresponds to "VAST error 100 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_100_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_100_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 101.
   *
   * Corresponds to "VAST error 101 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_101_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_101_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 102.
   *
   * Corresponds to "VAST error 102 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_102_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_102_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 200.
   *
   * Corresponds to "VAST error 200 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_200_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_200_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 201.
   *
   * Corresponds to "VAST error 201 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_201_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_201_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 202.
   *
   * Corresponds to "VAST error 202 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_202_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_202_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 203.
   *
   * Corresponds to "VAST error 203 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_203_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_203_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 300.
   *
   * Corresponds to "VAST error 300 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_300_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_300_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 301.
   *
   * Corresponds to "VAST error 301 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_301_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_301_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 302.
   *
   * Corresponds to "VAST error 302 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_302_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_302_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 303.
   *
   * Corresponds to "VAST error 303 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_303_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_303_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 400.
   *
   * Corresponds to "VAST error 400 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_400_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_400_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 401.
   *
   * Corresponds to "VAST error 401 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_401_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_401_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 402.
   *
   * Corresponds to "VAST error 402 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_402_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_402_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 403.
   *
   * Corresponds to "VAST error 403 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_403_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_403_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 405.
   *
   * Corresponds to "VAST error 405 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_405_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_405_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 500.
   *
   * Corresponds to "VAST error 500 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_500_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_500_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 501.
   *
   * Corresponds to "VAST error 501 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_501_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_501_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 502.
   *
   * Corresponds to "VAST error 502 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_502_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_502_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 503.
   *
   * Corresponds to "VAST error 503 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_503_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_503_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 600.
   *
   * Corresponds to "VAST error 600 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_600_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_600_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 601.
   *
   * Corresponds to "VAST error 601 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_601_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_601_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 602.
   *
   * Corresponds to "VAST error 602 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_602_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_602_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 603.
   *
   * Corresponds to "VAST error 603 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_603_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_603_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 604.
   *
   * Corresponds to "VAST error 604 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_604_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_604_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 900.
   *
   * Corresponds to "VAST error 900 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_900_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_900_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 901.
   *
   * Corresponds to "VAST error 901 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST3_ERROR_901_COUNT_REAL_TIME = 'VIDEO_VAST3_ERROR_901_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 406.
   *
   * Corresponds to "VAST error 406 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST4_ERROR_406_COUNT_REAL_TIME = 'VIDEO_VAST4_ERROR_406_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 407.
   *
   * Corresponds to "VAST error 407 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST4_ERROR_407_COUNT_REAL_TIME = 'VIDEO_VAST4_ERROR_407_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 408.
   *
   * Corresponds to "VAST error 408 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST4_ERROR_408_COUNT_REAL_TIME = 'VIDEO_VAST4_ERROR_408_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 409.
   *
   * Corresponds to "VAST error 409 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST4_ERROR_409_COUNT_REAL_TIME = 'VIDEO_VAST4_ERROR_409_COUNT_REAL_TIME',
  /**
   * Number of VAST video errors of type 410.
   *
   * Corresponds to "VAST error 410 count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST4_ERROR_410_COUNT_REAL_TIME = 'VIDEO_VAST4_ERROR_410_COUNT_REAL_TIME',
  /**
   * Number of total VAST video errors.
   *
   * Corresponds to "Total error count" in the Ad Manager UI. Compatible with the "Real-time video" report type.
   */
  VIDEO_VAST_TOTAL_ERROR_COUNT_REAL_TIME = 'VIDEO_VAST_TOTAL_ERROR_COUNT_REAL_TIME',
  /**
   * The total number of impressions viewed on the user's screen.
   *
   * Corresponds to "Total Active View viewable impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS = 'TOTAL_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS',
  /**
   * The total number of impressions that were sampled and measured by active view.
   *
   * Corresponds to "Total Active View measurable impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS = 'TOTAL_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS',
  /**
   * The percentage of total impressions viewed on the user's screen (out of the total impressions measurable by active view).
   */
  TOTAL_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS_RATE = 'TOTAL_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS_RATE',
  /**
   * Total number of impressions that were eligible to measure viewability.
   *
   * Corresponds to "Total Active View eligible impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_ACTIVE_VIEW_ELIGIBLE_IMPRESSIONS = 'TOTAL_ACTIVE_VIEW_ELIGIBLE_IMPRESSIONS',
  /**
   * The percentage of total impressions that were measurable by active view (out of all the total impressions sampled for active view).
   *
   * Corresponds to "Total Active View % measurable impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS_RATE = 'TOTAL_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS_RATE',
  /**
   * Active View total average time in seconds that specific impressions are reported as being viewable.
   *
   * Corresponds to "Total Active View average viewable time (seconds)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_ACTIVE_VIEW_AVERAGE_VIEWABLE_TIME = 'TOTAL_ACTIVE_VIEW_AVERAGE_VIEWABLE_TIME',
  /**
   * The percentage of total impressions from video creatives with audible playback at start, from all total measurable impressions for Active View.
   *
   * Corresponds to "Active View % audible at start" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ACTIVE_VIEW_PERCENT_AUDIBLE_START_IMPRESSIONS = 'ACTIVE_VIEW_PERCENT_AUDIBLE_START_IMPRESSIONS',
  /**
   * The percentage of total impressions from video creatives where volume > 0 at any point, from all total impressions measurable for Active View.
   *
   * Corresponds to "Active View % ever audible" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ACTIVE_VIEW_PERCENT_EVER_AUDIBLE_IMPRESSIONS = 'ACTIVE_VIEW_PERCENT_EVER_AUDIBLE_IMPRESSIONS',
  /**
   * The number of impressions delivered by the ad server viewed on the user's screen.
   *
   * Corresponds to "Ad server Active View viewable impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS = 'AD_SERVER_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS',
  /**
   * The number of impressions delivered by the ad server that were sampled, and measurable by active view.
   *
   * Corresponds to "Ad server Active View measurable impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS = 'AD_SERVER_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS',
  /**
   * The percentage of impressions delivered by the ad server viewed on the user's screen (out of the ad server impressions measurable by active view).
   *
   * Corresponds to "Ad server Active View % viewable impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS_RATE = 'AD_SERVER_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS_RATE',
  /**
   * Total number of impressions delivered by the ad server that were eligible to measure viewability.
   *
   * Corresponds to "Ad server Active View eligible impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_ACTIVE_VIEW_ELIGIBLE_IMPRESSIONS = 'AD_SERVER_ACTIVE_VIEW_ELIGIBLE_IMPRESSIONS',
  /**
   * The percentage of impressions delivered by the ad server that were measurable by active view ( out of all the ad server impressions sampled for active view).
   *
   * Corresponds to "Ad server Active View % measurable impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS_RATE = 'AD_SERVER_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS_RATE',
  /**
   * Active View ad server revenue.
   *
   * Corresponds to "Ad server Active View revenue" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_ACTIVE_VIEW_REVENUE = 'AD_SERVER_ACTIVE_VIEW_REVENUE',
  /**
   * Active View ad server average time in seconds that specific impressions are reported as being viewable.
   *
   * Corresponds to "Ad server Active View average viewable time (seconds)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_SERVER_ACTIVE_VIEW_AVERAGE_VIEWABLE_TIME = 'AD_SERVER_ACTIVE_VIEW_AVERAGE_VIEWABLE_TIME',
  /**
   * The number of impressions delivered by AdSense viewed on the user's screen,
   *
   * Corresponds to "AdSense Active View viewable impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS = 'ADSENSE_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS',
  /**
   * The number of impressions delivered by AdSense that were sampled, and measurable by active view.
   *
   * Corresponds to "AdSense Active View measurable impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS = 'ADSENSE_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS',
  /**
   * The percentage of impressions delivered by AdSense viewed on the user's screen (out of AdSense impressions measurable by active view).
   *
   * Corresponds to "AdSense Active View % viewable impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS_RATE = 'ADSENSE_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS_RATE',
  /**
   * Total number of impressions delivered by AdSense that were eligible to measure viewability.
   *
   * Corresponds to "AdSense Active View eligible impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_ACTIVE_VIEW_ELIGIBLE_IMPRESSIONS = 'ADSENSE_ACTIVE_VIEW_ELIGIBLE_IMPRESSIONS',
  /**
   * The percentage of impressions delivered by AdSense that were measurable by active view ( out of all AdSense impressions sampled for active view).
   *
   * Corresponds to "AdSense Active View % measurable impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS_RATE = 'ADSENSE_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS_RATE',
  /**
   * Active View AdSense average time in seconds that specific impressions are reported as being viewable.
   *
   * Corresponds to "AdSense Active View average viewable time (seconds)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  ADSENSE_ACTIVE_VIEW_AVERAGE_VIEWABLE_TIME = 'ADSENSE_ACTIVE_VIEW_AVERAGE_VIEWABLE_TIME',
  /**
   * The number of impressions delivered by Ad Exchange viewed on the user's screen,
   *
   * Corresponds to "Ad Exchange Active View viewable impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS = 'AD_EXCHANGE_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS',
  /**
   * The number of impressions delivered by Ad Exchange that were sampled, and measurable by active view.
   *
   * Corresponds to "Ad Exchange Active View measurable impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS = 'AD_EXCHANGE_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS',
  /**
   * The percentage of impressions delivered by Ad Exchange viewed on the user's screen (out of Ad Exchange impressions measurable by active view).
   *
   * Corresponds to "Ad Exchange Active View % viewable impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS_RATE = 'AD_EXCHANGE_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS_RATE',
  /**
   * Total number of impressions delivered by Ad Exchange that were eligible to measure viewability.
   *
   * Corresponds to "Ad Exchange Active View eligible impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_ACTIVE_VIEW_ELIGIBLE_IMPRESSIONS = 'AD_EXCHANGE_ACTIVE_VIEW_ELIGIBLE_IMPRESSIONS',
  /**
   * The percentage of impressions delivered by Ad Exchange that were measurable by active view ( out of all Ad Exchange impressions sampled for active view).
   *
   * Corresponds to "Ad Exchange Active View % measurable impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS_RATE = 'AD_EXCHANGE_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS_RATE',
  /**
   * Active View AdExchange average time in seconds that specific impressions are reported as being viewable.
   *
   * Corresponds to "Ad Exchange Active View average viewable time (seconds)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_ACTIVE_VIEW_AVERAGE_VIEWABLE_TIME = 'AD_EXCHANGE_ACTIVE_VIEW_AVERAGE_VIEWABLE_TIME',
  /**
   * The total number of queries sent to Ad Exchange.
   *
   * Corresponds to "Ad Exchange ad requests" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_TOTAL_REQUESTS = 'AD_EXCHANGE_TOTAL_REQUESTS',
  /**
   * The fraction of Ad Exchange queries that result in a matched query. Also known as "Coverage".
   *
   * Corresponds to "Ad Exchange match rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_MATCH_RATE = 'AD_EXCHANGE_MATCH_RATE',
  /**
   * The amount earned per click on Ad Exchange.
   *
   * Corresponds to "Ad Exchange CPC" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_COST_PER_CLICK = 'AD_EXCHANGE_COST_PER_CLICK',
  /**
   * The fraction of Ad Exchange requests that result in a click.
   *
   * Corresponds to "Ad Exchange ad request CTR" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_TOTAL_REQUEST_CTR = 'AD_EXCHANGE_TOTAL_REQUEST_CTR',
  /**
   * The fraction of Ad Exchange matched requests that result in a click.
   *
   * Corresponds to "Ad Exchange matched request CTR" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_MATCHED_REQUEST_CTR = 'AD_EXCHANGE_MATCHED_REQUEST_CTR',
  /**
   * The amount earned per thousand Ad Exchange requests.
   *
   * Corresponds to "Ad Exchange ad request eCPM" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_TOTAL_REQUEST_ECPM = 'AD_EXCHANGE_TOTAL_REQUEST_ECPM',
  /**
   * The amount earned per thousand Ad Exchange matched requests.
   *
   * Corresponds to "Ad Exchange matched request eCPM" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_MATCHED_REQUEST_ECPM = 'AD_EXCHANGE_MATCHED_REQUEST_ECPM',
  /**
   * The increase in Ad Exchange revenue gained for won impressions over the applicable minimum CPM or the best price specified during dynamic allocation.
   *
   * Corresponds to "Ad Exchange lift" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  AD_EXCHANGE_LIFT_EARNINGS = 'AD_EXCHANGE_LIFT_EARNINGS',
  /**
   * Active View total revenue.
   *
   * Corresponds to "Total Active View revenue" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  TOTAL_ACTIVE_VIEW_REVENUE = 'TOTAL_ACTIVE_VIEW_REVENUE',
  /**
   * The number of impressions sent to Ad Exchange / AdSense, regardless of whether they won or lost (total number of dynamic allocation impressions).
   *
   * Corresponds to "Impressions competing" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  DYNAMIC_ALLOCATION_OPPORTUNITY_IMPRESSIONS_COMPETING_TOTAL = 'DYNAMIC_ALLOCATION_OPPORTUNITY_IMPRESSIONS_COMPETING_TOTAL',
  /**
   * The number of unfilled queries that attempted dynamic allocation by Ad Exchange / AdSense.
   *
   * Corresponds to "Unfilled competing impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  DYNAMIC_ALLOCATION_OPPORTUNITY_UNFILLED_IMPRESSIONS_COMPETING = 'DYNAMIC_ALLOCATION_OPPORTUNITY_UNFILLED_IMPRESSIONS_COMPETING',
  /**
   * The number of Ad Exchange / AdSense and Ad Manager impressions.
   *
   * Corresponds to "Eligible impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  DYNAMIC_ALLOCATION_OPPORTUNITY_ELIGIBLE_IMPRESSIONS_TOTAL = 'DYNAMIC_ALLOCATION_OPPORTUNITY_ELIGIBLE_IMPRESSIONS_TOTAL',
  /**
   * The difference between eligible impressions and competing impressions in dynamic allocation.
   */
  DYNAMIC_ALLOCATION_OPPORTUNITY_IMPRESSIONS_NOT_COMPETING_TOTAL = 'DYNAMIC_ALLOCATION_OPPORTUNITY_IMPRESSIONS_NOT_COMPETING_TOTAL',
  /**
   * The percentage of eligible impressions that are not competing in dynamic allocation.
   *
   * Corresponds to "Impressions not competing (%)" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  DYNAMIC_ALLOCATION_OPPORTUNITY_IMPRESSIONS_NOT_COMPETING_PERCENT_TOTAL = 'DYNAMIC_ALLOCATION_OPPORTUNITY_IMPRESSIONS_NOT_COMPETING_PERCENT_TOTAL',
  /**
   * The percent of eligible impressions participating in dynamic allocation.
   */
  DYNAMIC_ALLOCATION_OPPORTUNITY_SATURATION_RATE_TOTAL = 'DYNAMIC_ALLOCATION_OPPORTUNITY_SATURATION_RATE_TOTAL',
  /**
   * The percent of total dynamic allocation queries that won.
   *
   * Corresponds to "Dynamic allocation match rate" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  DYNAMIC_ALLOCATION_OPPORTUNITY_MATCH_RATE_TOTAL = 'DYNAMIC_ALLOCATION_OPPORTUNITY_MATCH_RATE_TOTAL',
  /**
   * The number of invoiced impressions.
   *
   * Corresponds to "Invoiced impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  INVOICED_IMPRESSIONS = 'INVOICED_IMPRESSIONS',
  /**
   * The number of invoiced unfilled impressions.
   *
   * Corresponds to "Invoiced unfilled impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  INVOICED_UNFILLED_IMPRESSIONS = 'INVOICED_UNFILLED_IMPRESSIONS',
  /**
   * The total number of impressions tracked for Nielsen Digital Ad Ratings measurement.
   *
   * Corresponds to "Impressions" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_IMPRESSIONS = 'NIELSEN_IMPRESSIONS',
  /**
   * The total number of impressions for in-target demographic tracked for Nielsen Digital Ad Ratings measurement.
   *
   * Corresponds to "In-target impressions" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_IN_TARGET_IMPRESSIONS = 'NIELSEN_IN_TARGET_IMPRESSIONS',
  /**
   * The population in the demographic.
   *
   * Corresponds to "Population base" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_POPULATION_BASE = 'NIELSEN_POPULATION_BASE',
  /**
   * The total population for all in-target demographics.
   *
   * Compatible with the "Reach" report type.
   */
  NIELSEN_IN_TARGET_POPULATION_BASE = 'NIELSEN_IN_TARGET_POPULATION_BASE',
  /**
   * The total number of different people within the selected demographic who were reached.
   *
   * Corresponds to "Unique audience" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_UNIQUE_AUDIENCE = 'NIELSEN_UNIQUE_AUDIENCE',
  /**
   * The total number of different people within all in-target demographics who were reached.
   *
   * Compatible with the "Reach" report type.
   */
  NIELSEN_IN_TARGET_UNIQUE_AUDIENCE = 'NIELSEN_IN_TARGET_UNIQUE_AUDIENCE',
  /**
   * The unique audience reached as a percentage of the population base.
   *
   * Corresponds to "% audience reach" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_PERCENT_AUDIENCE_REACH = 'NIELSEN_PERCENT_AUDIENCE_REACH',
  /**
   * The unique audience reached as a percentage of the population base for all in-target demographics.
   *
   * Compatible with the "Reach" report type.
   */
  NIELSEN_IN_TARGET_PERCENT_AUDIENCE_REACH = 'NIELSEN_IN_TARGET_PERCENT_AUDIENCE_REACH',
  /**
   * The average number of times that a person within the target audience sees an advertisement.
   *
   * Corresponds to "Average frequency" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_AVERAGE_FREQUENCY = 'NIELSEN_AVERAGE_FREQUENCY',
  /**
   * The average number of times that a person within the target audience sees an advertisement for all in-target demographics.
   *
   * Compatible with the "Reach" report type.
   */
  NIELSEN_IN_TARGET_AVERAGE_FREQUENCY = 'NIELSEN_IN_TARGET_AVERAGE_FREQUENCY',
  /**
   * The unit of audience volume, which is based on the percentage of the reached target audience population multiplied by the average frequency.
   *
   * Corresponds to "Gross rating points" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_GROSS_RATING_POINTS = 'NIELSEN_GROSS_RATING_POINTS',
  /**
   * The unit of audience volume, which is based on the percentage of the reached target audience population multiplied by the average frequency, for all in-target demographics.
   *
   * Compatible with the "Reach" report type.
   */
  NIELSEN_IN_TARGET_GROSS_RATING_POINTS = 'NIELSEN_IN_TARGET_GROSS_RATING_POINTS',
  /**
   * The share of impressions that reached the target demographic.
   *
   * Corresponds to "% impression share" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_PERCENT_IMPRESSIONS_SHARE = 'NIELSEN_PERCENT_IMPRESSIONS_SHARE',
  /**
   * The share of impressions that reached all in-target demographics.
   *
   * Corresponds to "In-target % impression share" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_IN_TARGET_PERCENT_IMPRESSIONS_SHARE = 'NIELSEN_IN_TARGET_PERCENT_IMPRESSIONS_SHARE',
  /**
   * The share of the total population represented by the population base.
   *
   * Corresponds to "% population share" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_PERCENT_POPULATION_SHARE = 'NIELSEN_PERCENT_POPULATION_SHARE',
  /**
   * The share of the total population for all in-target demographics represented by the population base.
   *
   * Compatible with the "Reach" report type.
   */
  NIELSEN_IN_TARGET_PERCENT_POPULATION_SHARE = 'NIELSEN_IN_TARGET_PERCENT_POPULATION_SHARE',
  /**
   * The share of the unique audience in the demographic.
   *
   * Corresponds to "% audience share" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_PERCENT_AUDIENCE_SHARE = 'NIELSEN_PERCENT_AUDIENCE_SHARE',
  /**
   * The share of the unique audience for all in-target demographics.
   *
   * Compatible with the "Reach" report type.
   */
  NIELSEN_IN_TARGET_PERCENT_AUDIENCE_SHARE = 'NIELSEN_IN_TARGET_PERCENT_AUDIENCE_SHARE',
  /**
   * The relative unique audience in the demographic compared with its share of the overall population.
   *
   * Corresponds to "Audience index" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_AUDIENCE_INDEX = 'NIELSEN_AUDIENCE_INDEX',
  /**
   * The relative unique audience for all in-target demographics compared with its share of the overall population.
   *
   * Compatible with the "Reach" report type.
   */
  NIELSEN_IN_TARGET_AUDIENCE_INDEX = 'NIELSEN_IN_TARGET_AUDIENCE_INDEX',
  /**
   * The relative impressions per person in the demographic compared with the impressions per person for the overall population.
   *
   * Corresponds to "Impressions index" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_IMPRESSIONS_INDEX = 'NIELSEN_IMPRESSIONS_INDEX',
  /**
   * The relative impressions per person for all in-target demographics compared with the impressions per person for the overall population.
   *
   * Compatible with the "Reach" report type.
   */
  NIELSEN_IN_TARGET_IMPRESSIONS_INDEX = 'NIELSEN_IN_TARGET_IMPRESSIONS_INDEX',
  /**
   * The adjusted in-target impression share used for pacing and billing, based on the GRP pacing preferences indicated in your line item settings.
   *
   * Corresponds to "Processed Nielsen in-target rate" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  NIELSEN_IN_TARGET_RATIO = 'NIELSEN_IN_TARGET_RATIO',
  /**
   * Number of impressions delivered.
   *
   * Corresponds to "Impressions" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_IMPRESSIONS = 'DP_IMPRESSIONS',
  /**
   * Number of clicks delivered
   *
   * Corresponds to "Clicks" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_CLICKS = 'DP_CLICKS',
  /**
   * Number of requests.
   *
   * Corresponds to "Queries" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_QUERIES = 'DP_QUERIES',
  /**
   * Number of requests where a buyer was matched with the Ad request.
   *
   * Corresponds to "Matched queries" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_MATCHED_QUERIES = 'DP_MATCHED_QUERIES',
  /**
   * The revenue earned, calculated in publisher currency, for the ads delivered.
   *
   * Corresponds to "Cost" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_COST = 'DP_COST',
  /**
   * The average estimated cost-per-thousand-impressions earned from ads delivered.
   *
   * Corresponds to "Total Average eCPM" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_ECPM = 'DP_ECPM',
  /**
   * Total number of impressions delivered by the ad server that were eligible to measure viewability.
   *
   * Corresponds to "Total Active View eligible impressions" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_ACTIVE_VIEW_ELIGIBLE_IMPRESSIONS = 'DP_ACTIVE_VIEW_ELIGIBLE_IMPRESSIONS',
  /**
   * The number of impressions delivered that were sampled and measurable by active view.
   *
   * Corresponds to "Total Active View measurable impressions" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS = 'DP_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS',
  /**
   * The number of impressions delivered that were viewed on the user's screen.
   *
   * Corresponds to "Total Active View viewable impressions" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS = 'DP_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS',
  /**
   * The percentage of impressions delivered that were measurable by active view (out of all the impressions sampled for active view).
   *
   * Corresponds to "Total Active View % measurable impressions" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS_RATE = 'DP_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS_RATE',
  /**
   * The percentage of impressions delivered thar were viewed on the user's screen (out of the impressions measurable by active view).
   *
   * Corresponds to "Total Active View % viewable impressions" in the Ad Manager UI. Compatible with the "Ad Connector" report type.
   */
  DP_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS_RATE = 'DP_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS_RATE',
  /**
   * The host impressions in the partner management.
   *
   * Corresponds to "Partner management host impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  PARTNER_MANAGEMENT_HOST_IMPRESSIONS = 'PARTNER_MANAGEMENT_HOST_IMPRESSIONS',
  /**
   * The host clicks in the partner management.
   *
   * Corresponds to "Partner management host clicks" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  PARTNER_MANAGEMENT_HOST_CLICKS = 'PARTNER_MANAGEMENT_HOST_CLICKS',
  /**
   * The host CTR in the partner management.
   *
   * Corresponds to "Partner management host CTR" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  PARTNER_MANAGEMENT_HOST_CTR = 'PARTNER_MANAGEMENT_HOST_CTR',
  /**
   * The unfilled impressions in the partner management.
   *
   * Corresponds to "Partner management unfilled impressions" in the Ad Manager UI. Compatible with any of the following report types: Historical, Partner finance.
   */
  PARTNER_MANAGEMENT_UNFILLED_IMPRESSIONS = 'PARTNER_MANAGEMENT_UNFILLED_IMPRESSIONS',
  /**
   * The partner impressions in the partner management.
   *
   * Corresponds to "Partner management partner impressions" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  PARTNER_MANAGEMENT_PARTNER_IMPRESSIONS = 'PARTNER_MANAGEMENT_PARTNER_IMPRESSIONS',
  /**
   * The partner clicks in the partner management.
   *
   * Corresponds to "Partner management partner clicks" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  PARTNER_MANAGEMENT_PARTNER_CLICKS = 'PARTNER_MANAGEMENT_PARTNER_CLICKS',
  /**
   * The partner CTR in the partner management.
   *
   * Corresponds to "Partner management partner CTR" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  PARTNER_MANAGEMENT_PARTNER_CTR = 'PARTNER_MANAGEMENT_PARTNER_CTR',
  /**
   * The gross revenue in the partner management.
   *
   * Corresponds to "Partner management gross revenue" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  PARTNER_MANAGEMENT_GROSS_REVENUE = 'PARTNER_MANAGEMENT_GROSS_REVENUE',
  /**
   * Monthly host impressions for partner finance reports.
   *
   * Corresponds to "Host impressions" in the Ad Manager UI. Compatible with the "Partner finance" report type.
   */
  PARTNER_FINANCE_HOST_IMPRESSIONS = 'PARTNER_FINANCE_HOST_IMPRESSIONS',
  /**
   * Monthly host revenue for partner finance reports.
   *
   * Corresponds to "Host revenue" in the Ad Manager UI. Compatible with the "Partner finance" report type.
   */
  PARTNER_FINANCE_HOST_REVENUE = 'PARTNER_FINANCE_HOST_REVENUE',
  /**
   * Monthly host eCPM for partner finance reports.
   *
   * Corresponds to "Host eCPM" in the Ad Manager UI. Compatible with the "Partner finance" report type.
   */
  PARTNER_FINANCE_HOST_ECPM = 'PARTNER_FINANCE_HOST_ECPM',
  /**
   * Monthly partner revenue for partner finance reports.
   *
   * Corresponds to "Partner revenue" in the Ad Manager UI. Compatible with the "Partner finance" report type.
   */
  PARTNER_FINANCE_PARTNER_REVENUE = 'PARTNER_FINANCE_PARTNER_REVENUE',
  /**
   * Monthly partner eCPM for partner finance reports.
   *
   * Corresponds to "Partner eCPM" in the Ad Manager UI. Compatible with the "Partner finance" report type.
   */
  PARTNER_FINANCE_PARTNER_ECPM = 'PARTNER_FINANCE_PARTNER_ECPM',
  /**
   * Monthly gross revenue for partner finance reports.
   *
   * Corresponds to "Gross revenue" in the Ad Manager UI. Compatible with the "Partner finance" report type.
   */
  PARTNER_FINANCE_GROSS_REVENUE = 'PARTNER_FINANCE_GROSS_REVENUE',
  /**
   * The ratio of the number of impressions for which the creative load time is between 0 and 500 ms to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Creative load time 0 - 500ms (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  CREATIVE_LOAD_TIME_0_500_MS_PERCENT = 'CREATIVE_LOAD_TIME_0_500_MS_PERCENT',
  /**
   * The ratio of the number of impressions for which the creative load time is between 500 milliseconds and 1 second to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Creative load time 500ms - 1s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  CREATIVE_LOAD_TIME_500_1000_MS_PERCENT = 'CREATIVE_LOAD_TIME_500_1000_MS_PERCENT',
  /**
   * The ratio of the number of impressions for which the creative load time is between 1 second and 2 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Creative load time 1s - 2s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  CREATIVE_LOAD_TIME_1_2_S_PERCENT = 'CREATIVE_LOAD_TIME_1_2_S_PERCENT',
  /**
   * The ratio of the number of impressions for which the creative load time is between 2 seconds and 4 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Creative load time 2s - 4s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  CREATIVE_LOAD_TIME_2_4_S_PERCENT = 'CREATIVE_LOAD_TIME_2_4_S_PERCENT',
  /**
   * The ratio of the number of impressions for which the creative load time is between 4 seconds and 8 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Creative load time 4s - 8s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  CREATIVE_LOAD_TIME_4_8_S_PERCENT = 'CREATIVE_LOAD_TIME_4_8_S_PERCENT',
  /**
   * The ratio of the number of impressions for which the creative load time is greater than 8 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Creative load time >8s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  CREATIVE_LOAD_TIME_GREATER_THAN_8_S_PERCENT = 'CREATIVE_LOAD_TIME_GREATER_THAN_8_S_PERCENT',
  /**
   * The ratio of the number of impressions which are unviewed because the ad slot never entered the viewport to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Slot never entered viewport (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  UNVIEWED_REASON_SLOT_NEVER_ENTERED_VIEWPORT_PERCENT = 'UNVIEWED_REASON_SLOT_NEVER_ENTERED_VIEWPORT_PERCENT',
  /**
   * The ratio of the number of impressions which are unviewed because the user scrolled before the ad filled to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "User scrolled before ad filled (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  UNVIEWED_REASON_USER_SCROLLED_BEFORE_AD_FILLED_PERCENT = 'UNVIEWED_REASON_USER_SCROLLED_BEFORE_AD_FILLED_PERCENT',
  /**
   * The ratio of the number of impressions which are unviewed because the user scrolled or navigated before the ad loaded to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "User scrolled/navigated before ad loaded (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  UNVIEWED_REASON_USER_SCROLLED_BEFORE_AD_LOADED_PERCENT = 'UNVIEWED_REASON_USER_SCROLLED_BEFORE_AD_LOADED_PERCENT',
  /**
   * The ratio of the number of impressions which are unviewed because the user scrolled or navigated before one second to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "User scrolled/navigated before 1 second (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  UNVIEWED_REASON_USER_SCROLLED_BEFORE_1_S_PERCENT = 'UNVIEWED_REASON_USER_SCROLLED_BEFORE_1_S_PERCENT',
  /**
   * The ratio of the number of impressions which are unviewed because the of another non-viewable-impression reason to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Other non-viewable impression reasons (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  UNVIEWED_REASON_OTHER_PERCENT = 'UNVIEWED_REASON_OTHER_PERCENT',
  /**
   * The ratio of the number of impressions for which the DOM load to tag log time is between 0 and 500 milliseconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Page navigation to tag loaded time 0 - 500ms (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  PAGE_NAVIGATION_TO_TAG_LOADED_TIME_0_500_MS_PERCENT = 'PAGE_NAVIGATION_TO_TAG_LOADED_TIME_0_500_MS_PERCENT',
  /**
   * The ratio of the number of impressions for which the DOM load to tag log time is between 500 milliseconds and 1 second to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Page navigation to tag loaded time 500ms - 1s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  PAGE_NAVIGATION_TO_TAG_LOADED_TIME_500_1000_MS_PERCENT = 'PAGE_NAVIGATION_TO_TAG_LOADED_TIME_500_1000_MS_PERCENT',
  /**
   * The ratio of the number of impressions for which the DOM load to tag log time is between 1 second and 2 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Page navigation to tag loaded time 1s - 2s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  PAGE_NAVIGATION_TO_TAG_LOADED_TIME_1_2_S_PERCENT = 'PAGE_NAVIGATION_TO_TAG_LOADED_TIME_1_2_S_PERCENT',
  /**
   * The ratio of the number of impressions for which the DOM load to tag log time is between 2 seconds and 4 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Page navigation to tag loaded time 2s - 4s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  PAGE_NAVIGATION_TO_TAG_LOADED_TIME_2_4_S_PERCENT = 'PAGE_NAVIGATION_TO_TAG_LOADED_TIME_2_4_S_PERCENT',
  /**
   * The ratio of the number of impressions for which the DOM load to tag log time is between 4 seconds and 8 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Page navigation to tag loaded time 4s - 8s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  PAGE_NAVIGATION_TO_TAG_LOADED_TIME_4_8_S_PERCENT = 'PAGE_NAVIGATION_TO_TAG_LOADED_TIME_4_8_S_PERCENT',
  /**
   * The ratio of the number of impressions for which the DOM load to tag log time is greater than 8 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Page navigation to tag loaded time >8s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  PAGE_NAVIGATION_TO_TAG_LOADED_TIME_GREATER_THAN_8_S_PERCENT = 'PAGE_NAVIGATION_TO_TAG_LOADED_TIME_GREATER_THAN_8_S_PERCENT',
  /**
   * The ratio of the number of impressions for which the DOM load to first ad request time is between 0 and 500 milliseconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Page navigation to first ad request time 0 - 500ms (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  PAGE_NAVIGATION_TO_FIRST_AD_REQUEST_TIME_0_500_MS_PERCENT = 'PAGE_NAVIGATION_TO_FIRST_AD_REQUEST_TIME_0_500_MS_PERCENT',
  /**
   * The ratio of the number of impressions for which the DOM load to first ad request time is between 500 milliseconds and 1 second to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Page navigation to first ad request time 500ms - 1s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  PAGE_NAVIGATION_TO_FIRST_AD_REQUEST_TIME_500_1000_MS_PERCENT = 'PAGE_NAVIGATION_TO_FIRST_AD_REQUEST_TIME_500_1000_MS_PERCENT',
  /**
   * The ratio of the number of impressions for which the DOM load to first ad request time is between 1 second and 2 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Page navigation to first ad request time 1s - 2s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  PAGE_NAVIGATION_TO_FIRST_AD_REQUEST_TIME_1_2_S_PERCENT = 'PAGE_NAVIGATION_TO_FIRST_AD_REQUEST_TIME_1_2_S_PERCENT',
  /**
   * The ratio of the number of impressions for which the DOM load to first ad request time is between 2 seconds and 4 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Page navigation to first ad request time 2s - 4s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  PAGE_NAVIGATION_TO_FIRST_AD_REQUEST_TIME_2_4_S_PERCENT = 'PAGE_NAVIGATION_TO_FIRST_AD_REQUEST_TIME_2_4_S_PERCENT',
  /**
   * The ratio of the number of impressions for which the DOM load to first ad request time is between 4 seconds and 8 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Page navigation to first ad request time 4s - 8s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  PAGE_NAVIGATION_TO_FIRST_AD_REQUEST_TIME_4_8_S_PERCENT = 'PAGE_NAVIGATION_TO_FIRST_AD_REQUEST_TIME_4_8_S_PERCENT',
  /**
   * The ratio of the number of impressions for which the DOM load to first ad request time is greater than 8 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Page navigation to first ad request time >8s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  PAGE_NAVIGATION_TO_FIRST_AD_REQUEST_TIME_GREATER_THAN_8_S_PERCENT = 'PAGE_NAVIGATION_TO_FIRST_AD_REQUEST_TIME_GREATER_THAN_8_S_PERCENT',
  /**
   * The ratio of the number of impressions for which the tag load to first ad request time is between 0 and 500 milliseconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Tag loaded to first ad request time 0 - 500ms (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  TAG_LOAD_TO_FIRST_AD_REQUEST_TIME_0_500_MS_PERCENT = 'TAG_LOAD_TO_FIRST_AD_REQUEST_TIME_0_500_MS_PERCENT',
  /**
   * The ratio of the number of impressions for which the tag load to first ad request time is between 500 milliseconds and 1 second to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Tag loaded to first ad request time 500ms - 1s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  TAG_LOAD_TO_FIRST_AD_REQUEST_TIME_500_1000_MS_PERCENT = 'TAG_LOAD_TO_FIRST_AD_REQUEST_TIME_500_1000_MS_PERCENT',
  /**
   * The ratio of the number of impressions for which the tag load to first ad request time is between 1 second and 2 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Tag loaded to first ad request time 1s - 2s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  TAG_LOAD_TO_FIRST_AD_REQUEST_TIME_1_2_S_PERCENT = 'TAG_LOAD_TO_FIRST_AD_REQUEST_TIME_1_2_S_PERCENT',
  /**
   * The ratio of the number of impressions for which the tag load to first ad request time is between 2 seconds and 4 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Tag loaded to first ad request time 2s - 4s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  TAG_LOAD_TO_FIRST_AD_REQUEST_TIME_2_4_S_PERCENT = 'TAG_LOAD_TO_FIRST_AD_REQUEST_TIME_2_4_S_PERCENT',
  /**
   * The ratio of the number of impressions for which the tag load to first ad request time is between 4 seconds and 8 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Tag loaded to first ad request time 4s - 8s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  TAG_LOAD_TO_FIRST_AD_REQUEST_TIME_4_8_S_PERCENT = 'TAG_LOAD_TO_FIRST_AD_REQUEST_TIME_4_8_S_PERCENT',
  /**
   * The ratio of the number of impressions for which the tag load to first ad request time is greater than 8 seconds to the total number of impressions that have ad latency data, represented as a percentage.
   *
   * Corresponds to "Tag loaded to first ad request time >8s (%)" in the Ad Manager UI. Compatible with the "Ad speed" report type.
   */
  TAG_LOAD_TO_FIRST_AD_REQUEST_TIME_GREATER_THAN_8_S_PERCENT = 'TAG_LOAD_TO_FIRST_AD_REQUEST_TIME_GREATER_THAN_8_S_PERCENT',
}

/**
 * `DimensionAttribute` provides additional fields associated with a `Dimension`. It can only be selected with its corresponding `Dimension`. For example, `DimensionAttribute.ORDER_PO_NUMBER` can only be used if the `ReportQuery.dimensions` contains `Dimension.ORDER_NAME`.
 */
export enum DimensionAttribute {
  /**
   * Represents `LineItem.effectiveAppliedLabels` as a comma separated list of `Label.name` for `Dimension.LINE_ITEM_NAME`.
   *
   * Corresponds to "Line item labels" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  LINE_ITEM_LABELS = 'LINE_ITEM_LABELS',
  /**
   * Represents `LineItem.effectiveAppliedLabels` as a comma separated list of `Label.id` for `Dimension.LINE_ITEM_NAME`.
   *
   * Compatible with any of the following report types: Historical, Reach.
   */
  LINE_ITEM_LABEL_IDS = 'LINE_ITEM_LABEL_IDS',
  /**
   * Generated as `true` for `Dimension.LINE_ITEM_NAME` which is eligible for optimization, `false` otherwise. Can be used for filtering.
   *
   * Corresponds to "Optimizable" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  LINE_ITEM_OPTIMIZABLE = 'LINE_ITEM_OPTIMIZABLE',
  /**
   * Indicates the progress made for the delivery of the `Dimension.LINE_ITEM_NAME`.
   *
   * - Progress | Definition
   * - 100% | The `LineItem` is on track to deliver in full as per `LineItem.unitsBought`.
   * - > 100% | The `LineItem` is on track to overdeliver.
   * - < 100% | The `LineItem` is on track to underdeliver.
   * - N/A | The `LineItem` does not have any quantity goals, or there is insufficient information about the `LineItem`.
   *
   * Corresponds to "Delivery Indicator" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach, Real-time video.
   */
  LINE_ITEM_DELIVERY_INDICATOR = 'LINE_ITEM_DELIVERY_INDICATOR',
  /**
   * Represents `LineItem.deliveryRateType` for `Dimension.LINE_ITEM_NAME`.
   *
   * Corresponds to "Delivery pacing" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  LINE_ITEM_DELIVERY_PACING = 'LINE_ITEM_DELIVERY_PACING',
  /**
   * Represents `LineItem.frequencyCaps` as a comma separated list of "`FrequencyCap.maxImpressions` impressions per/every `FrequencyCap.numTimeUnits` `FrequencyCap.timeUnit`" (e.g. "10 impressions every day,500 impressions per lifetime") for `Dimension.LINE_ITEM_NAME`.
   *
   * Corresponds to "Frequency cap" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  LINE_ITEM_FREQUENCY_CAP = 'LINE_ITEM_FREQUENCY_CAP',
  /**
   * Represents the monthly reconciliation status of the line item for `Dimension.LINE_ITEM_NAME` and `Dimension.MONTH_YEAR`.
   *
   * Corresponds to "Line item reconciliation status" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach.
   */
  LINE_ITEM_RECONCILIATION_STATUS = 'LINE_ITEM_RECONCILIATION_STATUS',
  /**
   * Represents the monthly last reconciliation date time of the line item for `Dimension.LINE_ITEM_NAME` and `Dimension.MONTH_YEAR`.
   *
   * Corresponds to "Line item last reconciliation time" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach.
   */
  LINE_ITEM_LAST_RECONCILIATION_DATE_TIME = 'LINE_ITEM_LAST_RECONCILIATION_DATE_TIME',
  /**
   * Represents `Company.externalId` for `Dimension.ADVERTISER_NAME`.
   *
   * Corresponds to "External advertiser ID" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  ADVERTISER_EXTERNAL_ID = 'ADVERTISER_EXTERNAL_ID',
  /**
   * Represents `Company.type` for `Dimension.ADVERTISER_NAME`. Can be used for filtering.
   *
   * Corresponds to "Advertiser type" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed.
   */
  ADVERTISER_TYPE = 'ADVERTISER_TYPE',
  /**
   * Represents `Company.creditStatus` for `Dimension.ADVERTISER_NAME`. Can be used for filtering.
   *
   * Corresponds to "Advertiser credit status" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed.
   */
  ADVERTISER_CREDIT_STATUS = 'ADVERTISER_CREDIT_STATUS',
  /**
   * Represents name and email address in the form of name(email) of primary contact for `Dimension.ADVERTISER_NAME`.
   *
   * Corresponds to "Advertiser primary contact" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  ADVERTISER_PRIMARY_CONTACT = 'ADVERTISER_PRIMARY_CONTACT',
  /**
   * Represents the start date (in YYYY-MM-DD format) for `Dimension.ORDER_NAME`. Can be used for filtering.
   *
   * Corresponds to "Order start date" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed.
   */
  ORDER_START_DATE_TIME = 'ORDER_START_DATE_TIME',
  /**
   * Represents the end date (in YYYY-MM-DD format) for `Dimension.ORDER_NAME`. Can be used for filtering.
   *
   * Corresponds to "Order end date" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed.
   */
  ORDER_END_DATE_TIME = 'ORDER_END_DATE_TIME',
  /**
   * Represents `Order.externalOrderId` for `Dimension.ORDER_NAME`.
   *
   * Corresponds to "External order ID" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  ORDER_EXTERNAL_ID = 'ORDER_EXTERNAL_ID',
  /**
   * Represents `Order.poNumber` for `Dimension.ORDER_NAME`. Can be used for filtering.
   *
   * Corresponds to "Order PO number" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed.
   */
  ORDER_PO_NUMBER = 'ORDER_PO_NUMBER',
  /**
   * Represents `Order.orderIsProgrammatic` for `Dimension.ORDER_NAME`. Can be used for filtering.
   *
   * Corresponds to "Programmatic order" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  ORDER_IS_PROGRAMMATIC = 'ORDER_IS_PROGRAMMATIC',
  /**
   * Represents the name of `Order.agencyId` for `Dimension.ORDER_NAME`.
   *
   * Corresponds to "Agency" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  ORDER_AGENCY = 'ORDER_AGENCY',
  /**
   * Represents `Order.agencyId` for `Dimension.ORDER_NAME`. Can be used for filtering.
   *
   * Corresponds to "Agency ID" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  ORDER_AGENCY_ID = 'ORDER_AGENCY_ID',
  /**
   * Represents `Order.effectiveAppliedLabels` as a comma separated list of `Label.name` for `Dimension.ORDER_NAME`.
   *
   * Corresponds to "Order labels" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  ORDER_LABELS = 'ORDER_LABELS',
  /**
   * Represents `Order.effectiveAppliedLabels` as a comma separated list of `Label.id` for `Dimension.ORDER_NAME`.
   *
   * Compatible with any of the following report types: Historical, Reach.
   */
  ORDER_LABEL_IDS = 'ORDER_LABEL_IDS',
  /**
   * The name and email address in the form of name(email) of the trafficker for `Dimension.ORDER_NAME`
   *
   * Corresponds to "Trafficker" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  ORDER_TRAFFICKER = 'ORDER_TRAFFICKER',
  /**
   * Represents `Order.traffickerId` for `Dimension.ORDER_NAME`. Can be used for filtering.
   *
   * Compatible with any of the following report types: Historical, Reach.
   */
  ORDER_TRAFFICKER_ID = 'ORDER_TRAFFICKER_ID',
  /**
   * The names and email addresses as a comma separated list of name(email) of the `Order.secondaryTraffickerIds` for `Dimension.ORDER_NAME`.
   *
   * Corresponds to "Secondary traffickers" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  ORDER_SECONDARY_TRAFFICKERS = 'ORDER_SECONDARY_TRAFFICKERS',
  /**
   * The name and email address in the form of name(email) of the `Order.salespersonId` for `Dimension.ORDER_NAME`.
   *
   * Corresponds to "Salesperson" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  ORDER_SALESPERSON = 'ORDER_SALESPERSON',
  /**
   * The names and email addresses as a comma separated list of name(email) of the `Order.secondarySalespersonIds` for `Dimension.ORDER_NAME`.
   *
   * Corresponds to "Secondary salespeople" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  ORDER_SECONDARY_SALESPEOPLE = 'ORDER_SECONDARY_SALESPEOPLE',
  /**
   * The total number of impressions delivered over the lifetime of an `Dimension.ORDER_NAME`.
   *
   * Corresponds to "Order lifetime impressions" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed.
   */
  ORDER_LIFETIME_IMPRESSIONS = 'ORDER_LIFETIME_IMPRESSIONS',
  /**
   * The total number of clicks delivered over the lifetime of an `Dimension.ORDER_NAME`.
   *
   * Corresponds to "Order lifetime clicks" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed.
   */
  ORDER_LIFETIME_CLICKS = 'ORDER_LIFETIME_CLICKS',
  /**
   * The cost of booking all the CPM ads for `Dimension.ORDER_NAME`.
   *
   * Corresponds to "Booked CPM" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  ORDER_BOOKED_CPM = 'ORDER_BOOKED_CPM',
  /**
   * The cost of booking all the CPC ads for `Dimension.ORDER_NAME`.
   *
   * Corresponds to "Booked CPC" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  ORDER_BOOKED_CPC = 'ORDER_BOOKED_CPC',
  /**
   * Represents the start date (in YYYY-MM-DD format) for `Dimension.LINE_ITEM_NAME`. Can be used for filtering.
   *
   * Corresponds to "Line item start date" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  LINE_ITEM_START_DATE_TIME = 'LINE_ITEM_START_DATE_TIME',
  /**
   * Represents the end date (in YYYY-MM-DD format) for `Dimension.LINE_ITEM_NAME`. Can be used for filtering.
   *
   * Corresponds to "Line item end date" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  LINE_ITEM_END_DATE_TIME = 'LINE_ITEM_END_DATE_TIME',
  /**
   * Represents `LineItem.externalId` for `Dimension.LINE_ITEM_NAME`. Can be used for filtering.
   *
   * Corresponds to "External Line Item ID" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  LINE_ITEM_EXTERNAL_ID = 'LINE_ITEM_EXTERNAL_ID',
  /**
   * Represents `LineItem.costType` for `Dimension.LINE_ITEM_NAME`. Can be used for filtering.
   *
   * Corresponds to "Cost type" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  LINE_ITEM_COST_TYPE = 'LINE_ITEM_COST_TYPE',
  /**
   * Represents `LineItem.costPerUnit` for `Dimension.LINE_ITEM_NAME`.
   *
   * Corresponds to "Rate" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  LINE_ITEM_COST_PER_UNIT = 'LINE_ITEM_COST_PER_UNIT',
  /**
   * Represents the 3 letter currency code for `Dimension.LINE_ITEM_NAME`.
   *
   * Corresponds to "Currency code" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  LINE_ITEM_CURRENCY_CODE = 'LINE_ITEM_CURRENCY_CODE',
  /**
   * The total number of impressions, clicks or days that is reserved for `Dimension.LINE_ITEM_NAME`.
   *
   * Corresponds to "Goal quantity" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  LINE_ITEM_GOAL_QUANTITY = 'LINE_ITEM_GOAL_QUANTITY',
  /**
   * Corresponds to "Nielsen Average Number Of Viewers" in the Ad Manager UI. Compatible with the "Reach" report type.
   */
  LINE_ITEM_AVERAGE_NUMBER_OF_VIEWERS = 'LINE_ITEM_AVERAGE_NUMBER_OF_VIEWERS',
  /**
   * The ratio between the goal quantity for `Dimension.LINE_ITEM_NAME` of `LineItemType.SPONSORSHIP` and the `LINE_ITEM_GOAL_QUANTITY`. Represented as a number between 0..100.
   *
   * Corresponds to "Sponsorship goal (%)" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  LINE_ITEM_SPONSORSHIP_GOAL_PERCENTAGE = 'LINE_ITEM_SPONSORSHIP_GOAL_PERCENTAGE',
  /**
   * The total number of impressions delivered over the lifetime of a `Dimension.LINE_ITEM_NAME`.
   *
   * Corresponds to "Line item lifetime impressions" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  LINE_ITEM_LIFETIME_IMPRESSIONS = 'LINE_ITEM_LIFETIME_IMPRESSIONS',
  /**
   * The total number of clicks delivered over the lifetime of a `Dimension.LINE_ITEM_NAME`.
   *
   * Corresponds to "Line item lifetime clicks" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  LINE_ITEM_LIFETIME_CLICKS = 'LINE_ITEM_LIFETIME_CLICKS',
  /**
   * Represents `LineItem.priority` for `Dimension.LINE_ITEM_NAME` as a value between 1 and 16. Can be used for filtering.
   *
   * Corresponds to "Line item priority" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  LINE_ITEM_PRIORITY = 'LINE_ITEM_PRIORITY',
  /**
   * Describes the computed `LineItem` status that is derived from the current state of the line item.
   *
   * Compatible with any of the following report types: Historical, Future sell-through, Reach, Ad speed, Real-time video.
   */
  LINE_ITEM_COMPUTED_STATUS = 'LINE_ITEM_COMPUTED_STATUS',
  /**
   * Indicates if a creative is a regular creative or creative set. Values will be 'Creative' or 'Creative set'
   *
   * Compatible with the "Historical" report type.
   */
  CREATIVE_OR_CREATIVE_SET = 'CREATIVE_OR_CREATIVE_SET',
  /**
   * The type of creative in a creative set - master or companion.
   *
   * Corresponds to "Master or Companion" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  MASTER_COMPANION_TYPE = 'MASTER_COMPANION_TYPE',
  /**
   * Represents the `LineItem.contractedUnitsBought` quantity for `Dimension.LINE_ITEM_NAME`.
   *
   * Corresponds to "Contracted quantity" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  LINE_ITEM_CONTRACTED_QUANTITY = 'LINE_ITEM_CONTRACTED_QUANTITY',
  /**
   * Represents the `LineItem.discount` for `Dimension.LINE_ITEM_NAME`. The number is either a percentage or an absolute value depending on `LineItem.discountType`.
   *
   * Corresponds to "Discount" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  LINE_ITEM_DISCOUNT = 'LINE_ITEM_DISCOUNT',
  /**
   * The cost of booking for a non-CPD `Dimension.LINE_ITEM_NAME`.
   *
   * Corresponds to "Booked revenue (exclude CPD)" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  LINE_ITEM_NON_CPD_BOOKED_REVENUE = 'LINE_ITEM_NON_CPD_BOOKED_REVENUE',
  /**
   * Represents `Company.appliedLabels` as a comma separated list of `Label.name` for `Dimension.ADVERTISER_NAME`.
   *
   * Corresponds to "Advertiser labels" in the Ad Manager UI. Compatible with any of the following report types: Historical, Reach.
   */
  ADVERTISER_LABELS = 'ADVERTISER_LABELS',
  /**
   * Represents `Company.appliedLabels` as a comma separated list of `Label.id` for `Dimension.ADVERTISER_NAME`.
   *
   * Compatible with any of the following report types: Historical, Reach.
   */
  ADVERTISER_LABEL_IDS = 'ADVERTISER_LABEL_IDS',
  /**
   * Represents the click-through URL for `Dimension.CREATIVE_NAME`.
   *
   * Corresponds to "Click-through URL" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  CREATIVE_CLICK_THROUGH_URL = 'CREATIVE_CLICK_THROUGH_URL',
  /**
   * Represents whether a creative is SSL-compliant.
   *
   * Corresponds to "Creative SSL scan result" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  CREATIVE_SSL_SCAN_RESULT = 'CREATIVE_SSL_SCAN_RESULT',
  /**
   * Represents whether a creative's SSL status was overridden.
   *
   * Corresponds to "Creative SSL compliance override" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  CREATIVE_SSL_COMPLIANCE_OVERRIDE = 'CREATIVE_SSL_COMPLIANCE_OVERRIDE',
  /**
   * Represents a `LineItemCreativeAssociation.startDateTime` for a `Dimension.LINE_ITEM_NAME` and a `Dimension.CREATIVE_NAME`. Includes the date without the time.
   *
   * Corresponds to "Creative start date" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  LINE_ITEM_CREATIVE_START_DATE = 'LINE_ITEM_CREATIVE_START_DATE',
  /**
   * Represents a `LineItemCreativeAssociation.endDateTime` for a `Dimension.LINE_ITEM_NAME` and a `Dimension.CREATIVE_NAME`. Includes the date without the time.
   *
   * Corresponds to "Creative end date" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  LINE_ITEM_CREATIVE_END_DATE = 'LINE_ITEM_CREATIVE_END_DATE',
  /**
   * Represents the `CmsContent.displayName` within the first element of `Content.cmsContent` for `Dimension.CONTENT_NAME`.
   *
   * Corresponds to "Content source name" in the Ad Manager UI. Compatible with any of the following report types: Historical, YouTube consolidated.
   */
  CONTENT_CMS_NAME = 'CONTENT_CMS_NAME',
  /**
   * Represents the `CmsContent.cmsContentId` within the first element of `Content.cmsContent` for `Dimension.CONTENT_NAME`.
   *
   * Corresponds to "ID of the video in the content source" in the Ad Manager UI. Compatible with any of the following report types: Historical, YouTube consolidated.
   */
  CONTENT_CMS_VIDEO_ID = 'CONTENT_CMS_VIDEO_ID',
  /**
   * Breaks down reporting data by child partner name in MCM "Manage Inventory". By default, this attribute is ordered by `Dimension.CHILD_NETWORK_CODE`.
   *
   * This dimension only works for MCM "Manage Inventory" parent publishers.
   *
   * Corresponds to "Child partner name" in the Ad Manager UI. Compatible with the "Historical" report type.
   */
  CHILD_PARTNER_NAME = 'CHILD_PARTNER_NAME',
  /**
   * Represents `AdUnit.adUnitCode` for `Dimension.AD_UNIT_NAME`.
   *
   * Corresponds to "Ad unit code" in the Ad Manager UI. Compatible with any of the following report types: Historical, Future sell-through, Ad speed, Real-time video.
   */
  AD_UNIT_CODE = 'AD_UNIT_CODE',
}

/**
 * Represents a period of time.
 */
export enum DateRangeType {
  /**
   * The current day.
   */
  TODAY = 'TODAY',
  /**
   * The previous day.
   */
  YESTERDAY = 'YESTERDAY',
  /**
   * The last week, from monday to sunday.
   */
  LAST_WEEK = 'LAST_WEEK',
  /**
   * The previous month.
   */
  LAST_MONTH = 'LAST_MONTH',
  /**
   * The last 3 full months. For example, if today is May 5, 2017, then LAST_3_MONTHS would go from February 1 to April 30.
   */
  LAST_3_MONTHS = 'LAST_3_MONTHS',
  /**
   * This will report on the last 93 days for the following columns: `Column.UNIQUE_REACH_IMPRESSIONS`, `Column.UNIQUE_REACH_FREQUENCY`, and `Column.UNIQUE_REACH`.
   */
  REACH_LIFETIME = 'REACH_LIFETIME',
  /**
   * Specifying this value will enable the user to specify `ReportQuery.startDate` and `ReportQuery.endDate`.
   */
  CUSTOM_DATE = 'CUSTOM_DATE',
  /**
   * The next day.
   */
  NEXT_DAY = 'NEXT_DAY',
  /**
   * The next ninety days.
   */
  NEXT_90_DAYS = 'NEXT_90_DAYS',
  /**
   * The next week, from monday to sunday.
   */
  NEXT_WEEK = 'NEXT_WEEK',
  /**
   * The next month.
   */
  NEXT_MONTH = 'NEXT_MONTH',
  /**
   * Beginning of the next day until the end of the next month.
   */
  CURRENT_AND_NEXT_MONTH = 'CURRENT_AND_NEXT_MONTH',
  /**
   * The next quarter.
   */
  NEXT_QUARTER = 'NEXT_QUARTER',
  /**
   * The next three months.
   */
  NEXT_3_MONTHS = 'NEXT_3_MONTHS',
  /**
   * The next twelve months.
   */
  NEXT_12_MONTHS = 'NEXT_12_MONTHS',
}

/**
 * Enumerates all allowed time zones that can be used in reports. Note that some time zones are only compatible with specific fields.
 */
export enum TimeZoneType {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Use the publisher's time zone. For Ad Manager reports, this time zone is compatible with all metrics. For Ad Exchange reports, this time zone is not compatible with "Bids" and "Deals" metrics.
   *
   * Note: if your report includes "time unit" dimensions, only the Ad Manager "time unit" dimensions are compatible with this timezone, e.g.:
   *
   * - `com.google.ads.publisher.api.service.reports.Dimension.DATE`
   * - `com.google.ads.publisher.api.service.reports.Dimension.WEEK`
   * - `com.google.ads.publisher.api.service.reports.Dimension.MONTH_AND_YEAR`
   */
  PUBLISHER = 'PUBLISHER',
  /**
   * Use the PT time zone. This time zone is only compatible with Ad Exchange metrics in Historical report type.
   *
   * Note: if your report includes "time unit" dimensions, only the PT "time unit" dimensions are compatible with this timezone, e.g.:
   *
   * - `com.google.ads.publisher.api.service.reports.Dimension.DATE_PT`
   * - `com.google.ads.publisher.api.service.reports.Dimension.WEEK_PT`
   * - `com.google.ads.publisher.api.service.reports.Dimension.MONTH_YEAR_PT`
   * - `com.google.ads.publisher.api.service.reports.Dimension.DAY_PT`
   */
  PACIFIC = 'PACIFIC',
}
