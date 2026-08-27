"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../CConfigProvider");
var CBrandBanner = function (props) {
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('brand-banner');
    var style = props.style, className = props.className, title = props.title, description = props.description, imgUrl = props.imgUrl, operation = props.operation;
    var noOperation = operation === undefined || operation === null;
    return (react_1.default.createElement("div", { style: style, className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))), className), "data-cy": "c-m-brand-banner-container" },
        react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["inner"], ["inner"])))) },
            react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["inner-content"], ["inner-content"])))) },
                react_1.default.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["inner-content-title"], ["inner-content-title"]))), "data-cy": "c-m-brand-banner-inner-content-title" }, title),
                react_1.default.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["inner-content-description"], ["inner-content-description"]))), "data-cy": "c-m-brand-banner-inner-content-description" }, description),
                noOperation ? (react_1.default.createElement(react_1.default.Fragment, null)) : (react_1.default.createElement("div", { className: cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["inner-content-operation"], ["inner-content-operation"]))), "data-cy": "c-m-brand-banner-inner-content-operation" }, operation))),
            react_1.default.createElement("div", { className: cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["inner-thumb"], ["inner-thumb"]))) },
                react_1.default.createElement("img", { src: imgUrl })))));
};
CBrandBanner.displayName = 'CBrandBanner';
exports.default = CBrandBanner;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=index.js.map