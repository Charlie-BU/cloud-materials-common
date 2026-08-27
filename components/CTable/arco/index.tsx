/*
 * @Author: youjingyu
 * @Date: 2021-09-14 17:12:43
 * @LastEditTime: 2021-12-10 20:53:07
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { useImperativeHandle, forwardRef, useMemo, useRef, useEffect } from 'react';
import { useUnmountedRef } from 'ahooks';
import cls from 'classnames';
import type { TableProps as ArcoTableProps } from '@arco-design/web-react';
import { Table as ArcoTable, Spin } from '@arco-design/web-react';
import { IconLoading } from '@arco-design/iconbox-react-ve-o-design';
import { observer } from '@formily/react';
import { Plugin, effects } from '../core';
import {
  TableRow,
  TableRowMemo,
  TableCell,
  TableCellMemo,
  TableHeaderCell,
  Toolbar,
  LoadMoreTableBodyWrapper,
} from './components';
import { TableProvider, renderDecorator } from '../react';
import { isFn } from '../shared/checkers';
import { DefaultPlugin, globalComponents } from './plugin';
import { mapTableConfig } from './mapModelToArco';
import type { TableModel, TableProps, InnerTableProps } from './types';
import {
  useInnerCreateTable,
  useAutoUpdateTableWidth,
  usePolling,
  useControlledConfig,
  useMergedTableConfig,
} from './hooks';
import {
  merge,
  getTableConfig,
  defineColumn,
  defineColumns,
  controlPagination,
  changeToolbarValues,
  defineToolbar,
  getArcoPropsFilterPagination,
  createPolling,
  formatUrlQueryConfig,
  changeToolbarValuesPure,
} from './utils';
import { getTextWidth, setGlobalFontSize, TableFontSize } from '../utils';
import { useCConfigContext } from '../../CConfigProvider';
import { helper } from '../helper';
import { formatter } from './plugin/formatter';
import { ExportDataModal } from './plugin/components/ExportDataBtn/exportDataModal/exportModal';

// 这里使用函数返回默认Props，目的是保证每一个Table实例都使用一个新的默认props，防止相互冲突
function getDefaultTableProps(table: TableModel<any>): ArcoTableProps {
  return {
    border: {
      // 废弃: 设计规范中大多数场景的table是不需要显示边框的，所以放到默认props
      // 2023-03-15 更新 源力主题默认有 border
      wrapper: true,
      // 只要有一列支持拖拽，header 就展示 border
      headerCell: table.columns.find(item => Boolean(item.config.resize)) ? true : false,
    },
  };
}

Plugin.globalUse('arcoDefault', new DefaultPlugin());
// 注入全局的 component，从而 Table.getComponent 可以静态地获取组件
Plugin.globalMixin({ components: globalComponents });

const renderTable = (props: ArcoTableProps) => {
  return <ArcoTable {...props} />;
};

export const InnerTable: React.FC<InnerTableProps<any>> = observer(({ table, className, style }) => {
  const ctx = useCConfigContext();
  const classScope = ctx.getCPrefixCls('table');
  const localMode = ctx.locale.locale;
  const classScopeEn = ctx.getCPrefixCls(`table-en-US`);
  const isEn = localMode === 'en-US';
  if (isEn) {
    // 2023-11-6：英文环境下英文大小为14
    setGlobalFontSize(TableFontSize.US);
  } else {
    setGlobalFontSize(TableFontSize.CN);
  }
  const arcoPrefixCls = ctx.prefixCls || 'arco';

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const tableConfig = mapTableConfig(table, ctx);
  const { extraConfig } = table.config;
  // 保证传给 arco 的 components 配置的不变性
  // 否则 arco 每次都会卸载 row、cell，再重新渲染
  const tableCustomComponents = useMemo<ArcoTableProps['components']>(
    () => ({
      body: {
        row: extraConfig?.useMemoTableRow ? TableRowMemo : TableRow,
        cell: extraConfig?.useMemoTableCell ? TableCellMemo : TableCell,
        wrapper: table.isLoadMoreMode() ? LoadMoreTableBodyWrapper : undefined,
      },
      header: {
        th: TableHeaderCell,
      },
    }),
    [],
  );

  const originalArcoProps = {
    ...tableConfig,
    components: tableCustomComponents,
    ...getDefaultTableProps(table),
  };
  const mergedArcoProps: ArcoTableProps = merge(
    originalArcoProps,
    isFn(table.config.arcoTableProps)
      ? table.config.arcoTableProps(table, originalArcoProps)
      : table.config.arcoTableProps,
  ) as ArcoTableProps;

  // 为了不将处理 arcoProps 的逻辑和渲染自定义分页器的逻辑耦合在一起，拆成两部分处理
  // 1. 处理了 pagination 后的最终传递给 arco table 的 props
  const arcoProps = getArcoPropsFilterPagination(table, tableConfig, mergedArcoProps);
  // 2. 如果是自定义渲染分页，controlPagination 会返回分页的 ReactNode
  const customPaginationNode = controlPagination(table, mergedArcoProps, classScope, arcoPrefixCls);

  useAutoUpdateTableWidth(table, tableContainerRef);

  return (
    <TableProvider table={table}>
      <div
        className={cls(
          // 2022-11-6：table在英文环境下内容字体继承arco默认，非英文环境字体为12px
          classScope,
          isEn && classScopeEn,
          className,
          extraConfig?.autoFixBottomScroll ? `${classScope}-auto-scroll` : undefined,
        )}
        style={style}
        data-cy={`${classScope}-container`}
        data-testid={`${classScope}-container`}
      >
        {table.toolbar ? <Toolbar /> : null}
        <Spin
          icon={<IconLoading />}
          loading={table.loading}
          style={{ width: '100%' }}
          className={`${classScope}-spin`}
          size={48}
        >
          {/* <Spin icon={<IconLoading />} loading={table.loading} style={{ width: '100%' }}> */}
          <div className={`${classScope}-container`} ref={tableContainerRef}>
            {renderDecorator(table, renderTable(arcoProps), {
              scope: 'table',
              decoratorType: table.decoratorType,
              decoratorProps: table.decoratorProps,
            })}
            {customPaginationNode}
          </div>
        </Spin>
      </div>
    </TableProvider>
  );
});

