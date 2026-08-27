import React, { forwardRef, useImperativeHandle, useMemo, useEffect } from 'react';
import { FormProvider, observer } from '@formily/react';
import { setValidateLanguage } from '@formily/core';
import classnames from 'classnames';
import { TableEditorProvider } from './components/TableEditorProvider';
import type { TableEditor as TableEditorModel, TableEditorConstructorOptions } from '../model/TableEditor';
import { createTableEditor } from '../model/TableEditor/helper';
import { Table, onTableUpdateDataEnd, onFetchStart } from '../../CTable';
import type { TableEditorProps } from '../types';
import type { TableConfig as TableCompConfig } from '../../CTable/arco/types';
import { CellDecorator } from './components/CellDecorator';
import { RowDecorator } from './components/RowDecorator';
import { cloneDeep } from 'lodash-es';
import { CFormRegisterConfigContext } from '../../CForm/shared/context';
import { DefaultBuiltInComponentMap } from '../../CForm/const';
import { addRowKeyToArray } from '../utils';
import { usePrefix } from './hooks/usePrefix';
import { testId } from '../testId';
import { useCConfigContext } from '../../CConfigProvider';

const UncontrolledTableEditor = forwardRef<TableEditorModel, TableEditorProps>((props, ref) => {
  const { config, className } = props;
  const prefixCls = usePrefix();

  // 非受控模式下，需要手动设置内部 FormItem 的国际化。受控模式下被外部 Form 控制，所以不需要设置
  const { locale } = useCConfigContext();
  useEffect(() => {
    setValidateLanguage(locale.locale);
  }, [locale.locale]);

  // 视图层 Table Row & Cell <-> Form ObjectField & Field 的联系
  const baseTableConfig: TableCompConfig<any> = {
    ...config.tableConfig,
    extraConfig: {
      ...config.tableConfig.extraConfig,
      isInTableEditor: true,
    },
    // Table 组件也需要传 config.data 来支持 data 受控，同样的，这里的 data 也需要做加 rowKey 操作
    data: config.tableConfig.data ? addRowKeyToArray(config.tableConfig.data) : undefined,
    rowDecorator: RowDecorator,
    globalColumnConfig: {
      ...config?.tableConfig?.globalColumnConfig,
      cellDecorator: CellDecorator,
    },
  };

  const tableConfig: TableEditorConstructorOptions['tableConfig'] = tableEditor => ({
    ...baseTableConfig,
    // 非受控模式下设置 originalTableData 初始值
    effects: options => {
      config.tableConfig?.effects?.(options);
      let isFetching = false;
      let isFirstUpdate = true;

      onFetchStart(() => {
        isFetching = true;
      });

      // 本地模式下：没有 fetcher，table 的 data 来自 config.data，所以在 table 第一次数据更新完成时设置 originalTableData
      // 远程模式下: table 的数据在每次 fetch 时全量更新，所以在 fetch 后数据更新完成时设置 originalTableData
      // 两种 case 可以合在一起写，更简洁
      onTableUpdateDataEnd(({ table }) => {
        // 远程模式第一次请求数据和本地模式数据更新完成后会进入这个逻辑，仅执行一次
        if (isFirstUpdate) {
          // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
          tableEditor.originalTableData = cloneDeep(table.initTotalData);
          isFirstUpdate = false;

          // 如果是远程模式，此时 isFetching 为 true，需要手动重置一下
          if (isFetching) isFetching = false;
          return;
        }

        // 远程模式后续的请求，每次请求全量的数据，需要重新设置 originalTableData
        if (isFetching) {
          tableEditor.originalTableData = cloneDeep(table.initTotalData);
          isFetching = false;
        }
      });
    },
  });

  // 创建 TableEditor 实例，支持外部传入
  const tableEditor = useMemo(() => {
    return (
      config.tableEditor ||
      createTableEditor({
        tableConfig,
        formConfig: config.formConfig,
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

  const formContext = useMemo(() => ({ componentsMap: DefaultBuiltInComponentMap }), []);

  return (
    <CFormRegisterConfigContext.Provider value={formContext}>
      <FormProvider form={tableEditor.form}>
        <TableEditorProvider tableEditor={tableEditor}>
          <div
            className={classnames(prefixCls, className, {
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

UncontrolledTableEditor.displayName = 'UncontrolledTableEditor';

export default UncontrolledTableEditor;
