"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderAlert = exports.isMaskableAlertType = exports.ChildrenRenderer = void 0;
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var resize_observer_1 = tslib_1.__importDefault(require("@react-hook/resize-observer"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var lodash_es_1 = require("lodash-es");
var react_1 = tslib_1.__importStar(require("react"));
var CConfigProvider_1 = require("../../../CConfigProvider");
var hooks_1 = require("../../../hooks");
var useScrollShadow_1 = require("../hooks/useScrollShadow");
exports.ChildrenRenderer = react_1.default.forwardRef(function (_a, ref) {
    var children = _a.children, contentBottom = _a.contentBottom, contentTop = _a.contentTop, disableScrollShadow = _a.disableScrollShadow, contentClassNameWhenContentTop = _a.contentClassNameWhenContentTop, maxHeight = _a.maxHeight, onMount = _a.onMount, resetProps = tslib_1.__rest(_a, ["children", "contentBottom", "contentTop", "disableScrollShadow", "contentClassNameWhenContentTop", "maxHeight", "onMount"]);
    var scrollRef = (0, react_1.useRef)(null);
    var contentTopRef = (0, react_1.useRef)(null);
    var contentBottomRef = (0, react_1.useRef)(null);
    var _b = tslib_1.__read((0, react_1.useState)(!Boolean(maxHeight)), 2), overflow = _b[0], setOverflow = _b[1];
    var onMountRef = (0, hooks_1.useAutoRef)(onMount);
    var _c = tslib_1.__read((0, useScrollShadow_1.useScrollPosition)(scrollRef), 2), shouldTopShadow = _c[0], shouldBottomShadow = _c[1];
    (0, react_1.useImperativeHandle)(ref, function () { return scrollRef.current; });
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
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('maskable-children-renderer');
    var checkOverflow = function (element) {
        var _a, _b, _c, _d;
        if (maxHeight) {
            setOverflow(element.scrollHeight >
                maxHeight - ((_b = (_a = contentTopRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight) !== null && _b !== void 0 ? _b : 0) - ((_d = (_c = contentBottomRef.current) === null || _c === void 0 ? void 0 : _c.clientHeight) !== null && _d !== void 0 ? _d : 0));
        }
    };
    (0, react_1.useLayoutEffect)(function () {
        var _a;
        (_a = onMountRef.current) === null || _a === void 0 ? void 0 : _a.call(onMountRef, scrollRef.current, maxHeight);
        checkOverflow(scrollRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxHeight]);
    (0, resize_observer_1.default)(scrollRef, function (_a) {
        var target = _a.target;
        checkOverflow(target);
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        contentTopNode && (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["both-end"], ["both-end"]))), ref: contentTopRef }, contentTopNode)),
        react_1.default.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))) },
            react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["scroll"], ["scroll"]))), shouldTopShadow && cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["scroll-top-shadow"], ["scroll-top-shadow"]))), shouldBottomShadow && cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["scroll-bottom-shadow"], ["scroll-bottom-shadow"])))), ref: scrollRef, "data-testid": "maskable-scroll", style: { overflow: overflow ? 'auto' : '' } },
                react_1.default.createElement("div", null, contentTopNodeInScrollBox),
                react_1.default.createElement("div", tslib_1.__assign({}, resetProps, { className: (0, classnames_1.default)(resetProps.className, Boolean(contentTopNode !== null && contentTopNode !== void 0 ? contentTopNode : contentTopNodeInScrollBox) && contentClassNameWhenContentTop) }), children),
                contentBottomNodeInScrollBox),
            !disableScrollShadow && (
            // 内阴影需要单独起元素盖在上面，不然内容会在阴影上方
            react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["shadow"], ["shadow"]))), shouldTopShadow && cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["shadow-top"], ["shadow-top"]))), shouldBottomShadow && cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["shadow-bottom"], ["shadow-bottom"])))), "data-testid": "maskable-shadow" }))),
        contentBottomNode && (react_1.default.createElement("div", { className: cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["both-end"], ["both-end"]))), ref: contentBottomRef }, contentBottomNode))));
});
exports.ChildrenRenderer.displayName = 'ChildrenRenderer';
var isMaskableAlertType = function (contentTop) {
    // 不是 reactElement，但是是对象
    if (contentTop && !react_1.default.isValidElement(contentTop) && typeof contentTop === 'object') {
        return true;
    }
    return false;
};
exports.isMaskableAlertType = isMaskableAlertType;
function renderAlert(alert, options) {
    if (options === void 0) { options = {}; }
    var ref = options.ref, extraProps = options.extraProps;
    if ((0, lodash_es_1.isString)(alert) || (0, lodash_es_1.isNumber)(alert)) {
        return react_1.default.createElement(web_react_1.Alert, tslib_1.__assign({}, extraProps, { content: alert, ref: ref }));
    }
    if (!(0, exports.isMaskableAlertType)(alert)) {
        return alert;
    }
    if (alert.type === 'custom') {
        return alert.content;
    }
    if (!alert.content) {
        return null;
    }
    var _ = alert.sticky, restProps = tslib_1.__rest(alert, ["sticky"]);
    return react_1.default.createElement(web_react_1.Alert, tslib_1.__assign({}, extraProps, restProps, { ref: ref }));
}
exports.renderAlert = renderAlert;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=ChildrenRenderer.js.map