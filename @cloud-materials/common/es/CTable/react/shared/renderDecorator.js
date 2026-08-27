import { __assign } from "tslib";
/*
 * @Author: youjingyu
 * @Date: 2021-10-13 17:11:06
 * @LastEditTime: 2021-10-18 11:25:51
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
import { isFn } from '../../shared';
export var renderDecorator = function (table, children, options) {
    if (!options.decoratorType) {
        return React.createElement(React.Fragment, null, children);
    }
    var _a = table.plugin.getComponent(options.decoratorType, {
        scope: options.scope,
    }), Decorator = _a.Component, defaultComponentProps = _a.defaultComponentProps;
    if (!Decorator) {
        return React.createElement(React.Fragment, null, children);
    }
    var decoratorProps = options.decoratorProps;
    if (isFn(decoratorProps)) {
        decoratorProps = decoratorProps(options.renderOptions || { table: table });
    }
    return React.createElement(Decorator, __assign(__assign(__assign({}, defaultComponentProps), decoratorProps), { table: table, style: __assign({}, decoratorProps === null || decoratorProps === void 0 ? void 0 : decoratorProps.style) }), children);
};
//# sourceMappingURL=renderDecorator.js.map