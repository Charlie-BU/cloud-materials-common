import type { Table } from './Table';
import type { Column } from './Column';
import type { Row } from './Row';
export declare class Cell {
    loading: boolean;
    isEditing: boolean;
    table: Table;
    column: Column;
    row: Row;
    constructor(table: Table, column: Column, row: Row);
    get component(): any;
    get componentProps(): Record<string, any> | undefined;
    get decoratorType(): import("..").ComponentConfig<any> | undefined;
    get decoratorProps(): import("..").R | undefined;
    get data(): any;
    set data(value: any);
    setData(value: any): void;
    private makeObservable;
    showDetail(): void;
}
