import type { RefAttributes } from 'react';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import ControlledTableEditor from './ControlledTableEditor';
import UncontrolledTableEditor from './UncontrolledTableEditor';
import type { TableEditor as TableEditorModel } from '../model/TableEditor';
import type { TableEditorProps } from '../types';
import { defineConfig, defineColumn, defineColumns } from '../utils';
import { helper } from '../helper';
import { AddRowButton, DeleteRowButton, SubmitButton, SwitchButton, UndoButton, EditableCell } from './components';

type TableEditorComponent = React.ForwardRefExoticComponent<TableEditorProps & RefAttributes<TableEditorModel>> & {
  defineConfig: typeof defineConfig;
  defineColumn: typeof defineColumn;
  defineColumns: typeof defineColumns;
  helper: typeof helper;
  AddRow: typeof AddRowButton;
  DeleteRow: typeof DeleteRowButton;
  Submit: typeof SubmitButton;
  Switch: typeof SwitchButton;
  Undo: typeof UndoButton;
  EditableCell: typeof EditableCell;
};

const _TableEditor = forwardRef<TableEditorModel | null, TableEditorProps>((props, ref) => {
  const tableEditorRef = useRef<TableEditorModel>(null);

  useImperativeHandle(ref, () => tableEditorRef.current!);

  if (props.config.controlled) {
    return <ControlledTableEditor {...props} config={{ ...props.config }} ref={tableEditorRef} />;
  }
  return <UncontrolledTableEditor {...props} ref={tableEditorRef} />;
});

const TableEditor = _TableEditor as TableEditorComponent;

TableEditor.displayName = 'TableEditor';

TableEditor.defineConfig = defineConfig;
TableEditor.defineColumn = defineColumn;
TableEditor.defineColumns = defineColumns;

TableEditor.helper = helper;

TableEditor.AddRow = AddRowButton;
TableEditor.DeleteRow = DeleteRowButton;
TableEditor.Submit = SubmitButton;
TableEditor.Switch = SwitchButton;
TableEditor.Undo = UndoButton;

TableEditor.EditableCell = EditableCell;

export default TableEditor;
