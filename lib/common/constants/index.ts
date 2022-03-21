import { NetworkService } from 'lib/admanager/v202202/services/network.service';

export const SCOPES = {
  adwords: 'https://www.googleapis.com/auth/adwords',
  ad_manager: 'https://www.googleapis.com/auth/dfp',
};

export const DEFAULT_APPLICATION_NAME = 'applicationName';

export const SERVICE_MAP = {
  v202111: {
    NetworkService,
  },
  v202202: {
    NetworkService,
  },
};
