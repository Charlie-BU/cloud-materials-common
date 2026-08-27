import { __assign, __read, __rest, __spreadArray } from "tslib";
import { ConfigProvider } from '@arco-design/web-react';
import { isUndefined, omit, omitBy } from 'lodash-es';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { DEFAULT_C_PREFIX_CLS, createClassNamePrefixHooks, defaultProps, formatLocale, getCPrefixClsFn } from './utils';
import { useMergeProps } from '../hooks';
import { IconClose } from '@arco-design/iconbox-react-ve-o-design';
import { componentConfig } from '@arco-design/theme-volcengine-ui-v3/config';
import { defineEnCComponentConfig } from './themes';
import { useLatest } from 'ahooks';
import { createLogger } from '../_factory/Logger';
var defaultValue = Object.freeze(__assign(__assign({}, defaultProps), { getCPrefixCls: getCPrefixClsFn(DEFAULT_C_PREFIX_CLS), formatLocale: formatLocale, useCssPrefix: createClassNamePrefixHooks(DEFAULT_C_PREFIX_CLS), 
    // eslint-disable-next-line no-restricted-globals
    storage: { localStorage: localStorage, sessionStorage: sessionStorage }, createLogger: createLogger(function (log) {
        var logArgs = ["[cloud-materials]", "[".concat(log.componentName, "]")];
        switch (log.type) {
            case 'info':
            case 'warn':
                console[log.type].apply(console, __spreadArray([], __read(logArgs), false));
                break;
            case 'error':
                console.error.apply(console, __spreadArray(__spreadArray([], __read(logArgs), false), [log.error], false));
                break;
            default:
                break;
        }
    }) }));
export var defaultComponentConfig = Object.freeze(__assign({ Input: {
        clearIcon: React.createElement(IconClose, null),
    } }, componentConfig));
var globalContextConfig = defaultValue;
export var getGlobalContextConfig = function () { return globalContextConfig; };
export var CConfigContext = createContext(defaultValue);
export var useCConfigContext = function () {
    return useContext(CConfigContext);
};
var CConfigProvider = function (_a) {
    var _b = _a.keepPrevious, keepPrevious = _b === void 0 ? true : _b, props = __rest(_a, ["keepPrevious"]);
    var prevArcoConfigContext = useContext(ConfigProvider.ConfigContext);
    var _c = useCConfigContext(), _ = _c.keepPrevious, prevCConfigContext = __rest(_c, ["keepPrevious"]);
    var _d = __assign(__assign(__assign({}, defaultProps), (keepPrevious ? __assign(__assign({}, prevArcoConfigContext), prevCConfigContext) : null)), omitBy(props, isUndefined)), cPrefixCls = _d.cPrefixCls, children = _d.children, _e = _d.storage, storage = _e === void 0 ? defaultValue.storage : _e, onLog = _d.onLog, restCConfigProps = __rest(_d, ["cPrefixCls", "children", "storage", "onLog"]);
    var onLogRef = useLatest(onLog);
    var _f = __read(useState(function () { return createLogger(function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = onLogRef.current) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([onLogRef], __read(args), false));
    }); }), 1), loggerFactory = _f[0];
    var _g = omit(restCConfigProps, [
        'useCssPrefix',
        'getCPrefixCls',
        'formatLocale',
        'cComponentConfig',
    ]), componentConfig = _g.componentConfig, arcoConfigProps = __rest(_g, ["componentConfig"]);
    var getCPrefixCls = useMemo(function () { return getCPrefixClsFn(cPrefixCls); }, [cPrefixCls]);
    var useCssPrefix = useMemo(function () { return createClassNamePrefixHooks(cPrefixCls); }, [cPrefixCls]);
    // 排除云基础物料的配置
    var arcoComponentConfig = omitBy(restCConfigProps.cComponentConfig, function (_, key) { return /^C[A-Z]/.test(key); });
    // arco 自身不会对 componentConfig 属性进行合并，用户若在 CConfigProvider 内使用了 ConfigProvider，将完全覆盖 CConfigProvider 提供的默认值
    var mergedComponentConfig = useMergeProps(componentConfig, defaultComponentConfig, arcoComponentConfig);
    return (React.createElement(ConfigProvider, __assign({}, arcoConfigProps, { componentConfig: mergedComponentConfig }),
        React.createElement(CConfigContext.Provider, { value: __assign(__assign({}, restCConfigProps), { storage: storage, cPrefixCls: cPrefixCls, getCPrefixCls: getCPrefixCls, useCssPrefix: useCssPrefix, formatLocale: formatLocale, createLogger: loggerFactory }) }, children)));
};
CConfigProvider.ConfigContext = CConfigContext;
CConfigProvider.displayName = 'CConfigProvider';
/**
 * 设置 CModal 和 CDrawer 等 通过 `openXxxx` 打开的组件的Context
 * Arco 的 Modal 需要单独调用 Modal.config
 */
CConfigProvider.config = function (props) {
    globalContextConfig = __assign(__assign({}, globalContextConfig), props);
};
CConfigProvider.resetConfig = function () {
    globalContextConfig = defaultValue;
};
/** 定义英文环境下的配置，内置了一些统一的配置 */
CConfigProvider.defineEnCComponentConfig = defineEnCComponentConfig;
export default CConfigProvider;
export var ConfigConsumer = CConfigContext.Consumer;
//# sourceMappingURL=index.js.map