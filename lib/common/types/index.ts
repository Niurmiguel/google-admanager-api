import { SERVICE_MAP } from '@common/constants';
import { v202202Types } from 'lib/admanager/v202202';

export * from './soap.type';

export type ApiVersion = keyof typeof SERVICE_MAP;

export type ServiceNameToTypeMapping = {
  v202202: v202202Types;
};
