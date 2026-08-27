/*
 * @Author: youjingyu
 * @Date: 2021-09-26 20:38:41
 * @LastEditTime: 2021-10-28 18:56:45
 * @LastEditors: youjingyu
 * @Description:
 */
import type { TableColumnProps as ArcoTableColumnProps } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import type { Filter } from '../../../core';
import { SearchInput } from '../components/FilterSearch';

type ArcoFilterDropdownOptions = Parameters<NonNullable<ArcoTableColumnProps['filterDropdown']>>[0];

// arco 自己就实现了 radio 和 checkbox 的 filter component，
// 因此不传递 filter component，然后通过通过 arco 的 filterMultiple 来控制 radio 和 checkbox
// 本质上是在连接 arco 的实现中，开的后门
export const select: Filter = {
  type: 'select',
  filterFn({ filterValue, cellData }) {
    const arrFilterVal = Array.isArray(filterValue) ? filterValue : [filterValue];
    if (arrFilterVal.length === 0) {
      return true;
    }
    return arrFilterVal.includes(cellData);
  },
};

export const range: Filter = {
  type: 'range',
  filterFn({ filterValue, cellData }) {
    const arrFilterVal = Array.isArray(filterValue) ? filterValue : [filterValue];
    if (arrFilterVal.length === 0) {
      return true;
    }
    return arrFilterVal.every(val => cellData > val);
  },
};

export const searchInput: Filter<{
  placeholder: string;
  dropdownOptions: ArcoFilterDropdownOptions;
}> = {
  type: 'searchInput',
  filterFn({ filterValue, cellData }) {
    const arrFilterVal = Array.isArray(filterValue) ? filterValue : [filterValue];
    if (arrFilterVal.length === 0) {
      return true;
    }
    return cellData?.toString()?.indexOf(arrFilterVal[0]) > -1;
  },
  icon: IconSearch,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  component: SearchInput,
  componentProps: {
    dropdownProps: {
      triggerProps: {
        position: 'bottom',
        // 为了保持搜索框的值
        unmountOnExit: false,
      },
    },
  },
};
