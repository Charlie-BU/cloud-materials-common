import { __assign } from "tslib";
import { isReactNode } from '../../CTable/shared';
import { isObject } from 'lodash-es';
import COperationMenu from '../../COperationMenu';
import React from 'react';
import classNamePrefixFactory from '../../_utils/classNamePrefixFactory';
/**
 * CombineSearch 获取处理用户输入字符的函数，处理结果进行模糊匹配
 * @param fuzzy
 * @param fuzzyConfig
 * @returns
 */
export var getCombineFilterUserInput = function (fuzzy, fuzzyConfig) {
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
/**
 * CCombineSearch 获取placeholder
 * @param status
 * @param current
 * @param locale
 * @returns
 */
export var getConbineSearchPlaceholder = function (status, current, locale, comPlaceholder) {
    // 选择了某个搜索项时，placeholder优先顺序：搜索项placeholder > 组件placeholder > 默认placeholder
    if (status === 'value') {
        return ((current === null || current === void 0 ? void 0 : current.placeholder) ||
            comPlaceholder ||
            ((current === null || current === void 0 ? void 0 : current.type) === 'input' ? locale.CSearch.enterAndConfirm : locale.CSearch.selectPlaceholder));
    }
    return comPlaceholder || locale.CSearch.defaultPlaceholder;
};
/**
 * 获取 trigger 前后react node
 * @param extraConfig
 * @returns
 */
export var getTriggerExtraNode = function (extraConfig) {
    var extraNode = null;
    if (isReactNode(extraConfig)) {
        extraNode = extraConfig;
    }
    else if (isObject(extraConfig)) {
        extraNode = React.createElement(COperationMenu, __assign({}, extraConfig));
    }
    return extraNode;
};
/**
 * 获取已选择的搜索条件list
 * @param params
 * @param list
 * @returns
 */
export var getViewList = function (params, list) {
    return Object.keys(params)
        .map(function (fieldName) { return list.find(function (item) { return item.fieldName === fieldName; }); })
        .filter(Boolean);
};
export var combineDataCy = classNamePrefixFactory('search-combine');
/**
 * 值转为Array
 * @param v
 * @returns Array|undefined|null
 */
export var valueToArray = function (v) {
    if (v === undefined || v === null) {
        return [];
    }
    if (Array.isArray(v)) {
        return v;
    }
    return [v];
};
/**
 * 获取defaultField 配置
 */
export var getDefaultFieldConfig = function (defaultField) {
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
//# sourceMappingURL=utils.js.map