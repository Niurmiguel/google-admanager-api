/**
 * Corresponds to an HTML link's target attribute.
 */
export enum AdUnitTargetWindow {
  /**
   * Specifies that the link should open in the full body of the page.
   */
  TOP = 'TOP',
  /**
   * Specifies that the link should open in a new window.
   */
  BLANK = 'BLANK',
}

/**
 * Represents the status of objects that represent inventory - ad units and placements.
 */
export enum InventoryStatus {
  /**
   * The object is active.
   */
  ACTIVE = 'ACTIVE',
  /**
   * The object is no longer active.
   */
  INACTIVE = 'INACTIVE',
  /**
   * The object has been archived.
   */
  ARCHIVED = 'ARCHIVED',
}

/**
 * Specifies the type of ads that can be served through this {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit AdUnit}.
 */
export enum AdSenseSettingsAdType {
  /**
   * Allows text-only ads.
   */
  TEXT = 'TEXT',
  /**
   * Allows image-only ads.
   */
  IMAGE = 'IMAGE',
  /**
   * Allows both text and image ads.
   */
  TEXT_AND_IMAGE = 'TEXT_AND_IMAGE',
}

/**
 * Describes the border of the HTML elements used to surround an ad displayed by the {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit AdUnit}.
 */
export enum AdSenseSettingsBorderStyle {
  /**
   * Uses the default border-style of the browser.
   */
  DEFAULT = 'DEFAULT',
  /**
   * Uses a cornered border-style.
   */
  NOT_ROUNDED = 'NOT_ROUNDED',
  /**
   * Uses a slightly rounded border-style.
   */
  SLIGHTLY_ROUNDED = 'SLIGHTLY_ROUNDED',
  /**
   * Uses a rounded border-style.
   */
  VERY_ROUNDED = 'VERY_ROUNDED',
}

/**
 * List of all possible font families.
 */
export enum AdSenseSettingsFontFamily {
  DEFAULT = 'DEFAULT',
  ARIAL = 'ARIAL',
  TAHOMA = 'TAHOMA',
  GEORGIA = 'GEORGIA',
  TIMES = 'TIMES',
  VERDANA = 'VERDANA',
}

/**
 * List of all possible font sizes the user can choose.
 */
export enum AdSenseSettingsFontSize {
  DEFAULT = 'DEFAULT',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

/**
 * Identifies the source of a field's value.
 */
export enum ValueSourceType {
  /**
   * The field's value is inherited from the parent object.
   */
  PARENT = 'PARENT',
  /**
   * The field's value is user specified and not inherited.
   */
  DIRECTLY_SPECIFIED = 'DIRECTLY_SPECIFIED',
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Represents smart size modes.
 */
export enum SmartSizeMode {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Fixed size mode (default).
   */
  NONE = 'NONE',
  /**
   * The height is fixed for the request, the width is a range.
   */
  SMART_BANNER = 'SMART_BANNER',
  /**
   * Height and width are ranges.
   */
  DYNAMIC_SIZE = 'DYNAMIC_SIZE',
}
