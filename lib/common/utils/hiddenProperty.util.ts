/**
 * Sets `target[key]` as a non-enumerable property, so that JSON.stringify(),
 * Object.keys(), object spread and console.log() (without showHidden) skip
 * it. It stays writable and configurable: the class and its subclasses read
 * and assign it as usual, and an assignment keeps it non-enumerable.
 *
 * For fields that hold secrets (a private key, an access token) or objects
 * that do.
 */
export function setHiddenProperty(target: object, key: PropertyKey, value: unknown): void {
  Object.defineProperty(target, key, { value, writable: true, configurable: true, enumerable: false });
}
