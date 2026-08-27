"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var Spin_1 = tslib_1.__importDefault(require("./components/Spin"));
var Result_1 = tslib_1.__importDefault(require("./components/Result"));
var DefaultFallbacks_1 = require("./components/DefaultFallbacks");
var constants_1 = require("./constants");
var CConfigProvider_1 = require("../CConfigProvider");
/**
 * 请使用 CLoadingV2 来替代，最多可以减少 490+KiB 的包体积
 * @deprecated
 */
var CLoading = function (props) {
    var _a;
    var style = props.style, className = props.className, _b = props.type, type = _b === void 0 ? 'inline' : _b, _c = props.loading, loading = _c === void 0 ? false : _c, _d = props.hasError, hasError = _d === void 0 ? false : _d, children = props.children, onReload = props.onReload, isBlock = props.isBlock, fallback = props.fallback, cSpinProps = props.cSpinProps, cResultProps = props.cResultProps;
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('loading');
    var cssRoot = cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""])));
    /**
     * display:
     *  success - 展示 children
     *  loading - 展示 loading indicator
     *  hasError - 用于 error indicator 布局
     */
    var display = (0, react_1.useMemo)(function () {
        // 成功加载，直接返回 children
        if (!loading && !hasError) {
            return children;
        }
        // 加载中展示 loading indicator
        if (loading) {
            switch (type) {
                case 'inline':
                    return react_1.default.createElement(Spin_1.default, tslib_1.__assign({ size: "small", isBlock: isBlock }, cSpinProps));
                case 'block':
                case 'page':
                default:
                    return (react_1.default.createElement(Spin_1.default, tslib_1.__assign({ size: "large", loading: true, isBlock: isBlock }, cSpinProps), children));
            }
        }
        // 用于提供出错占位展示的布局
        switch (type) {
            case 'inline':
                return null;
            case 'block':
            case 'page':
            default:
                return children;
        }
    }, [loading, hasError, type, children, cSpinProps]);
    var errorDisplay = (0, react_1.useMemo)(function () {
        if (!hasError || loading) {
            return null;
        }
        if (fallback) {
            return fallback;
        }
        var fallbackResultProps = (0, DefaultFallbacks_1.getFallbackResultProps)({ onReload: onReload, cResultProps: cResultProps, type: type });
        return (react_1.default.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["", "-fallback"], ["", "-fallback"])), type) },
            react_1.default.createElement(Result_1.default, tslib_1.__assign({}, fallbackResultProps))));
    }, [loading, type, hasError, fallback, cResultProps, onReload]);
    return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)(cssRoot, cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["", ""], ["", ""])), type), (_a = {},
            _a[cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["error"], ["error"])))] = hasError,
            _a[cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["with-children"], ["with-children"])))] = children,
            _a[cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["without-children"], ["without-children"])))] = !children,
            _a[cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["is-block"], ["is-block"])))] = isBlock,
            _a), className), "data-cy": constants_1.TEST_ID.loading },
        react_1.default.createElement("div", { className: cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["display"], ["display"]))) }, display),
        errorDisplay && react_1.default.createElement("div", { className: cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["fallback"], ["fallback"]))) }, errorDisplay)));
};
CLoading.displayName = 'CLoading';
CLoading.Spin = Spin_1.default;
CLoading.Result = Result_1.default;
exports.default = CLoading;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=index.js.map