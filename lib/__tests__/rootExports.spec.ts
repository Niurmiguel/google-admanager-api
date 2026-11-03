/**
 * What an application can import from the package root, checked on the
 * compiled output as Node loads it: with require() (CommonJS) and with
 * import (ESM, where Node finds the names of a CommonJS module with
 * cjs-module-lexer, which only follows patterns it recognizes).
 *
 * `export *` hides a name exported by two of the re-exported modules: ESM
 * drops it as ambiguous, TypeScript says nothing, and CommonJS keeps the
 * first one. Comparing each class with the one in its own module catches
 * both the missing and the wrong ones.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import * as ts from 'typescript';

// Compile-time check: types are erased, so only the compiler can see them.
import type { SoapFault } from '../index';

const ROOT = join(__dirname, '..', '..');
const LIB = join(ROOT, 'lib');

/** Modules whose runtime exports must all be importable from the root. */
function actionModules(dir = LIB): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '__tests__' ? [] : actionModules(path);
    return entry.name.endsWith('.action.ts') ? [relative(LIB, path).replace(/\.ts$/, '')] : [];
  });
}

/** Single named exports that must be importable from the root, with the module that defines them. */
const NAMED: Record<string, string> = {
  AdsReportsException: 'common/handlers/exceptions.handler',
  ArgumentNullException: 'common/handlers/exceptions.handler',
  InvalidOperationException: 'common/handlers/exceptions.handler',
  BaseException: 'common/handlers/exceptions.handler',
  AdManagerRequestError: 'common/utils/safeError.util',
  // Every enum of ReportService, to build a ReportQuery without deep imports.
  Column: 'client/services/report/report.enum',
  DateRangeType: 'client/services/report/report.enum',
  Dimension: 'client/services/report/report.enum',
  DimensionAttribute: 'client/services/report/report.enum',
  ExportFormat: 'client/services/report/report.enum',
  ReportJobStatus: 'client/services/report/report.enum',
  ReportQueryAdUnitView: 'client/services/report/report.enum',
  TimeZoneType: 'client/services/report/report.enum',
};

type Report = {
  /** Names exported by more than one action module. */
  duplicates: string[];
  /** `module:name` entries missing from the root, or not the same value there. */
  wrong: string[];
  /** Number of names checked. */
  checked: number;
  rootNames: string[];
};

/**
 * Runs in a separate Node process. `mode` is "cjs" or "esm", then come the
 * compiled output directory and the JSON of { modules, named }.
 */
const CHECKER = `
const { createRequire } = require('node:module');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const [mode, out, spec] = process.argv.slice(1); // node -e: no script path
const { modules, named } = JSON.parse(spec);
const req = createRequire(path.join(out, 'index.js'));
(async () => {
  const root = mode === 'esm' ? await import(pathToFileURL(path.join(out, 'index.js')).href) : req('./index.js');
  const owners = {};
  const wrong = [];
  let checked = 0;
  const check = (mod, name) => {
    checked++;
    const value = req('./' + mod + '.js')[name];
    if (value === undefined || root[name] !== value) wrong.push(mod + ':' + name);
  };
  for (const mod of modules) {
    for (const name of Object.keys(req('./' + mod + '.js'))) {
      if (name === '__esModule') continue;
      (owners[name] = owners[name] || []).push(mod);
      check(mod, name);
    }
  }
  for (const [name, mod] of Object.entries(named)) check(mod, name);
  const duplicates = Object.entries(owners).filter(([, mods]) => mods.length > 1).map(([n, mods]) => n + ' in ' + mods.join(', '));
  const rootNames = Object.keys(root).filter((n) => n !== 'default' && n !== 'module.exports' && n !== '__esModule').sort();
  process.stdout.write(JSON.stringify({ duplicates, wrong, checked, rootNames }));
})().catch((err) => { console.error(err); process.exit(1); });
`;

describe('exports of the package root', () => {
  let out: string;
  const modules = actionModules();

  beforeAll(() => {
    // Compile lib/ exactly as `npm run build` does, into a scratch directory.
    out = mkdtempSync(join(tmpdir(), 'admanager-exports-'));
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
    const program = ts.createProgram(config.fileNames, {
      ...config.options,
      outDir: out,
      declaration: false,
      declarationMap: false,
      sourceMap: false,
    });
    const emitted = program.emit();
    expect(emitted.emitSkipped).toBe(false);
  }, 60_000);

  afterAll(() => {
    if (out) rmSync(out, { recursive: true, force: true });
  });

  function run(mode: 'cjs' | 'esm'): Report {
    const stdout = execFileSync(
      process.execPath,
      ['-e', CHECKER, mode, out, JSON.stringify({ modules, named: NAMED })],
      // The compiled files are outside the project: let them find its dependencies.
      { env: { ...process.env, NODE_PATH: join(ROOT, 'node_modules') }, encoding: 'utf8' },
    );
    return JSON.parse(stdout);
  }

  it('finds the 30 action modules', () => {
    expect(modules).toHaveLength(30);
    expect(modules).toContain('client/services/targetingPresent/targetingPresent.action');
  });

  it.each(['cjs', 'esm'] as const)('exports every action class and the exceptions (%s)', (mode) => {
    const report = run(mode);

    expect(report.duplicates).toEqual([]);
    expect(report.wrong).toEqual([]);
    expect(report.checked).toBeGreaterThan(130);
    // Guards the checker itself: an empty root would make the checks above vacuous.
    expect(report.rootNames).toEqual(
      expect.arrayContaining(['AdManagerClient', 'DeleteTargetingPresetAction', 'ReportJobStatus']),
    );
  });

  it('exposes the same names to require() and to import', () => {
    expect(run('esm').rootNames).toEqual(run('cjs').rootNames);
  });

  it('exports the SoapFault type', () => {
    const fault: SoapFault = { code: 500, name: 'AuthenticationError', message: 'm', details: {} };
    expect(fault.name).toBe('AuthenticationError');
  });
});
