import { Date, DateTime } from '../../../common/types';
import { Targeting } from './targeting.type';

/**
 * The `xsi:type` of an object, which node-soap writes as an attribute of its
 * element. A field whose WSDL type is abstract (`Creative`,
 * `CustomCriteriaNode`, `BaseCustomFieldValue`...) needs it: node-soap does
 * not add it, and Ad Manager rejects the request without it.
 *
 * `Name` is the union of the concrete WSDL types the object can be.
 */
export type XsiType<Name extends string> = {
  attributes?: { 'xsi:type': Name };
};

/**
 * A WSDL `Value` with its `xsi:type`, as a custom field value needs it, for
 * example `{ attributes: { 'xsi:type': 'TextValue' }, value: 'text' }`.
 * (StatementBuilder builds the values of a statement itself.)
 */
export type TypedValue =
  | { attributes: { 'xsi:type': 'TextValue' }; value?: string }
  | { attributes: { 'xsi:type': 'NumberValue' }; value?: string }
  | { attributes: { 'xsi:type': 'BooleanValue' }; value?: boolean }
  | { attributes: { 'xsi:type': 'DateValue' }; value?: Date }
  | { attributes: { 'xsi:type': 'DateTimeValue' }; value?: DateTime }
  | { attributes: { 'xsi:type': 'SetValue' }; values?: TypedValue[] }
  | { attributes: { 'xsi:type': 'TargetingValue' }; value?: Targeting }
  | { attributes: { 'xsi:type': 'ChangeHistoryValue' }; entityType?: string; operation?: string };
