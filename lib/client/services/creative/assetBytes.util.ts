/**
 * Raw bytes as base64, the encoding of an xsd:base64Binary. node-soap does not
 * encode anything: it would serialize a Buffer or a Uint8Array as one element
 * per byte and an ArrayBuffer as an empty element.
 */
function toBase64(value: ArrayBuffer | ArrayBufferView): string {
  const bytes = ArrayBuffer.isView(value)
    ? Buffer.from(value.buffer, value.byteOffset, value.byteLength)
    : Buffer.from(value);
  return bytes.toString('base64');
}

const isBinary = (value: unknown): value is ArrayBuffer | ArrayBufferView =>
  value instanceof ArrayBuffer || ArrayBuffer.isView(value);

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== 'object') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

/**
 * A copy of `value` where every `assetByteArray` holding raw bytes holds
 * them as base64 instead. Arrays and plain objects are copied (the caller's
 * objects are not modified); anything else is kept as is.
 */
export function encodeAssetBytes<T>(value: T): T {
  if (Array.isArray(value)) return value.map(encodeAssetBytes) as T;
  if (!isPlainObject(value)) return value;
  const out: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    out[key] = key === 'assetByteArray' && isBinary(child) ? toBase64(child) : encodeAssetBytes(child);
  }
  return out as T;
}
