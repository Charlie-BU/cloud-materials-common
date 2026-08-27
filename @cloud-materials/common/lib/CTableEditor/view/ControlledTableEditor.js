"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_2 = require("@formily/react");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var reactive_1 = require("@formily/reactive");
var core_1 = require("@formily/core");
var TableEditorProvider_1 = require("./components/TableEditorProvider");
var helper_1 = require("../model/TableEditor/helper");
var CellDecorator_1 = require("./components/CellDecorator");
var RowDecorator_1 = require("./components/RowDecorator");
var lodash_es_1 = require("lodash-es");
var CTable_1 = require("../../CTable");
var utils_1 = require("../utils");
var useFieldValidate_1 = require("./hooks/useFieldValidate");
var useFieldReset_1 = require("./hooks/useFieldReset");
var context_1 = require("../../CForm/shared/context");
var const_1 = require("../../CForm/const");
var usePrefix_1 = require("./hooks/usePrefix");
var testId_1 = require("../testId");
var ControlledTableEditor = (0, react_1.forwardRef)(function (props, ref) {
    var _a;
    var _b, _c;
    var config = props.config, value = props.value, onChange = props.onChange;
    var prefixCls = (0, usePrefix_1.usePrefix)();
    var isFirstValueRef = (0, react_1.useRef)(true);
    var isResetRef = (0, react_1.useRef)(false);
    var _value = (0, reactive_1.toJS)(value);
    // 视图层 Table Row & Cell <-> Form ObjectField & Field 的联系
    var baseTableConfig = tslib_1.__assign(tslib_1.__assign({}, config.tableConfig), { 
        // TableEditor 受控模式，需要实现 父组件 value -> 内部 table data 的数据链路
        extraConfig: tslib_1.__assign(tslib_1.__assign({}, config.tableConfig.extraConfig), { isInTableEditor: true, useMemoTableRow: true }), data: _value ? (0, utils_1.addRowKeyToArray)(_value) : undefined, rowDecorator: RowDecorator_1.RowDecorator, globalColumnConfig: tslib_1.__assign(tslib_1.__assign({}, (_b = config === null || config === void 0 ? void 0 : config.tableConfig) === null || _b === void 0 ? void 0 : _b.globalColumnConfig), { cellDecorator: CellDecorator_1.CellDecorator }) });
    var tableConfig = function (tableEditor) { return (tslib_1.__assign(tslib_1.__assign({}, baseTableConfig), { 
        // 受控模式下设置 originalTableData 初始值
        // 受控模式下 table 的数据完全来自于父组件的 value，所以在第一次数据更新完成时设置 originalTableData，作为初始值
        effects: function (options) {
            var _a, _b;
            (_b = (_a = config.tableConfig) === null || _a === void 0 ? void 0 : _a.effects) === null || _b === void 0 ? void 0 : _b.call(_a, options);
            (0, CTable_1.onTableUpdateDataEnd)(function (_a) {
                var table = _a.table;
                // 第一次装载数据时记录 TableEditor 初始值
                if (isFirstValueRef.current) {
                    // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
                    tableEditor.originalTableData = (0, lodash_es_1.cloneDeep)(table.initTotalData);
                    isFirstValueRef.current = false;
                    return;
                }
                // TableEditor 外部 Form 重置时，也要重新设置初始值
                // 因为 TableEditor 在保存修改后会设置 originalTableData，所以 reset 时要重置为外部 Form 的初始值
                if (isResetRef.current) {
                    tableEditor.originalTableData = (0, lodash_es_1.cloneDeep)(table.initTotalData);
                    isResetRef.current = false;
                }
            });
        } })); };
    var formConfig = function (tableEditor) {
        var _formConfig = config === null || config === void 0 ? void 0 : config.formConfig;
        var formConfig = (0, lodash_es_1.isFunction)(_formConfig) ? _formConfig(tableEditor) : _formConfig;
        return tslib_1.__assign(tslib_1.__assign({}, formConfig), { effects: function (form) {
                var _a;
                // 执行用户配置的 effects
                (_a = formConfig === null || formConfig === void 0 ? void 0 : formConfig.effects) === null || _a === void 0 ? void 0 : _a.call(formConfig, form);
                (0, core_1.onFormValuesChange)(function (form) {
                    var _a;
                    var formValues = form.values;
                    // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
                    var tableData = (_a = tableEditor === null || tableEditor === void 0 ? void 0 : tableEditor.table) === null || _a === void 0 ? void 0 : _a.initTotalData;
                    // form values 批量变化时，比如批量删除，不会每次触发 onChange，只在批量操作完成时触发一次
                    if (tableEditor.isFormValueBatchChanging)
                        return;
                    // 当 TableEditor 被卸载又重新装载时，此时会接受到外层 Form 保存的 value
                    // 在 TableEditor constructor 中执行完 createForm 后，会立刻执行该 effect，但是此时 table 还没有被创建出来，所以需要判断一下
                    if (!tableData)
                        return;
                    var data = (0, utils_1.transformFormValuesToArray)((0, reactive_1.toJS)(formValues), tableData);
                    onChange === null || onChange === void 0 ? void 0 : onChange(data);
                });
            } });
    };
    // 创建 TableEditor 实例，支持外部传入
    var tableEditor = (0, react_1.useMemo)(function () {
        return (config.tableEditor ||
            (0, helper_1.createTableEditor)({
                tableConfig: tableConfig,
                formConfig: formConfig,
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
    (0, useFieldValidate_1.useFieldValidate)(tableEditor);
    (0, useFieldReset_1.useFieldReset)(tableEditor, isResetRef);
    // 这里必须用 useMemo 包裹，否则受控场景下，每次 props.value 变化时都会生成新的 context，导致下面使用了该 context 的组件重渲染，比如 CField
    var formContext = (0, react_1.useMemo)(function () { return ({ componentsMap: const_1.DefaultBuiltInComponentMap }); }, []);
    return (react_1.default.createElement(context_1.CFormRegisterConfigContext.Provider, { value: formContext },
        react_1.default.createElement(react_2.FormProvider, { form: tableEditor.form },
            react_1.default.createElement(TableEditorProvider_1.TableEditorProvider, { tableEditor: tableEditor },
                react_1.default.createElement("div", { className: (0, classnames_1.default)(prefixCls, props.className, (_a = {},
                        _a["".concat(prefixCls, "-auto-scroll")] = (_c = config.tableConfig.extraConfig) === null || _c === void 0 ? void 0 : _c.autoFixBottomScroll,
                        _a)), "data-testid": testId_1.testId.tableEditor, "data-cy": testId_1.testId.tableEditor },
                    config.renderBefore ? react_1.default.createElement(RenderBefore, null) : null,
                    tableComp,
                    config.renderAfter ? react_1.default.createElement(RenderAfter, null) : null)))));
});
ControlledTableEditor.displayName = 'ControlledTableEditor';
exports.default = ControlledTableEditor;
//# sourceMappingURL=ControlledTableEditor.js.map