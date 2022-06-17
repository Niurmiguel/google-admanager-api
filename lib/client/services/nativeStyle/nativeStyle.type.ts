import { PageResult } from '../../../common/types';
import { Size, Targeting } from '../../common/types';
import { NativeStyleStatus } from './nativeStyle.enum';

/**
 * Used to define the look and feel of native ads, for both web and apps. Native styles determine how native creatives look for a segment of inventory.
 */
export type NativeStyle = {
  /**
   * Uniquely identifies the NativeStyle. This attribute is read-only and is assigned by Google when a native style is created.
   */
  id: number;

  /**
   * The name of the native style. This attribute is required and has a maximum length of 255 characters.
   */
  name: string;

  /**
   * The HTML snippet of the native style with placeholders for the associated variables. This attribute is required.
   */
  htmlSnippet: string;

  /**
   * The CSS snippet of the native style, with placeholders for the associated variables. This attribute is required.
   */
  cssSnippet: string;

  /**
   * The creative template ID this native style associated with. This attribute is required on creation and is read-only afterwards.
   */
  creativeTemplateId: number;

  /**
   * Whether this is a fluid size native style. If true, this must be used with 1x1 size.
   */
  isFluid: boolean;

  /**
   * The targeting criteria for this native style. Only ad unit and key-value targeting are supported at this time.
   */
  targeting: Targeting;

  /**
   * The status of the native style. This attribute is read-only.
   */
  status: NativeStyleStatus;

  /**
   * The size of the native style. This attribute is required.
   */
  size: Size;
};

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/NativeStyleService.NativeStyle NativeStyle} objects.
 */
export type NativeStylePage = PageResult<NativeStyle>;
