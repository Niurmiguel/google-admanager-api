import { PageResult } from '../../../common/types';
import { ThirdPartyDataDeclaration } from '../../common/types';
import {
  ConversionEvent,
  CreativeWrapperOrdering,
  CreativeWrapperStatus,
  CreativeWrapperType,
} from './creativeWrapper.enum';

/**
 * A list of URLs that should be pinged for a conversion event.
 */
export type TrackingUrls = {
  /**
   * A list of all URLs that should be pinged.
   */
  urls: string[];
};

/**
 * This represents an entry in a map with a key of type ConversionEvent and value of type TrackingUrls.
 */
export type ConversionEvent_TrackingUrlsMapEntry = {
  key: ConversionEvent;

  value: TrackingUrls;
};

/**
 * A CreativeWrapper allows the wrapping of HTML snippets to be served along with Creative objects.
 *
 * Creative wrappers must be associated with a LabelType.CREATIVE_WRAPPER label and applied to ad units by AdUnit.appliedLabels.
 */
export type CreativeWrapper = {
  /**
   * The unique ID of the CreativeWrapper. This value is readonly and is assigned by Google.
   */
  id: number;

  /**
   * The ID of the Label which will be used to label ad units. The labelId on a creative wrapper cannot be changed once it is created.
   */
  labelId: number;

  /**
   * The creative wrapper type. If the creative wrapper type is CreativeWrapperType.VIDEO_TRACKING_URL, the videoTrackingUrls field must be set. If the creative wrapper type is CreativeWrapperType.HTML, either the header or footer field must be set. This field is required.
   */
  creativeWrapperType: CreativeWrapperType;

  /**
   * The header HTML snippet that this creative wrapper delivers.
   */
  htmlHeader: string;

  /**
   * The footer HTML snippet that this creative wrapper delivers.
   */
  htmlFooter: string;

  /**
   * The header AMP snippet that this creative wrapper delivers.
   */
  ampHead: string;

  /**
   * The footer AMP snippet that this creative wrapper delivers.
   */
  ampBody: string;

  /**
   * The video tracking URLs that this creative wrapper delivers. This field is required if the creativeWrapperType is CreativeWrapperType.VIDEO_TRACKING_URL and ignored otherwise.
   */
  videoTrackingUrls: ConversionEvent_TrackingUrlsMapEntry[];

  /**
   * The ThirdPartyDataDeclaration for this creative wrapper.
   *
   * It is copied to one of the underlying creatives. If the header creative is active then it is persisted there. Otherwise it is stored on the footer creative.
   */
  thirdPartyDataDeclaration: ThirdPartyDataDeclaration;

  /**
   * If there are multiple wrappers for a creative, then ordering defines the order in which the HTML snippets are rendered.
   */
  ordering: CreativeWrapperOrdering;

  /**
   * The status of the CreativeWrapper. This attribute is readonly.
   */
  status: CreativeWrapperStatus;
};

/**
 * Represents the actions that can be performed on CreativeWrapper objects.
 */
export type CreativeWrapperAction = 'ActivateCreativeWrappers' | 'DeactivateCreativeWrappers';

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/CreativeWrapperService.CreativeWrapper CreativeWrapper} objects.
 */
export type CreativeWrapperPage = PageResult<CreativeWrapper>;
