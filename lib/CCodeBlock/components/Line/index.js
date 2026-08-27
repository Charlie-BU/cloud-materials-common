"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../_utils/classNamePrefixFactory"));
var react_1 = tslib_1.__importDefault(require("react"));
var index_1 = require("../../index");
var Line = function (_a) {
    var showRowNumber = _a.showRowNumber, index = _a.index, value = _a.value, numberWidth = _a.numberWidth;
    var cssPrefix = (0, classNamePrefixFactory_1.default)('code-block');
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["code-content"], ["code-content"])))) },
        showRowNumber && (react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["index"], ["index"])))), style: { width: numberWidth, left: -"".concat(numberWidth + 16) }, "data-testid": index_1.testId.line }, index)),
        react_1.default.createElement("div", { className: (0, classnames_1.default)(cssPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["code-value"], ["code-value"])))) }, value)));
};
exports.default = Line;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=index.js.map