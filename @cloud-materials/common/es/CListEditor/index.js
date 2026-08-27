import { __assign, __read } from "tslib";
import React from 'react';
import classNames from 'classnames';
import { useCListEditor } from './hooks';
import { Form } from '@arco-design/web-react';
import CAddButton from '../CAddButton';
import { formatInitValue, getAddDefaultValue } from './util';
import RowItem from './RowItem';
import { useCConfigContext } from '../CConfigProvider';
import { testId, builtInMap } from './constant';
import createBuiltInComponent from '../_factory/builtInComponent';
var CListEditorComponent = function (props) {
    var style = props.style, className = props.className, fieldName = props.fieldName, _a = props.maxHeight, maxHeight = _a === void 0 ? 402 : _a, initValue = props.initValue, items = props.items, addBtnText = props.addBtnText;
    var _b = __read(useCListEditor(props), 2), _c = _b[0], itemsControl = _c.itemsControl, listValue = _c.listValue, addProps = _c.addProps, _d = _b[1], addItem = _d.addItem, removeItem = _d.removeItem, handleEditingDisableVerify = _d.handleEditingDisableVerify, changeListValue = _d.changeListValue, resetListValue = _d.resetListValue, repeatValidator = _d.repeatValidator, requireValidator = _d.requireValidator, changeRuleValidator = _d.changeRuleValidator;
    var disableAdd = addProps.disableAdd, disableAddTip = addProps.disableAddTip, addBtnSuffix = addProps.addBtnSuffix;
    var _e = useCConfigContext(), locale = _e.locale, getCPrefixCls = _e.getCPrefixCls;
    var listEditorCls = getCPrefixCls('list-editor');
    return (React.createElement("div", { style: style, className: classNames("".concat(listEditorCls), className) },
        React.createElement(Form.List, __assign({ field: fieldName }, (initValue ? { initialValue: formatInitValue(initValue) } : {})), function (fields, _a) {
            var add = _a.add, remove = _a.remove;
            if (fields.length !== listValue.length) {
                // form操作clear or setValue，导致值不匹配，需要重新计算listValue，及内部的控制状态
                resetListValue(fields.length);
            }
            return (React.createElement("div", { className: "".concat(listEditorCls, "-content"), "data-cy": testId.root },
                React.createElement("div", { className: "".concat(listEditorCls, "-list"), style: { maxHeight: maxHeight - 32 } }, fields.map(function (it, index) { return (React.createElement(RowItem, { key: it.key, field: it.field, items: items, index: index, controlProps: itemsControl[index], remove: function (idx) {
                        remove(idx);
                        removeItem(idx);
                    }, handleEditingDisableVerify: handleEditingDisableVerify, listValue: listValue, changeListValue: changeListValue, repeatValidator: repeatValidator, requireValidator: requireValidator, changeRuleValidator: changeRuleValidator })); })),
                React.createElement("div", { className: "".concat(listEditorCls, "-add-btn") },
                    React.createElement(CAddButton, { htmlType: "button", arcoPopoverProps: { content: disableAddTip, disabled: !disableAdd }, style: { marginRight: 8 }, disabled: disableAdd, onClick: function () {
                            add(getAddDefaultValue(items));
                            addItem();
                        }, type: "primary", text: addBtnText !== null && addBtnText !== void 0 ? addBtnText : locale.CListEditor.addBtnText }),
                    React.createElement("span", { className: "".concat(listEditorCls, "-add-btn-text") }, addBtnSuffix))));
        })));
};
CListEditorComponent.displayName = 'CListEditor';
var CListEditor = createBuiltInComponent(CListEditorComponent, builtInMap);
export default CListEditor;
//# sourceMappingURL=index.js.map