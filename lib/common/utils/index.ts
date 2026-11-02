import { AdManagerRequestError, toRequestError } from './safeError.util';

export { DateTimeUtilities } from './dateTimeUtilities.util';
export { StatementBuilder } from './statementBuilder.util';
export { HttpUtilities } from './httpUtilities.util';
export { AdManagerRequestError } from './safeError.util';
export type { SafeResponse } from './safeError.util';

/**
 * Error raised by node-soap. For SOAP faults its message is
 * `<faultcode>: <faultstring>[: <JSON of the fault detail>]`, `root` holds
 * the parsed envelope and `response` the HTTP response.
 */
type SoapError = Error & { response?: { status?: number }; root?: unknown };

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

/** A SOAP 1.1 fault as node-soap parses it. */
type ParsedFault = { faultcode: string; faultstring: string; detail: unknown };

const SERVER = 'soap:Server';
const CLIENT = 'soap:Client';
const MAX_DEPTH = 32;

/** node-soap gives an element with attributes as `{ attributes, $value }`. */
function textOf(value: unknown): string | undefined {
  if (typeof value === 'string') return value;
  const inner = (value as { $value?: unknown } | null | undefined)?.$value;
  return typeof inner === 'string' ? inner : undefined;
}

/**
 * The fault from the envelope node-soap attaches as `err.root`. Reading it is
 * exact; splitting the message is not, because the faultstring itself can
 * contain ": {" (Ad Manager echoes the offending value in it).
 */
function parsedFault(err: SoapError): ParsedFault | undefined {
  const fault = (err.root as { Envelope?: { Body?: { Fault?: Record<string, unknown> } } } | undefined)?.Envelope?.Body
    ?.Fault;
  if (fault === null || typeof fault !== 'object') return undefined;

  const faultcode = textOf(fault.faultcode);
  // An empty <faultstring/> is parsed as null.
  const faultstring = fault.faultstring == null ? '' : textOf(fault.faultstring);
  if (faultcode === undefined || faultstring === undefined) return undefined;

  const detail = (fault.detail as { $value?: unknown } | null | undefined)?.$value ?? fault.detail;
  return { faultcode, faultstring, detail: detail ?? undefined };
}

/** The first `xsi:type` attribute in document order, e.g. the type of the first ApiError. */
function firstXsiType(value: unknown, depth = 0): string | undefined {
  if (value === null || typeof value !== 'object' || depth > MAX_DEPTH) return undefined;
  const type = (value as { attributes?: Record<string, unknown> }).attributes?.['xsi:type'];
  if (typeof type === 'string') return type;
  for (const child of Object.values(value)) {
    const found = firstXsiType(child, depth + 1);
    if (found !== undefined) return found;
  }
  return undefined;
}

/** A server fault: `name` is the first error type in the detail, `details` a plain copy of it. */
function serverFault(code: number | undefined, message: string, detail: unknown): SoapFault {
  if (detail === undefined) return { code, name: '', message };
  let details: unknown;
  try {
    // The same plain data node-soap would have put in its message.
    details = JSON.parse(JSON.stringify(detail));
  } catch {
    details = detail;
  }
  return { code, name: firstXsiType(details) ?? '', message, details };
}

/** e.g. "Unmarshalling Error: cvc-complex-type.2.4.a: Invalid content..." -> name and the last part. */
function clientFault(code: number | undefined, faultstring: string): SoapFault {
  const parts = faultstring.split(': ');
  return { code, name: parts[0] ?? '', message: parts.slice(2).join(': ') || parts.slice(1).join(': ') };
}

/**
 * Fallback for an error without a parsed envelope: splits node-soap's
 * message. Ambiguous when the faultstring contains ": {".
 */
function faultFromMessage(code: number | undefined, message: string): SoapFault | undefined {
  if (message.startsWith(`${CLIENT}: `)) return clientFault(code, message.slice(CLIENT.length + 2));
  if (!message.startsWith(`${SERVER}: `)) return undefined;

  // node-soap appends ": <JSON detail>" only when the fault has a <detail>.
  const rest = message.slice(SERVER.length + 2);
  const detailStart = rest.indexOf(': {');
  if (detailStart === -1) return { code, name: '', message: rest };

  const json = rest.slice(detailStart + 2);
  try {
    return serverFault(code, rest.slice(0, detailStart), JSON.parse(json));
  } catch {
    // Not JSON after all: keep the raw text so the caller still sees it.
    return {
      code,
      name: json.match(/"xsi:type":"([^"]*)"/)?.[1] ?? '',
      message: rest.slice(0, detailStart),
      details: json,
    };
  }
}

/**
 * Maps a node-soap error to the value the returned promise rejects with:
 * a {@link SoapFault} for SOAP faults, an {@link AdManagerRequestError}
 * for everything else. The raw error is never passed on, because axios and
 * node-soap attach the request to it, Authorization header included.
 * It must never throw: it runs inside node-soap's callback, where an
 * exception would escape as an unhandled rejection and leave the caller's
 * promise pending forever.
 */
function toRejection(err: unknown): SoapFault | AdManagerRequestError {
  try {
    const message = (err as SoapError | undefined)?.message;
    if (typeof message !== 'string') return toRequestError(err);

    const code = (err as SoapError).response?.status;
    const fault = parsedFault(err as SoapError);
    if (fault?.faultcode === SERVER) return serverFault(code, fault.faultstring, fault.detail);
    if (fault?.faultcode === CLIENT) return clientFault(code, fault.faultstring);
    if (fault === undefined) {
      const mapped = faultFromMessage(code, message);
      if (mapped !== undefined) return mapped;
    }
  } catch {
    // A getter threw while reading the fault: treat it as a request error.
  }
  return toRequestError(err);
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
