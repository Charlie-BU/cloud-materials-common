import type { Table } from './Table';
import { Cell } from './Cell';
export declare class Row<T extends Record<string, any> = any> {
    key: string;
    index: number;
    pageNumber: number;
    initialized: boolean;
    isExpanded: boolean;
    isEditing: boolean;
    innerState: {
        selectable?: boolean;
        expandable?: boolean;
    };
    data: T;
    cells: Cell[];
    table: Table;
    constructor(options: {
        table: Table;
        rowData: T;
        rowKey: string;
        pageNumber: number;
        offsetIndexInAllData: number;
        expanded: boolean;
    });
    get expandRow(): import("../types").ExpandRow<any, any>;
    get rowSelection(): import("../types").RowSelection<any, any>;
    get isSelected(): boolean;
    get selectable(): boolean;
    get expandable(): boolean;
    get componentType(): import("../types").RowComponentConfig<any> | undefined;
    get componentProps(): import("../types").RowComponentPropsConfig<any> | undefined;
    get decoratorType(): import("../types").ComponentConfig<any> | undefined;
    get decoratorProps(): import("../types").R | undefined;
    get expandRowComponentType(): import("../types").ExpandRowComponentConfig<any, any> | undefined;
    get expandRowComponentProps(): import("../types").ExpandRowComponentPropsConfig<any, any> | undefined;
    get expandRowDecoratorType(): import("../types").ComponentConfig<any> | undefined;
    get expandRowDecoratorProps(): import("../types").R | undefined;
    get rowSelectionComponentType(): import("../types").RowSelectionComponentConfig<any> | undefined;
    get rowSelectionComponentProps(): import("../types").RowSelectionComponentPropsConfig<any> | undefined;
    get rowSelectionDecoratorType(): import("../types").ComponentConfig<any> | undefined;
    get rowSelectionDecoratorProps(): import("../types").R | undefined;
    private initDataFromConfig;
    private makeObservable;
    private onInit;
    setData(rowData?: Partial<T>): void;
    setSelect(isSelected: boolean, options?: {
        triggerSelectRowEvent?: boolean;
        overwrite?: boolean;
    }): void;
    setSelectable(selectable: boolean): void;
    setExpand(isExpanded: boolean): void;
    setExpandable(expandable: boolean): void;
    getCellByDataIndex(dataIndex: string): Cell | undefined;
}
