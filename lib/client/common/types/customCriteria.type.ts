import { CmsMetadataCriteriaComparisonOperator, ComparisonOperator, LogicalOperator } from '../enums';
import { XsiType } from './xsiType.type';

/**
 * A CustomCriteria object is used to perform custom criteria targeting on custom targeting keys of type CustomTargetingKey.Type.PREDEFINED or CustomTargetingKey.Type.FREEFORM.
 */
export type CustomCriteria = XsiType<'CustomCriteria'> & {
  /**
   * The CustomTargetingKey.id of the CustomTargetingKey object that was created using CustomTargetingService. This attribute is required.
   */
  keyId: number;

  /**
   * The ids of CustomTargetingValue objects to target the custom targeting key with id CustomCriteria.keyId. This attribute is required.
   */
  valueIds: number[];

  /**
   * The comparison operator. This attribute is required.
   */
  operator: ComparisonOperator;
};

/**
 * A CmsMetadataCriteria object is used to target CmsMetadataValue objects.
 */
export type CmsMetadataCriteria = XsiType<'CmsMetadataCriteria'> & {
  /**
   * The comparison operator. This attribute is required.
   */
  operator: CmsMetadataCriteriaComparisonOperator;

  /**
   * The ids of CmsMetadataValue objects used to target CMS metadata. This attribute is required.
   */
  cmsMetadataValueIds: number[];
};

/**
 * An AudienceSegmentCriteria object is used to target AudienceSegment objects.
 */
export type AudienceSegmentCriteria = XsiType<'AudienceSegmentCriteria'> & {
  /**
   * The comparison operator. This attribute is required.
   */
  operator: ComparisonOperator;

  /**
   * The ids of AudienceSegment objects used to target audience segments. This attribute is required.
   */
  audienceSegmentIds: number[];
};

/**
 * A CustomCriteriaSet comprises of a set of CustomCriteriaNode objects combined by the CustomCriteriaSet.LogicalOperator.logicalOperator. The custom criteria targeting tree is subject to the rules defined on Targeting.customTargeting.
 */
export type CustomCriteriaSet = XsiType<'CustomCriteriaSet'> & {
  /**
   * The logical operator to be applied to CustomCriteriaSet.children. This attribute is required.
   */
  logicalOperator: LogicalOperator;

  /**
   * The custom criteria. This attribute is required.
   */
  children: CustomCriteriaNode[];
};

/**
 * A CustomCriteriaLeaf object represents a generic leaf of CustomCriteria tree structure.
 *
 * Abstract in the WSDL: set `attributes: { 'xsi:type': ... }` to the concrete type.
 */
export type CustomCriteriaLeaf = CustomCriteria | CmsMetadataCriteria | AudienceSegmentCriteria;

/**
 * A CustomCriteriaNode is a node in the custom targeting tree. A custom criteria node can either be a CustomCriteriaSet (a non-leaf node)
 * or a CustomCriteria (a leaf node). The custom criteria targeting tree is subject to the rules defined on Targeting.customTargeting.
 *
 * Abstract in the WSDL: set `attributes: { 'xsi:type': ... }` to the concrete type.
 */
export type CustomCriteriaNode = CustomCriteriaSet | CustomCriteriaLeaf;
