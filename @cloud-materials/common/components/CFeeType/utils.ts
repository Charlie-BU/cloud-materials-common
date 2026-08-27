import dayjs from 'dayjs';
import { isObject, isDate } from 'lodash-es';
import type { StatusChangeTime, TimeType } from './interface';

/** 时间格式化 */
export function dateFormatter(date: TimeType) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

/** 判断当前传入的时间是单个状态的时间还是多个状态的时间 */
export const isSingleTime = (statusChangeTime: StatusChangeTime) => {
  return !isObject(statusChangeTime) || isDate(statusChangeTime);
};
