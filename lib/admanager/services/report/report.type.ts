import { PageResult, Statement, Date } from '../../../common/types';
import {
  Column,
  DateRangeType,
  Dimension,
  DimensionAttribute,
  ExportFormat,
  ReportQueryAdUnitView,
  TimeZoneType,
} from './report.enum';

/**
 * Represents the options for an API report download request.
 * See {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService#getReportDownloadUrlWithOptions ReportService.getReportDownloadUrlWithOptions}.
 */
export type ReportDownloadOptions = {
  /**
   * The ExportFormat used to generate the report. Default value is ExportFormat.CSV_DUMP.
   */
  exportFormat: ExportFormat;
  /**
   * Whether or not to include the report properties (e.g. network, user, date generated...) in the generated report. Default is false.
   */
  includeReportProperties: boolean;
  /**
   * Whether or not to include the totals row. Default is true for all formats except ExportFormat.CSV_DUMP.
   */
  includeTotalsRow: boolean;
  /**
   * Whether or not to compress the report file to a gzip file. Default is true.
   *
   * Regardless of value, gzip http compression is available from the URL by normal means.
   */
  useGzipCompression: boolean;
};

/**
 * A ReportQuery object allows you to specify the selection criteria for generating a report. Only reports with at least one Column are supported.
 */
