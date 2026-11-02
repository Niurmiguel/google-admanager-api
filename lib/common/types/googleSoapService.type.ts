/**
 * Options for the SOAP calls of a service. Pass them to the `AdManagerClient`
 * constructor (they apply to every service it creates) or to `getService`
 * (they override the client's for that service). All optional.
 */
export type SoapCallOptions = {
  /**
   * Maximum time for each call, in milliseconds, from sending the request to
   * having the parsed response. When it passes, the request is aborted and
   * the call rejects with an `AdManagerRequestError` whose `code` is
   * `ETIMEDOUT`. Default: 300 000 (5 minutes). `0` disables it.
   */
  timeout?: number;
  /**
   * Aborts the pending calls of the service, and makes later ones reject
   * right away. The calls reject with `signal.reason`.
   */
  signal?: AbortSignal;
};

export const SOAP_CALL_DEFAULTS = Object.freeze({
  timeout: 5 * 60_000,
});

/** setTimeout's largest delay; a bigger one fires after 1 ms. */
const MAX_TIMEOUT = 2 ** 31 - 1;

/** Throws a RangeError for a timeout that is not a whole number of milliseconds in [0, 2^31 - 1]. */
export function assertSoapCallOptions(options: SoapCallOptions | undefined): void {
  const timeout = options?.timeout;
  if (timeout !== undefined && !(Number.isInteger(timeout) && timeout >= 0 && timeout <= MAX_TIMEOUT)) {
    throw new RangeError(`Invalid timeout: ${timeout}`);
  }
}

export type GoogleSoapServiceOptions = SoapCallOptions & {
  /**
   * The network code of the network being addressed.
   */
  networkCode: number;
  /**
   * An arbitrary string name identifying your application.
   * This will be shown in Google's log files.
   * For example: "My Inventory Application" or "App_1".
   */
  applicationName: string;
  /**
   *  OAuth2 access token
   */
  token: string;
};
