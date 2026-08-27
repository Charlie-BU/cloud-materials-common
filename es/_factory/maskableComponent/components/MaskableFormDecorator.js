import { __assign, __makeTemplateObject } from "tslib";
import React from 'react';
import ReactDOM from 'react-dom';
import { useCConfigContext } from '../../../CConfigProvider';
import classNames from 'classnames';
var MaskableFormDecorator = function (_a) {
    var steps = _a.steps, arcoSteps = _a.arcoSteps, footerSlot = _a.footerSlot, topSlot = _a.topSlot, headerSlot = _a.headerSlot, children = _a.children, residentContentSlot = _a.residentContentSlot, stickyStep = _a.stickyStep, stepsProps = _a.stepsProps, footerContainer = _a.footerContainer, headerContainer = _a.headerContainer, topContainer = _a.topContainer;
    var footerContainerNode = footerContainer === null || footerContainer === void 0 ? void 0 : footerContainer();
    var topContainerNode = topContainer === null || topContainer === void 0 ? void 0 : topContainer();
    var headerContainerNode = headerContainer === null || headerContainer === void 0 ? void 0 : headerContainer();
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('maskable-form');
    // for tree shaking
    if (process.env.NODE_ENV !== 'production') {
        if (residentContentSlot) {
            throw new Error('暂不支持 `residentContent` ');
        }
    }
    var shouldStickyStep = Boolean(stickyStep && headerContainerNode);
    var arcoStepsCopy = arcoSteps &&
        React.cloneElement(arcoSteps, __assign({ className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["step"], ["step"]))), shouldStickyStep && cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["step-sticky"], ["step-sticky"]))), stepsProps === null || stepsProps === void 0 ? void 0 : stepsProps.className) }, stepsProps));
    return (React.createElement(React.Fragment, null,
        headerContainerNode && headerSlot
            ? ReactDOM.createPortal(React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["header"], ["header"]))) }, headerSlot), headerContainerNode)
            : headerSlot,
        topContainerNode && ReactDOM.createPortal(topSlot, topContainerNode),
        footerContainerNode && ReactDOM.createPortal(footerSlot, footerContainerNode),
        shouldStickyStep
            ? headerContainerNode && arcoStepsCopy && ReactDOM.createPortal(arcoStepsCopy, headerContainerNode)
            : arcoStepsCopy,
        steps,
        children));
};
export default MaskableFormDecorator;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=MaskableFormDecorator.js.map