import { __assign } from "tslib";
import React from 'react';
/**
 * 拷贝子节点，添加props后返回新的节点
 * @param children
 * @param customeStyle
 * @returns
 */
export function renderValidChildren(children, props) {
    return React.Children.map(children, function (child) {
        var _a;
        if (React.isValidElement(child)) {
            var style = __assign(__assign({}, (((_a = child.props) === null || _a === void 0 ? void 0 : _a.style) || {})), props === null || props === void 0 ? void 0 : props.style);
            var p = __assign(__assign({}, child.props), { style: style });
            return React.cloneElement(child, p);
        }
        return child;
    });
}
//# sourceMappingURL=renderValidChildren.js.map