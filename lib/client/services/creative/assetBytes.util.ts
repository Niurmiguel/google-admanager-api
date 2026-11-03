import { types } from 'node:util';

type Bytes = ArrayBufferLike | ArrayBufferView;

/**
 * Raw bytes as base64, the encoding of an xsd:base64Binary. node-soap does not
 * encode anything: it would serialize a Buffer or a Uint8Array as one element
 * per byte and an ArrayBuffer as an empty element.
 */
function toBase64(value: Bytes): string {
  const bytes = ArrayBuffer.isView(value)
    ? Buffer.from(value.buffer, value.byteOffset, value.byteLength)
    : Buffer.from(value);
  return bytes.toString('base64');
}

/**
 * Raw bytes, whatever realm they come from (`instanceof ArrayBuffer` is false
 * for an ArrayBuffer of another realm and for a SharedArrayBuffer).
 */
const isBinary = (value: unknown): value is Bytes => types.isAnyArrayBuffer(value) || ArrayBuffer.isView(value);

/**
 * A copy of `value` where every `assetByteArray` holding raw bytes holds
 * them as base64 instead.
 *
 * Every array and object is walked (plain objects, class instances and objects
 * of another realm alike), except raw bytes and dates. The caller's objects
 * are not modified: an object or array that leads to an encoded
 * `assetByteArray` is copied, with its prototype and property descriptors; any
 * other is returned as is. An object reached twice is copied once. A circular
 * reference is kept pointing to the caller's object (node-soap cannot
 * serialize cycles anyway).
 */
export function encodeAssetBytes<T>(value: T): T {
  const done = new Map<object, unknown>();
  const walking = new Set<object>();

  const walk = (node: unknown): unknown => {
    if (node === null || typeof node !== 'object' || isBinary(node) || types.isDate(node)) return node;
    if (done.has(node)) return done.get(node);
    if (walking.has(node)) return node;
    walking.add(node);

    let result: unknown = node;
    if (Array.isArray(node)) {
      const items = node.map(walk);
      if (items.some((item, i) => item !== node[i])) result = items;
    } else {
      const changed = new Map<string, unknown>();
      for (const [key, child] of Object.entries(node)) {
        const next = key === 'assetByteArray' && isBinary(child) ? toBase64(child) : walk(child);
        if (next !== child) changed.set(key, next);
      }
      if (changed.size) {
        const descriptors = Object.getOwnPropertyDescriptors(node);
        for (const [key, next] of changed) {
          descriptors[key] = { value: next, enumerable: true, writable: true, configurable: true };
        }
        result = Object.create(Object.getPrototypeOf(node), descriptors);
      }
    }

    walking.delete(node);
    done.set(node, result);
    return result;
  };

  return walk(value) as T;
}
