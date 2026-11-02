/**
 * Every service method performs a SOAP call and returns a promise at runtime,
 * so its declared return type must be a Promise. This is a compile-time check:
 * ts-jest fails the suite on type errors.
 */
import { SERVICE_MAP } from '../common/constants';

type ServiceName = keyof typeof SERVICE_MAP;
type IsAny<T> = 0 extends 1 & T ? true : false;

/** Names of the methods of C whose return type is not a Promise (or is `any`). */
type NonPromiseMethods<C> = {
  [K in keyof C]: C[K] extends (...args: any[]) => infer R
    ? IsAny<R> extends true
      ? K
      : R extends Promise<unknown>
        ? never
        : K
    : never;
}[keyof C];

/** "Service.method" for every offending method of every service. */
type Offenders = {
  [S in ServiceName]: `${S}.${NonPromiseMethods<InstanceType<(typeof SERVICE_MAP)[S]>> & string}`;
}[ServiceName];

describe('service method types', () => {
  it('declares every method of every service as returning a Promise', () => {
    // If any method is not, `true` is not assignable and compilation fails.
    // To list them: `const list: { [K in Offenders]: 1 } = {};` reports the missing keys.
    const noOffenders: [Offenders] extends [never] ? true : Offenders = true;

    expect(noOffenders).toBe(true);
  });
});
