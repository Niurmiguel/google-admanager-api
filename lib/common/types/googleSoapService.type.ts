export type GoogleSoapServiceOptions = {
  /**
   * The network code of the network being addressed.
   */
  networkCode: number;
  /**
   * An arbitrary string name identifying your application.
   * This will be shown in Google's log files.
   * For example: "My Inventory Application" or "App_1".
   */
  applicationName: string;
  /**
   *  OAuth2 access token
   */
  token: string;
};
