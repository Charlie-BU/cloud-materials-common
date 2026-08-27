"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transCFormAsyncSelectOptions = exports.transCFormAsyncSelectOption = exports.cformAsyncSelectTestId = void 0;
var tslib_1 = require("tslib");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../../../../_utils/classNamePrefixFactory"));
var cssPrefix = (0, classNamePrefixFactory_1.default)('cform-async-select');
exports.cformAsyncSelectTestId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    filter: cssPrefix(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["filter"], ["filter"]))),
};
/** 转换 CFormAsyncSelectOption -> CFormAsyncSelectConfigOption */
var transCFormAsyncSelectOption = function (option) {
    return typeof option === 'object' ? option : { label: option, value: option };
};
exports.transCFormAsyncSelectOption = transCFormAsyncSelectOption;
/** 转换 CFormAsyncSelectOption[] -> CFormAsyncSelectConfigOption[] */
var transCFormAsyncSelectOptions = function (options) {
    return options.map(function (option) { return (typeof option === 'object' ? option : { label: option, value: option }); });
};
exports.transCFormAsyncSelectOptions = transCFormAsyncSelectOptions;
var templateObject_1, templateObject_2;
//# sourceMappingURL=utils.js.map