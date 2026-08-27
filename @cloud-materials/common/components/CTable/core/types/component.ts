/*
 * @Author: youjingyu
 * @Date: 2021-10-09 16:53:24
 * @LastEditTime: 2021-11-02 21:47:07
 * @LastEditors: youjingyu
 * @Description:
 */
// import { Table, Column, Row, Cell, Toolbar, ToolbarItem } from '..';
import type { Table, Column, Row, Cell, Toolbar } from '..';
import type { TableEditor as TableEditorModel } from '../../../CTableEditor/model/TableEditor';

export type R = Record<string, any>;

export type ComponentProps = R;
// eslint-disable-next-line @typescript-eslint/ban-types
export type JSXComponent<T extends R = any> = string | ((props: T) => Exclude<{}, undefined> | null);
export type ElementType = any;

export type ComponentPropsConfig<T extends R> = R | ((options: T) => T);
export type ComponentConfigArr<T extends R = any> = [JSXComponent<T>?, ComponentPropsConfig<T>?];
export type ComponentConfig<T extends R = any> = JSXComponent<T>;

export type CellProviderRenderOptions<T extends R = any, GlobalScopeType extends R = any> = {
  table: Table<T, GlobalScopeType>;
  row: Row<T>;
  rowData: T;
  cell: Cell;
  column: Column<T>;
  tableEditor: TableEditorModel<T>;
};
export type CellComponentRenderProps<T extends R = any, GlobalScopeType extends R = any> = CellProviderRenderOptions<
  T,
  GlobalScopeType
> & {
  cellData: any;
  content: any;
};
export type CellComponentPropsConfig<T extends R = any, GlobalScopeType extends R = any> = ComponentPropsConfig<
  CellComponentRenderProps<T, GlobalScopeType>
>;
export type CellComponentConfig<T extends R = any, GlobalScopeType extends R = any> = ComponentConfig<
  CellComponentRenderProps<T, GlobalScopeType>
>;

export type RowProviderRenderOptions<T extends R = any> = {
  table: Table<T>;
  row: Row<T>;
  /** CTable 组件前缀 */
  prefix: string;
};
export type RowRenderProps<T extends R = any> = RowProviderRenderOptions<T>;
export type RowComponentPropsConfig<T extends R = any> = ComponentPropsConfig<RowRenderProps<T>>;
export type RowComponentConfig<T extends R = any> = ComponentConfig<RowRenderProps<T>>;

export type ExpandRowProviderRenderProps<T extends R = any, GlobalScopeType extends R = any> = {
  table: Table<T, GlobalScopeType>;
  row: Row<T>;
  rowData: T;
};
export type ExpandRowRenderProps<T extends R = any, GlobalScopeType extends R = any> = ExpandRowProviderRenderProps<
  T,
  GlobalScopeType
>;
export type ExpandRowComponentPropsConfig<T extends R = any, GlobalScopeType extends R = any> = ComponentPropsConfig<
  ExpandRowRenderProps<T, GlobalScopeType>
>;
export type ExpandRowComponentConfig<T extends R = any, GlobalScopeType extends R = any> = ComponentConfig<
  ExpandRowRenderProps<T, GlobalScopeType>
>;

export type RowSelectionProviderRenderProps<T extends R = any> = {
  table: Table<T>;
  row: Row<T>;
  rowData: T;
};
export type RowSelectionRenderProps<T extends R = any> = RowSelectionProviderRenderProps<T>;
export type RowSelectionComponentPropsConfig<T extends R = any> = ComponentPropsConfig<RowSelectionRenderProps<T>>;
export type RowSelectionComponentConfig<T extends R = any> = ComponentConfig<RowSelectionRenderProps<T>>;

export type FilterDropdownProviderRenderProps<T extends R = any, GlobalScopeType extends R = any> = {
  table: Table<T, GlobalScopeType>;
  column: Column<T>;
};
export type FilterDropdownRenderProps<
  T extends R = any,
  GlobalScopeType extends R = any,
> = FilterDropdownProviderRenderProps<T, GlobalScopeType>;
export type FilterDropdownComponentPropsConfig<
  T extends R = any,
  GlobalScopeType extends R = any,
> = ComponentPropsConfig<FilterDropdownRenderProps<T, GlobalScopeType>>;
export type FilterDropdownComponentConfig<T extends R, GlobalScopeType extends R = any> = ComponentConfig<
  FilterDropdownRenderProps<T, GlobalScopeType>
>;

export type ToolbarProviderRenderProps<T extends R = any, GlobalScopeType extends R = any> = {
  table: Table<T, GlobalScopeType>;
  toolbar: Toolbar;
};
export type ToolbarRenderProps<T extends R = any, GlobalScopeType extends R = any> = ToolbarProviderRenderProps<
  T,
  GlobalScopeType
>;
export type ToolbarComponentConfig<T extends R = any, GlobalScopeType extends R = any> = JSXComponent<
  ToolbarRenderProps<T, GlobalScopeType>
>;

export type ToolbarItemProviderRenderProps<T extends R = any, GlobalScopeType extends R = any> = {
  table: Table<T, GlobalScopeType>;
  toolbar: Toolbar;
  tableEditor: TableEditorModel<T>;
  // toolbarItem: ToolbarItem;
};
export type ToolbarItemRenderProps<T extends R = any, GlobalScopeType extends R = any> = ToolbarItemProviderRenderProps<
  T,
  GlobalScopeType
> & {
  onChange: (value: any) => void;
  value?: any;
};
export type ToolbarItemComponentConfig<T extends R = any, GlobalScopeType extends R = any> = ComponentConfig<
  ToolbarItemRenderProps<T, GlobalScopeType>
>;
