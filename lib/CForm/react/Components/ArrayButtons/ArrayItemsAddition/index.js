"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var ArrayBaseAddition_1 = tslib_1.__importDefault(require("../ArrayBaseAddition"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../../_utils/classNamePrefixFactory"));
var cssPrefix = (0, classNamePrefixFactory_1.default)('cform-array-items-addition');
var ArrayItemsAddition = function (props) {
    return (react_1.default.createElement("div", { className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))) },
        react_1.default.createElement(ArrayBaseAddition_1.default, tslib_1.__assign({}, props))));
};
ArrayItemsAddition.displayName = 'ArrayAddition';
exports.default = ArrayItemsAddition;
var templateObject_1;
//# sourceMappingURL=index.js.map