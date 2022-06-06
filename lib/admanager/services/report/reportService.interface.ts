import {
  ReportDownloadOptions,
  ReportJob,
  SavedQueryPage,
} from './report.type';
import { Statement } from '../../../common/types';
import { ExportFormat, ReportJobStatus } from './report.enum';

/**
 * Provides methods for executing a {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService.ReportJob ReportJob}
 * and retrieving performance and statistics about ad campaigns, networks, inventory and sales.
 *
 * Follow the steps outlined below:
 *
 * - Create the ReportJob object by invoking {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService#runReportJob ReportService.runReportJob}.
 * - Poll the report job status using {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService#getReportJobStatus ReportService.getReportJobStatus}.
 * - Continue to poll until the status is equal to
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService.ReportJobStatus#COMPLETED ReportJobStatus.COMPLETED} or
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService.ReportJobStatus#FAILED ReportJobStatus.FAILED}.
 * - If successful, fetch the URL for downloading the report by invoking {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService#getReportDownloadURL ReportService.getReportDownloadURL}.
 *
 * **Test network behavior**
 *
 * The networks created using {@link https://developers.google.com/ad-manager/api/reference/v202202/NetworkService#makeTestNetwork NetworkService.makeTestNetwork}
 * are unable to provide reports that would be comparable to the production environment because reports require traffic history.
 * In the test networks, reports will consistently return no data for all reports.
 */
export interface ReportServiceOperations {
  /**
   * Returns the URL at which the report file can be downloaded.
   *
   * The report will be generated as a gzip archive, containing the report file itself.
   *
   * @param reportJobId the ID of the ReportJob
   * @param exportFormat the ExportFormat for the report file
   * @returns the URL for report file download
   */
  getReportDownloadURL(
    reportJobId: number,
    exportFormat: ExportFormat,
  ): Promise<string>;
  /**
   * Returns the URL at which the report file can be downloaded, and allows for customization of the downloaded report.
   * By default, the report will be generated as a gzip archive, containing the report file itself. This can be changed by setting
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService.ReportDownloadOptions#useGzipCompression ReportDownloadOptions.useGzipCompression} to false.
   *
   * @param reportJobId the ID of the ReportJob
   * @param reportDownloadOptions the ReportDownloadOptions for the request
   * @returns 	the URL for report file download
   */
  getReportDownloadUrlWithOptions(
    reportJobId: number,
    reportDownloadOptions: ReportDownloadOptions,
  ): Promise<string>;
  /**
   * Returns the {@link Returns the ReportJobStatus of the report job with the specified ID. ReportJobStatus} of the report job with the specified ID.
   *
   * @param reportJobId the action to perform
   * @returns 	the result of the action performed
   */
  getReportJobStatus(reportJobId: number): Promise<ReportJobStatus>;
  /**
   * Retrieves a page of the saved queries either created by or shared with the current user.
   * Each {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService.SavedQuery SavedQuery} in the page,
   * if it is compatible with the current API version,
   * will contain a {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService.ReportQuery ReportQuery}
   * object which can be optionally modified and used to create a {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService.ReportJob ReportJob}.
   * This can then be passed to {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService#runReportJob ReportService.runReportJob}.
   * The following fields are supported for filtering:
   *
   * | PQL Property | Object Property
   * | ------------ | --------------------------------------------------
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService.SavedQuery#id SavedQuery.id}
   * | name         | {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService.SavedQuery#name SavedQuery.name}
   *
   * @param filterStatement a Publisher Query Language statement used to filter which saved queries should be returned.
   * @returns a SavedQueryPage that contains all SavedQuery instances which satisfy the given statement.
   */
  getSavedQueriesByStatement(
    filterStatement: Statement,
  ): Promise<SavedQueryPage>;
  /**
   * Initiates the execution of a {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService.ReportQuery ReportQuery} on the server.
   *
   * The following fields are required:
   *
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/ReportService.ReportJob#reportQuery ReportJob.reportQuery }
   *
   * @param reportJob the report job to run
   * @returns the report job with its ID filled in
   */
  runReportJob(reportJob: ReportJob): Promise<ReportJob>;
}
