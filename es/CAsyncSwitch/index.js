import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React, { forwardRef } from 'react';
import { Switch, Popconfirm } from '@arco-design/web-react';
import { useAsyncSubmit, useControlledValue } from '../hooks';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
var prefix = classNamePrefixFactory('async-switch');
export var testId = {
    popconfirm: prefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["popconfirm"], ["popconfirm"]))),
    switch: prefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["switch"], ["switch"]))),
};
export var CAsyncSwitch = forwardRef(function (props, ref) {
    var checked = props.checked, defaultChecked = props.defaultChecked, onChange = props.onChange, openConfirmTips = props.openConfirmTips, closeConfirmTips = props.closeConfirmTips, disabled = props.disabled, arcoPopconfirmProps = props.arcoPopconfirmProps, otherProps = __rest(props, ["checked", "defaultChecked", "onChange", "openConfirmTips", "closeConfirmTips", "disabled", "arcoPopconfirmProps"]);
    var _a = __read(useControlledValue(__assign(__assign(__assign({}, props), { defaultValue: defaultChecked }), ('checked' in props && { value: checked }))), 2), value = _a[0], setValue = _a[1];
    var _b = useAsyncSubmit({
        onSubmit: onChange,
        setValue: setValue,
        isControlledMode: !('checked' in props || 'value' in props),
    }), loading = _b.loading, handleSubmit = _b.handleSubmit;
    var withPopConfirm = value ? Boolean(closeConfirmTips) : Boolean(openConfirmTips);
    return (React.createElement(Popconfirm, __assign({ disabled: disabled || !withPopConfirm, title: value ? closeConfirmTips : openConfirmTips }, arcoPopconfirmProps, { onOk: function () {
            withPopConfirm && handleSubmit(!value);
        }, "data-cy": testId.popconfirm }),
        React.createElement(Switch, __assign({ loading: loading }, otherProps, { ref: ref, checked: value, disabled: disabled, onChange: function (v) {
                !withPopConfirm && handleSubmit(v);
            }, "data-cy": testId.switch }))));
});
//与arco switch保持同样处理，增加__BYTE_SWITCH标识需要处理进入如下处理：当 children 中的元素 disabled 时，不能正确触发 hover 等事件，所以当监测到对应组件有 disabled 时，给元素加一层 span，处理事件，模拟样式
var CAsyncSwitchComponent = CAsyncSwitch;
CAsyncSwitchComponent.__BYTE_SWITCH = true;
CAsyncSwitchComponent.displayName = 'CAsyncSwitch';
export default CAsyncSwitchComponent;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map