"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCSearchCombineFilterOptions = exports.getCSearchCombineFilterUserInput = exports.isEmptyValue = exports.getCurrentValue = exports.transformToString = exports.transformToComponentParams = exports.transformToSearchParams = exports.isTagSeparatorInput = exports.isMultipleSeparatorSelect = exports.getSeparator = exports.dropUndefined = exports.DEFAULT_COLSPAN = exports.DEFAULT_SEPARATOR = exports.DEFAULT_LABEL_WIDTH = exports.DEFAULT_DISPLAY_COUNT = void 0;
var tslib_1 = require("tslib");
var lodash_es_1 = require("lodash-es");
var react_1 = tslib_1.__importDefault(require("react"));
var utils_1 = require("./CCombineSearch/utils");
var utils_2 = require("./CCombineSearch/SearchTrigger/utils");
exports.DEFAULT_DISPLAY_COUNT = 2;
exports.DEFAULT_LABEL_WIDTH = 100;
exports.DEFAULT_SEPARATOR = ', ';
exports.DEFAULT_COLSPAN = {
    InputNumber: 4,
    Select: 4,
    DatePicker: 4,
    Input: 5,
    RangePicker: 7,
};
var dropUndefined = function (value) {
    return (0, lodash_es_1.omitBy)(value, lodash_es_1.isUndefined);
};
exports.dropUndefined = dropUndefined;
/** 根据separator转换成配置 */
var getSeparator = function (separator) {
    var _a, _b;
    if (typeof separator === 'string') {
        return {
            symbol: separator,
            isOriginalData: false,
        };
    }
    if (typeof separator === 'object') {
        return {
            symbol: (_a = separator.symbol) !== null && _a !== void 0 ? _a : exports.DEFAULT_SEPARATOR,
            isOriginalData: (_b = separator.isOriginalData) !== null && _b !== void 0 ? _b : false,
        };
    }
    return {
        symbol: exports.DEFAULT_SEPARATOR,
        isOriginalData: true,
    };
};
exports.getSeparator = getSeparator;
var isMultipleSeparatorSelect = function (item) {
    return item.type === 'select' && item.mode === 'multiple';
};
exports.isMultipleSeparatorSelect = isMultipleSeparatorSelect;
var isTagSeparatorInput = function (item) {
    return item.type === 'input' && item.mode === 'tag';
};
exports.isTagSeparatorInput = isTagSeparatorInput;
/** 内部组件值转换后抛出给外部 */
var transformToSearchParams = function (params, list) {
    var _params = tslib_1.__assign({}, params);
    list.forEach(function (item) {
        var _val = _params[item.fieldName];
        if (Array.isArray(_val) && ((0, exports.isMultipleSeparatorSelect)(item) || (0, exports.isTagSeparatorInput)(item))) {
            var separatorConfig = (0, exports.getSeparator)(item.separator);
            _params[item.fieldName] = separatorConfig.isOriginalData ? _val : _val.join(separatorConfig.symbol);
        }
    });
    return _params;
};
exports.transformToSearchParams = transformToSearchParams;
var transformToComponentParams = function (params, list) {
    var _params = tslib_1.__assign({}, params);
    list.forEach(function (item) {
        var _val = _params[item.fieldName];
        if (typeof _val === 'string' && ((0, exports.isMultipleSeparatorSelect)(item) || (0, exports.isTagSeparatorInput)(item))) {
            var separatorConfig = (0, exports.getSeparator)(item.separator);
            _params[item.fieldName] = separatorConfig.isOriginalData ? _val : _val.split(separatorConfig.symbol);
        }
    });
    return _params;
};
exports.transformToComponentParams = transformToComponentParams;
var transformToString = function (value, item) {
    var _a;
    if (!item || value === undefined) {
        return '';
    }
    if (item.type === 'select') {
        var _value_1 = (0, lodash_es_1.isArray)(value) ? value : [value];
        var filterOptions_1 = (_a = item.options) === null || _a === void 0 ? void 0 : _a.filter(function (option) { return _value_1.includes(option.value); });
        var customOptions = _value_1
            .filter(function (el) { return !filterOptions_1.some(function (option) { return option.value === el; }); })
            .map(function (el) { return ({ label: el, value: el }); });
        var options = filterOptions_1.concat(customOptions);
        var optionsLength_1 = options.length - 1;
        return options.map(function (val, i) { return (react_1.default.createElement(react_1.default.Fragment, null,
            val.label,
            i !== optionsLength_1 && (0, exports.getSeparator)(item.separator).symbol)); });
    }
    if (item.type === 'input' && item.mode === 'tag') {
        return value === null || value === void 0 ? void 0 : value.join((0, exports.getSeparator)(item.separator).symbol);
    }
    if (typeof value === 'object') {
        return JSON.stringify(value);
    }
    return value;
};
exports.transformToString = transformToString;
var getCurrentValue = function (params, current) {
    return (current === null || current === void 0 ? void 0 : current.fieldName) ? params[current.fieldName] : undefined;
};
exports.getCurrentValue = getCurrentValue;
var isEmptyValue = function (value) {
    if (typeof value === 'string') {
        return value.trim() === '';
    }
    if (typeof value === 'object') {
        return (0, lodash_es_1.isEmpty)(value);
    }
    return value === undefined;
};
exports.isEmptyValue = isEmptyValue;
/**
 * 复合搜索-获取搜索词处理函数
 * @param fuzzy
 * @param fuzzyConfig
 */
exports.getCSearchCombineFilterUserInput = utils_1.getCombineFilterUserInput;
/**
 * 复合搜索-获取搜索时过滤出来的options
 */
exports.getCSearchCombineFilterOptions = utils_2.getFilterOptions;
//# sourceMappingURL=utils.js.map