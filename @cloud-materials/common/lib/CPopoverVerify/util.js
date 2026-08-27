"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatRules = exports.ICONS = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
exports.ICONS = {
    init: react_1.default.createElement(iconbox_react_ve_o_design_1.IconCheckCircleFilled, null),
    success: react_1.default.createElement(iconbox_react_ve_o_design_1.IconCheckCircleFill, null),
    error: react_1.default.createElement(iconbox_react_ve_o_design_1.IconCloseCircleFill, null),
};
var formatRules = function (rules) {
    return rules.map(function (rule, index) {
        var _a;
        return tslib_1.__assign(tslib_1.__assign({}, rule), { key: ((_a = rule === null || rule === void 0 ? void 0 : rule.key) !== null && _a !== void 0 ? _a : index) });
    });
};
exports.formatRules = formatRules;
//# sourceMappingURL=util.js.map