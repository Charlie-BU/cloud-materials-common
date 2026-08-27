import { __assign } from "tslib";
/*
 * @Author: youjingyu
 * @Date: 2021-09-26 15:02:25
 * @LastEditTime: 2021-10-22 19:01:53
 * @LastEditors: youjingyu
 * @Description:
 */
import React, { memo } from 'react';
import { observer } from '@formily/react';
import { RowProvider, RowProviderWithoutObserver, renderDecorator } from '../../../react';
import { isFn } from '../../../shared';
import { getRowDataCy } from '../../utils';
import { isEqual } from 'lodash-es';
import cls from 'classnames';
var renderRow = function (options, className, children) {
    var table = options.table, row = options.row, prefix = options.prefix;
    var _a = table.plugin.getComponent(row.componentType, {
        scope: 'row',
        logError: false,
    }), Component = _a.Component, defaultComponentProps = _a.defaultComponentProps;
    var _b = getRowDataCy(row, prefix), dataCy = _b.dataCy, dataCyIdx = _b.dataCyIdx;
    // 为了在 Table Row hover 时, 内置组件的编辑icon、复制icon能够显示出来，需要加个class
    var trPrefix = "".concat(prefix, "-row");
    if (!Component) {
        return (React.createElement("tr", { "data-testid": dataCy, "data-cy": dataCy, "data-cy-idx": dataCyIdx, className: cls(className, trPrefix) }, children));
    }
    var componentProps = row.componentProps;
    var modelProps = __assign({}, options);
    if (isFn(componentProps)) {
        componentProps = componentProps(modelProps);
    }
    return (
    // 在自定义行中，不能确定业务方是否用了 tr，在 tr 外面套一层元素感觉不太合适
    // 因此将 dataCy、dataCyIdx 传给业务方， 业务方自己打桩
    React.createElement(Component, __assign({}, defaultComponentProps, componentProps, modelProps, { dataCy: dataCy, dataCyIdx: dataCyIdx }), children));
};
export var TableRowMemo = memo(function (_a) {
    var children = _a.children, index = _a.index, className = _a.className;
    return (React.createElement(RowProviderWithoutObserver, { index: index }, function (options) {
        return renderDecorator(options.table, renderRow(options, className, children), {
            scope: 'row',
            decoratorType: options.row.decoratorType,
            decoratorProps: options.row.decoratorProps,
            renderOptions: options,
        });
    }));
}, function (prev, next) {
    // TableRow 重新渲染的条件
    // 1. row data 改变
    // 2. isEditing 改变
    // 3. isExpanded 改变
    // 4. isSelected 改变
    // 5. selectable 改变
    // 6. expandable 改变
    var isSelectedEq = prev.record.isSelected === next.record.isSelected;
    var isSelectableEq = prev.record.selectable === next.record.selectable;
    var isEditingEq = prev.record.isEditing === next.record.isEditing;
    var isExpandedEq = prev.record.isExpanded === next.record.isExpanded;
    var isExpandableEq = prev.record.expandable === next.record.expandable;
    var valueEq = isEqual(prev.record.data, next.record.data);
    return valueEq && isSelectedEq && isSelectableEq && isEditingEq && isExpandedEq && isExpandableEq;
});
export var TableRow = observer(function (_a) {
    var children = _a.children, index = _a.index, className = _a.className;
    return (React.createElement(RowProvider, { index: index }, function (options) {
        return renderDecorator(options.table, renderRow(options, className, children), {
            scope: 'row',
            decoratorType: options.row.decoratorType,
            decoratorProps: options.row.decoratorProps,
            renderOptions: options,
        });
    }));
});
//# sourceMappingURL=index.js.map