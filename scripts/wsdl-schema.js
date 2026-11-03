'use strict';
/**
 * Reads the parts of an Ad Manager WSDL that this library mirrors: enums
 * (with their documentation), complex types (base, abstract, fields and
 * cardinality) and operations.
 *
 * Used by scripts/generate-enums.js and by the WSDL contract tests
 * (lib/__tests__/wsdlSchema.spec.ts, lib/__tests__/wsdl.network.spec.ts).
 *
 * The XML parser is `sax`, which node-soap already depends on; it is resolved
 * from soap's own location so it does not rely on how npm hoists it. Anything
 * this module does not understand in a schema (xs:choice, attributes...)
 * throws instead of being skipped, so a WSDL change cannot go unnoticed.
 */
const { createRequire } = require('node:module');

const sax = createRequire(require.resolve('soap'))('sax');

const XSD = 'http://www.w3.org/2001/XMLSchema';
const WSDL = 'http://schemas.xmlsoap.org/wsdl/';

/** Elements of the schema this parser handles; anything else throws. */
const KNOWN_XSD = new Set([
  'schema',
  'annotation',
  'documentation',
  'appinfo',
  'simpleType',
  'restriction',
  'enumeration',
  'complexType',
  'complexContent',
  'extension',
  'sequence',
  'element',
]);

/**
 * @param {string} xml WSDL document.
 * @returns {import('./wsdl-schema').WsdlModel}
 */
