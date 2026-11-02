export { DateTimeUtilities } from './dateTimeUtilities.util';
export { StatementBuilder } from './statementBuilder.util';
export { HttpUtilities } from './httpUtilities.util';

/**
 * Error raised by node-soap. For SOAP faults its message is
 * `<faultcode>: <faultstring>[: <JSON of the fault detail>]` and `response`
 * holds the HTTP response.
 */
type SoapError = Error & { response?: { status?: number } };

/** What a rejected Ad Manager call rejects with when the server answered a SOAP fault. */
export type SoapFault = {
  /** HTTP status of the response that carried the fault. */
  code: number | undefined;
  /** Error type: the first `xsi:type` in the fault detail for server faults, the fault reason for client faults. */
  name: string;
  message: string;
  /** Parsed fault detail (an `ApiExceptionFault`), when the server sent one. */
  details?: unknown;
};

const SERVER_FAULT = 'soap:Server: ';
const CLIENT_FAULT = 'soap:Client: ';

/**
 * Maps a node-soap error to the value the returned promise rejects with.
 * It must never throw: it runs inside node-soap's callback, where an
 * exception would escape as an unhandled rejection and leave the caller's
 * promise pending forever.
 */
function toRejection(err: unknown): SoapFault | unknown {
  const message = (err as SoapError | undefined)?.message;
  if (typeof message !== 'string') return err;

  const code = (err as SoapError).response?.status;

  if (message.startsWith(CLIENT_FAULT)) {
    // e.g. "soap:Client: Unmarshalling Error: cvc-complex-type.2.4.a: Invalid content..."
    const parts = message.split(': ');
    return { code, name: parts[1] ?? '', message: parts.slice(3).join(': ') || parts.slice(2).join(': ') };
  }

  if (message.startsWith(SERVER_FAULT)) {
    // node-soap appends ": <JSON detail>" only when the fault has a <detail>.
    const rest = message.slice(SERVER_FAULT.length);
    const detailStart = rest.indexOf(': {');
    if (detailStart === -1) {
      return { code, name: '', message: rest };
    }

    const json = rest.slice(detailStart + 2);
    let details: unknown = json;
    try {
      details = JSON.parse(json);
    } catch {
      // Not JSON after all: keep the raw text so the caller still sees it.
    }

    return {
      code,
      name: json.match(/"xsi:type":"([^"]*)"/)?.[1] ?? '',
      message: rest.slice(0, detailStart),
      details,
    };
  }

  return err;
}

export function promiseFromCallback(fn: (callback: (err: Error, result: any) => void) => void): Promise<any> {
  return new Promise((resolve, reject) => {
    fn((err, result) => {
      if (err) {
        reject(toRejection(err));
        return;
      }

      resolve(result);
    });
  });
}
