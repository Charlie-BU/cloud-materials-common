"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInnerCreateTable = exports.useCreateTable = exports.useMergedTableConfig = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-10-14 17:04:10
 * @LastEditTime: 2021-12-04 12:15:29
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = require("react");
var core_1 = require("../../core");
var CConfigProvider_1 = require("../../../CConfigProvider");
var lodash_es_1 = require("lodash-es");
// import { fixTableConfig } from '../utils';
tslib_1.__exportStar(require("./useLoadMore"), exports);
tslib_1.__exportStar(require("./usePolling"), exports);
tslib_1.__exportStar(require("./useControlled"), exports);
var useMergedTableConfig = function (tableConfig) {
    var cComponentConfig = (0, CConfigProvider_1.useCConfigContext)().cComponentConfig;
    var cTableGlobalConfig = cComponentConfig === null || cComponentConfig === void 0 ? void 0 : cComponentConfig.CTable;
    return (0, react_1.useMemo)(function () {
        // tableConfig 存在时才合并，否则会造成 props.table 与 props.config 互斥逻辑错误
        if (tableConfig && cTableGlobalConfig) {
            return (0, lodash_es_1.merge)({}, tableConfig, cTableGlobalConfig);
        }
        return tableConfig;
    }, [tableConfig, cTableGlobalConfig]);
};
exports.useMergedTableConfig = useMergedTableConfig;
/**
 * 业务方可以直接生成领域模型传入 Table 组件，从而不需要通过 ref 拿到 table 的领域模型实例
 * 用法：
 * const SomeComp = () => {
 *    const table = useCreateTable({})
 *    return (<Table table={table} />)
 * }
 */
var useCreateTable = function (originTableConfig) {
    var tableConfig = (0, exports.useMergedTableConfig)(originTableConfig);
    // fixTableConfig(tableConfig);
    var table = (0, react_1.useMemo)(function () { return (0, core_1.createTable)(tableConfig); }, []);
    /**
     * 这里直接更新 table 的配置，因为 config 变化时，一定是调用 useCreateTable 的组件(上面的SomeComp) rerender 了
     * 而作为子组件的 Table 本身也会更新，如果这里使用 useEffect 监听 config 变化，然后 forceUpdate
     * 此时 rerender 的是 SomeComp，该组件又会生成新的 config
     * 新的 config 被 useEffect 监听到，又 rerender，导致组件无限 render
     *
     * 另外，因为 table.config 有 setter 逻辑，初始化时，实例化 table 实例（createTable），有一次 config 赋值
     * 这里又有一次 config 赋值，其实会导致 setter 执行两次，影响不大
     * */
    table.config = tableConfig;
    return table;
};
exports.useCreateTable = useCreateTable;
/**
 * 在 Table 组件内部消费业务方传入的 props
 * 业务方可能直接传 props.config，也可能传 props.table
 */
var useInnerCreateTable = function (tableConfig, tableModel) {
    // if (tableConfig) {
    //   fixTableConfig(tableConfig);
    // }
    var table = (0, react_1.useMemo)(function () { return tableModel || (0, core_1.createTable)(tableConfig); }, []);
    return table;
};
exports.useInnerCreateTable = useInnerCreateTable;
//# sourceMappingURL=index.js.map