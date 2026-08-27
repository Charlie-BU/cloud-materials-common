import { __assign, __makeTemplateObject } from "tslib";
import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import CSpin from './components/Spin';
import CResult from './components/Result';
import { getFallbackResultProps } from './components/DefaultFallbacks';
import { TEST_ID } from './constants';
import { CConfigContext } from '../CConfigProvider';
var CLoadingComponent = function (props) {
    var _a;
    var style = props.style, className = props.className, _b = props.type, type = _b === void 0 ? 'inline' : _b, _c = props.loading, loading = _c === void 0 ? false : _c, _d = props.hasError, hasError = _d === void 0 ? false : _d, children = props.children, onReload = props.onReload, isBlock = props.isBlock, fallback = props.fallback, cSpinProps = props.cSpinProps, cResultProps = props.cResultProps;
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('loading');
    var cssRoot = cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
    /**
     * display:
     *  success - 展示 children
     *  loading - 展示 loading indicator
     *  hasError - 用于 error indicator 布局
     */
    var display = useMemo(function () {
        // 成功加载，直接返回 children
        if (!loading && !hasError) {
            return children;
        }
        // 加载中展示 loading indicator
        if (loading) {
            switch (type) {
                case 'inline':
                    return React.createElement(CSpin, __assign({ size: "small", isBlock: isBlock }, cSpinProps));
                case 'block':
                case 'page':
                default:
                    return (React.createElement(CSpin, __assign({ size: "large", loading: true, isBlock: isBlock }, cSpinProps), children));
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
    var errorDisplay = useMemo(function () {
        if (!hasError || loading) {
            return null;
        }
        if (fallback) {
            return fallback;
        }
        var fallbackResultProps = getFallbackResultProps({ onReload: onReload, cResultProps: cResultProps, type: type });
        return (React.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", "-fallback"], ["", "-fallback"])), type) },
            React.createElement(CResult, __assign({}, fallbackResultProps))));
    }, [loading, type, hasError, fallback, cResultProps, onReload]);
    return (React.createElement("div", { style: style, className: classNames(cssRoot, cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["", ""], ["", ""])), type), (_a = {},
            _a[cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["error"], ["error"])))] = hasError,
            _a[cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["with-children"], ["with-children"])))] = children,
            _a[cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["without-children"], ["without-children"])))] = !children,
            _a[cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["is-block"], ["is-block"])))] = isBlock,
            _a), className), "data-cy": TEST_ID.loading },
        React.createElement("div", { className: cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["display"], ["display"]))) }, display),
        errorDisplay && React.createElement("div", { className: cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["fallback"], ["fallback"]))) }, errorDisplay)));
};
var CLoadingV2 = Object.assign(CLoadingComponent, { Spin: CSpin, Result: CResult, displayName: 'CLoadingV2' });
export default CLoadingV2;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=index.js.map