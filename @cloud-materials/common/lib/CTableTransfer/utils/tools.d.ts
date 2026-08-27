import type { CTableTransferItem, CTableTransferProps } from '../interface';
/**
 * @description 默认选择的rowKey
 * @param {CTableTransferProps<any>} { rowKey }
 */
export declare const defaultRowKey: (props: CTableTransferProps) => import("../../CTable").RowKeyConfig<any>;
export declare const genTransferRowKey: (props: CTableTransferProps) => (data: CTableTransferItem[]) => {
    _c_transfer_row_key: string;
    value?: string | undefined;
    label?: string | undefined;
}[];
/**
 * @description 是否远程模式，来源于table.isRemoteMode, 在左侧table config中无法使用table.isRemoteMode判断，单独摘出来
 * @param {CTableTransferProps<any>} props
 * @return {*}
 */
export declare const isRemoteMode: (props: CTableTransferProps) => boolean;
/**
 * @description 获取配置模式：远程模式、数据留存模式、简单模式
 * @param {CTableTransferProps<any>} props
 * @return {*}
 */
export declare const mode: (props: CTableTransferProps) => {
    remote: boolean;
    simple: boolean | {
        retainSelectedItems?: boolean | undefined;
    };
    retain: boolean;
    table: boolean;
};
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export declare const DataCy: {
    deleteAll: string;
    deleteItem: string;
    refresh: string;
    add: string;
    sourceOperationButton: string;
    targetOperationButton: string;
    selectAll: string;
};
