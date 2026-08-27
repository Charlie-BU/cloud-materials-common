import { debounce, merge } from 'lodash-es';
import { toJS } from '@formily/reactive';
// 为了方便用户直接获取 table 的 config，而不需要引入 TableConfig 类型
export var getTableConfig = function (config) {
    return config;
};
/** 在配置 column config 有类型提示，而不需要引入 ColumnConfig 类型*/
export var defineColumn = function (columnConfig) {
    return columnConfig;
};
/** 定义 columns，有类型提示，而不需要引入 ColumnConfig 类型*/
export var defineColumns = function (columns) {
    return columns;
};
/** 定义 toolbar，有类型提示，而不需要引入 ToolbarConfig 类型*/
export var defineToolbar = function (toolbarConfig) {
    return toolbarConfig;
};
/** 未做 debounce */
export var changeToolbarValuesPure = function (table, values) {
    var _a, _b;
    // values 可能是 form 传过来的值，将 values toJS 避免 form 和 table 持有同一个 proxy 的对象，以防万一出问题（不确定是否有问题）
    (_a = table.toolbar) === null || _a === void 0 ? void 0 : _a.setFilterValues(toJS(values), { merge: true });
    (_b = table.toolbar) === null || _b === void 0 ? void 0 : _b.filter();
};
/** 这里默认为 500，若想修改 debounce 行为请依赖 changeToolbarValuesPure 自行处理 */
export var changeToolbarValues = debounce(changeToolbarValuesPure, 500);
/**
 * 创建轮询实例
 * @param options
 * @returns
 */
export var createPolling = function (options) {
    var defaultOptions = {
        manual: false,
        showLoading: false,
        resetSelectedRows: false,
        autoStopAndStartOnVisibilityChange: true,
    };
    return {
        start: function () { },
        stop: function () { },
        options: merge(defaultOptions, options),
    };
};
//# sourceMappingURL=helper.js.map