"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CFormSchema = exports.CField = exports.onCFormDataChange = exports.CConfigForm = exports.DefaultCFormDecorator = exports.CFormDefaultBuiltInComponentMap = exports.CFormDefaultDecoratorProps = exports.CFormDefaultComponentProps = void 0;
var tslib_1 = require("tslib");
var const_1 = require("./const");
var CConfigForm_1 = tslib_1.__importDefault(require("./react/CConfigForm"));
exports.CFormDefaultComponentProps = const_1.CFormDefaultComponentProps;
exports.CFormDefaultDecoratorProps = const_1.CFormDefaultDecoratorProps;
exports.CFormDefaultBuiltInComponentMap = const_1.DefaultBuiltInComponentMap;
var DefaultCFormDecorator_1 = require("./react/Components/Decorators/DefaultCFormDecorator");
Object.defineProperty(exports, "DefaultCFormDecorator", { enumerable: true, get: function () { return tslib_1.__importDefault(DefaultCFormDecorator_1).default; } });
exports.CConfigForm = CConfigForm_1.default;
var CForm = exports.CConfigForm.registerConfig(exports.CFormDefaultBuiltInComponentMap, {
    defaultDecoratorProps: exports.CFormDefaultDecoratorProps,
    defaultComponentProps: exports.CFormDefaultComponentProps,
});
tslib_1.__exportStar(require("./helper"), exports);
tslib_1.__exportStar(require("./react/CConfirm"), exports);
exports.default = CForm;
tslib_1.__exportStar(require("./interface"), exports);
tslib_1.__exportStar(require("@storage-fe/formily-arco"), exports);
var effects_1 = require("./react/hooks/effects");
Object.defineProperty(exports, "onCFormDataChange", { enumerable: true, get: function () { return effects_1.onCFormDataChange; } });
var CField_1 = require("./react/CField/CField");
Object.defineProperty(exports, "CField", { enumerable: true, get: function () { return tslib_1.__importDefault(CField_1).default; } });
var schemaField_1 = require("./schemaField");
Object.defineProperty(exports, "CFormSchema", { enumerable: true, get: function () { return tslib_1.__importDefault(schemaField_1).default; } });
//# sourceMappingURL=index.js.map