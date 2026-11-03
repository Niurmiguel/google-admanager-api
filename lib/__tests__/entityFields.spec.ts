/**
 * Field names of entity types checked against the complexType of the
 * v202608 WSDL (compile-time: ts-jest fails the suite on type errors).
 * The lists are copied from the <complexType> elements of the WSDL.
 */
import { ProposalLineItem } from '../client/services/proposalLineItem/proposalLineItem.type';
import { LineItemTemplate } from '../client/services/lineItemTemplate/lineItemTemplate.type';

// ProposalLineItemService.wsdl, complexType ProposalLineItem
const PROPOSAL_LINE_ITEM_WSDL = [
  'id', 'proposalId', 'name', 'startDateTime', 'endDateTime', 'supplyPath', 'internalNotes', 'isArchived', 'goal',
  'secondaryGoals', 'contractedUnitsBought', 'deliveryRateType', 'roadblockingType', 'buyerPermissionType',
  'companionDeliveryOption', 'videoMaxDuration', 'videoCreativeSkippableAdType', 'frequencyCaps', 'dfpLineItemId',
  'lineItemType', 'lineItemPriority', 'rateType', 'creativePlaceholders', 'targeting', 'customFieldValues',
  'appliedLabels', 'effectiveAppliedLabels', 'disableSameAdvertiserCompetitiveExclusion', 'isSold', 'netRate',
  'netCost', 'deliveryIndicator', 'deliveryData', 'computedStatus', 'lastModifiedDateTime', 'reservationStatus',
  'lastReservationDateTime', 'environmentType', 'allowedFormats', 'additionalTerms', 'programmaticCreativeSource',
  'grpSettings', 'estimatedMinimumImpressions', 'thirdPartyMeasurementSettings', 'makegoodInfo', 'hasMakegood',
  'canCreateMakegood', 'pauseRole', 'pauseReason', 'deliveryAllocationProfileId',
] as const; // prettier-ignore

// LineItemTemplateService.wsdl, complexType LineItemTemplate
const LINE_ITEM_TEMPLATE_WSDL = [
  'id', 'name', 'isDefault', 'lineItemName', 'enabledForSameAdvertiserException', 'notes', 'lineItemType',
  'deliveryRateType', 'roadblockingType', 'creativeRotationType',
] as const; // prettier-ignore

/** Keys of T that the WSDL does not declare. */
type Unknown<T, Wsdl extends readonly string[]> = Exclude<keyof T, Wsdl[number]>;

describe('entity field names', () => {
  it('ProposalLineItem only declares fields of the WSDL', () => {
    const none: [Unknown<ProposalLineItem, typeof PROPOSAL_LINE_ITEM_WSDL>] extends [never]
      ? true
      : Unknown<ProposalLineItem, typeof PROPOSAL_LINE_ITEM_WSDL> = true;

    expect(none).toBe(true);
  });

  it('LineItemTemplate only declares fields of the WSDL', () => {
    const none: [Unknown<LineItemTemplate, typeof LINE_ITEM_TEMPLATE_WSDL>] extends [never]
      ? true
      : Unknown<LineItemTemplate, typeof LINE_ITEM_TEMPLATE_WSDL> = true;

    expect(none).toBe(true);
  });

  it('keeps the fields whose names were corrupted', () => {
    const proposalLineItem = [
      'id',
      'proposalId',
      'name',
      'internalNotes',
      'isArchived',
      'contractedUnitsBought',
    ] as const satisfies readonly (keyof ProposalLineItem)[];
    const lineItemTemplate = ['creativeRotationType'] as const satisfies readonly (keyof LineItemTemplate)[];

    expect(PROPOSAL_LINE_ITEM_WSDL).toEqual(expect.arrayContaining([...proposalLineItem]));
    expect(LINE_ITEM_TEMPLATE_WSDL).toEqual(expect.arrayContaining([...lineItemTemplate]));
  });
});
