"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var icon_1 = require("@arco-design/web-react/icon");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var react_1 = tslib_1.__importDefault(require("react"));
var ComponentWrapper_1 = tslib_1.__importDefault(require("./ComponentWrapper"));
var constant_1 = require("./constant");
var util_1 = require("./util");
var CConfigProvider_1 = require("../CConfigProvider");
var lodash_es_1 = require("lodash-es");
var RowItem = function (props) {
    var field = props.field, items = props.items, _a = props.controlProps, controlProps = _a === void 0 ? {
        disableChange: (0, util_1.getInitDisableChange)(items.map(function (i) { return i.label; })),
        disableDelete: false,
        disableDeleteTip: '',
        rowDisabled: false,
        rowDisabledTip: '',
    } : _a, index = props.index, repeatValidator = props.repeatValidator, requireValidator = props.requireValidator, remove = props.remove, changeListValue = props.changeListValue, handleEditingDisableVerify = props.handleEditingDisableVerify, changeRuleValidator = props.changeRuleValidator;
    var getCPrefixCls = (0, CConfigProvider_1.useCConfigContext)().getCPrefixCls;
    var listEditorCls = getCPrefixCls('list-editor');
    var disableChange = controlProps.disableChange, disableDelete = controlProps.disableDelete, disableDeleteTip = controlProps.disableDeleteTip, rowDisabled = controlProps.rowDisabled, rowDisabledTip = controlProps.rowDisabledTip;
    return (react_1.default.createElement("div", { className: "".concat(listEditorCls, "-list-item"), "data-testid": constant_1.testId.rowItem },
        react_1.default.createElement(web_react_1.Popover, { content: rowDisabledTip, position: "right", disabled: !rowDisabled || !rowDisabledTip },
            react_1.default.createElement("div", { style: { display: 'flex', gap: '8px' } },
                items.map(function (tagItem) {
                    var popoverContent = tagItem.popoverContent, arcoPopoverProps = tagItem.arcoPopoverProps, _a = tagItem.popoverVerify, popoverVerify = _a === void 0 ? true : _a;
                    var _b = disableChange[tagItem.label], _c = _b.disabled, disabled = _c === void 0 ? false : _c, tip = _b.tip, disableRules = _b.disableRules, itemOptions = tslib_1.__rest(_b, ["disabled", "tip", "disableRules"]);
                    var content = tip || popoverContent;
                    return (react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({ content: content, disabled: (0, util_1.disabledItemPopover)(!!popoverVerify, rowDisabled, content), key: tagItem.label }, arcoPopoverProps),
                        react_1.default.createElement(web_react_1.Form.Item, tslib_1.__assign({ field: "".concat(field, ".").concat(tagItem.label), style: tslib_1.__assign({ marginBottom: 0, width: tagItem.width }, ((itemOptions === null || itemOptions === void 0 ? void 0 : itemOptions.style) || {})), triggerPropName: tagItem.triggerPropName, className: "".concat(listEditorCls, "-item"), wrapperCol: { span: 24 }, rules: tslib_1.__spreadArray([
                                {
                                    validator: repeatValidator(tagItem.label, index),
                                },
                                requireValidator(tagItem.label)
                            ], tslib_1.__read((disableRules || rowDisabled ? [] : changeRuleValidator(index, tagItem.rules) || [])), false) }, (0, lodash_es_1.omit)(itemOptions, 'style')),
                            react_1.default.createElement(ComponentWrapper_1.default, tslib_1.__assign({ itemOptions: itemOptions }, tagItem, { rules: disableRules ? undefined : changeRuleValidator(index, tagItem.rules), index: index, disabled: disabled, handleEditingDisableVerify: handleEditingDisableVerify, changeListValue: changeListValue })))));
                }),
                react_1.default.createElement(web_react_1.Popover, { content: disableDeleteTip, disabled: !disableDelete || rowDisabled || !disableDeleteTip },
                    react_1.default.createElement("div", { className: "".concat(listEditorCls, "-delete-btn"), onClick: function () {
                            if (!disableDelete) {
                                remove(index);
                                handleEditingDisableVerify();
                            }
                        }, "data-testid": constant_1.testId.deleteButton },
                        react_1.default.createElement(icon_1.IconDelete, { className: (0, classnames_1.default)('c-m-icon', { disabled: disableDelete }) })))))));
};
exports.default = RowItem;
//# sourceMappingURL=RowItem.js.map