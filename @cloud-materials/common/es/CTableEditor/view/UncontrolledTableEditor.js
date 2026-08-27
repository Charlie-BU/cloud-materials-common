import { __assign } from "tslib";
import React, { forwardRef, useImperativeHandle, useMemo, useEffect } from 'react';
import { FormProvider, observer } from '@formily/react';
import { setValidateLanguage } from '@formily/core';
import classnames from 'classnames';
import { TableEditorProvider } from './components/TableEditorProvider';
import { createTableEditor } from '../model/TableEditor/helper';
import { Table, onTableUpdateDataEnd, onFetchStart } from '../../CTable';
import { CellDecorator } from './components/CellDecorator';
import { RowDecorator } from './components/RowDecorator';
import { cloneDeep } from 'lodash-es';
import { CFormRegisterConfigContext } from '../../CForm/shared/context';
import { DefaultBuiltInComponentMap } from '../../CForm/const';
import { addRowKeyToArray } from '../utils';
import { usePrefix } from './hooks/usePrefix';
import { testId } from '../testId';
import { useCConfigContext } from '../../CConfigProvider';
var UncontrolledTableEditor = forwardRef(function (props, ref) {
    var _a;
    var _b, _c;
    var config = props.config, className = props.className;
    var prefixCls = usePrefix();
    // 非受控模式下，需要手动设置内部 FormItem 的国际化。受控模式下被外部 Form 控制，所以不需要设置
    var locale = useCConfigContext().locale;
    useEffect(function () {
        setValidateLanguage(locale.locale);
    }, [locale.locale]);
    // 视图层 Table Row & Cell <-> Form ObjectField & Field 的联系
    var baseTableConfig = __assign(__assign({}, config.tableConfig), { extraConfig: __assign(__assign({}, config.tableConfig.extraConfig), { isInTableEditor: true }), 
        // Table 组件也需要传 config.data 来支持 data 受控，同样的，这里的 data 也需要做加 rowKey 操作
        data: config.tableConfig.data ? addRowKeyToArray(config.tableConfig.data) : undefined, rowDecorator: RowDecorator, globalColumnConfig: __assign(__assign({}, (_b = config === null || config === void 0 ? void 0 : config.tableConfig) === null || _b === void 0 ? void 0 : _b.globalColumnConfig), { cellDecorator: CellDecorator }) });
    var tableConfig = function (tableEditor) { return (__assign(__assign({}, baseTableConfig), { 
        // 非受控模式下设置 originalTableData 初始值
        effects: function (options) {
            var _a, _b;
            (_b = (_a = config.tableConfig) === null || _a === void 0 ? void 0 : _a.effects) === null || _b === void 0 ? void 0 : _b.call(_a, options);
            var isFetching = false;
            var isFirstUpdate = true;
            onFetchStart(function () {
                isFetching = true;
            });
            // 本地模式下：没有 fetcher，table 的 data 来自 config.data，所以在 table 第一次数据更新完成时设置 originalTableData
            // 远程模式下: table 的数据在每次 fetch 时全量更新，所以在 fetch 后数据更新完成时设置 originalTableData
            // 两种 case 可以合在一起写，更简洁
            onTableUpdateDataEnd(function (_a) {
                var table = _a.table;
                // 远程模式第一次请求数据和本地模式数据更新完成后会进入这个逻辑，仅执行一次
                if (isFirstUpdate) {
                    // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
                    tableEditor.originalTableData = cloneDeep(table.initTotalData);
                    isFirstUpdate = false;
                    // 如果是远程模式，此时 isFetching 为 true，需要手动重置一下
                    if (isFetching)
                        isFetching = false;
                    return;
                }
                // 远程模式后续的请求，每次请求全量的数据，需要重新设置 originalTableData
                if (isFetching) {
                    tableEditor.originalTableData = cloneDeep(table.initTotalData);
                    isFetching = false;
                }
            });
        } })); };
    // 创建 TableEditor 实例，支持外部传入
    var tableEditor = useMemo(function () {
        return (config.tableEditor ||
            createTableEditor({
                tableConfig: tableConfig,
                formConfig: config.formConfig,
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
    var formContext = useMemo(function () { return ({ componentsMap: DefaultBuiltInComponentMap }); }, []);
    return (React.createElement(CFormRegisterConfigContext.Provider, { value: formContext },
        React.createElement(FormProvider, { form: tableEditor.form },
            React.createElement(TableEditorProvider, { tableEditor: tableEditor },
                React.createElement("div", { className: classnames(prefixCls, className, (_a = {},
                        _a["".concat(prefixCls, "-auto-scroll")] = (_c = config.tableConfig.extraConfig) === null || _c === void 0 ? void 0 : _c.autoFixBottomScroll,
                        _a)), "data-testid": testId.tableEditor, "data-cy": testId.tableEditor },
                    config.renderBefore ? React.createElement(RenderBefore, null) : null,
                    tableComp,
                    config.renderAfter ? React.createElement(RenderAfter, null) : null)))));
});
UncontrolledTableEditor.displayName = 'UncontrolledTableEditor';
export default UncontrolledTableEditor;
//# sourceMappingURL=UncontrolledTableEditor.js.map