import { AxiosResponse } from 'axios';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

import { AdsReportsException, ArgumentNullException } from '../../handlers';
import { reportException, sanitizeDownloadError } from '../httpUtilities.util';
import { inactivityWatchdog, ReportDownload, saveTimeoutError } from './reportDownload';

/**
 * Represents a report response from the server.
 */
export class ReportResponse {
  private response: AxiosResponse<any, any>;

  /** Set when save() starts: the body is a stream and can only be read once. */
  private consumed = false;

  /** The download the response came from, when ReportUtilities created it. */
  private download: ReportDownload | undefined;

  /** Releases the connection of a response that save() has not started to read. */
  private releaseTimer: NodeJS.Timeout | undefined;

  /**
   * @param response The download response, with its body still unread.
   * @param download Set by ReportUtilities: the download `response` comes
   * from. save() then applies its inactivity timeout and signal, and an
   * unread response releases its connection after that timeout.
   */
  constructor(response: AxiosResponse<any, any>, download?: ReportDownload) {
    if (response == null) {
      throw new ArgumentNullException('Response cannot be null.');
    }

    this.response = response;
    this.download = download;

    const timeoutMs = download?.settings.timeoutMs ?? 0;
    if (timeoutMs > 0) {
      // Nobody reads the body until save(), so the connection would sit idle
      // for as long as the caller takes. Release it after the timeout; save()
      // then requests the report again. unref: an unread response must not
      // keep the process alive by itself.
      this.releaseTimer = setTimeout(() => download.close(), timeoutMs);
      this.releaseTimer.unref?.();
    }
  }

  /**
   * Saves the report to a specified path. It can be called only once per
   * response, even if it fails: call `getResponse()` again to download the
   * report again.
   *
   * When the response comes from `ReportUtilities.getResponse()`, its
   * `downloadTimeoutMs` applies from the moment save() is called: it fails if
   * the server sends nothing for that long. If save() is called later than
   * that after getResponse(), the connection has been released and save()
   * downloads the report again. Its `signal` cancels the download, and save()
   * then rejects with `signal.reason`.
   *
   * @param path The path to which report is saved.
   * @throws AdsReportsException if the download or the file fails, or if
   * save() was already called on this response.
   */
  public async save(path: string): Promise<void> {
    // Both before the first await, so a concurrent second call is rejected too.
    this.ensureStreamIsOpen();
    this.consumed = true;
    clearTimeout(this.releaseTimer);

    let download = this.download;
    const signal = download?.settings.signal;
    if (signal?.aborted) {
      download.close();
      throw signal.reason;
    }
    if (download?.isClosed) {
      // Released while unread: request the report again (rejects with an
      // AdsReportsException, or with signal.reason).
      download = await download.reopen();
    }

    const timeoutMs = download?.settings.timeoutMs ?? 0;
    let idle: AdsReportsException | undefined;
    const watchdog = inactivityWatchdog(timeoutMs, () => {
      idle = saveTimeoutError(timeoutMs);
      download.close(idle);
    });

    try {
      // pipeline, unlike .pipe(), propagates a download error (e.g. the
      // download timeout) to the file stream and rejects instead of hanging.
      await pipeline((download?.response ?? this.response).data, watchdog, createWriteStream(path));
      download?.finish();
    } catch (err) {
      download?.close();
      if (signal?.aborted) throw signal.reason;
      if (idle) throw idle;
      // The error may come from the download (axios attaches the signed URL)
      // or from the file: keep a sanitized copy only.
      throw reportException(
        'Failed to save report. See inner exception for more details.',
        sanitizeDownloadError(err, download?.url ?? String(this.response.config?.url ?? '')),
      );
    }
  }

  /**
   * Checks that nobody has read the response body yet. A second read would
   * get an exhausted (or destroyed) stream and write an empty file.
   */
  private ensureStreamIsOpen(): void {
    if (this.consumed) {
      throw new AdsReportsException(
        'The report response was already read: save() can be called only once per response, ' +
          'even after a failure. Call getResponse() again to download the report again.',
      );
    }
  }
}
