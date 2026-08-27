import type { CStatusProps } from './interface';
export type StatusConfigType = Omit<CStatusProps, 'statusName' | 'popoverContent'>;
export declare const setStatusConfig: (config: StatusConfigType) => void;
export declare const getStatusConfig: () => StatusConfigType;
