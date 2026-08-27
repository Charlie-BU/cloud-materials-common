import { __assign, __rest } from "tslib";
import React, { useEffect } from 'react';
import { Input, InputTag, Select } from '@arco-design/web-react';
import CPopoverVerify from '../CPopoverVerify';
import { useCConfigContext } from '../CConfigProvider';
import { useBuiltIn } from '../_factory/builtInComponent';
var ComponentEnum;
(function (ComponentEnum) {
    ComponentEnum["input-rules"] = "input-rules";
    ComponentEnum["input"] = "input";
    ComponentEnum["input-multiple-rules"] = "input-multiple-rules";
    ComponentEnum["input-multiple"] = "input-multiple";
    ComponentEnum["select-rules"] = "select-rules";
    ComponentEnum["select"] = "select";
})(ComponentEnum || (ComponentEnum = {}));
var renderComponent = function (_a) {
    var rules = _a.rules, width = _a.width, disabled = _a.disabled, popoverVerify = _a.popoverVerify, cAsyncSelectProps = _a.cAsyncSelectProps, listEditorCls = _a.listEditorCls, locale = _a.locale, arcoInputProps = _a.arcoInputProps, arcoInputTagProps = _a.arcoInputTagProps, rest = __rest(_a, ["rules", "width", "disabled", "popoverVerify", "cAsyncSelectProps", "listEditorCls", "locale", "arcoInputProps", "arcoInputTagProps"]);
    return ({
        'input-rules': (React.createElement(CPopoverVerify, __assign({ rules: rules }, rest, { arcoPopoverProps: { position: 'bottom' } }, (typeof popoverVerify === 'object' ? popoverVerify : {})),
            React.createElement(Input, __assign({ placeholder: locale.CListEditor.placeholder, style: { width: width }, disabled: disabled }, arcoInputProps)))),
        input: (React.createElement(Input, __assign({ placeholder: locale.CListEditor.placeholder, style: { width: width } }, rest, { disabled: disabled }, arcoInputProps))),
        'input-multiple-rules': (React.createElement(CPopoverVerify, __assign({ rules: rules }, rest, (typeof popoverVerify === 'object' ? popoverVerify : {})),
            React.createElement(InputTag, __assign({ style: { width: width }, placeholder: locale.CListEditor.placeholder, className: "".concat(listEditorCls, "-component-inputTag"), disabled: disabled }, arcoInputTagProps)))),
        'input-multiple': (React.createElement(InputTag, __assign({ style: { width: width }, disabled: disabled, placeholder: locale.CListEditor.placeholder, className: "".concat(listEditorCls, "-component-inputTag") }, arcoInputTagProps, rest))),
        'select-rules': (React.createElement(CPopoverVerify, __assign({}, rest, { rules: rules }, (typeof popoverVerify === 'object' ? popoverVerify : {}), { arcoPopoverProps: { disabled: true } }),
            React.createElement(Select, __assign({ placeholder: locale.CListEditor.selectPlaceholder, style: { width: width, minWidth: 83 }, disabled: disabled }, cAsyncSelectProps)))),
        select: (React.createElement(Select, __assign({ placeholder: locale.CListEditor.selectPlaceholder, style: { width: width } }, rest, { disabled: disabled }, cAsyncSelectProps))),
    });
};
var ComponentWrapper = function (props) {
    var component = props.component, index = props.index, label = props.label, disabled = props.disabled, changeListValue = props.changeListValue, handleEditingDisableVerify = props.handleEditingDisableVerify, _a = props.triggerPropName, triggerPropName = _a === void 0 ? 'value' : _a, multiple = props.multiple, _b = props.rules, rules = _b === void 0 ? [] : _b, popoverVerify = props.popoverVerify, itemOptions = props.itemOptions, rest = __rest(props, ["component", "index", "label", "disabled", "changeListValue", "handleEditingDisableVerify", "triggerPropName", "multiple", "rules", "popoverVerify", "itemOptions"]);
    var _c = useCConfigContext(), locale = _c.locale, getCPrefixCls = _c.getCPrefixCls;
    var listEditorCls = getCPrefixCls('list-editor');
    var renderBuiltIn = useBuiltIn().renderBuiltIn;
    useEffect(function () {
        changeListValue("[".concat(index, "].").concat(label), rest[triggerPropName]);
        handleEditingDisableVerify();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rest[triggerPropName]]);
    var com = renderComponent(__assign(__assign({ rules: rules, popoverVerify: popoverVerify, disabled: disabled, locale: locale, listEditorCls: listEditorCls }, rest), itemOptions))["".concat(component).concat(multiple ? '-multiple' : '').concat((rules === null || rules === void 0 ? void 0 : rules.length) && Boolean(popoverVerify) ? '-rules' : '')];
    if (com) {
        return com;
    }
    if (React.isValidElement(component)) {
        if ((rules === null || rules === void 0 ? void 0 : rules.length) && Boolean(popoverVerify)) {
            return (React.createElement(CPopoverVerify, __assign({ rules: rules }, rest, itemOptions, (typeof popoverVerify === 'object' ? popoverVerify : {})), React.cloneElement(component, { disabled: disabled, autoFocus: true })));
        }
        return React.cloneElement(component, __assign({ disabled: disabled }, rest));
    }
    if ((rules === null || rules === void 0 ? void 0 : rules.length) && Boolean(popoverVerify)) {
        return (React.createElement(CPopoverVerify, __assign({ rules: rules }, rest, itemOptions, (typeof popoverVerify === 'object' ? popoverVerify : {})), renderBuiltIn(component, {
            commonProps: __assign(__assign({ disabled: disabled }, rest), itemOptions),
        })));
    }
    return (React.createElement(React.Fragment, null, renderBuiltIn(component, {
        commonProps: __assign(__assign({ disabled: disabled }, rest), itemOptions),
    })));
};
export default ComponentWrapper;
//# sourceMappingURL=ComponentWrapper.js.map