import { Network, ThirdPartyDataDeclaration } from '../types';

/**
 * Provides operations for retrieving information related to the publisher's networks.
 * This service can be used to obtain the list of all networks that the current login has access to, or to obtain information about a specific network.
 */
export interface NetworkServiceOperations {
  /**
   * Returns the list of Network objects to which the current login has access.
   *
   * Intended to be used without a network code in the SOAP header when the login may have more than one network associated with it.
   *
   * @returns the networks to which the current login has access
   */
  getAllNetworks(): Network[];
  /**
   * Returns the current network for which requests are being made.
   *
   * @returns the network for which the user is currently making the request
   */
  getCurrentNetwork(): Network;
  /**
   * Returns the default ThirdPartyDataDeclaration for this network. If this setting has never been updated on your network, then this API response will be empty.
   */
  getDefaultThirdPartyDataDeclaration(): ThirdPartyDataDeclaration;
  /**
   * Creates a new blank network for testing purposes using the current login.
   *
   * Each login(i.e. email address) can only have one test network.
   * Data from any of your existing networks will not be transferred to the new test network.
   * Once the test network is created, the test network can be used in the API by supplying the Network.networkCode in the SOAP header or by logging into the Ad Manager UI.
   *
   * Test networks are limited in the following ways:
   *
   * - Test networks cannot serve ads.
   * - Because test networks cannot serve ads, reports will always come back without data.
   * - Since forecasting requires serving history, forecast service results will be faked. See ForecastService for more info.
   * - Test networks are, by default, Ad Manager networks and don't have any features from Ad Manager 360. To have additional features turned on, please contact your account manager.
   * - Test networks are limited to 10,000 objects per entity type.
   * @returns `Network`
   */
  makeTestNetwork(): Network;
  /**
   * Updates the specified network. Currently, only the network display name can be updated.
   *
   * @param network the network that needs to be updated
   * @returns the updated network
   */
  updateNetwork(network: Network): Network;
}
