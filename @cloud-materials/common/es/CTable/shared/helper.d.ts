import type { Table, Cell, Column } from '../core';
export declare const getCellData: (rowData: any, dataIndex: string) => any;
export declare const setCellData: (rowData: any, dataIndex: string, value: any) => void;
export declare const formatCellData: (options: {
    table: Table;
    column: Column;
    rowData?: any;
    cell?: Cell | undefined;
    cellData: any;
}) => any;
