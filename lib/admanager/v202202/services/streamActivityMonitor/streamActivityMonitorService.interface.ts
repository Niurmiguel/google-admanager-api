import { SamSession } from './streamActivityMonitor.type';
import { Statement } from '@common/types';

export interface StreamActivityMonitorServiceOperations {
  /**
   * Returns the logging information for a DAI session. A DAI session can be identified by it's session id or debug key.
   * The session ID must be registered via the registerSessionsForMonitoring method before it can be accessed.
   * There may be some delay before the session is available.
   *
   * The number of sessions requested is limited to 25. The following fields are supported for filtering:
   *
   * | Entity property | PQL filter
   * | --------------- | ----------
   * | Session id	     | 'sessionId'
   * | Debug key	     | 'debugKey"
   *
   * @param statement PQL specifying the sessionId or debugKey to fetch logging information for. Only '=' and 'IN' expressions are supported.
   * @returns the created companies with their IDs filled in
   */
  getSamSessionsByStatement(statement: Statement): Promise<SamSession[]>;
  /**
   * Registers the specified list of sessionIds for monitoring. Once the session IDs have been registered,
   * all logged information about the sessions will be persisted and can be viewed via the Ad Manager UI.
   *
   * A session ID is a unique identifier of a single user watching a live stream event.
   *
   * @param sessionIds a list of session IDs to register for monitoring
   * @returns the list of session IDs that were registered for monitoring
   */
  registerSessionsForMonitoring(sessionIds: string[]): Promise<string[]>;
}
