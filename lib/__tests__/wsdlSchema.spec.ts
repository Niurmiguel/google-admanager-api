/**
 * The library checked against the v202608 WSDLs, offline, in both directions:
 *
 * - enums: the values of the WSDL, in its order, each key equal to its value;
 * - types: the fields of the WSDL (inherited ones included), no more,
 *   arrays where the WSDL says maxOccurs="unbounded", and of the WSDL type:
 *   the same primitive (string, number, boolean), enum or type. Read with
 *   the TypeScript checker from lib/ (types do not exist at runtime);
 * - actions: every action class of the WSDL is exported from the package
 *   root and its perform*Action call sends its xsi:type and its fields, in
 *   order (checked at runtime, with a client that only records);
 * - operations: the methods of each service are the operations of its WSDL.
 *
 * The WSDL side comes from fixtures/wsdl-schema.<version>.json, built by
 * scripts/wsdl-schema.js from the public WSDLs. The opt-in network spec
 * checks it against the live WSDLs and regenerates it:
 *
 *   ADMANAGER_NETWORK_TESTS=1 ADMANAGER_UPDATE_WSDL_FIXTURE=1 npx jest --config jestconfig.json wsdl.network
 *
 * Deliberate differences are listed below, each with its reason. An entry
 * that no longer applies fails too, so the lists cannot go stale.
 */
import { readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { Client } from 'soap';
import * as ts from 'typescript';

import * as root from '../index';
import { API_VERSION, SERVICE_MAP } from '../common/constants';
import { LIB_ENUM_ALIASES, SchemaField, WsdlSchema, allFields, descendants } from '../../scripts/wsdl-schema';

type ServiceName = keyof typeof SERVICE_MAP;

const TECHNOLOGY =
  'Targeting fields are typed Technology, as in the WSDL; this subtype only adds read-only fields ' +
  'that Ad Manager returns. Not modeled yet.';
const VALUE =
  "The library's Value is the JavaScript value that StatementBuilder converts into the right Value " +
  'subtype, not this SOAP type. Not modeled yet.';

/** WSDL types the library does not declare. */
const NOT_MODELED: Record<string, string> = {
  Asset: 'Abstract and without fields: RedirectAsset, its only subtype, stands for it.',
  BandwidthGroup: TECHNOLOGY,
  Browser: TECHNOLOGY,
  BrowserLanguage: TECHNOLOGY,
  DeviceCapability: TECHNOLOGY,
  DeviceCategory: TECHNOLOGY,
  DeviceManufacturer: TECHNOLOGY,
  MobileCarrier: TECHNOLOGY,
  MobileDevice: TECHNOLOGY,
  MobileDeviceSubmodel: TECHNOLOGY,
  OperatingSystem: TECHNOLOGY,
  OperatingSystemVersion: TECHNOLOGY,
  BooleanValue: VALUE,
  ChangeHistoryValue: VALUE,
  DateTimeValue: VALUE,
  DateValue: VALUE,
  NumberValue: VALUE,
  ObjectValue: VALUE,
  SetValue: VALUE,
  TargetingValue: VALUE,
  TextValue: VALUE,
  LinearStreamCreateRequest:
    'SamSession.streamCreateRequest is read-only and typed with the fields of the abstract StreamCreateRequest.',
  VodStreamCreateRequest:
    'SamSession.streamCreateRequest is read-only and typed with the fields of the abstract StreamCreateRequest.',
};

/** WSDL types whose library namesake means something else: not compared. */
const NOT_COMPARED: Record<string, string> = {
  Value: VALUE,
};

/** WSDL enums the library does not declare. */
const NOT_MODELED_ENUMS: Record<string, string> = {
  ChangeHistoryEntityType: 'Only used by ChangeHistoryValue (PQL change history rows), which is not modeled.',
  ChangeHistoryOperation: 'Only used by ChangeHistoryValue (PQL change history rows), which is not modeled.',
};

/** WSDL type name -> library type name, when it is not the WSDL name without dots. */
const TYPE_ALIASES: Record<string, string> = {
  'BreakTemplate.BreakTemplateMember': 'BreakTemplateMember',
};

/**
 * Hierarchies the library flattens the wrong way round: the base type
 * declares the fields of every subtype (an intersection) and the subtypes
 * lack the inherited ones. Fixing that changes how every one of these types
 * reads, so it is left for a later version; until then each hierarchy is
 * compared as a whole: the union of the fields of the base and its subtypes.
 * Each type of the hierarchy must still declare its own (not inherited) fields.
 */
const INVERTED_HIERARCHIES: Record<string, string> = {
  Creative: 'Creative declares the fields of every creative type; ImageCreative and the rest lack the inherited ones.',
  CustomField: 'CustomField declares DropDownCustomField.options; DropDownCustomField lacks the inherited fields.',
  BaseCustomFieldValue:
    'BaseCustomFieldValue declares the fields of CustomFieldValue and DropDownCustomFieldValue; they lack customFieldId.',
  CreativeTemplateVariable:
    'CreativeTemplateVariable declares the fields of its subtypes; they lack label, uniqueName, description and isRequired.',
  BaseCreativeTemplateVariableValue:
    'BaseCreativeTemplateVariableValue declares the fields of its subtypes (value is number & string, so never); ' +
    'they lack uniqueName.',
};

/** CreativeAsset.assetByteArray: raw bytes or a base64 string. */
const BASE64_BINARY_KINDS = 'string | type ArrayBuffer | type ArrayBufferView | type SharedArrayBuffer';

const LIB_VALUE =
  "Typed with the library's Value, which includes arrays (StatementBuilder sends them as a SetValue): " +
  'not an array of values.';

const NEVER =
  'The base type intersects the subtypes, so this field is number & string, never (see INVERTED_HIERARCHIES). ' +
  'Each subtype declares it with its own type, which is checked.';

/** `Type.field` differences from the WSDL: missing, extra, or with the wrong cardinality or type. */
const KNOWN_FIELD_DIFFERENCES: Record<string, string> = {
  'String_ValueMapEntry.value': LIB_VALUE,
  'BaseCustomFieldValue.value': LIB_VALUE,
  'CustomFieldValue.value': LIB_VALUE,
  'CreativeTemplateVariable.defaultValue': NEVER,
  'BaseCreativeTemplateVariableValue.value': NEVER,
};

/** `Service.Action` differences, at runtime. */
const KNOWN_ACTION_DIFFERENCES: Record<string, string> = {};

const ROOT = join(__dirname, '..', '..');
const schema: WsdlSchema = JSON.parse(
  readFileSync(join(__dirname, 'fixtures', `wsdl-schema.${API_VERSION}.json`), 'utf8'),
);
const serviceNames = Object.keys(SERVICE_MAP).sort() as ServiceName[];

// --- the library, as the TypeScript checker sees it ---

type LibEnum = { name: string; at: string; members: [key: string, value: string | undefined][] };
/**
 * What a property holds, the array aside: `string`, `number`, `boolean`,
 * `enum <Name>` or `type <Name>`, with the type itself for the last one.
 */
type Kind = { label: string; type?: ts.Type };
/** `kinds`: one per member of a union, sorted by label. */
type LibProp = { name: string; isArray: boolean; kinds: Kind[]; at: string };
type LibType = { name: string; at: string; union: boolean; props: LibProp[]; type: ts.Type };
type LibClass = { name: string; at: string; heritage: string[]; abstract: boolean };

function readLibrary() {
  const config = ts.getParsedCommandLineOfConfigFile(
    join(ROOT, 'tsconfig.json'),
    {},
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic: (d) => {
        throw new Error(ts.flattenDiagnosticMessageText(d.messageText, '\n'));
      },
    },
  );
  const files = config.fileNames.filter((f) => !f.includes('/__tests__/'));
  const program = ts.createProgram(files, config.options);
  const checker = program.getTypeChecker();
  const at = (node: ts.Node) => {
    const sf = node.getSourceFile();
    return `${relative(ROOT, sf.fileName)}:${sf.getLineAndCharacterOfPosition(node.getStart()).line + 1}`;
  };
  const isArray = (t: ts.Type): boolean =>
    checker.isArrayType(t) || checker.isTupleType(t) || (t.isUnion() && t.types.some(isArray));
  const kindsOf = (t: ts.Type): Kind[] => {
    const F = ts.TypeFlags;
    if (t.flags & (F.Undefined | F.Null)) return [];
    // Without a type to compare: never the same as a WSDL type.
    if (t.flags & (F.Any | F.Unknown)) return [{ label: checker.typeToString(t) }];
    if (t.flags & F.BooleanLike) return [{ label: 'boolean' }];
    // A string enum is a union of its members; a single member is a literal of it.
    if (t.flags & F.EnumLike || (t.isUnion() && t.types.every((m) => m.flags & F.EnumLiteral))) {
      return [{ label: `enum ${checker.typeToString(t).split('.')[0]}` }];
    }
    // A named union is the type it names (the library's Value is a recursive one).
    if (t.isUnion() && t.aliasSymbol) return [{ label: `type ${t.aliasSymbol.name}`, type: t }];
    if (t.isUnion()) {
      const kinds = new Map(t.types.flatMap(kindsOf).map((k) => [k.label, k]));
      return [...kinds.values()].sort((a, b) => a.label.localeCompare(b.label));
    }
    if (checker.isArrayType(t)) return kindsOf(checker.getTypeArguments(t as ts.TypeReference)[0]);
    if (t.flags & F.StringLike) return [{ label: 'string' }];
    if (t.flags & F.NumberLike) return [{ label: 'number' }];
    // An alias can be lost (`{} & {...}` is simplified to its second part): the
    // name is only a hint, see sameType.
    return [{ label: `type ${t.aliasSymbol?.name ?? t.symbol?.name ?? checker.typeToString(t)}`, type: t }];
  };
  /** Structurally the same type: each is assignable to the other. */
  const sameType = (a: ts.Type, b: ts.Type) => checker.isTypeAssignableTo(a, b) && checker.isTypeAssignableTo(b, a);

  const enums = new Map<string, LibEnum[]>();
  const types = new Map<string, LibType[]>();
  const classes: LibClass[] = [];
  const add = <T>(map: Map<string, T[]>, name: string, value: T) => map.set(name, [...(map.get(name) ?? []), value]);

  for (const sf of program.getSourceFiles()) {
    if (!files.includes(sf.fileName)) continue;
    for (const node of sf.statements) {
      if (ts.isEnumDeclaration(node)) {
        add(enums, node.name.text, {
          name: node.name.text,
          at: at(node),
          members: node.members.map((m) => [
            m.name.getText(sf),
            m.initializer && ts.isStringLiteral(m.initializer) ? m.initializer.text : undefined,
          ]),
        });
      } else if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
        const type = checker.getTypeAtLocation(node.name);
        // A union of object types declares the fields of all its members.
        const parts = type.isUnion() ? type.types : [type];
        const props = new Map<string, LibProp>();
        for (const part of parts) {
          for (const sym of checker.getPropertiesOfType(part)) {
            const decl = sym.declarations?.[0];
            if (!decl || props.has(sym.getName())) continue;
            const propType = checker.getTypeOfSymbolAtLocation(sym, decl);
            props.set(sym.getName(), {
              name: sym.getName(),
              isArray: isArray(propType),
              kinds: kindsOf(propType),
              at: at(decl),
            });
          }
        }
        add(types, node.name.text, {
          name: node.name.text,
          at: at(node),
          union: type.isUnion(),
          props: [...props.values()],
          type,
        });
      } else if (ts.isClassDeclaration(node) && node.name) {
        classes.push({
          name: node.name.text,
          at: at(node),
          heritage: (node.heritageClauses ?? []).flatMap((h) => h.types.map((x) => x.expression.getText(sf))),
          abstract: node.modifiers?.some((m) => m.kind === ts.SyntaxKind.AbstractKeyword) ?? false,
        });
      }
    }
  }
  return { enums, types, classes, sameType };
}

