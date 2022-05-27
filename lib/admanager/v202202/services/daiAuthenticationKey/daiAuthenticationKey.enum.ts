/**
 * Statuses associated with DaiAuthenticationKey objects.
 */
export enum DaiAuthenticationKeyStatus {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Indicates that the API key is actively in use and that the IMA SDK API should accept it as a valid key in requests.
   */
  ACTIVE = 'ACTIVE',
  /**
   * Indicates that the API key is no longer is use and that the IMA SDK API should not accept it as a valid key in requests.
   */
  INACTIVE = 'INACTIVE',
}

/**
 * Key types associated with DaiAuthenticationKey objects.
 */
export enum DaiAuthenticationKeyType {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Indicates that the key is a standard API key and should be used with the api-key SDK parameter when authenticating stream create requests.
   */
  API = 'API',
  /**
   * Indicates that the key is an HMAC key and should be used to generate a signature for the stream create request with the auth-token SDK parameter.
   */
  HMAC = 'HMAC',
}
