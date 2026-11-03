/**
 * The `attributes: { 'xsi:type': ... }` the library declares on objects whose
 * WSDL type is abstract (or has subtypes) must offer exactly the concrete WSDL
 * types the object can be: a missing one cannot be sent without a cast, an
 * extra one is rejected by Ad Manager.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as ts from 'typescript';

import { WsdlSchema, descendants } from '../../scripts/wsdl-schema';
import { API_VERSION } from '../common/constants';

const LIB = join(__dirname, '..');

/** Library type (file, exported name) and the WSDL type whose concrete types it covers. */
const CASES: [file: string, name: string, wsdlType: string][] = [
  ['client/services/creative/creative.type.ts', 'Creative', 'Creative'],
  [
    'client/services/creative/creative.type.ts',
    'BaseCreativeTemplateVariableValue',
    'BaseCreativeTemplateVariableValue',
  ],
  ['client/common/types/customCriteria.type.ts', 'CustomCriteriaNode', 'CustomCriteriaNode'],
  ['client/common/types/customCriteria.type.ts', 'CustomCriteriaLeaf', 'CustomCriteriaLeaf'],
  ['client/common/types/general.type.ts', 'BaseCustomFieldValue', 'BaseCustomFieldValue'],
  ['client/common/types/xsiType.type.ts', 'TypedValue', 'Value'],
  ['client/services/customField/customField.type.ts', 'CustomField', 'CustomField'],
  ['client/services/adRule/adRule.type.ts', 'BaseAdRuleSlot', 'BaseAdRuleSlot'],
  ['client/services/audienceSegment/audienceSegment.type.ts', 'FirstPartyAudienceSegment', 'FirstPartyAudienceSegment'],
];

const { types }: WsdlSchema = JSON.parse(
  readFileSync(join(__dirname, 'fixtures', `wsdl-schema.${API_VERSION}.json`), 'utf8'),
);

function concreteTypes(name: string): string[] {
  return [name, ...descendants(types, name)].filter((t) => !types[t].abstract).sort();
}

const program = ts.createProgram(
  CASES.map(([file]) => join(LIB, file)),
  { strict: true, noEmit: true, skipLibCheck: true },
);
const checker = program.getTypeChecker();

/** The string literals `attributes['xsi:type']` can hold, over every member of the union. */
function xsiTypes(file: string, name: string): string[] {
  const source = program.getSourceFile(join(LIB, file));
  if (!source) throw new Error(`${file} not in the program`);
  const symbol = checker.getExportsOfModule(checker.getSymbolAtLocation(source)!).find((s) => s.name === name);
  if (!symbol) throw new Error(`${name} is not exported by ${file}`);
  const type = checker.getDeclaredTypeOfSymbol(symbol);
  const out = new Set<string>();
  for (const member of type.isUnion() ? type.types : [type]) {
    const attributes = member.getProperty('attributes');
    if (!attributes) throw new Error(`${name}: a member has no attributes`);
    const attrType = checker.getNonNullableType(checker.getTypeOfSymbol(attributes));
    const xsi = attrType.getProperty('xsi:type');
    if (!xsi) throw new Error(`${name}: attributes has no xsi:type`);
    const xsiType = checker.getTypeOfSymbol(xsi);
    for (const t of xsiType.isUnion() ? xsiType.types : [xsiType]) {
      if (!t.isStringLiteral()) throw new Error(`${name}: xsi:type is not a union of string literals`);
      out.add(t.value);
    }
  }
  return [...out].sort();
}

describe('xsi:type of the polymorphic WSDL types', () => {
  it.each(CASES)('%s: %s', (file, name, wsdlType) => {
    expect(types[wsdlType]).toBeDefined();
    expect(xsiTypes(file, name)).toEqual(concreteTypes(wsdlType));
  });
});
