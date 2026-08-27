"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowDecorator = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("@formily/react");
var reactive_1 = require("@formily/reactive");
var CTable_1 = require("../../../../CTable");
var hooks_1 = require("../../hooks");
var lodash_es_1 = require("lodash-es");
var RowDecorator = function (props) {
    var row = (0, CTable_1.useRow)();
    var form = (0, react_2.useForm)();
    var tableEditor = (0, hooks_1.useTableEditor)();
    var initialValue = (0, reactive_1.toJS)(row.data);
    var _formConfig = tableEditor.config.formConfig;
    var formConfig = (0, lodash_es_1.isFunction)(_formConfig) ? _formConfig(tableEditor) : _formConfig;
    var _rowFieldConfig = formConfig === null || formConfig === void 0 ? void 0 : formConfig.rowFieldConfig;
    var rowFieldConfig = (0, lodash_es_1.isFunction)(_rowFieldConfig)
        ? _rowFieldConfig(initialValue, form, tableEditor)
        : _rowFieldConfig;
    return (react_1.default.createElement(react_2.ObjectField, tslib_1.__assign({ name: row.key, initialValue: (0, reactive_1.toJS)(row.data) }, rowFieldConfig), props.children));
};
exports.RowDecorator = RowDecorator;
//# sourceMappingURL=index.js.map