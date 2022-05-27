import { VideoBumperType, VideoPositionType } from '../enums';

/**
 *
 */
export type VideoPosition = {
  /**
   * The type of video position (pre-roll, mid-roll, or post-roll).
   */
  positionType: VideoPositionType;

  /**
   * The index of the mid-roll to target. Only valid if the positionType is VideoPositionType.MIDROLL, otherwise this field will be ignored.
   */
  midrollIndex: number;
};

/**
 * Represents a targetable position within a pod within a video stream. A video ad can be targeted to any position in the pod (first, second, third ... last). If there is only 1 ad in a pod, either first or last will target that position.
 */
export type VideoPositionWithinPod = {
  /**
   * The specific index of the pod. The index is defined as:
   *
   * 1 = firs
   *
   * 2 = secon
   *
   * 3 = third
   *
   * ....
   *
   * 100 = last
   *
   * 100 will always be the last position. For example, for a pod with 5 positions, 100 would target position 5. Multiple targets against the index 100 can exist.
   * Positions over 100 are not supported.
   */
  index: number;
};

/**
 * Represents the options for targetable positions within a video.
 */
export type VideoPositionTarget = {
  /**
   * The video position to target. This attribute is required.
   */
  videoPosition: VideoPosition;

  /**
   * The video bumper type to target. To target a video position or a pod position, this value must be null. To target a bumper position this value must be populated and the line item must have a bumper type. To target a custom ad spot, this value must be null.
   */
  videoBumperType: VideoBumperType;

  /**
   * The video position within a pod to target. To target a video position or a bumper position, this value must be null. To target a position within a pod this value must be populated. To target a custom ad spot, this value must be null.
   */
  videoPositionWithinPod: VideoPositionWithinPod;

  /**
   * A custom spot AdSpot to target. To target a video position, a bumper type or a video position within a pod this value must be null.
   */
  adSpotId: number[];
};

/**
 * Represents positions within and around a video where ads can be targeted to.
 *
 * Example positions could be pre-roll (before the video plays), post-roll (after a video has completed playback) and mid-roll (during video playback).
 *
 * Empty video position targeting means that all video positions are allowed. If a bumper line item has empty video position targeting it will be updated to target all bumper positions.
 */
export type VideoPositionTargeting = {
  /**
   * The VideoTargetingPosition objects being targeted by the video LineItem.
   */
  targetedPositions: VideoPositionTarget[];
};
