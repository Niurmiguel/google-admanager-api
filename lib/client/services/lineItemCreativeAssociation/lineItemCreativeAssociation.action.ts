/**
 * Represents the actions that can be performed on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation LineItemCreativeAssociation} objects.
 */
export abstract class LineItemCreativeAssociationAction {}

/**
 * The action used for activating {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation LineItemCreativeAssociation} objects.
 */
export class ActivateLineItemCreativeAssociations implements LineItemCreativeAssociationAction {}

/**
 * The action used for deactivating {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation LineItemCreativeAssociation} objects.
 */
export class DeactivateLineItemCreativeAssociations implements LineItemCreativeAssociationAction {}

/**
 * The action used for deleting {@link https://developers.google.com/ad-manager/api/reference/v202202/LineItemCreativeAssociationService.LineItemCreativeAssociation LineItemCreativeAssociation} objects.
 */
export class DeleteLineItemCreativeAssociations implements LineItemCreativeAssociationAction {}
