import { __assign } from "tslib";
import { isArray, isEmpty, isUndefined, omitBy } from 'lodash-es';
import React from 'react';
import { getCombineFilterUserInput } from './CCombineSearch/utils';
import { getFilterOptions } from './CCombineSearch/SearchTrigger/utils';
export var DEFAULT_DISPLAY_COUNT = 2;
export var DEFAULT_LABEL_WIDTH = 100;
export var DEFAULT_SEPARATOR = ', ';
export var DEFAULT_COLSPAN = {
    InputNumber: 4,
    Select: 4,
    DatePicker: 4,
    Input: 5,
    RangePicker: 7,
};
export var dropUndefined = function (value) {
    return omitBy(value, isUndefined);
};
/** 根据separator转换成配置 */
export var getSeparator = function (separator) {
    var _a, _b;
    if (typeof separator === 'string') {
        return {
            symbol: separator,
            isOriginalData: false,
        };
    }
    if (typeof separator === 'object') {
        return {
            symbol: (_a = separator.symbol) !== null && _a !== void 0 ? _a : DEFAULT_SEPARATOR,
            isOriginalData: (_b = separator.isOriginalData) !== null && _b !== void 0 ? _b : false,
        };
    }
    return {
        symbol: DEFAULT_SEPARATOR,
        isOriginalData: true,
    };
};
export var isMultipleSeparatorSelect = function (item) {
    return item.type === 'select' && item.mode === 'multiple';
};
export var isTagSeparatorInput = function (item) {
    return item.type === 'input' && item.mode === 'tag';
};
/** 内部组件值转换后抛出给外部 */
export var transformToSearchParams = function (params, list) {
    var _params = __assign({}, params);
    list.forEach(function (item) {
        var _val = _params[item.fieldName];
        if (Array.isArray(_val) && (isMultipleSeparatorSelect(item) || isTagSeparatorInput(item))) {
            var separatorConfig = getSeparator(item.separator);
            _params[item.fieldName] = separatorConfig.isOriginalData ? _val : _val.join(separatorConfig.symbol);
        }
    });
    return _params;
};
export var transformToComponentParams = function (params, list) {
    var _params = __assign({}, params);
    list.forEach(function (item) {
        var _val = _params[item.fieldName];
        if (typeof _val === 'string' && (isMultipleSeparatorSelect(item) || isTagSeparatorInput(item))) {
            var separatorConfig = getSeparator(item.separator);
            _params[item.fieldName] = separatorConfig.isOriginalData ? _val : _val.split(separatorConfig.symbol);
        }
    });
    return _params;
};
export var transformToString = function (value, item) {
    var _a;
    if (!item || value === undefined) {
        return '';
    }
    if (item.type === 'select') {
        var _value_1 = isArray(value) ? value : [value];
        var filterOptions_1 = (_a = item.options) === null || _a === void 0 ? void 0 : _a.filter(function (option) { return _value_1.includes(option.value); });
        var customOptions = _value_1
            .filter(function (el) { return !filterOptions_1.some(function (option) { return option.value === el; }); })
            .map(function (el) { return ({ label: el, value: el }); });
        var options = filterOptions_1.concat(customOptions);
        var optionsLength_1 = options.length - 1;
        return options.map(function (val, i) { return (React.createElement(React.Fragment, null,
            val.label,
            i !== optionsLength_1 && getSeparator(item.separator).symbol)); });
    }
    if (item.type === 'input' && item.mode === 'tag') {
        return value === null || value === void 0 ? void 0 : value.join(getSeparator(item.separator).symbol);
    }
    if (typeof value === 'object') {
        return JSON.stringify(value);
    }
    return value;
};
export var getCurrentValue = function (params, current) {
    return (current === null || current === void 0 ? void 0 : current.fieldName) ? params[current.fieldName] : undefined;
};
export var isEmptyValue = function (value) {
    if (typeof value === 'string') {
        return value.trim() === '';
    }
    if (typeof value === 'object') {
        return isEmpty(value);
    }
    return value === undefined;
};
/**
 * 复合搜索-获取搜索词处理函数
 * @param fuzzy
 * @param fuzzyConfig
 */
export var getCSearchCombineFilterUserInput = getCombineFilterUserInput;
/**
 * 复合搜索-获取搜索时过滤出来的options
 */
export var getCSearchCombineFilterOptions = getFilterOptions;
//# sourceMappingURL=utils.js.map