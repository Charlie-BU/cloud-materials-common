"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var web_react_1 = require("@arco-design/web-react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var react_1 = tslib_1.__importStar(require("react"));
var CConfigProvider_1 = require("../../CConfigProvider");
var utils_1 = require("../utils");
var CompactWrapper = function (props) {
    var className = props.className, style = props.style, label = props.label, _a = props.labelWidth, labelWidth = _a === void 0 ? utils_1.DEFAULT_LABEL_WIDTH : _a, labelBordered = props.labelBordered, children = props.children;
    var getCPrefixCls = (0, CConfigProvider_1.useCConfigContext)().getCPrefixCls;
    var compactCls = getCPrefixCls('search-compact');
    var renderLabel = function () {
        if (!(0, react_1.isValidElement)(label) || labelBordered) {
            return (react_1.default.createElement("div", { className: (0, classnames_1.default)("".concat(compactCls, "-label"), "".concat(compactCls, "-bordered")), style: { width: labelWidth } }, label));
        }
        return react_1.default.cloneElement(label, tslib_1.__assign(tslib_1.__assign({}, label.props), { className: (0, classnames_1.default)("".concat(compactCls, "-before"), label.props.className), style: tslib_1.__assign({ width: labelWidth }, label.props.style) }));
    };
    if (!label) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    return (react_1.default.createElement(web_react_1.Input.Group, { compact: true, className: (0, classnames_1.default)(compactCls, className), style: style },
        renderLabel(),
        children));
};
exports.default = CompactWrapper;
//# sourceMappingURL=CompactWrapper.js.map