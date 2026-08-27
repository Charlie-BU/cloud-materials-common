import type { Table } from './Table';
import type { Sorter, Filter, Formatter, ComponentProps, Summary, ComponentConfig, ElementType, FilterValue, FilterDataSourceItem, SorterValue, AutoWidth, Resize } from '../types';
export interface ColumnConfig<DataItem extends Record<string, any> = any> {
    title: any;
    dataIndex?: string;
    width?: number | string;
    visible?: boolean;
    /**彻底隐藏该列，且不会出现在自定义列中 */
    hidden?: boolean;
    fixed?: 'left' | 'right';
    formatter?: string | Formatter<DataItem> | Formatter<DataItem>['formatterFn'];
    sorter?: string | Sorter | Sorter['sorterFn'];
    filter?: string | Filter<DataItem>;
    summary?: string | Summary<DataItem>;
    autoWidth?: string | AutoWidth<DataItem>;
    resize?: string | Resize;
    component?: ElementType;
    componentProps?: Record<string, any>;
    cellDecorator?: ComponentConfig;
    cellDecoratorProps?: ComponentProps;
    type?: string;
}
export type ColumnConfigWithDataIndex<DataItem extends Record<string, any> = any> = ColumnConfig<DataItem> & {
    dataIndex: string;
};
export declare const CanBeStringColumnConfig: string[];
export declare class Column<DataItem extends Record<string, any> = any> {
    initialized: boolean;
    title: string;
    width?: number | string;
    visible: boolean;
    hidden: boolean;
    dataIndex: string;
    filterVisible: boolean;
    filterValue?: FilterValue;
    sorterValue?: SorterValue;
    children?: Column<DataItem>[];
    table: Table<DataItem>;
    constructor(table: Table<DataItem>, config: ColumnConfigWithDataIndex);
    get config(): ColumnConfigWithDataIndex;
    get filter(): Filter<any, any>;
    get filterComponentType(): import("../types").FilterDropdownComponentConfig<any, any> | undefined;
    get filterComponentProps(): import("../types").FilterDropdownComponentPropsConfig<any, any> | undefined;
    get filterDecoratorType(): ComponentConfig<any> | undefined;
    get filterDecoratorProps(): import("../types").R | undefined;
    get filterIconComponentType(): ComponentConfig<any> | undefined;
    get filterIconComponentProps(): import("../types").R | undefined;
    get show(): boolean;
    get filterDataSource(): FilterDataSourceItem[] | undefined;
    private initDataFromConfig;
    private makeObservable;
    private onInit;
    setVisible(visible: boolean): void;
    setHidden(hidden: boolean): void;
    setFilterValue(value: FilterValue): void;
    setSorterValue(value: SorterValue): void;
    setFilterVisible(visible: boolean): void;
    setWidth(width: number | string): void;
    setTitle(title: string): void;
}
