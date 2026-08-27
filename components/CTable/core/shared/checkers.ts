/*
 * @Author: youjingyu
 * @Date: 2021-10-15 18:20:08
 * @LastEditTime: 2021-10-15 18:20:54
 * @LastEditors: youjingyu
 * @Description:
 */
import { Table } from '../models';

// eslint-disable-next-line no-undef
export const isTable = (node: any): node is Table => {
  return node instanceof Table;
};
