"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChildrenString = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var getChildrenString = function (node) {
    var getTextInNode = function (_node) {
        if (react_1.default.isValidElement(_node)) {
            if (_node.props.children instanceof Object) {
                return getTextInNode(_node.props.children);
            }
            return _node.props.children;
        }
        return String(_node);
    };
    return getTextInNode(node);
};
exports.getChildrenString = getChildrenString;
//# sourceMappingURL=reactChildren.js.map