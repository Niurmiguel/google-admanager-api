import { DEFAULT_APPLICATION_NAME, SERVICE_MAP } from '@common/constants';
import { GoogleSoapService } from './google-soap.service';
import { ApiVersion, ImportClass } from '@common/types';
import { SACredential } from '@auth';

export class AdManagerClient {
  private networkCode: number;
  private credential: SACredential;
  protected applicationName: string;
  private version: ApiVersion = 'v202202';

  get apiVersion() {
    return this.version;
  }

  set apiVersion(version: ApiVersion) {
    this.version = version;
  }

  constructor(
    networkCode: number,
    credential: SACredential,
    applicationName?: string,
  ) {
    this.networkCode = networkCode;
    this.credential = credential;
    this.applicationName = applicationName || DEFAULT_APPLICATION_NAME;
  }

  async getService<
    K extends keyof typeof SERVICE_MAP[AdManagerClient['apiVersion']],
  >(
    serviceName: K,
  ): Promise<
    ImportClass<typeof SERVICE_MAP[AdManagerClient['apiVersion']], K>
  > {
    try {
      const token = await this.credential.getToken();

      return await new GoogleSoapService<AdManagerClient['apiVersion'], K>(
        serviceName as string,
        {
          networkCode: this.networkCode,
          version: this.version,
          token: token as string,
          applicationName: this.applicationName,
        },
      ).createClient();
    } catch (err) {
      throw new Error(err);
    }
  }
}
