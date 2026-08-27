import { __assign, __read, __rest, __spreadArray } from "tslib";
import React from 'react';
import { cloneDeep, get } from 'lodash-es';
import TableSelectFilter from './Search';
import { getGlobalContextConfig } from '../../../../CConfigProvider';
export function getColKey(props, data, index) {
    var rowKey = props.rowKey;
    if (!rowKey)
        return undefined;
    if (typeof rowKey === 'function') {
        return rowKey(data, index);
    }
    else {
        return get(data, rowKey);
    }
}
export var getRowClassName = function (row) {
    if (row.data.disabled === 'row') {
        return 'disabled-row';
    }
    return '';
};
/** 获取toolbar配置 */
export var getToolbarConfig = function (props) {
    var filterOptions = props.filterOptions, toolbar = props.toolbar, allValueOption = props.allValueOption;
    var locale = getGlobalContextConfig().locale;
    var options = [];
    filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.forEach(function (option) {
        // option: 表头筛选组件的配置
        var name = option.name, _a = option.visible, visible = _a === void 0 ? true : _a, _b = option.componentProps, componentProps = _b === void 0 ? {} : _b, restOptions = __rest(option, ["name", "visible", "componentProps"]);
        var _c = componentProps, filterDataSource = _c.options, defaultValue = _c.defaultValue;
        // 复制一遍，不修改原来的componentProps;
        var tableSelectFilterComProps = cloneDeep(componentProps);
        if (allValueOption && filterDataSource) {
            var _d = allValueOption, _e = _d.label, label = _e === void 0 ? locale.CForm.tableSelect.allOptions : _e, _f = _d.value, value = _f === void 0 ? '' : _f, restConfig_1 = __rest(_d, ["label", "value"]);
            Object.assign(tableSelectFilterComProps, {
                options: __spreadArray([__assign({ label: label, value: value }, restConfig_1)], __read(filterDataSource), false),
                defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : value,
            });
        }
        if (visible) {
            options.push({
                component: function (_a) {
                    var onChange = _a.onChange, value = _a.value;
                    return (React.createElement(TableSelectFilter
                    // 同FilterSearch组件属性类型报错，增强了类型，安全跳过
                    , __assign({ 
                        // 同FilterSearch组件属性类型报错，增强了类型，安全跳过
                        componentProps: tableSelectFilterComProps }, restOptions, { key: name, onChange: onChange, value: value })));
                },
                name: name,
                visible: visible,
            });
        }
    });
    if (!toolbar) {
        return { left: options };
    }
    var rows = toolbar.rows, _a = toolbar.left, left = _a === void 0 ? [] : _a, right = toolbar.right, restConfig = __rest(toolbar, ["rows", "left", "right"]);
    // toolbar配置rows属性时，toolbar配置放在第二行
    if (rows) {
        return __assign({ rows: __spreadArray([{ left: options }], __read(rows), false) }, restConfig);
    }
    else {
        //否则toolbar配置left属性和right属性时候，与filterOptions配置在一行
        return __assign({ left: __spreadArray(__spreadArray([], __read(options), false), __read(left), false), right: right }, restConfig);
    }
};
export var formatToLowerCase = function (val) { var _a; return (_a = String(val).toLocaleLowerCase()) !== null && _a !== void 0 ? _a : ''; };
/** 利用table的过滤功能对filterOptions进行过滤 */
export var getColumnFilterDefault = function (props) {
    var columns = props.columns, filterOptions = props.filterOptions;
    if (!(filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.length))
        return columns !== null && columns !== void 0 ? columns : [];
    var filterKeys = filterOptions.map(function (option) { return option.name; });
    var columnConfig = (columns || []).map(function (col) {
        var _a = col.dataIndex, dataIndex = _a === void 0 ? '' : _a, filter = col.filter;
        // 判断是否需要添加默认的过滤逻辑
        var addDefaultFilter = filterKeys.includes(dataIndex) && !filter;
        addDefaultFilter &&
            Object.assign(col, {
                filter: {
                    type: 'searchInput',
                    filterFn: function (_a) {
                        var filterValues = _a.filterValues, rowData = _a.rowData;
                        return formatToLowerCase(rowData[dataIndex]).indexOf(formatToLowerCase(filterValues[dataIndex])) > -1;
                    },
                    hide: true,
                },
            });
        return col;
    });
    return columnConfig;
};
//# sourceMappingURL=utils.js.map