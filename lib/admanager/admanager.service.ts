import { DEFAULT_APPLICATION_NAME, SERVICE_MAP } from '@common/constants';
import { GoogleSoapService } from './google-soap.service';
import { ApiVersion } from '@common/types';
import { SACredential } from '@auth';

export class AdManagerClient {
  private networkCode: number;
  private credential: SACredential;
  applicationName: string;

  constructor(
    networkCode: number,
    credential: SACredential,
    applicationName?: string,
  ) {
    this.networkCode = networkCode;
    this.credential = credential;
    this.applicationName = applicationName || DEFAULT_APPLICATION_NAME;
  }

  async getService<T extends ApiVersion, K extends keyof typeof SERVICE_MAP[T]>(
    version: T,
    serviceName: K,
  ) {
    try {
      const token = await this.credential.getToken();

      return await new GoogleSoapService(serviceName as string, {
        networkCode: this.networkCode,
        version,
        token: token as string,
        applicationName: this.applicationName,
      }).createClient();
    } catch (err) {
      console.log(err);
    }
  }
}
