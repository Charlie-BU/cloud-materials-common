import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import cs from 'classnames';
import { useCConfigContext } from '../../CConfigProvider';
import classNamePrefixFactory from '../../_utils/classNamePrefixFactory';
var cssPrefix = classNamePrefixFactory("card-link-card-item");
export var testId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))),
    tag: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["tag"], ["tag"]))),
    content: cssPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["content"], ["content"]))),
};
var LinkListItem = function (props) {
    var children = props.children, content = props.content, className = props.className, tag = props.tag, rest = __rest(props, ["children", "content", "className", "tag"]);
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix("card-link-card-item");
    return (React.createElement("div", __assign({}, rest, { "data-testid": testId.container, className: cs(cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""]))), className) }),
        tag && (React.createElement("div", { "data-testid": testId.tag, className: cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["tag"], ["tag"]))) }, tag)),
        React.createElement("div", { "data-testid": testId.content, className: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["content"], ["content"]))) }, content !== null && content !== void 0 ? content : children)));
};
LinkListItem.displayName = 'LinkListItem';
export default LinkListItem;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=LinkListItem.js.map