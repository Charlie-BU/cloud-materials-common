import React from 'react';
import type { TableConfig, RowSelection } from '../../CTable';
import { onTableSelectRow, onTableInit, onTableUpdateDataEnd } from '../../CTable';
import type { CTableTransferItem, CTableTransferProps } from '../interface';

import { LeftHeader } from '../components/Header';
import { isPlainObject } from 'lodash-es';
import { Popover } from '@arco-design/web-react';
import { DEFAULT_KEY, ROW_KEY, CACHE_REMOTE_DATA } from '../constant';
import { mode, genTransferRowKey } from './tools';
import { getColumns } from './getColumns';
import { getTableBaseConfig } from './getTableBaseConfig';
import { getPagination } from './getPagination';
import type { CLocale } from '../../locales/default';

interface SourceTableProps {
  cTransferProps: CTableTransferProps;
  onSourceTableSelectRow: () => void;
  sourceTableChange: () => void;
  cachedSourceInitData: React.MutableRefObject<CTableTransferItem[]>;
  matchSelectedMax: (table: any) => { matched: boolean };
  locale: CLocale;
}

/**
 * @description 左侧Table配置
 *
 * @param {{
 *   cTransferProps: CTableTransferProps<any>;
 *   onSourceTableSelectRow: () => void;
 * }} {
 *   cTransferProps,
 *   onSourceTableSelectRow,
 * }
 * @return {*}
 */
const SourceTable = ({
  cTransferProps,
  onSourceTableSelectRow,
  sourceTableChange,
  cachedSourceInitData,
  matchSelectedMax,
  locale,
}: SourceTableProps) => {
  const {
    defaultSelectedValues = [],
    CTableProps,
    fetchInitData,
    maxTooltip = locale.CTableTransfer.limit,
  } = cTransferProps;
  const { remote } = mode({ ...cTransferProps });
  // 获取table配置
  const { sourceColumns } = getColumns(cTransferProps);
  const baseConfig = getTableBaseConfig({ ...cTransferProps }, locale);
  const sourceCTableProps = CTableProps ? CTableProps[0] || {} : {};
  const [pagination] = getPagination({ ...cTransferProps });
  const { rowSelection } = sourceCTableProps;
  const genRowKey = genTransferRowKey({ ...cTransferProps });
  if (sourceCTableProps.data) {
    // 为本地数据数据生成rowKey
    sourceCTableProps.data = genRowKey(sourceCTableProps.data);
  }

  if (sourceCTableProps.fetcher) {
    const fetcher = sourceCTableProps.fetcher;
    // 为远程数据数据生成rowKey
    sourceCTableProps.fetcher = async option => {
      const res = await fetcher(option);
      return {
        ...res,
        data: genRowKey([...(res?.data ?? [])]),
      };
    };
  }
  const config: TableConfig<any> = {
    rowKey: DEFAULT_KEY,
    ...sourceCTableProps,
    columns: sourceColumns,
    pagination: pagination,
    toolbar: {
      ...baseConfig.toolbar,
      ...sourceCTableProps.toolbar,
      left: [
        {
          component: () => <LeftHeader cTransferProps={cTransferProps} />,
        },
      ],
    },
    rowSelection: {
      type: 'checkbox',
      preserveCrossPageKeys: true,
      selectable: option => {
        // 用户传入需要禁用的项，选择达到上限需要禁用项
        const { table } = option;
        const selectAllKeys = table.selectedRowKeys || [];
        const { matched } = matchSelectedMax(table);
        const bool = !!selectAllKeys.find(item => option.rowData[ROW_KEY] === item);
        if (isPlainObject(rowSelection)) {
          const { selectable } = rowSelection as RowSelection<any>;
          // row可选： 选择过的key、用户设置且未达到上限
          return bool || (!!selectable?.(option) && !matched);
        }
        // row可选： 选择过的key、未达到上限
        return bool || !matched;
      },
    },
    effects(option) {
      onTableSelectRow(() => {
        onSourceTableSelectRow();
      });

      onTableInit(({ table }) => {
        // 默认值
        table.selectRow(defaultSelectedValues);
      });

      if (remote) {
        // mode为fetcher
        onTableUpdateDataEnd(({ table }) => {
          cachedSourceInitData.current = table.initTotalData || [];
          sourceTableChange();
        });
      } else if (sourceCTableProps.fetcher) {
        // mode为local+fetcher
        onTableUpdateDataEnd(({ table }) => {
          cachedSourceInitData.current = table.initTotalData || [];
          sourceTableChange();
        });
      } else {
        // mode为local
        setTimeout(() => {
          // 异步的原因：table实例拿不到
          cachedSourceInitData.current = option.table.initTotalData || [];
          sourceTableChange();
        }, 0);
      }
      if (baseConfig.effects) {
        baseConfig.effects(option);
      }
      if (sourceCTableProps.effects) {
        sourceCTableProps.effects(option);
      }
    },
    extraConfig: {
      ...baseConfig.extraConfig,
      ...sourceCTableProps.extraConfig,
      bottomLeftCheckAllCrossPage: true,
    },
    arcoTableProps: table => ({
      showHeader: sourceCTableProps.columns?.length ? true : false,

      rowSelection: {
        // 渲染tooltip
        renderCell: (originNode, checked) => {
          const { matched } = matchSelectedMax(table);
          // 触发上限，disable的item给提示
          if (matched && !checked) {
            return <Popover content={maxTooltip}>{originNode}</Popover>;
          }
          return originNode;
        },
      },
      ...baseConfig.arcoTableProps,
      ...sourceCTableProps.arcoTableProps,
    }),
    async beforeInit(option) {
      if (fetchInitData) {
        const { data = [] } = await fetchInitData(defaultSelectedValues);
        option.table.setGlobalScope({
          [CACHE_REMOTE_DATA]: genRowKey(data),
        });
      }
      if (sourceCTableProps.beforeInit) {
        return sourceCTableProps.beforeInit(option);
      }
      return {};
    },
  };
  //分页
  if (pagination) {
    config.toolbar!.bottomLeft = [
      {
        component: () => null,
      },
    ];
  }
  return config;
};
export default SourceTable;
