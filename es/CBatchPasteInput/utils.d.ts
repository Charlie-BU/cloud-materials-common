import type { SeparatorType, ValidatorModeType } from './interface';
export declare const isLegalIp: (value: string, mode?: ValidatorModeType) => boolean;
export declare const formatStr2Arr: (str: string, separator?: SeparatorType) => string[];
export declare function hasSeparatorInStr(str: string, separator?: SeparatorType): boolean;
