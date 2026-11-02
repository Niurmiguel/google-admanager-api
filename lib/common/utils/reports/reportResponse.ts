import { AxiosResponse } from 'axios';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

import { AdsReportsException, ArgumentNullException } from '../../handlers';
import { reportException, sanitizeDownloadError } from '../httpUtilities.util';

/**
 * Represents a report response from the server.
 */
export class ReportResponse {
  private response: AxiosResponse<any, any>;

  /** Set when save() starts: the body is a stream and can only be read once. */
  private consumed = false;

  constructor(response: AxiosResponse<any, any>) {
    if (response == null) {
      throw new ArgumentNullException('Response cannot be null.');
    }

    this.response = response;
  }

  /**
   * Saves the report to a specified path. It can be called only once per
   * response, even if it fails: call `getResponse()` again to download the
   * report again.
   *
   * @param path The path to which report is saved.
   * @throws AdsReportsException if the download or the file fails, or if
   * save() was already called on this response.
   */
  public async save(path: string): Promise<void> {
    // Both before the first await, so a concurrent second call is rejected too.
    this.ensureStreamIsOpen();
    this.consumed = true;

    try {
      // pipeline, unlike .pipe(), propagates a download error (e.g. the
      // download timeout) to the file stream and rejects instead of hanging.
      await pipeline(this.response.data, createWriteStream(path));
    } catch (err) {
      // The error may come from the download (axios attaches the signed URL)
      // or from the file: keep a sanitized copy only.
      throw reportException(
        'Failed to save report. See inner exception for more details.',
        sanitizeDownloadError(err, String(this.response.config?.url ?? '')),
      );
    }
  }

  /**
   * Checks that nobody has read the response body yet. A second read would
   * get an exhausted (or destroyed) stream and write an empty file.
   */
  private ensureStreamIsOpen(): void {
    if (this.consumed) {
      throw new AdsReportsException(
        'The report response was already read: save() can be called only once per response, ' +
          'even after a failure. Call getResponse() again to download the report again.',
      );
    }
  }
}
