import { BearerSecurity, Client, createClientAsync } from 'soap';

import {
  assertSoapCallOptions,
  GoogleSoapServiceOptions,
  ImportClass,
  SOAP_CALL_DEFAULTS,
  SoapCallOptions,
} from '../common/types';
import { API_VERSION, SERVICE_MAP } from '../common/constants';
import { AdManagerRequestError, promiseFromCallback } from '../common/utils';
import { neutralizeRawXml } from '../common/utils/soapArgs.util';

export class GoogleSoapService<T extends keyof typeof SERVICE_MAP> {
  private networkCode: number;
  private applicationName: string;
  private service: T;
  private token: string;
  private callOptions: Required<Pick<SoapCallOptions, 'timeout'>> & Pick<SoapCallOptions, 'signal'>;
  private _client: Client;

  constructor(service: T, options: GoogleSoapServiceOptions) {
    assertSoapCallOptions(options);
    this.service = service;
    this.applicationName = options.applicationName;
    this.networkCode = options.networkCode;
    this.token = options.token;
    this.callOptions = {
      timeout: options.timeout ?? SOAP_CALL_DEFAULTS.timeout,
      signal: options.signal,
    };
  }

  public async createClient(): Promise<ImportClass<typeof SERVICE_MAP, T>> {
    const serviceUrl = `https://ads.google.com/apis/ads/publisher/${API_VERSION}/${this.service}?wsdl`;
    const client = await createClientAsync(serviceUrl);
    client.addSoapHeader(this.getSoapHeaders());
    client.setToken = function setToken(token: string) {
      client.setSecurity(new BearerSecurity(token));
    };

    if (this.token) client.setToken(this.token);

    const serviceName = this.service;
    const { timeout, signal } = this.callOptions;

    this._client = new Proxy(client, {
      get: function get(target, propertyKey) {
        const method = propertyKey.toString();

        if (target.hasOwnProperty(method) && !['setToken'].includes(method)) {
          return async function run(dto: any = {}) {
            signal?.throwIfAborted();
            // node-soap writes strings that look like CDATA unescaped: see soapArgs.util.
            const args = neutralizeRawXml(dto);

            // node-soap copies the call options into the axios request, so
            // aborting this controller cancels the HTTP request.
            const controller = new AbortController();
            const onAbort = () => controller.abort(signal.reason);
            signal?.addEventListener('abort', onAbort, { once: true });
            const timer = timeout > 0 ? setTimeout(() => controller.abort(), timeout) : undefined;

            try {
              const res = await promiseFromCallback((cb) => client[method](args, cb, { signal: controller.signal }));

              return res?.rval || null;
            } catch (err) {
              if (controller.signal.aborted) {
                if (signal?.aborted) throw signal.reason;
                throw new AdManagerRequestError(`${serviceName}.${method} timed out after ${timeout} ms`, {
                  code: 'ETIMEDOUT',
                });
              }
              throw err;
            } finally {
              clearTimeout(timer);
              signal?.removeEventListener('abort', onAbort);
            }
          };
        } else {
          return target[method];
        }
      },
    });

    const services = SERVICE_MAP as any;

    return new services[this.service](this._client);
  }

  private getSoapHeaders(): any {
    return neutralizeRawXml({
      RequestHeader: {
        attributes: {
          'soapenv:actor': 'http://schemas.xmlsoap.org/soap/actor/next',
          'soapenv:mustUnderstand': 0,
          'xsi:type': 'ns1:SoapRequestHeader',
          'xmlns:ns1': 'https://www.google.com/apis/ads/publisher/' + API_VERSION,
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
        },
        'ns1:networkCode': this.networkCode,
        'ns1:applicationName': this.applicationName,
      },
    });
  }
}
