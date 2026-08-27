import React, { createContext } from 'react';
import type { TableEditor } from '../../../model/TableEditor';

export const TableEditorContext = createContext<TableEditor>(null as unknown as TableEditor);

export type TableEditorProviderProps = {
  tableEditor: TableEditor;
};

export const TableEditorProvider: React.FC<TableEditorProviderProps> = props => {
  return <TableEditorContext.Provider value={props.tableEditor}>{props.children}</TableEditorContext.Provider>;
};
