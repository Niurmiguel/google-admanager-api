import { once } from 'node:events';
import { Server } from 'node:http';
import { AddressInfo } from 'node:net';

/**
 * Starts `server` on a random loopback port and returns its base URL
 * (`http://127.0.0.1:<port>`).
 *
 * The server keeps idle keep-alive connections open (`keepAliveTimeout = 0`).
 * By default Node closes them after 5 s; the keep-alive agent that axios and
 * node-soap use can pick such a connection for the next request just as the
 * server closes it, and that request fails with ECONNRESET. It happens only
 * when a busy machine stretches a test past those 5 s, so the test fails
 * intermittently. The tests close the server and its connections themselves.
 */
export async function listenOnLoopback(server: Server): Promise<string> {
  server.keepAliveTimeout = 0;
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  return `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
}
