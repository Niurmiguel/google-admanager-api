export * from './googleSoapService.type';
export * from './statement.type';
export * from './date.type';

export type ImportClass<T, K extends keyof T> = T extends Record<K, infer S>
  ? S extends new (...args: any[]) => infer R
    ? R
    : never
  : never;
