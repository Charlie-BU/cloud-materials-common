import { isFunction } from 'lodash-es';
import React, { useMemo, useRef } from 'react';
import type { TableConfig, TableModel, TableProps } from '../CTable';
import type { TableProps as ArcoTableProps } from '@arco-design/web-react';
import CTable from '../CTable';
import type { StaticMethodsExtraProps, StaticMethodsReturn } from '../_factory/maskableComponent';
import { createStaticMethods } from '../_factory/maskableComponent';
import BaseCModal from './Base';
import type { CModalProps } from './interface';
import { useMergeProps } from '../hooks';
import { useCConfigContext } from '../CConfigProvider';

export interface CModalTableProps<T extends Record<string, any> = Record<string, any>, OnOkReturn = unknown>
  extends Omit<CModalProps, 'onOk' | 'children'> {
  tableProps?: TableProps<T>;
  tableConfig: TableConfig<T>;
  onOk?: (table: TableModel<T>, e?: MouseEvent) => Promise<OnOkReturn> | OnOkReturn;
  children?: any;
}

const DefaultScrollY = 360;

const ModalTableComponent = React.forwardRef<HTMLDivElement, CModalTableProps<any, any>>((props, ref) => {
  const { cComponentConfig: { 'CModal.Table': CModalTable = {} } = {} } = useCConfigContext();
  const { tableProps, tableConfig, children, onOk, ...restProps }: CModalTableProps = useMergeProps(
    props,
    {} as any,
    CModalTable,
  );
  const tableRef = useRef<TableModel<any>>(null);

  const config = tableProps?.config ?? tableConfig;

  const mergedArcoTableProps = useMemo(
    () =>
      isFunction(config.arcoTableProps)
        ? (...args: any[]): Partial<ArcoTableProps> => {
            const arcoTableProps = (config.arcoTableProps as (...args: any[]) => any)(...args);
            return {
              ...arcoTableProps,
              scroll: {
                y: DefaultScrollY,
                ...arcoTableProps.scroll,
              },
            };
          }
        : ({
            ...config.arcoTableProps,
            scroll: {
              y: DefaultScrollY,
              ...config.arcoTableProps?.scroll,
            },
          } as ArcoTableProps),
    [config.arcoTableProps],
  );

  return (
    <BaseCModal {...restProps} onOk={(e: MouseEvent) => onOk?.(tableRef.current!, e)} ref={ref}>
      <CTable
        ref={tableRef}
        {...tableProps}
        config={{
          ...config,
          arcoTableProps: mergedArcoTableProps,
        }}
      />
      {children}
    </BaseCModal>
  );
});

ModalTableComponent.displayName = 'TableModal';

const TypedModalTableComponent = ModalTableComponent as <T extends Record<string, any> = any, OnOkReturn = unknown>(
  props: CModalTableProps<T, OnOkReturn> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

const { open, ...restStatics } = createStaticMethods(TypedModalTableComponent);

const ModalTable = Object.assign(TypedModalTableComponent, restStatics, {
  open: <T extends Record<string, any>, OnOkReturn = unknown>(
    props: StaticMethodsExtraProps<CModalTableProps<T, OnOkReturn>>,
  ): StaticMethodsReturn<CModalTableProps<T, OnOkReturn>, OnOkReturn> => open(props as any) as any,
});

export default ModalTable;
