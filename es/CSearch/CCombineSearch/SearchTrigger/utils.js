import { __assign } from "tslib";
import { xor } from 'lodash-es';
import { valueToArray } from '../utils';
/**
 * 内置默认过滤选项函数
 */
export var fuzzyDefualtFilterOptions = function (_a) {
    var searchWord = _a.searchWord, item = _a.item, fuzzyConfig = _a.fuzzyConfig, params = _a.params;
    var optionsSet = [];
    var value = params[item.fieldName];
    // 是否匹配value
    var isValueMatch = function (el, word) {
        return (typeof el.value === 'string' || typeof el.value === 'number') &&
            ((fuzzyConfig === null || fuzzyConfig === void 0 ? void 0 : fuzzyConfig.letterCase) === 'ignore' ? String(el.value).toLowerCase() : String(el.value)).includes(word);
    };
    // 是否匹配label
    var isLabelMatch = function (el, word) {
        return (typeof el.label === 'string' || typeof el.label === 'number') &&
            ((fuzzyConfig === null || fuzzyConfig === void 0 ? void 0 : fuzzyConfig.letterCase) === 'ignore' ? String(el.label).toLowerCase() : String(el.label)).includes(word);
    };
    searchWord.forEach(function (word) {
        item.options.forEach(function (el) {
            // 过滤已选择的项目
            if (valueToArray(value).includes(el.value)) {
                return false;
            }
            var isMatched = false;
            if ((fuzzyConfig === null || fuzzyConfig === void 0 ? void 0 : fuzzyConfig.target) === 'value') {
                isMatched = isValueMatch(el, word);
            }
            else if ((fuzzyConfig === null || fuzzyConfig === void 0 ? void 0 : fuzzyConfig.target) === 'both') {
                isMatched = isLabelMatch(el, word) || isValueMatch(el, word);
            }
            else {
                isMatched = isLabelMatch(el, word);
            }
            if (isMatched) {
                optionsSet.push(el);
            }
        });
    });
    return __assign(__assign({}, item), { options: xor(optionsSet) });
};
/**
 * 搜索时，获取某一项select搜索项中options里搜索匹配到的options
 * @returns options
 */
export var getFilterOptions = function (_a) {
    var _b;
    var fuzzyConfig = _a.fuzzyConfig, filterUserInput = _a.filterUserInput, searchWord = _a.searchWord, item = _a.item, values = _a.values;
    var options = item === null || item === void 0 ? void 0 : item.options;
    if (!options)
        return options !== null && options !== void 0 ? options : [];
    var _searchWord = fuzzyConfig ? filterUserInput(searchWord) : searchWord === null || searchWord === void 0 ? void 0 : searchWord.toLowerCase();
    if (_searchWord && item && (fuzzyConfig === null || fuzzyConfig === void 0 ? void 0 : fuzzyConfig.enableSearch) !== false) {
        options = fuzzyDefualtFilterOptions({
            searchWord: (_b = _searchWord.trim().replace(/^,|,$/g, '').split(',').filter(Boolean)) !== null && _b !== void 0 ? _b : [],
            item: item,
            fuzzyConfig: fuzzyConfig ? fuzzyConfig : { target: 'both', letterCase: 'ignore' },
            params: values,
        }).options;
    }
    return options;
};
//# sourceMappingURL=utils.js.map