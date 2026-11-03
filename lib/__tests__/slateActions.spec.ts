/**
 * performSlateAction takes an ArchiveSlates or UnarchiveSlates instance, like
 * every other perform*Action, and still accepts the action name as a string
 * (the only form 0.1.0 had).
 */
import { Client } from 'soap';

import { ArchiveSlates, UnarchiveSlates } from '../index';
import { LiveStreamEventService } from '../client/services/liveStreamEvent/liveStreamEvent.service';

function recordingService() {
  const sent: unknown[] = [];
  const client = new Proxy(
    {},
    {
      get: () => async (args: unknown) => {
        sent.push(args);
        return null;
      },
    },
  ) as unknown as Client;
  return { service: new LiveStreamEventService(client), sent };
}

const statement = { query: 'WHERE id = 1', values: [] };

describe('performSlateAction', () => {
  it.each([
    ['ArchiveSlates', new ArchiveSlates()],
    ['UnarchiveSlates', new UnarchiveSlates()],
  ] as const)('sends %s from an action instance and from its name', async (name, action) => {
    const { service, sent } = recordingService();

    await service.performSlateAction(action, statement);
    await service.performSlateAction(name, statement);

    const expected = { slateAction: { attributes: { 'xsi:type': name } }, filterStatement: statement };
    expect(sent).toEqual([expected, expected]);
  });
});
