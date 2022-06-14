import { ThirdPartyDataDeclaration } from '../../common/types';
import { Client } from 'soap';

import { Network } from './network.type';
import { NetworkServiceOperations } from './networkService.interface';

export class NetworkService implements NetworkServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  getAllNetworks() {
    return this._client.getAllNetworks();
  }

  getCurrentNetwork(): Network {
    return this._client.getCurrentNetwork();
  }

  getDefaultThirdPartyDataDeclaration(): ThirdPartyDataDeclaration {
    return this._client.getDefaultThirdPartyDataDeclaration();
  }

  makeTestNetwork(): Network {
    return this._client.makeTestNetwork();
  }

  updateNetwork(network: Network): Network {
    return this._client.updateNetwork(network);
  }
}
