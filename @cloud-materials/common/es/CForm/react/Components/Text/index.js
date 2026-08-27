import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import classNames from 'classnames';
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
import { mapProps, connect } from '@formily/react';
var cssPrefix = classNamePrefixFactory('cform-text');
var TextComponent = function (props) {
    var _a = props || {}, className = _a.className, children = _a.children, rest = __rest(_a, ["className", "children"]);
    return (React.createElement("span", __assign({ className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), className) }, rest), children));
};
var Text = connect(TextComponent, mapProps(function (props, field) {
    return {
        children: props.children || field.content || field.value,
    };
}));
export default Text;
var templateObject_1;
//# sourceMappingURL=index.js.map