function parseWsdl(xml) {
  const parser = sax.parser(true, { xmlns: true, position: true });
  /** @type {import('./wsdl-schema').WsdlModel} */
  const model = { targetNamespace: null, enums: {}, types: {}, elements: {}, operations: {} };
  const messages = {};
  const portOperations = {};
  /** Open elements, innermost last. `owner` is what a nested element belongs to. */
  const stack = [];
  let docText = null;

  const fail = (message) => {
    throw new Error(`${message} (line ${parser.line + 1})`);
  };
  const attr = (node, name) => (node.attributes[name] ? node.attributes[name].value : undefined);
  /** Resolves a QName attribute value against the namespaces in scope. */
  const qname = (node, value) => {
    const i = value.indexOf(':');
    const prefix = i < 0 ? '' : value.slice(0, i);
    const uri = node.ns[prefix];
    if (uri === undefined) fail(`unbound prefix in "${value}"`);
    return { uri, local: i < 0 ? value : value.slice(i + 1) };
  };
  const parent = (depth = 1) => stack[stack.length - depth];
  const isXsd = (frame, local) => frame && frame.uri === XSD && frame.local === local;

  parser.onopentag = (node) => {
    const frame = { uri: node.uri, local: node.local, owner: null };
    const up = parent();

    if (node.uri === XSD) {
      if (!KNOWN_XSD.has(node.local)) fail(`unsupported XML Schema element <${node.local}>`);

      switch (node.local) {
        case 'schema':
          if (model.targetNamespace === null) model.targetNamespace = attr(node, 'targetNamespace') ?? null;
          break;
        case 'documentation':
          docText = '';
          break;
        case 'simpleType': {
          if (!isXsd(up, 'schema')) fail('nested simpleType');
          const name = attr(node, 'name');
          frame.owner = model.enums[name] = { doc: null, values: [] };
          break;
        }
        case 'restriction':
          if (!isXsd(up, 'simpleType')) fail('restriction outside a simpleType');
          if (qname(node, attr(node, 'base')).local !== 'string') fail('non-string enumeration');
          frame.owner = up.owner;
          break;
        case 'enumeration': {
          if (!isXsd(up, 'restriction')) fail('enumeration outside a restriction');
          const value = { value: attr(node, 'value'), doc: null };
          up.owner.values.push(value);
          frame.owner = value;
          break;
        }
        case 'complexType': {
          const name = attr(node, 'name');
          if (isXsd(up, 'schema')) {
            frame.owner = model.types[name] = {
              abstract: attr(node, 'abstract') === 'true',
              base: null,
              fields: [],
            };
          } else if (isXsd(up, 'element') && up.owner && up.owner.wrapper) {
            // Anonymous type of an operation's request/response element.
            frame.owner = up.owner;
          } else {
            fail('unexpected complexType');
          }
          break;
        }
        case 'complexContent':
          if (!isXsd(up, 'complexType')) fail('complexContent outside a complexType');
          frame.owner = up.owner;
          break;
        case 'extension':
          if (!isXsd(up, 'complexContent')) fail('extension outside complexContent');
          up.owner.base = qname(node, attr(node, 'base')).local;
          frame.owner = up.owner;
          break;
        case 'sequence':
          if (!isXsd(up, 'complexType') && !isXsd(up, 'extension')) fail('unexpected sequence');
          frame.owner = up.owner;
          break;
        case 'element': {
          const name = attr(node, 'name');
          if (isXsd(up, 'schema')) {
            const type = attr(node, 'type');
            frame.owner = model.elements[name] = {
              type: type ? qname(node, type).local : null,
              fields: [],
              wrapper: !type,
            };
          } else if (isXsd(up, 'sequence')) {
            const type = qname(node, attr(node, 'type'));
            up.owner.fields.push({
              name,
              type: type.uri === XSD ? `xsd:${type.local}` : type.local,
              min: attr(node, 'minOccurs') ?? '1',
              max: attr(node, 'maxOccurs') ?? '1',
            });
          } else {
            fail('unexpected element');
          }
          break;
        }
        default:
          // annotation, appinfo: nothing to record.
          frame.owner = up ? up.owner : null;
      }
    } else if (node.uri === WSDL) {
      if (node.local === 'message') {
        frame.owner = { message: attr(node, 'name') };
      } else if (node.local === 'part' && up && up.local === 'message') {
        messages[up.owner.message] = qname(node, attr(node, 'element')).local;
      } else if (node.local === 'operation' && up && up.local === 'portType') {
        frame.owner = portOperations[attr(node, 'name')] = { input: null, output: null };
      } else if ((node.local === 'input' || node.local === 'output') && up && up.owner && up.local === 'operation') {
        if (parent(2).local === 'portType') up.owner[node.local] = qname(node, attr(node, 'message')).local;
      }
    }

    stack.push(frame);
  };

  parser.ontext = (text) => {
    if (docText !== null) docText += text;
  };
  parser.oncdata = parser.ontext;

  parser.onclosetag = () => {
    const frame = stack.pop();
    if (isXsd(frame, 'documentation')) {
      // <annotation><documentation> documents the element that holds the annotation.
      const holder = parent(2);
      const owner = holder && holder.owner;
      if (owner && 'doc' in owner && (isXsd(holder, 'simpleType') || isXsd(holder, 'enumeration'))) {
        owner.doc = docText;
      }
      docText = null;
    }
  };

  // Without an onerror handler, sax throws malformed XML from write()/close().
  parser.write(xml).close();

  for (const element of Object.values(model.elements)) delete element.wrapper;
  for (const [name, op] of Object.entries(portOperations)) {
    model.operations[name] = {
      input: op.input ? (messages[op.input] ?? null) : null,
      output: op.output ? (messages[op.output] ?? null) : null,
    };
  }
  return model;
}

// --- schema: what the contract tests compare the library with ---

/** Every field of a type, inherited ones first. */
function allFields(types, name) {
  const chain = [];
  const seen = new Set();
  for (let t = types[name]; t && !seen.has(t); t = t.base ? types[t.base] : null) {
    seen.add(t);
    chain.unshift(t);
  }
  return chain.flatMap((t) => t.fields);
}

/** Names of the types that extend `base`, directly or not, sorted. */
function descendants(types, base) {
  const out = new Set();
  for (let grew = true; grew;) {
    grew = false;
    for (const [name, t] of Object.entries(types)) {
      if (!out.has(name) && t.base && (t.base === base || out.has(t.base))) {
        out.add(name);
        grew = true;
      }
    }
  }
  return [...out].sort();
}

/**
 * Types and enums a service can send or receive: the fields of its
 * operations' request and response elements, followed through fields, base
 * types and subtypes. Faults are not followed (the library does not model
 * them), and neither are the SOAP headers.
 */
