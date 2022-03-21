import { BearerSecurity, Client, createClientAsync } from 'soap';

import { ApiVersion, GoogleSoapServiceOptions } from '@common/types';
import { SERVICE_MAP } from '@common/constants';

export class GoogleSoapService<
  T extends ApiVersion,
  K extends keyof typeof SERVICE_MAP[T],
> {
  private version: T;
  private networkCode: number;
  private applicationName: string;
  private service: K;
  private token: string;
  private _client: Client;

  constructor(service: string, options: GoogleSoapServiceOptions) {
    this.applicationName = options.applicationName;
    this.version = options.version as T;
    this.networkCode = options.networkCode;
    this.service = service as K;
    this.token = options.token;
  }

  public async createClient() {
    const self = this;
    const serviceUrl = `https://ads.google.com/apis/ads/publisher/${this.version}/${this.service}?wsdl`;
    self._client = await createClientAsync(serviceUrl);
    self._client.addSoapHeader(self.getSoapHeaders());
    self._client.setToken = function setToken(token: string) {
      self._client.setSecurity(new BearerSecurity(token));
    };

    self._client.setToken(self.token);

    const client = new Proxy(self._client, {
      get: function get(target, propertyKey) {
        const method = propertyKey.toString();
        if (target.hasOwnProperty(method) && !['setToken'].includes(method)) {
          return async function run(dto: any = {}) {
            const res = await self.promiseFromCallback((cb) =>
              self._client[method](dto, cb),
            );

            return res.rval;
          };
        } else {
          return target[method];
        }
      },
    });

    const services = SERVICE_MAP[this.version] as any;

    return new services[this.service as string](client);
  }

  private promiseFromCallback(
    fn: (callback: (err: Error, result: any) => void) => void,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      fn((err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }

  private getSoapHeaders(): any {
    return {
      RequestHeader: {
        attributes: {
          'soapenv:actor': 'http://schemas.xmlsoap.org/soap/actor/next',
          'soapenv:mustUnderstand': 0,
          'xsi:type': 'ns1:SoapRequestHeader',
          'xmlns:ns1':
            'https://www.google.com/apis/ads/publisher/' + this.version,
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
        },
        'ns1:networkCode': this.networkCode,
        'ns1:applicationName': this.applicationName,
      },
    };
  }
}
