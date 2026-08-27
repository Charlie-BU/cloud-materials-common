"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onFetchError = exports.onFetchEnd = exports.onFetchStart = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-10-17 10:24:27
 * @LastEditTime: 2021-11-04 17:46:41
 * @LastEditors: youjingyu
 * @Description:
 */
var reactive_1 = require("@formily/reactive");
var shared_1 = require("../shared");
var types_1 = require("../types");
var createFetcherEffect = function (type) {
    return (0, shared_1.createEffectHook)(type, function (table, payload) {
        return function (callback) {
            (0, reactive_1.batch)(function () {
                callback(tslib_1.__assign({ table: table }, payload));
            });
        };
    });
};
exports.onFetchStart = createFetcherEffect(types_1.LifeCycleTypes.ON_FETCH_START);
exports.onFetchEnd = createFetcherEffect(types_1.LifeCycleTypes.ON_FETCH_END);
exports.onFetchError = createFetcherEffect(types_1.LifeCycleTypes.ON_FETCH_ERROR);
//# sourceMappingURL=fetcher.js.map