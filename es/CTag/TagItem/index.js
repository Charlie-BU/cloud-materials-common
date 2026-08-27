import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import { Tag as ArcoTag } from '@arco-design/web-react';
import classNames from 'classnames';
import { useCConfigContext } from '../../CConfigProvider';
import CEllipsis from '../../CEllipsis';
import { MAX_WIDTH, TEST_ID } from '../constant';
import { getTagStyle, isArcoColor } from '../util';
/**
 * @description 渲染标签
 */
export var TagItem = function (props) {
    var cEllipsisProps = props.cEllipsisProps, children = props.children, className = props.className, color = props.color, _a = props.maxWidth, maxWidth = _a === void 0 ? MAX_WIDTH : _a, _b = props.size, size = _b === void 0 ? 'medium' : _b, _c = props.shape, shape = _c === void 0 ? 'default' : _c, style = props.style, _d = props.type, type = _d === void 0 ? 'default' : _d, restProps = __rest(props, ["cEllipsisProps", "children", "className", "color", "maxWidth", "size", "shape", "style", "type"]);
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefixTag = useCssPrefix('tag');
    return (React.createElement(ArcoTag, __assign({}, restProps, { color: isArcoColor(color) ? color : undefined, className: classNames(cssPrefixTag(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), cssPrefixTag(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", ""], ["", ""])), size), cssPrefixTag(templateObject_3 || (templateObject_3 = __makeTemplateObject(["type-", ""], ["type-", ""])), type), cssPrefixTag(templateObject_4 || (templateObject_4 = __makeTemplateObject(["shape-", ""], ["shape-", ""])), shape), !color && shape === 'mark' && cssPrefixTag(templateObject_5 || (templateObject_5 = __makeTemplateObject(["default-mark"], ["default-mark"]))), className), style: __assign(__assign(__assign({}, getTagStyle(color, type, shape)), style), { maxWidth: maxWidth }), "data-testid": TEST_ID.tag }),
        React.createElement(CEllipsis, __assign({ showCopy: false }, cEllipsisProps),
            React.createElement(React.Fragment, null, children))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=index.js.map