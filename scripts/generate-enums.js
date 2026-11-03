#!/usr/bin/env node
/**
 * Regenerates every `lib/**\/*.enum.ts` file from the Ad Manager WSDLs: each
 * enum gets exactly the values of the WSDL, in its order, with the WSDL
 * documentation as JSDoc. Enum names, the enums each file declares and their
 * order are kept: they are the public API. To add an enum, declare it empty
 * (`export enum Name {}`) in the right file and run this script.
 *
 *   npm run generate:enums                         # downloads the WSDLs of API_VERSION
 *   npm run generate:enums -- --wsdl-dir <dir>     # uses <dir>/<Service>.wsdl instead
 *   npm run generate:enums -- --check              # fails if a file would change
 *
 * Fails, without writing anything, when an enum of the library has no
 * counterpart in the WSDLs: remove it, or map it in LIB_ENUM_ALIASES.
 * The output only depends on the WSDLs, so running it twice changes nothing.
 */
'use strict';

const { readFile, readdir, writeFile } = require('node:fs/promises');
const { join, relative } = require('node:path');
const { parseArgs } = require('node:util');
const ts = require('typescript');

const { LIB_ENUM_ALIASES, parseWsdl, wsdlUrl } = require('./wsdl-schema');

const ROOT = join(__dirname, '..');
const LIB = join(ROOT, 'lib');

const DOWNLOAD_CONCURRENCY = 4;
const DOWNLOAD_TIMEOUT_MS = 60_000;

async function apiVersion() {
  const source = await readFile(join(LIB, 'common', 'constants', 'index.ts'), 'utf8');
  const match = /export const API_VERSION = '(v\d+)'/.exec(source);
  if (!match) throw new Error('API_VERSION not found in lib/common/constants/index.ts');
  return match[1];
}

async function serviceNames() {
  const source = await readFile(join(LIB, 'client', 'services', 'index.ts'), 'utf8');
  const names = [...source.matchAll(/export \{ (\w+Service) \}/g)].map((m) => m[1]);
  if (names.length === 0) throw new Error('no services found in lib/client/services/index.ts');
  return names.sort();
}

/** WSDL text of every service, from a directory or from Google. */
async function loadWsdls(services, version, wsdlDir) {
  const out = {};
  if (wsdlDir) {
    for (const svc of services) out[svc] = await readFile(join(wsdlDir, `${svc}.wsdl`), 'utf8');
    return out;
  }
  const queue = [...services];
  const worker = async () => {
    for (let svc = queue.shift(); svc; svc = queue.shift()) {
      const url = wsdlUrl(version, svc);
      const res = await fetch(url, { signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS) });
      if (!res.ok) throw new Error(`GET ${url}: HTTP ${res.status}`);
      out[svc] = await res.text();
    }
  };
  await Promise.all(Array.from({ length: DOWNLOAD_CONCURRENCY }, worker));
  return out;
}

/** WSDL enums by name, checking that services declaring the same name agree on its values. */
function indexEnums(models) {
  const index = new Map();
  for (const svc of Object.keys(models).sort()) {
    for (const [name, e] of Object.entries(models[svc].enums)) {
      if (!index.has(name)) index.set(name, { first: e, firstService: svc, conflicts: [] });
      const entry = index.get(name);
      const same =
        JSON.stringify(e.values.map((v) => v.value)) === JSON.stringify(entry.first.values.map((v) => v.value));
      if (!same) entry.conflicts.push(svc);
    }
  }
  return index;
}

// --- documentation: WSDL (Javadoc + HTML) to JSDoc ---

const BREAK = '\u0000';

