import { __assign } from "tslib";
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import ControlledTableEditor from './ControlledTableEditor';
import UncontrolledTableEditor from './UncontrolledTableEditor';
import { defineConfig, defineColumn, defineColumns } from '../utils';
import { helper } from '../helper';
import { AddRowButton, DeleteRowButton, SubmitButton, SwitchButton, UndoButton, EditableCell } from './components';
var _TableEditor = forwardRef(function (props, ref) {
    var tableEditorRef = useRef(null);
    useImperativeHandle(ref, function () { return tableEditorRef.current; });
    if (props.config.controlled) {
        return React.createElement(ControlledTableEditor, __assign({}, props, { config: __assign({}, props.config), ref: tableEditorRef }));
    }
    return React.createElement(UncontrolledTableEditor, __assign({}, props, { ref: tableEditorRef }));
});
var TableEditor = _TableEditor;
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
//# sourceMappingURL=TableEditor.js.map