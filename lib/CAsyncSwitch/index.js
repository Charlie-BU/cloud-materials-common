"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAsyncSwitch = exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var hooks_1 = require("../hooks");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var prefix = (0, classNamePrefixFactory_1.default)('async-switch');
exports.testId = {
    popconfirm: prefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["popconfirm"], ["popconfirm"]))),
    switch: prefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["switch"], ["switch"]))),
};
exports.CAsyncSwitch = (0, react_1.forwardRef)(function (props, ref) {
    var checked = props.checked, defaultChecked = props.defaultChecked, onChange = props.onChange, openConfirmTips = props.openConfirmTips, closeConfirmTips = props.closeConfirmTips, disabled = props.disabled, arcoPopconfirmProps = props.arcoPopconfirmProps, otherProps = tslib_1.__rest(props, ["checked", "defaultChecked", "onChange", "openConfirmTips", "closeConfirmTips", "disabled", "arcoPopconfirmProps"]);
    var _a = tslib_1.__read((0, hooks_1.useControlledValue)(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, props), { defaultValue: defaultChecked }), ('checked' in props && { value: checked }))), 2), value = _a[0], setValue = _a[1];
    var _b = (0, hooks_1.useAsyncSubmit)({
        onSubmit: onChange,
        setValue: setValue,
        isControlledMode: !('checked' in props || 'value' in props),
    }), loading = _b.loading, handleSubmit = _b.handleSubmit;
    var withPopConfirm = value ? Boolean(closeConfirmTips) : Boolean(openConfirmTips);
    return (react_1.default.createElement(web_react_1.Popconfirm, tslib_1.__assign({ disabled: disabled || !withPopConfirm, title: value ? closeConfirmTips : openConfirmTips }, arcoPopconfirmProps, { onOk: function () {
            withPopConfirm && handleSubmit(!value);
        }, "data-cy": exports.testId.popconfirm }),
        react_1.default.createElement(web_react_1.Switch, tslib_1.__assign({ loading: loading }, otherProps, { ref: ref, checked: value, disabled: disabled, onChange: function (v) {
                !withPopConfirm && handleSubmit(v);
            }, "data-cy": exports.testId.switch }))));
});
//与arco switch保持同样处理，增加__BYTE_SWITCH标识需要处理进入如下处理：当 children 中的元素 disabled 时，不能正确触发 hover 等事件，所以当监测到对应组件有 disabled 时，给元素加一层 span，处理事件，模拟样式
var CAsyncSwitchComponent = exports.CAsyncSwitch;
CAsyncSwitchComponent.__BYTE_SWITCH = true;
CAsyncSwitchComponent.displayName = 'CAsyncSwitch';
exports.default = CAsyncSwitchComponent;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map