function reachable(model) {
  const types = new Set();
  const enums = new Set();
  const stack = [];
  const visitField = (f) => {
    if (f.type.startsWith('xsd:')) return;
    if (model.enums[f.type]) enums.add(f.type);
    else stack.push(f.type);
  };
  for (const op of Object.values(model.operations)) {
    for (const el of [op.input, op.output]) {
      if (el && model.elements[el]) model.elements[el].fields.forEach(visitField);
    }
  }
  while (stack.length) {
    const name = stack.pop();
    if (types.has(name)) continue;
    const t = model.types[name];
    if (!t) throw new Error(`type ${name} is referenced but not declared`);
    types.add(name);
    t.fields.forEach(visitField);
    if (t.base) stack.push(t.base);
    stack.push(...descendants(model.types, name));
  }
  return { types, enums };
}

const fieldTuple = (f) => [f.name, f.type, f.max === 'unbounded'];

/**
 * The schema of a whole API version, from the parsed WSDL of each service:
 * every reachable enum and type (a name declared by several services must be
 * identical in all of them, or this throws) and every operation.
 *
 * @param {Record<string, import('./wsdl-schema').WsdlModel>} services
 * @returns {import('./wsdl-schema').WsdlSchema}
 */
function buildSchema(services) {
  const schema = { enums: {}, types: {}, services: {} };
  const origin = { enums: {}, types: {} };
  const put = (kind, name, value, svc) => {
    const prev = schema[kind][name];
    if (prev !== undefined && JSON.stringify(prev) !== JSON.stringify(value)) {
      throw new Error(`${kind} ${name} differs between ${origin[kind][name]} and ${svc}`);
    }
    if (prev === undefined) {
      schema[kind][name] = value;
      origin[kind][name] = svc;
    }
  };

  for (const svc of Object.keys(services).sort()) {
    const model = services[svc];
    const { types, enums } = reachable(model);
    for (const name of enums)
      put(
        'enums',
        name,
        model.enums[name].values.map((v) => v.value),
        svc,
      );
    for (const name of types) {
      const t = model.types[name];
      put('types', name, { abstract: t.abstract, base: t.base, fields: t.fields.map(fieldTuple) }, svc);
    }
    const operations = {};
    for (const op of Object.keys(model.operations).sort()) {
      const { input, output } = model.operations[op];
      operations[op] = {
        input: (model.elements[input]?.fields ?? []).map(fieldTuple),
        output: (model.elements[output]?.fields ?? []).map(fieldTuple),
      };
    }
    schema.services[svc] = operations;
  }

  const sortKeys = (o) =>
    Object.fromEntries(
      Object.keys(o)
        .sort()
        .map((k) => [k, o[k]]),
    );
  return { enums: sortKeys(schema.enums), types: sortKeys(schema.types), services: schema.services };
}

/**
 * JSON with one line per enum, type and operation: small diffs, and about a
 * quarter of the size of an indented dump.
 */
function formatSchema(schema) {
  const block = (obj, indent) =>
    Object.entries(obj)
      .map(([k, v]) => `${indent}${JSON.stringify(k)}: ${JSON.stringify(v)}`)
      .join(',\n');
  const services = Object.entries(schema.services)
    .map(([svc, ops]) => `    ${JSON.stringify(svc)}: {\n${block(ops, '      ')}\n    }`)
    .join(',\n');
  return (
    `{\n  "enums": {\n${block(schema.enums, '    ')}\n  },\n` +
    `  "types": {\n${block(schema.types, '    ')}\n  },\n` +
    `  "services": {\n${services}\n  }\n}\n`
  );
}

/**
 * Library enums whose name is not the WSDL name without dots. The first WSDL
 * name provides the documentation; all of them must have the same values.
 * Kept for compatibility: these names are exported from the package root.
 */
const LIB_ENUM_ALIASES = {
  ComparisonOperator: ['CustomCriteria.ComparisonOperator', 'AudienceSegmentCriteria.ComparisonOperator'],
  LogicalOperator: ['CustomCriteriaSet.LogicalOperator'],
};

/** Public URL of a service's WSDL. */
function wsdlUrl(version, service) {
  return `https://ads.google.com/apis/ads/publisher/${version}/${service}?wsdl`;
}

module.exports = { LIB_ENUM_ALIASES, parseWsdl, buildSchema, formatSchema, allFields, descendants, wsdlUrl };
