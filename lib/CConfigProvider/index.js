"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigConsumer = exports.useCConfigContext = exports.CConfigContext = exports.getGlobalContextConfig = exports.defaultComponentConfig = void 0;
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var lodash_es_1 = require("lodash-es");
var react_1 = tslib_1.__importStar(require("react"));
var utils_1 = require("./utils");
var hooks_1 = require("../hooks");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var config_1 = require("@arco-design/theme-volcengine-ui-v3/config");
var themes_1 = require("./themes");
var ahooks_1 = require("ahooks");
var Logger_1 = require("../_factory/Logger");
var defaultValue = Object.freeze(tslib_1.__assign(tslib_1.__assign({}, utils_1.defaultProps), { getCPrefixCls: (0, utils_1.getCPrefixClsFn)(utils_1.DEFAULT_C_PREFIX_CLS), formatLocale: utils_1.formatLocale, useCssPrefix: (0, utils_1.createClassNamePrefixHooks)(utils_1.DEFAULT_C_PREFIX_CLS), 
    // eslint-disable-next-line no-restricted-globals
    storage: { localStorage: localStorage, sessionStorage: sessionStorage }, createLogger: (0, Logger_1.createLogger)(function (log) {
        var logArgs = ["[cloud-materials]", "[".concat(log.componentName, "]")];
        switch (log.type) {
            case 'info':
            case 'warn':
                console[log.type].apply(console, tslib_1.__spreadArray([], tslib_1.__read(logArgs), false));
                break;
            case 'error':
                console.error.apply(console, tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(logArgs), false), [log.error], false));
                break;
            default:
                break;
        }
    }) }));
exports.defaultComponentConfig = Object.freeze(tslib_1.__assign({ Input: {
        clearIcon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconClose, null),
    } }, config_1.componentConfig));
var globalContextConfig = defaultValue;
var getGlobalContextConfig = function () { return globalContextConfig; };
exports.getGlobalContextConfig = getGlobalContextConfig;
exports.CConfigContext = (0, react_1.createContext)(defaultValue);
var useCConfigContext = function () {
    return (0, react_1.useContext)(exports.CConfigContext);
};
exports.useCConfigContext = useCConfigContext;
var CConfigProvider = function (_a) {
    var _b = _a.keepPrevious, keepPrevious = _b === void 0 ? true : _b, props = tslib_1.__rest(_a, ["keepPrevious"]);
    var prevArcoConfigContext = (0, react_1.useContext)(web_react_1.ConfigProvider.ConfigContext);
    var _c = (0, exports.useCConfigContext)(), _ = _c.keepPrevious, prevCConfigContext = tslib_1.__rest(_c, ["keepPrevious"]);
    var _d = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, utils_1.defaultProps), (keepPrevious ? tslib_1.__assign(tslib_1.__assign({}, prevArcoConfigContext), prevCConfigContext) : null)), (0, lodash_es_1.omitBy)(props, lodash_es_1.isUndefined)), cPrefixCls = _d.cPrefixCls, children = _d.children, _e = _d.storage, storage = _e === void 0 ? defaultValue.storage : _e, onLog = _d.onLog, restCConfigProps = tslib_1.__rest(_d, ["cPrefixCls", "children", "storage", "onLog"]);
    var onLogRef = (0, ahooks_1.useLatest)(onLog);
    var _f = tslib_1.__read((0, react_1.useState)(function () { return (0, Logger_1.createLogger)(function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = onLogRef.current) === null || _a === void 0 ? void 0 : _a.call.apply(_a, tslib_1.__spreadArray([onLogRef], tslib_1.__read(args), false));
    }); }), 1), loggerFactory = _f[0];
    var _g = (0, lodash_es_1.omit)(restCConfigProps, [
        'useCssPrefix',
        'getCPrefixCls',
        'formatLocale',
        'cComponentConfig',
    ]), componentConfig = _g.componentConfig, arcoConfigProps = tslib_1.__rest(_g, ["componentConfig"]);
    var getCPrefixCls = (0, react_1.useMemo)(function () { return (0, utils_1.getCPrefixClsFn)(cPrefixCls); }, [cPrefixCls]);
    var useCssPrefix = (0, react_1.useMemo)(function () { return (0, utils_1.createClassNamePrefixHooks)(cPrefixCls); }, [cPrefixCls]);
    // 排除云基础物料的配置
    var arcoComponentConfig = (0, lodash_es_1.omitBy)(restCConfigProps.cComponentConfig, function (_, key) { return /^C[A-Z]/.test(key); });
    // arco 自身不会对 componentConfig 属性进行合并，用户若在 CConfigProvider 内使用了 ConfigProvider，将完全覆盖 CConfigProvider 提供的默认值
    var mergedComponentConfig = (0, hooks_1.useMergeProps)(componentConfig, exports.defaultComponentConfig, arcoComponentConfig);
    return (react_1.default.createElement(web_react_1.ConfigProvider, tslib_1.__assign({}, arcoConfigProps, { componentConfig: mergedComponentConfig }),
        react_1.default.createElement(exports.CConfigContext.Provider, { value: tslib_1.__assign(tslib_1.__assign({}, restCConfigProps), { storage: storage, cPrefixCls: cPrefixCls, getCPrefixCls: getCPrefixCls, useCssPrefix: useCssPrefix, formatLocale: utils_1.formatLocale, createLogger: loggerFactory }) }, children)));
};
CConfigProvider.ConfigContext = exports.CConfigContext;
CConfigProvider.displayName = 'CConfigProvider';
/**
 * 设置 CModal 和 CDrawer 等 通过 `openXxxx` 打开的组件的Context
 * Arco 的 Modal 需要单独调用 Modal.config
 */
CConfigProvider.config = function (props) {
    globalContextConfig = tslib_1.__assign(tslib_1.__assign({}, globalContextConfig), props);
};
CConfigProvider.resetConfig = function () {
    globalContextConfig = defaultValue;
};
/** 定义英文环境下的配置，内置了一些统一的配置 */
CConfigProvider.defineEnCComponentConfig = themes_1.defineEnCComponentConfig;
exports.default = CConfigProvider;
exports.ConfigConsumer = exports.CConfigContext.Consumer;
//# sourceMappingURL=index.js.map