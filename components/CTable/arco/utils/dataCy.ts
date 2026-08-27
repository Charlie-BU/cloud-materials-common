import type { Cell, Row } from '../../core';
import { filterDataKey } from '../../utils';

export const getTableDataCy = () => ({
  dataCy: 'table-container',
});

export const getRowDataCy = (row: Row, prefix: string) => {
  return {
    dataCy: `${prefix}-row`,
    dataCyIdx: `${prefix}-row-idx-${filterDataKey(row.index.toString())}`,
  };
};

export const getCellDataCy = (cell: Cell, prefix: string) => {
  const columnIndex = filterDataKey(cell.column.config.dataIndex);
  const rowIndex = filterDataKey(cell.row.index.toString());
  return {
    dataCy: `${prefix}-row-${columnIndex}`,
    dataCyIdx: `${prefix}-row-idx-${rowIndex}-${columnIndex}`,
  };
};
