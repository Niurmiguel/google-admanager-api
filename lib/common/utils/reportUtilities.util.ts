import { AxiosResponse } from 'axios';

import { ReportDownloadOptions } from '../../client/services/report/report.type';
import { ReportJobStatus } from '../../client/services/report/report.enum';
import { HttpUtilities } from './httpUtilities.util';
import { AdsReportUtilities, REPORT_RESPONSE_DEFAULTS, ReportResponse, ReportResponseOptions } from './reports';
import { ReportService } from '../../client';
import { AdsReportsException } from '../handlers';

export type { ReportResponseOptions } from './reports';

/**
 * Utility class for DFP API report downloads.
 */
export class ReportUtilities extends AdsReportUtilities {
  /**
   * The report service object to make calls with
   */
  private reportService: ReportService;

  /**
   * The ID of the report job to check
   */
  private reportJobId: number;

  /**
   * The options to use when downloading the completed report.
   */
  public reportDownloadOptions: ReportDownloadOptions;

  /**
   * @param reportService ReportService to be used
   * @param reportJobId The ID of the report job
   */
  constructor(reportService: ReportService, reportJobId: number) {
    super();
    this.reportService = reportService;
    this.reportJobId = reportJobId;
  }

  /**
   * Returns a flag indicating whether the caller should wait more time for
   * the report download to complete.
   * @returns True, if the caller should wait more, false otherwise.
   */
  async shouldWaitMore(): Promise<boolean> {
    const status: ReportJobStatus = await this.reportService.getReportJobStatus(this.reportJobId);

    if (status === ReportJobStatus.FAILED) {
      throw new AdsReportsException(`Report job ${this.reportJobId} failed.`);
    }

    return status != ReportJobStatus.COMPLETED;
  }

  protected describeJob(): string {
    return `Report job ${this.reportJobId}`;
  }

  /**
   * Gets the report response.
   * @returns The report response.
   */
  protected async getReport(options: ReportResponseOptions = {}): Promise<ReportResponse> {
    const response = await this.buildRequest(
      await this.reportService.getReportDownloadUrlWithOptions(this.reportJobId, this.reportDownloadOptions),
      options,
    );

    return new ReportResponse(response);
  }

  /**
   * Builds an HTTP request for downloading reports.
   * @param downloadUrl The download url.
   */
  private buildRequest(downloadUrl: string, options: ReportResponseOptions): Promise<AxiosResponse<any, any>> {
    return HttpUtilities.buildRequest(downloadUrl, 'GET', {
      // With a stream response axios' `timeout` acts as a socket inactivity timeout.
      timeout: options.downloadTimeoutMs ?? REPORT_RESPONSE_DEFAULTS.downloadTimeoutMs,
      signal: options.signal,
    });
  }
}
