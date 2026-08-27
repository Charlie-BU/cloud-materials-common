"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowSelection = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-09-26 15:04:18
 * @LastEditTime: 2021-10-24 20:30:24
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("@formily/react");
var react_3 = require("../../react");
var shared_1 = require("../../shared");
var renderRowSelection = function (options) {
    var table = options.table, row = options.row;
    var _a = table.plugin.getComponent(row.rowSelectionComponentType, {
        scope: 'rowSelection',
    }), Component = _a.Component, defaultComponentProps = _a.defaultComponentProps;
    if (!Component) {
        return null;
    }
    var componentProps = row.rowSelectionComponentProps;
    var modelProps = tslib_1.__assign({}, options);
    if ((0, shared_1.isFn)(componentProps)) {
        componentProps = componentProps(modelProps);
    }
    return react_1.default.createElement(Component, tslib_1.__assign({}, defaultComponentProps, componentProps, modelProps));
};
exports.RowSelection = (0, react_2.observer)(function (_a) {
    var record = _a.record;
    return (react_1.default.createElement(react_3.RowSelectionProvider, { rowKey: record.key }, function (options) {
        return (0, react_3.renderDecorator)(options.table, renderRowSelection(options), {
            scope: 'rowSelection',
            decoratorType: options.row.rowSelectionDecoratorType,
            decoratorProps: options.row.rowSelectionDecoratorProps,
        });
    }));
});
//# sourceMappingURL=RowSelection.js.map