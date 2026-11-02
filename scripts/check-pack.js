#!/usr/bin/env node
// Fails if the npm package would ship anything but the build output and the
// usual metadata files. Run after `npm run build`:
//
//   npm pack --dry-run --json | node scripts/check-pack.js
'use strict';

const REQUIRED = ['package.json', 'README.md', 'LICENSE', 'dist/index.js', 'dist/index.d.ts'];
const FORBIDDEN = [
  { test: (f) => /(^|\/)coverage\//.test(f), why: 'coverage report' },
  { test: (f) => /(^|\/)__tests__\//.test(f), why: 'test file' },
  { test: (f) => /\.tsx?$/.test(f) && !f.endsWith('.d.ts'), why: 'TypeScript source' },
];

async function main() {
  let input = '';
  for await (const chunk of process.stdin) input += chunk;

  const [pack] = JSON.parse(input);
  const files = pack.files.map((f) => f.path);
  const problems = [];

  for (const file of files) {
    for (const rule of FORBIDDEN) {
      if (rule.test(file)) problems.push(`${rule.why}: ${file}`);
    }
  }
  for (const file of REQUIRED) {
    if (!files.includes(file)) problems.push(`missing: ${file}`);
  }

  if (problems.length > 0) {
    console.error(`npm pack would publish ${files.length} files with ${problems.length} problem(s):`);
    for (const p of problems.slice(0, 50)) console.error(`  ${p}`);
    if (problems.length > 50) console.error(`  ... and ${problems.length - 50} more`);
    process.exitCode = 1;
    return;
  }
  console.log(`npm pack contents OK: ${files.length} files`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
