/**
 * The label of a JSDoc link to a member of the API reference names what the
 * link points to: `{@link .../LiveStreamEventService.Slate#id Slate.id}`, not
 * `LiveStreamEvent.id`. A label without a dot names only the member (any case:
 * `ID` for `#id`).
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(__dirname, '..', '..');
const LIB = join(ROOT, 'lib');
const LINK =
  /\{@link https:\/\/developers\.google\.com\/ad-manager\/api\/reference\/v\d+\/\w+\.([\w.]+)#(\w+)\s+([^}]*?)\s*\}/g;

function sources(): string[] {
  return readdirSync(LIB, { recursive: true, encoding: 'utf8' })
    .filter((f) => f.endsWith('.ts') && !f.split(/[\\/]/).includes('__tests__'))
    .map((f) => join(LIB, f))
    .sort();
}

describe('API reference links', () => {
  it('finds the links', () => {
    const count = sources().reduce((n, f) => n + [...readFileSync(f, 'utf8').matchAll(LINK)].length, 0);
    expect(count).toBeGreaterThan(100);
  });

  it('label the member they point to', () => {
    const wrong: string[] = [];
    for (const file of sources()) {
      const lines = readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, i) => {
        for (const [, type, member, label] of line.matchAll(LINK)) {
          const ok = label.includes('.') ? label === `${type}.${member}` : label.toLowerCase() === member.toLowerCase();
          if (!ok) wrong.push(`${relative(ROOT, file)}:${i + 1}: ${type}#${member} labeled "${label}"`);
        }
      });
    }
    expect(wrong).toEqual([]);
  });
});
