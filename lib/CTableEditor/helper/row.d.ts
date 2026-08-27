import type { TableEditorModel } from '../model';
import type { ObjectField } from '@formily/core';
import type { R } from '../types/helper';
/**
 * 通过 rowKey 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 * @returns
 */
export declare const getRowObjectField: (options: {
    tableEditor: TableEditorModel;
    rowKey: string;
}) => ObjectField<any, any>;
/**
 * 通过 rowKey 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 * @returns
 */
export declare const getRowFieldByRowKey: (options: {
    tableEditor: TableEditorModel;
    rowKey: string;
}) => ObjectField<any, any>;
/**
 * 通过行序号 index 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 */
export declare const getRowFieldByIndex: (options: {
    tableEditor: TableEditorModel;
    index: number;
}) => ObjectField<any, any> | null;
/**
 * 按 rowData 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 * @returns
 */
export declare const getRowFieldByRowData: <DataItem extends R = any>(options: {
    tableEditor: TableEditorModel;
    rowData: DataItem;
}) => ObjectField<any, any>;
/**
 * 通过 rowKey 获取 CTableEditor 中某一行的当前数据
 * @param options
 * @returns
 */
export declare const getRowData: <DataItem extends R = any, ValueType extends R = any>(options: {
    tableEditor: TableEditorModel<DataItem, ValueType>;
    rowKey: string;
}) => (DataItem & import("../types/helper").WithRowKey & ValueType) | undefined;
/**
 * 通过 rowKey 获取 CTableEditor 中某一行的当前数据
 */
export declare const getRowDataByRowKey: <DataItem extends R = any, ValueType extends R = any>(options: {
    tableEditor: TableEditorModel<DataItem, ValueType>;
    rowKey: string;
}) => (DataItem & import("../types/helper").WithRowKey & ValueType) | undefined;
/**
 * 按 index 获取 CTableEditor 中某一行的当前数据
 * @param options
 */
export declare const getRowDataByIndex: <DataItem extends R = any, ValueType extends R = any>(options: {
    tableEditor: TableEditorModel<DataItem, ValueType>;
    index: number;
}) => (DataItem & import("../types/helper").WithRowKey & ValueType) | null;
/**
 * 设置某一行的编辑态 (editable)
 *
 * 注意: 设置某一行的编辑态后，该行的编辑态就不受 form 管控了，也就是切换 form 的编辑态时不会影响该行
 * @param options
 */
export declare const setRowEditable: (options: {
    editable: boolean;
    tableEditor: TableEditorModel;
    rowKey: string;
}) => void;
/**
 * 切换某一行的编辑态 (editable)
 *
 * 注意: 设置某一行的编辑态后，该行的编辑态就不受 form 管控了，也就是切换 form 的编辑态时不会影响该行
 * @param options
 */
export declare const toggleRowEditable: (options: {
    tableEditor: TableEditorModel;
    rowKey: string;
}) => void;
/**
 * 删除某一行
 * @param options
 */
export declare const deleteRow: (options: {
    tableEditor: TableEditorModel;
    rowKey: string;
}) => void;
/**
 * 按 index 获取某一行的 rowKey
 * @param options
 * @returns
 */
export declare const getRowKeyByIndex: <DataItem extends R = any, ValueType extends R = any>(options: {
    index: number;
    tableEditor: TableEditorModel<DataItem, ValueType>;
}) => string | undefined;
/**
 * 通过 rowData 获取这一行数据的 rowKey
 * @param rowData
 * @returns
 */
export declare const getRowKeyByRowData: <DataItem extends R = any>(rowData: DataItem) => any;
