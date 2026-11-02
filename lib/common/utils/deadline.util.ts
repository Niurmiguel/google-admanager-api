/**
 * Bounds the steps of an operation by a timeout and the caller's signal with
 * a single AbortController. Its `signal` aborts with the caller's
 * `signal.reason`, or with `onTimeout()` when `timeout` milliseconds pass
 * (`0` disables the timer), whichever comes first.
 *
 * Pass `signal` to the steps that can be cancelled (it closes their
 * connections) and wrap every step in `race()`, so that the operation settles
 * as soon as the deadline aborts even if a step ignores the signal. Call
 * `dispose()` in a `finally`: it clears the timer and removes the listener
 * from the caller's signal, which may be shared by many operations.
 */
export class Deadline {
  private readonly controller = new AbortController();
  private readonly timer: NodeJS.Timeout | undefined;
  private readonly callerSignal: AbortSignal | undefined;
  private readonly onCallerAbort = () => this.controller.abort(this.callerSignal?.reason);

  constructor(timeout: number, callerSignal: AbortSignal | undefined, onTimeout: () => unknown) {
    this.callerSignal = callerSignal;
    if (callerSignal?.aborted) {
      this.controller.abort(callerSignal.reason);
      return;
    }
    callerSignal?.addEventListener('abort', this.onCallerAbort, { once: true });
    if (timeout > 0) this.timer = setTimeout(() => this.controller.abort(onTimeout()), timeout);
  }

  get signal(): AbortSignal {
    return this.controller.signal;
  }

  /**
   * Settles like `step`, or rejects with the abort reason as soon as the
   * deadline aborts. `step` is not cancelled by this (pass it `signal` for
   * that); its late outcome is observed and ignored, so it never becomes an
   * unhandled rejection.
   */
  race<T>(step: Promise<T>): Promise<T> {
    const signal = this.controller.signal;
    return new Promise<T>((resolve, reject) => {
      const onAbort = () => reject(signal.reason);
      if (signal.aborted) onAbort();
      else signal.addEventListener('abort', onAbort, { once: true });

      step.then(
        (value) => {
          signal.removeEventListener('abort', onAbort);
          resolve(value);
        },
        (err: unknown) => {
          signal.removeEventListener('abort', onAbort);
          reject(err);
        },
      );
    });
  }

  dispose(): void {
    clearTimeout(this.timer);
    this.callerSignal?.removeEventListener('abort', this.onCallerAbort);
  }
}
