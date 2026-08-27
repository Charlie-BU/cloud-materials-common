"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCEllipsis = exports.testId = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var lodash_es_1 = require("lodash-es");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var hooks_1 = require("./hooks");
var CCopy_1 = tslib_1.__importDefault(require("../CCopy"));
var reactChildren_1 = require("../_utils/reactChildren");
var web_react_1 = require("@arco-design/web-react");
var CConfigProvider_1 = require("../CConfigProvider");
var cssRoot = (0, classNamePrefixFactory_1.default)('ellipsis');
exports.testId = {
    container: cssRoot(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    content: cssRoot(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["content"], ["content"]))),
    copy: cssRoot(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["copy"], ["copy"]))),
};
function CEllipsis(props) {
    var _a, _b, _c, _d;
    var children = props.children, content = props.content, maxWidth = props.maxWidth, popoverContent = props.popoverContent, arcoPopoverProps = props.arcoPopoverProps, _e = props.showPopover, showPopover = _e === void 0 ? 'auto' : _e, _f = props.copyPosition, copyPosition = _f === void 0 ? 'Container' : _f, _g = props.showCopy, showCopy = _g === void 0 ? false : _g, cCopyProps = props.cCopyProps, style = props.style, suffix = props.suffix, _h = props.onClick, onClick = _h === void 0 ? lodash_es_1.noop : _h, _j = props.defaultText, defaultText = _j === void 0 ? '-' : _j, className = props.className;
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('ellipsis');
    var popoverCssPrefix = useCssPrefix('ellipsis-popover');
    var contentRef = (0, react_1.useRef)(null);
    var text = (0, react_1.useMemo)(function () { return children !== null && children !== void 0 ? children : content; }, [children, content]);
    var _k = tslib_1.__read((0, hooks_1.useCEllipsis)(contentRef), 1), isTextOverflow = _k[0].isTextOverflow;
    var disabled = showPopover === false || (showPopover === 'auto' && !isTextOverflow);
    var popContent = popoverContent || (arcoPopoverProps === null || arcoPopoverProps === void 0 ? void 0 : arcoPopoverProps.content) || text;
    var renderedPopContent = typeof popContent === 'function' ? popContent(isTextOverflow, (0, reactChildren_1.getChildrenString)(text)) : popContent;
    var popContentWithCopy = showCopy === true && copyPosition === 'Popover' ? (react_1.default.createElement(react_1.default.Fragment, null,
        renderedPopContent,
        react_1.default.createElement(CCopy_1.default, tslib_1.__assign({ className: popoverCssPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["copy"], ["copy"]))), text: (cCopyProps === null || cCopyProps === void 0 ? void 0 : cCopyProps.text) || (0, reactChildren_1.getChildrenString)(renderedPopContent) }, (0, lodash_es_1.omit)(cCopyProps, 'text'))))) : (renderedPopContent);
    /** Copy 组件 hover 或固定渲染在容器中 */
    var copyInContainer = showCopy && copyPosition === 'Container';
    /** Copy 组件当 hover 时才渲染在容器中 */
    var copyInContainerByHover = copyInContainer && showCopy === 'hover';
    return (react_1.default.createElement("div", { style: tslib_1.__assign({ maxWidth: maxWidth || '100%' }, style), className: (0, classnames_1.default)(cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject([""], [""]))), className, (_a = {},
            _a[cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["copy"], ["copy"])))] = copyInContainerByHover,
            _a)), "data-cy": exports.testId.container, "data-testid": exports.testId.container },
        react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({ className: (0, classnames_1.default)(popoverCssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject([""], [""]))), (_b = {},
                _b[popoverCssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["disabled"], ["disabled"])))] = disabled,
                _b)), 
            // 由于 Popover 内部会进行 style: display 赋值，会覆盖外部传入的 display 值
            // 因此以下的 style: display 不生效
            // style={{
            //   display: disabled ? 'none' : '',
            // }}
            disabled: disabled, 
            // Arco Popover 的 Bug, 当存在 extra 节点时，需特殊设置
            // popupVisible={arcoPopoverProps?.popupVisible || (isHover && !disabled)}
            content: popContentWithCopy }, (0, lodash_es_1.omit)(arcoPopoverProps, 'content')),
            react_1.default.createElement("span", { ref: contentRef, "data-testid": exports.testId.content, className: (0, classnames_1.default)(cssPrefix(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["content"], ["content"]))), (_c = {},
                    _c[cssPrefix(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["pointer"], ["pointer"])))] = !disabled,
                    _c[cssPrefix(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["content__copy"], ["content__copy"])))] = copyInContainerByHover,
                    _c)), onClick: onClick }, (0, lodash_es_1.isNil)(text) || text === '' ? defaultText : text)),
        (copyInContainer || !!suffix) && (react_1.default.createElement("div", { className: cssPrefix(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["extra"], ["extra"]))) },
            copyInContainer && (react_1.default.createElement(CCopy_1.default, tslib_1.__assign({ "data-testid": exports.testId.copy, text: (cCopyProps === null || cCopyProps === void 0 ? void 0 : cCopyProps.text) || (0, reactChildren_1.getChildrenString)(text) }, (0, lodash_es_1.omit)(cCopyProps, 'text'), { className: (0, classnames_1.default)((_d = {},
                    _d[cssPrefix(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["hidden"], ["hidden"])))] = showCopy === 'hover',
                    _d)) }))),
            !!suffix && typeof suffix === 'function' ? suffix() : suffix))));
}
CEllipsis.displayName = 'CEllipsis';
exports.default = CEllipsis;
var hooks_2 = require("./hooks");
Object.defineProperty(exports, "useCEllipsis", { enumerable: true, get: function () { return hooks_2.useCEllipsis; } });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;
//# sourceMappingURL=index.js.map