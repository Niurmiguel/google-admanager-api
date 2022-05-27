import { DateTime, Date } from './date.type';

/**
 * Captures the **`WHERE`**, **`ORDER BY`** and **`LIMIT`** clauses of a PQL query.
 * Statements are typically used to retrieve objects of a predefined domain type, which makes SELECT clause unnecessary.
 *
 * An example query text might be **`"WHERE status = 'ACTIVE' ORDER BY id LIMIT 30"`**.
 *
 * Statements support bind variables.
 * These are substitutes for literals and can be thought of as input parameters to a PQL query.
 *
 * An example of such a query might be **`"WHERE id = :idValue"`**.
 *
 * Statements also support use of the LIKE keyword. This provides wildcard string matching.
 *
 * An example of such a query might be **`"WHERE name LIKE '%searchString%'"`**.
 *
 * The value for the variable idValue must then be set with an object of type
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.Value Value}, e.g.,
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.NumberValue NumberValue},
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.TextValue TextValue} or
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/UserService.BooleanValue BooleanValue}.
 */
export type Statement = {
  /**
   * Holds the query in PQL syntax. The syntax is:
   *
   * [WHERE
   * <condition> {[AND | OR] <condition> ...}]
   *
   * [ORDER BY <property> [ASC | DESC]]
   *
   * [LIMIT {[<offset>,] <count>} | {<count> OFFSET <offset>}]
   *
   * <condition>
   * := <property> {< | <= | > | >= | = | != } <value>
   * <condition>
   * := <property> {< | <= | > | >= | = | != }
   * <bind variable>
   * <condition> := <property> IN
   * <list>
   * <condition> := <property> IS
   * NULL
   * <condition> := <property> LIKE
   * <wildcard%match>
   * <bind variable> :=
   * :<name>
   */
  query: string;

  /**
   * Holds keys and values for bind variables and their values. The key is the
   * name of the bind variable. The value is the literal value of the variable.
   *
   * In the example "WHERE status = :bindStatus ORDER BY id LIMIT 30", the bind
   * variable, represented by :bindStatus is named bindStatus, which would also
   * be the parameter map key. The bind variable's value would be represented
   * by a parameter map value of type TextValue. The final result, for example,
   * would be an entry of "bindStatus" => StringParam("ACTIVE").
   */
  values: String_ValueMapEntry[];
};

/**
 * This represents an entry in a map with a key of type String and value of
 * type Value.
 */
export type String_ValueMapEntry = {
  key: string;
  value: Value;
};

export type Value =
  | string
  | number
  | object
  | boolean
  | DateTime
  | Date
  | Value[];

/**
 * Captures a page of any objects.
 */
export type PageResult<T> = {
  /**
   * The size of the total result set to which this page belongs.
   */
  totalResultSetSize: number;

  /**
   * The absolute index in the total result set on which this page begins.
   */
  startIndex: number;

  /**
   * The collection of activity groups contained within this page.
   */
  results: T[];
};

/**
 * Represents the result of performing an action on objects.
 */
export type UpdateResult = {
  /**
   * The number of objects that were changed as a result of performing the action.
   */
  numChanges: number;
};
