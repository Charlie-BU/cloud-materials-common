"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_ID = void 0;
var tslib_1 = require("tslib");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
var loadingPrefix = (0, classNamePrefixFactory_1.default)('loading');
var resultPrefix = (0, classNamePrefixFactory_1.default)('result');
var spinPrefix = (0, classNamePrefixFactory_1.default)('spin');
exports.TEST_ID = {
    loading: loadingPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""]))),
    spin: spinPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""]))),
    result: resultPrefix(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject([""], [""]))),
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=constants.js.map