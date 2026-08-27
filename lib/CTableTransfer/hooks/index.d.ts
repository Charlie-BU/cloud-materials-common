import type { CTableTransferProps } from '../interface';
import { CTransferDirection } from '../interface';
export declare const useCTransfer: (props: CTableTransferProps) => {
    sourceTable: import("../../CTable").TableModel<any, any>;
    targetTable: import("../../CTable").TableModel<any, any>;
    onMove: (source: CTransferDirection) => void;
};
