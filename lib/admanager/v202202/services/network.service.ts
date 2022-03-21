import { Client } from 'soap';

export class NetworkService {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  getAllNetworks() {
    return this._client.getAllNetworks();
  }
}
