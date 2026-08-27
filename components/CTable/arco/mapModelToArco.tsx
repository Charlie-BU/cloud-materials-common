/*
 * @Author: youjingyu
 * @Date: 2021-09-26 14:57:23
 * @LastEditTime: 2021-12-15 17:00:09
 * @LastEditors: youjingyu
 * @Description:
 */
import { IconMinus, IconPlus, IconNoDataHighSaturation } from '@arco-design/iconbox-react-ve-o-design';
import type { TableColumnProps as ArcoTableColumnProps, TableProps as ArcoTableProps } from '@arco-design/web-react';
import { Popover, Table } from '@arco-design/web-react';
import { IconQuestionCircle } from '@arco-design/web-react/icon';
import { untracked } from '@formily/reactive';
import { isArray } from 'lodash-es';
import React from 'react';
import type { CConfigContextValue } from '../../CConfigProvider/interface';
import CLoadingV2 from '../../CLoadingV2';
import type { CResultProps } from '../../CLoadingV2/interface';
import type { FilterDropdownRenderProps, RowSelectionRenderProps } from '../core';
import { StatusChangeReason, getFnComponentProps } from '../core';
import { getCellData, isFn, isNum, isPlainObj, isReactNode } from '../shared';
import { ExpandRow, FilterDropdown, RowSelection } from './components';
import { prefixCls } from './constants';
import type { ColumnModel, TableConfig, TableModel } from './types';
import { hidePaginationWhenTotalLessThan, shouldHideBottomButton } from './utils';

const mapFilterConfig = (column: ColumnModel<any>, arcoPrefixCls: string) => {
  const tableConfig = column.table.config as TableConfig<any>;
  // 为了兼容老配置
  const isPolling = tableConfig.polling || tableConfig.extraConfig?.isPolling;

  const filterComponentProps = getFnComponentProps<FilterDropdownRenderProps>(column.filterComponentProps, {
    table: column.table,
    column,
  });

  const filterConfig = column.table.plugin.getFilter(column.config.filter);
  // 如果要隐藏 filter 的展示，直接返回空，让 arco 不渲染 filter
  if (filterConfig.hide === true) {
    return {};
  }
  const config: Partial<ArcoTableColumnProps> = {
    // 在 filter 值清空时，必须传递一个空数组给 arco，才能告诉 arco 将组件值置为空
    // filteredValue: column.filterValue || [],
    filterMultiple: filterConfig.multiple === true,
    // 不兼容老的 filterComponentProps?.multiple 的写法
    // filterMultiple: filterComponentProps?.multiple === true || filterConfig.multiple === true,
    onFilterDropdownVisibleChange(visible) {
      column.setFilterVisible(visible);
    },
    filterDropdownProps: filterComponentProps?.dropdownProps,
  };

  /**
   * 轮询模式下筛选值不受控. 仅赋初值。不然每次轮询、导致 Table 刷新时，会打断用户对 filter 的操作
   * 非轮询模式下受控, arco 不支持传 undefined, 会被认为是受控
   */
  if (isPolling) {
    config.defaultFilters = column.filterValue || [];
  } else {
    config.filteredValue = column.filterValue || [];
  }

  if (column.filterDataSource) {
    config.filters = column.filterDataSource;
  }
  if (column.filterIconComponentType) {
    const { Component, defaultComponentProps } = column.table.plugin.getComponent(column.filterIconComponentType, {
      scope: 'filter',
    });
    if (Component) {
      config.filterIcon = <Component {...defaultComponentProps} {...column.filterIconComponentProps} />;
    }
  }
  if (column.filterComponentType) {
    config.filterDropdown = options => {
      return (
        <div className={`${arcoPrefixCls}-table-custom-filter`}>
          <FilterDropdown dataIndex={column.config.dataIndex} dropdownOptions={options} />
        </div>
      );
    };
  }
  // filter 事件在 table onChange 事件中统一处理
  return config;
};

