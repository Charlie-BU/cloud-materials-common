"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDecorator = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-10-13 17:11:06
 * @LastEditTime: 2021-10-18 11:25:51
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importDefault(require("react"));
var shared_1 = require("../../shared");
var renderDecorator = function (table, children, options) {
    if (!options.decoratorType) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    var _a = table.plugin.getComponent(options.decoratorType, {
        scope: options.scope,
    }), Decorator = _a.Component, defaultComponentProps = _a.defaultComponentProps;
    if (!Decorator) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    var decoratorProps = options.decoratorProps;
    if ((0, shared_1.isFn)(decoratorProps)) {
        decoratorProps = decoratorProps(options.renderOptions || { table: table });
    }
    return react_1.default.createElement(Decorator, tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, defaultComponentProps), decoratorProps), { table: table, style: tslib_1.__assign({}, decoratorProps === null || decoratorProps === void 0 ? void 0 : decoratorProps.style) }), children);
};
exports.renderDecorator = renderDecorator;
//# sourceMappingURL=renderDecorator.js.map