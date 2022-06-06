import { DEFAULT_APPLICATION_NAME, SERVICE_MAP } from '../common/constants';
import { GoogleSoapService } from './googleSoap.service';
import { ImportClass } from '../common/types';
import { SACredential } from '../auth';

export class AdManagerClient {
  private networkCode: number;
  private credential: SACredential;
  protected applicationName: string;

  constructor(
    networkCode: number,
    credential: SACredential,
    applicationName?: string,
  ) {
    this.networkCode = networkCode;
    this.credential = credential;
    this.applicationName = applicationName || DEFAULT_APPLICATION_NAME;
  }

  async getService<T extends keyof typeof SERVICE_MAP>(
    serviceName: T,
  ): Promise<ImportClass<typeof SERVICE_MAP, T>> {
    try {
      const token = await this.credential.getToken();

      return await new GoogleSoapService<T>(serviceName, {
        networkCode: this.networkCode,
        token: token as string,
        applicationName: this.applicationName,
      }).createClient();
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