/** Lines of JSDoc for a WSDL <documentation> text. Empty lines separate paragraphs. */
function docLines(raw) {
  if (!raw) return [];
  let s = raw.replace(/\s+/g, ' ');
  // Javadoc inline tags.
  s = s.replace(/\{@(link|linkplain|code|Code)\s+([^{}]*?)\s*\}/g, (_m, tag, body) => {
    if (/^code$/i.test(tag)) return '`' + body + '`';
    const [target, ...label] = body.split(' ');
    return label.length ? label.join(' ') : '`' + target.replace(/^#/, '').replace(/#/g, '.') + '`';
  });
  // HTML tables: one list item per row, cells separated by "|".
  s = s.replace(/<table[^>]*>(.*?)<\/table>/gi, (_m, body) => {
    const rows = [...body.matchAll(/<tr[^>]*>(.*?)<\/tr>/gi)].map((r) =>
      [...r[1].matchAll(/<t[hd][^>]*>(.*?)<\/t[hd]>/gi)].map((c) => c[1].trim()).join(' | '),
    );
    return `${BREAK}P${rows.map((r) => `${BREAK}L- ${r}`).join('')}${BREAK}P`;
  });
  s = s.replace(/<a\s+href="([^"]*)"\s*>(.*?)<\/a>/gi, (_m, href, text) => `{@link ${href} ${text.trim()}}`);
  s = s
    .replace(/<\/?(p|ul|ol)\s*\/?>/gi, `${BREAK}P`)
    .replace(/<br\s*\/?>/gi, `${BREAK}L`)
    .replace(/<li\s*>\s*/gi, `${BREAK}L- `)
    .replace(/<\/li\s*>/gi, '')
    .replace(/<\/?code\s*>/gi, '`')
    .replace(/<\/?(b|i|em|strong)\s*>|<\/?span[^>]*>/gi, '');
  // Entities escaped twice in the WSDL (&amp;gt;), decoded after the tags so they stay text.
  s = s.replace(/&(lt|gt|quot|amp);/g, (_m, e) => ({ lt: '<', gt: '>', quot: '"', amp: '&' })[e]);
  s = s.replace(/\*\//g, '*\\/');

  // Every part but the first starts with the kind of break before it: P(aragraph) or L(ine).
  const lines = [];
  s.split(BREAK).forEach((part, i) => {
    const kind = i === 0 ? null : part[0];
    const text = (i === 0 ? part : part.slice(1)).trim();
    if (kind === 'P' && lines.length && lines[lines.length - 1] !== '') lines.push('');
    if (text) lines.push(text);
  });
  while (lines.length && lines[lines.length - 1] === '') lines.pop();
  while (lines.length && lines[0] === '') lines.shift();
  return lines;
}

function jsDoc(raw, indent) {
  const lines = docLines(raw);
  if (lines.length === 0) return '';
  return `${indent}/**\n${lines.map((l) => (l ? `${indent} * ${l}` : `${indent} *`)).join('\n')}\n${indent} */\n`;
}

const memberKey = (value) => (/^[A-Za-z_$][\w$]*$/.test(value) ? value : `'${value}'`);

function renderEnum(name, wsdlEnum) {
  const members = wsdlEnum.values.map((v) => `${jsDoc(v.doc, '  ')}  ${memberKey(v.value)} = '${v.value}',`).join('\n');
  return `${jsDoc(wsdlEnum.doc, '')}export enum ${name} {\n${members}\n}\n`;
}

// --- library enum files ---

async function enumFiles(dir = LIB) {
  const out = [];
  for (const entry of (await readdir(dir, { withFileTypes: true })).sort((a, b) => (a.name < b.name ? -1 : 1))) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '__tests__') out.push(...(await enumFiles(path)));
    } else if (entry.name.endsWith('.enum.ts')) {
      out.push(path);
    }
  }
  return out;
}

/** Names of the enums a file declares, in order. Anything else in the file is an error. */
function declaredEnums(path, source) {
  const sf = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true);
  return sf.statements.map((s) => {
    if (!ts.isEnumDeclaration(s)) {
      throw new Error(`${relative(ROOT, path)}: only enums can be declared in a .enum.ts file`);
    }
    return s.name.text;
  });
}

function wsdlNamesFor(libName, index) {
  if (LIB_ENUM_ALIASES[libName]) return LIB_ENUM_ALIASES[libName];
  return [...index.keys()].filter((n) => n.replace(/\./g, '') === libName).sort();
}

const HEADER = (version) =>
  `// Generated from the Ad Manager ${version} WSDLs by scripts/generate-enums.js.\n` +
  '// Do not edit values or comments by hand: run `npm run generate:enums`.\n' +
  '// To add an enum, declare it empty (`export enum Name {}`) and run the script.\n';

async function main() {
  const { values: args } = parseArgs({
    options: { 'wsdl-dir': { type: 'string' }, check: { type: 'boolean', default: false } },
  });
  const version = await apiVersion();
  const services = await serviceNames();
  const texts = await loadWsdls(services, version, args['wsdl-dir']);
  const models = Object.fromEntries(services.map((svc) => [svc, parseWsdl(texts[svc])]));
  const index = indexEnums(models);

  const problems = [];
  const outputs = [];
  for (const path of await enumFiles()) {
    const source = await readFile(path, 'utf8');
    const rendered = [];
    for (const name of declaredEnums(path, source)) {
      const wsdlNames = wsdlNamesFor(name, index);
      const found = wsdlNames.map((n) => ({ name: n, entry: index.get(n) }));
      if (found.length === 0 || found.some((f) => !f.entry)) {
        problems.push(`${relative(ROOT, path)}: enum ${name} is not in the ${version} WSDLs`);
        continue;
      }
      const conflicts = found.filter((f) => f.entry.conflicts.length);
      if (conflicts.length) {
        problems.push(`${name}: ${conflicts.map((f) => f.name).join(', ')} differ between services`);
        continue;
      }
      const values = (f) => JSON.stringify(f.entry.first.values.map((v) => v.value));
      if (found.some((f) => values(f) !== values(found[0]))) {
        problems.push(`${name}: ${wsdlNames.join(', ')} do not have the same values`);
        continue;
      }
      rendered.push(renderEnum(name, found[0].entry.first));
    }
    outputs.push({ path, source, text: `${HEADER(version)}\n${rendered.join('\n')}` });
  }

  if (problems.length) {
    throw new Error(`nothing written:\n  ${problems.join('\n  ')}`);
  }

  const changed = outputs.filter((o) => o.text !== o.source);
  if (args.check) {
    for (const o of changed) console.error(`out of date: ${relative(ROOT, o.path)}`);
    if (changed.length) process.exitCode = 1;
    return;
  }
  for (const o of changed) await writeFile(o.path, o.text);
  console.log(`${outputs.length} enum files, ${changed.length} rewritten`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  });
}

module.exports = { docLines };
