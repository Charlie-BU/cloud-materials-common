/*
 * @Author: youjingyu
 * @Date: 2021-10-04 10:05:29
 * @LastEditTime: 2021-10-29 17:57:00
 * @LastEditors: youjingyu
 * @Description:
 */
import type { Sorter, SorterDirections } from '../../../core';

const ascend = (a: number, b: number) => a - b;

const descend = (a: number, b: number) => b - a;

export const defaultSorter: Sorter = {
  type: 'default',
  directions: ['ascend', 'descend'],
  sorterFn: (sorterValue: SorterDirections[number], a: number, b: number) =>
    sorterValue === 'ascend' ? ascend(a, b) : descend(a, b),
};
