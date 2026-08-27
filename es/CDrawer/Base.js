import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import React, { useRef } from 'react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import classNames from 'classnames';
import { useCDrawer } from './hooks';
import COperationMenu from '../COperationMenu';
import { TriggerName, ChildrenRenderer, MaskableProvider } from '../_factory/maskableComponent';
import { useCConfigContext } from '../CConfigProvider';
import Drawer from './OriginDrawer';
import { useMergeProps } from '../hooks';
var testIdPrefix = classNamePrefixFactory('drawer');
export var testId = {
    drawer: testIdPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))),
    cancelBtn: testIdPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["cancel-btn"], ["cancel-btn"]))),
    okBtn: testIdPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["ok-btn"], ["ok-btn"]))),
};
export var BaseCDrawerComponent = React.forwardRef(function (_a, ref) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var _b = useCConfigContext(), useCssPrefix = _b.useCssPrefix, _c = _b.cComponentConfig, _d = _c === void 0 ? {} : _c, CDrawer = _d.CDrawer;
    var cssPrefix = useCssPrefix('drawer');
    var containerClassName = cssPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""])));
    var scrollRef = useRef(null);
    var mergedProps = useMergeProps(props, {}, CDrawer !== null && CDrawer !== void 0 ? CDrawer : {});
    var _e = __read(useCDrawer(__assign(__assign({}, mergedProps), { preventCloseSelectors: [".".concat(containerClassName), "[".concat(TriggerName, "]")] })), 1), _f = _e[0], className = _f.className, contentTop = _f.contentTop, contentBottom = _f.contentBottom, contentClassName = _f.contentClassName, title = _f.title, headerDescription = _f.headerDescription, titleAfter = _f.titleAfter, extraHeader = _f.extraHeader, _g = _f.width, width = _g === void 0 ? 1000 : _g, restProps = __rest(_f, ["className", "contentTop", "contentBottom", "contentClassName", "title", "headerDescription", "titleAfter", "extraHeader", "width"]);
    return (React.createElement(Drawer, __assign({ className: classNames(containerClassName, restProps.mask === false && cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject(["shadow"], ["shadow"]))), className), width: width, getChildrenPopupContainer: function () { return document.body; } }, restProps, { title: React.createElement(React.Fragment, null,
            React.createElement("div", { className: cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["title-box"], ["title-box"]))) },
                React.createElement("div", { className: cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["title"], ["title"]))) }, headerDescription ? (React.createElement(React.Fragment, null,
                    title,
                    React.createElement("div", { className: cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["header-desc"], ["header-desc"]))) }, headerDescription))) : (title)),
                titleAfter && (React.createElement("div", { className: cssPrefix(templateObject_9 || (templateObject_9 = __makeTemplateObject(["title-after"], ["title-after"]))) }, React.isValidElement(titleAfter) ? (titleAfter) : (React.createElement(COperationMenu, __assign({}, titleAfter)))))),
            extraHeader), "data-testid": testId.drawer, "data-cy": testId.drawer, okButtonProps: __assign(__assign({}, restProps.okButtonProps), { 
            // @ts-ignore
            'data-testid': testId.okBtn }), cancelButtonProps: __assign(__assign({}, restProps.cancelButtonProps), { 
            // @ts-ignore
            'data-testid': testId.cancelBtn }), ref: ref }),
        React.createElement(ChildrenRenderer, { disableScrollShadow: true, contentTop: contentTop, contentBottom: contentBottom, className: classNames(cssPrefix(templateObject_10 || (templateObject_10 = __makeTemplateObject(["content"], ["content"]))), contentClassName), ref: scrollRef }, children)));
});
BaseCDrawerComponent.displayName = 'CDrawer';
var BaseCDrawer = React.forwardRef(function (props, ref) { return (React.createElement(MaskableProvider, null,
    React.createElement(BaseCDrawerComponent, __assign({}, props, { ref: ref })))); });
BaseCDrawer.displayName = 'CDrawer';
export default BaseCDrawer;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=Base.js.map