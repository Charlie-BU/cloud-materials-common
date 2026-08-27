import { __assign } from "tslib";
/*
 * @Author: youjingyu
 * @Date: 2021-10-17 10:24:27
 * @LastEditTime: 2021-11-04 17:46:28
 * @LastEditors: youjingyu
 * @Description:
 */
import { batch } from '@formily/reactive';
import { createEffectHook } from '../shared';
import { LifeCycleTypes } from '../types';
var createRowEffect = function (type) {
    return createEffectHook(type, function (table, payload) {
        return function (callback) {
            batch(function () {
                callback(__assign({ table: table }, payload));
            });
        };
    });
};
export var onRowInit = createRowEffect(LifeCycleTypes.ON_ROW_INIT);
export var onRowSelect = createRowEffect(LifeCycleTypes.ON_ROW_SELECT);
//# sourceMappingURL=row.js.map