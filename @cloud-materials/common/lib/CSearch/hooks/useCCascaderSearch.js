"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCCascaderSearch = void 0;
var tslib_1 = require("tslib");
var ahooks_1 = require("ahooks");
var lodash_es_1 = require("lodash-es");
var react_1 = require("react");
var utils_1 = require("../utils");
var useDebounceHandler_1 = require("./useDebounceHandler");
var transformValueToState = function (list, value, previousValue) {
    var _a, _b;
    if (value === void 0) { value = {}; }
    if (previousValue === void 0) { previousValue = value; }
    var _c = tslib_1.__read(Object.entries(value)[0] || [], 2), fieldName = _c[0], val = _c[1];
    // 若传入的参数字段不包含在 list 表中，则过滤掉该参数，默认显示第一条数据
    if (fieldName && list.some(function (item) { return item.fieldName === fieldName; })) {
        return { fieldName: fieldName, value: val };
    }
    return { fieldName: (_a = previousValue === null || previousValue === void 0 ? void 0 : previousValue.fieldName) !== null && _a !== void 0 ? _a : (_b = list[0]) === null || _b === void 0 ? void 0 : _b.fieldName };
};
var transformStateToValue = function (state) {
    var _a;
    return (0, utils_1.isEmptyValue)(state.value) ? {} : (_a = {}, _a[state.fieldName] = state.value, _a);
};
var useCCascaderSearch = function (props) {
    var _a = props.list, list = _a === void 0 ? [] : _a, _b = props.onChange, onChange = _b === void 0 ? lodash_es_1.noop : _b, defaultValue = props.defaultValue, value = props.value, debounceOptions = props.debounceOptions;
    var validOptions = list.filter(function (option) { return option.visible !== false; });
    var isControlled = 'value' in props;
    var _c = tslib_1.__read((0, react_1.useState)(transformValueToState(validOptions, isControlled ? value : defaultValue)), 2), current = _c[0], setCurrent = _c[1];
    // 记录上一次值，用于和更新后的值对比
    var previous = (0, react_1.useRef)(current);
    var option = validOptions.find(function (option) { return option.fieldName === current.fieldName; });
    var searchComponent = (0, lodash_es_1.pick)(option, ['content', 'commonProps']);
    var debounceHandleChange = (0, useDebounceHandler_1.useDebounceHandler)({ onChange: onChange, debounceOptions: debounceOptions }).debounceHandleChange;
    var updateField = function (value) {
        previous.current = current;
        setCurrent({ fieldName: value });
    };
    var updateValue = function (value) {
        var _value = (0, utils_1.dropUndefined)(tslib_1.__assign(tslib_1.__assign({}, current), { value: (0, utils_1.isEmptyValue)(value) ? undefined : value }));
        previous.current = current;
        setCurrent(_value);
    };
    (0, ahooks_1.useDeepCompareEffect)(function () {
        if (!isControlled) {
            return;
        }
        var _value = transformValueToState(validOptions, value, current);
        if (!(0, lodash_es_1.isEqual)(_value, current)) {
            setCurrent(_value);
        }
    }, [value]);
    (0, ahooks_1.useUpdateEffect)(function () {
        var _a, _b, _c, _d;
        var _value = transformValueToState(validOptions, value, current);
        if (isControlled && (0, lodash_es_1.isEqual)(current, _value)) {
            return;
        }
        // 两种情况下触发 onChange
        if (
        // 1. 不切换 field，只修改 value
        (current.fieldName === ((_a = previous.current) === null || _a === void 0 ? void 0 : _a.fieldName) && !(0, lodash_es_1.isEqual)(current.value, (_b = previous.current) === null || _b === void 0 ? void 0 : _b.value)) ||
            // 2. 切换 field，且切换前后的 value 至少有一个不为空
            (current.fieldName !== ((_c = previous.current) === null || _c === void 0 ? void 0 : _c.fieldName) &&
                (!(0, utils_1.isEmptyValue)(current.value) || !(0, utils_1.isEmptyValue)((_d = previous.current) === null || _d === void 0 ? void 0 : _d.value)))) {
            debounceHandleChange(transformStateToValue(current));
        }
    }, [current]);
    return [
        { validOptions: validOptions, state: current, searchComponent: searchComponent },
        { updateField: updateField, updateValue: updateValue },
    ];
};
exports.useCCascaderSearch = useCCascaderSearch;
//# sourceMappingURL=useCCascaderSearch.js.map