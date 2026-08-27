import { __assign, __read, __rest } from "tslib";
import React, { useRef, useState } from 'react';
import { useField } from '@formily/react';
import CAsyncSelect from '../../../../CAsyncSelect';
import { isEqual, isFunction } from 'lodash-es';
import { useCForm } from '../../hooks';
import reactiveWithCForm from '../RectiveWithCForm';
import { useUpdateEffect } from 'ahooks';
export var CAsyncSelectForm = reactiveWithCForm(function (props) {
    var _a, _b;
    var _c = props.disableDepsResetValue, disableDepsResetValue = _c === void 0 ? false : _c, _d = props.depValues, depValues = _d === void 0 ? {} : _d, _e = props.dataDepValues, dataDepValues = _e === void 0 ? {} : _e, rest = __rest(props, ["disableDepsResetValue", "depValues", "dataDepValues"]);
    var innerRef = useRef(null);
    var ref = (_a = props.ref) !== null && _a !== void 0 ? _a : innerRef;
    var field = useField();
    var form = useCForm();
    // 是否需要在focus事件时，触发重新加载
    var _f = __read(useState(false), 2), refreshOnFocus = _f[0], setRefreshOnFocus = _f[1];
    var _g = __read(useState({
        page: 1,
        list: ((_b = field.dataSource) !== null && _b !== void 0 ? _b : []),
        noMore: false,
    }), 2), dataSource = _g[0], setDataSource = _g[1];
    var processedFetchData = function (_a) {
        var page = _a.page, searchWord = _a.searchWord, cacheData = _a.cacheData;
        return props.fetchData({
            page: page,
            searchWord: searchWord,
            cacheData: cacheData,
            depValues: depValues,
            dataDepValues: dataDepValues,
            form: form,
            field: field,
        });
    };
    var processedFetchInitData = isFunction(props.fetchInitData)
        ? function () {
            return props.fetchInitData(form, field);
        }
        : undefined;
    // 重新加载数据的函数
    var reloadData = function () {
        var _a, _b;
        if (!disableDepsResetValue)
            (_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.reset();
        else
            (_b = ref === null || ref === void 0 ? void 0 : ref.current) === null || _b === void 0 ? void 0 : _b.refresh();
    };
    // 依赖发生变化时，进行相应的处理
    useUpdateEffect(function () {
        // 初始化时，默认不做清空操作
        // 依赖发生变化时，立即将dataSource置为空
        setDataSource({ page: 1, list: [], noMore: false });
        field.dataSource = [];
        // 如果配置了 依赖重置异步下拉组件的value，并且当前不是依赖第一次发生变化：则清除value
        if (!disableDepsResetValue)
            field.value = props.mode === 'multiple' ? [] : undefined;
        // 依赖改变时，如果配置了autoLoad，立即触发重新加载
        if (props.autoLoad)
            reloadData();
        // 依赖改变时，如果没有配置autoLoad，设置refreshOnFocus为true，等组件onFocus时消费refreshOnFocus，触发重新加载
        else
            setRefreshOnFocus(true);
    }, [depValues, dataDepValues]);
    return (React.createElement(CAsyncSelect, __assign({ onError: function (e) {
            console.error(e);
        } }, rest, { ref: ref, fetchData: processedFetchData, fetchInitData: processedFetchInitData, onFocus: function (e) {
            var _a;
            if (refreshOnFocus) {
                reloadData();
                setRefreshOnFocus(false);
            }
            (_a = props === null || props === void 0 ? void 0 : props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
        }, dataSource: dataSource, 
        // 仅配置了该字段才能实现组件value的受控
        isControlStateChange: true, onDataSourceChange: function (dataSource) {
            var _a, _b;
            var currentList = (_a = dataSource === null || dataSource === void 0 ? void 0 : dataSource.list) !== null && _a !== void 0 ? _a : [];
            // 数据源改变时，将数据源同步到field.dataSource
            var fieldDataSource = field.dataSource;
            if (!isEqual(currentList, fieldDataSource)) {
                field.setDataSource(currentList);
                setDataSource(dataSource);
            }
            (_b = rest === null || rest === void 0 ? void 0 : rest.onDataSourceChange) === null || _b === void 0 ? void 0 : _b.call(rest, dataSource);
        } })));
});
export default CAsyncSelectForm;
//# sourceMappingURL=index.js.map