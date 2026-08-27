"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCDrawerComponent = exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var hooks_1 = require("./hooks");
var COperationMenu_1 = tslib_1.__importDefault(require("../COperationMenu"));
var maskableComponent_1 = require("../_factory/maskableComponent");
var CConfigProvider_1 = require("../CConfigProvider");
var OriginDrawer_1 = tslib_1.__importDefault(require("./OriginDrawer"));
var hooks_2 = require("../hooks");
var testIdPrefix = (0, classNamePrefixFactory_1.default)('drawer');
exports.testId = {
    drawer: testIdPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))),
    cancelBtn: testIdPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["cancel-btn"], ["cancel-btn"]))),
    okBtn: testIdPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["ok-btn"], ["ok-btn"]))),
};
exports.BaseCDrawerComponent = react_1.default.forwardRef(function (_a, ref) {
    var children = _a.children, props = tslib_1.__rest(_a, ["children"]);
    var _b = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _b.useCssPrefix, _c = _b.cComponentConfig, _d = _c === void 0 ? {} : _c, CDrawer = _d.CDrawer;
    var cssPrefix = useCssPrefix('drawer');
    var containerClassName = cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject([""], [""])));
    var scrollRef = (0, react_1.useRef)(null);
    var mergedProps = (0, hooks_2.useMergeProps)(props, {}, CDrawer !== null && CDrawer !== void 0 ? CDrawer : {});
    var _e = tslib_1.__read((0, hooks_1.useCDrawer)(tslib_1.__assign(tslib_1.__assign({}, mergedProps), { preventCloseSelectors: [".".concat(containerClassName), "[".concat(maskableComponent_1.TriggerName, "]")] })), 1), _f = _e[0], className = _f.className, contentTop = _f.contentTop, contentBottom = _f.contentBottom, contentClassName = _f.contentClassName, title = _f.title, headerDescription = _f.headerDescription, titleAfter = _f.titleAfter, extraHeader = _f.extraHeader, _g = _f.width, width = _g === void 0 ? 1000 : _g, restProps = tslib_1.__rest(_f, ["className", "contentTop", "contentBottom", "contentClassName", "title", "headerDescription", "titleAfter", "extraHeader", "width"]);
    return (react_1.default.createElement(OriginDrawer_1.default, tslib_1.__assign({ className: (0, classnames_1.default)(containerClassName, restProps.mask === false && cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["shadow"], ["shadow"]))), className), width: width, getChildrenPopupContainer: function () { return document.body; } }, restProps, { title: react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["title-box"], ["title-box"]))) },
                react_1.default.createElement("div", { className: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["title"], ["title"]))) }, headerDescription ? (react_1.default.createElement(react_1.default.Fragment, null,
                    title,
                    react_1.default.createElement("div", { className: cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["header-desc"], ["header-desc"]))) }, headerDescription))) : (title)),
                titleAfter && (react_1.default.createElement("div", { className: cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["title-after"], ["title-after"]))) }, react_1.default.isValidElement(titleAfter) ? (titleAfter) : (react_1.default.createElement(COperationMenu_1.default, tslib_1.__assign({}, titleAfter)))))),
            extraHeader), "data-testid": exports.testId.drawer, "data-cy": exports.testId.drawer, okButtonProps: tslib_1.__assign(tslib_1.__assign({}, restProps.okButtonProps), { 
            // @ts-ignore
            'data-testid': exports.testId.okBtn }), cancelButtonProps: tslib_1.__assign(tslib_1.__assign({}, restProps.cancelButtonProps), { 
            // @ts-ignore
            'data-testid': exports.testId.cancelBtn }), ref: ref }),
        react_1.default.createElement(maskableComponent_1.ChildrenRenderer, { disableScrollShadow: true, contentTop: contentTop, contentBottom: contentBottom, className: (0, classnames_1.default)(cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["content"], ["content"]))), contentClassName), ref: scrollRef }, children)));
});
exports.BaseCDrawerComponent.displayName = 'CDrawer';
var BaseCDrawer = react_1.default.forwardRef(function (props, ref) { return (react_1.default.createElement(maskableComponent_1.MaskableProvider, null,
    react_1.default.createElement(exports.BaseCDrawerComponent, tslib_1.__assign({}, props, { ref: ref })))); });
BaseCDrawer.displayName = 'CDrawer';
exports.default = BaseCDrawer;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=Base.js.map