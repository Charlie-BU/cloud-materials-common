import { __assign } from "tslib";
/*
 * @Author: youjingyu
 * @Date: 2021-10-17 10:24:27
 * @LastEditTime: 2021-11-04 17:46:41
 * @LastEditors: youjingyu
 * @Description:
 */
import { batch } from '@formily/reactive';
import { createEffectHook } from '../shared';
import { LifeCycleTypes } from '../types';
var createFetcherEffect = function (type) {
    return createEffectHook(type, function (table, payload) {
        return function (callback) {
            batch(function () {
                callback(__assign({ table: table }, payload));
            });
        };
    });
};
export var onFetchStart = createFetcherEffect(LifeCycleTypes.ON_FETCH_START);
export var onFetchEnd = createFetcherEffect(LifeCycleTypes.ON_FETCH_END);
export var onFetchError = createFetcherEffect(LifeCycleTypes.ON_FETCH_ERROR);
//# sourceMappingURL=fetcher.js.map