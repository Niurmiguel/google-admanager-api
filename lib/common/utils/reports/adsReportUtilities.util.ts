import { setTimeout as sleep } from 'node:timers/promises';

import { AdsReportsException } from '../../handlers';

/**
 * Options for {@link AdsReportUtilities.getResponse}. All of them are optional.
 */
export type ReportResponseOptions = {
  /** Wait before the second status check, in milliseconds. Default: 5 000. */
  initialDelayMs?: number;
  /** Each wait is the previous one multiplied by this factor (>= 1). Default: 1.5. */
  backoffFactor?: number;
  /** Upper bound for a single wait, in milliseconds. Default: 60 000. */
  maxDelayMs?: number;
  /**
   * How long to keep checking before giving up with an `AdsReportsException`,
   * in milliseconds. Default: 1 800 000 (30 minutes). `Infinity` waits forever.
   */
  timeoutMs?: number;
  /**
   * Inactivity timeout of the download, in milliseconds: it fails if the
   * server sends nothing for this long, while connecting or while the report
   * is read. It does not cap the total download time. Call
   * `ReportResponse.save()` right away: an unread response counts as idle.
   * Default: 60 000. `0` disables it.
   */
  downloadTimeoutMs?: number;
  /** Cancels the wait and the download request; the promise rejects with `signal.reason`. */
  signal?: AbortSignal;
};

export const REPORT_RESPONSE_DEFAULTS = Object.freeze({
  initialDelayMs: 5_000,
  backoffFactor: 1.5,
  maxDelayMs: 60_000,
  timeoutMs: 30 * 60_000,
  downloadTimeoutMs: 60_000,
});

function assertRange(name: string, value: number, valid: boolean): void {
  if (typeof value !== 'number' || Number.isNaN(value) || !valid) {
    throw new RangeError(`Invalid ${name}: ${value}`);
  }
}

export abstract class AdsReportUtilities {
  /**
   * Returns a flag indicating whether the caller should wait more time for
   * the report download to complete.
   * @returns True, if the caller should wait more, false otherwise.
   */
  protected async shouldWaitMore(): Promise<boolean> {
    return false;
  }

  protected schedule(): void {}
  protected abstract getReport(options?: ReportResponseOptions): any;

  /** Names the job in error messages. */
  protected describeJob(): string {
    return 'Report job';
  }

  /**
   * Waits for the report to complete, checking its status with exponential
   * backoff, and gets the report download response.
   * @param options Backoff, deadline, download timeout and cancellation. All optional.
   * @returns The report response.
   * @throws AdsReportsException if the job fails or is not complete before `timeoutMs`.
   */
  async getResponse(options: ReportResponseOptions = {}): Promise<any> {
    const defaults = REPORT_RESPONSE_DEFAULTS;
    const initialDelayMs = options.initialDelayMs ?? defaults.initialDelayMs;
    const backoffFactor = options.backoffFactor ?? defaults.backoffFactor;
    const maxDelayMs = options.maxDelayMs ?? defaults.maxDelayMs;
    const timeoutMs = options.timeoutMs ?? defaults.timeoutMs;
    const downloadTimeoutMs = options.downloadTimeoutMs ?? defaults.downloadTimeoutMs;
    const { signal } = options;

    assertRange('initialDelayMs', initialDelayMs, initialDelayMs > 0 && Number.isFinite(initialDelayMs));
    assertRange('backoffFactor', backoffFactor, backoffFactor >= 1 && Number.isFinite(backoffFactor));
    assertRange('maxDelayMs', maxDelayMs, maxDelayMs > 0 && Number.isFinite(maxDelayMs));
    assertRange('timeoutMs', timeoutMs, timeoutMs >= 0);
    assertRange('downloadTimeoutMs', downloadTimeoutMs, downloadTimeoutMs >= 0 && Number.isFinite(downloadTimeoutMs));
    signal?.throwIfAborted();

    const deadline = Date.now() + timeoutMs;
    let delay = Math.min(initialDelayMs, maxDelayMs);

    this.schedule();
    while (await this.shouldWaitMore()) {
      signal?.throwIfAborted();

      const remaining = deadline - Date.now();
      if (remaining <= 0) {
        throw new AdsReportsException(`${this.describeJob()} did not complete within ${timeoutMs} ms.`);
      }

      try {
        await sleep(Math.min(delay, remaining), undefined, { signal });
      } catch (err) {
        // Reject with the caller's reason, as fetch does, not with the timer's AbortError.
        if (signal?.aborted) throw signal.reason;
        throw err;
      }
      delay = Math.min(Math.round(delay * backoffFactor), maxDelayMs);
    }
    signal?.throwIfAborted();

    return this.getReport({ ...options, downloadTimeoutMs });
  }
}
