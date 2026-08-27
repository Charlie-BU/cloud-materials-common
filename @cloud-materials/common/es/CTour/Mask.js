import { __assign, __makeTemplateObject, __read } from "tslib";
import { Portal } from '@arco-design/web-react';
import React, { useState } from 'react';
import { useCConfigContext } from '../CConfigProvider';
import { createId } from '../_utils/createId';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import useScrollLocker from '../hooks/useScrollLocker';
var COVER_PROPS = {
    fill: 'transparent',
    pointerEvents: 'auto',
};
export var Mask = function (_a) {
    var pos = _a.pos, showMask = _a.showMask, _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.fill, fill = _c === void 0 ? 'rgba(0,0,0,0.5)' : _c, open = _a.open, _d = _a.animated, animated = _d === void 0 ? true : _d, zIndex = _a.zIndex, disabledInteraction = _a.disabledInteraction, getContainer = _a.getContainer;
    var _e = __read(useState(createId), 1), id = _e[0];
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('tour-mask');
    var maskId = cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["mask-", ""], ["mask-", ""])), id);
    var isSafari = typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    // 逻辑 copy 自 antd 部分代码，猜测兼容老版本 Safari
    var maskRectSize = isSafari ? { width: '100%', height: '100%' } : { width: '100vw', height: '100vh' };
    useScrollLocker(open && !getContainer);
    return (React.createElement(Portal, { visible: open, getContainer: getContainer },
        React.createElement(CSSTransition, { in: open, timeout: 300, classNames: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""]))), unmountOnExit: true, appear: true },
            React.createElement("div", { style: __assign({ position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, zIndex: zIndex, pointerEvents: pos && !disabledInteraction ? 'none' : 'auto' }, style) }, showMask && (React.createElement("svg", { style: {
                    width: '100%',
                    height: '100%',
                } },
                React.createElement("defs", null,
                    React.createElement("mask", { id: maskId },
                        React.createElement("rect", __assign({ x: "0", y: "0" }, maskRectSize, { fill: "white" })),
                        pos && (React.createElement("rect", { x: pos.left, y: pos.top, rx: pos.radius, width: pos.width, height: pos.height, fill: "black", className: classNames(animated && cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["placeholder-animated"], ["placeholder-animated"])))) })))),
                React.createElement("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: fill, mask: "url(#".concat(maskId, ")") }),
                pos && (React.createElement(React.Fragment, null,
                    React.createElement("rect", __assign({}, COVER_PROPS, { x: "0", y: "0", width: "100%", height: pos.top })),
                    React.createElement("rect", __assign({}, COVER_PROPS, { x: "0", y: "0", width: pos.left, height: "100%" })),
                    React.createElement("rect", __assign({}, COVER_PROPS, { x: "0", y: pos.top + pos.height, width: "100%", height: "calc(100vh - ".concat(pos.top + pos.height, "px)") })),
                    React.createElement("rect", __assign({}, COVER_PROPS, { x: pos.left + pos.width, y: "0", width: "calc(100vw - ".concat(pos.left + pos.width, "px)"), height: "100%" }))))))))));
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Mask.js.map