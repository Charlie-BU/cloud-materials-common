import { __assign, __read } from "tslib";
import { useDeepCompareEffect, useUpdateEffect } from 'ahooks';
import { isEqual, noop, pick } from 'lodash-es';
import { useRef, useState } from 'react';
import { dropUndefined, isEmptyValue } from '../utils';
import { useDebounceHandler } from './useDebounceHandler';
var transformValueToState = function (list, value, previousValue) {
    var _a, _b;
    if (value === void 0) { value = {}; }
    if (previousValue === void 0) { previousValue = value; }
    var _c = __read(Object.entries(value)[0] || [], 2), fieldName = _c[0], val = _c[1];
    // 若传入的参数字段不包含在 list 表中，则过滤掉该参数，默认显示第一条数据
    if (fieldName && list.some(function (item) { return item.fieldName === fieldName; })) {
        return { fieldName: fieldName, value: val };
    }
    return { fieldName: (_a = previousValue === null || previousValue === void 0 ? void 0 : previousValue.fieldName) !== null && _a !== void 0 ? _a : (_b = list[0]) === null || _b === void 0 ? void 0 : _b.fieldName };
};
var transformStateToValue = function (state) {
    var _a;
    return isEmptyValue(state.value) ? {} : (_a = {}, _a[state.fieldName] = state.value, _a);
};
export var useCCascaderSearch = function (props) {
    var _a = props.list, list = _a === void 0 ? [] : _a, _b = props.onChange, onChange = _b === void 0 ? noop : _b, defaultValue = props.defaultValue, value = props.value, debounceOptions = props.debounceOptions;
    var validOptions = list.filter(function (option) { return option.visible !== false; });
    var isControlled = 'value' in props;
    var _c = __read(useState(transformValueToState(validOptions, isControlled ? value : defaultValue)), 2), current = _c[0], setCurrent = _c[1];
    // 记录上一次值，用于和更新后的值对比
    var previous = useRef(current);
    var option = validOptions.find(function (option) { return option.fieldName === current.fieldName; });
    var searchComponent = pick(option, ['content', 'commonProps']);
    var debounceHandleChange = useDebounceHandler({ onChange: onChange, debounceOptions: debounceOptions }).debounceHandleChange;
    var updateField = function (value) {
        previous.current = current;
        setCurrent({ fieldName: value });
    };
    var updateValue = function (value) {
        var _value = dropUndefined(__assign(__assign({}, current), { value: isEmptyValue(value) ? undefined : value }));
        previous.current = current;
        setCurrent(_value);
    };
    useDeepCompareEffect(function () {
        if (!isControlled) {
            return;
        }
        var _value = transformValueToState(validOptions, value, current);
        if (!isEqual(_value, current)) {
            setCurrent(_value);
        }
    }, [value]);
    useUpdateEffect(function () {
        var _a, _b, _c, _d;
        var _value = transformValueToState(validOptions, value, current);
        if (isControlled && isEqual(current, _value)) {
            return;
        }
        // 两种情况下触发 onChange
        if (
        // 1. 不切换 field，只修改 value
        (current.fieldName === ((_a = previous.current) === null || _a === void 0 ? void 0 : _a.fieldName) && !isEqual(current.value, (_b = previous.current) === null || _b === void 0 ? void 0 : _b.value)) ||
            // 2. 切换 field，且切换前后的 value 至少有一个不为空
            (current.fieldName !== ((_c = previous.current) === null || _c === void 0 ? void 0 : _c.fieldName) &&
                (!isEmptyValue(current.value) || !isEmptyValue((_d = previous.current) === null || _d === void 0 ? void 0 : _d.value)))) {
            debounceHandleChange(transformStateToValue(current));
        }
    }, [current]);
    return [
        { validOptions: validOptions, state: current, searchComponent: searchComponent },
        { updateField: updateField, updateValue: updateValue },
    ];
};
//# sourceMappingURL=useCCascaderSearch.js.map