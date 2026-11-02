import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { AdsReportsException, ArgumentNullException } from '../handlers';
import { isError, safeCause, Scrub, toRequestError } from './safeError.util';

/**
 * A report download URL is signed: its query (`Signature`, `GoogleAccessId`,
 * `Expires`...) is a credential. Errors show origin and path only.
 */
export function redactUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return '<invalid URL>';
  }
}

/** Removes `url` and its query from any text that quotes them. */
export function urlScrubber(url: string): Scrub {
  if (!url) return (text) => text;
  const redacted = redactUrl(url);
  // The query as written and as the URL parser normalizes it.
  const queries = new Set<string>();
  if (url.includes('?')) queries.add(url.slice(url.indexOf('?')).split('#')[0]);
  try {
    queries.add(new URL(url).search);
  } catch {
    // Not a URL: only the literal string can be removed.
  }
  queries.delete('');
  queries.delete('?');
  return (text) => {
    let out = text.split(url).join(redacted);
    for (const query of queries) out = out.split(query).join('');
    return out;
  };
}

/** An AdsReportsException with `inner` (already sanitized) as `innerException` and `cause`. */
export function reportException(message: string, inner: Error | undefined): AdsReportsException {
  const exception = new AdsReportsException(message, inner);
  if (inner !== undefined) {
    // Non-enumerable, like the `cause` the Error constructor sets.
    Object.defineProperty(exception, 'cause', { value: inner, writable: true, configurable: true, enumerable: false });
  }
  return exception;
}

/**
 * For errors raised while reading a report from `url`: a copy of `err`
 * without the request and with the URL's query removed from its messages.
 */
export function sanitizeDownloadError(err: unknown, url: string): Error | undefined {
  return isError(err) ? (safeCause(err, urlScrubber(url)) as Error) : undefined;
}

/**
 * Utility class for various HTTP tasks.
 */
export class HttpUtilities {
  /**
   * Starts a streamed GET of a report. If the request fails, it rejects with
   * an AdsReportsException whose message names the URL without its query,
   * and whose `innerException`/`cause` is an AdManagerRequestError with the
   * status and code, never the request (axios' errors carry the signed URL in
   * `config.url`, `toJSON()` and `request`).
   */
  static buildRequest(
    url: string,
    method: Method | string,
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<any, any>> {
    if (config == null) {
      throw new ArgumentNullException('config');
    }

    config.method = method;
    config.url = url;
    config.responseType = 'stream';

    return axios.request(config).catch((err: unknown) => {
      // An error response (e.g. 403) still holds an unread body: free its socket.
      const body = (err as { response?: { data?: { destroy?: () => void } } })?.response?.data;
      if (typeof body?.destroy === 'function') body.destroy();

      const inner = toRequestError(err, urlScrubber(url));
      throw reportException(`Failed to download the report from ${redactUrl(url)}: ${inner.message}`, inner);
    });
  }
}