const dotless = (name: string) => name.replace(/\./g, '');

/** Library enum names for a WSDL enum. */
function libEnumNamesFor(wsdlName: string): string[] {
  const aliases = Object.entries(LIB_ENUM_ALIASES)
    .filter(([, wsdl]) => wsdl.includes(wsdlName))
    .map(([lib]) => lib);
  return aliases.length ? aliases : [dotless(wsdlName)];
}

/** WSDL names of the action types: the Action parameter of every perform* operation and its subtypes. */
function actionTypes(): { service: ServiceName; op: string; param: string; base: string; actions: string[] }[] {
  const out = [];
  for (const service of serviceNames) {
    for (const [op, { input }] of Object.entries(schema.services[service])) {
      if (!op.startsWith('perform')) continue;
      const [param, base] = input.find(([, type]) => /Action$/.test(type)) ?? [];
      if (!base) throw new Error(`${service}.${op}: no Action parameter`);
      const actions = descendants(schema.types, base).filter((n) => !schema.types[n].abstract);
      out.push({ service, op, param, base, actions });
    }
  }
  return out;
}

/** A value of the WSDL type, for the setters of an action. */
function sample([, type]: SchemaField): unknown {
  if (type === 'xsd:boolean') return true;
  if (/^xsd:(long|int|double|float)$/.test(type)) return 7;
  if (type.startsWith('xsd:')) return 'x';
  if (schema.enums[type]) return schema.enums[type].find((v) => v !== 'UNKNOWN');
  return { probe: true };
}

