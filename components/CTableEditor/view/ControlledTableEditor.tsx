import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { FormProvider, observer } from '@formily/react';
import classnames from 'classnames';
import { toJS } from '@formily/reactive';
import { onFormValuesChange } from '@formily/core';
import { TableEditorProvider } from './components/TableEditorProvider';
import type { TableEditor as TableEditorModel, TableEditorConstructorOptions } from '../model/TableEditor';
import { createTableEditor } from '../model/TableEditor/helper';
import type { TableConfig as TableCompConfig } from '../../CTable/arco/types';
import { CellDecorator } from './components/CellDecorator';
import { RowDecorator } from './components/RowDecorator';
import type { ControlledTableEditorProps } from '../types';
import { cloneDeep, isFunction } from 'lodash-es';
import { Table, onTableUpdateDataEnd } from '../../CTable';
import { addRowKeyToArray, transformFormValuesToArray } from '../utils';
import { useFieldValidate } from './hooks/useFieldValidate';
import { useFieldReset } from './hooks/useFieldReset';
import { CFormRegisterConfigContext } from '../../CForm/shared/context';
import { DefaultBuiltInComponentMap } from '../../CForm/const';
import { usePrefix } from './hooks/usePrefix';
import { testId } from '../testId';

const ControlledTableEditor = forwardRef<TableEditorModel, ControlledTableEditorProps>((props, ref) => {
  const { config, value, onChange } = props;

  const prefixCls = usePrefix();
  const isFirstValueRef = useRef(true);
  const isResetRef = useRef(false);

  const _value = toJS(value);

  // 视图层 Table Row & Cell <-> Form ObjectField & Field 的联系
  const baseTableConfig: TableCompConfig<any> = {
    ...config.tableConfig,
    // TableEditor 受控模式，需要实现 父组件 value -> 内部 table data 的数据链路
    extraConfig: {
      ...config.tableConfig.extraConfig,
      isInTableEditor: true,
      useMemoTableRow: true,
    },
    data: _value ? addRowKeyToArray(_value) : undefined,
    rowDecorator: RowDecorator,
    globalColumnConfig: {
      ...config?.tableConfig?.globalColumnConfig,
      cellDecorator: CellDecorator,
    },
  };

  const tableConfig: TableEditorConstructorOptions['tableConfig'] = tableEditor => ({
    ...baseTableConfig,
    // 受控模式下设置 originalTableData 初始值
    // 受控模式下 table 的数据完全来自于父组件的 value，所以在第一次数据更新完成时设置 originalTableData，作为初始值
    effects: options => {
      config.tableConfig?.effects?.(options);

      onTableUpdateDataEnd(({ table }) => {
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
    },
  });

  const formConfig: TableEditorConstructorOptions['formConfig'] = tableEditor => {
    const _formConfig = config?.formConfig;
    const formConfig = isFunction(_formConfig) ? _formConfig(tableEditor) : _formConfig;

    return {
      ...formConfig,
      effects(form) {
        // 执行用户配置的 effects
        formConfig?.effects?.(form);

        onFormValuesChange(form => {
          const formValues = form.values;
          // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
          const tableData = tableEditor?.table?.initTotalData;
          // form values 批量变化时，比如批量删除，不会每次触发 onChange，只在批量操作完成时触发一次
          if (tableEditor.isFormValueBatchChanging) return;
          // 当 TableEditor 被卸载又重新装载时，此时会接受到外层 Form 保存的 value
          // 在 TableEditor constructor 中执行完 createForm 后，会立刻执行该 effect，但是此时 table 还没有被创建出来，所以需要判断一下
          if (!tableData) return;
          const data = transformFormValuesToArray(toJS(formValues), tableData);
          onChange?.(data);
        });
      },
    };
  };

  // 创建 TableEditor 实例，支持外部传入
  const tableEditor = useMemo(() => {
    return (
      config.tableEditor ||
      createTableEditor({
        tableConfig,
        formConfig,
        config,
      })
    );
  }, []);

  useImperativeHandle(ref, () => tableEditor);

  const tableComp = <Table {...props} table={tableEditor.table as any} config={baseTableConfig} />;

  // 用户在 render 里使用 TableEditor 的属性时，需要在外面包一层 observer，略麻烦，所以 TableEditor 组件内部吃掉这个逻辑
  const RenderBefore = observer(_ => {
    return config.renderBefore ? config.renderBefore(tableEditor) : null;
  });

  const RenderAfter = observer(_ => {
    return config.renderAfter ? config.renderAfter(tableEditor) : null;
  });

  useFieldValidate(tableEditor);
  useFieldReset(tableEditor, isResetRef);

  // 这里必须用 useMemo 包裹，否则受控场景下，每次 props.value 变化时都会生成新的 context，导致下面使用了该 context 的组件重渲染，比如 CField
  const formContext = useMemo(() => ({ componentsMap: DefaultBuiltInComponentMap }), []);

  return (
    <CFormRegisterConfigContext.Provider value={formContext}>
      <FormProvider form={tableEditor.form}>
        <TableEditorProvider tableEditor={tableEditor}>
          <div
            className={classnames(prefixCls, props.className, {
              [`${prefixCls}-auto-scroll`]: config.tableConfig.extraConfig?.autoFixBottomScroll,
            })}
            data-testid={testId.tableEditor}
            data-cy={testId.tableEditor}
          >
            {config.renderBefore ? <RenderBefore /> : null}
            {tableComp}
            {config.renderAfter ? <RenderAfter /> : null}
          </div>
        </TableEditorProvider>
      </FormProvider>
    </CFormRegisterConfigContext.Provider>
  );
});

ControlledTableEditor.displayName = 'ControlledTableEditor';

export default ControlledTableEditor;
