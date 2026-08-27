import type React from 'react';
import type { TableEditor as TableEditorModel } from '../model/TableEditor';
import type { IFormProps, Form } from '@formily/core';
import type { IFieldProps, JSXComponent } from '@formily/react';
import type { ColumnConfig as TableColumnConfig, TableConfig as TableCompConfig, TableProps as TableCompProps } from '../../CTable/arco/types';
import type { Table, Column, Row, Cell } from '../../CTable/core/models';
import type { R, CFieldConfig } from './helper';
/** column 的编辑配置 */
type EditConfig = {
    /**field 配置, 必传. 不用指定 name, name 会自动取该列的 dataIndex */
    fieldConfig: CFieldConfig;
    /**
     * 是否可编辑，不可编辑时就不会显示编辑组件，直接显示文本
     *
     * editable 默认为 true，只要你配置了 fieldConfig 就会渲染可编辑组件，
     * 如果想根据数据配置某些单元格不可编辑，需要手动配置 editable = false
     * @default true
     */
    editable?: boolean;
};
/** editConfig 配置为函数时, options 参数包含的内容 */
type EditConfigOptions<T extends R = any> = {
    tableEditor: TableEditorModel<T>;
    table: Table<T>;
    row: Row<T>;
    rowData: T;
    cell: Cell;
    column: Column<T>;
    cellData: any;
};
/** TableEditor 列配置 */
export type TableEditorColumnConfig<DataItem extends R = any> = TableColumnConfig<DataItem> & {
    /**编辑表格中 dataIndex 必填，会同时作为该单元格对应的 Field 的 name */
    dataIndex: string;
    /** 该 column 的编辑配置，支持配置为函数 */
    editConfig?: EditConfig | ((options: EditConfigOptions<DataItem>) => EditConfig);
};
/** TableEditor Table 配置 */
export interface TableConfig<DataItemType extends R> extends Omit<TableCompConfig<DataItemType>, 'columns' | 'globalColumnConfig' | 'rowKey'> {
    columns: TableEditorColumnConfig<DataItemType>[];
    globalColumnConfig?: Partial<TableEditorColumnConfig<DataItemType>>;
}
export type RowFieldConfig = Partial<IFieldProps<JSXComponent, JSXComponent>> | ((initialValue: R, form: Form, tableEditor: TableEditorModel) => Partial<IFieldProps<JSXComponent, JSXComponent>>);
export interface FormConfig<ValueType extends R = any> extends IFormProps<ValueType> {
    /** Form 中每一行对应的 ObjectField 的配置, 可以配置为函数, 但不支持响应式 */
    rowFieldConfig?: RowFieldConfig;
}
export interface BaseTableEditorConfig<DataItemType extends R = any, ValueType extends R = any> {
    /**支持手动传入 TableEditor 实例 */
    tableEditor?: TableEditorModel<DataItemType, ValueType>;
    /**TableEditor 中的 Table 配置 */
    tableConfig: TableConfig<DataItemType>;
    /**
     * TableEditor 中的 formily 配置，支持配置为函数
     *
     * 注意: 配置为函数时 tableEditor 里的 table 实例可能还没创建完成，使用时请做好容错处理，特别是**受控模式**下
     */
    formConfig?: FormConfig<ValueType> | ((tableEditor: TableEditorModel<DataItemType, ValueType>) => FormConfig<ValueType>);
    /**
     * 在 Table 前渲染自定义内容，支持响应式
     * @param tableComp Table 组件
     * @param tableEditor tableEditor 实例
     */
    renderBefore?: (tableEditor: TableEditorModel) => React.ReactElement;
    /**
     * 在 Table 后渲染自定义内容，支持响应式
     * @param tableComp Table 组件
     * @param tableEditor tableEditor 实例
     */
    renderAfter?: (tableEditor: TableEditorModel) => React.ReactElement;
}
/** 非受控 TableEditor 的 config */
export interface UncontrolledTableEditorConfig<DataItemType extends R = any, ValueType extends R = any> extends BaseTableEditorConfig<DataItemType, ValueType> {
    /** 是否受控 */
    controlled?: false;
}
/** 受控 TableEditor 的 config */
export interface ControlledTableEditorConfig<DataItemType extends R = any, ValueType extends R = any> extends BaseTableEditorConfig<DataItemType, ValueType> {
    /** 是否受控 */
    controlled: true;
    /**TableEditor 中的 Table 配置, 受控时不支持传 fetcher */
    tableConfig: Omit<TableConfig<DataItemType>, 'fetcher'>;
}
/** TableEditorConfig 为 ControlledTableEditorConfig 和 UncontrolledTableEditorConfig 的联合类型 */
export type TableEditorConfig<DataItemType extends R = any, ValueType extends R = any> = ControlledTableEditorConfig<DataItemType, ValueType> | UncontrolledTableEditorConfig<DataItemType, ValueType>;
/** 受控组件的 props */
export type ControlledTableEditorProps<DataItemType extends R = any, ValueType extends R = any> = Omit<TableCompProps<DataItemType>, 'config' | 'table'> & {
    config: ControlledTableEditorConfig<DataItemType, ValueType>;
    value?: DataItemType[];
    onChange?: (value: DataItemType[]) => void;
};
/** 非受控组件的 props */
export type UncontrolledTableEditorProps<DataItemType extends R = any, ValueType extends R = any> = Omit<TableCompProps<DataItemType>, 'config' | 'table'> & {
    config: UncontrolledTableEditorConfig<DataItemType, ValueType>;
};
export type TableEditorProps<DataItemType extends R = any, ValueType extends R = any> = ControlledTableEditorProps<DataItemType, ValueType> | UncontrolledTableEditorProps<DataItemType, ValueType>;
export {};
