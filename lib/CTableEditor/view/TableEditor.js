"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var ControlledTableEditor_1 = tslib_1.__importDefault(require("./ControlledTableEditor"));
var UncontrolledTableEditor_1 = tslib_1.__importDefault(require("./UncontrolledTableEditor"));
var utils_1 = require("../utils");
var helper_1 = require("../helper");
var components_1 = require("./components");
var _TableEditor = (0, react_1.forwardRef)(function (props, ref) {
    var tableEditorRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, function () { return tableEditorRef.current; });
    if (props.config.controlled) {
        return react_1.default.createElement(ControlledTableEditor_1.default, tslib_1.__assign({}, props, { config: tslib_1.__assign({}, props.config), ref: tableEditorRef }));
    }
    return react_1.default.createElement(UncontrolledTableEditor_1.default, tslib_1.__assign({}, props, { ref: tableEditorRef }));
});
var TableEditor = _TableEditor;
TableEditor.displayName = 'TableEditor';
TableEditor.defineConfig = utils_1.defineConfig;
TableEditor.defineColumn = utils_1.defineColumn;
TableEditor.defineColumns = utils_1.defineColumns;
TableEditor.helper = helper_1.helper;
TableEditor.AddRow = components_1.AddRowButton;
TableEditor.DeleteRow = components_1.DeleteRowButton;
TableEditor.Submit = components_1.SubmitButton;
TableEditor.Switch = components_1.SwitchButton;
TableEditor.Undo = components_1.UndoButton;
TableEditor.EditableCell = components_1.EditableCell;
exports.default = TableEditor;
//# sourceMappingURL=TableEditor.js.map