"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCCombineSearch = void 0;
var tslib_1 = require("tslib");
var ahooks_1 = require("ahooks");
var lodash_es_1 = require("lodash-es");
var react_1 = require("react");
var CConfigProvider_1 = require("../../CConfigProvider");
var useCacheValue_1 = require("../../hooks/useCacheValue");
var utils_1 = require("../utils");
var utils_2 = require("../CCombineSearch/utils");
var useCCombineSearch = function (props) {
    var _a, _b, _c, _d;
    var cacheKey = props.cacheKey, defaultField = props.defaultField, defaultValue = props.defaultValue, _e = props.fuzzy, fuzzy = _e === void 0 ? false : _e, fuzzyConfig = props.fuzzyConfig, _f = props.list, list = _f === void 0 ? [] : _f, enableEdit = props.enableEdit, _g = props.onChange, onChange = _g === void 0 ? lodash_es_1.noop : _g, _placeholder = props.placeholder, validator = props.validator, value = props.value;
    var _h = tslib_1.__read((0, useCacheValue_1.useCacheValue)({ value: value, defaultValue: defaultValue, cacheKey: cacheKey }, {}), 2), cacheValue = _h[0], setCacheValue = _h[1];
    var _j = tslib_1.__read((0, react_1.useState)((0, utils_1.transformToComponentParams)(cacheValue, list)), 2), params = _j[0], setParams = _j[1];
    var _k = tslib_1.__read((0, react_1.useState)(), 2), currentFieldName = _k[0], setCurrentFieldName = _k[1];
    var current = (_a = list.find(function (v) { return v.fieldName === currentFieldName; })) !== null && _a !== void 0 ? _a : null;
    var _l = tslib_1.__read((0, react_1.useState)('default'), 2), status = _l[0], setStatus = _l[1];
    // 临时值
    var _m = tslib_1.__read((0, react_1.useState)((0, utils_1.getCurrentValue)(params, current)), 2), tempValue = _m[0], setTempValue = _m[1];
    // 单选和多选进行搜索时的搜索词
    var _o = tslib_1.__read((0, react_1.useState)(), 2), searchWord = _o[0], setSearchWord = _o[1];
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    var _p = tslib_1.__read((0, ahooks_1.useSetState)({ errState: false }), 2), state = _p[0], setState = _p[1];
    var edit = ((_c = (_b = current === null || current === void 0 ? void 0 : current.viewItemConfig) === null || _b === void 0 ? void 0 : _b.enableEdit) !== null && _c !== void 0 ? _c : enableEdit) !== false;
    var updateParams = function (val, replace) {
        var err = validator === null || validator === void 0 ? void 0 : validator({
            value: val,
            prevValues: params,
            newValues: (0, utils_1.dropUndefined)(replace ? val : tslib_1.__assign(tslib_1.__assign({}, params), val)),
        });
        if (err) {
            setState({ errState: true });
            setTimeout(function () {
                setState({ errState: false });
            }, 1000);
            return;
        }
        setParams(function (v) { return (0, utils_1.dropUndefined)(replace ? val : tslib_1.__assign(tslib_1.__assign({}, v), val)); });
    };
    var updateState = function (status, current) {
        if (!(0, lodash_es_1.isUndefined)(current)) {
            setCurrentFieldName(current === null || current === void 0 ? void 0 : current.fieldName);
        }
        setStatus(status);
    };
    var search = function () {
        setCacheValue(params);
        var _params = (0, utils_1.transformToSearchParams)(params, list);
        onChange(_params);
    };
    var resetCurrent = function () {
        updateState('default', null);
    };
    var updateTempValue = function (val) {
        setTempValue(val);
        if (fuzzy && val) {
            setStatus('value');
        }
    };
    var updateSearchWord = function (val) {
        setSearchWord(val);
    };
    var updateSearchField = function (field) {
        var option = list.find(function (v) { return v.fieldName === field; });
        if (option) {
            updateState('value', option);
        }
    };
    var updateSearchValue = function (val, field) {
        var _a;
        var fieldName = field || (current === null || current === void 0 ? void 0 : current.fieldName) || list[0].fieldName;
        // 数组为空或者空字符串时，删除该筛选字段
        var value = val;
        if ((0, lodash_es_1.isArray)(val) && !val.length) {
            value = undefined;
        }
        else if ((0, lodash_es_1.isString)(val) && !val) {
            value = undefined;
        }
        else if ((0, lodash_es_1.isPlainObject)(val) && !Object.keys(val).length) {
            value = undefined;
        }
        if (fieldName) {
            updateParams((_a = {}, _a[fieldName] = value, _a));
            updateState('default', null);
        }
    };
    var resetParams = function () {
        updateParams({}, true);
        updateState('default', null);
    };
    /** 模糊搜索相关参数 */
    var filterUserInput = (0, utils_2.getCombineFilterUserInput)(fuzzy, fuzzyConfig);
    (0, react_1.useEffect)(function () {
        updateTempValue((0, utils_1.getCurrentValue)(params, current));
    }, [params]);
    (0, react_1.useEffect)(function () {
        if (edit) {
            updateTempValue((0, utils_1.getCurrentValue)(params, current));
        }
        else {
            updateTempValue(undefined);
        }
    }, [currentFieldName]);
    (0, react_1.useEffect)(function () {
        var _a;
        if ((current === null || current === void 0 ? void 0 : current.type) === 'select') {
            (_a = current.onSearch) === null || _a === void 0 ? void 0 : _a.call(current, {
                searchWord: searchWord,
                item: current,
                filterOptions: (0, utils_1.getCSearchCombineFilterOptions)({
                    fuzzyConfig: tslib_1.__assign(tslib_1.__assign({}, fuzzyConfig), current.fuzzyConfig),
                    values: params,
                    filterUserInput: filterUserInput,
                    item: current,
                    searchWord: searchWord,
                }),
            });
        }
    }, [searchWord]);
    var handleFuzzySearch = (0, react_1.useCallback)((0, lodash_es_1.debounce)(function (fuzzyConfig, searchWord, list, values, filterUserInput) {
        var _a;
        var filterList = list
            .filter(function (el) {
            return el.type === 'select';
        })
            .map(function (el) {
            return tslib_1.__assign(tslib_1.__assign({}, el), { options: (0, utils_1.getCSearchCombineFilterOptions)({
                    fuzzyConfig: fuzzyConfig,
                    values: values,
                    filterUserInput: filterUserInput,
                    item: el,
                    searchWord: searchWord,
                }) });
        });
        (_a = fuzzyConfig === null || fuzzyConfig === void 0 ? void 0 : fuzzyConfig.onSearch) === null || _a === void 0 ? void 0 : _a.call(fuzzyConfig, { searchWord: searchWord, list: list, values: values, filterList: filterList });
    }, (_d = fuzzyConfig === null || fuzzyConfig === void 0 ? void 0 : fuzzyConfig.searchHandleDebounce) !== null && _d !== void 0 ? _d : 200), []);
    (0, ahooks_1.useUpdateEffect)(function () {
        if (fuzzy && !current && status === 'value') {
            handleFuzzySearch(fuzzyConfig, tempValue, list, params, filterUserInput);
        }
    }, [tempValue]);
    // 受控模式下，传入value变化，需要更新内部状态
    (0, ahooks_1.useDeepCompareEffect)(function () {
        if (!(0, lodash_es_1.isUndefined)(value) && !(0, lodash_es_1.isEqual)(value, params)) {
            updateParams((0, utils_1.transformToComponentParams)(value, list), true);
        }
    }, [value]);
    (0, ahooks_1.useUpdateEffect)(search, [params]);
    var placeholder = (0, utils_2.getConbineSearchPlaceholder)(status, current, locale, _placeholder);
    return [
        {
            list: list,
            tempValue: tempValue,
            params: params,
            status: status,
            current: current,
            placeholder: placeholder,
            defaultField: (0, utils_2.getDefaultFieldConfig)(defaultField),
            searchWord: searchWord,
            errState: state.errState,
            filterUserInput: filterUserInput,
        },
        {
            updateParams: updateParams,
            updateState: updateState,
            search: search,
            resetCurrent: resetCurrent,
            updateTempValue: updateTempValue,
            updateSearchField: updateSearchField,
            updateSearchValue: updateSearchValue,
            resetParams: resetParams,
            updateSearchWord: updateSearchWord,
        },
    ];
};
exports.useCCombineSearch = useCCombineSearch;
//# sourceMappingURL=useCCombineSearch.js.map