import React from 'react';
import type { TableEditor } from '../../../model/TableEditor';
export declare const TableEditorContext: React.Context<TableEditor<any, any>>;
export type TableEditorProviderProps = {
    tableEditor: TableEditor;
};
export declare const TableEditorProvider: React.FC<TableEditorProviderProps>;
