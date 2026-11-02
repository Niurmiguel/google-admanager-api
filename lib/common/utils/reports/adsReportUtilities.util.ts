import { setTimeout as sleep } from 'node:timers/promises';

import { AdsReportsException } from '../../handlers';

/**
 * Options for {@link AdsReportUtilities.getResponse}. All of them are optional.
 */
export type ReportResponseOptions = {
  /** Wait before the second status check, in milliseconds (at most 2^31 - 1). Default: 5 000. */
  initialDelayMs?: number;
  /** Each wait is the previous one multiplied by this factor (>= 1). Default: 1.5. */
  backoffFactor?: number;
  /** Upper bound for a single wait, in milliseconds (at most 2^31 - 1). Default: 60 000. */
  maxDelayMs?: number;
  /**
   * How long to keep checking before giving up with an `AdsReportsException`,
   * in milliseconds. It also bounds the API calls made meanwhile (status
   * checks and getting the download URL): one still pending when it passes
   * is abandoned. Default: 1 800 000 (30 minutes). `Infinity` waits forever.
   */
  timeoutMs?: number;
  /**
   * Inactivity timeout of the download, in milliseconds. getResponse() fails
   * if the response headers do not arrive within it, and
   * `ReportResponse.save()` fails if the server sends nothing for this long
   * while it reads the report. It does not cap the total download time, and
   * it does not run between getResponse() and save(): a response that save()
   * has not started to read releases its connection after this time, and a
   * later save() downloads the report again.
   * Default: 60 000, at most 2^31 - 1. `0` disables it (an unread response then keeps its
   * connection until save() reads it).
   */
  downloadTimeoutMs?: number;
  /**
   * Cancels the wait, the pending API call and the download, including the
   * one `ReportResponse.save()` reads; getResponse() and save() then reject
   * with `signal.reason`.
   */
  signal?: AbortSignal;
};

export const REPORT_RESPONSE_DEFAULTS = Object.freeze({
  initialDelayMs: 5_000,
  backoffFactor: 1.5,
  maxDelayMs: 60_000,
  timeoutMs: 30 * 60_000,
  downloadTimeoutMs: 60_000,
});

/**
 * Bounds an API call made while waiting for a report: settles with the call,
 * or rejects as soon as the signal aborts or the deadline passes.
 */
export type ReportCallGuard = <T>(call: Promise<T>) => Promise<T>;

/** setTimeout's largest delay; a bigger one fires after 1 ms. */
const MAX_TIMER_MS = 2 ** 31 - 1;

/**
 * Settles with `call`, or rejects with `signal.reason` when the signal aborts,
 * or with `onDeadline()` when `deadline` (a Date.now() value) passes. The
 * call itself is not cancelled: it ends on its own SOAP timeout, and its
 * outcome is then ignored (it is still observed, so it never becomes an
 * unhandled rejection).
 */
function bounded<T>(
  call: Promise<T>,
  signal: AbortSignal | undefined,
  deadline: number,
  onDeadline: () => Error,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let timer: NodeJS.Timeout | undefined;
    const done = () => {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    };
    const onAbort = () => {
      done();
      reject(signal.reason);
    };

    call.then(
      (value) => {
        done();
        resolve(value);
      },
      (err) => {
        done();
        reject(err);
      },
    );

    if (signal?.aborted) return onAbort();
    signal?.addEventListener('abort', onAbort, { once: true });

    const remaining = deadline - Date.now();
    if (remaining <= MAX_TIMER_MS) {
      timer = setTimeout(
        () => {
          done();
          reject(onDeadline());
        },
        Math.max(0, remaining),
      );
    }
  });
}

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
  /**
   * Gets the report once the job is complete. `guard` bounds the API calls it
   * makes by the caller's signal and the remaining `timeoutMs`.
   */
  protected abstract getReport(options?: ReportResponseOptions, guard?: ReportCallGuard): any;

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

    // Waits are timers: a delay above MAX_TIMER_MS would fire after 1 ms, and
    // with no deadline the status checks would run in a tight loop.
    assertRange('initialDelayMs', initialDelayMs, initialDelayMs > 0 && initialDelayMs <= MAX_TIMER_MS);
    assertRange('backoffFactor', backoffFactor, backoffFactor >= 1 && Number.isFinite(backoffFactor));
    assertRange('maxDelayMs', maxDelayMs, maxDelayMs > 0 && maxDelayMs <= MAX_TIMER_MS);
    assertRange('timeoutMs', timeoutMs, timeoutMs >= 0);
    assertRange('downloadTimeoutMs', downloadTimeoutMs, downloadTimeoutMs >= 0 && downloadTimeoutMs <= MAX_TIMER_MS);
    signal?.throwIfAborted();

    const deadline = Date.now() + timeoutMs;
    let delay = Math.min(initialDelayMs, maxDelayMs);
    const timedOut = () => new AdsReportsException(`${this.describeJob()} did not complete within ${timeoutMs} ms.`);
    // Each API call has its own SOAP timeout, but it must not outlive the
    // caller's signal or deadline either.
    const guard: ReportCallGuard = (call) => bounded(call, signal, deadline, timedOut);

    this.schedule();
    while (await guard(this.shouldWaitMore())) {
      signal?.throwIfAborted();

      const remaining = deadline - Date.now();
      if (remaining <= 0) {
        throw timedOut();
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

    return this.getReport({ ...options, downloadTimeoutMs }, guard);
  }
}
