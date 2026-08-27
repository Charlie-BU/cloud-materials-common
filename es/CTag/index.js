import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React, { useState } from 'react';
import classNames from 'classnames';
import { TagItem } from './TagItem';
import { useCConfigContext } from '../CConfigProvider';
import { TEST_ID } from './constant';
/**
 * @description 标签
 */
var CTag = function (props) {
    var _a;
    var prefix = props.prefix, restProps = __rest(props, ["prefix"]);
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefixTag = useCssPrefix('tag');
    var _b = __read(useState((_a = restProps.visible) !== null && _a !== void 0 ? _a : true), 2), isVisible = _b[0], setIsVisible = _b[1];
    if (prefix) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var className = restProps.className, style = restProps.style, restTagProps = __rest(restProps, ["className", "style"]);
        var isStringPrefix = typeof prefix === 'string';
        return (React.createElement("div", { className: classNames(cssPrefixTag(templateObject_1 || (templateObject_1 = __makeTemplateObject(["prefix"], ["prefix"]))), cssPrefixTag(templateObject_2 || (templateObject_2 = __makeTemplateObject(["prefix-", ""], ["prefix-", ""])), props.size || 'medium'), isStringPrefix && cssPrefixTag(templateObject_3 || (templateObject_3 = __makeTemplateObject(["prefix-string"], ["prefix-string"]))), restProps.className), style: !isVisible ? __assign(__assign({}, restProps.style), { display: 'none' }) : restProps.style, "data-testid": TEST_ID.prefixTag },
            isStringPrefix ? (React.createElement(TagItem, __assign({ type: "bordered", color: restProps.color, className: !restProps.color ? cssPrefixTag(templateObject_4 || (templateObject_4 = __makeTemplateObject(["prefix-default"], ["prefix-default"]))) : undefined }, restTagProps, { closable: false, closeIcon: undefined, checkable: false }), prefix)) : (prefix),
            React.createElement(TagItem, __assign({ type: "outline" }, restTagProps, { style: { borderLeft: 'none' }, onClose: function (e) {
                    var _a;
                    setIsVisible(false);
                    (_a = restProps.onClose) === null || _a === void 0 ? void 0 : _a.call(restProps, e);
                } }))));
    }
    return React.createElement(TagItem, __assign({}, restProps));
};
CTag.displayName = 'CTag';
export { default as CTags } from './Tags';
export default CTag;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map