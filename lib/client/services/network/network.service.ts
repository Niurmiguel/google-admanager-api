import { ThirdPartyDataDeclaration } from '../../common/types';
import { Client } from 'soap';

import { Network } from './network.type';
import { NetworkServiceOperations } from './networkService.interface';

export class NetworkService implements NetworkServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async getAllNetworks(): Promise<Network[]> {
    return this._client.getAllNetworks();
  }

  async getCurrentNetwork(): Promise<Network> {
    return this._client.getCurrentNetwork();
  }

  async getDefaultThirdPartyDataDeclaration(): Promise<ThirdPartyDataDeclaration> {
    return this._client.getDefaultThirdPartyDataDeclaration();
  }

  async makeTestNetwork(): Promise<Network> {
    return this._client.makeTestNetwork();
  }

  async updateNetwork(network: Network): Promise<Network> {
    return this._client.updateNetwork({ network });
  }
}
