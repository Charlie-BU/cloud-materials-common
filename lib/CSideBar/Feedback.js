"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
var tslib_1 = require("tslib");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../CConfigProvider");
var Feedback = function (_a) {
    var children = _a.children, circle = _a.circle, popoverProps = _a.popoverProps, popoverContent = _a.popoverContent, _b = _a.type, type = _b === void 0 ? 'normal' : _b, rest = tslib_1.__rest(_a, ["children", "circle", "popoverProps", "popoverContent", "type"]);
    var _c = (0, CConfigProvider_1.useCConfigContext)(), useCssPrefix = _c.useCssPrefix, locale = _c.locale;
    var clsPrefix = useCssPrefix('sidebar-feedback');
    var text = type === 'normal' ? locale.CSidebar.feedbackNormal : locale.CSidebar.feedbackPrize;
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(circle && clsPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["box"], ["box"])))) },
        react_1.default.createElement(web_react_1.Popover, tslib_1.__assign({ position: "right" }, popoverProps, { triggerProps: tslib_1.__assign({ autoFitPosition: false }, popoverProps === null || popoverProps === void 0 ? void 0 : popoverProps.triggerProps), content: popoverContent !== null && popoverContent !== void 0 ? popoverContent : text, getPopupContainer: function (node) { return node.parentElement; }, style: tslib_1.__assign({ whiteSpace: 'nowrap' }, popoverProps === null || popoverProps === void 0 ? void 0 : popoverProps.style), disabled: !circle }),
            react_1.default.createElement(web_react_1.Button, tslib_1.__assign({ icon: type === 'normal' ? react_1.default.createElement(iconbox_react_ve_o_design_1.IconMessageNotificationService, { useCurrentColor: true }) : react_1.default.createElement(iconbox_react_ve_o_design_1.IconWrappedGift, { useCurrentColor: true }) }, rest, { size: circle ? 'default' : 'mini', shape: circle ? 'circle' : 'round', className: (0, classnames_1.default)(clsPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))), circle && clsPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["circle"], ["circle"]))), rest.className) }), circle ? void 0 : children !== null && children !== void 0 ? children : text))));
};
exports.Feedback = Feedback;
exports.Feedback._Feedback = true;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Feedback.js.map