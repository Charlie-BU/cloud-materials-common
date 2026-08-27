"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionBtnList = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var COperationMenu_1 = tslib_1.__importDefault(require("../../../../../COperationMenu"));
var shared_1 = require("../../../../shared");
var react_2 = require("../../../../react");
var FunctionBtnList = function (_a) {
    var _b = _a.btnList, btnList = _b === void 0 ? [] : _b, toolBarItemProps = tslib_1.__rest(_a, ["btnList"]);
    var prefixCls = (0, react_2.usePrefix)('comp-func-btn');
    var opList = btnList
        .filter(function (item) {
        if (item.visible === undefined) {
            return true;
        }
        return (0, shared_1.isFn)(item.visible) ? item.visible(toolBarItemProps) : item.visible;
    })
        .map(function (item, index) {
        var componentProps = item.componentProps, component = item.component;
        var _a = toolBarItemProps.table.plugin.getComponent(component, {
            scope: 'toolbarItem',
        }), Component = _a.Component, defaultComponentProps = _a.defaultComponentProps;
        return {
            name: "".concat(index),
            render: function () {
                return Component ? react_1.default.createElement(Component, tslib_1.__assign({}, defaultComponentProps, componentProps, toolBarItemProps)) : null;
            },
        };
    });
    return (react_1.default.createElement("div", { className: prefixCls },
        react_1.default.createElement(COperationMenu_1.default, { displayNum: 10, spaceSize: 12, operations: opList })));
};
exports.FunctionBtnList = FunctionBtnList;
//# sourceMappingURL=index.js.map