/** Records what a service sends instead of sending it. */
function recordingService(name: ServiceName) {
  const sent: { op: string; args: Record<string, any> }[] = [];
  const recorder = new Proxy(
    {},
    {
      get: (_target, op) => async (args: Record<string, any>) => {
        sent.push({ op: String(op), args });
        return null;
      },
    },
  ) as unknown as Client;
  const Service = SERVICE_MAP[name] as unknown as new (client: Client) => Record<string, (...a: unknown[]) => unknown>;
  return { service: new Service(recorder), sent };
}

/** Fails on exception entries that no longer match any difference. */
function expectNoStaleEntries(list: Record<string, string>, used: Set<string>, label: string) {
  expect(
    Object.keys(list)
      .filter((k) => !used.has(k))
      .map((k) => `${label} entry no longer needed: ${k}`),
  ).toEqual([]);
}

describe(`library matches the ${API_VERSION} WSDL schema`, () => {
  let lib: ReturnType<typeof readLibrary>;
  const actions = actionTypes();
  const actionTypeNames = new Set(actions.flatMap((a) => [a.base, ...descendants(schema.types, a.base)]));
  const hierarchyOf = new Map<string, string>();
  for (const rootType of Object.keys(INVERTED_HIERARCHIES)) {
    for (const t of [rootType, ...descendants(schema.types, rootType)]) hierarchyOf.set(t, rootType);
  }
  const usedFieldDifferences = new Set<string>();
  const usedNotModeled = new Set<string>();

  beforeAll(() => {
    lib = readLibrary();
  }, 60_000);

  it('covers every service', () => {
    expect(Object.keys(schema.services).sort()).toEqual(serviceNames);
  });

  describe('enums', () => {
    it.each(Object.keys(schema.enums))('%s has the WSDL values', (wsdlName) => {
      const names = libEnumNamesFor(wsdlName);
      const decls = names.flatMap((n) => lib.enums.get(n) ?? []);
      if (wsdlName in NOT_MODELED_ENUMS) {
        expect(decls.map((d) => `${d.name} is declared at ${d.at}: remove it from NOT_MODELED_ENUMS`)).toEqual([]);
        return;
      }
      expect(decls.map((d) => d.name)).not.toEqual([]);
      for (const decl of decls) {
        expect({ enum: decl.name, values: decl.members.map(([, v]) => v) }).toEqual({
          enum: decl.name,
          values: schema.enums[wsdlName],
        });
        expect(decl.members.filter(([k, v]) => k !== v).map(([k, v]) => `${decl.at}: ${k} = '${v}'`)).toEqual([]);
      }
    });

    it('declares no enum the WSDLs do not have', () => {
      const known = new Set(Object.keys(schema.enums).flatMap(libEnumNamesFor));
      const extra = [...lib.enums.values()].flat().filter((e) => !known.has(e.name));
      expect(extra.map((e) => `${e.name} at ${e.at}`)).toEqual([]);
    });
  });

  describe('types', () => {
    const plainTypes = Object.keys(schema.types).filter((t) => !actionTypeNames.has(t) && !hierarchyOf.has(t));

    /**
     * Whether a library property holds what a WSDL field type says: the same
     * primitive (string, number or boolean), the enum, or the type. A type
     * matches by name or, when TypeScript lost the name, by structure; a field
     * of an abstract type may hold a union of the type and its subtypes.
     */
    function holds(kinds: Kind[], type: string): boolean {
      const labels = kinds.map((k) => k.label).join(' | ');
      if (type === 'xsd:string') return labels === 'string';
      if (/^xsd:(int|long|double|float)$/.test(type)) return labels === 'number';
      if (type === 'xsd:boolean') return labels === 'boolean';
      if (type === 'xsd:base64Binary') return labels === BASE64_BINARY_KINDS;
      if (type.startsWith('xsd:')) throw new Error(`no rule for ${type}`);
      if (schema.enums[type]) return libEnumNamesFor(type).some((n) => labels === `enum ${n}`);
      const allowed = [type, ...descendants(schema.types, type)].map((t) => TYPE_ALIASES[t] ?? dotless(t));
      return (
        kinds.length > 0 &&
        kinds.every(
          (k) =>
            k.type &&
            (allowed.includes(k.label.slice('type '.length)) ||
              allowed.some((n) => (lib.types.get(n) ?? []).some((d) => lib.sameType(k.type!, d.type)))),
        )
      );
    }

    /**
     * Cardinality and type of a library property against the WSDL fields of
     * that name (several in a hierarchy: it has to match one of them).
     */
    function fieldDifferences(owner: string, variants: SchemaField[], p: LibProp): string[] {
      const name = variants[0][0];
      if (variants.some(([, type, isArray]) => p.isArray === isArray && holds(p.kinds, type))) return [];
      const wsdl = [...new Set(variants.map(([, type, isArray]) => `${type}${isArray ? '[]' : ''}`))].join(' or ');
      const own = `${p.kinds.map((k) => k.label).join(' | ') || 'nothing'}${p.isArray ? '[]' : ''}`;
      return [`${owner}.${name}: ${wsdl} in the WSDL, ${own} in the library (${p.at})`];
    }

    /**
     * Missing/extra fields, cardinality and type of library declarations against
     * WSDL fields. With `partial`, only extra fields, cardinality and type: a
     * union of subtypes declares a field when one of its members does.
     */
    function differences(owner: string, wsdlFields: SchemaField[], libTypes: LibType[], partial = false): string[] {
      const out: string[] = [];
      const byName = new Map<string, SchemaField[]>();
      for (const f of wsdlFields) byName.set(f[0], [...(byName.get(f[0]) ?? []), f]);
      const libProps = libTypes.flatMap((t) => t.props).filter((p) => p.name !== 'attributes');
      const libNames = new Set(libProps.map((p) => p.name));
      for (const [name, variants] of byName) {
        if (!libNames.has(name) && !partial) out.push(`${owner}.${name}: missing`);
        for (const p of libProps.filter((x) => x.name === name)) out.push(...fieldDifferences(owner, variants, p));
      }
      for (const p of libProps) if (!byName.has(p.name)) out.push(`${owner}.${p.name}: not in the WSDL (${p.at})`);
      return [...new Set(out)];
    }

    /** Fields of a type and, for a union declaration, of all its subtypes (a name can repeat). */
    function fieldsFor(wsdlName: string, union: boolean): SchemaField[] {
      if (!union) return allFields(schema.types, wsdlName);
      return [wsdlName, ...descendants(schema.types, wsdlName)].flatMap((t) => allFields(schema.types, t));
    }

    function unexpected(found: string[]): string[] {
      return found.filter((d) => {
        const key = d.slice(0, d.indexOf(':'));
        if (key in KNOWN_FIELD_DIFFERENCES) {
          usedFieldDifferences.add(key);
          return false;
        }
        return true;
      });
    }

    it.each(plainTypes)('%s', (wsdlName) => {
      const libName = TYPE_ALIASES[wsdlName] ?? dotless(wsdlName);
      const decls = lib.types.get(libName) ?? [];
      if (wsdlName in NOT_MODELED) {
        usedNotModeled.add(wsdlName);
        expect(decls.map((d) => `${libName} is declared at ${d.at}: remove it from NOT_MODELED`)).toEqual([]);
        return;
      }
      expect(decls.length ? [] : [`${libName} is not declared in lib/`]).toEqual([]);
      if (wsdlName in NOT_COMPARED) return;
      // Each declaration on its own: duplicates must agree.
      for (const decl of decls) {
        const found = differences(wsdlName, fieldsFor(wsdlName, decl.union), [decl], decl.union);
        expect(unexpected(found)).toEqual([]);
      }
    });

    it.each(Object.keys(INVERTED_HIERARCHIES))('%s hierarchy, as a whole', (rootType) => {
      const members = [rootType, ...descendants(schema.types, rootType)];
      const wsdlFields = members.flatMap((t) => allFields(schema.types, t));
      const decls = members.flatMap((t) => lib.types.get(TYPE_ALIASES[t] ?? dotless(t)) ?? []);
      expect(unexpected(differences(rootType, wsdlFields, decls))).toEqual([]);
    });

    /**
     * The union above hides a field that one type lacks while another type of
     * the hierarchy declares it. Each type still declares the fields the WSDL
     * gives it (not the inherited ones), with their cardinality.
     */
    const hierarchyTypes = [...hierarchyOf.keys()].filter((t) => schema.types[t].fields.length);
    it.each(hierarchyTypes)('%s declares its own fields (inverted hierarchy)', (wsdlName) => {
      const libName = TYPE_ALIASES[wsdlName] ?? dotless(wsdlName);
      const decls = lib.types.get(libName) ?? [];
      expect(decls.length ? [] : [`${libName} is not declared in lib/`]).toEqual([]);
      for (const decl of decls) {
        const libProps = new Map(decl.props.map((p) => [p.name, p]));
        const found = schema.types[wsdlName].fields.flatMap((field) => {
          const p = libProps.get(field[0]);
          return p ? fieldDifferences(wsdlName, [field], p) : [`${wsdlName}.${field[0]}: missing (${decl.at})`];
        });
        expect(unexpected(found)).toEqual([]);
      }
    });

    it('has no stale entries', () => {
      expectNoStaleEntries(KNOWN_FIELD_DIFFERENCES, usedFieldDifferences, 'KNOWN_FIELD_DIFFERENCES');
      expectNoStaleEntries(NOT_MODELED, usedNotModeled, 'NOT_MODELED');
      for (const t of [...Object.keys(TYPE_ALIASES), ...Object.keys(NOT_COMPARED)])
        expect(schema.types[t]).toBeDefined();
      for (const e of Object.keys(NOT_MODELED_ENUMS)) expect(schema.enums[e]).toBeDefined();
    });
  });

  describe('actions', () => {
    const usedActionDifferences = new Set<string>();
    const cases = actions.flatMap(({ service, op, param, actions: names }) =>
      names.map((name) => [`${service}.${name}`, { service, op, param, name }] as const),
    );

    it.each(cases)('%s is exported and sends its fields', async (key, { service, op, param, name }) => {
      const problems: string[] = [];
      const Action = (root as Record<string, unknown>)[name];
      if (typeof Action !== 'function') {
        problems.push('not exported from the package root');
      } else {
        const fields = allFields(schema.types, name);
        const action = new (Action as new () => Record<string, unknown>)();
        for (const f of fields) action[f[0]] = sample(f);
        const { service: svc, sent } = recordingService(service);
        await svc[op](action, { query: 'WHERE id = 1' });
        const { attributes, ...body } = sent[0]?.args?.[param] ?? {};
        if (attributes?.['xsi:type'] !== name) problems.push(`xsi:type is ${attributes?.['xsi:type']}`);
        const want = fields.map(([n]) => n);
        if (JSON.stringify(Object.keys(body)) !== JSON.stringify(want)) {
          problems.push(`sends [${Object.keys(body)}], the WSDL has [${want}]`);
        }
      }
      if (problems.length && key in KNOWN_ACTION_DIFFERENCES) {
        usedActionDifferences.add(key);
        return;
      }
      expect(problems).toEqual([]);
    });

    it('declares no action class the WSDLs do not have', () => {
      const extra: string[] = [];
      for (const { base, actions: names } of actions) {
        const bases = new Set([base]);
        for (let grew = true; grew;) {
          grew = false;
          for (const c of lib.classes) {
            if (!bases.has(c.name) && c.heritage.some((h) => bases.has(h))) {
              bases.add(c.name);
              grew = true;
              if (!c.abstract && !names.includes(c.name)) extra.push(`${c.name} (${base}) at ${c.at}`);
            }
          }
        }
      }
      expect(extra).toEqual([]);
    });

    it('has no stale entries', () => {
      expectNoStaleEntries(KNOWN_ACTION_DIFFERENCES, usedActionDifferences, 'KNOWN_ACTION_DIFFERENCES');
    });
  });

  describe('operations', () => {
    it.each(serviceNames)('%s has exactly the WSDL operations', (name) => {
      const methods = Object.getOwnPropertyNames(SERVICE_MAP[name].prototype).filter((m) => m !== 'constructor');
      expect(methods.sort()).toEqual(Object.keys(schema.services[name]).sort());
    });
  });
});
