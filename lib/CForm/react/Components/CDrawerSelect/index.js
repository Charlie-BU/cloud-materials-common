"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CFormDrawerSelect = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("@formily/react");
var CDrawerSelect_1 = tslib_1.__importDefault(require("../../../../CDrawerSelect"));
var CFormDrawerSelectCom = function (props) {
    var controlledValue = props.controlledValue, onChange = props.onChange, restProps = tslib_1.__rest(props, ["controlledValue", "onChange"]);
    return react_1.default.createElement(CDrawerSelect_1.default, tslib_1.__assign({ controlledValue: controlledValue, onValueChange: onChange }, restProps));
};
exports.CFormDrawerSelect = (0, react_2.connect)(CFormDrawerSelectCom, (0, react_2.mapProps)(function (props, field) {
    if (!field)
        return props;
    return {
        rowKey: props.rowKey,
        data: props.data || field.dataSource,
        controlledValue: props.controlledValue || field.value,
    };
}));
//# sourceMappingURL=index.js.map