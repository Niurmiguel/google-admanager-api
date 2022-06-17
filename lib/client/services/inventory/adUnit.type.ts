import { AppliedLabel, FrequencyCap, Size } from '../../common/types';
import { DateTime, PageResult } from '../../../common/types';
import { EnvironmentType } from '../../common/enums';
import {
  AdSenseSettingsAdType,
  AdSenseSettingsBorderStyle,
  AdSenseSettingsFontFamily,
  AdSenseSettingsFontSize,
  AdUnitTargetWindow,
  InventoryStatus,
  SmartSizeMode,
  ValueSourceType,
} from './adUnit.enum';

/**
 * Contains the AdSense configuration for an AdUnit.
 */
export type AdSenseSettings = {
  /**
   * Specifies whether or not the AdUnit is enabled for serving ads from the AdSense content network. This attribute is optional and defaults to the ad unit's parent or ancestor's setting if one has been set. If no ancestor of the ad unit has set adSenseEnabled, the attribute is defaulted to true.
   */
  adSenseEnabled: boolean;

  /**
   * Specifies the Hexadecimal border color, from 000000 to FFFFFF. This attribute is optional and defaults to the ad unit's parent or ancestor's setting if one has been set. If no ancestor of the ad unit has set borderColor, the attribute is defaulted to FFFFFF.
   */
  borderColor: string;

  /**
   * Specifies the Hexadecimal title color of an ad, from 000000 to FFFFFF. This attribute is optional and defaults to the ad unit's parent or ancestor's setting if one has been set. If no ancestor of the ad unit has set titleColor, the attribute is defaulted to 0000FF.
   */
  titleColor: string;

  /**
   * Specifies the Hexadecimal background color of an ad, from 000000 to FFFFFF. This attribute is optional and defaults to the ad unit's parent or ancestor's setting if one has been set. If no ancestor of the ad unit has set backgroundColor, the attribute is defaulted to FFFFFF.
   */
  backgroundColor: string;

  /**
   * Specifies the Hexadecimal color of the text of an ad, from 000000 to FFFFFF. This attribute is optional and defaults to the ad unit's parent or ancestor's setting if one has been set. If no ancestor of the ad unit has set textColor, the attribute is defaulted to 000000.
   */
  textColor: string;

  /**
   * Specifies the Hexadecimal color of the URL of an ad, from 000000 to FFFFFF. This attribute is optional and defaults to the ad unit's parent or ancestor's setting if one has been set. If no ancestor of the ad unit has set urlColor, the attribute is defaulted to 008000 .
   */
  urlColor: string;

  /**
   * Specifies what kind of ad can be served by this AdUnit from the AdSense Content Network. This attribute is optional and defaults to the ad unit's parent or ancestor's setting if one has been set. If no ancestor of the ad unit has set adType, the attribute is defaulted to AdType.TEXT_AND_IMAGE.
   */
  adType: AdSenseSettingsAdType;
  /**
   * Specifies the border-style of the AdUnit. This attribute is optional and defaults to the ad unit's parent or ancestor's setting if one has been set. If no ancestor of the ad unit has set borderStyle, the attribute is defaulted to BorderStyle.DEFAULT.
   */
  borderStyle: AdSenseSettingsBorderStyle;
  /**
   * Specifies the font family of the AdUnit. This attribute is optional and defaults to the ad unit's parent or ancestor's setting if one has been set. If no ancestor of the ad unit has set fontFamily, the attribute is defaulted to FontFamily.DEFAULT.
   */
  fontFamily: AdSenseSettingsFontFamily;
  /**
   * Specifies the font size of the AdUnit. This attribute is optional and defaults to the ad unit's parent or ancestor's setting if one has been set. If no ancestor of the ad unit has set fontSize, the attribute is defaulted to FontSize.DEFAULT.
   */
  fontSize: AdSenseSettingsFontSize;
};

/**
 * A LabelFrequencyCap assigns a frequency cap to a label.
 * The frequency cap will limit the cumulative number of impressions of any ad units with this label that may be shown to a particular user over a time unit.
 */
export type LabelFrequencyCap = {
  /**
   * The frequency cap to be applied with this label.
   */
  frequencyCap: FrequencyCap;
  /**
   * ID of the label being capped on the AdUnit.
   */
  labelId: number;
};

/**
 * The summary of a parent {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit AdUnit}.
 */
export type AdUnitParent = {
  /**
   * The ID of the parent AdUnit. This value is readonly and is populated by Google.
   */
  id: string;
  /**
   * The name of the parent AdUnit. This value is readonly and is populated by Google.
   */
  name: string;
  /**
   * A string used to uniquely identify the ad unit for the purposes of serving the ad. This attribute is read-only and is assigned by Google when an ad unit is created.
   */
  adUnitCode: string;
};

/**
 * An AdUnitSize represents the size of an ad in an ad unit. This also represents the environment and companions of a particular ad in an ad unit.
 * In most cases, it is a simple size with just a width and a height (sometimes representing an aspect ratio).
 */
export type AdUnitSize = {
  /**
   * The permissible creative size that can be served inside this ad unit.
   */
  size: Size;
  /**
   * The environment type of the ad unit size. The default value is EnvironmentType.BROWSER.
   */
  environmentType: EnvironmentType;
  /**
   * The companions for this ad unit size. Companions are only valid if the environment is EnvironmentType.VIDEO_PLAYER. If the environment is EnvironmentType.BROWSER including companions results in an error.
   */
  companions: AdUnitSize[];
  /**
   * The full (including companion sizes, if applicable) display string of the size, e.g. "300x250" or "300x250v (180x150)"
   */
  fullDisplayString: string;
  /**
   * Whether the inventory size is audio. If set to true, Size will be set to "1x1" and EnvironmentType will be set to EnvironmentType.VIDEO_PLAYER regardless of user input.
   */
  isAudio: boolean;
};

