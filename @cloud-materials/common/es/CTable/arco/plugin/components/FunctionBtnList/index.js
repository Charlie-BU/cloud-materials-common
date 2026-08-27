import { __assign, __rest } from "tslib";
import React from 'react';
import OperationMenu from '../../../../../COperationMenu';
import { isFn } from '../../../../shared';
import { usePrefix } from '../../../../react';
export var FunctionBtnList = function (_a) {
    var _b = _a.btnList, btnList = _b === void 0 ? [] : _b, toolBarItemProps = __rest(_a, ["btnList"]);
    var prefixCls = usePrefix('comp-func-btn');
    var opList = btnList
        .filter(function (item) {
        if (item.visible === undefined) {
            return true;
        }
        return isFn(item.visible) ? item.visible(toolBarItemProps) : item.visible;
    })
        .map(function (item, index) {
        var componentProps = item.componentProps, component = item.component;
        var _a = toolBarItemProps.table.plugin.getComponent(component, {
            scope: 'toolbarItem',
        }), Component = _a.Component, defaultComponentProps = _a.defaultComponentProps;
        return {
            name: "".concat(index),
            render: function () {
                return Component ? React.createElement(Component, __assign({}, defaultComponentProps, componentProps, toolBarItemProps)) : null;
            },
        };
    });
    return (React.createElement("div", { className: prefixCls },
        React.createElement(OperationMenu, { displayNum: 10, spaceSize: 12, operations: opList })));
};
//# sourceMappingURL=index.js.map