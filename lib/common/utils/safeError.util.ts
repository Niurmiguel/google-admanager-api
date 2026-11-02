/**
 * Errors raised by axios and node-soap carry the whole request: `config`
 * (with the `Authorization: Bearer …` header and the URL), `request` (the
 * ClientRequest, whose raw header string holds the token) and
 * `response.config`/`response.request` (the same again). Anything that logs
 * or serializes one of those errors leaks the credential.
 *
 * Instead of redacting those objects in place, which means chasing every
 * nested copy (`_header`, follow-redirects' `_options`, sockets...), the
 * library rejects with a new error built from an allowlist of fields that
 * are known not to hold credentials.
 */

/** HTTP response data that is safe to expose: no `config`, no `request`. */
export type SafeResponse = {
  status?: number;
  statusText?: string;
  headers?: Record<string, unknown>;
  /** Response body, when it was read as text. */
  data?: unknown;
};

type RequestErrorFields = {
  cause?: unknown;
  /** Error code: `ECONNRESET`, `ECONNABORTED`, `ETIMEDOUT`, `ERR_CANCELED`... */
  code?: string;
  /** HTTP status of the response, when there was one. */
  status?: number;
  /** Response body, when node-soap read it (e.g. the HTML of a 401). */
  body?: string;
  response?: SafeResponse;
  /** The parsed SOAP envelope, when node-soap attached it. */
  root?: unknown;
  /** node-soap's `{ faultcode, faultstring, detail, statusCode }` for responses that are not valid XML. */
  Fault?: unknown;
};

/**
 * What an Ad Manager call rejects with when the failure is not a SOAP fault:
 * network errors, timeouts, HTTP errors and responses that cannot be parsed.
 * It keeps the fields callers use (`message`, `code`, `response.status`,
 * `body`) and never the request: no `config`, no `request`, no headers sent.
 * `cause` is a copy of the original error with the same allowlist.
 */
export class AdManagerRequestError extends Error {
  code?: string;
  status?: number;
  body?: string;
  response?: SafeResponse;
  root?: unknown;
  Fault?: unknown;

  constructor(message: string, fields: RequestErrorFields = {}) {
    const { cause, ...rest } = fields;
    super(message, cause === undefined ? undefined : { cause });
    this.name = 'AdManagerRequestError';
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) (this as Record<string, unknown>)[key] = value;
    }
  }
}

const MAX_DEPTH = 32;
const MAX_CAUSE_DEPTH = 8;

/**
 * Copies JSON-like data: primitives, arrays and plain objects. Anything else
 * (class instances such as sockets, requests or AxiosHeaders, functions) is
 * dropped, and so is anything nested deeper than MAX_DEPTH, which also stops
 * cycles.
 */
export function plainCopy(value: unknown, depth = 0): unknown {
  if (typeof value === 'function' || typeof value === 'symbol') return undefined;
  if (value === null || typeof value !== 'object') return value;
  if (depth >= MAX_DEPTH) return undefined;
  if (Array.isArray(value)) return value.map((item) => plainCopy(item, depth + 1));

  const proto = Object.getPrototypeOf(value);
  if (proto !== Object.prototype && proto !== null) return undefined;

  const copy: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value)) {
    const copied = plainCopy(item, depth + 1);
    if (copied !== undefined) copy[key] = copied;
  }
  return copy;
}

function asRecord(value: unknown): Record<string, any> | undefined {
  return value !== null && typeof value === 'object' ? (value as Record<string, any>) : undefined;
}

function safeHeaders(headers: unknown): Record<string, unknown> | undefined {
  const record = asRecord(headers);
  if (!record) return undefined;
  // AxiosHeaders is a class instance: turn it into a plain object first.
  const plain = typeof record.toJSON === 'function' ? record.toJSON() : record;
  return plainCopy({ ...plain }) as Record<string, unknown>;
}

/** Keeps status, status text, response headers and a text body. Drops `config` and `request`. */
export function safeResponse(response: unknown): SafeResponse | undefined {
  const res = asRecord(response);
  if (!res) return undefined;

  const safe: SafeResponse = {};
  if (typeof res.status === 'number') safe.status = res.status;
  if (typeof res.statusText === 'string') safe.statusText = res.statusText;
  const headers = safeHeaders(res.headers);
  if (headers) safe.headers = headers;
  if (typeof res.data === 'string') safe.data = res.data;
  return safe;
}

const ERROR_FIELDS = ['code', 'errno', 'syscall', 'address', 'port'] as const;

/**
 * Copies an Error keeping only name, message, stack, the system error fields
 * and, recursively, its own `cause` and `errors` (AggregateError). Non-Error
 * objects are not copied: they may be axios responses or configs.
 */
export function safeCause(err: unknown, depth = 0): unknown {
  if (err === null || (typeof err !== 'object' && typeof err !== 'function')) return err;
  if (!(err instanceof Error) || depth >= MAX_CAUSE_DEPTH) return undefined;

  const copy = new Error(err.message);
  copy.name = err.name;
  copy.stack = err.stack;
  const source = err as Error & Record<string, unknown>;
  for (const field of ERROR_FIELDS) {
    const value = source[field];
    if (typeof value === 'string' || typeof value === 'number')
      (copy as unknown as Record<string, unknown>)[field] = value;
  }
  if (source.cause !== undefined) {
    const cause = safeCause(source.cause, depth + 1);
    if (cause !== undefined) copy.cause = cause;
  }
  if (Array.isArray(source.errors)) {
    (copy as unknown as Record<string, unknown>).errors = source.errors.map((e) => safeCause(e, depth + 1));
  }
  return copy;
}

/**
 * Builds the error a failed request rejects with. Never throws: it runs
 * inside node-soap's callback, where an exception would leave the caller's
 * promise pending forever.
 */
export function toRequestError(err: unknown): AdManagerRequestError {
  const source = asRecord(err) ?? {};
  let message: string;
  try {
    message =
      typeof source.message === 'string'
        ? source.message
        : typeof source.Fault?.faultstring === 'string'
          ? source.Fault.faultstring
          : String(err);
  } catch {
    message = 'Request failed';
  }

  try {
    const response = safeResponse(source.response);
    const status = response?.status ?? (typeof source.status === 'number' ? source.status : undefined);
    return new AdManagerRequestError(message, {
      cause: safeCause(err),
      code: typeof source.code === 'string' ? source.code : undefined,
      status,
      body: typeof source.body === 'string' ? source.body : undefined,
      response,
      root: source.root instanceof Error ? safeCause(source.root) : plainCopy(source.root),
      Fault: plainCopy(source.Fault),
    });
  } catch {
    // A getter threw while copying: give up on the details, never on safety.
    return new AdManagerRequestError(message);
  }
}
