import type { TableEditorModel } from '../model';
import { ROW_KEY } from '../constants';
import type { ObjectField } from '@formily/core';
import type { R } from '../types/helper';

/**
 * 通过 rowKey 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 * @returns
 */
export const getRowObjectField = (options: { tableEditor: TableEditorModel; rowKey: string }) => {
  const { tableEditor, rowKey } = options;
  return tableEditor.form.fields[rowKey] as ObjectField;
};

/**
 * 通过 rowKey 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 * @returns
 */
export const getRowFieldByRowKey = getRowObjectField;

/**
 * 通过行序号 index 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 */
export const getRowFieldByIndex = (options: { tableEditor: TableEditorModel; index: number }) => {
  const { tableEditor, index } = options;

  const rowData = tableEditor.currentData[index];

  if (!rowData) {
    console.warn('数据不存在: index 超出范围');
    return null;
  }

  const rowKey = rowData[ROW_KEY];
  return tableEditor.form.fields[rowKey] as ObjectField;
};

/**
 * 按 rowData 获取 CTableEditor 中某一行在 formily 中对应的 ObjectField
 * @param options
 * @returns
 */
export const getRowFieldByRowData = <DataItem extends R = any>(options: {
  tableEditor: TableEditorModel;
  rowData: DataItem;
}) => {
  const { tableEditor, rowData } = options;
  const rowKey = rowData[ROW_KEY];
  return getRowFieldByRowKey({ tableEditor, rowKey });
};

/**
 * 通过 rowKey 获取 CTableEditor 中某一行的当前数据
 * @param options
 * @returns
 */
export const getRowData = <DataItem extends R = any, ValueType extends R = any>(options: {
  tableEditor: TableEditorModel<DataItem, ValueType>;
  rowKey: string;
}) => {
  const { tableEditor, rowKey } = options;
  return tableEditor.currentData.find(d => d[ROW_KEY] === rowKey);
};

/**
 * 通过 rowKey 获取 CTableEditor 中某一行的当前数据
 */
export const getRowDataByRowKey = getRowData;

/**
 * 按 index 获取 CTableEditor 中某一行的当前数据
 * @param options
 */
export const getRowDataByIndex = <DataItem extends R = any, ValueType extends R = any>(options: {
  tableEditor: TableEditorModel<DataItem, ValueType>;
  index: number;
}) => {
  const { tableEditor, index } = options;

  const rowData = tableEditor.currentData[index];

  if (!rowData) {
    console.warn('数据不存在: index 超出范围');
    return null;
  }

  return rowData;
};

/**
 * 设置某一行的编辑态 (editable)
 *
 * 注意: 设置某一行的编辑态后，该行的编辑态就不受 form 管控了，也就是切换 form 的编辑态时不会影响该行
 * @param options
 */
export const setRowEditable = (options: { editable: boolean; tableEditor: TableEditorModel; rowKey: string }) => {
  const objectField = getRowObjectField(options);
  objectField.editable = options.editable;
};

/**
 * 切换某一行的编辑态 (editable)
 *
 * 注意: 设置某一行的编辑态后，该行的编辑态就不受 form 管控了，也就是切换 form 的编辑态时不会影响该行
 * @param options
 */
export const toggleRowEditable = (options: { tableEditor: TableEditorModel; rowKey: string }) => {
  const objectField = getRowObjectField(options);
  objectField.editable = !objectField.editable;
};

/**
 * 删除某一行
 * @param options
 */
export const deleteRow = (options: { tableEditor: TableEditorModel; rowKey: string }) => {
  const { tableEditor, rowKey } = options;
  tableEditor.deleteRows([rowKey]);
};

/**
 * 按 index 获取某一行的 rowKey
 * @param options
 * @returns
 */
export const getRowKeyByIndex = <DataItem extends R = any, ValueType extends R = any>(options: {
  index: number;
  tableEditor: TableEditorModel<DataItem, ValueType>;
}) => {
  const { index, tableEditor } = options;
  const rowData = getRowDataByIndex({ tableEditor, index });
  return rowData?.[ROW_KEY];
};

/**
 * 通过 rowData 获取这一行数据的 rowKey
 * @param rowData
 * @returns
 */
export const getRowKeyByRowData = <DataItem extends R = any>(rowData: DataItem) => {
  return rowData[ROW_KEY];
};
