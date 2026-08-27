"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = exports.cssRoot = exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
//---------test lib------------
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('async-select');
exports.cssRoot = (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""])));
exports.testId = {
    selectId: "".concat(exports.cssRoot),
    dropDownId: "".concat(exports.cssRoot, "-dropDownId"),
    tooltipLabelId: "".concat(exports.cssRoot, "-tooltipLabelId"),
    tooltipDesId: "".concat(exports.cssRoot, "-tooltipDesId"),
    singleLabelId: "".concat(exports.cssRoot, "-singleLabelId"),
    singleDesId: "".concat(exports.cssRoot, "-singleDesId"),
    doubleLabelId: "".concat(exports.cssRoot, "-doubleLabelId"),
    doubleDesId: "".concat(exports.cssRoot, "-doubleDesId"),
    maxTagId: "".concat(exports.cssRoot, "-maxTagId"),
};
var templateObject_1;
//# sourceMappingURL=dataCy.js.map