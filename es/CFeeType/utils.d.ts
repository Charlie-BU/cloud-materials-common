import type { StatusChangeTime, TimeType } from './interface';
/** 时间格式化 */
export declare function dateFormatter(date: TimeType): string;
/** 判断当前传入的时间是单个状态的时间还是多个状态的时间 */
export declare const isSingleTime: (statusChangeTime: StatusChangeTime) => boolean;
