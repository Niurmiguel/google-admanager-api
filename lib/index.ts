// commons
export * from './common/utils/dateTimeUtilities.util';
export * from './common/utils/statementBuilder.util';
export * from './common/utils/reportUtilities.util';
export * from './common/types/statement.type';
export * from './common/types/date.type';
export { AdManagerRequestError } from './common/utils/safeError.util';
export type { SafeResponse } from './common/utils/safeError.util';
export type { SoapFault } from './common/utils';
export type { SoapCallOptions } from './common/types/googleSoapService.type';
export {
  AdsReportsException,
  ArgumentNullException,
  BaseException,
  InvalidOperationException,
} from './common/handlers/exceptions.handler';
// The enums of ReportService, named one by one: `export *` would silently
// drop a name that another module also exports.
export {
  Column,
  DateRangeType,
  Dimension,
  DimensionAttribute,
  ExportFormat,
  ReportJobStatus,
  ReportQueryAdUnitView,
  TimeZoneType,
} from './client/services/report/report.enum';

// auth
export * from './auth';

// core
export * from './client';
// Not from client/services: its namespace is SERVICE_MAP, the names getService() accepts.
export * from './client/services/actions';
