import { ResultSet } from './publisherQueryLanguage.type';
import { Statement } from '../../../common/types';

/**
 * Provides methods for executing a PQL {@link https://developers.google.com/ad-manager/api/reference/v202202/PublisherQueryLanguageService.Statement Statement}
 * to retrieve information from the system. In order to support the selection of columns of interest from various tables,
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/PublisherQueryLanguageService.Statement Statement} objects support a "select" clause.
 *
 * An example query text might be **`"select CountryCode, Name from Geo_Target"`**, where **`CountryCode`** and **`Name`** are columns of interest and **`Geo_Target`** is the table.
 *
 * The following tables are supported:
 */
export interface PublisherQueryLanguageServiceOperations {
  /**
   * Retrieves rows of data that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/PublisherQueryLanguageService.Statement#query Statement.query} from the system.
   *
   * @param selectStatement a Publisher Query Language statement used to specify what data needs to returned
   * @returns a result set of data that matches the given filter
   */
  select(selectStatement: Statement): Promise<ResultSet>;
}
