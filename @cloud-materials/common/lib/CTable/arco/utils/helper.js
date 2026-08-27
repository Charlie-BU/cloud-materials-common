"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPolling = exports.changeToolbarValues = exports.changeToolbarValuesPure = exports.defineToolbar = exports.defineColumns = exports.defineColumn = exports.getTableConfig = void 0;
var lodash_es_1 = require("lodash-es");
var reactive_1 = require("@formily/reactive");
// 为了方便用户直接获取 table 的 config，而不需要引入 TableConfig 类型
var getTableConfig = function (config) {
    return config;
};
exports.getTableConfig = getTableConfig;
/** 在配置 column config 有类型提示，而不需要引入 ColumnConfig 类型*/
var defineColumn = function (columnConfig) {
    return columnConfig;
};
exports.defineColumn = defineColumn;
/** 定义 columns，有类型提示，而不需要引入 ColumnConfig 类型*/
var defineColumns = function (columns) {
    return columns;
};
exports.defineColumns = defineColumns;
/** 定义 toolbar，有类型提示，而不需要引入 ToolbarConfig 类型*/
var defineToolbar = function (toolbarConfig) {
    return toolbarConfig;
};
exports.defineToolbar = defineToolbar;
/** 未做 debounce */
var changeToolbarValuesPure = function (table, values) {
    var _a, _b;
    // values 可能是 form 传过来的值，将 values toJS 避免 form 和 table 持有同一个 proxy 的对象，以防万一出问题（不确定是否有问题）
    (_a = table.toolbar) === null || _a === void 0 ? void 0 : _a.setFilterValues((0, reactive_1.toJS)(values), { merge: true });
    (_b = table.toolbar) === null || _b === void 0 ? void 0 : _b.filter();
};
exports.changeToolbarValuesPure = changeToolbarValuesPure;
/** 这里默认为 500，若想修改 debounce 行为请依赖 changeToolbarValuesPure 自行处理 */
exports.changeToolbarValues = (0, lodash_es_1.debounce)(exports.changeToolbarValuesPure, 500);
/**
 * 创建轮询实例
 * @param options
 * @returns
 */
var createPolling = function (options) {
    var defaultOptions = {
        manual: false,
        showLoading: false,
        resetSelectedRows: false,
        autoStopAndStartOnVisibilityChange: true,
    };
    return {
        start: function () { },
        stop: function () { },
        options: (0, lodash_es_1.merge)(defaultOptions, options),
    };
};
exports.createPolling = createPolling;
//# sourceMappingURL=helper.js.map