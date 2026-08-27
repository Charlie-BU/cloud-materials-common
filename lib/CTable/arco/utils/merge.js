"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var lodash_es_1 = require("lodash-es");
var merge = function (object, source) {
    return (0, lodash_es_1.mergeWith)(object, source, function (objValue, srcValue) {
        // react 元素不进行合并
        if (react_1.default.isValidElement(objValue)) {
            return srcValue;
        }
        // 数组不合并，直接以传入的为准
        if (Array.isArray(objValue)) {
            return srcValue;
        }
    });
};
exports.merge = merge;
//# sourceMappingURL=merge.js.map