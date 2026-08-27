import React from 'react';
import { useCell, useTable, useRow } from '../../../../CTable';
import type { TableEditorColumnConfig } from '../../../types';
import CForm from '../../../../CForm';
import { useTableEditor } from '../../hooks';
import { isFunction } from 'lodash-es';

export const CellDecorator = (props: any) => {
  const cell = useCell();
  const table = useTable();
  const row = useRow();
  const tableEditor = useTableEditor();

  const columnConfig = cell.column.config as TableEditorColumnConfig;
  const fieldName = columnConfig.dataIndex;

  const options = {
    table,
    tableEditor,
    column: cell.column,
    row,
    rowData: row.data,
    cell,
    cellData: cell.data,
  };

  const _editConfig = columnConfig.editConfig;
  const editConfig = isFunction(_editConfig) ? _editConfig(options) : _editConfig;

  const _editable = editConfig?.editable;
  const fieldConfig = editConfig?.fieldConfig;

  // 可编辑的条件: 配置了 fieldConfig 且没有配置 editable 为 false
  const editable = fieldConfig && _editable !== false;

  return (
    <>
      {!editable ? (
        // 不支持编辑时渲染 table cell
        <div>{props.children}</div>
      ) : (
        // 支持编辑时渲染 FormItem
        <CForm.Field name={fieldName} {...fieldConfig} />
      )}
    </>
  );
};
