"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandRow = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-09-26 15:04:18
 * @LastEditTime: 2021-10-22 19:01:40
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importDefault(require("react"));
// import { observer } from '@formily/react';
var react_2 = require("../../react");
var shared_1 = require("../../shared");
var renderExpandRow = function (options) {
    var table = options.table, row = options.row;
    var _a = table.plugin.getComponent(row.expandRowComponentType, {
        scope: 'expandRow',
    }), Component = _a.Component, defaultComponentProps = _a.defaultComponentProps;
    if (!Component) {
        return null;
    }
    var componentProps = row.expandRowComponentProps;
    var modelProps = tslib_1.__assign({}, options);
    if ((0, shared_1.isFn)(componentProps)) {
        componentProps = componentProps(modelProps);
    }
    return react_1.default.createElement(Component, tslib_1.__assign({}, defaultComponentProps, componentProps, modelProps));
};
// 暂时去掉 observer，因为该组件没有访问响应式属性
var ExpandRow = function (_a) {
    var record = _a.record;
    return (react_1.default.createElement(react_2.ExpandRowProvider, { rowKey: record.key }, function (options) {
        return (0, react_2.renderDecorator)(options.table, renderExpandRow(options), {
            scope: 'expandRow',
            decoratorType: options.row.expandRowDecoratorType,
            decoratorProps: options.row.expandRowDecoratorProps,
            renderOptions: options,
        });
    }));
};
exports.ExpandRow = ExpandRow;
//# sourceMappingURL=ExpandRow.js.map