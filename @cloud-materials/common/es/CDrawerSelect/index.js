import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React, { useState } from 'react';
import { Select } from '@arco-design/web-react';
import { Type } from './interface';
import CDrawerSelectComponent from './CDrawerSelectComponent';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { IconDrawerExpand, IconDrawerFold } from '@arco-design/iconbox-react-ve-o-design';
import { useControlledValue } from '../hooks';
export var cssPrefix = classNamePrefixFactory('drawer-select');
export var drawerSelectTestId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))),
    select: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["select"], ["select"]))),
};
var CDrawerSelect = React.forwardRef(function (props, ref) {
    var controlledValue = props.controlledValue, defaultValue = props.value, mode = props.mode, arcoSelectProps = props.arcoSelectProps, customRender = props.customRender, onChange = props.onChange, onOk = props.onOk, onCancel = props.onCancel, _a = props.unmountOnExit, unmountOnExit = _a === void 0 ? false : _a, rowKey = props.rowKey, onValueChange = props.onValueChange, disabled = props.disabled, config = __rest(props, ["controlledValue", "value", "mode", "arcoSelectProps", "customRender", "onChange", "onOk", "onCancel", "unmountOnExit", "rowKey", "onValueChange", "disabled"]);
    var _b = __read(useState(false), 2), visible = _b[0], setVisible = _b[1];
    var isControlled = 'controlledValue' in props;
    var valueProps = Object.assign({}, isControlled ? { value: controlledValue } : { defaultValue: defaultValue });
    var _c = __read(useControlledValue(valueProps), 2), selectValue = _c[0], setSelectValue = _c[1];
    var drawerSelect = (
    // 半受控组件，内部值监听selectValue变化，同时内部进行选择，在onOk的时候调用组件的onChange触发整个组件值变更
    React.createElement(CDrawerSelectComponent, __assign({ rowKey: rowKey }, config, { disabled: disabled, unmountOnExit: unmountOnExit, value: selectValue, onChange: onChange, visible: visible, type: mode ? Type.checkbox : Type.radio, onCancel: function (e) {
            setVisible(false);
            onCancel === null || onCancel === void 0 ? void 0 : onCancel(e);
        }, onOk: function (v) {
            onOk === null || onOk === void 0 ? void 0 : onOk(v);
            !isControlled && setSelectValue(v);
            onChange === null || onChange === void 0 ? void 0 : onChange(v);
            onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(v);
            setVisible(false);
        } })));
    return (React.createElement("div", { "data-cy": drawerSelectTestId.container, ref: ref, className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""]))) },
        customRender ? (customRender({ open: function () { return setVisible(true); }, close: function () { return setVisible(false); } })) : (React.createElement(Select, __assign({ "data-cy": drawerSelectTestId.select, "data-testid": drawerSelectTestId.select, 
            // 内置的Select必须为受控模式，因为选择行为是发生在CTableSelect内部的，必须外部控制Select的值
            value: selectValue, onChange: function (val) {
                !isControlled && setSelectValue(val);
                onChange === null || onChange === void 0 ? void 0 : onChange(val);
                onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(val);
            }, mode: mode, suffixIcon: visible ? React.createElement(IconDrawerFold, null) : React.createElement(IconDrawerExpand, null), popupVisible: false, onClick: function () { return !disabled && setVisible(true); }, style: { width: 448 }, disabled: disabled }, arcoSelectProps))),
        unmountOnExit ? visible && drawerSelect : drawerSelect));
});
CDrawerSelect.displayName = 'CDrawerSelect';
export default CDrawerSelect;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map