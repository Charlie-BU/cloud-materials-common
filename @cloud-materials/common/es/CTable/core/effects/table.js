import { __assign } from "tslib";
/*
 * @Author: youjingyu
 * @Date: 2021-10-17 10:24:01
 * @LastEditTime: 2021-11-04 17:46:50
 * @LastEditors: youjingyu
 * @Description:
 */
import { batch } from '@formily/reactive';
import { createEffectHook } from '../shared';
import { LifeCycleTypes } from '../types';
var createTableEffect = function (type) {
    return createEffectHook(type, function (table, payload) {
        return function (callback) {
            batch(function () {
                // @ts-ignore
                callback(__assign({ table: table }, payload));
            });
        };
    });
};
export var onTableInitConfig = createTableEffect(LifeCycleTypes.ON_TABLE_INIT_CONFIG);
export var onTableInit = createTableEffect(LifeCycleTypes.ON_TABLE_INIT);
export var onTableInitColumn = createTableEffect(LifeCycleTypes.ON_TABLE_INIT_COLUMN);
export var onTableSelectRow = createTableEffect(LifeCycleTypes.ON_TABLE_SELECT_ROW);
export var onTableUpdateDataStart = createTableEffect(LifeCycleTypes.ON_TABLE_UPDATE_DATA_START);
export var onTableUpdateDataEnd = createTableEffect(LifeCycleTypes.ON_TABLE_UPDATE_DATA_END);
export var onTableUpdateRowEnd = createTableEffect(LifeCycleTypes.ON_TABLE_UPDATE_ROW_END);
export var onTablePageChangeStart = createTableEffect(LifeCycleTypes.ON_TABLE_PAGE_CHANGE_START);
export var onTablePageChangeEnd = createTableEffect(LifeCycleTypes.ON_TABLE_PAGE_CHANGE_END);
export var onSortValueChange = createTableEffect(LifeCycleTypes.ON_SORT_VALUE_CHANGE);
export var onColumnFilterValueChange = createTableEffect(LifeCycleTypes.ON_COLUMN_FILTER_VALUE_CHANGE);
//# sourceMappingURL=table.js.map