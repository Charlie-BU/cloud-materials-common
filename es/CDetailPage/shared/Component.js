import { __assign } from "tslib";
import React from 'react';
import { TabComponentMap, TabNoticeComponentMap } from '../types';
/**
 * 根据名字和参数获取组件
 * @param componentName
 * @param componentProps
 * @returns
 */
export var getComponent = function (componentName, componentProps) {
    if (!componentName)
        return null;
    var Component = TabComponentMap === null || TabComponentMap === void 0 ? void 0 : TabComponentMap[componentName];
    return React.createElement(Component, __assign({}, componentProps));
};
/**
 * 根据名字和参数获取组件
 * @param componentName
 * @param componentProps
 * @returns
 */
export var getNoticeComponent = function (componentName, componentProps) {
    if (!componentName)
        return null;
    var Component = TabNoticeComponentMap === null || TabNoticeComponentMap === void 0 ? void 0 : TabNoticeComponentMap[componentName];
    return React.createElement(Component, __assign({}, componentProps));
};
//# sourceMappingURL=Component.js.map