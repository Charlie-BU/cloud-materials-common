import { __assign } from "tslib";
/*
 * @Author: youjingyu
 * @Date: 2021-09-26 15:04:18
 * @LastEditTime: 2021-10-22 19:01:40
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
// import { observer } from '@formily/react';
import { ExpandRowProvider, renderDecorator } from '../../react';
import { isFn } from '../../shared';
var renderExpandRow = function (options) {
    var table = options.table, row = options.row;
    var _a = table.plugin.getComponent(row.expandRowComponentType, {
        scope: 'expandRow',
    }), Component = _a.Component, defaultComponentProps = _a.defaultComponentProps;
    if (!Component) {
        return null;
    }
    var componentProps = row.expandRowComponentProps;
    var modelProps = __assign({}, options);
    if (isFn(componentProps)) {
        componentProps = componentProps(modelProps);
    }
    return React.createElement(Component, __assign({}, defaultComponentProps, componentProps, modelProps));
};
// 暂时去掉 observer，因为该组件没有访问响应式属性
export var ExpandRow = function (_a) {
    var record = _a.record;
    return (React.createElement(ExpandRowProvider, { rowKey: record.key }, function (options) {
        return renderDecorator(options.table, renderExpandRow(options), {
            scope: 'expandRow',
            decoratorType: options.row.expandRowDecoratorType,
            decoratorProps: options.row.expandRowDecoratorProps,
            renderOptions: options,
        });
    }));
};
//# sourceMappingURL=ExpandRow.js.map