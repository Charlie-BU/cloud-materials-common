import { __assign, __rest } from "tslib";
import React from 'react';
import { connect, mapProps } from '@formily/react';
import CDrawerSelect from '../../../../CDrawerSelect';
var CFormDrawerSelectCom = function (props) {
    var controlledValue = props.controlledValue, onChange = props.onChange, restProps = __rest(props, ["controlledValue", "onChange"]);
    return React.createElement(CDrawerSelect, __assign({ controlledValue: controlledValue, onValueChange: onChange }, restProps));
};
export var CFormDrawerSelect = connect(CFormDrawerSelectCom, mapProps(function (props, field) {
    if (!field)
        return props;
    return {
        rowKey: props.rowKey,
        data: props.data || field.dataSource,
        controlledValue: props.controlledValue || field.value,
    };
}));
//# sourceMappingURL=index.js.map