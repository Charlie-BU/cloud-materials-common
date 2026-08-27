"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBuiltIn = exports.renderBuiltInContent = void 0;
var tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/ban-types */
var react_1 = tslib_1.__importStar(require("react"));
var utils_1 = require("./utils");
/**
 * 根据内置组件的配置渲染内容
 * @param builtInComponentMap
 * @param builtInConfig
 * @returns
 */
var renderBuiltInContent = function (builtInComponentMap, builtInConfig, options) {
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
            return react_1.default.createElement(Component, tslib_1.__assign(tslib_1.__assign({ ref: ref }, (0, utils_1.mergeSpecialProps)(commonProps, defaultProps, props)), { key: key }));
        }
        if (react_1.default.isValidElement(item) && commonProps) {
            return react_1.default.cloneElement(item, (0, utils_1.mergeSpecialProps)(commonProps, item.props));
        }
        return item;
    };
    return (builtInConfig &&
        (Array.isArray(builtInConfig)
            ? builtInConfig.filter(Boolean).map(renderSingleItem)
            : renderSingleItem(builtInConfig)));
};
exports.renderBuiltInContent = renderBuiltInContent;
var BuiltInProvider = react_1.default.createContext({ componentsMap: {}, renderBuiltIn: function (v) { return v; } });
var useBuiltIn = function () {
    return (0, react_1.useContext)(BuiltInProvider);
};
exports.useBuiltIn = useBuiltIn;
var createBuiltInComponent = function (Component, componentsMapOuter, options) {
    if (options === void 0) { options = {}; }
    var createByComponentsMap = function (componentsMapInner, defaultPropsMap) {
        var BuiltInComponent = function (props) { return (react_1.default.createElement(BuiltInProvider.Provider, { value: {
                componentsMap: componentsMapInner,
                renderBuiltIn: function (builtInContent, innerOptions) {
                    if (innerOptions === void 0) { innerOptions = {}; }
                    return (0, exports.renderBuiltInContent)(componentsMapInner, builtInContent, {
                        commonProps: (0, utils_1.mergeSpecialProps)(options.commonProps, innerOptions.commonProps),
                        defaultPropsMap: tslib_1.__assign(tslib_1.__assign({}, defaultPropsMap), innerOptions.defaultPropsMap),
                    });
                },
            } },
            react_1.default.createElement(Component, tslib_1.__assign({}, props)))); };
        BuiltInComponent.displayName = "".concat(Object.keys(componentsMapInner).join(','), "(BuiltInComponent)");
        return Object.assign(BuiltInComponent, {
            register: function (innerComponentsMap, innerDefaultProps) {
                return createByComponentsMap(tslib_1.__assign(tslib_1.__assign({}, componentsMapOuter), innerComponentsMap), tslib_1.__assign(tslib_1.__assign({}, options.defaultProps), innerDefaultProps));
            },
            defineComponentOptions: function (component, componentProps, ref) { return ({
                component: component,
                componentProps: componentProps,
                ref: ref,
            }); },
            useBuiltIn: exports.useBuiltIn,
        });
    };
    return createByComponentsMap(componentsMapOuter, options.defaultProps);
};
exports.default = createBuiltInComponent;
//# sourceMappingURL=index.js.map