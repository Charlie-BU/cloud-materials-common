"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var const_1 = require("../../const");
var react_1 = require("@formily/react");
var ArrayItems_1 = require("@storage-fe/formily-arco/es/ArrayItems");
var ArrayTable_1 = require("@storage-fe/formily-arco/es/ArrayTable");
var SchemaField = (0, react_1.createSchemaField)({
    components: Object.assign({}, tslib_1.__assign(tslib_1.__assign({}, const_1.DefaultBuiltInComponentMap), { ArrayItems: ArrayItems_1.SchemaItems, ArrayTable: ArrayTable_1.SchemaTable })),
});
exports.default = SchemaField;
//# sourceMappingURL=index.js.map