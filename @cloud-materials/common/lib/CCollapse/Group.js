"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var web_react_1 = require("@arco-design/web-react");
var ahooks_1 = require("ahooks");
var useLimitMaxRows_1 = tslib_1.__importDefault(require("../hooks/useLimitMaxRows"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var hooks_1 = require("./hooks");
var _1 = require(".");
var CTag_1 = tslib_1.__importDefault(require("../CTag"));
var CConfigProvider_1 = require("../CConfigProvider");
var HideStyle = {
    zIndex: -999,
    opacity: 0,
    height: 0,
};
var CCollapseGroup = function (props) {
    var data = props.data, className = props.className, style = props.style, expanded = props.expanded, _a = props.showRows, showRows = _a === void 0 ? 3 : _a, showCount = props.showCount, maxRows = props.maxRows, itemRender = props.itemRender, operateRender = props.operateRender, extraRender = props.extraRender, defaultExpanded = props.defaultExpanded, onExpandedChange = props.onExpandedChange, mode = props.mode, arcoPopoverProps = props.arcoPopoverProps, itemKey = props.itemKey, suffixRender = props.suffixRender;
    var _b = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _b.useCssPrefix, locale = _b.locale;
    var cssPrefix = useCssPrefix('collapse');
    var containerRef = (0, react_1.useRef)(null);
    var groupRef = (0, react_1.useRef)(null);
    var popoverRef = (0, react_1.useRef)(null);
    var maxRowsContainerRef = mode === 'popover' ? popoverRef : groupRef;
    var _c = arcoPopoverProps || {}, onVisibleChange = _c.onVisibleChange, popoverClassName = _c.className, restPopoverProps = tslib_1.__rest(_c, ["onVisibleChange", "className"]);
    var _d = (0, useLimitMaxRows_1.default)({
        target: maxRowsContainerRef,
        maxRows: maxRows,
        manual: true,
    }), overHeight = _d.isOver, setMaxHeight = _d.setMaxHeight;
    var size = (0, ahooks_1.useSize)(containerRef);
    var _e = tslib_1.__read((0, hooks_1.useCollapse)({
        ref: groupRef,
        showRows: showRows,
        defaultExpanded: defaultExpanded,
        expanded: expanded,
        length: data.length,
        showCount: showCount,
        containerWidth: size === null || size === void 0 ? void 0 : size.width,
    }), 2), _f = _e[0], showOpt = _f.showOpt, status = _f.status, sliceIndex = _f.sliceIndex, expand = _f.expand, _g = _e[1], handleExpand = _g.handleExpand, handleCollapse = _g.handleCollapse;
    (0, react_1.useEffect)(function () {
        onExpandedChange === null || onExpandedChange === void 0 ? void 0 : onExpandedChange(expand);
    }, [expand]);
    (0, react_1.useLayoutEffect)(function () {
        if (status === hooks_1.STATUS.END && expand) {
            setMaxHeight();
        }
    }, [status, expand, maxRows]);
    var getItemKey = (0, react_1.useMemo)(function () {
        if (typeof itemKey === 'function') {
            return function (item) { return itemKey(item); };
        }
        return function (item) { return item[itemKey]; };
    }, [itemKey]);
    var displayData = data.slice(0, sliceIndex);
    var renderGroupItem = function (item, index, isInPopover) {
        return itemRender ? (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["group-item"], ["group-item"]))), key: itemKey ? getItemKey(item) : index }, itemRender(item, index, isInPopover))) : (react_1.default.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["group-item"], ["group-item"]))), key: itemKey ? getItemKey(item) : index },
            react_1.default.createElement(CTag_1.default, { type: isInPopover ? 'outline' : undefined }, item)));
    };
    var renderDefaultGroupOperate = function (isExpanded) {
        var restCount = data.length - sliceIndex;
        if (!showOpt) {
            return null;
        }
        if (operateRender) {
            return (
            // 自定义 render 也需要加外层，用来固定外层高度，需计算操作符是否和前一个元素在同一行，避免自定义样式导致计算失效。
            react_1.default.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["operation"], ["operation"]))), onClick: isExpanded ? handleCollapse : handleExpand, "data-cy": _1.testId.operate }, operateRender(isExpanded, restCount)));
        }
        return (react_1.default.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["operation"], ["operation"]))), onClick: isExpanded ? handleCollapse : handleExpand, "data-cy": _1.testId.operate }, isExpanded ? locale.CCollapse.close : "".concat(locale.CCollapse.expand, "(").concat(data.length - sliceIndex, ")")));
    };
    // 展开收起默认样式
    var renderDefaultGroup = function () {
        var followOptRender;
        if (expand) {
            if (!overHeight) {
                followOptRender = renderDefaultGroupOperate(expand);
            }
        }
        else {
            followOptRender = renderDefaultGroupOperate(expand);
        }
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["group-container"], ["group-container"]))), overHeight && expand ? 'over' : '') },
                react_1.default.createElement("div", { className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["group-content"], ["group-content"]))), style: status !== hooks_1.STATUS.END ? HideStyle : undefined, ref: groupRef },
                    displayData.map(function (item, index) {
                        return renderGroupItem(item, index);
                    }),
                    followOptRender)),
            expand && overHeight && renderDefaultGroupOperate(true)));
    };
    var renderPopoverGroup = function () {
        var restData = data.slice(sliceIndex);
        return (react_1.default.createElement("div", { className: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["group-content"], ["group-content"]))), ref: groupRef, style: status !== hooks_1.STATUS.END ? HideStyle : undefined },
            displayData.map(function (item, index) {
                return renderGroupItem(item, index);
            }),
            showOpt && (react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({ unmountOnExit: false, onVisibleChange: function (visible) {
                    if (visible) {
                        setTimeout(function () {
                            setMaxHeight();
                        }, 1);
                    }
                    onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(visible);
                }, className: (0, classnames_1.default)(cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["group-popover"], ["group-popover"]))), popoverClassName), content: react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", { className: cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["group-popover-content"], ["group-popover-content"]))), ref: popoverRef }, restData.map(function (item, index) {
                        return renderGroupItem(item, index, true);
                    })),
                    extraRender ? extraRender() : null), position: 'right' }, restPopoverProps),
                react_1.default.createElement("div", { className: cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["operation"], ["operation"]))), "data-cy": _1.testId.operate }, operateRender ? (operateRender(false, restData.length)) : (react_1.default.createElement(CTag_1.default, { type: "outline", shape: "round" },
                    "+",
                    restData.length))))),
            suffixRender && react_1.default.createElement("div", { className: cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["suffix"], ["suffix"]))) }, suffixRender)));
    };
    return (react_1.default.createElement("div", { style: tslib_1.__assign({ width: '100%' }, style), className: (0, classnames_1.default)(cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject([""], [""]))), cssPrefix(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["group"], ["group"]))), className), ref: containerRef, "data-cy": _1.testId.container }, mode === 'popover' ? renderPopoverGroup() : renderDefaultGroup()));
};
exports.default = CCollapseGroup;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;
//# sourceMappingURL=Group.js.map