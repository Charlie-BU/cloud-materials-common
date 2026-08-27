"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCModalComponent = exports.testId = void 0;
var tslib_1 = require("tslib");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var react_1 = tslib_1.__importStar(require("react"));
var CConfigProvider_1 = require("../CConfigProvider");
var maskableComponent_1 = require("../_factory/maskableComponent");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var hooks_1 = require("./hooks");
var hooks_2 = require("../hooks");
var testIdPrefix = (0, classNamePrefixFactory_1.default)('modal');
exports.testId = {
    modal: testIdPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))),
    cancelBtn: testIdPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["cancel-btn"], ["cancel-btn"]))),
    okBtn: testIdPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["ok-btn"], ["ok-btn"]))),
    content: testIdPrefix(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["content"], ["content"]))),
};
// TODO 如果contentTop和contentBottom需要放表单，这里需要加个decorator属性，用于包裹children
exports.BaseCModalComponent = react_1.default.forwardRef(function (_a, ref) {
    var children = _a.children, props = tslib_1.__rest(_a, ["children"]);
    var _b = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _b.useCssPrefix, _c = _b.cComponentConfig, _d = _c === void 0 ? {} : _c, _e = _d.CModal, CModal = _e === void 0 ? {} : _e;
    var mergedProps = (0, hooks_2.useMergeProps)(props, {}, CModal);
    var _f = tslib_1.__read((0, hooks_1.useCModal)(mergedProps), 1), _g = _f[0], className = _g.className, contentTop = _g.contentTop, contentBottom = _g.contentBottom, contentClassName = _g.contentClassName, okButtonProps = _g.okButtonProps, cancelButtonProps = _g.cancelButtonProps, footerDivider = _g.footerDivider, _h = _g.scrollMaxHeight, scrollMaxHeight = _h === void 0 ? 474 : _h, restProps = tslib_1.__rest(_g, ["className", "contentTop", "contentBottom", "contentClassName", "okButtonProps", "cancelButtonProps", "footerDivider", "scrollMaxHeight"]);
    var scrollRef = (0, react_1.useRef)(null);
    var prefixCls = (0, react_1.useContext)(web_react_1.ConfigProvider.ConfigContext).prefixCls;
    var cssPrefix = useCssPrefix('modal');
    return (react_1.default.createElement(web_react_1.Modal, tslib_1.__assign({ getChildrenPopupContainer: function () { return document.body; }, closeIcon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconClose, null) }, restProps, { className: (0, classnames_1.default)(cssPrefix(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject([""], [""]))), className, footerDivider && cssPrefix(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["footer-divider"], ["footer-divider"]))), restProps.footer === null && cssPrefix(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["no-footer"], ["no-footer"])))), "data-testid": exports.testId.modal, "data-cy": exports.testId.modal, okButtonProps: tslib_1.__assign(tslib_1.__assign({}, okButtonProps), { 
            // @ts-ignore
            'data-testid': exports.testId.okBtn }), cancelButtonProps: tslib_1.__assign(tslib_1.__assign({}, cancelButtonProps), { 
            // @ts-ignore
            'data-testid': exports.testId.cancelBtn }), ref: ref }),
        react_1.default.createElement(maskableComponent_1.ChildrenRenderer, { ref: scrollRef, contentTop: contentTop, contentBottom: contentBottom, "data-testid": exports.testId.content, className: (0, classnames_1.default)(exports.testId.content, contentClassName), contentClassNameWhenContentTop: cssPrefix(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["content-space"], ["content-space"]))), 
            // 和css保持一致
            maxHeight: scrollMaxHeight === 'none' ? void 0 : scrollMaxHeight, onMount: function (scrollRef) {
                var modalContent = scrollRef.closest(".".concat(prefixCls, "-modal-content"));
                if (modalContent && scrollMaxHeight) {
                    modalContent.style.maxHeight = scrollMaxHeight === 'none' ? scrollMaxHeight : "".concat(scrollMaxHeight, "px");
                }
            } }, children)));
});
exports.BaseCModalComponent.displayName = 'CModal';
var BaseCModal = react_1.default.forwardRef(function (props, ref) { return (react_1.default.createElement(maskableComponent_1.MaskableProvider, null,
    react_1.default.createElement(exports.BaseCModalComponent, tslib_1.__assign({}, props, { ref: ref })))); });
BaseCModal.displayName = 'CModal';
exports.default = BaseCModal;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=Base.js.map