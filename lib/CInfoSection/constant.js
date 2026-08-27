"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelWidthMap = exports.builtInMap = exports.testId = exports.DEFAULT_COLUMN = exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var CInlineEdit_1 = tslib_1.__importDefault(require("../CInlineEdit"));
var CCopy_1 = tslib_1.__importDefault(require("../CCopy"));
var Word_1 = tslib_1.__importDefault(require("./Word"));
var CEllipsis_1 = tslib_1.__importDefault(require("../CEllipsis"));
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('info-section');
exports.DEFAULT_COLUMN = 2;
exports.testId = {
    container: (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    title: (0, exports.cssPrefix)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["title"], ["title"]))),
    item: (0, exports.cssPrefix)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["item"], ["item"]))),
};
exports.builtInMap = { CEllipsis: CEllipsis_1.default, CInlineEdit: CInlineEdit_1.default, CCopy: CCopy_1.default, Word: Word_1.default };
exports.labelWidthMap = {
    normal: 80,
    small: 53,
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=constant.js.map