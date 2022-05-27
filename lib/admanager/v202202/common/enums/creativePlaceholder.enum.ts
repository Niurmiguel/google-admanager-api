/**
 * Descriptions of the types of sizes a creative can be. Not all creatives can be described by a height-width pair, this provides additional context.
 */
export enum CreativeSizeType {
  /**
   * Dimension based size, an actual height and width.
   */
  PIXEL = 'PIXEL',
  /**
   * Mobile size, that is expressed as a ratio of say 4 by 1, that could be met by a 100 x 25 sized image.
   */
  ASPECT_RATIO = 'ASPECT_RATIO',
  /**
   * Out-of-page size, that is not related to the slot it is served. But rather is a function of the snippet, and the values set. This must be used with 1x1 size.
   */
  INTERSTITIAL = 'INTERSTITIAL',
  /**
   * Size has no meaning
   *
   * 1. For Click Tracking entities, where size doesn't matter 2. For entities that allow all requested sizes, where the size represents all sizes.
   */
  IGNORED = 'IGNORED',
  /**
   * Native size, which is a function of the how the client renders the creative. This must be used with 1x1 size.
   */
  NATIVE = 'NATIVE',
  /**
   * Audio size. Used with audio ads. This must be used with 1x1 size.
   */
  AUDIO = 'AUDIO',
}
