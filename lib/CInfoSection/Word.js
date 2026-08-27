"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var CConfigProvider_1 = require("../CConfigProvider");
var Word = function (props) {
    var useCssPrefix = (0, CConfigProvider_1.useCConfigContext)().useCssPrefix;
    var cssPrefix = useCssPrefix('info-section');
    return (react_1.default.createElement("span", { onClick: props.onClick, className: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["word-editor"], ["word-editor"]))), style: tslib_1.__assign({}, props.style) }, props.value));
};
exports.default = Word;
var templateObject_1;
//# sourceMappingURL=Word.js.map