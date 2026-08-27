/*
 * @Author: youjingyu
 * @Date: 2021-10-07 17:42:28
 * @LastEditTime: 2021-12-14 20:56:49
 * @LastEditors: youjingyu
 * @Description:
 */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { fallbackText as fallbackTextFn, isEmpty, tryToNumber } from '../../../utils';
import type { Formatter, FormatterFn } from '../../../core';
import { toLocaleString } from '../../utils';
import type { ReactNode } from 'react';
import type { BuiltInFormatterFn } from '../../types';

dayjs.extend(utc);

export const intFormatter: Formatter = {
  type: 'int',
  formatterFn: ({ cellData }) => (isEmpty(cellData) ? '-' : toLocaleString(cellData)),
};

export const floatFormatter: Formatter = {
  type: 'float',
  formatterFn: ({ cellData }) => (isEmpty(cellData) ? '-' : toLocaleString(cellData)),
};

export const money: Formatter = {
  type: 'money',
  formatterFn: ({ cellData }) =>
    // 金额保留两位小数
    isEmpty(cellData) ? '-' : cellData.toLocaleString?.(undefined, { maximumFractionDigits: 2 }),
};

const formatTime = (time: string | number, isUtc = false) => {
  if (isEmpty(time)) return '-';
  let fixedTime = tryToNumber(time);

  if (typeof fixedTime === 'number' && fixedTime.toString().length < 13) {
    fixedTime = Number(`${fixedTime}000`);
  }
  const FORMAT_TIME_STYLE = 'YYYY-MM-DD HH:mm:ss';
  // 如果不合法，返回原始值
  if (!dayjs(fixedTime).isValid()) {
    return time;
  }
  if (isUtc) {
    return dayjs.utc(fixedTime).local().format(FORMAT_TIME_STYLE);
  }
  return dayjs(fixedTime).format(FORMAT_TIME_STYLE);
};

export const time: Formatter = {
  type: 'time',
  formatterFn: ({ cellData }) => {
    return formatTime(cellData);
  },
};

export const utcTime: Formatter = {
  type: 'utcTime',
  formatterFn: ({ cellData }) => {
    return formatTime(cellData, true);
  },
};

export const timestamp: Formatter = {
  type: 'timestamp',
  formatterFn: ({ cellData }) => new Date(cellData).toLocaleString(),
};

// export const dealAZone: Formatter = {
//   type: 'dealAZone',
//   formatterFn({ cellData: zoneId }) {
//     const reg = /[a-zA-Z]/;
//     const zoneName = zoneId[zoneId?.length - 1] || '';
//     return reg.test(zoneName) ? `可用区${zoneName.toLocaleUpperCase()}` : zoneId;
//   },
// };

export const fallbackText: Formatter = {
  type: 'fallbackText',
  formatterFn({ cellData }) {
    return fallbackTextFn(cellData);
  },
};
export const formatter: BuiltInFormatterFn = {
  fallbackText: (value: ReactNode) => fallbackTextFn(value),
  timestamp: (value: string | number | Date) =>
    timestamp.formatterFn?.({ cellData: value } as unknown as Parameters<FormatterFn>[0]),
  utcTime: (value: string | number) => formatTime(value, true),
  time: (value: string | number) => formatTime(value),
  money: (value: number | string | undefined | null) =>
    money.formatterFn?.({ cellData: value } as unknown as Parameters<FormatterFn>[0]),
  float: (value: number | string | undefined | null) =>
    floatFormatter.formatterFn?.({ cellData: value } as Parameters<FormatterFn>[0]),
  int: (value: number | string | undefined | null) =>
    intFormatter.formatterFn?.({ cellData: value } as Parameters<FormatterFn>[0]),
};
