import { AxiosResponse } from 'axios';
import * as stream from 'stream';
import { promisify } from 'util';
import * as fs from 'fs';

import { AdsReportsException, ArgumentNullException } from '../../handlers';

/**
 * Represents a report response from the server.
 */
export class ReportResponse {
  private response: AxiosResponse<any, any>;

  constructor(response: AxiosResponse<any, any>) {
    if (response == null) {
      throw new ArgumentNullException('Response cannot be null.');
    }

    this.response = response;
  }

  /**
   * Saves the report to a specified path
   *
   * @param path The path to which report is saved.
   */
  public async save(path: string): Promise<void> {
    this.ensureStreamIsOpen();

    const finishedDownload = promisify(stream.finished);
    const writer = fs.createWriteStream(path);

    try {
      this.response.data.pipe(writer);
      await finishedDownload(writer);
    } catch (err) {
      throw new AdsReportsException('Failed to save report. See inner exception for more details.', err as Error);
    }
  }

  /**
   * Checks to ensure that the underlying stream has not been closed.
   */
  private ensureStreamIsOpen(): void {
    if (this.response == null) {
      throw new AdsReportsException('Cannot access a closed report response stream.');
    }
  }
}
