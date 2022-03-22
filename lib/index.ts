export { googleSACredential, googleSAFileCredential } from './auth';

import { googleSAFileCredential } from '@auth';
import { AdManagerClient } from './admanager';

async function main() {
  const credential = await new googleSAFileCredential('./credential.json', [
    'ad_manager',
  ]);

  const admanager = new AdManagerClient(117238412, credential);
  const network = await admanager.getService('v202202', 'NetworkService');

  const response = await network.getCurrentNetwork();

  console.log(response);
}

main();
