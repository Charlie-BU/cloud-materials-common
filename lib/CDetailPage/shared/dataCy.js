"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = exports.cssRoot = exports.cssPrefix = void 0;
var tslib_1 = require("tslib");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../_utils/classNamePrefixFactory"));
//---------test lib------------
exports.cssPrefix = (0, classNamePrefixFactory_1.default)('detail-page');
exports.cssRoot = (0, exports.cssPrefix)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject([""], [""])));
exports.testId = {
    detailPage: "".concat(exports.cssRoot),
    detailPageLoading: "".concat(exports.cssRoot, "-detailPageLoading"),
    globalLoadError: "".concat(exports.cssRoot, "-globalLoadError"),
    tabLoadError: "".concat(exports.cssRoot, "-tabLoadError"),
    detailPageHeader: "".concat(exports.cssRoot, "-header"),
    detailPageContent: "".concat(exports.cssRoot, "-content"),
    detailPageNotice: "".concat(exports.cssRoot, "-notice"),
};
var templateObject_1;
//# sourceMappingURL=dataCy.js.map