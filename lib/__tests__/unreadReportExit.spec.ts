/**
 * A ReportResponse that nobody saves keeps a timer to release its connection
 * after downloadTimeoutMs. That timer must not keep the process alive by
 * itself: a script that gets a report and decides not to save it must exit
 * as soon as it is done, not downloadTimeoutMs later. Checked in a child
 * process, since only a process exit shows it.
 */
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createServer, Server } from 'node:http';
import { join } from 'node:path';

import { listenOnLoopback } from './support/loopback';

// ts-node compiles the child on start: seconds on a busy machine.
jest.setTimeout(60_000);

/** Far longer than the exit is allowed to take. */
const DOWNLOAD_TIMEOUT_MS = 120_000;
/** Generous: the child only has to notice that nothing is left to do. */
const EXIT_WITHIN_MS = 10_000;

describe('an unsaved report response', () => {
  let server: Server;
  let base: string;

  beforeAll(async () => {
    server = createServer((_req, res) => {
      // The whole report, then the server closes the connection: once it is
      // gone, only the release timer could keep the child alive.
      res.writeHead(200, { 'content-type': 'text/csv', connection: 'close' });
      res.end('a,b\n1,2\n');
    });
    base = await listenOnLoopback(server);
  });

  afterAll(() => {
    server.closeAllConnections();
    server.close();
  });

  it('does not keep the process alive', async () => {
    const child = spawn(
      process.execPath,
      [
        '-r',
        'ts-node/register/transpile-only',
        join(__dirname, 'support', 'unreadReport.child.ts'),
        `${base}/report.csv?Signature=fake`,
        String(DOWNLOAD_TIMEOUT_MS),
      ],
      { stdio: ['ignore', 'pipe', 'pipe'] },
    );
    let stdout = '';
    let stderr = '';
    child.stdout.setEncoding('utf8').on('data', (chunk: string) => (stdout += chunk));
    child.stderr.setEncoding('utf8').on('data', (chunk: string) => (stderr += chunk));
    const exited = once(child, 'exit');

    // Starts counting once the child has its response: ts-node's start-up does not count.
    const deadline = setTimeout(() => child.kill(), 45_000);
    try {
      while (!stdout.includes('ready') && child.exitCode === null && child.signalCode === null) {
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
      const readyAt = Date.now();
      deadline.refresh();
      const kill = setTimeout(() => child.kill(), EXIT_WITHIN_MS);
      const [code, signal] = await exited;
      clearTimeout(kill);

      expect({ stdout, stderr }).toEqual({ stdout: 'ready\n', stderr: '' });
      expect({ code, signal }).toEqual({ code: 0, signal: null });
      expect(Date.now() - readyAt).toBeLessThan(EXIT_WITHIN_MS);
    } finally {
      clearTimeout(deadline);
      child.kill();
    }
  });
});
