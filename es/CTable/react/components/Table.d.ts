import React from 'react';
import type { Table } from '../../core';
export declare const TableContext: React.Context<Table<any, any>>;
export type TableProviderProps = {
    table: Table;
};
export declare const TableProvider: React.FC<TableProviderProps>;
