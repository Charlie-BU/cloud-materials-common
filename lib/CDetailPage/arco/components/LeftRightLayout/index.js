"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeftRightLayout = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var CConfigProvider_1 = require("../../../../CConfigProvider");
var LeftRightLayout = function (props) {
    var getCPrefixCls = (0, CConfigProvider_1.useCConfigContext)().getCPrefixCls;
    var cssRoot = getCPrefixCls('detail-page');
    return react_1.default.createElement("div", { className: (0, classnames_1.default)("".concat(cssRoot, "-left-right-layout"), props === null || props === void 0 ? void 0 : props.className) }, props === null || props === void 0 ? void 0 : props.children);
};
exports.LeftRightLayout = LeftRightLayout;
//# sourceMappingURL=index.js.map