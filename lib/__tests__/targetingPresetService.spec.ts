import { Client } from 'soap';

import { TargetingPresetService } from '../client/services';
import { DeleteTargetingPresetAction } from '../client/services/targetingPresent/targetingPresent.action';
import { StatementBuilder } from '../common/utils';

function fakeClient() {
  const calls: { op: string; args: unknown }[] = [];
  const handler: ProxyHandler<object> = {
    get: (_target, op) => async (args: unknown) => {
      calls.push({ op: String(op), args });
      return null;
    },
  };

  return { client: new Proxy({}, handler) as unknown as Client, calls };
}

describe('TargetingPresetService', () => {
  it('sends the operations and argument names declared in the v202608 WSDL', async () => {
    const { client, calls } = fakeClient();
    const service = new TargetingPresetService(client);
    const statement = new StatementBuilder().where('id = 1').toStatement();
    const preset = { id: 1, name: 'preset', targeting: {} as never };

    await service.createTargetingPresets([preset]);
    await service.updateTargetingPresets([preset]);
    await service.getTargetingPresetsByStatement(statement);
    await service.performTargetingPresetAction(new DeleteTargetingPresetAction(), statement);

    expect(calls).toEqual([
      { op: 'createTargetingPresets', args: { targetingPresets: [preset] } },
      { op: 'updateTargetingPresets', args: { targetingPresets: [preset] } },
      { op: 'getTargetingPresetsByStatement', args: { filterStatement: statement } },
      {
        op: 'performTargetingPresetAction',
        args: {
          targetingPresetAction: { attributes: { 'xsi:type': 'DeleteTargetingPresetAction' } },
          filterStatement: statement,
        },
      },
    ]);
  });
});
