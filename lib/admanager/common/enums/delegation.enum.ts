/**
 * The type of delegation of the child network to the parent network in MCM.
 */
export enum DelegationType {
  /**
   * 	The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * 	The parent network gets complete access to the child network's account
   */
  MANAGE_ACCOUNT = 'MANAGE_ACCOUNT',
  /**
   * 	A subset of the ad requests from the child are delegated to the parent, determined by the tag on the child network's web pages. The parent network does not have access to the child network, as a subset of the inventory could be owned and operated by the child network.
   */
  MANAGE_INVENTORY = 'MANAGE_INVENTORY',
}

/**
 * Status of the association between networks. When a parent network requests access, it is marked as pending. Once the child network approves, it is marked as approved.
 */
export enum DelegationStatus {
  /**
   * The value returned if the actual value is not exposed by the requested API version.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * The association request from the parent network is approved by the child network.
   */
  APPROVED = 'APPROVED',
  /**
   * The association request from the parent network is pending child network approval or rejection.
   */
  PENDING = 'PENDING',
  /**
   * The association request from the parent network is rejected or revoked by the child network.
   */
  REJECTED = 'REJECTED',
  /**
   * The association request from the parent network is withdrawn by the parent network.
   */
  WITHDRAWN = 'WITHDRAWN',
}
