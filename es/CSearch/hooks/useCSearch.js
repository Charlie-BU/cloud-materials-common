import { __assign, __read } from "tslib";
import { useRef, useState } from 'react';
import { useBoolean, useDeepCompareEffect, useUpdateEffect } from 'ahooks';
import { DEFAULT_DISPLAY_COUNT, dropUndefined } from '../utils';
import { useCacheValue } from '../../hooks/useCacheValue';
import { isEqual, isUndefined } from 'lodash-es';
import { useDebounceHandler } from './useDebounceHandler';
export var useCSearch = function (props) {
    var _a = props.list, list = _a === void 0 ? [] : _a, onChange = props.onChange, value = props.value, defaultValue = props.defaultValue, _b = props.displayCount, displayCount = _b === void 0 ? DEFAULT_DISPLAY_COUNT : _b, manual = props.manual, cacheKey = props.cacheKey, debounceOptions = props.debounceOptions, defaultCollapseVisible = props.defaultCollapseVisible, onCollapseVisibleChange = props.onCollapseVisibleChange;
    var _c = __read(useBoolean(defaultCollapseVisible), 2), advanceVisible = _c[0], set = _c[1].set;
    var _d = __read(useCacheValue({ value: value, defaultValue: defaultValue, cacheKey: cacheKey }, {}), 2), cacheValue = _d[0], setCacheValue = _d[1];
    var _e = __read(useState(cacheValue), 2), params = _e[0], setParams = _e[1];
    var isReplace = useRef(false);
    var validList = list.filter(function (item) { return item.visible !== false; });
    var displayList = validList.slice(0, displayCount);
    var advanceList = validList.slice(displayCount);
    var activeAdvanceCount = advanceList.reduce(function (total, cur) {
        if (!isUndefined(cur.fieldName) && !isUndefined(params[cur.fieldName])) {
            total++;
        }
        return total;
    }, 0);
    var _f = useDebounceHandler({ onChange: onChange, debounceOptions: debounceOptions }), handleChange = _f.handleChange, debounceHandleChange = _f.debounceHandleChange;
    var updateParams = function (val, replace) {
        isReplace.current = !!replace;
        setParams(function (v) { return dropUndefined(replace ? val : __assign(__assign({}, v), val)); });
    };
    var resetParams = function () {
        updateParams({}, true);
    };
    var resetAdvanceParams = function () {
        updateParams(Object.fromEntries(advanceList.filter(function (_a) {
            var fieldName = _a.fieldName;
            return !isUndefined(fieldName);
        }).map(function (_a) {
            var fieldName = _a.fieldName;
            return [fieldName, undefined];
        })));
    };
    var search = function (flush) {
        setCacheValue(params);
        flush ? handleChange(params) : debounceHandleChange(params);
    };
    useDeepCompareEffect(function () {
        if (!isUndefined(value) && !isEqual(dropUndefined(value), params)) {
            updateParams(value, true);
        }
    }, [value]);
    var showManual = !!manual;
    useUpdateEffect(function () {
        if (!showManual || isReplace.current) {
            search();
        }
    }, [showManual, params]);
    return [
        {
            displayList: displayList,
            advanceList: advanceList,
            activeAdvanceCount: activeAdvanceCount,
            manual: manual,
            advanceVisible: advanceVisible,
            params: params,
        },
        {
            toggleAdvanceVisible: function () {
                var _advanceVisible = !advanceVisible;
                set(_advanceVisible);
                onCollapseVisibleChange === null || onCollapseVisibleChange === void 0 ? void 0 : onCollapseVisibleChange(_advanceVisible);
            },
            search: search,
            updateParams: updateParams,
            resetParams: resetParams,
            resetAdvanceParams: resetAdvanceParams,
        },
    ];
};
//# sourceMappingURL=useCSearch.js.map