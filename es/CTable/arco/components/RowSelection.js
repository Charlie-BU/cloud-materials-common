import { __assign } from "tslib";
/*
 * @Author: youjingyu
 * @Date: 2021-09-26 15:04:18
 * @LastEditTime: 2021-10-24 20:30:24
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
import { observer } from '@formily/react';
import { RowSelectionProvider, renderDecorator } from '../../react';
import { isFn } from '../../shared';
var renderRowSelection = function (options) {
    var table = options.table, row = options.row;
    var _a = table.plugin.getComponent(row.rowSelectionComponentType, {
        scope: 'rowSelection',
    }), Component = _a.Component, defaultComponentProps = _a.defaultComponentProps;
    if (!Component) {
        return null;
    }
    var componentProps = row.rowSelectionComponentProps;
    var modelProps = __assign({}, options);
    if (isFn(componentProps)) {
        componentProps = componentProps(modelProps);
    }
    return React.createElement(Component, __assign({}, defaultComponentProps, componentProps, modelProps));
};
export var RowSelection = observer(function (_a) {
    var record = _a.record;
    return (React.createElement(RowSelectionProvider, { rowKey: record.key }, function (options) {
        return renderDecorator(options.table, renderRowSelection(options), {
            scope: 'rowSelection',
            decoratorType: options.row.rowSelectionDecoratorType,
            decoratorProps: options.row.rowSelectionDecoratorProps,
        });
    }));
});
//# sourceMappingURL=RowSelection.js.map