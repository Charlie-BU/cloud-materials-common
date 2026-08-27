import React from 'react';
import type { TableModel } from '../../CTable';
import type { CTableTransferProps } from '../interface';
import { CTransferDirection } from '../interface';
interface OperationProps {
    sourceTable: TableModel<any>;
    targetTable: TableModel<any>;
    cTransferProps: CTableTransferProps;
    onMove: (to: CTransferDirection) => void;
}
declare const _default: React.MemoExoticComponent<import("@formily/react").ReactFC<OperationProps>>;
export default _default;
