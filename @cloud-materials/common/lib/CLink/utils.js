"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInnerLinkSetting = exports.getCLinkStyle = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var getCLinkStyle = function (size, style) {
    if (typeof size === 'number') {
        return tslib_1.__assign(tslib_1.__assign({}, style), { fontSize: "".concat(size, "px") });
    }
    else if (size === 'small') {
        return tslib_1.__assign(tslib_1.__assign({}, style), { fontSize: '12px' });
    }
    return style;
};
exports.getCLinkStyle = getCLinkStyle;
var getInnerLinkSetting = function (locale) { return ({
    default: undefined,
    example: { icon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconKnowledge, null), label: locale.CLink.example },
    'help-doc': { icon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconDocumentFeedback, null), label: locale.CLink.helpDoc },
    file: { icon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconAttachment, null), label: locale.CLink.file },
}); };
exports.getInnerLinkSetting = getInnerLinkSetting;
//# sourceMappingURL=utils.js.map