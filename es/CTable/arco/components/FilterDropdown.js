import { __assign } from "tslib";
/*
 * @Author: youjingyu
 * @Date: 2021-09-26 15:04:18
 * @LastEditTime: 2021-10-22 19:01:23
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
import { observer } from '@formily/react';
import { FilterDropdownProvider, renderDecorator } from '../../react';
import { isFn } from '../../shared';
var renderFilterDropdown = function (options, dropdownOptions) {
    var table = options.table, column = options.column;
    var _a = table.plugin.getComponent(column.filterComponentType, {
        scope: 'filter',
    }), Component = _a.Component, defaultComponentProps = _a.defaultComponentProps;
    if (!Component) {
        return null;
    }
    var componentProps = column.filterComponentProps;
    var modelProps = __assign({}, options);
    if (isFn(componentProps)) {
        componentProps = componentProps(modelProps);
    }
    return React.createElement(Component, __assign({}, defaultComponentProps, componentProps, modelProps, { dropdownOptions: dropdownOptions }));
};
export var FilterDropdown = observer(function (_a) {
    var dataIndex = _a.dataIndex, dropdownOptions = _a.dropdownOptions;
    return (React.createElement(FilterDropdownProvider, { dataIndex: dataIndex }, function (options) {
        return renderDecorator(options.table, renderFilterDropdown(options, dropdownOptions), {
            scope: 'filter',
            decoratorType: options.column.filterDecoratorType,
            decoratorProps: options.column.filterDecoratorProps,
            renderOptions: options,
        });
    }));
});
//# sourceMappingURL=FilterDropdown.js.map