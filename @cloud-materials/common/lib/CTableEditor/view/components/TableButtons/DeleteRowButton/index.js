"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRowButton = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var BaseButton_1 = require("../BaseButton");
var icon_1 = require("@arco-design/web-react/icon");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../../../../../CConfigProvider");
var usePrefix_1 = require("../../../hooks/usePrefix");
var testId_1 = require("../../../../testId");
var DeleteRowButton = function (props) {
    var onDelete = props.onDelete, _a = props.icon, icon = _a === void 0 ? react_1.default.createElement(icon_1.IconCloseCircle, null) : _a, _text = props.text, className = props.className, restProps = tslib_1.__rest(props, ["onDelete", "icon", "text", "className"]);
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var prefixCls = (0, usePrefix_1.usePrefix)('delete-row-button');
    var text = _text || locale.CTableEditor.deleteRow;
    var handleClick = function (tableEditor) {
        var rowData = tableEditor.deleteRows();
        onDelete === null || onDelete === void 0 ? void 0 : onDelete(rowData, tableEditor);
    };
    return (react_1.default.createElement(BaseButton_1.BaseButton, tslib_1.__assign({ icon: icon, text: text, disabled: function (tableEditor) { return !tableEditor.table.selectedRowKeys.length; }, className: (0, classnames_1.default)(prefixCls, className) }, restProps, { onClick: handleClick, testId: testId_1.testId.deleteRowButton })));
};
exports.DeleteRowButton = DeleteRowButton;
//# sourceMappingURL=index.js.map