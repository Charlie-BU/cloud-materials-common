import { __assign } from "tslib";
import React, { useMemo } from 'react';
import { useForm } from '@formily/react';
import { cloneDeep, isFunction, isPlainObject, isString, omit } from 'lodash-es';
import Detail from './Detail';
import { useFormStep } from '@storage-fe/formily-arco/es/FormStep/hooks';
import { getFormFieldId } from '../../../shared/utils';
var DefaultText = '-';
export var useFormDetail = function (props) {
    var detail = props.detail, labelWidth = props.labelWidth;
    var formStep = useFormStep();
    var form = useForm();
    var values = form.values;
    var cloneDetail = useMemo(function () { return cloneDeep(detail); }, [detail]);
    // TODO:下面这坨逻辑时间复杂度高，需要优化写法
    cloneDetail.forEach(function (step) {
        step.section = step.section.filter(function (item) {
            if (isFunction(item.hidden)) {
                return !item.hidden(values, form);
            }
            return true;
        });
        step.section.forEach(function (section) {
            // @ts-ignore
            section.fields = section.fields
                .filter(function (item) {
                if (isString(item)) {
                    return true;
                }
                if (isPlainObject(item)) {
                    var value = (item === null || item === void 0 ? void 0 : item.name) ? values[item.name] : '';
                    return isFunction(item.hidden) ? !item.hidden(value, values, form) : !item.hidden;
                }
                return true;
            })
                .map(function (item) {
                var _a, _b, _c, _d, _e, _f;
                if (isString(item)) {
                    var field = form.getFieldState(item);
                    var label = (_a = field === null || field === void 0 ? void 0 : field.title) !== null && _a !== void 0 ? _a : item;
                    var value_1 = values[item] || DefaultText;
                    var mapValue = (_b = ((field === null || field === void 0 ? void 0 : field.dataSource) || []).find(function (ele) { return ele.value === value_1; })) === null || _b === void 0 ? void 0 : _b.label;
                    return {
                        label: label,
                        content: mapValue !== null && mapValue !== void 0 ? mapValue : value_1,
                        hidden: false,
                    };
                }
                if (isPlainObject(item)) {
                    var field = (item === null || item === void 0 ? void 0 : item.name) ? form.getFieldState(item.name) : {};
                    var value_2 = (item === null || item === void 0 ? void 0 : item.name) ? values[item.name] : '';
                    var label = isFunction(item.label)
                        ? item.label(value_2, values, form)
                        : (_d = (_c = item === null || item === void 0 ? void 0 : item.label) !== null && _c !== void 0 ? _c : field === null || field === void 0 ? void 0 : field.title) !== null && _d !== void 0 ? _d : item === null || item === void 0 ? void 0 : item.name;
                    var formatValue = isFunction(item.formatter) ? item.formatter(value_2, values, form) : void 0;
                    var hidden = isFunction(item.hidden) ? !!item.hidden(value_2, values, form) : !!item.hidden;
                    var mapValue = (_e = ((field === null || field === void 0 ? void 0 : field.dataSource) || []).find(function (item) { return item.value === value_2; })) === null || _e === void 0 ? void 0 : _e.label;
                    return __assign(__assign({}, omit(item, ['name', 'formatter'])), { label: label, content: (_f = formatValue !== null && formatValue !== void 0 ? formatValue : mapValue) !== null && _f !== void 0 ? _f : value_2, hidden: hidden, labelStyle: __assign(__assign({}, (item.labelStyle || {})), { 
                            // 无label情况
                            display: label ? 'flex' : 'none' }) });
                }
                return item;
            });
        });
    });
    var onEdit = function (step, section) {
        var _a, _b;
        formStep.setCurrent(step);
        if (section) {
            // @ts-ignore
            var address = (_b = (_a = form.query(section)) === null || _a === void 0 ? void 0 : _a.addresses) === null || _b === void 0 ? void 0 : _b[0];
            if (address) {
                var dom = document.getElementById(getFormFieldId(address));
                dom === null || dom === void 0 ? void 0 : dom.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }
    };
    return {
        onEdit: onEdit,
        form: form,
        values: values,
        labelWidth: labelWidth,
        detail: cloneDetail,
    };
};
export default (function (props) {
    var detail = props.detail;
    if (!detail) {
        return null;
    }
    var config = useFormDetail(props);
    return React.createElement(Detail, __assign({}, config));
});
//# sourceMappingURL=CFormDetail.js.map