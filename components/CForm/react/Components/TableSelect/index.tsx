import React, { useEffect, useRef } from 'react';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import type { TableModel } from '../../../../CTable';
import CTable, { onRowSelect, onTableUpdateDataEnd } from '../../../../CTable';
import type { CTableSelectProps, TableSelectData } from './interface';
import { connect, mapProps, useField } from '@formily/react';
import { getColumnFilterDefault, getRowClassName, getToolbarConfig } from './utils';
import type { Field } from '@formily/core';
import { isFunction, omit } from 'lodash-es';
import classNames from 'classnames';
import type { TableProps as ArcoTableProps } from '@arco-design/web-react';
import type { RowSelectionProps } from '@arco-design/web-react/es/Table';

export const cssPrefix = classNamePrefixFactory('cform-table-select');

export const tableSelectTestId = {
  container: cssPrefix`container`,
  filter: cssPrefix`filter`,
};

const CTableSelectComponent: React.FC<CTableSelectProps> = React.forwardRef<TableModel<any>, CTableSelectProps>(
  (props, ref) => {
    const {
      type = 'radio',
      fetcher,
      value,
      onChange,
      afterSelectRow,
      effects: customEffects,
      rowSelection = {},
      renderSelectCell,
      loading,
      disabled,
      tableProps,
      arcoTableProps,
      ...restSelectProps
    } = props;

    const field = useField() as Field;

    const cleanTableProps = omit(restSelectProps, [
      'type',
      'filterOptions',
      'onChange',
      'value',
      'columns',
      'allValueOption',
    ]);
    const { className, ...restTableProps } = tableProps || {};

    // 判断自定义的rowSelection 是字符串还是一个对象
    const _rowSelection = typeof rowSelection === 'object' ? rowSelection : { type: rowSelection };

    let tableRef: React.RefObject<TableModel<any>> = useRef(null);
    tableRef = (ref as React.RefObject<TableModel<any>>) ?? tableRef;

    useEffect(() => {
      // 监听，整个组件disabled状态发生变化 && table.totalData 变化时（历史逻辑，rowData.disabled也可以设置某行的禁止状态）——设置行是否可选择
      tableRef?.current?.rows?.forEach(row => {
        const rowDisabled =
          // row禁止选择的场景：全局禁止；某行selectable为false；或者某行数据传入了disabled
          disabled ||
          _rowSelection?.selectable?.({ table: tableRef?.current as TableModel<any>, row, rowData: row?.data }) ===
            false ||
          row?.data?.disabled;

        row.setSelectable(!rowDisabled);
      });
    }, [disabled, tableRef?.current?.totalData]);

    const config = CTable.getConfig<TableSelectData>({
      pagination: false,
      ...cleanTableProps,
      toolbar: getToolbarConfig(props),
      rowSelection: {
        type: type,
        ..._rowSelection,
      },
      columns: getColumnFilterDefault(props),
      arcoTableProps: (...args) => {
        const customArcoTableProps = isFunction(arcoTableProps) ? arcoTableProps(...args) : arcoTableProps;
        const customCheckboxProps = customArcoTableProps?.rowSelection?.checkboxProps;

        const arcoRowSelection: RowSelectionProps = {
          selectedRowKeys: type === 'radio' ? [value] : value || [],
          onChange: val => onChange?.(type === 'radio' ? val?.[0] : val || []),
          ...customArcoTableProps?.rowSelection,
        };
        // 当传入自定义时，该字段配置才会生效；原因，传入checkboxProps属性时，会覆盖掉当前的selectable配置
        customCheckboxProps &&
          Object.assign(arcoRowSelection, {
            checkboxProps: record => {
              const _customCheckboxProps = isFunction(customCheckboxProps)
                ? customCheckboxProps(record)
                : customCheckboxProps;

              return { disabled: record?.data?.disabled || disabled, ..._customCheckboxProps };
            },
          } as Partial<ArcoTableProps['rowSelection']>);

        return {
          border: true,
          size: 'middle',
          rowClassName: getRowClassName,
          loading,
          ...customArcoTableProps,
          scroll: {
            y: 200,
            ...customArcoTableProps?.scroll,
          },
          rowSelection: {
            ...arcoRowSelection,
            renderCell: renderSelectCell,
          },
        };
      },
      fetcher,
      effects(options) {
        onRowSelect<TableSelectData>(options => {
          afterSelectRow?.(options, options.table.selectedRowKeys);
        });
        customEffects?.(options);
        onTableUpdateDataEnd(({ table }) => {
          // 通过fetcher设置table的数据后，设置field的dataSource
          fetcher && field?.setDataSource(table?.totalData);
        });
      },
    });
    return (
      <CTable
        ref={tableRef}
        config={config}
        className={classNames(cssPrefix``, className)}
        data-cy={tableSelectTestId.container}
        {...restTableProps}
      />
    );
  },
);

export const CTableSelect = connect(
  CTableSelectComponent,
  mapProps((props, field) => {
    if (!field) return props;

    return {
      data: props.data || (field as Field).dataSource,
      rowKey: props.rowKey,
      loading: (field as Field).loading,
      disabled: props.disabled ?? field.disabled,
    };
  }),
);

CTableSelect.displayName = 'CTableSelect';

export default CTableSelect;