/**
 * An AdUnit represents a chunk of identified inventory for the publisher.
 * It contains all the settings that need to be associated with inventory in order to serve ads to it.
 * An AdUnit can also be the parent of other ad units in the inventory hierarchy.
 */
export type AdUnit = {
  /**
   * Uniquely identifies the AdUnit. This value is read-only and is assigned by Google when an ad unit is created. This attribute is required for updates.
   */
  id: string;

  /**
   * The ID of the ad unit's parent. Every ad unit has a parent except for the root ad unit, which is created by Google.
   * This attribute is required when creating the ad unit. Once the ad unit is created this value will be read-only.
   */
  parentId: string;

  /**
   * This field is set to true if the ad unit has any children. This attribute is read-only and is populated by Google.
   */
  hasChildren: boolean;

  /**
   * The path to this ad unit in the ad unit hierarchy represented as a list from the root to this ad unit's parent.
   * For root ad units, this list is empty. This attribute is read-only and is populated by Google.
   */
  parentPath: AdUnitParent[];

  /**
   * The name of the ad unit. This attribute is required and its maximum length is 255 characters. This attribute must also be case-insensitive unique.
   */
  name: string;

  /**
   * A description of the ad unit. This value is optional and its maximum length is 65,535 characters.
   */
  description: string;

  /**
   * The value to use for the HTML link's target attribute. This value is optional and will be interpreted as TargetWindow.TOP if left blank.
   */
  targetWindow: AdUnitTargetWindow;
  /**
   * The status of this ad unit. It defaults to InventoryStatus.ACTIVE. This value cannot be updated directly using InventoryService.updateAdUnit.
   * It can only be modified by performing actions via InventoryService.performAdUnitAction.
   */
  status: InventoryStatus;
  /**
   * A string used to uniquely identify the ad unit for the purposes of serving the ad.
   * This attribute is optional and can be set during ad unit creation.
   * If it is not provided, it will be assigned by Google based off of the inventory unit ID.
   * Once an ad unit is created, its adUnitCode cannot be changed.
   */
  adUnitCode: string;

  /**
   * The permissible creative sizes that can be served inside this ad unit. This attribute is optional. This attribute replaces the sizes attribute.
   */
  adUnitSizes: AdUnitSize[];

  /**
   * Whether this is an interstitial ad unit.
   */
  isInterstitial: boolean;

  /**
   * Whether this is a native ad unit.
   */
  isNative: boolean;

  /**
   * Whether this is a fluid ad unit.
   */
  isFluid: boolean;

  /**
   * If this field is set to true, then the AdUnit will not be implicitly targeted when its parent is.
   * Traffickers must explicitly target such an ad unit or else no line items will serve to it. This feature is only available for Ad Manager 360 accounts.
   */
  explicitlyTargeted: boolean;

  /**
   * AdSense specific settings. To overwrite this, set the adSenseSettingsSource to PropertySourceType.DIRECTLY_SPECIFIED when setting the value of this field.
   */
  adSenseSettings: AdSenseSettings;

  /**
   * Specifies the source of adSenseSettings value. To revert an overridden value to its default, set this field to PropertySourceType.PARENT.
   */
  adSenseSettingsSource: ValueSourceType;
  /**
   * The set of label frequency caps applied directly to this ad unit. There is a limit of 10 label frequency caps per ad unit.
   */
  appliedLabelFrequencyCaps: LabelFrequencyCap[];

  /**
   * Contains the set of labels applied directly to the ad unit as well as those inherited from parent ad units. This field is readonly and is assigned by Google.
   */
  effectiveLabelFrequencyCaps: LabelFrequencyCap[];

  /**
   * The set of labels applied directly to this ad unit.
   */
  appliedLabels: AppliedLabel[];

  /**
   * Contains the set of labels applied directly to the ad unit as well as those inherited from the parent ad units. If a label has been negated, only the negated label is returned. This field is readonly and is assigned by Google.
   */
  effectiveAppliedLabels: AppliedLabel[];

  /**
   * The IDs of all teams that this ad unit is on as well as those inherited from parent ad units. This value is read-only and is set by Google.
   */
  effectiveTeamIds: number[];

  /**
   * The IDs of all teams that this ad unit is on directly.
   */
  appliedTeamIds: number[];

  /**
   * The date and time this ad unit was last modified.
   */
  lastModifiedDateTime: DateTime;

  /**
   * The smart size mode for this ad unit. This attribute is optional and defaults to SmartSizeMode.NONE for fixed sizes.
   */
  smartSizeMode: SmartSizeMode;
  /**
   * The interval in seconds which ad units in mobile apps automatically refresh. Valid values are between 30 and 120 seconds. This attribute is optional and only applies to ad units in mobile apps. If this value is not set, then the mobile app ad will not refresh.
   */
  refreshRate: number;

  /**
   * Specifies an ID for a channel in an external set-top box campaign management system. This attribute is only meaningful if isSetTopBoxEnabled is true. This attribute is read-only.
   */
  externalSetTopBoxChannelId: string;

  /**
   * Flag that specifies whether this ad unit represents an external set-top box channel. This attribute is read-only.
   */
  isSetTopBoxEnabled: boolean;

  /**
   * The MobileApplication.applicationId for the CTV application that this ad unit is within. This attribute is optional.
   */
  applicationId: number;
};

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/InventoryService.AdUnit AdUnit} objects.
 */
export type AdUnitPage = PageResult<AdUnit>;
