"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports._Table = exports.InnerTable = void 0;
var tslib_1 = require("tslib");
/*
 * @Author: youjingyu
 * @Date: 2021-09-14 17:12:43
 * @LastEditTime: 2021-12-10 20:53:07
 * @LastEditors: youjingyu
 * @Description:
 */
var react_1 = tslib_1.__importStar(require("react"));
var ahooks_1 = require("ahooks");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var web_react_1 = require("@arco-design/web-react");
var iconbox_react_ve_o_design_1 = require("@arco-design/iconbox-react-ve-o-design");
var react_2 = require("@formily/react");
var core_1 = require("../core");
var components_1 = require("./components");
var react_3 = require("../react");
var checkers_1 = require("../shared/checkers");
var plugin_1 = require("./plugin");
var mapModelToArco_1 = require("./mapModelToArco");
var hooks_1 = require("./hooks");
var utils_1 = require("./utils");
var utils_2 = require("../utils");
var CConfigProvider_1 = require("../../CConfigProvider");
var helper_1 = require("../helper");
var formatter_1 = require("./plugin/formatter");
var exportModal_1 = require("./plugin/components/ExportDataBtn/exportDataModal/exportModal");
// 这里使用函数返回默认Props，目的是保证每一个Table实例都使用一个新的默认props，防止相互冲突
function getDefaultTableProps(table) {
    return {
        border: {
            // 废弃: 设计规范中大多数场景的table是不需要显示边框的，所以放到默认props
            // 2023-03-15 更新 源力主题默认有 border
            wrapper: true,
            // 只要有一列支持拖拽，header 就展示 border
            headerCell: table.columns.find(function (item) { return Boolean(item.config.resize); }) ? true : false,
        },
    };
}
core_1.Plugin.globalUse('arcoDefault', new plugin_1.DefaultPlugin());
// 注入全局的 component，从而 Table.getComponent 可以静态地获取组件
core_1.Plugin.globalMixin({ components: plugin_1.globalComponents });
var renderTable = function (props) {
    return react_1.default.createElement(web_react_1.Table, tslib_1.__assign({}, props));
};
exports.InnerTable = (0, react_2.observer)(function (_a) {
    var table = _a.table, className = _a.className, style = _a.style;
    var ctx = (0, CConfigProvider_1.useCConfigContext)();
    var classScope = ctx.getCPrefixCls('table');
    var localMode = ctx.locale.locale;
    var classScopeEn = ctx.getCPrefixCls("table-en-US");
    var isEn = localMode === 'en-US';
    if (isEn) {
        // 2023-11-6：英文环境下英文大小为14
        (0, utils_2.setGlobalFontSize)(utils_2.TableFontSize.US);
    }
    else {
        (0, utils_2.setGlobalFontSize)(utils_2.TableFontSize.CN);
    }
    var arcoPrefixCls = ctx.prefixCls || 'arco';
    var tableContainerRef = (0, react_1.useRef)(null);
    var tableConfig = (0, mapModelToArco_1.mapTableConfig)(table, ctx);
    var extraConfig = table.config.extraConfig;
    // 保证传给 arco 的 components 配置的不变性
    // 否则 arco 每次都会卸载 row、cell，再重新渲染
    var tableCustomComponents = (0, react_1.useMemo)(function () { return ({
        body: {
            row: (extraConfig === null || extraConfig === void 0 ? void 0 : extraConfig.useMemoTableRow) ? components_1.TableRowMemo : components_1.TableRow,
            cell: (extraConfig === null || extraConfig === void 0 ? void 0 : extraConfig.useMemoTableCell) ? components_1.TableCellMemo : components_1.TableCell,
            wrapper: table.isLoadMoreMode() ? components_1.LoadMoreTableBodyWrapper : undefined,
        },
        header: {
            th: components_1.TableHeaderCell,
        },
    }); }, []);
    var originalArcoProps = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, tableConfig), { components: tableCustomComponents }), getDefaultTableProps(table));
    var mergedArcoProps = (0, utils_1.merge)(originalArcoProps, (0, checkers_1.isFn)(table.config.arcoTableProps)
        ? table.config.arcoTableProps(table, originalArcoProps)
        : table.config.arcoTableProps);
    // 为了不将处理 arcoProps 的逻辑和渲染自定义分页器的逻辑耦合在一起，拆成两部分处理
    // 1. 处理了 pagination 后的最终传递给 arco table 的 props
    var arcoProps = (0, utils_1.getArcoPropsFilterPagination)(table, tableConfig, mergedArcoProps);
    // 2. 如果是自定义渲染分页，controlPagination 会返回分页的 ReactNode
    var customPaginationNode = (0, utils_1.controlPagination)(table, mergedArcoProps, classScope, arcoPrefixCls);
    (0, hooks_1.useAutoUpdateTableWidth)(table, tableContainerRef);
    return (react_1.default.createElement(react_3.TableProvider, { table: table },
        react_1.default.createElement("div", { className: (0, classnames_1.default)(
            // 2022-11-6：table在英文环境下内容字体继承arco默认，非英文环境字体为12px
            classScope, isEn && classScopeEn, className, (extraConfig === null || extraConfig === void 0 ? void 0 : extraConfig.autoFixBottomScroll) ? "".concat(classScope, "-auto-scroll") : undefined), style: style, "data-cy": "".concat(classScope, "-container"), "data-testid": "".concat(classScope, "-container") },
            table.toolbar ? react_1.default.createElement(components_1.Toolbar, null) : null,
            react_1.default.createElement(web_react_1.Spin, { icon: react_1.default.createElement(iconbox_react_ve_o_design_1.IconLoading, null), loading: table.loading, style: { width: '100%' }, className: "".concat(classScope, "-spin"), size: 48 },
                react_1.default.createElement("div", { className: "".concat(classScope, "-container"), ref: tableContainerRef },
                    (0, react_3.renderDecorator)(table, renderTable(arcoProps), {
                        scope: 'table',
                        decoratorType: table.decoratorType,
                        decoratorProps: table.decoratorProps,
                    }),
                    customPaginationNode)))));
});
var _Table = function (props, ref) {
    var mergedTableConfig = (0, hooks_1.useMergedTableConfig)(props.config);
    // 配置了 url query，需要处理 config
    var propsConfig = (0, utils_1.formatUrlQueryConfig)(mergedTableConfig);
    var table = (0, hooks_1.useInnerCreateTable)(propsConfig, props.table);
    // 标记 table 是否卸载
    // 注意一定要定义在所有的 Effect 之前，从而保证后续的 Effect 能够拿到正确的卸载状态
    var unmountedRef = (0, ahooks_1.useUnmountedRef)();
    (0, hooks_1.useControlledConfig)(table, propsConfig);
    // 目前这里取出的 config 只用在下面的 data 受控逻辑中，没有在其他地方使用
    // 所谓的 「支持 data」 是指当 Table 组件的 props 中的 config.data 变化时，能够让组件使用新的 data 重渲染，所以这里 config 直接从 props 中取
    var config = propsConfig;
    // const { extraConfig } = config;
    (0, react_1.useImperativeHandle)(ref, function () { return table; });
    // 处理轮询
    var polling = (0, hooks_1.usePolling)({ table: table });
    (0, react_1.useEffect)(function () {
        var timer;
        if ((props === null || props === void 0 ? void 0 : props.autoInit) !== false) {
            table.initData().then(function () {
                var _a;
                // table 卸载了、或者没有配置 startPoolingAfterInitData，则不开始轮训定时器
                var notStartPooling = unmountedRef.current || ((_a = polling === null || polling === void 0 ? void 0 : polling.options) === null || _a === void 0 ? void 0 : _a.startPoolingAfterInitData) !== true;
                if (notStartPooling) {
                    return;
                }
                timer = setTimeout(function () {
                    // 避免定时器启动后，table 已经卸载了
                    if (unmountedRef.current) {
                        return;
                    }
                    polling === null || polling === void 0 ? void 0 : polling.start();
                    // 初始化请求成功后，等 pollingInterval 再开始轮询，更符合预期（因为执行 polling.start 后会立即请求）
                }, polling === null || polling === void 0 ? void 0 : polling.options.pollingInterval);
            });
        }
        return function () {
            // 不用判断 timer 是否存在，因为 clearTimeout 会静默处理，不会报错
            clearTimeout(timer);
        };
    }, []);
    /**
     * TODO 通过 useEffect 的方式监听 data 的变化，会带来 InnerTable 的两次重新渲染
     * 一次是 prop.config 变化带来的，一次是 table.setData 带来的
     * 是否考虑优化
     */
    (0, react_1.useEffect)(function () {
        var _a;
        // 配置了受控，或者没有配置 fetcher，data 进入受控状态
        // let controlledData = extraConfig?.controlledConfig?.data || !config?.fetcher;
        // 支持配置为 false，强行禁止受控
        // if (extraConfig?.controlledConfig?.data === false) {
        // controlledData = false;
        // }
        /**
         * 废弃逻辑：这里使用 props.config，而不是 table.config，因为 props.config 更新时，暂时不会去更新 table.config
         * 因此如果传递了 props.table，还希望 data 受控，还需要再传 props.config
         */
        /**
         * 配置了 data、并且没有配置 fetcher，进入受控状态
         * 当前的 config 在 _Table 组件的最前面取好了，这里不关注 config 是来自 table.config 还是 props.config
         * 事实上，useInnerCreateTable 内部会去更新 table.config，这里的 config 来自 table.config
         */
        if ((config === null || config === void 0 ? void 0 : config.data) && !(config === null || config === void 0 ? void 0 : config.fetcher)) {
            table.setData({
                totalData: config.data || [],
                // 支持手动传参，控制要不要在 setData 时 reset
                // TableEditor 场景下不重置, 即 reset 为 false
                reset: !((_a = config.extraConfig) === null || _a === void 0 ? void 0 : _a.isInTableEditor),
            });
        }
    }, [config === null || config === void 0 ? void 0 : config.data]);
    // 因为 InnerTable 是 observer 的，默认具有 memo 效果，因此传入 forceUpdateFlag 强制其刷新
    return react_1.default.createElement(exports.InnerTable, { table: table, className: props.className, style: props.style, forceUpdateFlag: table.config });
};
exports._Table = _Table;
exports.Table = Object.assign((0, react_1.forwardRef)(exports._Table), {
    getConfig: utils_1.getTableConfig,
    defineConfig: utils_1.getTableConfig,
    defineColumn: utils_1.defineColumn,
    defineColumns: utils_1.defineColumns,
    defineToolbar: utils_1.defineToolbar,
    getTextWidth: utils_2.getTextWidth,
    changeToolbarValues: utils_1.changeToolbarValues,
    changeToolbarValuesPure: utils_1.changeToolbarValuesPure,
    createPolling: utils_1.createPolling,
    formatter: formatter_1.formatter,
    helper: helper_1.helper,
    effects: core_1.effects,
    ExportDataModal: exportModal_1.ExportDataModal,
});
//# sourceMappingURL=index.js.map