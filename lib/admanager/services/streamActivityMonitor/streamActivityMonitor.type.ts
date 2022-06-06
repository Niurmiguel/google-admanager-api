import { DateTime } from '../../../common/types';
import {
  CreativeTranscodeIdType,
  ReportingType,
  SamErrorType,
} from './streamActivityMonitor.enum';

export type StreamCreateRequest = {
  url: string;

  userAgent: string;

  reportingType: ReportingType;
};

export type SamError = {
  samErrorType: SamErrorType;

  errorDetails: string;
};

export type AdResponse = {
  requestUrl: string;

  isVmapRequest: boolean;

  responseBody: string;

  redirectResponses: AdResponse[];

  samError: SamError;

  adErrors: SamError[];
};

export type CreativeTranscode = {
  adServer: string;

  creativeIdType: CreativeTranscodeIdType;

  creativeId: string;
};

export type AdDecisionCreative = {
  sequence: number;

  slateDurationMills: number;

  creativeDurationMills: number;

  creativeTranscode: CreativeTranscode;

  googleVideoId: string;

  samError: SamError;

  isTranscoded: boolean;
};

export type TrackingEventPing = {
  uri: string;

  hasError: boolean;
};

export type TrackingEvent = {
  pings: TrackingEventPing[];
};

export type AdBreak = {
  rootAdResponses: AdResponse[];

  adDecisionCreatives: AdDecisionCreative[];

  podNum: number;

  linearAbsolutePodNum: number;

  adBreakDurationMillis: number;

  filledDurationMillis: number;

  servedDurationMillis: number;

  startDateTime: DateTime;

  startTimeOffsetMillis: number;

  samError: SamError;

  midrollIndex: number;

  decisionedAds: boolean;

  trackingEvents: TrackingEvent[];
};

export type SamSession = {
  sessionId: string;

  isVodSession: boolean;

  streamCreateRequest: StreamCreateRequest;

  adBreaks: AdBreak[];

  startDateTime: DateTime;

  sessionDurationMillis: number;

  contentDurationMillis: number;
};
