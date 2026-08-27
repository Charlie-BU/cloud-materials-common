import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import classNames from 'classnames';
import { getChildrenString } from '../../_utils/reactChildren';
import { TagsCopy } from './Copy';
import CCollapse from '../../CCollapse';
import { useCConfigContext } from '../../CConfigProvider';
import CTag from '..';
/**
 * @description 标签组
 */
var CTags = function (props) {
    var _a;
    var children = props.children, maxShowCount = props.maxShowCount, className = props.className, data = props.data, cCollapseProps = props.cCollapseProps, style = props.style, copyable = props.copyable, renderItem = props.renderItem, restProps = __rest(props, ["children", "maxShowCount", "className", "data", "cCollapseProps", "style", "copyable", "renderItem"]);
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefixTags = useCssPrefix('tags');
    var copyContent = children
        ? children.map(function (child) { return getChildrenString(child); })
        : data === null || data === void 0 ? void 0 : data.map(function (tag) { return (typeof tag === 'string' ? tag : "".concat(tag.prefix, ":").concat(tag.value)); });
    var _collapseProps = __assign(__assign({}, cCollapseProps), { style: style, className: classNames(cssPrefixTags(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))), className), mode: copyable || (cCollapseProps === null || cCollapseProps === void 0 ? void 0 : cCollapseProps.extraRender) ? 'popover' : cCollapseProps === null || cCollapseProps === void 0 ? void 0 : cCollapseProps.mode, extraRender: (_a = cCollapseProps === null || cCollapseProps === void 0 ? void 0 : cCollapseProps.extraRender) !== null && _a !== void 0 ? _a : (function () { return React.createElement(TagsCopy, { copyable: copyable, content: copyContent || '' }); }) });
    // 渲染子元素
    if (children) {
        return (React.createElement(CCollapse, __assign({}, _collapseProps, { data: children, showCount: maxShowCount, itemRender: function (item) { return item; } })));
    }
    // 渲染数据源
    return (React.createElement(CCollapse, __assign({}, _collapseProps, { data: data, showCount: maxShowCount, itemRender: renderItem !== null && renderItem !== void 0 ? renderItem : (function (tag, index) {
            var isStringTag = typeof tag === 'string';
            return (React.createElement(CTag, __assign({ key: index, prefix: isStringTag ? undefined : tag.prefix }, restProps), isStringTag ? tag : tag.value));
        }) })));
};
CTags.displayName = 'CTags';
export default CTags;
var templateObject_1;
//# sourceMappingURL=index.js.map