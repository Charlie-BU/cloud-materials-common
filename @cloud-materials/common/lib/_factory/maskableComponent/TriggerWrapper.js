"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerWrapper = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var constants_1 = require("./constants");
var prop = (_a = {}, _a[constants_1.TriggerName] = true, _a);
/**
 * 用于mask: false时包裹其他组件以阻止点击后关闭 modal
 */
var TriggerWrapper = function (_a) {
    var children = _a.children, inlineAttr = _a.inlineAttr;
    if (!inlineAttr) {
        return react_1.default.createElement('div', tslib_1.__assign(tslib_1.__assign({}, prop), { style: { display: 'unset' } }), children);
    }
    return react_1.default.isValidElement(children)
        ? react_1.default.cloneElement(children, prop)
        : react_1.default.createElement(react_1.default.Fragment, null, children);
};
exports.TriggerWrapper = TriggerWrapper;
//# sourceMappingURL=TriggerWrapper.js.map