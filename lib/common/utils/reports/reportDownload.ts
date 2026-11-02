import { AxiosResponse } from 'axios';
import { Transform } from 'node:stream';

import { AdsReportsException } from '../../handlers';
import { HttpUtilities, redactUrl, reportException } from '../httpUtilities.util';
import { AdManagerRequestError, isError } from '../safeError.util';

/** How a report is downloaded. */
export type ReportDownloadSettings = {
  /** Inactivity timeout in milliseconds; `0` disables it. */
  timeoutMs: number;
  /** The caller's signal: it cancels the request, and later the body, until the download ends. */
  signal?: AbortSignal;
};

/** The cause of a download timeout, shaped like the error axios used to give. */
function timeoutCause(ms: number): AdManagerRequestError {
  return new AdManagerRequestError(`timeout of ${ms}ms exceeded`, { code: 'ECONNABORTED' });
}

type Body = { destroy?: (err?: Error) => void; destroyed?: boolean };

/**
 * One HTTP request for a report. It owns the request's AbortController, so
 * the timeout, the caller's signal and close() can end the request or its
 * body at any time, and it removes its listener from the caller's signal when
 * the download ends.
 *
 * The timeout is not axios' `timeout`: with a streamed response that one is a
 * socket inactivity timeout that keeps running after the headers, so it
 * destroyed a response nobody was reading yet, and a save() called later
 * failed. Here it runs only while something is waiting on the server: until
 * the headers arrive (open) and while the body is read (inactivityWatchdog).
 */
export class ReportDownload {
  /** The response, once the headers have arrived. */
  response: AxiosResponse<any, any> | undefined;

  private readonly controller = new AbortController();
  private closed = false;

  private constructor(
    /** The signed download URL. */
    readonly url: string,
    readonly settings: ReportDownloadSettings,
  ) {}

  /**
   * Requests the report and resolves when the response headers arrive.
   * Rejects with an AdsReportsException when the request fails or the headers
   * do not arrive within `timeoutMs`, and with `signal.reason` when the
   * signal aborts.
   */
  static async open(url: string, settings: ReportDownloadSettings): Promise<ReportDownload> {
    const download = new ReportDownload(url, settings);
    await download.start();
    return download;
  }

  /** Requests the same report again, with the same settings. */
  reopen(): Promise<ReportDownload> {
    return ReportDownload.open(this.url, this.settings);
  }

  get isClosed(): boolean {
    return this.closed;
  }

  private readonly onAbort = () => this.close(this.settings.signal?.reason);

  private async start(): Promise<void> {
    const { timeoutMs, signal } = this.settings;
    signal?.throwIfAborted();
    signal?.addEventListener('abort', this.onAbort, { once: true });

    const timer =
      timeoutMs > 0
        ? setTimeout(() => {
            const cause = timeoutCause(timeoutMs);
            this.close(
              reportException(`Failed to download the report from ${redactUrl(this.url)}: ${cause.message}`, cause),
            );
          }, timeoutMs)
        : undefined;
    try {
      this.response = await HttpUtilities.buildRequest(this.url, 'GET', { signal: this.controller.signal });
    } catch (err) {
      // When the timeout or the caller's signal ended the request, axios
      // rejects with a CanceledError: give the actual reason instead.
      const reason = this.abortReason();
      this.close();
      throw reason ?? err;
    } finally {
      clearTimeout(timer);
    }

    const reason = this.abortReason();
    if (reason !== undefined) {
      // Aborted just as the headers arrived.
      this.close();
      throw reason;
    }
  }

  /** Why the request was aborted by the timeout or the signal, if it was. */
  private abortReason(): unknown {
    const { signal } = this.settings;
    if (signal?.aborted) return signal.reason;
    return this.controller.signal.aborted ? this.controller.signal.reason : undefined;
  }

  /** The body has been read to the end: only stop listening to the signal. */
  finish(): void {
    this.closed = true;
    this.settings.signal?.removeEventListener('abort', this.onAbort);
  }

  /**
   * Ends the request, or destroys the body (with `reason`, if it is an Error),
   * which frees the connection. Idempotent.
   */
  close(reason?: unknown): void {
    if (this.closed) return;
    this.closed = true;
    this.settings.signal?.removeEventListener('abort', this.onAbort);

    // Destroy the body before aborting: axios would emit 'error' on it, and a
    // body that nobody reads yet has no listener for it.
    const body = this.response?.data as Body | undefined;
    if (typeof body?.destroy === 'function' && !body.destroyed) body.destroy(isError(reason) ? reason : undefined);
    if (!this.controller.signal.aborted) this.controller.abort(reason);
  }
}

/**
 * A pass-through stream that calls `onIdle` when no chunk goes through it for
 * `ms` milliseconds, counting from its creation. `0` disables it.
 */
export function inactivityWatchdog(ms: number, onIdle: () => void): Transform {
  const timer = ms > 0 ? setTimeout(onIdle, ms) : undefined;
  return new Transform({
    transform(chunk, _encoding, callback) {
      timer?.refresh();
      callback(null, chunk);
    },
    flush(callback) {
      clearTimeout(timer);
      callback();
    },
    destroy(err, callback) {
      clearTimeout(timer);
      callback(err);
    },
  });
}

/** The error save() rejects with when the server sends nothing for `ms`. */
export function saveTimeoutError(ms: number): AdsReportsException {
  return reportException(`Failed to save report: the server sent nothing for ${ms} ms.`, timeoutCause(ms));
}
