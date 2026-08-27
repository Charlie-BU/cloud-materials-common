import { __makeTemplateObject } from "tslib";
import React from 'react';
import classNames from 'classnames';
import { useCConfigContext } from '../CConfigProvider';
var CBrandBanner = function (props) {
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('brand-banner');
    var style = props.style, className = props.className, title = props.title, description = props.description, imgUrl = props.imgUrl, operation = props.operation;
    var noOperation = operation === undefined || operation === null;
    return (React.createElement("div", { style: style, className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))), className), "data-cy": "c-m-brand-banner-container" },
        React.createElement("div", { className: classNames(cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["inner"], ["inner"])))) },
            React.createElement("div", { className: classNames(cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["inner-content"], ["inner-content"])))) },
                React.createElement("div", { className: cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["inner-content-title"], ["inner-content-title"]))), "data-cy": "c-m-brand-banner-inner-content-title" }, title),
                React.createElement("div", { className: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["inner-content-description"], ["inner-content-description"]))), "data-cy": "c-m-brand-banner-inner-content-description" }, description),
                noOperation ? (React.createElement(React.Fragment, null)) : (React.createElement("div", { className: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["inner-content-operation"], ["inner-content-operation"]))), "data-cy": "c-m-brand-banner-inner-content-operation" }, operation))),
            React.createElement("div", { className: cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["inner-thumb"], ["inner-thumb"]))) },
                React.createElement("img", { src: imgUrl })))));
};
CBrandBanner.displayName = 'CBrandBanner';
export default CBrandBanner;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=index.js.map