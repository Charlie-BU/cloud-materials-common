import type { Table as TableModel, TableConfig as TableModelConfig } from '../../../CTable/core/models/Table';
import { FetchTypes, createTable } from '../../../CTable/core/index';
import type { FetcherOptions } from '../../../CTable/core/types';
import { onTableUpdateDataEnd } from '../../../CTable/core/effects';
import { getFormFieldId } from '../../../CForm/shared/utils';
import type { Form as FormModel, IFormProps, GeneralField } from '@formily/core';
import { createForm, onFieldValueChange, onFormValidateFailed } from '@formily/core';
import type { ActionOptions } from '../Action';
import { Action } from '../Action';
import { ActionHistory } from '../ActionHistory';
import { isFunction, isEqual, cloneDeep, get, set, difference } from 'lodash-es';
import { toJS, batch, define, observable } from '@formily/reactive';
import { ROW_KEY } from '../../constants';
import {
  transformArrayToFormValues,
  transformFormValuesToArray,
  addRowKeyToArray,
  addRowKey,
  removeRowKey,
} from '../../utils';
import type { R, WithRowKey, UndoType, TableEditorConfig } from '../../types';

export interface TableEditorConstructorOptions<DataItemType extends R = any, ValueType extends R = any> {
  /** 创建 Table 领域模型的配置 */
  tableConfig:
    | TableModelConfig<DataItemType & WithRowKey>
    | ((tableEditor: TableEditor<DataItemType, ValueType>) => TableModelConfig<DataItemType & WithRowKey>);
  /** 创建 Form 领域模型的配置 */
  formConfig?: IFormProps<ValueType> | ((tableEditor: TableEditor<DataItemType>) => IFormProps<ValueType>);
  /**存一份 config 在实例里 */
  config: TableEditorConfig<DataItemType, ValueType>;
}

// 先实现 MVP 版，再往里面加东西
// table data -> form values 的数据链路说明
// 有两种情况 table data 全量更新和部分更新
// 1. 全量更新: 包括本地模式第一次装载 data、远程模式每次 fetch 请求、受控模式每次接收到 value。
// table data 全量更新必须同步到 form，所以在 model 层中覆写了 table 的 onTableUpdateDataEnd 钩子，如果数据变化则设置 formValues
// 2. 部分更新: 只有新增行和删除行两种情况
// 部分更新为什么不能也放在同一个钩子里？因为 table 的数据不准确，比如修改了某个单元格，再新增一行，这时 table data 的数据没有包含修改了的单元格
// 所以不能直接拿 table data 设置 formValues，要手动设置
export class TableEditor<DataItemType extends R = any, ValueType extends R = any> {
  // 2023-1-18 更新
  // table 和 form 在 TableEditor 实例化完成后一定会存在，但是如果在实例化过程中被访问，这时可能就是 undefined
  // 所以在 table 的 effect 里访问 form 或 form 的 effect 里访问 table 时，要小心一点
  table: TableModel<DataItemType & WithRowKey>;
  form: FormModel<ValueType>;
  config: TableEditorConstructorOptions['config'];
  originalTableData: (DataItemType & WithRowKey)[] = [];
  // form value 手动批量设置的 flag
  isFormValueBatchChanging = false;

  // 操作历史，每个 TableEditor 实例内部保有一份
  private actionHistory: ActionHistory;
  // 上次 form value
  private previousFormValues?: ValueType;

