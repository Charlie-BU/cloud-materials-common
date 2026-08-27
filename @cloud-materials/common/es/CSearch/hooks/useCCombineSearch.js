import { __assign, __read } from "tslib";
import { useDeepCompareEffect, useSetState, useUpdateEffect } from 'ahooks';
import { debounce, isArray, isEqual, isPlainObject, isString, isUndefined, noop } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';
import { useCConfigContext } from '../../CConfigProvider';
import { useCacheValue } from '../../hooks/useCacheValue';
import { dropUndefined, transformToSearchParams, transformToComponentParams, getCurrentValue, getCSearchCombineFilterOptions, } from '../utils';
import { getCombineFilterUserInput, getConbineSearchPlaceholder, getDefaultFieldConfig } from '../CCombineSearch/utils';
export var useCCombineSearch = function (props) {
    var _a, _b, _c, _d;
    var cacheKey = props.cacheKey, defaultField = props.defaultField, defaultValue = props.defaultValue, _e = props.fuzzy, fuzzy = _e === void 0 ? false : _e, fuzzyConfig = props.fuzzyConfig, _f = props.list, list = _f === void 0 ? [] : _f, enableEdit = props.enableEdit, _g = props.onChange, onChange = _g === void 0 ? noop : _g, _placeholder = props.placeholder, validator = props.validator, value = props.value;
    var _h = __read(useCacheValue({ value: value, defaultValue: defaultValue, cacheKey: cacheKey }, {}), 2), cacheValue = _h[0], setCacheValue = _h[1];
    var _j = __read(useState(transformToComponentParams(cacheValue, list)), 2), params = _j[0], setParams = _j[1];
    var _k = __read(useState(), 2), currentFieldName = _k[0], setCurrentFieldName = _k[1];
    var current = (_a = list.find(function (v) { return v.fieldName === currentFieldName; })) !== null && _a !== void 0 ? _a : null;
    var _l = __read(useState('default'), 2), status = _l[0], setStatus = _l[1];
    // 临时值
    var _m = __read(useState(getCurrentValue(params, current)), 2), tempValue = _m[0], setTempValue = _m[1];
    // 单选和多选进行搜索时的搜索词
    var _o = __read(useState(), 2), searchWord = _o[0], setSearchWord = _o[1];
    var locale = useCConfigContext().locale;
    var _p = __read(useSetState({ errState: false }), 2), state = _p[0], setState = _p[1];
    var edit = ((_c = (_b = current === null || current === void 0 ? void 0 : current.viewItemConfig) === null || _b === void 0 ? void 0 : _b.enableEdit) !== null && _c !== void 0 ? _c : enableEdit) !== false;
    var updateParams = function (val, replace) {
        var err = validator === null || validator === void 0 ? void 0 : validator({
            value: val,
            prevValues: params,
            newValues: dropUndefined(replace ? val : __assign(__assign({}, params), val)),
        });
        if (err) {
            setState({ errState: true });
            setTimeout(function () {
                setState({ errState: false });
            }, 1000);
            return;
        }
        setParams(function (v) { return dropUndefined(replace ? val : __assign(__assign({}, v), val)); });
    };
    var updateState = function (status, current) {
        if (!isUndefined(current)) {
            setCurrentFieldName(current === null || current === void 0 ? void 0 : current.fieldName);
        }
        setStatus(status);
    };
    var search = function () {
        setCacheValue(params);
        var _params = transformToSearchParams(params, list);
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
        if (isArray(val) && !val.length) {
            value = undefined;
        }
        else if (isString(val) && !val) {
            value = undefined;
        }
        else if (isPlainObject(val) && !Object.keys(val).length) {
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
    var filterUserInput = getCombineFilterUserInput(fuzzy, fuzzyConfig);
    useEffect(function () {
        updateTempValue(getCurrentValue(params, current));
    }, [params]);
    useEffect(function () {
        if (edit) {
            updateTempValue(getCurrentValue(params, current));
        }
        else {
            updateTempValue(undefined);
        }
    }, [currentFieldName]);
    useEffect(function () {
        var _a;
        if ((current === null || current === void 0 ? void 0 : current.type) === 'select') {
            (_a = current.onSearch) === null || _a === void 0 ? void 0 : _a.call(current, {
                searchWord: searchWord,
                item: current,
                filterOptions: getCSearchCombineFilterOptions({
                    fuzzyConfig: __assign(__assign({}, fuzzyConfig), current.fuzzyConfig),
                    values: params,
                    filterUserInput: filterUserInput,
                    item: current,
                    searchWord: searchWord,
                }),
            });
        }
    }, [searchWord]);
    var handleFuzzySearch = useCallback(debounce(function (fuzzyConfig, searchWord, list, values, filterUserInput) {
        var _a;
        var filterList = list
            .filter(function (el) {
            return el.type === 'select';
        })
            .map(function (el) {
            return __assign(__assign({}, el), { options: getCSearchCombineFilterOptions({
                    fuzzyConfig: fuzzyConfig,
                    values: values,
                    filterUserInput: filterUserInput,
                    item: el,
                    searchWord: searchWord,
                }) });
        });
        (_a = fuzzyConfig === null || fuzzyConfig === void 0 ? void 0 : fuzzyConfig.onSearch) === null || _a === void 0 ? void 0 : _a.call(fuzzyConfig, { searchWord: searchWord, list: list, values: values, filterList: filterList });
    }, (_d = fuzzyConfig === null || fuzzyConfig === void 0 ? void 0 : fuzzyConfig.searchHandleDebounce) !== null && _d !== void 0 ? _d : 200), []);
    useUpdateEffect(function () {
        if (fuzzy && !current && status === 'value') {
            handleFuzzySearch(fuzzyConfig, tempValue, list, params, filterUserInput);
        }
    }, [tempValue]);
    // 受控模式下，传入value变化，需要更新内部状态
    useDeepCompareEffect(function () {
        if (!isUndefined(value) && !isEqual(value, params)) {
            updateParams(transformToComponentParams(value, list), true);
        }
    }, [value]);
    useUpdateEffect(search, [params]);
    var placeholder = getConbineSearchPlaceholder(status, current, locale, _placeholder);
    return [
        {
            list: list,
            tempValue: tempValue,
            params: params,
            status: status,
            current: current,
            placeholder: placeholder,
            defaultField: getDefaultFieldConfig(defaultField),
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
//# sourceMappingURL=useCCombineSearch.js.map