"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderValidChildren = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
/**
 * 拷贝子节点，添加props后返回新的节点
 * @param children
 * @param customeStyle
 * @returns
 */
function renderValidChildren(children, props) {
    return react_1.default.Children.map(children, function (child) {
        var _a;
        if (react_1.default.isValidElement(child)) {
            var style = tslib_1.__assign(tslib_1.__assign({}, (((_a = child.props) === null || _a === void 0 ? void 0 : _a.style) || {})), props === null || props === void 0 ? void 0 : props.style);
            var p = tslib_1.__assign(tslib_1.__assign({}, child.props), { style: style });
            return react_1.default.cloneElement(child, p);
        }
        return child;
    });
}
exports.renderValidChildren = renderValidChildren;
//# sourceMappingURL=renderValidChildren.js.map