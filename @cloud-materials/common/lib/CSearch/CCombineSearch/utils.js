"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultFieldConfig = exports.valueToArray = exports.combineDataCy = exports.getViewList = exports.getTriggerExtraNode = exports.getConbineSearchPlaceholder = exports.getCombineFilterUserInput = void 0;
var tslib_1 = require("tslib");
var shared_1 = require("../../CTable/shared");
var lodash_es_1 = require("lodash-es");
var COperationMenu_1 = tslib_1.__importDefault(require("../../COperationMenu"));
var react_1 = tslib_1.__importDefault(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../_utils/classNamePrefixFactory"));
/**
 * CombineSearch 获取处理用户输入字符的函数，处理结果进行模糊匹配
 * @param fuzzy
 * @param fuzzyConfig
 * @returns
 */
var getCombineFilterUserInput = function (fuzzy, fuzzyConfig) {
    return function (userInput) {
        if (!fuzzy || !fuzzyConfig) {
            return userInput;
        }
        var formattedValue = userInput;
        if (fuzzyConfig.filterUserInput) {
            formattedValue = fuzzyConfig.filterUserInput(formattedValue);
        }
        if (fuzzyConfig.letterCase === 'lowerCase' || fuzzyConfig.letterCase === 'ignore') {
            formattedValue = formattedValue === null || formattedValue === void 0 ? void 0 : formattedValue.toLowerCase();
        }
        if (fuzzyConfig.letterCase === 'upperCase') {
            formattedValue = formattedValue === null || formattedValue === void 0 ? void 0 : formattedValue.toUpperCase();
        }
        if (Array.isArray(fuzzyConfig.ignoreCharacters) && fuzzyConfig.ignoreCharacters.length) {
            formattedValue = fuzzyConfig.ignoreCharacters.reduce(function (res, character) {
                if (!character) {
                    return res;
                }
                return res === null || res === void 0 ? void 0 : res.replaceAll(character, '');
            }, formattedValue);
        }
        return formattedValue;
    };
};
exports.getCombineFilterUserInput = getCombineFilterUserInput;
/**
 * CCombineSearch 获取placeholder
 * @param status
 * @param current
 * @param locale
 * @returns
 */
var getConbineSearchPlaceholder = function (status, current, locale, comPlaceholder) {
    // 选择了某个搜索项时，placeholder优先顺序：搜索项placeholder > 组件placeholder > 默认placeholder
    if (status === 'value') {
        return ((current === null || current === void 0 ? void 0 : current.placeholder) ||
            comPlaceholder ||
            ((current === null || current === void 0 ? void 0 : current.type) === 'input' ? locale.CSearch.enterAndConfirm : locale.CSearch.selectPlaceholder));
    }
    return comPlaceholder || locale.CSearch.defaultPlaceholder;
};
exports.getConbineSearchPlaceholder = getConbineSearchPlaceholder;
/**
 * 获取 trigger 前后react node
 * @param extraConfig
 * @returns
 */
var getTriggerExtraNode = function (extraConfig) {
    var extraNode = null;
    if ((0, shared_1.isReactNode)(extraConfig)) {
        extraNode = extraConfig;
    }
    else if ((0, lodash_es_1.isObject)(extraConfig)) {
        extraNode = react_1.default.createElement(COperationMenu_1.default, tslib_1.__assign({}, extraConfig));
    }
    return extraNode;
};
exports.getTriggerExtraNode = getTriggerExtraNode;
/**
 * 获取已选择的搜索条件list
 * @param params
 * @param list
 * @returns
 */
var getViewList = function (params, list) {
    return Object.keys(params)
        .map(function (fieldName) { return list.find(function (item) { return item.fieldName === fieldName; }); })
        .filter(Boolean);
};
exports.getViewList = getViewList;
exports.combineDataCy = (0, classNamePrefixFactory_1.default)('search-combine');
/**
 * 值转为Array
 * @param v
 * @returns Array|undefined|null
 */
var valueToArray = function (v) {
    if (v === undefined || v === null) {
        return [];
    }
    if (Array.isArray(v)) {
        return v;
    }
    return [v];
};
exports.valueToArray = valueToArray;
/**
 * 获取defaultField 配置
 */
var getDefaultFieldConfig = function (defaultField) {
    var _a;
    if (typeof defaultField === 'string') {
        return {
            fieldName: defaultField,
            type: 'default',
        };
    }
    if (typeof defaultField === 'object') {
        return {
            fieldName: defaultField.fieldName,
            type: (_a = defaultField.type) !== null && _a !== void 0 ? _a : 'default',
        };
    }
};
exports.getDefaultFieldConfig = getDefaultFieldConfig;
//# sourceMappingURL=utils.js.map