import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import { Alert } from '@arco-design/web-react';
import useResizeObserver from '@react-hook/resize-observer';
import classNames from 'classnames';
import { isNumber, isString } from 'lodash-es';
import React, { useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { useCConfigContext } from '../../../CConfigProvider';
import { useAutoRef } from '../../../hooks';
import { useScrollPosition } from '../hooks/useScrollShadow';
export var ChildrenRenderer = React.forwardRef(function (_a, ref) {
    var children = _a.children, contentBottom = _a.contentBottom, contentTop = _a.contentTop, disableScrollShadow = _a.disableScrollShadow, contentClassNameWhenContentTop = _a.contentClassNameWhenContentTop, maxHeight = _a.maxHeight, onMount = _a.onMount, resetProps = __rest(_a, ["children", "contentBottom", "contentTop", "disableScrollShadow", "contentClassNameWhenContentTop", "maxHeight", "onMount"]);
    var scrollRef = useRef(null);
    var contentTopRef = useRef(null);
    var contentBottomRef = useRef(null);
    var _b = __read(useState(!Boolean(maxHeight)), 2), overflow = _b[0], setOverflow = _b[1];
    var onMountRef = useAutoRef(onMount);
    var _c = __read(useScrollPosition(scrollRef), 2), shouldTopShadow = _c[0], shouldBottomShadow = _c[1];
    useImperativeHandle(ref, function () { return scrollRef.current; });
    var contentTopNode = renderAlert(contentTop);
    var contentTopNodeInScrollBox = contentTopNode;
    var contentBottomNode = renderAlert(contentBottom);
    var contentBottomNodeInScrollBox = contentBottomNode;
    if (contentTop && contentTop.sticky === false) {
        contentTopNode = null;
    }
    else {
        contentTopNodeInScrollBox = null;
    }
    if (contentBottom && contentBottom.sticky === false) {
        contentBottomNode = null;
    }
    else {
        contentBottomNodeInScrollBox = null;
    }
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('maskable-children-renderer');
    var checkOverflow = function (element) {
        var _a, _b, _c, _d;
        if (maxHeight) {
            setOverflow(element.scrollHeight >
                maxHeight - ((_b = (_a = contentTopRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight) !== null && _b !== void 0 ? _b : 0) - ((_d = (_c = contentBottomRef.current) === null || _c === void 0 ? void 0 : _c.clientHeight) !== null && _d !== void 0 ? _d : 0));
        }
    };
    useLayoutEffect(function () {
        var _a;
        (_a = onMountRef.current) === null || _a === void 0 ? void 0 : _a.call(onMountRef, scrollRef.current, maxHeight);
        checkOverflow(scrollRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxHeight]);
    useResizeObserver(scrollRef, function (_a) {
        var target = _a.target;
        checkOverflow(target);
    });
    return (React.createElement(React.Fragment, null,
        contentTopNode && (React.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["both-end"], ["both-end"]))), ref: contentTopRef }, contentTopNode)),
        React.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""]))) },
            React.createElement("div", { className: classNames(cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["scroll"], ["scroll"]))), shouldTopShadow && cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["scroll-top-shadow"], ["scroll-top-shadow"]))), shouldBottomShadow && cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["scroll-bottom-shadow"], ["scroll-bottom-shadow"])))), ref: scrollRef, "data-testid": "maskable-scroll", style: { overflow: overflow ? 'auto' : '' } },
                React.createElement("div", null, contentTopNodeInScrollBox),
                React.createElement("div", __assign({}, resetProps, { className: classNames(resetProps.className, Boolean(contentTopNode !== null && contentTopNode !== void 0 ? contentTopNode : contentTopNodeInScrollBox) && contentClassNameWhenContentTop) }), children),
                contentBottomNodeInScrollBox),
            !disableScrollShadow && (
            // 内阴影需要单独起元素盖在上面，不然内容会在阴影上方
            React.createElement("div", { className: classNames(cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["shadow"], ["shadow"]))), shouldTopShadow && cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["shadow-top"], ["shadow-top"]))), shouldBottomShadow && cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["shadow-bottom"], ["shadow-bottom"])))), "data-testid": "maskable-shadow" }))),
        contentBottomNode && (React.createElement("div", { className: cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["both-end"], ["both-end"]))), ref: contentBottomRef }, contentBottomNode))));
});
ChildrenRenderer.displayName = 'ChildrenRenderer';
export var isMaskableAlertType = function (contentTop) {
    // 不是 reactElement，但是是对象
    if (contentTop && !React.isValidElement(contentTop) && typeof contentTop === 'object') {
        return true;
    }
    return false;
};
export function renderAlert(alert, options) {
    if (options === void 0) { options = {}; }
    var ref = options.ref, extraProps = options.extraProps;
    if (isString(alert) || isNumber(alert)) {
        return React.createElement(Alert, __assign({}, extraProps, { content: alert, ref: ref }));
    }
    if (!isMaskableAlertType(alert)) {
        return alert;
    }
    if (alert.type === 'custom') {
        return alert.content;
    }
    if (!alert.content) {
        return null;
    }
    var _ = alert.sticky, restProps = __rest(alert, ["sticky"]);
    return React.createElement(Alert, __assign({}, extraProps, restProps, { ref: ref }));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=ChildrenRenderer.js.map