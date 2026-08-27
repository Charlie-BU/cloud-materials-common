"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var hooks_1 = require("./hooks");
var CTextFormat = react_1.default.memo(function (props) {
    var text = (0, hooks_1.useCTextFormat)(props);
    return react_1.default.createElement(react_1.default.Fragment, null, text);
});
CTextFormat.displayName = 'CTextFormat';
var Discount = function (props) { return react_1.default.createElement(CTextFormat, tslib_1.__assign({ type: "Discount" }, props)); };
Discount.displayName = 'CTextFormat.Discount';
exports.default = Object.assign(CTextFormat, { Discount: Discount });
//# sourceMappingURL=index.js.map