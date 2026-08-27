import { __assign, __makeTemplateObject, __read } from "tslib";
import React, { useMemo, useRef } from 'react';
import { isNil, noop, omit } from 'lodash-es';
import cx from 'classnames';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { useCEllipsis } from './hooks';
import CCopy from '../CCopy';
import { getChildrenString } from '../_utils/reactChildren';
import { Popover } from '@arco-design/web-react';
import { useCConfigContext } from '../CConfigProvider';
var cssRoot = classNamePrefixFactory('ellipsis');
export var testId = {
    container: cssRoot(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))),
    content: cssRoot(templateObject_2 || (templateObject_2 = __makeTemplateObject(["content"], ["content"]))),
    copy: cssRoot(templateObject_3 || (templateObject_3 = __makeTemplateObject(["copy"], ["copy"]))),
};
function CEllipsis(props) {
    var _a, _b, _c, _d;
    var children = props.children, content = props.content, maxWidth = props.maxWidth, popoverContent = props.popoverContent, arcoPopoverProps = props.arcoPopoverProps, _e = props.showPopover, showPopover = _e === void 0 ? 'auto' : _e, _f = props.copyPosition, copyPosition = _f === void 0 ? 'Container' : _f, _g = props.showCopy, showCopy = _g === void 0 ? false : _g, cCopyProps = props.cCopyProps, style = props.style, suffix = props.suffix, _h = props.onClick, onClick = _h === void 0 ? noop : _h, _j = props.defaultText, defaultText = _j === void 0 ? '-' : _j, className = props.className;
    var useCssPrefix = useCConfigContext().useCssPrefix;
    var cssPrefix = useCssPrefix('ellipsis');
    var popoverCssPrefix = useCssPrefix('ellipsis-popover');
    var contentRef = useRef(null);
    var text = useMemo(function () { return children !== null && children !== void 0 ? children : content; }, [children, content]);
    var _k = __read(useCEllipsis(contentRef), 1), isTextOverflow = _k[0].isTextOverflow;
    var disabled = showPopover === false || (showPopover === 'auto' && !isTextOverflow);
    var popContent = popoverContent || (arcoPopoverProps === null || arcoPopoverProps === void 0 ? void 0 : arcoPopoverProps.content) || text;
    var renderedPopContent = typeof popContent === 'function' ? popContent(isTextOverflow, getChildrenString(text)) : popContent;
    var popContentWithCopy = showCopy === true && copyPosition === 'Popover' ? (React.createElement(React.Fragment, null,
        renderedPopContent,
        React.createElement(CCopy, __assign({ className: popoverCssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["copy"], ["copy"]))), text: (cCopyProps === null || cCopyProps === void 0 ? void 0 : cCopyProps.text) || getChildrenString(renderedPopContent) }, omit(cCopyProps, 'text'))))) : (renderedPopContent);
    /** Copy 组件 hover 或固定渲染在容器中 */
    var copyInContainer = showCopy && copyPosition === 'Container';
    /** Copy 组件当 hover 时才渲染在容器中 */
    var copyInContainerByHover = copyInContainer && showCopy === 'hover';
    return (React.createElement("div", { style: __assign({ maxWidth: maxWidth || '100%' }, style), className: cx(cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject([""], [""]))), className, (_a = {},
            _a[cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["copy"], ["copy"])))] = copyInContainerByHover,
            _a)), "data-cy": testId.container, "data-testid": testId.container },
        React.createElement(Popover, __assign({ className: cx(popoverCssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject([""], [""]))), (_b = {},
                _b[popoverCssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["disabled"], ["disabled"])))] = disabled,
                _b)), 
            // 由于 Popover 内部会进行 style: display 赋值，会覆盖外部传入的 display 值
            // 因此以下的 style: display 不生效
            // style={{
            //   display: disabled ? 'none' : '',
            // }}
            disabled: disabled, 
            // Arco Popover 的 Bug, 当存在 extra 节点时，需特殊设置
            // popupVisible={arcoPopoverProps?.popupVisible || (isHover && !disabled)}
            content: popContentWithCopy }, omit(arcoPopoverProps, 'content')),
            React.createElement("span", { ref: contentRef, "data-testid": testId.content, className: cx(cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["content"], ["content"]))), (_c = {},
                    _c[cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["pointer"], ["pointer"])))] = !disabled,
                    _c[cssPrefix(templateObject_11 || (templateObject_11 = __makeTemplateObject(["content__copy"], ["content__copy"])))] = copyInContainerByHover,
                    _c)), onClick: onClick }, isNil(text) || text === '' ? defaultText : text)),
        (copyInContainer || !!suffix) && (React.createElement("div", { className: cssPrefix(templateObject_12 || (templateObject_12 = __makeTemplateObject(["extra"], ["extra"]))) },
            copyInContainer && (React.createElement(CCopy, __assign({ "data-testid": testId.copy, text: (cCopyProps === null || cCopyProps === void 0 ? void 0 : cCopyProps.text) || getChildrenString(text) }, omit(cCopyProps, 'text'), { className: cx((_d = {},
                    _d[cssPrefix(templateObject_13 || (templateObject_13 = __makeTemplateObject(["hidden"], ["hidden"])))] = showCopy === 'hover',
                    _d)) }))),
            !!suffix && typeof suffix === 'function' ? suffix() : suffix))));
}
CEllipsis.displayName = 'CEllipsis';
export default CEllipsis;
export { useCEllipsis } from './hooks';
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;
//# sourceMappingURL=index.js.map