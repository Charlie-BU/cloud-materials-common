"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterDropdown = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-09-26 15:04:18
 * @LastEditTime: 2021-10-22 19:01:23
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("@formily/react");
var react_3 = require("../../react");
var shared_1 = require("../../shared");
var renderFilterDropdown = function (options, dropdownOptions) {
    var table = options.table, column = options.column;
    var _a = table.plugin.getComponent(column.filterComponentType, {
        scope: 'filter',
    }), Component = _a.Component, defaultComponentProps = _a.defaultComponentProps;
    if (!Component) {
        return null;
    }
    var componentProps = column.filterComponentProps;
    var modelProps = tslib_1.__assign({}, options);
    if ((0, shared_1.isFn)(componentProps)) {
        componentProps = componentProps(modelProps);
    }
    return react_1.default.createElement(Component, tslib_1.__assign({}, defaultComponentProps, componentProps, modelProps, { dropdownOptions: dropdownOptions }));
};
exports.FilterDropdown = (0, react_2.observer)(function (_a) {
    var dataIndex = _a.dataIndex, dropdownOptions = _a.dropdownOptions;
    return (react_1.default.createElement(react_3.FilterDropdownProvider, { dataIndex: dataIndex }, function (options) {
        return (0, react_3.renderDecorator)(options.table, renderFilterDropdown(options, dropdownOptions), {
            scope: 'filter',
            decoratorType: options.column.filterDecoratorType,
            decoratorProps: options.column.filterDecoratorProps,
            renderOptions: options,
        });
    }));
});
//# sourceMappingURL=FilterDropdown.js.map