  constructor(options: TableEditorConstructorOptions<DataItemType, ValueType>) {
    const { tableConfig: _tableConfig, formConfig: _formConfig, config } = options;
    const tableConfig = isFunction(_tableConfig) ? _tableConfig(this) : _tableConfig;
    const formConfig = isFunction(_formConfig) ? _formConfig(this) : _formConfig;

    this.config = config;
    this.actionHistory = new ActionHistory();
    this.form = createForm({
      ...formConfig,
      effects: form => {
        formConfig?.effects?.(form);
        // 每次单元格值变化时，做个记录
        // 为什么路径是 *.*？因为只需要匹配 cell(Field) 的变化，而不希望匹配到 Row(ObjectField) 的变化
        // 需要在每次 formValues 全量变化时保存一份，用于对比前后值的差异
        // 因为撤销操作本身也会触发 onFieldValueChange，所以需要加个锁
        let isUndoing = false;
        onFieldValueChange('*.*', (field, form) => {
          // 撤销触发的 onFieldValueChange 不执行 createAction
          if (isUndoing || !this.previousFormValues) return;
          const fieldPath = field.path.entire as string;
          const oldValue = get(this.previousFormValues, fieldPath);
          this.createAction({
            undo: () => {
              isUndoing = true;
              field.setValue(oldValue);
              // 将 previousFormValues 设置为当前值
              set(this.previousFormValues!, fieldPath, oldValue);
              isUndoing = false;
            },
          });
          this.previousFormValues = toJS(form.values);
        });

        // 2023-06-14 更新
        // 当 tableEditor.form validate 或 submit 时，滚动到第一个报错的字段
        onFormValidateFailed(form => {
          // 筛掉所有非ValidateError类型的异常
          const validateErrors = form.errors.filter(item => item.code === 'ValidateError');
          const firstErrorAdrress = validateErrors?.[0]?.address?.toString();
          // 如果有校验报错，则移动至第一个报错的表单字段处
          // 但需要注意的是，若该表单字段处于隐藏字段，此时处于隐藏状态，那么这个操作是无效的
          if (firstErrorAdrress) {
            const dom = document.getElementById(getFormFieldId(firstErrorAdrress));
            // 用 setTimeout 是为了避免和 CForm 的滚动行为冲突，同一时间只能有一个 dom 滚动
            setTimeout(() => {
              dom?.scrollIntoView({
                behavior: 'smooth',
                // 页面顶部和底部都容易被覆盖，所以将第一个报错表单移动至页面中间
                block: 'center',
              });
            }, 0);
          }
        });
      },
    });

    // 在 TableEditor 内部处理 table 和 form 的一些逻辑，看起来也没问题，这里需要处理的逻辑最好都是 Model 层，而不是视图层的
    this.table = createTable<DataItemType & WithRowKey>({
      ...tableConfig,
      rowKey: record => record[ROW_KEY],
      // 给数据加 rowKey
      data: tableConfig.data ? addRowKeyToArray(tableConfig.data) : undefined,
      fetcher: tableConfig.fetcher
        ? (options: FetcherOptions) =>
            tableConfig.fetcher!(options).then(res => ({
              ...res,
              data: addRowKeyToArray(res.data),
            }))
        : undefined,
      // 处理 table data -> form values 的数据链路
      effects: options => {
        tableConfig?.effects?.(options);
        // 在每次 tableData 全量更新时，设置 form values
        onTableUpdateDataEnd(({ table, isFullUpdate, type }) => {
          // 2023-9-12 更新
          // 受控模式下，以下几种情况会触发 onTableUpdateDataEnd：分页、排序、筛选、value 改变
          // 其中，分页、筛选、排序只是在展示层对数据做了处理，不应该修改 formValues

          // 2023-11-06 更新
          // 不应该只考虑受控模式，在 Table 本地模式下，分页、筛选、排序都只是修改展示的数据，并没有修改真正的 formValues
          const isLocalMode = !table.shouldUseFetcher();
          if (
            (config.controlled || isLocalMode) &&
            [FetchTypes.CHANGE_PAGE, FetchTypes.SORT, FetchTypes.FILTER].includes(type)
          ) {
            return;
          }
          if (isFullUpdate) {
            // 防止在某些「特殊」的时刻、form 实例还没有被生成时报错
            if (!this.form) return;
            const currentValues = toJS(this.form.values);
            // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
            const newValues = transformArrayToFormValues(table.initTotalData);
            if (!isEqual(currentValues, newValues)) {
              // 2022-10-26 全量更新时，内部 form 清除之前存在的字段
              // 2023-11-16 更新, 不清除全部字段，而是做 diff, 清除掉在 currentValues 而不在 newValues 中的字段
              const currentRowKeys = Object.keys(currentValues);
              const newRowKeys = Object.keys(newValues);
              const rowKeysToRemove = difference(currentRowKeys, newRowKeys);
              this.clearFormFields(rowKeysToRemove);
              this.setFormValues(newValues);
            }
          }
        });
      },
    });

    this.makeObservable();
  }

