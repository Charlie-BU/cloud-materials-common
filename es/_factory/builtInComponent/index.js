import { __assign } from "tslib";
/* eslint-disable @typescript-eslint/ban-types */
import React, { useContext } from 'react';
import { mergeSpecialProps } from './utils';
/**
 * 根据内置组件的配置渲染内容
 * @param builtInComponentMap
 * @param builtInConfig
 * @returns
 */
export var renderBuiltInContent = function (builtInComponentMap, builtInConfig, options) {
    if (options === void 0) { options = {}; }
    var commonProps = options.commonProps, defaultPropsMap = options.defaultPropsMap;
    var renderSingleItem = function (item, key) {
        if (item.component) {
            var _a = item, component = _a.component, componentProps = _a.componentProps, ref = _a.ref;
            var Component = builtInComponentMap[component];
            var defaultProps = defaultPropsMap === null || defaultPropsMap === void 0 ? void 0 : defaultPropsMap[component];
            var props = typeof componentProps === 'function' ? componentProps( /** TODO 回传参数需求 */) : componentProps;
            if (process.env.NODE_ENV !== 'production') {
                if (!Component) {
                    throw new Error("[".concat(String(component), "] \u672A\u627E\u5230"));
                }
            }
            return React.createElement(Component, __assign(__assign({ ref: ref }, mergeSpecialProps(commonProps, defaultProps, props)), { key: key }));
        }
        if (React.isValidElement(item) && commonProps) {
            return React.cloneElement(item, mergeSpecialProps(commonProps, item.props));
        }
        return item;
    };
    return (builtInConfig &&
        (Array.isArray(builtInConfig)
            ? builtInConfig.filter(Boolean).map(renderSingleItem)
            : renderSingleItem(builtInConfig)));
};
var BuiltInProvider = React.createContext({ componentsMap: {}, renderBuiltIn: function (v) { return v; } });
export var useBuiltIn = function () {
    return useContext(BuiltInProvider);
};
var createBuiltInComponent = function (Component, componentsMapOuter, options) {
    if (options === void 0) { options = {}; }
    var createByComponentsMap = function (componentsMapInner, defaultPropsMap) {
        var BuiltInComponent = function (props) { return (React.createElement(BuiltInProvider.Provider, { value: {
                componentsMap: componentsMapInner,
                renderBuiltIn: function (builtInContent, innerOptions) {
                    if (innerOptions === void 0) { innerOptions = {}; }
                    return renderBuiltInContent(componentsMapInner, builtInContent, {
                        commonProps: mergeSpecialProps(options.commonProps, innerOptions.commonProps),
                        defaultPropsMap: __assign(__assign({}, defaultPropsMap), innerOptions.defaultPropsMap),
                    });
                },
            } },
            React.createElement(Component, __assign({}, props)))); };
        BuiltInComponent.displayName = "".concat(Object.keys(componentsMapInner).join(','), "(BuiltInComponent)");
        return Object.assign(BuiltInComponent, {
            register: function (innerComponentsMap, innerDefaultProps) {
                return createByComponentsMap(__assign(__assign({}, componentsMapOuter), innerComponentsMap), __assign(__assign({}, options.defaultProps), innerDefaultProps));
            },
            defineComponentOptions: function (component, componentProps, ref) { return ({
                component: component,
                componentProps: componentProps,
                ref: ref,
            }); },
            useBuiltIn: useBuiltIn,
        });
    };
    return createByComponentsMap(componentsMapOuter, options.defaultProps);
};
export default createBuiltInComponent;
//# sourceMappingURL=index.js.map