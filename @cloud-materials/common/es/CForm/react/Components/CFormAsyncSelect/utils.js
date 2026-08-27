import { __makeTemplateObject } from "tslib";
import classNamePrefixFactory from '../../../../_utils/classNamePrefixFactory';
var cssPrefix = classNamePrefixFactory('cform-async-select');
export var cformAsyncSelectTestId = {
    container: cssPrefix(templateObject_1 || (templateObject_1 = __makeTemplateObject(["container"], ["container"]))),
    filter: cssPrefix(templateObject_2 || (templateObject_2 = __makeTemplateObject(["filter"], ["filter"]))),
};
/** 转换 CFormAsyncSelectOption -> CFormAsyncSelectConfigOption */
export var transCFormAsyncSelectOption = function (option) {
    return typeof option === 'object' ? option : { label: option, value: option };
};
/** 转换 CFormAsyncSelectOption[] -> CFormAsyncSelectConfigOption[] */
export var transCFormAsyncSelectOptions = function (options) {
    return options.map(function (option) { return (typeof option === 'object' ? option : { label: option, value: option }); });
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=utils.js.map