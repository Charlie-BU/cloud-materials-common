import React from 'react';
import { cloneDeep, get } from 'lodash-es';
import TableSelectFilter from './Search';
import type { CTableSelectProps, TableSelectData } from './interface';
import type { ColumnConfig, ToolbarItemConfig } from '../../../../CTable';
import { getGlobalContextConfig } from '../../../../CConfigProvider';

export function getColKey(props: CTableSelectProps, data: TableSelectData, index: number) {
  const { rowKey } = props;
  if (!rowKey) return undefined;
  if (typeof rowKey === 'function') {
    return rowKey(data, index);
  } else {
    return get(data, rowKey);
  }
}

export const getRowClassName = (row: any): string => {
  if (row.data.disabled === 'row') {
    return 'disabled-row';
  }
  return '';
};

/** 获取toolbar配置 */
export const getToolbarConfig = (props: Partial<CTableSelectProps>) => {
  const { filterOptions, toolbar, allValueOption } = props;
  const { locale } = getGlobalContextConfig();
  const options: ToolbarItemConfig[] = [];
  filterOptions?.forEach(option => {
    // option: 表头筛选组件的配置
    const { name, visible = true, componentProps = {}, ...restOptions } = option;
    const { options: filterDataSource, defaultValue } = componentProps as any;
    // 复制一遍，不修改原来的componentProps;
    const tableSelectFilterComProps = cloneDeep(componentProps);
    if (allValueOption && filterDataSource) {
      const { label = locale.CForm.tableSelect.allOptions, value = '', ...restConfig } = allValueOption as any;
      Object.assign(tableSelectFilterComProps, {
        options: [{ label, value, ...restConfig }, ...filterDataSource],
        defaultValue: defaultValue ?? value,
      });
    }
    if (visible) {
      options.push({
        component: ({ onChange, value }) => (
          <TableSelectFilter
            // 同FilterSearch组件属性类型报错，增强了类型，安全跳过
            componentProps={tableSelectFilterComProps as any}
            {...restOptions}
            key={name}
            onChange={onChange}
            value={value}
          />
        ),
        name,
        visible,
      });
    }
  });
  if (!toolbar) {
    return { left: options };
  }

  const { rows, left = [], right, ...restConfig } = toolbar;
  // toolbar配置rows属性时，toolbar配置放在第二行
  if (rows) {
    return { rows: [{ left: options }, ...rows], ...restConfig };
  } else {
    //否则toolbar配置left属性和right属性时候，与filterOptions配置在一行
    return {
      left: [...options, ...left],
      right,
      ...restConfig,
    };
  }
};

export const formatToLowerCase = (val: string | number) => String(val).toLocaleLowerCase() ?? '';

/** 利用table的过滤功能对filterOptions进行过滤 */
export const getColumnFilterDefault = (props: Partial<CTableSelectProps>) => {
  const { columns, filterOptions } = props;
  if (!filterOptions?.length) return columns ?? [];
  const filterKeys = filterOptions.map(option => option.name);
  const columnConfig = (columns || []).map((col: ColumnConfig<TableSelectData>) => {
    const { dataIndex = '', filter } = col;
    // 判断是否需要添加默认的过滤逻辑
    const addDefaultFilter = filterKeys.includes(dataIndex) && !filter;
    addDefaultFilter &&
      Object.assign(col, {
        filter: {
          type: 'searchInput',
          filterFn({ filterValues, rowData }) {
            return formatToLowerCase(rowData[dataIndex]).indexOf(formatToLowerCase(filterValues[dataIndex])) > -1;
          },
          hide: true,
        } as ColumnConfig<TableSelectData>['filter'],
      });
    return col;
  });

  return columnConfig;
};
