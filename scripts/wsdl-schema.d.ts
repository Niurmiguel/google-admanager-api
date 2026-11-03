// Types of scripts/wsdl-schema.js, for the TypeScript tests that use it.

export type WsdlEnum = { doc: string | null; values: { value: string; doc: string | null }[] };
export type WsdlField = { name: string; type: string; min: string; max: string };
export type WsdlType = { abstract: boolean; base: string | null; fields: WsdlField[] };
export type WsdlModel = {
  targetNamespace: string | null;
  enums: Record<string, WsdlEnum>;
  types: Record<string, WsdlType>;
  elements: Record<string, { type: string | null; fields: WsdlField[] }>;
  operations: Record<string, { input: string | null; output: string | null }>;
};

/** [name, type, isArray]. XML Schema types are prefixed with "xsd:". */
export type SchemaField = [name: string, type: string, isArray: boolean];
export type SchemaType = { abstract: boolean; base: string | null; fields: SchemaField[] };
export type WsdlSchema = {
  enums: Record<string, string[]>;
  types: Record<string, SchemaType>;
  services: Record<string, Record<string, { input: SchemaField[]; output: SchemaField[] }>>;
};

/** Library enum name -> WSDL enum names, for enums not named like the WSDL. */
export const LIB_ENUM_ALIASES: Readonly<Record<string, readonly string[]>>;

export function parseWsdl(xml: string): WsdlModel;
export function buildSchema(services: Record<string, WsdlModel>): WsdlSchema;
export function formatSchema(schema: WsdlSchema): string;
export function allFields<F>(types: Record<string, { base: string | null; fields: F[] }>, name: string): F[];
export function descendants(types: Record<string, { base: string | null }>, base: string): string[];
export function wsdlUrl(version: string, service: string): string;
