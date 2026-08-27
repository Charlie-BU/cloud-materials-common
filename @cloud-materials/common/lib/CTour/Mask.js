"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mask = void 0;
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var react_1 = tslib_1.__importStar(require("react"));
var CConfigProvider_1 = require("../CConfigProvider");
var createId_1 = require("../_utils/createId");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var react_transition_group_1 = require("react-transition-group");
var useScrollLocker_1 = tslib_1.__importDefault(require("../hooks/useScrollLocker"));
var COVER_PROPS = {
    fill: 'transparent',
    pointerEvents: 'auto',
};
var Mask = function (_a) {
    var pos = _a.pos, showMask = _a.showMask, _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.fill, fill = _c === void 0 ? 'rgba(0,0,0,0.5)' : _c, open = _a.open, _d = _a.animated, animated = _d === void 0 ? true : _d, zIndex = _a.zIndex, disabledInteraction = _a.disabledInteraction, getContainer = _a.getContainer;
    var _e = tslib_1.__read((0, react_1.useState)(createId_1.createId), 1), id = _e[0];
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('tour-mask');
    var maskId = cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["mask-", ""], ["mask-", ""])), id);
    var isSafari = typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    // 逻辑 copy 自 antd 部分代码，猜测兼容老版本 Safari
    var maskRectSize = isSafari ? { width: '100%', height: '100%' } : { width: '100vw', height: '100vh' };
    (0, useScrollLocker_1.default)(open && !getContainer);
    return (react_1.default.createElement(web_react_1.Portal, { visible: open, getContainer: getContainer },
        react_1.default.createElement(react_transition_group_1.CSSTransition, { in: open, timeout: 300, classNames: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))), unmountOnExit: true, appear: true },
            react_1.default.createElement("div", { style: tslib_1.__assign({ position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, zIndex: zIndex, pointerEvents: pos && !disabledInteraction ? 'none' : 'auto' }, style) }, showMask && (react_1.default.createElement("svg", { style: {
                    width: '100%',
                    height: '100%',
                } },
                react_1.default.createElement("defs", null,
                    react_1.default.createElement("mask", { id: maskId },
                        react_1.default.createElement("rect", tslib_1.__assign({ x: "0", y: "0" }, maskRectSize, { fill: "white" })),
                        pos && (react_1.default.createElement("rect", { x: pos.left, y: pos.top, rx: pos.radius, width: pos.width, height: pos.height, fill: "black", className: (0, classnames_1.default)(animated && cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["placeholder-animated"], ["placeholder-animated"])))) })))),
                react_1.default.createElement("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: fill, mask: "url(#".concat(maskId, ")") }),
                pos && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("rect", tslib_1.__assign({}, COVER_PROPS, { x: "0", y: "0", width: "100%", height: pos.top })),
                    react_1.default.createElement("rect", tslib_1.__assign({}, COVER_PROPS, { x: "0", y: "0", width: pos.left, height: "100%" })),
                    react_1.default.createElement("rect", tslib_1.__assign({}, COVER_PROPS, { x: "0", y: pos.top + pos.height, width: "100%", height: "calc(100vh - ".concat(pos.top + pos.height, "px)") })),
                    react_1.default.createElement("rect", tslib_1.__assign({}, COVER_PROPS, { x: pos.left + pos.width, y: "0", width: "calc(100vw - ".concat(pos.left + pos.width, "px)"), height: "100%" }))))))))));
};
exports.Mask = Mask;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Mask.js.map