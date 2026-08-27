"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReactNode = exports.isReactFragment = exports.isPlainObj = exports.isValid = exports.isFn = exports.isNum = exports.isStr = exports.isArr = exports.getType = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-10-08 17:31:50
 * @LastEditTime: 2021-12-02 21:18:46
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importDefault(require("react"));
var getType = function (obj) { return Object.prototype.toString.call(obj); };
exports.getType = getType;
var isType = function (type) {
    // eslint-disable-next-line no-undef
    return function (obj) {
        return (0, exports.getType)(obj) === "[object ".concat(type, "]");
    };
};
exports.isArr = Array.isArray;
exports.isStr = isType('String');
exports.isNum = isType('Number');
// eslint-disable-next-line no-undef, @typescript-eslint/ban-types
var isFn = function (val) { return typeof val === 'function'; };
exports.isFn = isFn;
var isValid = function (val) { return val !== undefined && val !== null; };
exports.isValid = isValid;
// eslint-disable-next-line @typescript-eslint/ban-types
exports.isPlainObj = isType('Object');
var isReactFragment = function (val) { return react_1.default.isValidElement(val) && val.type === react_1.default.Fragment; };
exports.isReactFragment = isReactFragment;
var isReactNode = function (val) { return (0, exports.isStr)(val) || (0, exports.isNum)(val) || react_1.default.isValidElement(val) || (0, exports.isReactFragment)(val); };
exports.isReactNode = isReactNode;
//# sourceMappingURL=checkers.js.map