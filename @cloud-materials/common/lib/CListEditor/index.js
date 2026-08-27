"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var hooks_1 = require("./hooks");
var web_react_1 = require("@arco-design/web-react");
var CAddButton_1 = tslib_1.__importDefault(require("../CAddButton"));
var util_1 = require("./util");
var RowItem_1 = tslib_1.__importDefault(require("./RowItem"));
var CConfigProvider_1 = require("../CConfigProvider");
var constant_1 = require("./constant");
var builtInComponent_1 = tslib_1.__importDefault(require("../_factory/builtInComponent"));
var CListEditorComponent = function (props) {
    var style = props.style, className = props.className, fieldName = props.fieldName, _a = props.maxHeight, maxHeight = _a === void 0 ? 402 : _a, initValue = props.initValue, items = props.items, addBtnText = props.addBtnText;
    var _b = tslib_1.__read((0, hooks_1.useCListEditor)(props), 2), _c = _b[0], itemsControl = _c.itemsControl, listValue = _c.listValue, addProps = _c.addProps, _d = _b[1], addItem = _d.addItem, removeItem = _d.removeItem, handleEditingDisableVerify = _d.handleEditingDisableVerify, changeListValue = _d.changeListValue, resetListValue = _d.resetListValue, repeatValidator = _d.repeatValidator, requireValidator = _d.requireValidator, changeRuleValidator = _d.changeRuleValidator;
    var disableAdd = addProps.disableAdd, disableAddTip = addProps.disableAddTip, addBtnSuffix = addProps.addBtnSuffix;
    var _e = (0, CConfigProvider_1.useCConfigContext)(), locale = _e.locale, getCPrefixCls = _e.getCPrefixCls;
    var listEditorCls = getCPrefixCls('list-editor');
    return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)("".concat(listEditorCls), className) },
        react_1.default.createElement(web_react_1.Form.List, tslib_1.__assign({ field: fieldName }, (initValue ? { initialValue: (0, util_1.formatInitValue)(initValue) } : {})), function (fields, _a) {
            var add = _a.add, remove = _a.remove;
            if (fields.length !== listValue.length) {
                // form操作clear or setValue，导致值不匹配，需要重新计算listValue，及内部的控制状态
                resetListValue(fields.length);
            }
            return (react_1.default.createElement("div", { className: "".concat(listEditorCls, "-content"), "data-cy": constant_1.testId.root },
                react_1.default.createElement("div", { className: "".concat(listEditorCls, "-list"), style: { maxHeight: maxHeight - 32 } }, fields.map(function (it, index) { return (react_1.default.createElement(RowItem_1.default, { key: it.key, field: it.field, items: items, index: index, controlProps: itemsControl[index], remove: function (idx) {
                        remove(idx);
                        removeItem(idx);
                    }, handleEditingDisableVerify: handleEditingDisableVerify, listValue: listValue, changeListValue: changeListValue, repeatValidator: repeatValidator, requireValidator: requireValidator, changeRuleValidator: changeRuleValidator })); })),
                react_1.default.createElement("div", { className: "".concat(listEditorCls, "-add-btn") },
                    react_1.default.createElement(CAddButton_1.default, { htmlType: "button", arcoPopoverProps: { content: disableAddTip, disabled: !disableAdd }, style: { marginRight: 8 }, disabled: disableAdd, onClick: function () {
                            add((0, util_1.getAddDefaultValue)(items));
                            addItem();
                        }, type: "primary", text: addBtnText !== null && addBtnText !== void 0 ? addBtnText : locale.CListEditor.addBtnText }),
                    react_1.default.createElement("span", { className: "".concat(listEditorCls, "-add-btn-text") }, addBtnSuffix))));
        })));
};
CListEditorComponent.displayName = 'CListEditor';
var CListEditor = (0, builtInComponent_1.default)(CListEditorComponent, constant_1.builtInMap);
exports.default = CListEditor;
//# sourceMappingURL=index.js.map