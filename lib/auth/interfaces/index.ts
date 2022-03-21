import { SCOPES } from '@common/constants';

export interface SACredential {
  /**
   * Get a non-expired access token, after refreshing if necessary
   */
  getToken(): Promise<string | null | undefined>;
}

export type ScopeOptions = keyof typeof SCOPES;
