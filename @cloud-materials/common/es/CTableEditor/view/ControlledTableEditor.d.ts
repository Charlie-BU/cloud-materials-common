import React from 'react';
import type { TableEditor as TableEditorModel } from '../model/TableEditor';
declare const ControlledTableEditor: React.ForwardRefExoticComponent<Omit<import("../../CTable").TableProps<any, any>, "table" | "config"> & {
    config: import("../types").ControlledTableEditorConfig<any, any>;
    value?: any[] | undefined;
    onChange?: ((value: any[]) => void) | undefined;
} & React.RefAttributes<TableEditorModel<any, any>>>;
export default ControlledTableEditor;