const mapColumnConfig = (table: TableModel<any>, column: ColumnModel<any>, ctx: CConfigContextValue) => {
  const { cPrefixCls, prefixCls = 'arco' } = ctx;
  const { directions } = table.plugin.getSorter(column.config.sorter);
  const columnProps: ArcoTableColumnProps = {
    title: (
      <>
        {column.title}
        {column.config.tooltip && (
          <Popover content={column.config.tooltip}>
            <IconQuestionCircle className={`${cPrefixCls}-table-column-title-tooltip`} />
          </Popover>
        )}
      </>
    ),
    align: column.config.alignType === 'right' ? 'right' : undefined,
    width: column.width || table.columnsAutoWidth?.[column.config.dataIndex],
    dataIndex: column.config.dataIndex,
    fixed: column.config.fixed,
    sorter: Boolean(directions),
    sortOrder: column.sorterValue as ArcoTableColumnProps['sortOrder'],
    sortDirections: directions,
    ...(column.config.filter ? mapFilterConfig(column, prefixCls) : {}),
    // onHeaderCell 的返回值会作为 TableHeaderCell 的 props 传入
    onHeaderCell() {
      return {
        // 这里也可以传入 dataIndex，然后在 TableHeaderCell 中通过 dataIndex 查找对应的 Column 实例
        columnModel: column,
      };
    },
  };
  if (column.children) {
    columnProps.children = column.children
      .filter(c => c.show)
      .map(item => mapColumnConfig(table, item as ColumnModel<any>, ctx));
  }

  const mergedColumnProps = {
    ...columnProps,
    ...(isFn(column.config.arcoColumnProps)
      ? column.config.arcoColumnProps({ table, column, originalProps: columnProps })
      : column.config.arcoColumnProps),
  } as ArcoTableColumnProps;

  return mergedColumnProps;
};

// 自动计算 scroll x
const autoScrollX = (table: TableModel<any>) => {
  // 如果每一列都设置了宽度的情况
  let scrollX = 0;
  for (const c of table.columns.filter(c => c.show)) {
    const width = c.width || table.columnsAutoWidth?.[c.dataIndex];
    // 只要有一个列没有不存在宽度或者不是数字，直接返回
    if (!isNum(width)) {
      return;
    }
    scrollX += width;
  }
  return scrollX;
};

const getScroll = (table: TableModel<any>) => {
  const extraConfig: TableConfig<any>['extraConfig'] = table.config.extraConfig;
  const scroll: ArcoTableProps['scroll'] = {};
  const scrollX = autoScrollX(table);
  if (scrollX) {
    scroll.x = scrollX;
  }
  // 滚动加载模式和自动固定底部滚动条，都需要设置 scroll.y 为 auto
  // 设为 auto 时，arco 才会应用 ArcoTableProps.component 配置中的 wrapper
  // 并且将 body 部分和 header 部分通过两个 table 渲染
  if (table.isLoadMoreMode() || extraConfig?.autoFixBottomScroll) {
    scroll.y = 'auto';
  }
  return scroll;
};

/**
 * 2024-03-19 解决 selectable、expandable 在第一次渲染后再更新时，无法触发对应 ui 的更新的问题
 *
 * 原因：渲染 行选择与展开行 ui 的组件都是 Table 的子孙组件，而子孙组件是没有被 observer 包裹的，只有最外层的 Table 包裹了
 * 只有被 observer 包裹的组件才会在数据变化时自动重新渲染（之前很多情况下没问题，可能是 Table 整体渲染了，驱动了子孙组件的渲染）
 *
 * 暂时的解决方案：因为无法去改 arco 的代码来对 Table 的子孙组件包裹 observer
 * 因此只有在 Table 的最外层组件中访问一下响应式数据，让最外层的 Table 收集到依赖，让最外层的 rerender 驱动子孙组件渲染
 *
 * 这里存在一个风险：所有未经 observer 包裹的子孙组件如果依赖了响应式数据，都无法自动更新
 * 初步评估 arco Table 的子孙组件依赖的响应式状态，暂时只有 selectable、expandable，其它状态暂不影响
 */
const getRowStatusMap = (table: TableModel<any>) => {
  const rowStatusMap: Record<string, { selectable?: boolean; expandable?: boolean }> = {};
  table.rows.forEach(item => {
    rowStatusMap[item.key] = {
      selectable: item.selectable,
      expandable: item.expandable,
    };
  });
  return rowStatusMap;
};

