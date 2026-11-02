import { DEFAULT_APPLICATION_NAME, SERVICE_MAP } from '../common/constants';
import { GoogleSoapService } from './googleSoap.service';
import { assertSoapCallOptions, ImportClass, SOAP_CALL_DEFAULTS, SoapCallOptions } from '../common/types';
import { SACredential } from '../auth';
import { AdManagerRequestError, toRequestError } from '../common/utils/safeError.util';
import { Deadline } from '../common/utils/deadline.util';

/** The message getService() always had: `new Error(err)` in 0.0.6. */
function legacyMessage(err: unknown): string {
  return String(err);
}

export class AdManagerClient {
  private networkCode: number;
  private credential: SACredential;
  protected applicationName: string;
  private callOptions: SoapCallOptions;

  /**
   * @param options Timeout and cancellation of the SOAP calls of every service
   * this client creates. Optional; `getService` can override them.
   */
  constructor(networkCode: number, credential: SACredential, applicationName?: string, options: SoapCallOptions = {}) {
    assertSoapCallOptions(options);
    this.networkCode = networkCode;
    this.credential = credential;
    this.applicationName = applicationName || DEFAULT_APPLICATION_NAME;
    this.callOptions = { ...options };
  }

  /**
   * Gets the OAuth token, downloads the service's WSDL and returns the
   * service.
   *
   * @param options Timeout and cancellation of this service's calls; each one
   * that is set replaces the client's. They also bound getService() itself:
   * the token and the WSDL download together must finish within `timeout`,
   * or it rejects with an `AdManagerRequestError` whose `code` is
   * `ETIMEDOUT`; when `signal` aborts, it rejects with `signal.reason`.
   * @throws AdManagerRequestError when the token or the WSDL cannot be
   * obtained. Its message is the one it always had (`String(err)`), and its
   * `cause` a sanitized copy of the original error.
   */
  async getService<T extends keyof typeof SERVICE_MAP>(
    serviceName: T,
    options: SoapCallOptions = {},
  ): Promise<ImportClass<typeof SERVICE_MAP, T>> {
    assertSoapCallOptions(options);
    const callOptions = { ...this.callOptions };
    if (options.timeout !== undefined) callOptions.timeout = options.timeout;
    if (options.signal !== undefined) callOptions.signal = options.signal;
    callOptions.signal?.throwIfAborted();

    const timeout = callOptions.timeout ?? SOAP_CALL_DEFAULTS.timeout;
    const deadline = new Deadline(
      timeout,
      callOptions.signal,
      () =>
        new AdManagerRequestError(`getService('${serviceName}') timed out after ${timeout} ms`, { code: 'ETIMEDOUT' }),
    );

    try {
      // getToken() takes no signal: the token request is not cancelled, only no longer awaited.
      const token = await deadline.race(this.credential.getToken());

      return await deadline.race(
        new GoogleSoapService<T>(serviceName, {
          networkCode: this.networkCode,
          token: token as string,
          applicationName: this.applicationName,
          ...callOptions,
        }).createClient({ signal: deadline.signal }),
      );
    } catch (err: unknown) {
      if (deadline.signal.aborted) throw deadline.signal.reason;
      // Never the raw error: axios' carries the request (with a proxy's
      // Proxy-Authorization header), the token endpoint's carries its request.
      throw toRequestError(err, undefined, legacyMessage);
    } finally {
      deadline.dispose();
    }
  }
}
