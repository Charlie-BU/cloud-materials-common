import React from 'react';
import type { ColumnConfig } from '../../CTable';
import type { CTableTransferProps } from '../interface';
import { mode } from './index';
import Delete from '../components/Delete';
import { cloneDeep } from 'lodash-es';
import { DEFAULT_LABEL } from '../constant';

const filter: ColumnConfig<any>['filter'] = {
  type: 'searchInput',
  hide: true,
};
/**
 * @description 为指定searchInput添加过滤函数
 * @param {ColumnConfig<any>[]} columns
 * @param {CTableTransferProps['searchIndex']} searchIndex
 * @return {*}
 */
const addSearchInputFilter = (columns: ColumnConfig<any>[], searchIndex: CTableTransferProps['searchIndex']) => {
  const filterIndex = { dataIndex: searchIndex, title: '', visible: false, filter };
  // column是否定义过searchInput的列
  const dataIndex = columns.find(item => item.dataIndex === searchIndex);
  if (dataIndex && !dataIndex.filter) {
    // 定义过，找到列，添加filter
    columns = columns.map(item => {
      if (item?.dataIndex === searchIndex) {
        return {
          ...item,
          filter,
        };
      }
      return {
        ...item,
      };
    });
    return columns;
  }
  if (!dataIndex) {
    //未定义过，添加隐藏列
    return [...columns, filterIndex];
  }
  return columns;
};

/**
 * @description 获取column配置
 * @param {CTableTransferProps} props
 * @return {*}
 */
export const getColumns = (props: CTableTransferProps) => {
  // searchIndex = rowLabel 兼容历史用户使用rowLabel筛选
  const { rowLabel = DEFAULT_LABEL, CTableProps, simple, searchIndex = rowLabel } = props;
  let sourceColumns: ColumnConfig<any>[] = [];
  let targetColumns: ColumnConfig<any>[] = [];
  const { retain } = mode(props);
  const sourceTableCTable = CTableProps ? CTableProps[0] || {} : {};
  const rightTableCTable = CTableProps ? CTableProps[1] || {} : {};
  if (!sourceTableCTable?.columns?.length || !rightTableCTable?.columns?.length) {
    sourceColumns = targetColumns = [
      {
        dataIndex: rowLabel,
        title: '',
      },
    ];
  }
  if (sourceTableCTable?.columns?.length) {
    sourceColumns = cloneDeep(
      (sourceTableCTable?.columns as ColumnConfig<any>[]).map(item => ({
        ...item,
      })),
    );
  }
  if (rightTableCTable?.columns?.length) {
    targetColumns = cloneDeep(
      (rightTableCTable?.columns as ColumnConfig<any>[]).map(item => ({
        ...item,
      })),
    );
  }
  if (retain || simple) {
    const operation = 'operation';
    const operationColumn = targetColumns.find(item => item.dataIndex === operation);
    // 优先取用户定义的操作列
    if (!operationColumn) {
      targetColumns = [
        ...targetColumns,
        {
          dataIndex: operation,
          title: '',
          width: 40,
          render: (__col, item, __index) => {
            return <Delete item={item} />;
          },
        },
      ];
    }
  }
  // 解决的问题是：简单模式下，传入label为reactNode，筛选不生效。为指定字段添加筛选函数，且字段应该是unvisible状态
  sourceColumns = addSearchInputFilter(sourceColumns, searchIndex);
  targetColumns = addSearchInputFilter(targetColumns, searchIndex);
  return {
    sourceColumns,
    targetColumns,
  };
};
