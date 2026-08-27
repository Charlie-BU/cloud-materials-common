"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../_utils/classNamePrefixFactory"));
var react_2 = require("@formily/react");
var cssPrefix = (0, classNamePrefixFactory_1.default)('cform-text');
var TextComponent = function (props) {
    var _a = props || {}, className = _a.className, children = _a.children, rest = tslib_1.__rest(_a, ["className", "children"]);
    return (react_1.default.createElement("span", tslib_1.__assign({ className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))), className) }, rest), children));
};
var Text = (0, react_2.connect)(TextComponent, (0, react_2.mapProps)(function (props, field) {
    return {
        children: props.children || field.content || field.value,
    };
}));
exports.default = Text;
var templateObject_1;
//# sourceMappingURL=index.js.map