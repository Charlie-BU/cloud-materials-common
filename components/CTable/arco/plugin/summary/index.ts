/*
 * @Author: youjingyu
 * @Date: 2021-10-03 20:46:44
 * @LastEditTime: 2021-11-28 11:32:42
 * @LastEditors: youjingyu
 * @Description:
 */
import type { Summary } from '../../../core';
import { getCellData } from '../../../shared';

export const sum: Summary = {
  type: 'sum',
  computedFn: ({ rows, column }) => {
    return rows.reduce((total, current) => total + Number(getCellData(current.data, column.config.dataIndex)), 0);
  },
};
