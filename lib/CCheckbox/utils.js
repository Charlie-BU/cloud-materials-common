"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testId = exports.btnSelectorCommonPrefixCls = exports.btnSelectorContentPrefixCls = exports.prefixCls = void 0;
var tslib_1 = require("tslib");
var classNamePrefixFactory_1 = tslib_1.__importDefault(require("../_utils/classNamePrefixFactory"));
// CCheckbox特有样式
exports.prefixCls = (0, classNamePrefixFactory_1.default)('checkbox');
// 分段选择器内容区样式
exports.btnSelectorContentPrefixCls = (0, classNamePrefixFactory_1.default)('btn-selector-content');
// 分段选择器通用样式
exports.btnSelectorCommonPrefixCls = (0, classNamePrefixFactory_1.default)('btn-selector-common');
exports.testId = {
    groupContainer: (0, exports.prefixCls)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["group-container"], ["group-container"]))),
    cCheckboxContainer: (0, exports.prefixCls)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["container"], ["container"]))),
    arcoCheckboxContainer: (0, exports.prefixCls)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["arco-checkbox"], ["arco-checkbox"]))),
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=utils.js.map