export const mapTableConfig = (table: TableModel<any>, ctx: CConfigContextValue) => {
  const columns = table.columns
    .filter(c => c.show)
    .map(columnModel => mapColumnConfig(table, columnModel as ColumnModel<any>, ctx));
  const extraConfig: TableConfig<any>['extraConfig'] = table.config.extraConfig;

  const isRefresh = table.loading && table.status.statusChangeReason === StatusChangeReason.REFRESH;

  const rowStatusMap = getRowStatusMap(table);

  const hidePagination =
    table.config.pagination === false ||
    // load more 模式不显示分页
    table.isLoadMoreMode() ||
    // 当数据总数小于某个数值时，隐藏分页
    hidePaginationWhenTotalLessThan(table) ||
    shouldHideBottomButton(table);

  // 在初始化时，不显示 '无数据' 组件，这里用一个空 div 替换
  // 182 是 arco '无数据' 占位组件的高度，这里保持和 arco 一样
  const emptyHeight = 182;
  let noDataElement: ArcoTableProps['noDataElement'] = <div style={{ height: emptyHeight }} />;
  if (!table.loading && table.rows.length === 0) {
    // 如果在没有数据时，发生错误，显示 error 组件
    // 如果有数据，仍旧展示原有的数据
    // 如果是 axios 的 cancel 错误，不展示错误界面
    if (table.status.error && !(table.status.error as any).__CANCEL__) {
      noDataElement = (
        <CLoadingV2 style={{ height: emptyHeight }} type="block" hasError onReload={() => table.refresh()} />
      );
    } else {
      // 用 untracked 避免收集依赖，导致 noDataElement 频繁改变
      // 保证只在 Table 组件重渲染时，才重渲染
      untracked(() => {
        const _noDataElement = table.config.noDataElement?.({ table });
        if (isReactNode(_noDataElement)) {
          noDataElement = _noDataElement;
        } else {
          noDataElement = (
            <CLoadingV2.Result
              style={{ height: emptyHeight }}
              status={<IconNoDataHighSaturation />}
              title={ctx.locale.CTable.noData}
              {...(_noDataElement as CResultProps)}
            />
          );
        }
      });
    }
  }

  const tableProps: ArcoTableProps = {
    /**
     * loading 改成了我们自己通过 Spin 包裹 table，不用 table 自己的了
     * 因为现在是自定义渲染分页组件，table 的 loading 无法覆盖自定义的分页组件
     * */
    // loading: table.loading,
    // 当 memo row 后，对每个 row 都浅拷贝一下，防止对比不出来前后属性的变化，比如 isSelected
    // TODO 在 TableEditor 中默认也会拷贝，原因待定，为了降低风险，保持原有逻辑
    data:
      extraConfig?.isInTableEditor || extraConfig?.useMemoTableRow
        ? table.rows.map(r => {
            return {
              ...r,
            };
          })
        : table.rows,
    // 在 row 上已经计算好了 rowKey，放在 key 属性上
    rowKey: 'key',
    columns,
    showSorterTooltip: false,
    scroll: getScroll(table),
    noDataElement,
    rowClassName(record) {
      // 只有在第一次渲染的时候高亮一次之前点过的行
      if (table.status.statusChangeReason !== StatusChangeReason.INIT) {
        return '';
      }
      return table.initStatus?.activeRowKey === record.key ? `${prefixCls}-active-row` : '';
    },
    pagination: hidePagination
      ? false
      : {
          showTotal: true,
          total: table.total,
          pageSize: table.pageSize,
          // 适配 startPageNumber 为 0 或者 1 的情况
          current: table.currentPage + (1 - table.startPageNumber),
          sizeCanChange: true,
          onChange(pageNumber, pageSize) {
            table.changePage(pageNumber - 1 + table.startPageNumber, pageSize);
          },
          // 默认向上弹出，虽然向上弹会遮挡一部分内容，但问题不大，而且可以规避在 Tabs 中使用时被截断的问题
          selectProps: {
            triggerProps: {
              position: 'top',
              // 分页器下拉选择框宽度自适应，以便在多语音环境下有遮挡文档
              autoAlignPopupWidth: false,
            },
          },
          sizeOptions: [10, 20, 50, 100],
          ...(isPlainObj(table.config.pagination) ? table.config.pagination : {}),
        },
    onChange(_, sorter, filters, extra) {
      // 由于 arco 的 bug，切换分页事件需要在 pagination 配置中监听
      // 否则 arco 在切换分页时，会触发 row select 事件（事件回调中 selectedRowKeys 为空数组），无法与取消全选这个动作区分开
      // 从而导致切换分页后，回到上一个页，保留选择状态这个功能无法实现
      // issue: https://github.com/arco-design/arco-design/issues/320
      if (extra.action === 'sort') {
        // 2023-05-29 更新
        // arco 支持了多列排序，CTable 暂不支持，所以如果 sorter 是数组也只取第一个元素
        const sorterInfo = isArray(sorter) ? sorter[0] : sorter;
        table.sort({ [sorterInfo.field!]: sorterInfo.direction! });
      } else if (extra.action === 'filter') {
        table.filter(filters as any);
      }
    },
  };

  if (table.config.rowSelection) {
    const rowSelection = table.plugin.getRowSelection(table.config.rowSelection);
    if (rowSelection.component) {
      tableProps.rowSelection = {
        renderCell(_, __, record) {
          return <RowSelection record={record} />;
        },
      };
    } else {
      tableProps.rowSelection = {
        type: rowSelection.type as 'checkbox' | 'radio',
        selectedRowKeys: table.selectedRowKeys,
        // 在本地模式下，翻页时，保存行的选择状态
        preserveSelectedRowKeys: true,
        // 在回调中，我们不需要 arco 传入 row，只需要 rowKey
        // 因此 pureKeys 配置为 true，为大数据场景的性能优化做准备
        pureKeys: true,
        onSelect(selected, record) {
          const row = table.getRowByRowKey(record.key);
          row?.setSelect(selected, { overwrite: !rowSelection.multiple, triggerSelectRowEvent: true });
        },
        onSelectAll(selected) {
          table.selectRowAll(selected, { triggerSelectRowEvent: true });
        },
        checkboxProps(record) {
          const row = table.getRowByRowKey(record.key);
          if (!row) {
            return {};
          }
          const rowSelectionComponentProps = getFnComponentProps<RowSelectionRenderProps>(
            row.rowSelectionComponentProps,
            { table: row.table, row, rowData: row.data },
          );
          return {
            ...rowSelectionComponentProps,
            disabled: rowStatusMap[row.key]?.selectable === false,
          };
        },
      };
    }
  }

  if (table.config.expandRow) {
    const expandRow = table.plugin.getExpandRow(table.config.expandRow);
    // 默认在表格刷新时，卸载展开的行
    const unmoutExpandRow = isRefresh && expandRow?.unmountWhenParentTableRefresh !== false;
    // 如果要卸载展开行，刷新时，设置 expandedRowKeys 为空，ui 上会收起所有展开行
    // 刷新完成后，之前展开的行会再次展开，衡量多种交互后，这个交互流程相对比较理想
    tableProps.expandedRowKeys = unmoutExpandRow ? [] : table.rows.filter(row => row.isExpanded).map(row => row.key);
    tableProps.expandedRowRender = record => <ExpandRow record={record} />;
    tableProps.onExpand = (detail, expanded) => {
      table.expendRow(detail.key, expanded);
    };
    tableProps.expandProps = {
      rowExpandable: row => rowStatusMap[row.key]?.expandable === true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      icon: ({ expanded, record, ...restProps }) =>
        expanded ? (
          <button {...restProps} type="button">
            <IconMinus />
          </button>
        ) : (
          <button {...restProps} type="button">
            <IconPlus />
          </button>
        ),
    };
  }

  if (table.sumRowData) {
    tableProps.summary = () => {
      return (
        <Table.Summary>
          <Table.Summary.Row>
            {/* 如果有展开和选择，需要用两个 cell 占位 */}
            {/* Todo 在使用占位后，会导致 arco 的 column 错乱，考虑用 margin left hack？ */}
            {/* {tableProps.rowSelection && <Table.Summary.Cell />} */}
            {/* {tableProps.expandedRowRender && <Table.Summary.Cell />} */}
            {table.columns
              .filter(c => c.show)
              .map(c => (
                <Table.Summary.Cell key={c.config.dataIndex}>
                  {getCellData(table.sumRowData, c.config.dataIndex) ?? '-'}
                </Table.Summary.Cell>
              ))}
          </Table.Summary.Row>
        </Table.Summary>
      );
    };
  }

  return tableProps;
};
