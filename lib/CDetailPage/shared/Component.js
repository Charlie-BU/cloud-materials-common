"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoticeComponent = exports.getComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var types_1 = require("../types");
/**
 * 根据名字和参数获取组件
 * @param componentName
 * @param componentProps
 * @returns
 */
var getComponent = function (componentName, componentProps) {
    if (!componentName)
        return null;
    var Component = types_1.TabComponentMap === null || types_1.TabComponentMap === void 0 ? void 0 : types_1.TabComponentMap[componentName];
    return react_1.default.createElement(Component, tslib_1.__assign({}, componentProps));
};
exports.getComponent = getComponent;
/**
 * 根据名字和参数获取组件
 * @param componentName
 * @param componentProps
 * @returns
 */
var getNoticeComponent = function (componentName, componentProps) {
    if (!componentName)
        return null;
    var Component = types_1.TabNoticeComponentMap === null || types_1.TabNoticeComponentMap === void 0 ? void 0 : types_1.TabNoticeComponentMap[componentName];
    return react_1.default.createElement(Component, tslib_1.__assign({}, componentProps));
};
exports.getNoticeComponent = getNoticeComponent;
//# sourceMappingURL=Component.js.map