/**
 * Different mime type that the asset variable supports.
 */
export enum AssetCreativeTemplateVariableMimeType {
  JPG = 'JPG',
  PNG = 'PNG',
  GIF = 'GIF',
  SWF = 'SWF',
}

/**
 * Describes status of the creative template
 */
export enum CreativeTemplateStatus {
  /**
   * The CreativeTemplate is active
   */
  ACTIVE = 'ACTIVE',
  /**
   * The CreativeTemplate is inactive. Users cannot create new creatives from this template, but existing ones can be edited and continue to serve
   */
  INACTIVE = 'INACTIVE',
  /**
   * The CreativeTemplate is deleted. Creatives created from this CreativeTemplate can no longer serve.
   */
  DELETED = 'DELETED',
}

/**
 * Describes type of the creative template.
 */
export enum CreativeTemplateType {
  /**
   * Creative templates that Google defines for users to use.
   */
  SYSTEM_DEFINED = 'SYSTEM_DEFINED',
  /**
   * Arbitrary creative templates that users can define as they see fit. Such templates are bound to a specific network and can only be used with creatives being created under the network.
   */
  USER_DEFINED = 'USER_DEFINED',
}
