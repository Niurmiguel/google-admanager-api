import { SERVICE_MAP } from '@common/constants';

export * from './soap.type';

export type ApiVersion = keyof typeof SERVICE_MAP;
