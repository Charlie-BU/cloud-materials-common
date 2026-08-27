import type { Cell, Row } from '../../core';
export declare const getTableDataCy: () => {
    dataCy: string;
};
export declare const getRowDataCy: (row: Row, prefix: string) => {
    dataCy: string;
    dataCyIdx: string;
};
export declare const getCellDataCy: (cell: Cell, prefix: string) => {
    dataCy: string;
    dataCyIdx: string;
};
