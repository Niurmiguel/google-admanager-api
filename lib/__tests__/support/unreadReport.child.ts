/**
 * Child process of unreadReportExit.spec: gets a report response from the
 * URL in argv[2] and never calls save(). Prints "ready" once it has it, then
 * returns: the process must exit right away, not after downloadTimeoutMs.
 */
import { ReportService } from '../../client';
import { ReportJobStatus } from '../../client/services/report/report.enum';
import { ReportUtilities } from '../../common/utils/reportUtilities.util';

const url = process.argv[2];
const downloadTimeoutMs = Number(process.argv[3]);

const reportService = {
  getReportJobStatus: async () => ReportJobStatus.COMPLETED,
  getReportDownloadUrlWithOptions: async () => url,
} as unknown as ReportService;

new ReportUtilities(reportService, 1).getResponse({ downloadTimeoutMs }).then(
  () => process.stdout.write('ready\n'),
  (err: unknown) => {
    process.stderr.write(`${String(err)}\n`);
    process.exitCode = 1;
  },
);