  /**
   * 将部分内部属性变为响应式
   */
  private makeObservable() {
    define(this, {
      originalTableData: observable,
    });
  }

  /**
   * 遍历销毁 form fields 并设置锁，防止多次触发 onFormValuesChange
   */
  private clearFormFields(rowKeys: string[]) {
    let fieldsToClear: GeneralField[] = [];
    rowKeys.forEach(rowKey => {
      const rowField = this.form.query(rowKey).take();
      const cellField = this.form.query(`${rowKey}.*`).map();
      if (rowField) {
        fieldsToClear = [...fieldsToClear, rowField];
      }
      if (cellField.length) {
        fieldsToClear = [...fieldsToClear, ...cellField];
      }
    });
    if (!fieldsToClear.length) return;
    // 注意，这里不能直接使用 form.clearFormGraph()，因为这个方法就是循环遍历所有 field 并一一删除，会多次触发 onChange
    // 所以这里手动遍历 fields 并设置锁
    this.isFormValueBatchChanging = true;
    fieldsToClear.forEach((field, index) => {
      if (index === fieldsToClear.length - 1) {
        this.isFormValueBatchChanging = false;
      }
      field.destroy(true);
    });
  }

  /**
   * 全量设置 table data
   * @param data
   */
  private setTableData(data: (DataItemType & WithRowKey)[]) {
    this.table.setData({ totalData: data, reset: false, total: this.table.total });
  }

  /**
   * 全量设置 form values，同时保存一份 previousFormValues
   * @param values
   */
  private setFormValues(values: any) {
    this.form.setValues(values, 'overwrite');
    this.previousFormValues = cloneDeep(values);
  }

  /**
   * 创建 Action 并添加到 ActionHistory 中
   * @param options
   */
  private createAction(options: ActionOptions) {
    const action = new Action(options);
    this.actionHistory.push(action);
    if (options.immediately) {
      action.execute();
    }
  }

  /**
   * 给 Table 当前的数据打快照
   */
  private makeTableDataSnapShot() {
    // 这里需要融合 table data 和 form values，因为 table data 可能不准确
    // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
    return transformFormValuesToArray(toJS(this.form.values), this.table.initTotalData);
  }

  /**
   * 从 form graph 清除字段，防止内存泄漏
   */
  private clearRowFields(rowKeys: string[]) {
    rowKeys.forEach(rowKey => {
      // 删除一行时，从表单中删除该行、并从表单中删掉数据
      this.form.clearFormGraph(rowKey);
      this.form.clearFormGraph(`${rowKey}.*`);
    });
  }

  /**
   * 封装的删除行函数-同时从 table 和 form 中删除数据
   */
  private innerDeleteRows(rowKeys: string[]) {
    // 防止批量删除多次触发 onFormValuesChange, 设置 flag, 只在最后一个删除后触发一次
    // 移到最前面，因为 clearFormGraph 也可能会触发 onFormValuesChange
    this.isFormValueBatchChanging = true;
    // 清除 table 内的选中 keys
    this.table.clearSelectedRow();
    // 从 table 中删除掉这一行的结构
    this.table.deleteRow(rowKeys);
    // 重要: 使用 batch，避免被删除的 row 触发 onFieldValueChange
    batch(() => {
      // 从 form graph 中删除每一行。这个操作要先于 setValues，避免被删除的 row 触发 onFieldValueChange
      this.clearRowFields(rowKeys);
      // 不能直接 form setValues，这样其他行也会被重渲染，无谓的开销
      rowKeys.forEach((key, index) => {
        if (index === rowKeys.length - 1) {
          this.isFormValueBatchChanging = false;
        }
        this.form.deleteValuesIn(key);
      });
    });
  }

