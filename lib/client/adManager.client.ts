import { DEFAULT_APPLICATION_NAME, SERVICE_MAP } from '../common/constants';
import { GoogleSoapService } from './googleSoap.service';
import { assertSoapCallOptions, ImportClass, SoapCallOptions } from '../common/types';
import { SACredential } from '../auth';

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
   * @param options Timeout and cancellation of this service's calls; each one
   * that is set replaces the client's.
   */
  async getService<T extends keyof typeof SERVICE_MAP>(
    serviceName: T,
    options: SoapCallOptions = {},
  ): Promise<ImportClass<typeof SERVICE_MAP, T>> {
    assertSoapCallOptions(options);
    const callOptions = { ...this.callOptions };
    if (options.timeout !== undefined) callOptions.timeout = options.timeout;
    if (options.signal !== undefined) callOptions.signal = options.signal;

    try {
      const token = await this.credential.getToken();

      return await new GoogleSoapService<T>(serviceName, {
        networkCode: this.networkCode,
        token: token as string,
        applicationName: this.applicationName,
        ...callOptions,
      }).createClient();
    } catch (err: unknown) {
      // Same message as before (`new Error(err)`), with the original error kept as cause.
      throw new Error(String(err), { cause: err });
    }
  }
}
