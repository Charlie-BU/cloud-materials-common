import { __assign } from "tslib";
/*
 * @Author: youjingyu
 * @Date: 2021-10-17 10:24:27
 * @LastEditTime: 2021-11-04 17:46:33
 * @LastEditors: youjingyu
 * @Description:
 */
import { batch } from '@formily/reactive';
import { createEffectHook } from '../shared';
import { LifeCycleTypes } from '../types';
var createColumnEffect = function (type) {
    return createEffectHook(type, function (table, payload) {
        return function (callback) {
            batch(function () {
                callback(__assign({ table: table }, payload));
            });
        };
    });
};
export var onColumnInit = createColumnEffect(LifeCycleTypes.ON_COLUMN_INIT);
export var onColumnVisibleChange = createColumnEffect(LifeCycleTypes.ON_COLUMN_VISIBLE_CHANGE);
//# sourceMappingURL=column.js.map