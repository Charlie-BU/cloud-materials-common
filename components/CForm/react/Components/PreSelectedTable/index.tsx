import React, { useRef } from 'react';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import type { R, TableModel, TableProps, TableConfig } from '../../../../CTable';
import CTable from '../../../../CTable';
import { connect, mapProps } from '@formily/react';
import type { Field } from '@formily/core';
import classNames from 'classnames';
import { isFunction } from 'lodash-es';
import { useCConfigContext } from '../../../../CConfigProvider';

export const cssPrefix = classNamePrefixFactory('cform-selected-table');

export const selectedTableTestId = {
  container: cssPrefix`container`,
  table: cssPrefix`table`,
};

export interface PreSelectedTableProps<T extends R = any> extends Omit<TableConfig<T>, 'rowKey' | 'fetcher'> {
  /**
   * @default true
   * @description 是否展示批量配置，包括移出按钮和默认实例变更数量提示
   */
  showBatchConfig?: boolean;
  /**
   * @default 1
   * @description 表格的最小数据数量，当展示移出按钮时，数据数量达到该数量时，按钮自动禁用
   */
  minCount?: number;
  /** 自定义表格上方信息提示 */
  customTip?: string | ((value?: T[]) => string);
  /** 每行数据的key */
  rowKey: string;
  /** table除config的其它属性 */
  tableProps?: Omit<TableProps<T>, 'config'>;
  /** 组件样式 */
  style?: React.CSSProperties;
  /** 组件类名 */
  className?: string | string[];
  /** 组件操作禁用状态 */
  disabled?: boolean;
  onChange?: (value: T[]) => void;
  value?: T[];
}

const PreSelectedTableComponent: React.FC<PreSelectedTableProps> = React.forwardRef<
  TableModel<R>,
  PreSelectedTableProps
>((props, ref) => {
  const {
    value,
    onChange,
    tableProps,
    minCount = 1,
    showBatchConfig = true,
    arcoTableProps,
    customTip,
    columns,
    rowKey,
    disabled,
    style,
    className,
    ...restTableConfig
  } = props;

  let tableRef: React.RefObject<TableModel<any>> = useRef(null);
  tableRef = (ref as React.RefObject<TableModel<any>>) ?? tableRef;

  const _customTip = isFunction(customTip) ? customTip(value) : customTip;
  const showTip = showBatchConfig || _customTip;

  const { locale, formatLocale, useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('cform-selected-table');
  const defaultTips = formatLocale(locale.PreSelectedTable.defaultTips, { count: value?.length || 0 });

  const removeColumns = CTable.defineColumn({
    title: locale.PreSelectedTable.operationTitle,
    component: 'COperationMenu',
    fixed: 'right',
    componentProps: ({ table, rowData }) => {
      const disabledByMinCount = table.total <= minCount;
      return {
        operations: [
          {
            name: locale.PreSelectedTable.removeText,
            arcoPopconfirmProps: {
              title: locale.PreSelectedTable.confirmRemoveText,
              onOk: () => onChange?.(value?.filter(val => val?.[rowKey] !== rowData[rowKey]) ?? []),
            },
            disabled: disabled || disabledByMinCount,
            tooltip: disabledByMinCount && formatLocale(locale.PreSelectedTable.lessWarning, { count: minCount }),
          },
        ],
      };
    },
  });

  const config = CTable.getConfig<any>({
    pagination: false,
    data: value,
    rowKey,
    columns: showBatchConfig ? columns?.concat([removeColumns]) : columns,
    ...restTableConfig,
    arcoTableProps: isFunction(arcoTableProps)
      ? arcoTableProps
      : {
          border: true,
          ...arcoTableProps,
          scroll: {
            y: 224,
            ...arcoTableProps?.scroll,
          },
        },
  });
  return (
    <div className={classNames(cssPrefix``, className)} style={style} data-cy={selectedTableTestId.container}>
      {showTip && <div className={cssPrefix`tips`}>{_customTip ? _customTip : defaultTips}</div>}
      <CTable ref={tableRef} config={config} data-cy={selectedTableTestId.table} {...tableProps} />
    </div>
  );
});

export const PreSelectedTable = connect(
  PreSelectedTableComponent,
  mapProps((props, field) => {
    if (!field) return props;

    return {
      value: props.data || (field as Field).value,
      rowKey: props.rowKey,
      disabled: props.disabled ?? field.disabled,
    };
  }),
);

PreSelectedTable.displayName = 'PreSelectedTable';

export default PreSelectedTable;
