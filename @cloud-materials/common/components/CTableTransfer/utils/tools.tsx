import { TableMode } from '../../CTable';
import { genRowKey } from '../../CTable/shared';
import classNamePrefixFactory from '../../_utils/classNamePrefixFactory';
import { DEFAULT_KEY, ROW_KEY } from '../constant';
import type { CTableTransferItem, CTableTransferProps } from '../interface';

/**
 * @description 默认选择的rowKey
 * @param {CTableTransferProps<any>} { rowKey }
 */
export const defaultRowKey = (props: CTableTransferProps) => {
  const { CTableProps } = props;
  if (Array.isArray(CTableProps)) {
    return CTableProps[0]?.rowKey || DEFAULT_KEY;
  }
  return DEFAULT_KEY;
};

export const genTransferRowKey = (props: CTableTransferProps) => {
  const rowKey = defaultRowKey(props);
  return (data: CTableTransferItem[]) =>
    data.map(item => ({
      ...item,
      // table RowKey为函数，第二个参数是rowData的index
      [ROW_KEY]: genRowKey(item, -1, rowKey),
    }));
};

/**
 * @description 是否远程模式，来源于table.isRemoteMode, 在左侧table config中无法使用table.isRemoteMode判断，单独摘出来
 * @param {CTableTransferProps<any>} props
 * @return {*}
 */
export const isRemoteMode = (props: CTableTransferProps): boolean => {
  const { CTableProps } = props;
  if (Array.isArray(CTableProps)) {
    const { mode, fetcher } = CTableProps[0] || {};
    if (fetcher && !mode) {
      // 如果配置了 fetcher，并且没有配置 mode，默认为 remote 模式
      return true;
    }
    return mode === TableMode.REMOTE;
  }
  return true;
};

/**
 * @description 获取配置模式：远程模式、数据留存模式、简单模式
 * @param {CTableTransferProps<any>} props
 * @return {*}
 */
export const mode = (props: CTableTransferProps) => {
  const { simple, CTableProps } = props;
  const remote = isRemoteMode({ ...props });
  return {
    remote,
    simple: simple || remote,
    retain: (typeof simple !== 'boolean' && simple?.retainSelectedItems) || remote,
    table: CTableProps ? !!CTableProps[0]?.columns?.length : false,
  };
};

export const cssPrefix = classNamePrefixFactory('transfer');

export const DataCy = {
  deleteAll: cssPrefix`delete-all`,
  deleteItem: cssPrefix`delete-item`,
  refresh: cssPrefix`refresh`,
  add: cssPrefix`add`,
  sourceOperationButton: cssPrefix`source-operation-button`,
  targetOperationButton: cssPrefix`target-operation-button`,
  selectAll: cssPrefix`select-all`,
};
