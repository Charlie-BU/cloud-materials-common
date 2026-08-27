"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var CPopoverVerify_1 = tslib_1.__importDefault(require("../CPopoverVerify"));
var CConfigProvider_1 = require("../CConfigProvider");
var builtInComponent_1 = require("../_factory/builtInComponent");
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
    var rules = _a.rules, width = _a.width, disabled = _a.disabled, popoverVerify = _a.popoverVerify, cAsyncSelectProps = _a.cAsyncSelectProps, listEditorCls = _a.listEditorCls, locale = _a.locale, arcoInputProps = _a.arcoInputProps, arcoInputTagProps = _a.arcoInputTagProps, rest = tslib_1.__rest(_a, ["rules", "width", "disabled", "popoverVerify", "cAsyncSelectProps", "listEditorCls", "locale", "arcoInputProps", "arcoInputTagProps"]);
    return ({
        'input-rules': (react_1.default.createElement(CPopoverVerify_1.default, tslib_1.__assign({ rules: rules }, rest, { arcoPopoverProps: { position: 'bottom' } }, (typeof popoverVerify === 'object' ? popoverVerify : {})),
            react_1.default.createElement(web_react_1.Input, tslib_1.__assign({ placeholder: locale.CListEditor.placeholder, style: { width: width }, disabled: disabled }, arcoInputProps)))),
        input: (react_1.default.createElement(web_react_1.Input, tslib_1.__assign({ placeholder: locale.CListEditor.placeholder, style: { width: width } }, rest, { disabled: disabled }, arcoInputProps))),
        'input-multiple-rules': (react_1.default.createElement(CPopoverVerify_1.default, tslib_1.__assign({ rules: rules }, rest, (typeof popoverVerify === 'object' ? popoverVerify : {})),
            react_1.default.createElement(web_react_1.InputTag, tslib_1.__assign({ style: { width: width }, placeholder: locale.CListEditor.placeholder, className: "".concat(listEditorCls, "-component-inputTag"), disabled: disabled }, arcoInputTagProps)))),
        'input-multiple': (react_1.default.createElement(web_react_1.InputTag, tslib_1.__assign({ style: { width: width }, disabled: disabled, placeholder: locale.CListEditor.placeholder, className: "".concat(listEditorCls, "-component-inputTag") }, arcoInputTagProps, rest))),
        'select-rules': (react_1.default.createElement(CPopoverVerify_1.default, tslib_1.__assign({}, rest, { rules: rules }, (typeof popoverVerify === 'object' ? popoverVerify : {}), { arcoPopoverProps: { disabled: true } }),
            react_1.default.createElement(web_react_1.Select, tslib_1.__assign({ placeholder: locale.CListEditor.selectPlaceholder, style: { width: width, minWidth: 83 }, disabled: disabled }, cAsyncSelectProps)))),
        select: (react_1.default.createElement(web_react_1.Select, tslib_1.__assign({ placeholder: locale.CListEditor.selectPlaceholder, style: { width: width } }, rest, { disabled: disabled }, cAsyncSelectProps))),
    });
};
var ComponentWrapper = function (props) {
    var component = props.component, index = props.index, label = props.label, disabled = props.disabled, changeListValue = props.changeListValue, handleEditingDisableVerify = props.handleEditingDisableVerify, _a = props.triggerPropName, triggerPropName = _a === void 0 ? 'value' : _a, multiple = props.multiple, _b = props.rules, rules = _b === void 0 ? [] : _b, popoverVerify = props.popoverVerify, itemOptions = props.itemOptions, rest = tslib_1.__rest(props, ["component", "index", "label", "disabled", "changeListValue", "handleEditingDisableVerify", "triggerPropName", "multiple", "rules", "popoverVerify", "itemOptions"]);
    var _c = (0, CConfigProvider_1.useCConfigContext)(), locale = _c.locale, getCPrefixCls = _c.getCPrefixCls;
    var listEditorCls = getCPrefixCls('list-editor');
    var renderBuiltIn = (0, builtInComponent_1.useBuiltIn)().renderBuiltIn;
    (0, react_1.useEffect)(function () {
        changeListValue("[".concat(index, "].").concat(label), rest[triggerPropName]);
        handleEditingDisableVerify();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rest[triggerPropName]]);
    var com = renderComponent(tslib_1.__assign(tslib_1.__assign({ rules: rules, popoverVerify: popoverVerify, disabled: disabled, locale: locale, listEditorCls: listEditorCls }, rest), itemOptions))["".concat(component).concat(multiple ? '-multiple' : '').concat((rules === null || rules === void 0 ? void 0 : rules.length) && Boolean(popoverVerify) ? '-rules' : '')];
    if (com) {
        return com;
    }
    if (react_1.default.isValidElement(component)) {
        if ((rules === null || rules === void 0 ? void 0 : rules.length) && Boolean(popoverVerify)) {
            return (react_1.default.createElement(CPopoverVerify_1.default, tslib_1.__assign({ rules: rules }, rest, itemOptions, (typeof popoverVerify === 'object' ? popoverVerify : {})), react_1.default.cloneElement(component, { disabled: disabled, autoFocus: true })));
        }
        return react_1.default.cloneElement(component, tslib_1.__assign({ disabled: disabled }, rest));
    }
    if ((rules === null || rules === void 0 ? void 0 : rules.length) && Boolean(popoverVerify)) {
        return (react_1.default.createElement(CPopoverVerify_1.default, tslib_1.__assign({ rules: rules }, rest, itemOptions, (typeof popoverVerify === 'object' ? popoverVerify : {})), renderBuiltIn(component, {
            commonProps: tslib_1.__assign(tslib_1.__assign({ disabled: disabled }, rest), itemOptions),
        })));
    }
    return (react_1.default.createElement(react_1.default.Fragment, null, renderBuiltIn(component, {
        commonProps: tslib_1.__assign(tslib_1.__assign({ disabled: disabled }, rest), itemOptions),
    })));
};
exports.default = ComponentWrapper;
//# sourceMappingURL=ComponentWrapper.js.map