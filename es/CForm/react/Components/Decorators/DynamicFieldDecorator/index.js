import { __assign, __read } from "tslib";
import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@formily/react';
import CField from '../../../CField/CField';
import reactiveWithCForm from '../../RectiveWithCForm';
import { useCForm } from '../../../hooks';
function removeFields(_a) {
    var _b;
    var form = _a.form, parentField = _a.parentField, renderFields = _a.renderFields, newRenderFields = _a.newRenderFields, keepFields = _a.keepFields;
    var parentPath = (_b = parentField === null || parentField === void 0 ? void 0 : parentField.address) === null || _b === void 0 ? void 0 : _b.entire;
    if (!parentPath) {
        return;
    }
    // keepFields: true 只卸载动态字段下不同的子字段
    // keepFields: false 卸载动态字段下所有子字段
    if (keepFields) {
        renderFields.forEach(function (el) {
            if (!newRenderFields.some(function (config) { return config.name === el.name; })) {
                form.clearFormGraph("".concat(parentPath, ".").concat(el.name));
                form.clearFormGraph("".concat(parentPath, ".").concat(el.name, ".*"));
            }
        });
    }
    else {
        form.clearFormGraph("".concat(parentPath, ".*"));
    }
}
var DynamicFieldDecorator = function (props) {
    var children = props.children, depValues = props.depValues, dataDepValues = props.dataDepValues, _a = props.keepFields, keepFields = _a === void 0 ? false : _a, getDynamicFields = props.getDynamicFields;
    var form = useCForm();
    var field = useField();
    var _b = __read(useState([]), 2), renderFields = _b[0], setRenderFields = _b[1];
    var firstRef = useRef(true);
    // 对依赖项的值做出操作，去注册与注销字段
    useEffect(function () {
        var newRenderFields = getDynamicFields({ form: form, depValues: depValues, dataDepValues: dataDepValues });
        // 在切换步骤时，会被卸载，因此初次渲染的时候不清理字段
        if (firstRef.current) {
            firstRef.current = false;
        }
        else {
            // 去移除旧字段
            removeFields({ form: form, parentField: field, renderFields: renderFields, newRenderFields: newRenderFields, keepFields: keepFields });
        }
        setRenderFields([]);
        // 延迟设置子字段，确保重新对动态字段进行渲染
        setTimeout(function () {
            setRenderFields(newRenderFields);
        }, 0);
    }, [depValues, dataDepValues]);
    return (React.createElement(React.Fragment, null,
        children,
        renderFields.map(function (field) { return (React.createElement(CField, __assign({ key: field.name }, field))); })));
};
export default reactiveWithCForm(DynamicFieldDecorator);
//# sourceMappingURL=index.js.map