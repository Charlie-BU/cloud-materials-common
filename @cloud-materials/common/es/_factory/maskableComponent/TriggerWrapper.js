var _a;
import { __assign } from "tslib";
import React from 'react';
import { TriggerName } from './constants';
var prop = (_a = {}, _a[TriggerName] = true, _a);
/**
 * 用于mask: false时包裹其他组件以阻止点击后关闭 modal
 */
export var TriggerWrapper = function (_a) {
    var children = _a.children, inlineAttr = _a.inlineAttr;
    if (!inlineAttr) {
        return React.createElement('div', __assign(__assign({}, prop), { style: { display: 'unset' } }), children);
    }
    return React.isValidElement(children)
        ? React.cloneElement(children, prop)
        : React.createElement(React.Fragment, null, children);
};
//# sourceMappingURL=TriggerWrapper.js.map