/**
 * performCreativeAction sends the fields of the action (buildAttributes()),
 * like every other perform*Action, not only its xsi:type.
 */
import { Client } from 'soap';

import { ActivateCreatives, DeactivateCreatives } from '../index';
import { CreativeService } from '../client/services/creative/creative.service';

describe('performCreativeAction', () => {
  it.each([ActivateCreatives, DeactivateCreatives])('sends the fields of %p', async (Action) => {
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
    const action = new Action();
    jest.spyOn(action, 'buildAttributes').mockReturnValue({ probe: true });
    const statement = { query: 'WHERE id = 1', values: [] };

    await new CreativeService(client).performCreativeAction(action, statement);

    expect(sent).toEqual([
      { creativeAction: { attributes: { 'xsi:type': Action.name }, probe: true }, filterStatement: statement },
    ]);
  });
});
