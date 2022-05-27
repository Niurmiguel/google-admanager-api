import { Value } from '@common/types';

/**
 * Contains information about a column in a ResultSet.
 */
export type ColumnType = {
  /**
   * Represents the column's name.
   */
  labelName: string;
};

/**
 * Each Row object represents data about one entity in a ResultSet.
 */
export type Row = {
  /**
   * Represents a collection of values belonging to one entity.
   */
  values: Value[];
};

/**
 * The ResultSet represents a table of data obtained from the execution of a PQL Statement.
 */
export type ResultSet = {
  /**
   * A collection of ColumnType objects.
   */
  columnTypes: ColumnType[];
  /**
   * A collection of Row objects.
   */
  rows: Row[];
};
