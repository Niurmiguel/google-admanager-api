import { Contact, ContactPage } from './contact.type';
import { Statement } from '../../../common/types';

/**
 *
 */
export interface ContactServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.Contact Contact} objects.
   *
   * @param contacts the contacts to create
   * @returns the created contacts with their IDs filled in
   */
  createContacts(contacts: Contact[]): Promise<Contact[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.ContactPage ContactPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.Contact Contact} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property | PQL Property                                                                                                              |
   * | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
   * | name         | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.Contact#name Contact.name}           |
   * | email        | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.Contact#email Contact.email}         |
   * | id           | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.Contact#id Contact.id}               |
   * | comment      | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.Contact#comment Contact.comment}     |
   * | title        | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.Contact#title Contact.title}         |
   * | companyId    | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.Contact#companyId Contact.companyId} |
   * | cellPhone    | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.Contact#cellPhone Contact.cellPhone} |
   * | workPhone    | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.Contact#workPhone Contact.workPhone} |
   * | faxPhone     | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.Contact#faxPhone Contact.faxPhone}   |
   * | status       | {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.Contact#status Contact.status}       |
   *
   * @param statement
   * @returns the contacts that match the given filter
   */
  getContactsByStatement(statement: Statement): Promise<ContactPage>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.Contact Contact} objects.
   *
   * @param contacts the contacts to update
   * @returns the updated contacts
   */
  updateContacts(contacts: Contact[]): Promise<Contact[]>;
}
