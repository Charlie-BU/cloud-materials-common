import { __assign } from "tslib";
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { FormProvider, observer } from '@formily/react';
import classnames from 'classnames';
import { toJS } from '@formily/reactive';
import { onFormValuesChange } from '@formily/core';
import { TableEditorProvider } from './components/TableEditorProvider';
import { createTableEditor } from '../model/TableEditor/helper';
import { CellDecorator } from './components/CellDecorator';
import { RowDecorator } from './components/RowDecorator';
import { cloneDeep, isFunction } from 'lodash-es';
import { Table, onTableUpdateDataEnd } from '../../CTable';
import { addRowKeyToArray, transformFormValuesToArray } from '../utils';
import { useFieldValidate } from './hooks/useFieldValidate';
import { useFieldReset } from './hooks/useFieldReset';
import { CFormRegisterConfigContext } from '../../CForm/shared/context';
import { DefaultBuiltInComponentMap } from '../../CForm/const';
import { usePrefix } from './hooks/usePrefix';
import { testId } from '../testId';
var ControlledTableEditor = forwardRef(function (props, ref) {
    var _a;
    var _b, _c;
    var config = props.config, value = props.value, onChange = props.onChange;
    var prefixCls = usePrefix();
    var isFirstValueRef = useRef(true);
    var isResetRef = useRef(false);
    var _value = toJS(value);
    // 视图层 Table Row & Cell <-> Form ObjectField & Field 的联系
    var baseTableConfig = __assign(__assign({}, config.tableConfig), { 
        // TableEditor 受控模式，需要实现 父组件 value -> 内部 table data 的数据链路
        extraConfig: __assign(__assign({}, config.tableConfig.extraConfig), { isInTableEditor: true, useMemoTableRow: true }), data: _value ? addRowKeyToArray(_value) : undefined, rowDecorator: RowDecorator, globalColumnConfig: __assign(__assign({}, (_b = config === null || config === void 0 ? void 0 : config.tableConfig) === null || _b === void 0 ? void 0 : _b.globalColumnConfig), { cellDecorator: CellDecorator }) });
    var tableConfig = function (tableEditor) { return (__assign(__assign({}, baseTableConfig), { 
        // 受控模式下设置 originalTableData 初始值
        // 受控模式下 table 的数据完全来自于父组件的 value，所以在第一次数据更新完成时设置 originalTableData，作为初始值
        effects: function (options) {
            var _a, _b;
            (_b = (_a = config.tableConfig) === null || _a === void 0 ? void 0 : _a.effects) === null || _b === void 0 ? void 0 : _b.call(_a, options);
            onTableUpdateDataEnd(function (_a) {
                var table = _a.table;
                // 第一次装载数据时记录 TableEditor 初始值
                if (isFirstValueRef.current) {
                    // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
                    tableEditor.originalTableData = cloneDeep(table.initTotalData);
                    isFirstValueRef.current = false;
                    return;
                }
                // TableEditor 外部 Form 重置时，也要重新设置初始值
                // 因为 TableEditor 在保存修改后会设置 originalTableData，所以 reset 时要重置为外部 Form 的初始值
                if (isResetRef.current) {
                    tableEditor.originalTableData = cloneDeep(table.initTotalData);
                    isResetRef.current = false;
                }
            });
        } })); };
    var formConfig = function (tableEditor) {
        var _formConfig = config === null || config === void 0 ? void 0 : config.formConfig;
        var formConfig = isFunction(_formConfig) ? _formConfig(tableEditor) : _formConfig;
        return __assign(__assign({}, formConfig), { effects: function (form) {
                var _a;
                // 执行用户配置的 effects
                (_a = formConfig === null || formConfig === void 0 ? void 0 : formConfig.effects) === null || _a === void 0 ? void 0 : _a.call(formConfig, form);
                onFormValuesChange(function (form) {
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
                    var data = transformFormValuesToArray(toJS(formValues), tableData);
                    onChange === null || onChange === void 0 ? void 0 : onChange(data);
                });
            } });
    };
    // 创建 TableEditor 实例，支持外部传入
    var tableEditor = useMemo(function () {
        return (config.tableEditor ||
            createTableEditor({
                tableConfig: tableConfig,
                formConfig: formConfig,
                config: config,
            }));
    }, []);
    useImperativeHandle(ref, function () { return tableEditor; });
    var tableComp = React.createElement(Table, __assign({}, props, { table: tableEditor.table, config: baseTableConfig }));
    // 用户在 render 里使用 TableEditor 的属性时，需要在外面包一层 observer，略麻烦，所以 TableEditor 组件内部吃掉这个逻辑
    var RenderBefore = observer(function (_) {
        return config.renderBefore ? config.renderBefore(tableEditor) : null;
    });
    var RenderAfter = observer(function (_) {
        return config.renderAfter ? config.renderAfter(tableEditor) : null;
    });
    useFieldValidate(tableEditor);
    useFieldReset(tableEditor, isResetRef);
    // 这里必须用 useMemo 包裹，否则受控场景下，每次 props.value 变化时都会生成新的 context，导致下面使用了该 context 的组件重渲染，比如 CField
    var formContext = useMemo(function () { return ({ componentsMap: DefaultBuiltInComponentMap }); }, []);
    return (React.createElement(CFormRegisterConfigContext.Provider, { value: formContext },
        React.createElement(FormProvider, { form: tableEditor.form },
            React.createElement(TableEditorProvider, { tableEditor: tableEditor },
                React.createElement("div", { className: classnames(prefixCls, props.className, (_a = {},
                        _a["".concat(prefixCls, "-auto-scroll")] = (_c = config.tableConfig.extraConfig) === null || _c === void 0 ? void 0 : _c.autoFixBottomScroll,
                        _a)), "data-testid": testId.tableEditor, "data-cy": testId.tableEditor },
                    config.renderBefore ? React.createElement(RenderBefore, null) : null,
                    tableComp,
                    config.renderAfter ? React.createElement(RenderAfter, null) : null)))));
});
ControlledTableEditor.displayName = 'ControlledTableEditor';
export default ControlledTableEditor;
//# sourceMappingURL=ControlledTableEditor.js.map