"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_dom_1 = tslib_1.__importDefault(require("react-dom"));
var CConfigProvider_1 = require("../../../CConfigProvider");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var MaskableFormDecorator = function (_a) {
    var steps = _a.steps, arcoSteps = _a.arcoSteps, footerSlot = _a.footerSlot, topSlot = _a.topSlot, headerSlot = _a.headerSlot, children = _a.children, residentContentSlot = _a.residentContentSlot, stickyStep = _a.stickyStep, stepsProps = _a.stepsProps, footerContainer = _a.footerContainer, headerContainer = _a.headerContainer, topContainer = _a.topContainer;
    var footerContainerNode = footerContainer === null || footerContainer === void 0 ? void 0 : footerContainer();
    var topContainerNode = topContainer === null || topContainer === void 0 ? void 0 : topContainer();
    var headerContainerNode = headerContainer === null || headerContainer === void 0 ? void 0 : headerContainer();
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('maskable-form');
    // for tree shaking
    if (process.env.NODE_ENV !== 'production') {
        if (residentContentSlot) {
            throw new Error('暂不支持 `residentContent` ');
        }
    }
    var shouldStickyStep = Boolean(stickyStep && headerContainerNode);
    var arcoStepsCopy = arcoSteps &&
        react_1.default.cloneElement(arcoSteps, tslib_1.__assign({ className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["step"], ["step"]))), shouldStickyStep && cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["step-sticky"], ["step-sticky"]))), stepsProps === null || stepsProps === void 0 ? void 0 : stepsProps.className) }, stepsProps));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        headerContainerNode && headerSlot
            ? react_dom_1.default.createPortal(react_1.default.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["header"], ["header"]))) }, headerSlot), headerContainerNode)
            : headerSlot,
        topContainerNode && react_dom_1.default.createPortal(topSlot, topContainerNode),
        footerContainerNode && react_dom_1.default.createPortal(footerSlot, footerContainerNode),
        shouldStickyStep
            ? headerContainerNode && arcoStepsCopy && react_dom_1.default.createPortal(arcoStepsCopy, headerContainerNode)
            : arcoStepsCopy,
        steps,
        children));
};
exports.default = MaskableFormDecorator;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=MaskableFormDecorator.js.map