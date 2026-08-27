import { __assign, __read, __rest } from "tslib";
import React, { useRef, useState } from 'react';
import { isEqual, isFunction, isObject, isUndefined } from 'lodash-es';
import reactiveWithCForm from '../RectiveWithCForm';
import { connect, mapReadPretty, useField } from '@formily/react';
import { useCForm } from '../../hooks/useCForm';
import { useUpdateEffect } from 'ahooks';
import CFormAsyncSelect from '.';
var CFormAsyncSelectSeletedOption = 'CFormAsyncSelectSeletedOption';
/**
 * @description 注意！！！field.data会用来存储已经选择的选项，针对选择后切换步骤，导致组件卸载，状态丢失，显示value而不是label
 */
var CFormAsyncSelectReactive = reactiveWithCForm(function (props) {
    var _a, _b;
    var _c = props.dataDepValues, dataDepValues = _c === void 0 ? {} : _c, _d = props.depValues, depValues = _d === void 0 ? {} : _d, _e = props.disableDepsResetValue, disableDepsResetValue = _e === void 0 ? false : _e, _f = props.enableCacheOption, enableCacheOption = _f === void 0 ? true : _f, labelInValue = props.labelInValue, rest = __rest(props, ["dataDepValues", "depValues", "disableDepsResetValue", "enableCacheOption", "labelInValue"]);
    var innerRef = useRef(null);
    var ref = (_a = props.ref) !== null && _a !== void 0 ? _a : innerRef;
    var field = useField();
    var form = useCForm();
    var _g = __read(useState(), 2), dataSource = _g[0], setDataSource = _g[1];
    var processedFetchData = function (originalProps) {
        var _a;
        return (_a = props.fetchData) === null || _a === void 0 ? void 0 : _a.call(props, __assign(__assign({}, originalProps), { depValues: depValues, dataDepValues: dataDepValues, form: form, field: field }));
    };
    var processedFetchInitData = isFunction(props.fetchInitData)
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
            field.setData(__assign(__assign({}, (typeof field.data === 'object' ? field.data : {})), (_a = {}, _a[CFormAsyncSelectSeletedOption] = value, _a)));
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
            return customRenderFormat_1(option, labelInValue ? value : isObject(value) ? value.value : value);
        };
    }
    if (rest.onSelect) {
        var customOnSelect_1 = rest.onSelect;
        rest.onSelect = function (value, option) {
            return customOnSelect_1(labelInValue ? value : isObject(value) ? value.value : value, option);
        };
    }
    if (rest.onDeselect) {
        var customOnDeselect_1 = rest.onDeselect;
        rest.onDeselect = function (value, option) {
            return customOnDeselect_1(labelInValue ? value : isObject(value) ? value.value : value, option);
        };
    }
    useUpdateEffect(function () {
        var _a, _b;
        if (disableDepsResetValue) {
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.refresh(false);
        }
        else {
            (_b = ref.current) === null || _b === void 0 ? void 0 : _b.reset();
        }
    }, [depValues, dataDepValues]);
    useUpdateEffect(function () {
        if (isUndefined(field.dataSource)) {
            setDataSource(undefined);
        }
    }, [field.dataSource]);
    // 避免直接设置field.value，导致与field.data中存储不一致的情况
    var value = field.value;
    var cacheVal = (_b = field.data) === null || _b === void 0 ? void 0 : _b[CFormAsyncSelectSeletedOption];
    if (cacheVal &&
        isEqual(Array.isArray(cacheVal)
            ? cacheVal.map(function (el) { return el.value; })
            : typeof cacheVal === 'object'
                ? cacheVal.value
                : cacheVal, value)) {
        value = cacheVal;
    }
    return (React.createElement(CFormAsyncSelect, __assign({}, rest, { dataSource: isUndefined(dataSource)
            ? dataSource
            : __assign(__assign({}, dataSource), { list: field.dataSource }), enableRemoteLoadWhenDataSourceControlled: true, fetchData: processedFetchData, fetchInitData: processedFetchInitData, labelInValue: true, loading: field.loading, onChange: onChange, onDataSourceChange: onDataSourceChange, onFetchDataLoadingChange: onFetchDataLoadingChange, ref: ref, value: value })));
});
var CFormAsyncSelectReactiveConnnect = connect(CFormAsyncSelectReactive, mapReadPretty(function () {
    var _a, _b, _c;
    var field = useField();
    var value = field.value;
    // labelInValue
    var cacheVal = (_a = field.data) === null || _a === void 0 ? void 0 : _a[CFormAsyncSelectSeletedOption];
    if (cacheVal &&
        isEqual(Array.isArray(cacheVal)
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
export default CFormAsyncSelectReactiveConnnect;
//# sourceMappingURL=AsyncSelectReactive.js.map