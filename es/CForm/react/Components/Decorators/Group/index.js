import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React from 'react';
import { connect, mapProps } from '@formily/react';
import toArray from 'rc-util/lib/Children/toArray';
import classNamePrefixFactory from '../../../../../_utils/classNamePrefixFactory';
import classNames from 'classnames';
export var cssPrefix = classNamePrefixFactory('cform-group');
var GroupComponent = function (props) {
    var title = props.title, children = props.children, className = props.className, restProps = __rest(props, ["title", "children", "className"]);
    var childNodes = toArray(children);
    var itemsNodes = [];
    var removeNodes = [];
    childNodes.forEach(function (child) {
        var _a;
        var childPropsComponent = (_a = child === null || child === void 0 ? void 0 : child.props) === null || _a === void 0 ? void 0 : _a.component;
        // 对应 field.component 属性
        var _b = __read(childPropsComponent || [], 1), component = _b[0];
        switch (component === null || component === void 0 ? void 0 : component.displayName) {
            case 'CArrayRemove':
                removeNodes.push(child);
                break;
            default:
                itemsNodes.push(child);
                break;
        }
    });
    var _a = __read(removeNodes, 1), removeNode = _a[0];
    return (React.createElement("div", __assign({}, restProps, { className: classNames(cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), className) }),
        title && React.createElement("div", { className: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["title"], ["title"]))) }, title),
        removeNode && React.createElement("span", { className: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["remove-container"], ["remove-container"]))) }, removeNode),
        itemsNodes));
};
export var CGroup = connect(GroupComponent, mapProps(function (props, field) {
    if (!field)
        return props;
    return __assign({ title: field.title }, field.decoratorProps);
}));
CGroup.displayName = 'Group';
export default CGroup;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map