import { __assign, __read, __rest, __spreadArray } from "tslib";
import { Form, Popover } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import React from 'react';
import ComponentWrapper from './ComponentWrapper';
import { testId } from './constant';
import { disabledItemPopover, getInitDisableChange } from './util';
import { useCConfigContext } from '../CConfigProvider';
import { omit } from 'lodash-es';
var RowItem = function (props) {
    var field = props.field, items = props.items, _a = props.controlProps, controlProps = _a === void 0 ? {
        disableChange: getInitDisableChange(items.map(function (i) { return i.label; })),
        disableDelete: false,
        disableDeleteTip: '',
        rowDisabled: false,
        rowDisabledTip: '',
    } : _a, index = props.index, repeatValidator = props.repeatValidator, requireValidator = props.requireValidator, remove = props.remove, changeListValue = props.changeListValue, handleEditingDisableVerify = props.handleEditingDisableVerify, changeRuleValidator = props.changeRuleValidator;
    var getCPrefixCls = useCConfigContext().getCPrefixCls;
    var listEditorCls = getCPrefixCls('list-editor');
    var disableChange = controlProps.disableChange, disableDelete = controlProps.disableDelete, disableDeleteTip = controlProps.disableDeleteTip, rowDisabled = controlProps.rowDisabled, rowDisabledTip = controlProps.rowDisabledTip;
    return (React.createElement("div", { className: "".concat(listEditorCls, "-list-item"), "data-testid": testId.rowItem },
        React.createElement(Popover, { content: rowDisabledTip, position: "right", disabled: !rowDisabled || !rowDisabledTip },
            React.createElement("div", { style: { display: 'flex', gap: '8px' } },
                items.map(function (tagItem) {
                    var popoverContent = tagItem.popoverContent, arcoPopoverProps = tagItem.arcoPopoverProps, _a = tagItem.popoverVerify, popoverVerify = _a === void 0 ? true : _a;
                    var _b = disableChange[tagItem.label], _c = _b.disabled, disabled = _c === void 0 ? false : _c, tip = _b.tip, disableRules = _b.disableRules, itemOptions = __rest(_b, ["disabled", "tip", "disableRules"]);
                    var content = tip || popoverContent;
                    return (React.createElement(Popover, __assign({ content: content, disabled: disabledItemPopover(!!popoverVerify, rowDisabled, content), key: tagItem.label }, arcoPopoverProps),
                        React.createElement(Form.Item, __assign({ field: "".concat(field, ".").concat(tagItem.label), style: __assign({ marginBottom: 0, width: tagItem.width }, ((itemOptions === null || itemOptions === void 0 ? void 0 : itemOptions.style) || {})), triggerPropName: tagItem.triggerPropName, className: "".concat(listEditorCls, "-item"), wrapperCol: { span: 24 }, rules: __spreadArray([
                                {
                                    validator: repeatValidator(tagItem.label, index),
                                },
                                requireValidator(tagItem.label)
                            ], __read((disableRules || rowDisabled ? [] : changeRuleValidator(index, tagItem.rules) || [])), false) }, omit(itemOptions, 'style')),
                            React.createElement(ComponentWrapper, __assign({ itemOptions: itemOptions }, tagItem, { rules: disableRules ? undefined : changeRuleValidator(index, tagItem.rules), index: index, disabled: disabled, handleEditingDisableVerify: handleEditingDisableVerify, changeListValue: changeListValue })))));
                }),
                React.createElement(Popover, { content: disableDeleteTip, disabled: !disableDelete || rowDisabled || !disableDeleteTip },
                    React.createElement("div", { className: "".concat(listEditorCls, "-delete-btn"), onClick: function () {
                            if (!disableDelete) {
                                remove(index);
                                handleEditingDisableVerify();
                            }
                        }, "data-testid": testId.deleteButton },
                        React.createElement(IconDelete, { className: classNames('c-m-icon', { disabled: disableDelete }) })))))));
};
export default RowItem;
//# sourceMappingURL=RowItem.js.map