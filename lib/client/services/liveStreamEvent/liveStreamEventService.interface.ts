import { LiveStreamEvent, LiveStreamEventPage, Slate, SlateAction, SlatePage } from './liveStreamEvent.type';
import { LiveStreamEventAction } from './liveStreamEvent.action';
import { Statement, UpdateResult } from '../../../common/types';

/**
 * Provides operations for creating, updating and retrieving {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent LiveStreamEvent} objects.
 *
 * This feature is only available for Ad Manager 360 networks. Publishers will need to be activated through the Video > Live streams tab in the Ad Manager UI.
 * For access, apply through your account manager.
 */
export interface LiveStreamEventServiceOperations {
  /**
   * Creates new {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent LiveStreamEvent} objects.
   * The following fields are required:
   *
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent#name LiveStreamEvent.name }
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent#startDateTime LiveStreamEvent.startDateTime }
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent#endDateTime LiveStreamEvent.endDateTime }
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent#contentUrls LiveStreamEvent.contentUrls }
   * - {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent#adTags LiveStreamEvent.adTags }
   *
   * @param liveStreamEvents the live stream events to create
   * @returns the created live stream events with their IDs filled in
   */
  createLiveStreamEvents(liveStreamEvents: LiveStreamEvent[]): Promise<LiveStreamEvent[]>;
  /**
   * Create new slates.
   *
   * A slate creative is served as backup content in a live stream event when no other creatives are eligible to be served.
   *
   * @param slates 	list of slate objects to create.
   */
  createSlates(slates: Slate[]): Promise<Slate[]>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEventPage LiveStreamEventPage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent LiveStreamEvent} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property                        | PQL Property
   * | ----------------------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------
   * | id                                  | {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent#id LiveStreamEvent.id}
   * | slateCreativeId                     | {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent#slateCreativeId LiveStreamEvent.slateCreativeId}
   * | assetKey                            | {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent#assetKey LiveStreamEvent.assetKey}
   * | streamCreateDaiAuthenticationKeyIds | {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent#streamCreateDaiAuthenticationKeyIds LiveStreamEvent.streamCreateDaiAuthenticationKeyIds}
   * | dynamicAdInsertionType              | {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent#dynamicAdInsertionType LiveStreamEvent.dynamicAdInsertionType}
   * | streamingFormat                     | {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent#streamingFormat LiveStreamEvent.streamingFormat}
   * | customAssetKey                      | {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent#customAssetKey LiveStreamEvent.customAssetKey}
   * | daiEncodingProfileIds               | {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent#daiEncodingProfileIds LiveStreamEvent.daiEncodingProfileIds}
   * | segmentUrlAuthenticationKeyIds      | {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent#segmentUrlAuthenticationKeyIds LiveStreamEvent.segmentUrlAuthenticationKeyIds}
   *
   * @param filterStatement a Publisher Query Language statement to filter a list of live stream events
   * @returns the live stream events that match the filter
   */
  getLiveStreamEventsByStatement(filterStatement: Statement): Promise<LiveStreamEventPage>;
  /**
   * Gets a {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.SlatePage SlatePage}
   * of {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.Slate Slate} objects that satisfy the given
   * {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.Statement#query Statement.query}.
   * The following fields are supported for filtering:
   *
   * | PQL Property         | PQL Property
   * | -------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------
   * | id                   | {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.Slate#id LiveStreamEvent.id}
   * | name                 | {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.Slate#name LiveStreamEvent.name}
   * | lastModifiedDateTime | {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.Slate#lastModifiedDateTime LiveStreamEvent.lastModifiedDateTime}
   *
   * @param statement a Publisher Query Language statement used to filter slates
   * @returns the slates that match the given filter
   */
  getSlatesByStatement(statement: Statement): Promise<SlatePage>;
  /**
   * Performs actions on {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent LiveStreamEvent}
   * objects that match the given {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.Statement#query Statement.query}.
   *
   * @param liveStreamEventAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of live stream events
   * @returns the result of the action performed
   */
  performLiveStreamEventAction(
    liveStreamEventAction: LiveStreamEventAction,
    filterStatement: Statement,
  ): Promise<UpdateResult>;
  /**
   * Performs actions on slates that match the given {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.Statement Statement}.
   *
   * @param slateAction the action to perform
   * @param filterStatement a Publisher Query Language statement used to filter a set of slates
   * @returns the result of the action performed
   */
  performSlateAction(slateAction: SlateAction, filterStatement: Statement): Promise<UpdateResult>;
  /**
   * Updates the specified {@link https://developers.google.com/ad-manager/api/reference/v202202/LiveStreamEventService.LiveStreamEvent LiveStreamEvent} objects.
   *
   * @param liveStreamEvents the live stream events to update
   * @returns the updated live stream events
   */
  updateLiveStreamEvents(liveStreamEvents: LiveStreamEvent[]): Promise<LiveStreamEvent[]>;
  /**
   * Update existing slates.
   *
   * Only the slateName is editable.
   *
   * @param slates list of slate objects to update.
   * @returns the updated slates
   */
  updateSlates(slates: Slate[]): Promise<Slate[]>;
}
