import { __assign, __makeTemplateObject, __read, __rest } from "tslib";
import { IconClose } from '@arco-design/iconbox-react-ve-o-design';
import { ConfigProvider, Modal } from '@arco-design/web-react';
import classNames from 'classnames';
import React, { useContext, useRef } from 'react';
import { useCConfigContext } from '../CConfigProvider';
import { ChildrenRenderer, MaskableProvider } from '../_factory/maskableComponent';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { useCModal } from './hooks';
import { useMergeProps } from '../hooks';
var testIdPrefix = classNamePrefixFactory('modal');
export var testId = {
    modal: testIdPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))),
    cancelBtn: testIdPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["cancel-btn"], ["cancel-btn"]))),
    okBtn: testIdPrefix(templateObject_3 || (templateObject_3 = __makeTemplateObject(["ok-btn"], ["ok-btn"]))),
    content: testIdPrefix(templateObject_4 || (templateObject_4 = __makeTemplateObject(["content"], ["content"]))),
};
// TODO 如果contentTop和contentBottom需要放表单，这里需要加个decorator属性，用于包裹children
export var BaseCModalComponent = React.forwardRef(function (_a, ref) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var _b = useCConfigContext(), useCssPrefix = _b.useCssPrefix, _c = _b.cComponentConfig, _d = _c === void 0 ? {} : _c, _e = _d.CModal, CModal = _e === void 0 ? {} : _e;
    var mergedProps = useMergeProps(props, {}, CModal);
    var _f = __read(useCModal(mergedProps), 1), _g = _f[0], className = _g.className, contentTop = _g.contentTop, contentBottom = _g.contentBottom, contentClassName = _g.contentClassName, okButtonProps = _g.okButtonProps, cancelButtonProps = _g.cancelButtonProps, footerDivider = _g.footerDivider, _h = _g.scrollMaxHeight, scrollMaxHeight = _h === void 0 ? 474 : _h, restProps = __rest(_g, ["className", "contentTop", "contentBottom", "contentClassName", "okButtonProps", "cancelButtonProps", "footerDivider", "scrollMaxHeight"]);
    var scrollRef = useRef(null);
    var prefixCls = useContext(ConfigProvider.ConfigContext).prefixCls;
    var cssPrefix = useCssPrefix('modal');
    return (React.createElement(Modal, __assign({ getChildrenPopupContainer: function () { return document.body; }, closeIcon: React.createElement(IconClose, null) }, restProps, { className: classNames(cssPrefix(templateObject_5 || (templateObject_5 = __makeTemplateObject([""], [""]))), className, footerDivider && cssPrefix(templateObject_6 || (templateObject_6 = __makeTemplateObject(["footer-divider"], ["footer-divider"]))), restProps.footer === null && cssPrefix(templateObject_7 || (templateObject_7 = __makeTemplateObject(["no-footer"], ["no-footer"])))), "data-testid": testId.modal, "data-cy": testId.modal, okButtonProps: __assign(__assign({}, okButtonProps), { 
            // @ts-ignore
            'data-testid': testId.okBtn }), cancelButtonProps: __assign(__assign({}, cancelButtonProps), { 
            // @ts-ignore
            'data-testid': testId.cancelBtn }), ref: ref }),
        React.createElement(ChildrenRenderer, { ref: scrollRef, contentTop: contentTop, contentBottom: contentBottom, "data-testid": testId.content, className: classNames(testId.content, contentClassName), contentClassNameWhenContentTop: cssPrefix(templateObject_8 || (templateObject_8 = __makeTemplateObject(["content-space"], ["content-space"]))), 
            // 和css保持一致
            maxHeight: scrollMaxHeight === 'none' ? void 0 : scrollMaxHeight, onMount: function (scrollRef) {
                var modalContent = scrollRef.closest(".".concat(prefixCls, "-modal-content"));
                if (modalContent && scrollMaxHeight) {
                    modalContent.style.maxHeight = scrollMaxHeight === 'none' ? scrollMaxHeight : "".concat(scrollMaxHeight, "px");
                }
            } }, children)));
});
BaseCModalComponent.displayName = 'CModal';
var BaseCModal = React.forwardRef(function (props, ref) { return (React.createElement(MaskableProvider, null,
    React.createElement(BaseCModalComponent, __assign({}, props, { ref: ref })))); });
BaseCModal.displayName = 'CModal';
export default BaseCModal;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=Base.js.map