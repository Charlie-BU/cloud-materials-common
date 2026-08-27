import React from 'react';
import type { TableModel } from '../CTable';
import type { CTableTransferProps } from './interface';
declare const CTableTransfer: React.ForwardRefExoticComponent<CTableTransferProps & React.RefAttributes<{
    sourceTable: TableModel<any>;
    targetTable: TableModel<any>;
}>> & {
    Delete: ({ item }: {
        item: import("./interface").CTableTransferItem;
    }) => JSX.Element;
};
export default CTableTransfer;
