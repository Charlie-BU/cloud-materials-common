"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_2 = require("@formily/react");
var core_1 = require("@formily/core");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var TableEditorProvider_1 = require("./components/TableEditorProvider");
var helper_1 = require("../model/TableEditor/helper");
var CTable_1 = require("../../CTable");
var CellDecorator_1 = require("./components/CellDecorator");
var RowDecorator_1 = require("./components/RowDecorator");
var lodash_es_1 = require("lodash-es");
var context_1 = require("../../CForm/shared/context");
var const_1 = require("../../CForm/const");
var utils_1 = require("../utils");
var usePrefix_1 = require("./hooks/usePrefix");
var testId_1 = require("../testId");
var CConfigProvider_1 = require("../../CConfigProvider");
var UncontrolledTableEditor = (0, react_1.forwardRef)(function (props, ref) {
    var _a;
    var _b, _c;
    var config = props.config, className = props.className;
    var prefixCls = (0, usePrefix_1.usePrefix)();
    // 非受控模式下，需要手动设置内部 FormItem 的国际化。受控模式下被外部 Form 控制，所以不需要设置
    var locale = (0, CConfigProvider_1.useCConfigContext)().locale;
    (0, react_1.useEffect)(function () {
        (0, core_1.setValidateLanguage)(locale.locale);
    }, [locale.locale]);
    // 视图层 Table Row & Cell <-> Form ObjectField & Field 的联系
    var baseTableConfig = tslib_1.__assign(tslib_1.__assign({}, config.tableConfig), { extraConfig: tslib_1.__assign(tslib_1.__assign({}, config.tableConfig.extraConfig), { isInTableEditor: true }), 
        // Table 组件也需要传 config.data 来支持 data 受控，同样的，这里的 data 也需要做加 rowKey 操作
        data: config.tableConfig.data ? (0, utils_1.addRowKeyToArray)(config.tableConfig.data) : undefined, rowDecorator: RowDecorator_1.RowDecorator, globalColumnConfig: tslib_1.__assign(tslib_1.__assign({}, (_b = config === null || config === void 0 ? void 0 : config.tableConfig) === null || _b === void 0 ? void 0 : _b.globalColumnConfig), { cellDecorator: CellDecorator_1.CellDecorator }) });
    var tableConfig = function (tableEditor) { return (tslib_1.__assign(tslib_1.__assign({}, baseTableConfig), { 
        // 非受控模式下设置 originalTableData 初始值
        effects: function (options) {
            var _a, _b;
            (_b = (_a = config.tableConfig) === null || _a === void 0 ? void 0 : _a.effects) === null || _b === void 0 ? void 0 : _b.call(_a, options);
            var isFetching = false;
            var isFirstUpdate = true;
            (0, CTable_1.onFetchStart)(function () {
                isFetching = true;
            });
            // 本地模式下：没有 fetcher，table 的 data 来自 config.data，所以在 table 第一次数据更新完成时设置 originalTableData
            // 远程模式下: table 的数据在每次 fetch 时全量更新，所以在 fetch 后数据更新完成时设置 originalTableData
            // 两种 case 可以合在一起写，更简洁
            (0, CTable_1.onTableUpdateDataEnd)(function (_a) {
                var table = _a.table;
                // 远程模式第一次请求数据和本地模式数据更新完成后会进入这个逻辑，仅执行一次
                if (isFirstUpdate) {
                    // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
                    tableEditor.originalTableData = (0, lodash_es_1.cloneDeep)(table.initTotalData);
                    isFirstUpdate = false;
                    // 如果是远程模式，此时 isFetching 为 true，需要手动重置一下
                    if (isFetching)
                        isFetching = false;
                    return;
                }
                // 远程模式后续的请求，每次请求全量的数据，需要重新设置 originalTableData
                if (isFetching) {
                    tableEditor.originalTableData = (0, lodash_es_1.cloneDeep)(table.initTotalData);
                    isFetching = false;
                }
            });
        } })); };
    // 创建 TableEditor 实例，支持外部传入
    var tableEditor = (0, react_1.useMemo)(function () {
        return (config.tableEditor ||
            (0, helper_1.createTableEditor)({
                tableConfig: tableConfig,
                formConfig: config.formConfig,
                config: config,
            }));
    }, []);
    (0, react_1.useImperativeHandle)(ref, function () { return tableEditor; });
    var tableComp = react_1.default.createElement(CTable_1.Table, tslib_1.__assign({}, props, { table: tableEditor.table, config: baseTableConfig }));
    // 用户在 render 里使用 TableEditor 的属性时，需要在外面包一层 observer，略麻烦，所以 TableEditor 组件内部吃掉这个逻辑
    var RenderBefore = (0, react_2.observer)(function (_) {
        return config.renderBefore ? config.renderBefore(tableEditor) : null;
    });
    var RenderAfter = (0, react_2.observer)(function (_) {
        return config.renderAfter ? config.renderAfter(tableEditor) : null;
    });
    var formContext = (0, react_1.useMemo)(function () { return ({ componentsMap: const_1.DefaultBuiltInComponentMap }); }, []);
    return (react_1.default.createElement(context_1.CFormRegisterConfigContext.Provider, { value: formContext },
        react_1.default.createElement(react_2.FormProvider, { form: tableEditor.form },
            react_1.default.createElement(TableEditorProvider_1.TableEditorProvider, { tableEditor: tableEditor },
                react_1.default.createElement("div", { className: (0, classnames_1.default)(prefixCls, className, (_a = {},
                        _a["".concat(prefixCls, "-auto-scroll")] = (_c = config.tableConfig.extraConfig) === null || _c === void 0 ? void 0 : _c.autoFixBottomScroll,
                        _a)), "data-testid": testId_1.testId.tableEditor, "data-cy": testId_1.testId.tableEditor },
                    config.renderBefore ? react_1.default.createElement(RenderBefore, null) : null,
                    tableComp,
                    config.renderAfter ? react_1.default.createElement(RenderAfter, null) : null)))));
});
UncontrolledTableEditor.displayName = 'UncontrolledTableEditor';
exports.default = UncontrolledTableEditor;
//# sourceMappingURL=UncontrolledTableEditor.js.map