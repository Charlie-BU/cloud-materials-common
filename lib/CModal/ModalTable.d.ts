import React from 'react';
import type { TableConfig, TableModel, TableProps } from '../CTable';
import type { StaticMethodsExtraProps, StaticMethodsReturn } from '../_factory/maskableComponent';
import type { CModalProps } from './interface';
export interface CModalTableProps<T extends Record<string, any> = Record<string, any>, OnOkReturn = unknown> extends Omit<CModalProps, 'onOk' | 'children'> {
    tableProps?: TableProps<T>;
    tableConfig: TableConfig<T>;
    onOk?: (table: TableModel<T>, e?: MouseEvent) => Promise<OnOkReturn> | OnOkReturn;
    children?: any;
}
declare const ModalTable: (<T extends Record<string, any> = any, OnOkReturn = unknown>(props: CModalTableProps<T, OnOkReturn> & {
    ref?: React.Ref<HTMLDivElement> | undefined;
}) => React.ReactElement) & {
    close: (id?: number | undefined) => void;
} & {
    open: <T_1 extends Record<string, any>, OnOkReturn_1 = unknown>(props: StaticMethodsExtraProps<CModalTableProps<T_1, OnOkReturn_1>>) => StaticMethodsReturn<CModalTableProps<T_1, OnOkReturn_1>, OnOkReturn_1>;
};
export default ModalTable;
