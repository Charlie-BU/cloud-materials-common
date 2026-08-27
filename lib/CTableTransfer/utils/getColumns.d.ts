import type { ColumnConfig } from '../../CTable';
import type { CTableTransferProps } from '../interface';
/**
 * @description 获取column配置
 * @param {CTableTransferProps} props
 * @return {*}
 */
export declare const getColumns: (props: CTableTransferProps) => {
    sourceColumns: ColumnConfig<any, any>[];
    targetColumns: ColumnConfig<any, any>[];
};
