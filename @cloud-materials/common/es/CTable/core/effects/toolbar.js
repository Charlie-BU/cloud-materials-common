import { __assign } from "tslib";
/*
 * @Author: youjingyu
 * @Date: 2021-10-17 10:24:27
 * @LastEditTime: 2021-10-20 11:28:36
 * @LastEditors: youjingyu
 * @Description:
 */
import { batch } from '@formily/reactive';
import { createEffectHook } from '../shared';
import { LifeCycleTypes } from '../types';
var createToolbarEffect = function (type) {
    return createEffectHook(type, function (table, payload) {
        return function (callback) {
            batch(function () {
                callback(__assign({ table: table }, payload));
            });
        };
    });
};
export var onToolbarInit = createToolbarEffect(LifeCycleTypes.ON_TOOLBAR_INIT);
export var onToolbarMount = createToolbarEffect(LifeCycleTypes.ON_TOOLBAR_MOUNT);
export var onToolbarUnmount = createToolbarEffect(LifeCycleTypes.ON_TOOLBAR_UNMOUNT);
export var onToolbarValueChange = createToolbarEffect(LifeCycleTypes.ON_TOOLBAR_VALUE_CHANGE);
//# sourceMappingURL=toolbar.js.map