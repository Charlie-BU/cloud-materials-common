"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var ahooks_1 = require("ahooks");
var useLimitMaxRows_1 = tslib_1.__importDefault(require("../hooks/useLimitMaxRows"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var hooks_1 = require("./hooks");
var _1 = require(".");
var CConfigProvider_1 = require("../CConfigProvider");
var HideStyle = {
    zIndex: -999,
    opacity: 0,
    height: 0,
};
var CCollapseText = function (props) {
    var data = props.data, expanded = props.expanded, _a = props.showRows, showRows = _a === void 0 ? 3 : _a, maxRows = props.maxRows, className = props.className, style = props.style, operateRender = props.operateRender, defaultExpanded = props.defaultExpanded, onExpandedChange = props.onExpandedChange;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var cssPrefix = useCssPrefix('collapse');
    var containerRef = (0, react_1.useRef)(null);
    var textRef = (0, react_1.useRef)(null);
    var _c = (0, useLimitMaxRows_1.default)({
        target: textRef,
        maxRows: maxRows,
        manual: true,
    }), isOver = _c.isOver, setMaxHeight = _c.setMaxHeight;
    var size = (0, ahooks_1.useSize)(containerRef);
    var _d = tslib_1.__read((0, hooks_1.useCollapse)({
        ref: textRef,
        showRows: showRows,
        defaultExpanded: defaultExpanded,
        expanded: expanded,
        length: data.length,
        containerWidth: size === null || size === void 0 ? void 0 : size.width,
    }), 2), _e = _d[0], showOpt = _e.showOpt, status = _e.status, sliceIndex = _e.sliceIndex, expand = _e.expand, _f = _d[1], handleExpand = _f.handleExpand, handleCollapse = _f.handleCollapse;
    (0, react_1.useLayoutEffect)(function () {
        if (defaultExpanded) {
            setMaxHeight();
        }
    }, []);
    (0, react_1.useEffect)(function () {
        onExpandedChange === null || onExpandedChange === void 0 ? void 0 : onExpandedChange(expand);
    }, [expand]);
    (0, react_1.useLayoutEffect)(function () {
        if (status === hooks_1.STATUS.START) {
            setMaxHeight();
        }
    }, [status, maxRows]);
    var displayData = data.slice(0, sliceIndex);
    // 展开收起操作样式
    var renderTextOperate = function () {
        // 非数组
        var innerRender;
        if (operateRender) {
            innerRender = operateRender(expand);
        }
        else {
            innerRender = expand ? locale.CCollapse.close : locale.CCollapse.expand;
        }
        return (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["operation"], ["operation"]))), "data-cy": _1.testId.operate, onClick: function () {
                if (expand) {
                    handleCollapse();
                }
                else {
                    handleExpand();
                }
            } }, innerRender));
    };
    return (react_1.default.createElement("div", { style: tslib_1.__assign({ width: '100%' }, style), className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))), cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["text"], ["text"]))), className), ref: containerRef, "data-cy": _1.testId.container },
        react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["text-container"], ["text-container"]))), isOver && expand ? 'over' : '') },
            react_1.default.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["text-content"], ["text-content"]))), style: status !== hooks_1.STATUS.END ? HideStyle : undefined, ref: textRef }, status !== hooks_1.STATUS.END ? (react_1.default.createElement(react_1.default.Fragment, null,
                Array.from(displayData).map(function (item, index) {
                    return (react_1.default.createElement("span", { key: index, className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["text-letter"], ["text-letter"]))) }, item));
                }),
                showOpt && !expand && react_1.default.createElement("span", { className: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["text-ellipsis"], ["text-ellipsis"]))) }, "..."))) : (react_1.default.createElement(react_1.default.Fragment, null,
                displayData,
                showOpt && !expand && react_1.default.createElement(react_1.default.Fragment, null, "..."))))),
        showOpt && renderTextOperate()));
};
exports.default = CCollapseText;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=Text.js.map