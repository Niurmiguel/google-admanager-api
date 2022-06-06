import { BearerSecurity, Client, createClientAsync } from 'soap';

import { GoogleSoapServiceOptions, ImportClass } from '../common/types';
import { API_VERSION, SERVICE_MAP } from '../common/constants';
import { promiseFromCallback } from '../common/utils';

export class GoogleSoapService<T extends keyof typeof SERVICE_MAP> {
  private networkCode: number;
  private applicationName: string;
  private service: T;
  private token: string;
  private _client: Client;

  constructor(service: T, options: GoogleSoapServiceOptions) {
    this.service = service;
    this.applicationName = options.applicationName;
    this.networkCode = options.networkCode;
    this.token = options.token;
  }

  public async createClient(): Promise<ImportClass<typeof SERVICE_MAP, T>> {
    const self = this;
    const serviceUrl = `https://ads.google.com/apis/ads/publisher/${API_VERSION}/${this.service}?wsdl`;
    const client = await createClientAsync(serviceUrl);
    client.addSoapHeader(self.getSoapHeaders());
    client.setToken = function setToken(token: string) {
      client.setSecurity(new BearerSecurity(token));
    };

    if (this.token) client.setToken(self.token);

    this._client = new Proxy(client, {
      get: function get(target, propertyKey) {
        const method = propertyKey.toString();

        if (target.hasOwnProperty(method) && !['setToken'].includes(method)) {
          return async function run(dto: any = {}) {
            const res = await promiseFromCallback((cb) =>
              client[method](dto, cb),
            );

            return res?.rval || null;
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
    return {
      RequestHeader: {
        attributes: {
          'soapenv:actor': 'http://schemas.xmlsoap.org/soap/actor/next',
          'soapenv:mustUnderstand': 0,
          'xsi:type': 'ns1:SoapRequestHeader',
          'xmlns:ns1':
            'https://www.google.com/apis/ads/publisher/' + API_VERSION,
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/',
        },
        'ns1:networkCode': this.networkCode,
        'ns1:applicationName': this.applicationName,
      },
    };
  }
}
