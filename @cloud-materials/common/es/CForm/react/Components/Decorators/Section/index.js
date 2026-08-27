import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import { IconDown } from '@arco-design/web-react/icon';
import { connect, mapProps } from '@formily/react';
import React, { useEffect, useState } from 'react';
import classNamePrefixFactory from '../../../../../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { isNil } from 'lodash-es';
export var cssPrefix = classNamePrefixFactory('cform-section');
var Section = function (_a) {
    var _b, _c, _d;
    var title = _a.title, children = _a.children, _e = _a.isExpand, isExpand = _e === void 0 ? true : _e, _f = _a.enableCollapse, enableCollapse = _f === void 0 ? false : _f, className = _a.className, extra = _a.extra, restProps = __rest(_a, ["title", "children", "isExpand", "enableCollapse", "className", "extra"]);
    var _g = __read(useState(!enableCollapse || (enableCollapse && isExpand)), 2), expandStatus = _g[0], setExpandStatus = _g[1];
    useEffect(function () {
        if (enableCollapse) {
            if (isExpand !== expandStatus) {
                setExpandStatus(isExpand);
            }
        }
    }, [isExpand, enableCollapse]);
    return (React.createElement("div", __assign({ className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), className) }, restProps),
        React.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["header"], ["header"]))) },
            React.createElement("div", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["header-tag"], ["header-tag"]))) }),
            React.createElement("div", { onClick: function () { return enableCollapse && setExpandStatus(function (exp) { return !exp; }); }, className: classNames(cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["header-title"], ["header-title"]))), (_b = {}, _b[cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["header-title-pointer"], ["header-title-pointer"])))] = enableCollapse, _b)) },
                React.createElement("span", null, title),
                React.createElement("span", { className: classNames(cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["header-title-icon"], ["header-title-icon"]))), (_c = {},
                        _c[cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["header-title-icon-expand"], ["header-title-icon-expand"])))] = expandStatus,
                        _c[cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["header-title-icon-visible"], ["header-title-icon-visible"])))] = enableCollapse,
                        _c)) },
                    React.createElement(IconDown, null))),
            !isNil(extra) && React.createElement("div", { className: cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["header-extra"], ["header-extra"]))) }, extra)),
        React.createElement("div", { className: classNames(cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["section-children"], ["section-children"]))), (_d = {},
                _d[cssPrefix(templateObject_11 || (templateObject_11 = __makeTemplateObject(["collapse-children-hidden"], ["collapse-children-hidden"])))] = !expandStatus,
                _d)) }, children)));
};
export var CFormSection = connect(Section, mapProps(function (props, field) {
    if (!field)
        return props;
    return __assign({ title: field.title }, field.decoratorProps);
}));
export default Section;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
//# sourceMappingURL=index.js.map