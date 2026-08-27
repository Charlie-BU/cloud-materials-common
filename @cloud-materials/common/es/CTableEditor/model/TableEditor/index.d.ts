import type { Table as TableModel, TableConfig as TableModelConfig } from '../../../CTable/core/models/Table';
import type { Form as FormModel, IFormProps } from '@formily/core';
import type { R, WithRowKey, UndoType, TableEditorConfig } from '../../types';
export interface TableEditorConstructorOptions<DataItemType extends R = any, ValueType extends R = any> {
    /** 创建 Table 领域模型的配置 */
    tableConfig: TableModelConfig<DataItemType & WithRowKey> | ((tableEditor: TableEditor<DataItemType, ValueType>) => TableModelConfig<DataItemType & WithRowKey>);
    /** 创建 Form 领域模型的配置 */
    formConfig?: IFormProps<ValueType> | ((tableEditor: TableEditor<DataItemType>) => IFormProps<ValueType>);
    /**存一份 config 在实例里 */
    config: TableEditorConfig<DataItemType, ValueType>;
}
export declare class TableEditor<DataItemType extends R = any, ValueType extends R = any> {
    table: TableModel<DataItemType & WithRowKey>;
    form: FormModel<ValueType>;
    config: TableEditorConstructorOptions['config'];
    originalTableData: (DataItemType & WithRowKey)[];
    isFormValueBatchChanging: boolean;
    private actionHistory;
    private previousFormValues?;
    constructor(options: TableEditorConstructorOptions<DataItemType, ValueType>);
    /**
     * 将部分内部属性变为响应式
     */
    private makeObservable;
    /**
     * 遍历销毁 form fields 并设置锁，防止多次触发 onFormValuesChange
     */
    private clearFormFields;
    /**
     * 全量设置 table data
     * @param data
     */
    private setTableData;
    /**
     * 全量设置 form values，同时保存一份 previousFormValues
     * @param values
     */
    private setFormValues;
    /**
     * 创建 Action 并添加到 ActionHistory 中
     * @param options
     */
    private createAction;
    /**
     * 给 Table 当前的数据打快照
     */
    private makeTableDataSnapShot;
    /**
     * 从 form graph 清除字段，防止内存泄漏
     */
    private clearRowFields;
    /**
     * 封装的删除行函数-同时从 table 和 form 中删除数据
     */
    private innerDeleteRows;
    /**
     * 封装的批量增加行函数-同时从 table 和 form 中新增数据
     * @param data
     */
    private innerAddRows;
    /**获取新增的行 */
    get addedRows(): {
        key: string;
        value: R;
    }[];
    /**获取删除的行 */
    get deletedRows(): {
        key: string;
        value: R;
    }[];
    /**获取变更的行 */
    get updatedRows(): {
        key: string;
        newValue: R;
        oldValue: R;
    }[];
    /** TableEditor 当前的值是否和初始值不相同 */
    get hasChanged(): boolean;
    /** TableEditor 当前历史记录是否为空 */
    get hasActionHistory(): boolean;
    /**获取当前是否为可编辑态 */
    get editable(): boolean;
    /** TableEditor 的当前数据
     *
     * 注意: 每次获取的 data 都是一个新对象，而非同一个引用
     */
    get currentData(): (DataItemType & WithRowKey & ValueType)[];
    /**
     * 新增一行数据
     * @param data
     * @returns 新增的数据
     */
    addRow(data: DataItemType, options?: {
        /** 新增的数据是放在顶部还是底部 */
        position?: 'top' | 'bottom';
    }): DataItemType & {
        __ROW_KEY: any;
    };
    /**
     * 新增多行数据
     * @param dataList
     * @returns
     */
    addRows(dataList: DataItemType[], options?: {
        /** 新增的数据是放在顶部还是底部 */
        position?: 'top' | 'bottom';
    }): (DataItemType & {
        __ROW_KEY: any;
    })[];
    /**
     * 删除一行
     * @param rowKey 要删除的行的 rowKey
     * @returns 删除的数据
     */
    deleteRow(rowKey: string): any;
    /**
     * 批量删除行
     * @param rowKeys 要删除的行的 rowKey 数组, 可选, 不传参默认删除选中的行
     * @returns 删除的数据
     */
    deleteRows(rowKeys?: string[]): any[];
    /**
     * 撤销，可以撤销一步或全部
     * @param options
     */
    undo(options: {
        type: UndoType;
    }): void;
    /**
     * 保存修改，清空 actionHistory，将当前数据作为新的初始值
     */
    save(): void;
    /**
     * 切换整体可编辑态
     */
    switchEditable(): boolean;
    /**
     * 清除 TableEditor 操作历史 & originalTableData
     */
    clearActionHistory(): void;
}