export type ReportQuery = {
  /**
   * The list of break-down types being requested in the report. The generated report will contain the dimensions in the same order as requested. This field is required.
   */
  dimensions: Dimension[];
  /**
   * The ad unit view for the report. Defaults to AdUnitView.TOP_LEVEL.
   */
  adUnitView: ReportQueryAdUnitView;
  /**
   * The list of trafficking statistics and revenue information being requested in the report. The generated report will contain the columns in the same order as requested. This field is required.
   */
  columns: Column[];
  /**
   * The list of break-down attributes being requested in this report. Some DimensionAttribute values can only be used with certain Dimension values that must be included in the dimensions attribute. The generated report will contain the attributes in the same order as requested.
   */
  dimensionAttributes: DimensionAttribute[];
  /**
   * The list of CustomField.id being requested in this report. To add a CustomField to the report, you must include its corresponding Dimension, determined by the CustomField.entityType, as a dimension.
   */
  customFieldIds: number[];
  /**
   * The list of content CMS metadata key IDs being requested in this report. Each of these IDs must have been defined in the CMS metadata key. This will include dimensions in the form of CMS_METADATA_KEY[id]_ID and CMS_METADATA_KEY[id]_VALUE where where ID is the ID of the CMS metadata value and VALUE is the name.
   *
   * To add IDs, you must include Dimension.CMS_METADATA in dimensions, and specify a non-empty list of content CMS metadata key IDs. The order of content CMS metadata columns in the report correspond to the place of Dimension.CMS_METADATA in dimensions. For example, if dimensions contains the following dimensions in the order: Dimension.ADVERTISER_NAME, Dimension.CMS_METADATA and Dimension.COUNTRY_NAME, and cmsMetadataKeyIds contains the following IDs in the order: 1001 and 1002. The order of dimensions in the report will be: Dimension.ADVERTISER_NAME, Dimension.CMS_METADATA_KEY[1001]_VALUE, Dimension.CMS_METADATA_KEY[1002]_VALUE, Dimension.COUNTRY_NAME, Dimension.ADVERTISER_ID, Dimension.CMS_METADATA_KEY[1001]_ID, Dimension.CMS_METADATA_KEY[1002]_ID, Dimension.COUNTRY_CRITERIA_ID
   */
  cmsMetadataKeyIds: number[];

  /**
   * The list of custom dimension custom targeting key IDs being requested in this report. This will include dimensions in the form of TOP_LEVEL_DIMENSION_KEY[id]_ID and TOP_LEVEL_DIMENSION_KEY[id]_VALUE where ID is the ID of the custom targeting value and VALUE is the name.
   *
   * To add IDs, you must include Dimension.CUSTOM_DIMENSION in dimensions, and specify a non-empty list of custom targeting key IDs. The order of cusotm dimension columns in the report correspond to the place of Dimension.CUSTOM_DIMENSION in dimensions. For example, if dimensions contains the following dimensions in the order: Dimension.ADVERTISER_NAME, Dimension.CUSTOM_DIMENSION and Dimension.COUNTRY_NAME, and customCriteriaCustomTargetingKeyIds contains the following IDs in the order: 1001 and 1002. The order of dimensions in the report will be: Dimension.ADVERTISER_NAME, Dimension.TOP_LEVEL_DIMENSION_KEY[1001]_VALUE, Dimension.TOP_LEVEL_DIMENSION_KEY[1002]_VALUE, Dimension.COUNTRY_NAME, Dimension.ADVERTISER_ID, Dimension.TOP_LEVEL_DIMENSION_KEY[1001]_ID, Dimension.TOP_LEVEL_DIMENSION_KEY[1002]_ID, Dimension.COUNTRY_CRITERIA_ID.
   */
  customDimensionKeyIds: number[];
  /**
   * The start date from which the reporting information is gathered. The ReportQuery#dateRangeType field must be set to DateRangeType.CUSTOM_DATE in order to use this.
   */
  startDate: Date;

  /**
   * The end date upto which the reporting information is gathered. The ReportQuery#dateRangeType field must be set to DateRangeType.CUSTOM_DATE in order to use this.
   */
  endDate: Date;

  /**
   * The period of time for which the reporting data is being generated. In order to define custom time periods, set this to DateRangeType.CUSTOM_DATE. If set to DateRangeType.CUSTOM_DATE, then ReportQuery.startDate and ReportQuery.endDate will be used.
   */
  dateRangeType: DateRangeType;
  /**
   * Specifies a filter to use for reporting on data. This filter will be used in conjunction (joined with an AND statement) with the date range selected through dateRangeType,
   * startDate, and endDate. The syntax currently allowed for Statement.query is **[WHERE <condition> {AND <condition> ...}]**
   *
   * where property is the enumeration name of a Dimension that can be filtered.
   *
   * For example, the statement "WHERE LINE_ITEM_ID IN (34344, 23235)" can be used to generate a report for a specific set of line items
   *
   * Filtering on IDs is highly recommended over filtering on names, especially for geographical entities. When filtering on names, matching is case sensitive.
   */
  statement: Statement;
  /**
   * The currency for Ad Exchange revenue metrics. This field is only valid for Ad Exchange metrics,
   * and an exception will be thrown if this field is used with non-Ad Exchange metrics. Defaults to the network currency if left null.
   * The supported currency codes can be found in this Help Center article.
   */
  adxReportCurrency: string;
  /**
   * Gets the TimeZoneType for this report, which determines the time zone used for the report's date range. Defaults to TimeZoneType.PUBLISHER.
   */
  timeZoneType: TimeZoneType;
};

/**
 * Represents a report job that will be run to retrieve performance and statistics information about ad campaigns, networks, inventory and sales.
 */
export type ReportJob = {
  /**
   * The unique ID of the ReportJob. This value is read-only and is assigned by Google.
   */
  id: number;
  /**
   * Holds the filtering criteria.
   */
  reportQuery: ReportQuery;
};

/**
 * A saved ReportQuery representing the selection criteria for running a report.
 */
export type SavedQuery = {
  /**
   * The ID of the saved query.
   */
  id: number;
  /**
   * The name of the saved query.
   */
  name: string;
  /**
   * The ReportQuery representing the selection criteria for the saved query. This will be non-null if and only if SavedQuery.isCompatibleWithApiVersion is true.
   *
   * isCompatibleWithApiVersion:boolean
   *
   * Whether or not the saved query is compatible with the current API version. This will be true if and only if SavedQuery.reportQuery is non-null. A saved query will be incompatible with the API if it uses columns, dimensions, or other reporting features from the UI that are not available in the ReportQuery entity.
   */
  reportQuery: ReportQuery;
};

/**
 * A page of {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService.SavedQuery SavedQuery} objects.
 */
export type SavedQueryPage = PageResult<SavedQuery>;