  /**
   * 封装的批量增加行函数-同时从 table 和 form 中新增数据
   * @param data
   */
  private innerAddRows(
    dataList: { data: DataItemType; option?: { index?: number } }[],
    options?: {
      /** 新增的数据是放在顶部还是底部 */
      position?: 'top' | 'bottom';
    },
  ) {
    const dataWithRowKey = dataList.map(d => ({ ...d, data: addRowKey(d.data) }));
    // 从 table 中增加这一行的结构
    this.table.addRows(dataWithRowKey, options);
    // 从 form 中批量新增
    this.isFormValueBatchChanging = true;

    // 2022 10-24 更新
    // 响应式的建立是使用对象作为 key 然后建立 Weakmap，如果同一个对象同时被 Table 和 Form 持有，那第二次的建立就会失败
    const cloneDeepData = cloneDeep(dataWithRowKey);
    cloneDeepData.forEach(({ data }, index) => {
      if (index === dataWithRowKey.length - 1) {
        this.isFormValueBatchChanging = false;
      }
      this.form.setValuesIn(data[ROW_KEY], data);
    });
  }

  /**获取新增的行 */
  get addedRows() {
    const formValues = toJS(this.form.values);
    // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
    const tableData = this.table.initTotalData;
    return tableData.reduce<{ key: string; value: R }[]>((acc, curr) => {
      const rowKey = curr[ROW_KEY];
      // todo: 后续优化为 map，降低复杂度
      if (!this.originalTableData.find(v => v[ROW_KEY] === rowKey)) {
        acc.push({
          key: rowKey,
          value: removeRowKey({
            ...curr,
            ...formValues[rowKey],
          }),
        });
      }
      return acc;
    }, []);
  }

  /**获取删除的行 */
  get deletedRows() {
    const formValues = toJS(this.form.values);
    return this.originalTableData.reduce<{ key: string; value: R }[]>((acc, curr) => {
      const rowValue = formValues[curr[ROW_KEY]];
      if (!rowValue) {
        acc.push({
          key: curr[ROW_KEY],
          value: removeRowKey(curr),
        });
      }
      return acc;
    }, []);
  }

  /**获取变更的行 */
  get updatedRows() {
    const formValues = toJS(this.form.values);
    return this.originalTableData.reduce<{ key: string; newValue: R; oldValue: R }[]>((acc, curr) => {
      const rowValue = formValues[curr[ROW_KEY]];
      if (!rowValue) {
        return acc;
      }
      const oldValue = removeRowKey(curr);
      const newValue = removeRowKey({ ...oldValue, ...rowValue });
      if (!isEqual(oldValue, newValue)) {
        acc.push({
          key: curr[ROW_KEY],
          newValue,
          oldValue,
        });
      }
      return acc;
    }, []);
  }

  /** TableEditor 当前的值是否和初始值不相同 */
  get hasChanged() {
    const oldValue = this.originalTableData.map(removeRowKey);
    const newValue = this.makeTableDataSnapShot().map(removeRowKey);
    return !isEqual(oldValue, newValue);
  }

  /** TableEditor 当前历史记录是否为空 */
  get hasActionHistory() {
    return Boolean(this.actionHistory.count);
  }

  /**获取当前是否为可编辑态 */
  get editable() {
    return this.form.editable;
  }

  /** TableEditor 的当前数据
   *
   * 注意: 每次获取的 data 都是一个新对象，而非同一个引用
   */
  get currentData(): (DataItemType & WithRowKey & ValueType)[] {
    return this.makeTableDataSnapShot();
  }

