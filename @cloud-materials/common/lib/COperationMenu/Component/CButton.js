"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_react_1 = require("@arco-design/web-react");
var icon_1 = require("@arco-design/web-react/icon");
var useMergeProps_1 = require("../../hooks/useMergeProps");
var CConfigProvider_1 = require("../../CConfigProvider");
var Group = web_react_1.Button.Group;
var regexTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
function processChildren(children) {
    var childrenList = [];
    var isPrevChildPure = false;
    react_1.default.Children.forEach(children, function (child) {
        var isCurrentChildPure = typeof child === 'string' || typeof child === 'number';
        if (isCurrentChildPure && isPrevChildPure) {
            var lastIndex = childrenList.length - 1;
            var lastChild = childrenList[lastIndex];
            childrenList[lastIndex] = "".concat(lastChild).concat(child);
        }
        else {
            childrenList.push(child);
        }
        isPrevChildPure = isCurrentChildPure;
    });
    return react_1.default.Children.map(childrenList, function (child) { return (typeof child === 'string' ? react_1.default.createElement("span", null, child) : child); });
}
var defaultProps = {
    htmlType: 'button',
    type: 'default',
    shape: 'square',
};
function CButton(baseProps, ref) {
    var _a;
    var props = (0, useMergeProps_1.useMergeProps)(baseProps, defaultProps, {});
    var _b = (0, react_1.useContext)(web_react_1.ConfigProvider.ConfigContext), prefixCls = _b.prefixCls, autoInsertSpaceInButton = _b.autoInsertSpaceInButton, ctxSize = _b.size;
    var style = props.style, className = props.className, children = props.children, htmlType = props.htmlType, type = props.type, status = props.status, size = props.size, shape = props.shape, href = props.href, anchorProps = props.anchorProps, disabled = props.disabled, loading = props.loading, loadingFixedWidth = props.loadingFixedWidth, icon = props.icon, iconOnly = props.iconOnly, onClick = props.onClick, long = props.long, rest = tslib_1.__rest(props, ["style", "className", "children", "htmlType", "type", "status", "size", "shape", "href", "anchorProps", "disabled", "loading", "loadingFixedWidth", "icon", "iconOnly", "onClick", "long"]);
    var _c = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _c.useCssPrefix, locale = _c.locale;
    var cssPrefix = useCssPrefix('operation-menu');
    var _d = tslib_1.__read((0, react_1.useState)(false), 2), isTwoCNChar = _d[0], setIsTwoCNChar = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(false), 2), promiseLoading = _e[0], setPromiseLoading = _e[1];
    var iconNode = loading || promiseLoading ? react_1.default.createElement(icon_1.IconLoading, null) : icon;
    var innerButtonRef = (0, react_1.useRef)();
    var buttonRef = ref || innerButtonRef;
    // 标记组件是否 Mount
    var MountRef = (0, react_1.useRef)(false);
    // 记录组件挂载状态
    (0, react_1.useEffect)(function () {
        MountRef.current = true;
        return function () {
            MountRef.current = false;
        };
    }, []);
    (0, react_1.useEffect)(function () {
        if (autoInsertSpaceInButton && buttonRef && buttonRef.current) {
            var textContent = buttonRef.current.textContent;
            if (regexTwoCNChar.test(textContent)) {
                if (!isTwoCNChar) {
                    setIsTwoCNChar(true);
                }
            }
            else if (isTwoCNChar) {
                setIsTwoCNChar(false);
            }
        }
    }, [buttonRef.current, autoInsertSpaceInButton]);
    var cls = cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["opt-text-btn"], ["opt-text-btn"])));
    var classScopeEn = cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["opt-text-btn-en-US"], ["opt-text-btn-en-US"])));
    var isEn = locale.locale === 'en-US';
    var arcoPrefixCls = "".concat(prefixCls, "-btn");
    var _type = type === 'default' ? 'secondary' : type;
    var classNames = (0, classnames_1.default)(arcoPrefixCls, "".concat(arcoPrefixCls, "-").concat(_type), "".concat(arcoPrefixCls, "-size-").concat(size || ctxSize), "".concat(arcoPrefixCls, "-shape-").concat(shape), (_a = {},
        _a["".concat(arcoPrefixCls, "-long")] = long,
        _a["".concat(arcoPrefixCls, "-status-").concat(status)] = status,
        _a["".concat(arcoPrefixCls, "-loading-fixed-width")] = loadingFixedWidth,
        _a["".concat(arcoPrefixCls, "-loading")] = loading || promiseLoading,
        _a["".concat(arcoPrefixCls, "-link")] = href,
        _a["".concat(arcoPrefixCls, "-icon-only")] = iconOnly || (!children && children !== 0 && iconNode),
        _a["".concat(arcoPrefixCls, "-disabled")] = disabled,
        _a["".concat(arcoPrefixCls, "-two-chinese-chars")] = isTwoCNChar,
        _a["".concat(cls)] = type === 'text',
        _a), isEn && classScopeEn, className);
    var handleClick = function (event) {
        if (loading || promiseLoading) {
            typeof (event === null || event === void 0 ? void 0 : event.preventDefault) === 'function' && event.preventDefault();
            return;
        }
        if (!onClick) {
            return;
        }
        var result = onClick(event);
        if (!(result instanceof Promise)) {
            return;
        }
        setPromiseLoading(true);
        result.finally(function () {
            // 如果组件在异步操作完成时已经被卸载，则不用修改state
            if (MountRef.current) {
                setPromiseLoading(false);
            }
        });
    };
    var InnerContent = (react_1.default.createElement(react_1.default.Fragment, null,
        iconNode,
        processChildren(children)));
    if (href) {
        var _anchorProps = tslib_1.__assign({}, anchorProps);
        if (disabled) {
            delete _anchorProps.href;
        }
        else {
            _anchorProps.href = href;
        }
        return (react_1.default.createElement("a", tslib_1.__assign({ ref: buttonRef }, rest, _anchorProps, { style: style, className: classNames, onClick: handleClick }), InnerContent));
    }
    return (react_1.default.createElement("button", tslib_1.__assign({ ref: buttonRef }, rest, { style: style, className: classNames, type: htmlType, disabled: disabled, onClick: handleClick }), InnerContent));
}
var ForwardRefButton = (0, react_1.forwardRef)(CButton);
var CButtonComponent = ForwardRefButton;
CButtonComponent.__BYTE_BUTTON = true;
CButtonComponent.Group = Group;
CButtonComponent.displayName = 'CButton';
exports.default = CButtonComponent;
var templateObject_1, templateObject_2;
//# sourceMappingURL=CButton.js.map