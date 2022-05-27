import { ContactStatus } from './contact.enum';
import { PageResult } from '@common/types';

/**
 *
 */
type BaseContact = {};

/**
 * A Contact represents a person who is affiliated with a single {@link https://developers.google.com/ad-manager/api/reference/v202202/CompanyService.Company?hl=pt Company}.
 * A contact can have a variety of contact information associated to it, and can be invited to view their company's orders, line items, creatives, and reports.
 */
export type Contact = BaseContact & {
  /**
   * The unique ID of the Contact. This value is readonly and is assigned by Google.
   */
  id: number;
  /**
   * The name of the contact. This attribute is required and has a maximum length of 127 characters.
   */
  name: string;
  /**
   * The ID of the Company that this contact is associated with. This attribute is required and immutable.
   */
  companyId: number;
  /**
   * The status of the contact. This attribute is readonly and is assigned by Google.
   */
  status: ContactStatus;
  /**
   * The address of the contact. This attribute is optional and has a maximum length of 1024 characters.
   */
  address: string;
  /**
   * The cell phone number where the contact can be reached. This attribute is optional.
   */
  cellPhone: string;
  /**
   * A free-form text comment for the contact. This attribute is optional and has a maximum length of 1024 characters.
   */
  comment: string;
  /**
   * The e-mail address where the contact can be reached. This attribute is optional.
   */
  email: string;
  /**
   * The fax number where the contact can be reached. This attribute is optional.
   */
  faxPhone: string;
  /**
   * The job title of the contact. This attribute is optional and has a maximum length of 1024 characters.
   */
  title: string;
  /**
   * The work phone number where the contact can be reached. This attribute is optional.
   */
  workPhone: string;
};

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/ContactService.Contact?hl=pt Contact} objects.
 */
export type ContactPage = PageResult<Contact>;
