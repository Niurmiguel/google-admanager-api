import { Client } from 'soap';

import { ContactServiceOperations } from './contactService.interface';
import { Contact, ContactPage } from './contact.type';
import { Statement } from '@common/types';

export class ContactService implements ContactServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createContacts(contacts: Contact[]): Promise<Contact[]> {
    return this._client.createContacts({ contacts });
  }

  async getContactsByStatement(statement: Statement): Promise<ContactPage> {
    return this._client.getContactsByStatement({
      statement,
    });
  }

  async updateContacts(contacts: Contact[]): Promise<Contact[]> {
    return this._client.updateContacts({ contacts });
  }
}