  /**
   * 新增一行数据
   * @param data
   * @returns 新增的数据
   */
  addRow(
    data: DataItemType,
    options?: {
      /** 新增的数据是放在顶部还是底部 */
      position?: 'top' | 'bottom';
    },
  ) {
    const dataWithRowKey = addRowKey(data);
    const rowKey = dataWithRowKey[ROW_KEY];
    this.createAction({
      immediately: true,
      execute: () => {
        this.innerAddRows([{ data: dataWithRowKey }], options);
      },
      undo: () => {
        // 新增操作的撤回即删除这一行
        this.innerDeleteRows([rowKey]);
      },
    });
    return dataWithRowKey;
  }

  /**
   * 新增多行数据
   * @param dataList
   * @returns
   */
  addRows(
    dataList: DataItemType[],
    options?: {
      /** 新增的数据是放在顶部还是底部 */
      position?: 'top' | 'bottom';
    },
  ) {
    const dataListWithRowKey = addRowKeyToArray(dataList);
    const rowKeys = dataListWithRowKey.map(d => d[ROW_KEY]);
    this.createAction({
      immediately: true,
      execute: () => {
        this.innerAddRows(
          dataListWithRowKey.map(d => ({ data: d })),
          options,
        );
      },
      undo: () => {
        // 新增操作的撤回即删除这一行
        this.innerDeleteRows(rowKeys);
      },
    });
    return dataListWithRowKey;
  }

  /**
   * 删除一行
   * @param rowKey 要删除的行的 rowKey
   * @returns 删除的数据
   */
  deleteRow(rowKey: string) {
    const row = this.table.getRowByRowKey(rowKey)!;
    // 需要同时使用 table row 和 form field 的数据
    const rowData = {
      ...toJS(row.data),
      ...toJS(this.form.values[rowKey]),
    };
    const deletedData = {
      data: rowData,
      option: { index: row.index },
    };
    this.createAction({
      immediately: true,
      execute: () => {
        this.innerDeleteRows([rowKey]);
      },
      undo: () => {
        // 批量新增，不全量修改 tableData，会有很大的性能开销
        this.innerAddRows([deletedData]);
      },
    });
    return rowData;
  }

  /**
   * 批量删除行
   * @param rowKeys 要删除的行的 rowKey 数组, 可选, 不传参默认删除选中的行
   * @returns 删除的数据
   */
  deleteRows(rowKeys?: string[]) {
    const _rowKeys = rowKeys ?? this.table.selectedRowKeys;
    const deletedData = _rowKeys.map(rowKey => {
      const row = this.table.getRowByRowKey(rowKey)!;
      // 需要同时使用 table row 和 form field 的数据
      const rowData = {
        ...toJS(row.data),
        ...toJS(this.form.values[rowKey]),
      };
      return {
        data: rowData,
        option: { index: row.index },
      };
    });
    this.createAction({
      immediately: true,
      execute: () => {
        this.innerDeleteRows(_rowKeys);
      },
      undo: () => {
        // 批量新增，不全量修改 tableData，会有很大的性能开销
        this.innerAddRows(deletedData);
      },
    });
    return deletedData.map(d => d.data);
  }

  /**
   * 撤销，可以撤销一步或全部
   * @param options
   */
  undo(options: { type: UndoType }) {
    if (options.type === 'LastStep') {
      const action = this.actionHistory.pop();
      action?.undo();
    } else if (options.type === 'AllSteps') {
      if (this.hasChanged) {
        this.actionHistory.clear();
        // todo: 看看这里有没有性能优化的空间
        this.setTableData(this.originalTableData);
      }
    }
  }

  /**
   * 保存修改，清空 actionHistory，将当前数据作为新的初始值
   */
  save() {
    this.originalTableData = this.makeTableDataSnapShot();
    this.actionHistory.clear();
  }

  /**
   * 切换整体可编辑态
   */
  switchEditable() {
    return (this.form.editable = !this.form.editable);
  }

  /**
   * 清除 TableEditor 操作历史 & originalTableData
   */
  clearActionHistory() {
    this.actionHistory.clear();
  }
}
