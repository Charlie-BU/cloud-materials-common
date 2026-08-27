import type { CStatusProps } from './interface';

export type StatusConfigType = Omit<CStatusProps, 'statusName' | 'popoverContent'>;

let statusConfig: StatusConfigType = {
  statusMap: {},
  waitColor: 'grey',
};

export const setStatusConfig = (config: StatusConfigType): void => {
  const { statusMap: inputStatusMap, ...rest } = config;
  statusConfig = {
    ...rest,
    statusMap: {
      ...inputStatusMap,
    },
  };
};

export const getStatusConfig = (): StatusConfigType => {
  return statusConfig;
};
