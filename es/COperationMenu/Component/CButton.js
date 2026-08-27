import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React, { useRef, forwardRef, useContext, useState, useEffect } from 'react';
import cs from 'classnames';
import { ConfigProvider, Button } from '@arco-design/web-react';
import { IconLoading } from '@arco-design/web-react/icon';
import { useMergeProps } from '../../hooks/useMergeProps';
import { useCConfigContext } from '../../CConfigProvider';
var Group = Button.Group;
var regexTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
function processChildren(children) {
    var childrenList = [];
    var isPrevChildPure = false;
    React.Children.forEach(children, function (child) {
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
    return React.Children.map(childrenList, function (child) { return (typeof child === 'string' ? React.createElement("span", null, child) : child); });
}
var defaultProps = {
    htmlType: 'button',
    type: 'default',
    shape: 'square',
};
function CButton(baseProps, ref) {
    var _a;
    var props = useMergeProps(baseProps, defaultProps, {});
    var _b = useContext(ConfigProvider.ConfigContext), prefixCls = _b.prefixCls, autoInsertSpaceInButton = _b.autoInsertSpaceInButton, ctxSize = _b.size;
    var style = props.style, className = props.className, children = props.children, htmlType = props.htmlType, type = props.type, status = props.status, size = props.size, shape = props.shape, href = props.href, anchorProps = props.anchorProps, disabled = props.disabled, loading = props.loading, loadingFixedWidth = props.loadingFixedWidth, icon = props.icon, iconOnly = props.iconOnly, onClick = props.onClick, long = props.long, rest = __rest(props, ["style", "className", "children", "htmlType", "type", "status", "size", "shape", "href", "anchorProps", "disabled", "loading", "loadingFixedWidth", "icon", "iconOnly", "onClick", "long"]);
    var _c = useCConfigContext(), useCssPrefix = _c.useCssPrefix, locale = _c.locale;
    var cssPrefix = useCssPrefix('operation-menu');
    var _d = __read(useState(false), 2), isTwoCNChar = _d[0], setIsTwoCNChar = _d[1];
    var _e = __read(useState(false), 2), promiseLoading = _e[0], setPromiseLoading = _e[1];
    var iconNode = loading || promiseLoading ? React.createElement(IconLoading, null) : icon;
    var innerButtonRef = useRef();
    var buttonRef = ref || innerButtonRef;
    // 标记组件是否 Mount
    var MountRef = useRef(false);
    // 记录组件挂载状态
    useEffect(function () {
        MountRef.current = true;
        return function () {
            MountRef.current = false;
        };
    }, []);
    useEffect(function () {
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
    var cls = cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["opt-text-btn"], ["opt-text-btn"])));
    var classScopeEn = cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["opt-text-btn-en-US"], ["opt-text-btn-en-US"])));
    var isEn = locale.locale === 'en-US';
    var arcoPrefixCls = "".concat(prefixCls, "-btn");
    var _type = type === 'default' ? 'secondary' : type;
    var classNames = cs(arcoPrefixCls, "".concat(arcoPrefixCls, "-").concat(_type), "".concat(arcoPrefixCls, "-size-").concat(size || ctxSize), "".concat(arcoPrefixCls, "-shape-").concat(shape), (_a = {},
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
    var InnerContent = (React.createElement(React.Fragment, null,
        iconNode,
        processChildren(children)));
    if (href) {
        var _anchorProps = __assign({}, anchorProps);
        if (disabled) {
            delete _anchorProps.href;
        }
        else {
            _anchorProps.href = href;
        }
        return (React.createElement("a", __assign({ ref: buttonRef }, rest, _anchorProps, { style: style, className: classNames, onClick: handleClick }), InnerContent));
    }
    return (React.createElement("button", __assign({ ref: buttonRef }, rest, { style: style, className: classNames, type: htmlType, disabled: disabled, onClick: handleClick }), InnerContent));
}
var ForwardRefButton = forwardRef(CButton);
var CButtonComponent = ForwardRefButton;
CButtonComponent.__BYTE_BUTTON = true;
CButtonComponent.Group = Group;
CButtonComponent.displayName = 'CButton';
export default CButtonComponent;
var templateObject_1, templateObject_2;
//# sourceMappingURL=CButton.js.map