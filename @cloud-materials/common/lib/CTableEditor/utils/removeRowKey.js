"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRowKey = void 0;
var lodash_es_1 = require("lodash-es");
var constants_1 = require("../constants");
/**
 * 从数据中删除 rowKey
 */
var removeRowKey = function (value) {
    return (0, lodash_es_1.omit)(value, constants_1.ROW_KEY);
};
exports.removeRowKey = removeRowKey;
//# sourceMappingURL=removeRowKey.js.map