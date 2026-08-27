"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCSearch = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var ahooks_1 = require("ahooks");
var utils_1 = require("../utils");
var useCacheValue_1 = require("../../hooks/useCacheValue");
var lodash_es_1 = require("lodash-es");
var useDebounceHandler_1 = require("./useDebounceHandler");
var useCSearch = function (props) {
    var _a = props.list, list = _a === void 0 ? [] : _a, onChange = props.onChange, value = props.value, defaultValue = props.defaultValue, _b = props.displayCount, displayCount = _b === void 0 ? utils_1.DEFAULT_DISPLAY_COUNT : _b, manual = props.manual, cacheKey = props.cacheKey, debounceOptions = props.debounceOptions, defaultCollapseVisible = props.defaultCollapseVisible, onCollapseVisibleChange = props.onCollapseVisibleChange;
    var _c = tslib_1.__read((0, ahooks_1.useBoolean)(defaultCollapseVisible), 2), advanceVisible = _c[0], set = _c[1].set;
    var _d = tslib_1.__read((0, useCacheValue_1.useCacheValue)({ value: value, defaultValue: defaultValue, cacheKey: cacheKey }, {}), 2), cacheValue = _d[0], setCacheValue = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(cacheValue), 2), params = _e[0], setParams = _e[1];
    var isReplace = (0, react_1.useRef)(false);
    var validList = list.filter(function (item) { return item.visible !== false; });
    var displayList = validList.slice(0, displayCount);
    var advanceList = validList.slice(displayCount);
    var activeAdvanceCount = advanceList.reduce(function (total, cur) {
        if (!(0, lodash_es_1.isUndefined)(cur.fieldName) && !(0, lodash_es_1.isUndefined)(params[cur.fieldName])) {
            total++;
        }
        return total;
    }, 0);
    var _f = (0, useDebounceHandler_1.useDebounceHandler)({ onChange: onChange, debounceOptions: debounceOptions }), handleChange = _f.handleChange, debounceHandleChange = _f.debounceHandleChange;
    var updateParams = function (val, replace) {
        isReplace.current = !!replace;
        setParams(function (v) { return (0, utils_1.dropUndefined)(replace ? val : tslib_1.__assign(tslib_1.__assign({}, v), val)); });
    };
    var resetParams = function () {
        updateParams({}, true);
    };
    var resetAdvanceParams = function () {
        updateParams(Object.fromEntries(advanceList.filter(function (_a) {
            var fieldName = _a.fieldName;
            return !(0, lodash_es_1.isUndefined)(fieldName);
        }).map(function (_a) {
            var fieldName = _a.fieldName;
            return [fieldName, undefined];
        })));
    };
    var search = function (flush) {
        setCacheValue(params);
        flush ? handleChange(params) : debounceHandleChange(params);
    };
    (0, ahooks_1.useDeepCompareEffect)(function () {
        if (!(0, lodash_es_1.isUndefined)(value) && !(0, lodash_es_1.isEqual)((0, utils_1.dropUndefined)(value), params)) {
            updateParams(value, true);
        }
    }, [value]);
    var showManual = !!manual;
    (0, ahooks_1.useUpdateEffect)(function () {
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
exports.useCSearch = useCSearch;
//# sourceMappingURL=useCSearch.js.map