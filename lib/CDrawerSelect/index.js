"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawerSelectTestId = exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var interface_1 = require("./interface");
var CDrawerSelectComponent_1 = tslib_1.__importDefault(require("./CDrawerSelectComponent"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var hooks_1 = require("../hooks");
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('drawer-select');
exports.drawerSelectTestId = {
    container: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    select: (0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["select"], ["select"]))),
};
var CDrawerSelect = react_1.default.forwardRef(function (props, ref) {
    var controlledValue = props.controlledValue, defaultValue = props.value, mode = props.mode, arcoSelectProps = props.arcoSelectProps, customRender = props.customRender, onChange = props.onChange, onOk = props.onOk, onCancel = props.onCancel, _a = props.unmountOnExit, unmountOnExit = _a === void 0 ? false : _a, rowKey = props.rowKey, onValueChange = props.onValueChange, disabled = props.disabled, config = tslib_1.__rest(props, ["controlledValue", "value", "mode", "arcoSelectProps", "customRender", "onChange", "onOk", "onCancel", "unmountOnExit", "rowKey", "onValueChange", "disabled"]);
    var _b = tslib_1.__read((0, react_1.useState)(false), 2), visible = _b[0], setVisible = _b[1];
    var isControlled = 'controlledValue' in props;
    var valueProps = Object.assign({}, isControlled ? { value: controlledValue } : { defaultValue: defaultValue });
    var _c = tslib_1.__read((0, hooks_1.useControlledValue)(valueProps), 2), selectValue = _c[0], setSelectValue = _c[1];
    var drawerSelect = (
    // 半受控组件，内部值监听selectValue变化，同时内部进行选择，在onOk的时候调用组件的onChange触发整个组件值变更
    react_1.default.createElement(CDrawerSelectComponent_1.default, tslib_1.__assign({ rowKey: rowKey }, config, { disabled: disabled, unmountOnExit: unmountOnExit, value: selectValue, onChange: onChange, visible: visible, type: mode ? interface_1.Type.checkbox : interface_1.Type.radio, onCancel: function (e) {
            setVisible(false);
            onCancel === null || onCancel === void 0 ? void 0 : onCancel(e);
        }, onOk: function (v) {
            onOk === null || onOk === void 0 ? void 0 : onOk(v);
            !isControlled && setSelectValue(v);
            onChange === null || onChange === void 0 ? void 0 : onChange(v);
            onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(v);
            setVisible(false);
        } })));
    return (react_1.default.createElement("div", { "data-cy": exports.drawerSelectTestId.container, ref: ref, className: (0, exports.cssPrefix)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject([""], [""]))) },
        customRender ? (customRender({ open: function () { return setVisible(true); }, close: function () { return setVisible(false); } })) : (react_1.default.createElement(web_react_1.Select, tslib_1.__assign({ "data-cy": exports.drawerSelectTestId.select, "data-testid": exports.drawerSelectTestId.select, 
            // 内置的Select必须为受控模式，因为选择行为是发生在CTableSelect内部的，必须外部控制Select的值
            value: selectValue, onChange: function (val) {
                !isControlled && setSelectValue(val);
                onChange === null || onChange === void 0 ? void 0 : onChange(val);
                onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(val);
            }, mode: mode, suffixIcon: visible ? react_1.default.createElement(iconbox_react_ve_o_design_1.IconDrawerFold, null) : react_1.default.createElement(iconbox_react_ve_o_design_1.IconDrawerExpand, null), popupVisible: false, onClick: function () { return !disabled && setVisible(true); }, style: { width: 448 }, disabled: disabled }, arcoSelectProps))),
        unmountOnExit ? visible && drawerSelect : drawerSelect));
});
CDrawerSelect.displayName = 'CDrawerSelect';
exports.default = CDrawerSelect;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map