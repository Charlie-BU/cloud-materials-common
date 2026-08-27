"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../../_utils/classNamePrefixFactory"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var ahooks_1 = require("ahooks");
var CFormAnchor_1 = require("../../CFormAnchor");
var hooks_1 = require("@storage-fe/formily-arco/es/FormStep/hooks");
var lodash_es_1 = require("lodash-es");
var CConfigProvider_1 = tslib_1.__importStar(require("../../../../../CConfigProvider"));
var cssPrefix = (0, classNamePrefixFactory_1.default)('form-decorator');
var testId = {
    decoratorContainer: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))),
};
var DefaultCFormDecorator = function (props) {
    var _a, _b, _c, _d, _e;
    var _f = props || {}, style = _f.style, _g = _f.className, className = _g === void 0 ? '' : _g, arcoSteps = _f.arcoSteps, steps = _f.steps, topSlot = _f.topSlot, headerSlot = _f.headerSlot, footerSlot = _f.footerSlot, residentContentSlot = _f.residentContentSlot, children = _f.children, getPopupContainer = _f.getPopupContainer;
    var formStep = (0, hooks_1.useFormStep)();
    var useCssPrefix = (0, react_1.useContext)(CConfigProvider_1.CConfigContext).useCssPrefix;
    var cssPrefix = useCssPrefix('form-decorator');
    var anchorInfo = formStep === null || formStep === void 0 ? void 0 : formStep.data.anchor[formStep.current];
    var _h = tslib_1.__read((0, react_1.useState)(function () { return "".concat(Date.now(), "c-form-step-content-wrapper"); }), 1), ScrollContainerID = _h[0];
    var _j = tslib_1.__read((0, react_1.useState)(67), 2), anrchorScollOffset = _j[0], setAnrchorScollOffset = _j[1];
    var _k = props.stickyType, stickyType = _k === void 0 ? 'headerSticky' : _k, _l = props.isFullPage, isFullPage = _l === void 0 ? true : _l, _m = props.isHeaderSeperatorLinkup, isHeaderSeperatorLinkup = _m === void 0 ? false : _m, headerStyle = props.headerStyle;
    var prefixStr = cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""])));
    var processHeaderSeperator = (0, react_1.useCallback)(function () {
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
    var processHeaderSeperatorThrottle = (0, ahooks_1.useThrottleFn)(function () {
        processHeaderSeperator();
    }, { wait: 200 });
    var processTopOffset = (0, react_1.useCallback)(function () {
        var _a, _b;
        var headerInnerElement = (_a = document.getElementsByClassName("".concat(prefixStr, "-innerElementHeader"))) === null || _a === void 0 ? void 0 : _a[0];
        var topInnerElement = (_b = document.getElementsByClassName("".concat(prefixStr, "-innerElementTop"))) === null || _b === void 0 ? void 0 : _b[0];
        if (topInnerElement && headerInnerElement && ['headerTopSticky'].includes(stickyType)) {
            topInnerElement.classList.add("".concat(prefixStr, "-isSticky"));
            topInnerElement.style.top = "".concat(headerInnerElement.offsetHeight, "px");
        }
    }, []);
    var processResidentOffset = (0, react_1.useCallback)(function () {
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
    var calculateAnrchorScollOffset = (0, react_1.useCallback)(function () {
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
    var processArchorOffset = (0, react_1.useCallback)(function () {
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
    (0, react_1.useEffect)(function () {
        processHeaderSeperator();
        processTopOffset();
        processResidentOffset();
        processArchorOffset();
        calculateAnrchorScollOffset();
        window.onresize = function () {
            processHeaderSeperatorThrottle.run();
        };
    }, []);
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject([""], [""]))), (_a = {}, _a[cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["fullpage"], ["fullpage"])))] = isFullPage, _a), className), style: style, "data-cy": testId.decoratorContainer, "data-testid": testId.decoratorContainer },
        react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["mainContainer"], ["mainContainer"])))) },
            react_1.default.createElement("div", { id: ScrollContainerID, className: (0, classnames_1.default)(cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["scrollContainer"], ["scrollContainer"]))), (_b = {},
                    _b[cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["scrollContainer-bottomLine"], ["scrollContainer-bottomLine"])))] = !!(0, lodash_es_1.get)(footerSlot, 'props.children'),
                    _b)) },
                (0, lodash_es_1.get)(headerSlot, 'props.children') ? (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["innerElement"], ["innerElement"]))), cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["innerElementHeader"], ["innerElementHeader"]))), (_c = {},
                        _c[cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["isSticky"], ["isSticky"])))] = ['headerSticky', 'headerTopSticky'].includes(stickyType),
                        _c)), style: {
                        top: 0,
                    } },
                    react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["header"], ["header"])))), style: headerStyle },
                        react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["header-inner"], ["header-inner"])))) }, headerSlot),
                        react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["header-headerSeperator"], ["header-headerSeperator"])))) })))) : null,
                (0, lodash_es_1.get)(topSlot, 'props.children') ? (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["innerElement"], ["innerElement"]))), cssPrefix(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["innerElementTop"], ["innerElementTop"])))) },
                    react_1.default.createElement("div", { className: cssPrefix(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["top"], ["top"]))) }, topSlot))) : null,
                (0, lodash_es_1.get)(arcoSteps, 'props.children') ? (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["innerElement"], ["innerElement"]))), cssPrefix(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["innerElementStep"], ["innerElementStep"])))) },
                    react_1.default.createElement("div", { className: cssPrefix(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["steps"], ["steps"]))) },
                        react_1.default.createElement("div", { className: cssPrefix(templateObject_20 || (templateObject_20 = tslib_1.__makeTemplateObject(["steps-inner"], ["steps-inner"]))) }, arcoSteps)))) : null,
                react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_21 || (templateObject_21 = tslib_1.__makeTemplateObject(["innerElement"], ["innerElement"]))), cssPrefix(templateObject_22 || (templateObject_22 = tslib_1.__makeTemplateObject(["innerElementContent"], ["innerElementContent"])))) },
                    react_1.default.createElement(CConfigProvider_1.default, { getPopupContainer: getPopupContainer !== null && getPopupContainer !== void 0 ? getPopupContainer : (function () { var _a; return (_a = document.getElementById(ScrollContainerID)) !== null && _a !== void 0 ? _a : document.body; }) },
                        react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_23 || (templateObject_23 = tslib_1.__makeTemplateObject(["content-container"], ["content-container"]))), (_d = {},
                                _d[cssPrefix(templateObject_24 || (templateObject_24 = tslib_1.__makeTemplateObject(["content-container-no-header"], ["content-container-no-header"])))] = (0, lodash_es_1.get)(arcoSteps, 'props.children')
                                    ? true
                                    : !(0, lodash_es_1.get)(headerSlot, 'props.children') && !(0, lodash_es_1.get)(topSlot, 'props.children'),
                                _d[cssPrefix(templateObject_25 || (templateObject_25 = tslib_1.__makeTemplateObject(["content-container-no-footer"], ["content-container-no-footer"])))] = !(0, lodash_es_1.get)(footerSlot, 'props.children'),
                                _d)) },
                            (0, lodash_es_1.get)(steps, 'props.children') ? (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_26 || (templateObject_26 = tslib_1.__makeTemplateObject(["content-container-content"], ["content-container-content"]))), (_e = {},
                                    _e[cssPrefix(templateObject_27 || (templateObject_27 = tslib_1.__makeTemplateObject(["content-container-content-no-resident"], ["content-container-content-no-resident"])))] = !(0, lodash_es_1.get)(residentContentSlot, 'props.children'),
                                    _e)) }, steps)) : null,
                            (0, lodash_es_1.get)(residentContentSlot, 'props.children') ? (react_1.default.createElement("div", { className: cssPrefix(templateObject_28 || (templateObject_28 = tslib_1.__makeTemplateObject(["content-container-resident-content"], ["content-container-resident-content"]))) },
                                react_1.default.createElement("div", { className: cssPrefix(templateObject_29 || (templateObject_29 = tslib_1.__makeTemplateObject(["content-container-resident-content-fix"], ["content-container-resident-content-fix"]))) }, residentContentSlot))) : null,
                            (((0, lodash_es_1.isPlainObject)(anchorInfo) && anchorInfo.isOn) || anchorInfo) && (react_1.default.createElement("div", { className: cssPrefix(templateObject_30 || (templateObject_30 = tslib_1.__makeTemplateObject(["content-anchor"], ["content-anchor"]))) },
                                react_1.default.createElement("div", { className: cssPrefix(templateObject_31 || (templateObject_31 = tslib_1.__makeTemplateObject(["content-anchor-fix"], ["content-anchor-fix"]))) },
                                    react_1.default.createElement(CFormAnchor_1.CFormAnchor, { anchorInfo: anchorInfo, scrollContainer: ScrollContainerID, anrchorScollOffset: anrchorScollOffset, current: formStep.current }))))),
                        children))),
            (0, lodash_es_1.get)(footerSlot, 'props.children') ? (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_32 || (templateObject_32 = tslib_1.__makeTemplateObject(["innerElement"], ["innerElement"]))), cssPrefix(templateObject_33 || (templateObject_33 = tslib_1.__makeTemplateObject(["innerElementFooter"], ["innerElementFooter"])))) },
                react_1.default.createElement("div", { className: cssPrefix(templateObject_34 || (templateObject_34 = tslib_1.__makeTemplateObject(["footer"], ["footer"]))) }, footerSlot))) : null)));
};
exports.default = DefaultCFormDecorator;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34;
//# sourceMappingURL=index.js.map