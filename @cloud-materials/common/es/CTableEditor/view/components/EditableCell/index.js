import { __assign, __rest } from "tslib";
import React from 'react';
import CInlineEdit from '../../../../CInlineEdit';
import { noop } from 'lodash-es';
export var EditableCell = function (props) {
    var value = props.value, _a = props.onChange, onChange = _a === void 0 ? noop : _a, onSubmit = props.onSubmit, restProps = __rest(props, ["value", "onChange", "onSubmit"]);
    var handleSubmit = function (v) {
        return onSubmit ? onSubmit(v, value, onChange) : onChange(v);
        // if (onSubmit) {
        //   return onSubmit(v, value, onChange);
        // } else {
        //   onChange(v);
        // }
    };
    return React.createElement(CInlineEdit, __assign({}, restProps, { value: value, onSubmit: handleSubmit }));
};
//# sourceMappingURL=index.js.map