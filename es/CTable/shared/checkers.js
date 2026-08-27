/*
 * @Author: youjingyu
 * @Date: 2021-10-08 17:31:50
 * @LastEditTime: 2021-12-02 21:18:46
 * @LastEditors: youjingyu
 * @Description:
 */
import React from 'react';
export var getType = function (obj) { return Object.prototype.toString.call(obj); };
var isType = function (type) {
    // eslint-disable-next-line no-undef
    return function (obj) {
        return getType(obj) === "[object ".concat(type, "]");
    };
};
export var isArr = Array.isArray;
export var isStr = isType('String');
export var isNum = isType('Number');
// eslint-disable-next-line no-undef, @typescript-eslint/ban-types
export var isFn = function (val) { return typeof val === 'function'; };
export var isValid = function (val) { return val !== undefined && val !== null; };
// eslint-disable-next-line @typescript-eslint/ban-types
export var isPlainObj = isType('Object');
export var isReactFragment = function (val) { return React.isValidElement(val) && val.type === React.Fragment; };
export var isReactNode = function (val) { return isStr(val) || isNum(val) || React.isValidElement(val) || isReactFragment(val); };
//# sourceMappingURL=checkers.js.map