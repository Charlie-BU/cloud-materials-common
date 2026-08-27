"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onToolbarValueChange = exports.onToolbarUnmount = exports.onToolbarMount = exports.onToolbarInit = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-10-17 10:24:27
 * @LastEditTime: 2021-10-20 11:28:36
 * @LastEditors: youjingyu
 * @Description:
 */
var reactive_1 = require("@formily/reactive");
var shared_1 = require("../shared");
var types_1 = require("../types");
var createToolbarEffect = function (type) {
    return (0, shared_1.createEffectHook)(type, function (table, payload) {
        return function (callback) {
            (0, reactive_1.batch)(function () {
                callback(tslib_1.__assign({ table: table }, payload));
            });
        };
    });
};
exports.onToolbarInit = createToolbarEffect(types_1.LifeCycleTypes.ON_TOOLBAR_INIT);
exports.onToolbarMount = createToolbarEffect(types_1.LifeCycleTypes.ON_TOOLBAR_MOUNT);
exports.onToolbarUnmount = createToolbarEffect(types_1.LifeCycleTypes.ON_TOOLBAR_UNMOUNT);
exports.onToolbarValueChange = createToolbarEffect(types_1.LifeCycleTypes.ON_TOOLBAR_VALUE_CHANGE);
//# sourceMappingURL=toolbar.js.map