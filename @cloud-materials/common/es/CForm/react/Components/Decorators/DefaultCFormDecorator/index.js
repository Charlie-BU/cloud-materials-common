import { __makeTemplateObject, __read } from "tslib";
import React, { useCallback, useContext, useEffect, useState } from 'react';
import classNamePrefixFactory from '../../../../../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { useThrottleFn } from 'ahooks';
import { CFormAnchor } from '../../CFormAnchor';
import { useFormStep } from '@storage-fe/formily-arco/es/FormStep/hooks';
import { get, isPlainObject } from 'lodash-es';
import CConfigProvider, { CConfigContext } from '../../../../../CConfigProvider';
var cssPrefix = classNamePrefixFactory('form-decorator');
var testId = {
    decoratorContainer: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))),
};
var DefaultCFormDecorator = function (props) {
    var _a, _b, _c, _d, _e;
    var _f = props || {}, style = _f.style, _g = _f.className, className = _g === void 0 ? '' : _g, arcoSteps = _f.arcoSteps, steps = _f.steps, topSlot = _f.topSlot, headerSlot = _f.headerSlot, footerSlot = _f.footerSlot, residentContentSlot = _f.residentContentSlot, children = _f.children, getPopupContainer = _f.getPopupContainer;
    var formStep = useFormStep();
    var useCssPrefix = useContext(CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('form-decorator');
    var anchorInfo = formStep === null || formStep === void 0 ? void 0 : formStep.data.anchor[formStep.current];
    var _h = __read(useState(function () { return "".concat(Date.now(), "c-form-step-content-wrapper"); }), 1), ScrollContainerID = _h[0];
    var _j = __read(useState(67), 2), anrchorScollOffset = _j[0], setAnrchorScollOffset = _j[1];
    var _k = props.stickyType, stickyType = _k === void 0 ? 'headerSticky' : _k, _l = props.isFullPage, isFullPage = _l === void 0 ? true : _l, _m = props.isHeaderSeperatorLinkup, isHeaderSeperatorLinkup = _m === void 0 ? false : _m, headerStyle = props.headerStyle;
    var prefixStr = cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject([""], [""])));
    var processHeaderSeperator = useCallback(function () {
        var _a, _b, _c;
        var mainContaienr = (_a = document.getElementsByClassName("".concat(prefixStr, "-mainContainer"))) === null || _a === void 0 ? void 0 : _a[0];
        var headerContainer = (_b = document.getElementsByClassName("".concat(prefixStr, "-header"))) === null || _b === void 0 ? void 0 : _b[0];
        var seperatorContainer = (_c = document.getElementsByClassName("".concat(prefixStr, "-header-headerSeperator"))) === null || _c === void 0 ? void 0 : _c[0];
        if (!isFullPage || !isHeaderSeperatorLinkup || !mainContaienr || !headerContainer || !seperatorContainer)
            return;
        var offsetLeft = (mainContaienr.offsetWidth - headerContainer.offsetWidth) / 2;
        if (offsetLeft > 0) {
            seperatorContainer.style.width = "".concat(mainContaienr.offsetWidth, "px");
            seperatorContainer.style.left = "-".concat(offsetLeft, "px");
        }
        else {
            seperatorContainer.style.width = "100%";
            seperatorContainer.style.left = '0px';
        }
    }, []);
    var processHeaderSeperatorThrottle = useThrottleFn(function () {
        processHeaderSeperator();
    }, { wait: 200 });
    var processTopOffset = useCallback(function () {
        var _a, _b;
        var headerInnerElement = (_a = document.getElementsByClassName("".concat(prefixStr, "-innerElementHeader"))) === null || _a === void 0 ? void 0 : _a[0];
        var topInnerElement = (_b = document.getElementsByClassName("".concat(prefixStr, "-innerElementTop"))) === null || _b === void 0 ? void 0 : _b[0];
        if (topInnerElement && headerInnerElement && ['headerTopSticky'].includes(stickyType)) {
            topInnerElement.classList.add("".concat(prefixStr, "-isSticky"));
            topInnerElement.style.top = "".concat(headerInnerElement.offsetHeight, "px");
        }
    }, []);
    var processResidentOffset = useCallback(function () {
        var _a, _b, _c, _d, _e, _f;
        var headerInnerElement = (_a = document.getElementsByClassName("".concat(prefixStr, "-innerElementHeader"))) === null || _a === void 0 ? void 0 : _a[0];
        var topInnerElement = (_b = document.getElementsByClassName("".concat(prefixStr, "-innerElementTop"))) === null || _b === void 0 ? void 0 : _b[0];
        var residentELement = (_c = document.getElementsByClassName("".concat(prefixStr, "-content-container-resident-content-fix"))) === null || _c === void 0 ? void 0 : _c[0];
        if (residentELement) {
            var offset = 0;
            switch (stickyType) {
                case 'headerSticky':
                    offset = (_d = headerInnerElement === null || headerInnerElement === void 0 ? void 0 : headerInnerElement.offsetHeight) !== null && _d !== void 0 ? _d : 0;
                    break;
                case 'headerTopSticky':
                    offset = ((_e = headerInnerElement === null || headerInnerElement === void 0 ? void 0 : headerInnerElement.offsetHeight) !== null && _e !== void 0 ? _e : 0) + ((_f = topInnerElement === null || topInnerElement === void 0 ? void 0 : topInnerElement.offsetHeight) !== null && _f !== void 0 ? _f : 0);
                    break;
                default:
                    break;
            }
            residentELement.style.top = "".concat(offset, "px");
        }
    }, []);
    var calculateAnrchorScollOffset = useCallback(function () {
        var _a, _b, _c, _d, _e;
        var headerInnerElement = (_a = document.getElementsByClassName("".concat(prefixStr, "-innerElementHeader"))) === null || _a === void 0 ? void 0 : _a[0];
        var topInnerElement = (_b = document.getElementsByClassName("".concat(prefixStr, "-innerElementTop"))) === null || _b === void 0 ? void 0 : _b[0];
        var offset = 0;
        if (stickyType === 'headerSticky') {
            offset = (_c = headerInnerElement === null || headerInnerElement === void 0 ? void 0 : headerInnerElement.offsetHeight) !== null && _c !== void 0 ? _c : 0;
        }
        else if (stickyType === 'headerTopSticky') {
            offset = ((_d = headerInnerElement === null || headerInnerElement === void 0 ? void 0 : headerInnerElement.offsetHeight) !== null && _d !== void 0 ? _d : 0) + ((_e = topInnerElement === null || topInnerElement === void 0 ? void 0 : topInnerElement.offsetHeight) !== null && _e !== void 0 ? _e : 0);
        }
        setAnrchorScollOffset(offset);
    }, []);
    var processArchorOffset = useCallback(function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var archorELement = (_a = document.getElementsByClassName("".concat(prefixStr, "-content-anchor-fix"))) === null || _a === void 0 ? void 0 : _a[0];
        var headerInnerElement = (_b = document.getElementsByClassName("".concat(prefixStr, "-innerElementHeader"))) === null || _b === void 0 ? void 0 : _b[0];
        var topInnerElement = (_c = document.getElementsByClassName("".concat(prefixStr, "-innerElementTop"))) === null || _c === void 0 ? void 0 : _c[0];
        var scrollContainer = (_d = document.getElementsByClassName("".concat(prefixStr, "-scrollContainer"))) === null || _d === void 0 ? void 0 : _d[0];
        var height = ((_e = scrollContainer === null || scrollContainer === void 0 ? void 0 : scrollContainer.offsetHeight) !== null && _e !== void 0 ? _e : 0) -
            ((_f = headerInnerElement === null || headerInnerElement === void 0 ? void 0 : headerInnerElement.offsetHeight) !== null && _f !== void 0 ? _f : 0) -
            ((_g = topInnerElement === null || topInnerElement === void 0 ? void 0 : topInnerElement.offsetHeight) !== null && _g !== void 0 ? _g : 0) -
            20 -
            40;
        if (archorELement) {
            archorELement.style.top = "".concat(anrchorScollOffset, "px");
            if (height)
                archorELement.style.height = "".concat(height, "px");
        }
    }, []);
    useEffect(function () {
        processHeaderSeperator();
        processTopOffset();
        processResidentOffset();
        processArchorOffset();
        calculateAnrchorScollOffset();
        window.onresize = function () {
            processHeaderSeperatorThrottle.run();
        };
    }, []);
    return (React.createElement("div", { className: classNames(cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""]))), (_a = {}, _a[cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["fullpage"], ["fullpage"])))] = isFullPage, _a), className), style: style, "data-cy": testId.decoratorContainer, "data-testid": testId.decoratorContainer },
        React.createElement("div", { className: classNames(cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["mainContainer"], ["mainContainer"])))) },
            React.createElement("div", { id: ScrollContainerID, className: classNames(cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["scrollContainer"], ["scrollContainer"]))), (_b = {},
                    _b[cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["scrollContainer-bottomLine"], ["scrollContainer-bottomLine"])))] = !!get(footerSlot, 'props.children'),
                    _b)) },
                get(headerSlot, 'props.children') ? (React.createElement("div", { className: classNames(cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["innerElement"], ["innerElement"]))), cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["innerElementHeader"], ["innerElementHeader"]))), (_c = {},
                        _c[cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["isSticky"], ["isSticky"])))] = ['headerSticky', 'headerTopSticky'].includes(stickyType),
                        _c)), style: {
                        top: 0,
                    } },
                    React.createElement("div", { className: classNames(cssPrefix(templateObject_11 || (templateObject_11 = __makeTemplateObject(["header"], ["header"])))), style: headerStyle },
                        React.createElement("div", { className: classNames(cssPrefix(templateObject_12 || (templateObject_12 = __makeTemplateObject(["header-inner"], ["header-inner"])))) }, headerSlot),
                        React.createElement("div", { className: classNames(cssPrefix(templateObject_13 || (templateObject_13 = __makeTemplateObject(["header-headerSeperator"], ["header-headerSeperator"])))) })))) : null,
                get(topSlot, 'props.children') ? (React.createElement("div", { className: classNames(cssPrefix(templateObject_14 || (templateObject_14 = __makeTemplateObject(["innerElement"], ["innerElement"]))), cssPrefix(templateObject_15 || (templateObject_15 = __makeTemplateObject(["innerElementTop"], ["innerElementTop"])))) },
                    React.createElement("div", { className: cssPrefix(templateObject_16 || (templateObject_16 = __makeTemplateObject(["top"], ["top"]))) }, topSlot))) : null,
                get(arcoSteps, 'props.children') ? (React.createElement("div", { className: classNames(cssPrefix(templateObject_17 || (templateObject_17 = __makeTemplateObject(["innerElement"], ["innerElement"]))), cssPrefix(templateObject_18 || (templateObject_18 = __makeTemplateObject(["innerElementStep"], ["innerElementStep"])))) },
                    React.createElement("div", { className: cssPrefix(templateObject_19 || (templateObject_19 = __makeTemplateObject(["steps"], ["steps"]))) },
                        React.createElement("div", { className: cssPrefix(templateObject_20 || (templateObject_20 = __makeTemplateObject(["steps-inner"], ["steps-inner"]))) }, arcoSteps)))) : null,
                React.createElement("div", { className: classNames(cssPrefix(templateObject_21 || (templateObject_21 = __makeTemplateObject(["innerElement"], ["innerElement"]))), cssPrefix(templateObject_22 || (templateObject_22 = __makeTemplateObject(["innerElementContent"], ["innerElementContent"])))) },
                    React.createElement(CConfigProvider, { getPopupContainer: getPopupContainer !== null && getPopupContainer !== void 0 ? getPopupContainer : (function () { var _a; return (_a = document.getElementById(ScrollContainerID)) !== null && _a !== void 0 ? _a : document.body; }) },
                        React.createElement("div", { className: classNames(cssPrefix(templateObject_23 || (templateObject_23 = __makeTemplateObject(["content-container"], ["content-container"]))), (_d = {},
                                _d[cssPrefix(templateObject_24 || (templateObject_24 = __makeTemplateObject(["content-container-no-header"], ["content-container-no-header"])))] = get(arcoSteps, 'props.children')
                                    ? true
                                    : !get(headerSlot, 'props.children') && !get(topSlot, 'props.children'),
                                _d[cssPrefix(templateObject_25 || (templateObject_25 = __makeTemplateObject(["content-container-no-footer"], ["content-container-no-footer"])))] = !get(footerSlot, 'props.children'),
                                _d)) },
                            get(steps, 'props.children') ? (React.createElement("div", { className: classNames(cssPrefix(templateObject_26 || (templateObject_26 = __makeTemplateObject(["content-container-content"], ["content-container-content"]))), (_e = {},
                                    _e[cssPrefix(templateObject_27 || (templateObject_27 = __makeTemplateObject(["content-container-content-no-resident"], ["content-container-content-no-resident"])))] = !get(residentContentSlot, 'props.children'),
                                    _e)) }, steps)) : null,
                            get(residentContentSlot, 'props.children') ? (React.createElement("div", { className: cssPrefix(templateObject_28 || (templateObject_28 = __makeTemplateObject(["content-container-resident-content"], ["content-container-resident-content"]))) },
                                React.createElement("div", { className: cssPrefix(templateObject_29 || (templateObject_29 = __makeTemplateObject(["content-container-resident-content-fix"], ["content-container-resident-content-fix"]))) }, residentContentSlot))) : null,
                            ((isPlainObject(anchorInfo) && anchorInfo.isOn) || anchorInfo) && (React.createElement("div", { className: cssPrefix(templateObject_30 || (templateObject_30 = __makeTemplateObject(["content-anchor"], ["content-anchor"]))) },
                                React.createElement("div", { className: cssPrefix(templateObject_31 || (templateObject_31 = __makeTemplateObject(["content-anchor-fix"], ["content-anchor-fix"]))) },
                                    React.createElement(CFormAnchor, { anchorInfo: anchorInfo, scrollContainer: ScrollContainerID, anrchorScollOffset: anrchorScollOffset, current: formStep.current }))))),
                        children))),
            get(footerSlot, 'props.children') ? (React.createElement("div", { className: classNames(cssPrefix(templateObject_32 || (templateObject_32 = __makeTemplateObject(["innerElement"], ["innerElement"]))), cssPrefix(templateObject_33 || (templateObject_33 = __makeTemplateObject(["innerElementFooter"], ["innerElementFooter"])))) },
                React.createElement("div", { className: cssPrefix(templateObject_34 || (templateObject_34 = __makeTemplateObject(["footer"], ["footer"]))) }, footerSlot))) : null)));
};
export default DefaultCFormDecorator;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34;
//# sourceMappingURL=index.js.map