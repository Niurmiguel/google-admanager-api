/**
 * node-soap escapes every string it serializes, except one that starts with
 * `<![CDATA[` and ends with `]]>`: that one goes into the envelope verbatim
 * (`xmlEscape` in soap/lib/utils). A single CDATA section is harmless, its
 * content is still text. But a string that closes the section early, e.g.
 *
 *   <![CDATA[a]]></value>...<query>WHERE 1=1</query>...<![CDATA[b]]>
 *
 * injects markup into the request. This module rewrites only those strings,
 * so that the server receives the original text, literally.
 *
 * What it does not cover (node-soap features that need objects, not strings,
 * from the caller):
 * - `$xml`: the value of an object's `$xml` key is written raw, by design.
 * - Element and attribute names: object keys are not escaped.
 * - Attribute values (`attributes: {...}`) that look like CDATA are written
 *   raw too, but CDATA is not allowed inside an attribute: the request is
 *   malformed and rejected, so it cannot inject. They are left untouched.
 */

const CDATA_START = '<![CDATA[';
const CDATA_END = ']]>';

/** node-soap's `attributesKey` and `xmlKey` defaults; the library does not change them. */
const ATTRIBUTES_KEY = 'attributes';
const XML_KEY = '$xml';

/** Whether node-soap would put `text` into the envelope unescaped AND it would end the CDATA section early. */
function isInjection(text: string): boolean {
  return (
    text.startsWith(CDATA_START) &&
    text.endsWith(CDATA_END) &&
    text.slice(CDATA_START.length, -CDATA_END.length).includes(CDATA_END)
  );
}

/**
 * Encodes any text as CDATA sections that decode back to exactly that text:
 * `]]>` is split across two sections, and `\r` goes out as `&#xD;` between
 * sections so that XML line-end normalization does not turn it into `\n`.
 * The result still starts with `<![CDATA[` and ends with `]]>`, so node-soap
 * passes it through as is.
 */
export function toCdata(text: string): string {
  const body = text.replace(/\]\]>|\r/g, (match) =>
    match === '\r' ? `${CDATA_END}&#xD;${CDATA_START}` : `]]${CDATA_END}${CDATA_START}>`,
  );
  return CDATA_START + body + CDATA_END;
}

function isOpaque(value: object): boolean {
  return (
    ArrayBuffer.isView(value) || // Buffer and typed arrays
    value instanceof ArrayBuffer ||
    value instanceof Date ||
    value instanceof RegExp ||
    value instanceof Map ||
    value instanceof Set ||
    value instanceof Promise
  );
}

function walk(value: unknown, ancestors: Set<object>): unknown {
  if (typeof value === 'string') return isInjection(value) ? toCdata(value) : value;
  if (value === null || typeof value !== 'object' || isOpaque(value)) return value;
  // A cycle: node-soap cannot serialize it either; leave it as it is.
  if (ancestors.has(value)) return value;

  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      let copy: unknown[] | undefined;
      value.forEach((item, index) => {
        const safe = walk(item, ancestors);
        if (safe !== item) {
          copy ??= value.slice();
          copy[index] = safe;
        }
      });
      return copy ?? value;
    }

    let copy: Record<string, unknown> | undefined;
    for (const key of Object.keys(value)) {
      if (key === ATTRIBUTES_KEY || key === XML_KEY) continue;
      const item = (value as Record<string, unknown>)[key];
      const safe = walk(item, ancestors);
      if (safe !== item) {
        // Keep the prototype: class instances stay instances of their class.
        copy ??= Object.assign(Object.create(Object.getPrototypeOf(value)), value) as Record<string, unknown>;
        copy[key] = safe;
      }
    }
    return copy ?? value;
  } finally {
    ancestors.delete(value);
  }
}

/**
 * Returns `args` with every string that would inject XML through node-soap's
 * CDATA pass-through rewritten as literal text. Copy on write: the caller's
 * object is never modified, and when nothing needs rewriting (the usual case)
 * the same reference is returned.
 */
export function neutralizeRawXml<T>(args: T): T {
  return walk(args, new Set()) as T;
}
