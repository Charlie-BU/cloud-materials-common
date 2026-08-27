"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRowButton = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var BaseButton_1 = require("../BaseButton");
var icon_1 = require("@arco-design/web-react/icon");
var CConfigProvider_1 = require("../../../../../CConfigProvider");
var testId_1 = require("../../../../testId");
var AddRowButton = function (props) {
    var addRow = props.addRow, onAdd = props.onAdd, _a = props.icon, icon = _a === void 0 ? react_1.default.createElement(icon_1.IconPlusCircle, null) : _a, _text = props.text, _b = props.position, position = _b === void 0 ? 'bottom' : _b, restProps = tslib_1.__rest(props, ["addRow", "onAdd", "icon", "text", "position"]);
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var text = _text || locale.CTableEditor.addRow;
    var handleClick = function (tableEditor) {
        var data = addRow(tableEditor);
        var rowData = tableEditor.addRow(data, { position: position });
        onAdd === null || onAdd === void 0 ? void 0 : onAdd(rowData, tableEditor);
    };
    return react_1.default.createElement(BaseButton_1.BaseButton, tslib_1.__assign({ icon: icon, text: text }, restProps, { onClick: handleClick, testId: testId_1.testId.addRowButton }));
};
exports.AddRowButton = AddRowButton;
//# sourceMappingURL=index.js.map