export const _Table: React.ForwardRefRenderFunction<TableModel<any>, TableProps<any>> = (props, ref) => {
  const mergedTableConfig = useMergedTableConfig(props.config);
  // 配置了 url query，需要处理 config
  const propsConfig = formatUrlQueryConfig(mergedTableConfig);
  const table = useInnerCreateTable(propsConfig, props.table);

  // 标记 table 是否卸载
  // 注意一定要定义在所有的 Effect 之前，从而保证后续的 Effect 能够拿到正确的卸载状态
  const unmountedRef = useUnmountedRef();

  useControlledConfig(table, propsConfig);

  // 目前这里取出的 config 只用在下面的 data 受控逻辑中，没有在其他地方使用
  // 所谓的 「支持 data」 是指当 Table 组件的 props 中的 config.data 变化时，能够让组件使用新的 data 重渲染，所以这里 config 直接从 props 中取
  const config = propsConfig;
  // const { extraConfig } = config;

  useImperativeHandle(ref, () => table);

  // 处理轮询
  const polling = usePolling({ table });

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (props?.autoInit !== false) {
      table.initData().then(() => {
        // table 卸载了、或者没有配置 startPoolingAfterInitData，则不开始轮训定时器
        const notStartPooling = unmountedRef.current || polling?.options?.startPoolingAfterInitData !== true;
        if (notStartPooling) {
          return;
        }
        timer = setTimeout(() => {
          // 避免定时器启动后，table 已经卸载了
          if (unmountedRef.current) {
            return;
          }
          polling?.start();
          // 初始化请求成功后，等 pollingInterval 再开始轮询，更符合预期（因为执行 polling.start 后会立即请求）
        }, polling?.options.pollingInterval);
      });
    }
    return () => {
      // 不用判断 timer 是否存在，因为 clearTimeout 会静默处理，不会报错
      clearTimeout(timer);
    };
  }, []);

  /**
   * TODO 通过 useEffect 的方式监听 data 的变化，会带来 InnerTable 的两次重新渲染
   * 一次是 prop.config 变化带来的，一次是 table.setData 带来的
   * 是否考虑优化
   */
  useEffect(() => {
    // 配置了受控，或者没有配置 fetcher，data 进入受控状态
    // let controlledData = extraConfig?.controlledConfig?.data || !config?.fetcher;
    // 支持配置为 false，强行禁止受控
    // if (extraConfig?.controlledConfig?.data === false) {
    // controlledData = false;
    // }
    /**
     * 废弃逻辑：这里使用 props.config，而不是 table.config，因为 props.config 更新时，暂时不会去更新 table.config
     * 因此如果传递了 props.table，还希望 data 受控，还需要再传 props.config
     */
    /**
     * 配置了 data、并且没有配置 fetcher，进入受控状态
     * 当前的 config 在 _Table 组件的最前面取好了，这里不关注 config 是来自 table.config 还是 props.config
     * 事实上，useInnerCreateTable 内部会去更新 table.config，这里的 config 来自 table.config
     */
    if (config?.data && !config?.fetcher) {
      table.setData({
        totalData: config.data || [],
        // 支持手动传参，控制要不要在 setData 时 reset
        // TableEditor 场景下不重置, 即 reset 为 false
        reset: !config.extraConfig?.isInTableEditor,
      });
    }
  }, [config?.data]);

  // 因为 InnerTable 是 observer 的，默认具有 memo 效果，因此传入 forceUpdateFlag 强制其刷新
  return <InnerTable table={table} className={props.className} style={props.style} forceUpdateFlag={table.config} />;
};

export const Table = Object.assign(forwardRef(_Table), {
  getConfig: getTableConfig,
  defineConfig: getTableConfig,
  defineColumn,
  defineColumns,
  defineToolbar,
  getTextWidth,
  changeToolbarValues,
  changeToolbarValuesPure,
  createPolling,
  formatter,
  helper,
  effects,
  ExportDataModal,
});
