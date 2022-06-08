import { Size } from '../../common/types';
import { PageResult } from '../../../common/types';
import { ContainerType, DaiEncodingProfileStatus, VariantType } from './daiEncodingProfile.enum';

/**
 * Information about the video settings of an encoding profile.
 */
export type VideoSettings = {
  /**
   * The RFC6381 codec string of the audio.
   */
  codec: string;
  /**
   * The bitrate of the video, in bits per second. This value must be between 32kbps and 250 Mbps.
   */
  bitrate: number;
  /**
   * The frames per second of the video. This value will be truncated to three decimal places.
   */
  framesPerSecond: number;
  /**
   * The resolution of the video, in pixels.
   */
  resolution: Size;
};

/**
 * Information about the audio settings of an encoding profile.
 */
export type AudioSettings = {
  /**
   *  The RFC6381 codec string of the audio.
   */
  codec: string;
  /**
   * The bitrate of the audio, in bits per second. Required. This value must be between 8kbps and 250 Mbps.
   */
  bitrate: number;
  /**
   * The number of audio channels, including low frequency channels. This value has a maximum of 8.
   */
  channels: number;
  /**
   * The audio sample rate in hertz. Must be between 44kHz and 100kHz.
   */
  sampleRateHertz: number;
};

/**
 * A {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfile DaiEncodingProfile}
 * contains data about a publisher's encoding profiles. Ad Manager Dynamic Ad Insertion (DAI) uses the profile information about the content
 * to select an appropriate ad transcode to play for the particular video.
 */
export type DaiEncodingProfile = {
  /**
   * The unique ID of the DaiEncodingProfile. This value is read-only and is assigned by Google.
   */
  id: number;
  /**
   * The name of the DaiEncodingProfile. This value is required to create an encoding profile and may be at most 64 characters. The name field can contain alphanumeric characters and symbols other than the following: ", ', =, !, +, #, *, ~, ;, ^, (, ), <, >, [, ], the white space character.
   */
  name: string;
  /**
   * The status of this DaiEncodingProfile.
   *
   * DAI encoding profiles are created in the DaiEncodingProfileStatus.ACTIVE state. The status can only be modified through the DaiEncodingProfileService.performDaiEncodingProfileAction method.
   *
   * Only active profiles will be allowed to be associated with live streams.
   */
  status: DaiEncodingProfileStatus;
  /**
   * The variant playlist type that this DaiEncodingProfile represents.
   */
  variantType: VariantType;
  /**
   * The digital container type of the underlying media. This is required for MEDIA and IFRAME variant types.
   */
  containerType: ContainerType;
  /**
   * Information about the video media, if present. This field will only be set if the media contains video, or is an IFRAME variant type.
   */
  videoSettings: VideoSettings;
  /**
   * Information about the audio media, if present. This field will only be set if the media contains audio. Only MEDIA and IFRAME variant types can set audio.
   */
  audioSettings: AudioSettings;
  /**
   * Whether to allow the creation or modification of this DaiEncodingProfile if its settings do not match one of the encoding profiles that is supported by Google DAI.
   *
   * Note that this field will not persist on the encoding profile itself, and will only affect the current request.
   */
  persistUnmatchedProfiles: boolean;
};

/**
 * Represents the actions that can be performed on
 * {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfile DaiEncodingProfile} objects.
 */
export type DaiEncodingProfileAction = 'ActivateDaiEncodingProfiles' | 'ArchiveDaiEncodingProfiles';

/**
 * Captures a page of {@link https://developers.google.com/ad-manager/api/reference/v202202/DaiEncodingProfileService.DaiEncodingProfile DaiEncodingProfile} objects.
 */
export type DaiEncodingProfilePage = PageResult<DaiEncodingProfile>;
