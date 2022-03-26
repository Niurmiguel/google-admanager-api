import { BearerSecurity, Client, createClientAsync } from 'soap';

import {
  ApiVersion,
  GoogleSoapServiceOptions,
  ImportClass,
} from '@common/types';
import { promiseFromCallback } from '@common/utils';
import { SERVICE_MAP } from '@common/constants';

export class GoogleSoapService<
  T extends ApiVersion,
  K extends keyof typeof SERVICE_MAP[T],
> {
  private version: ApiVersion;
  private networkCode: number;
  private applicationName: string;
  private service: string;
  private token: string;
  private _client: Client;

  constructor(service: string, options: GoogleSoapServiceOptions) {
    this.applicationName = options.applicationName;
    this.version = options.version;
    this.networkCode = options.networkCode;
    this.service = service;
    this.token = options.token;
  }

  public async createClient(): Promise<ImportClass<typeof SERVICE_MAP[T], K>> {
    const self = this;
    const serviceUrl = `https://ads.google.com/apis/ads/publisher/${this.version}/${this.service}?wsdl`;
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

    const services = SERVICE_MAP[this.version] as any;

    return new services[this.service as string](this._client);
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
