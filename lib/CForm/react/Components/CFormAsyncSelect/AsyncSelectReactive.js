"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var lodash_es_1 = require("lodash-es");
var RectiveWithCForm_1 = tslib_1.__importDefault(require("../RectiveWithCForm"));
var react_2 = require("@formily/react");
var useCForm_1 = require("../../hooks/useCForm");
var ahooks_1 = require("ahooks");
var _1 = tslib_1.__importDefault(require("."));
var CFormAsyncSelectSeletedOption = 'CFormAsyncSelectSeletedOption';
/**
 * @description 注意！！！field.data会用来存储已经选择的选项，针对选择后切换步骤，导致组件卸载，状态丢失，显示value而不是label
 */
var CFormAsyncSelectReactive = (0, RectiveWithCForm_1.default)(function (props) {
    var _a, _b;
    var _c = props.dataDepValues, dataDepValues = _c === void 0 ? {} : _c, _d = props.depValues, depValues = _d === void 0 ? {} : _d, _e = props.disableDepsResetValue, disableDepsResetValue = _e === void 0 ? false : _e, _f = props.enableCacheOption, enableCacheOption = _f === void 0 ? true : _f, labelInValue = props.labelInValue, rest = tslib_1.__rest(props, ["dataDepValues", "depValues", "disableDepsResetValue", "enableCacheOption", "labelInValue"]);
    var innerRef = (0, react_1.useRef)(null);
    var ref = (_a = props.ref) !== null && _a !== void 0 ? _a : innerRef;
    var field = (0, react_2.useField)();
    var form = (0, useCForm_1.useCForm)();
    var _g = tslib_1.__read((0, react_1.useState)(), 2), dataSource = _g[0], setDataSource = _g[1];
    var processedFetchData = function (originalProps) {
        var _a;
        return (_a = props.fetchData) === null || _a === void 0 ? void 0 : _a.call(props, tslib_1.__assign(tslib_1.__assign({}, originalProps), { depValues: depValues, dataDepValues: dataDepValues, form: form, field: field }));
    };
    var processedFetchInitData = (0, lodash_es_1.isFunction)(props.fetchInitData)
        ? function () {
            return props.fetchInitData(form, field);
        }
        : undefined;
    var onDataSourceChange = function (newDataSource) {
        var _a;
        setDataSource(newDataSource);
        field.setDataSource(newDataSource === null || newDataSource === void 0 ? void 0 : newDataSource.list);
        (_a = props.onDataSourceChange) === null || _a === void 0 ? void 0 : _a.call(props, newDataSource);
    };
    var onFetchDataLoadingChange = function (loading) {
        var _a;
        field.loading = loading;
        (_a = props.onFetchDataLoadingChange) === null || _a === void 0 ? void 0 : _a.call(props, loading);
    };
    var onChange = function (value, options) {
        var _a;
        var _b;
        if (enableCacheOption) {
            field.setData(tslib_1.__assign(tslib_1.__assign({}, (typeof field.data === 'object' ? field.data : {})), (_a = {}, _a[CFormAsyncSelectSeletedOption] = value, _a)));
        }
        var val = value;
        if (!labelInValue) {
            val = Array.isArray(value) ? value.map(function (el) { return el === null || el === void 0 ? void 0 : el.value; }) : value === null || value === void 0 ? void 0 : value.value;
        }
        (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, val, options);
    };
    // 通过 CFormAsyncSelect labelInValue为true并结合在field.data中存储，解决切换步骤导致label丢失的问题
    // 因此这些函数直接传给CFormAsyncSelect，参数中value会是LabeledValue，需要根据设置的labelInValue处理一下
    if (rest.renderFormat) {
        var customRenderFormat_1 = rest.renderFormat;
        rest.renderFormat = function (option, value) {
            return customRenderFormat_1(option, labelInValue ? value : (0, lodash_es_1.isObject)(value) ? value.value : value);
        };
    }
    if (rest.onSelect) {
        var customOnSelect_1 = rest.onSelect;
        rest.onSelect = function (value, option) {
            return customOnSelect_1(labelInValue ? value : (0, lodash_es_1.isObject)(value) ? value.value : value, option);
        };
    }
    if (rest.onDeselect) {
        var customOnDeselect_1 = rest.onDeselect;
        rest.onDeselect = function (value, option) {
            return customOnDeselect_1(labelInValue ? value : (0, lodash_es_1.isObject)(value) ? value.value : value, option);
        };
    }
    (0, ahooks_1.useUpdateEffect)(function () {
        var _a, _b;
        if (disableDepsResetValue) {
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.refresh(false);
        }
        else {
            (_b = ref.current) === null || _b === void 0 ? void 0 : _b.reset();
        }
    }, [depValues, dataDepValues]);
    (0, ahooks_1.useUpdateEffect)(function () {
        if ((0, lodash_es_1.isUndefined)(field.dataSource)) {
            setDataSource(undefined);
        }
    }, [field.dataSource]);
    // 避免直接设置field.value，导致与field.data中存储不一致的情况
    var value = field.value;
    var cacheVal = (_b = field.data) === null || _b === void 0 ? void 0 : _b[CFormAsyncSelectSeletedOption];
    if (cacheVal &&
        (0, lodash_es_1.isEqual)(Array.isArray(cacheVal)
            ? cacheVal.map(function (el) { return el.value; })
            : typeof cacheVal === 'object'
                ? cacheVal.value
                : cacheVal, value)) {
        value = cacheVal;
    }
    return (react_1.default.createElement(_1.default, tslib_1.__assign({}, rest, { dataSource: (0, lodash_es_1.isUndefined)(dataSource)
            ? dataSource
            : tslib_1.__assign(tslib_1.__assign({}, dataSource), { list: field.dataSource }), enableRemoteLoadWhenDataSourceControlled: true, fetchData: processedFetchData, fetchInitData: processedFetchInitData, labelInValue: true, loading: field.loading, onChange: onChange, onDataSourceChange: onDataSourceChange, onFetchDataLoadingChange: onFetchDataLoadingChange, ref: ref, value: value })));
});
var CFormAsyncSelectReactiveConnnect = (0, react_2.connect)(CFormAsyncSelectReactive, (0, react_2.mapReadPretty)(function () {
    var _a, _b, _c;
    var field = (0, react_2.useField)();
    var value = field.value;
    // labelInValue
    var cacheVal = (_a = field.data) === null || _a === void 0 ? void 0 : _a[CFormAsyncSelectSeletedOption];
    if (cacheVal &&
        (0, lodash_es_1.isEqual)(Array.isArray(cacheVal)
            ? cacheVal.map(function (el) { return el.value; })
            : typeof cacheVal === 'object'
                ? cacheVal.value
                : cacheVal, value)) {
        if (Array.isArray(cacheVal) || typeof cacheVal === 'object') {
            var newCacheVal = Array.isArray(cacheVal) ? cacheVal : [cacheVal];
            if (newCacheVal.some(function (el) { return typeof el.label !== 'string' || typeof el.label !== 'number'; })) {
                return newCacheVal.map(function (el) { return el.label; }).join(', ');
            }
            else {
                return newCacheVal.map(function (el) { return el.value; }).join(', ');
            }
        }
        else {
            return (_b = field.value) !== null && _b !== void 0 ? _b : '-';
        }
    }
    return Array.isArray(field.value) ? field.value.join(', ') : (_c = field.value) !== null && _c !== void 0 ? _c : '-';
}));
exports.default = CFormAsyncSelectReactiveConnnect;
//# sourceMappingURL=AsyncSelectReactive.js.map