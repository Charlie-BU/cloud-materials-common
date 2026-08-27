import React from 'react';
import type { R, TableProps, TableConfig } from '../../../../CTable';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export declare const selectedTableTestId: {
    container: string;
    table: string;
};
export interface PreSelectedTableProps<T extends R = any> extends Omit<TableConfig<T>, 'rowKey' | 'fetcher'> {
    /**
     * @default true
     * @description 是否展示批量配置，包括移出按钮和默认实例变更数量提示
     */
    showBatchConfig?: boolean;
    /**
     * @default 1
     * @description 表格的最小数据数量，当展示移出按钮时，数据数量达到该数量时，按钮自动禁用
     */
    minCount?: number;
    /** 自定义表格上方信息提示 */
    customTip?: string | ((value?: T[]) => string);
    /** 每行数据的key */
    rowKey: string;
    /** table除config的其它属性 */
    tableProps?: Omit<TableProps<T>, 'config'>;
    /** 组件样式 */
    style?: React.CSSProperties;
    /** 组件类名 */
    className?: string | string[];
    /** 组件操作禁用状态 */
    disabled?: boolean;
    onChange?: (value: T[]) => void;
    value?: T[];
}
export declare const PreSelectedTable: React.ForwardRefExoticComponent<Partial<PreSelectedTableProps<any> & {
    children?: React.ReactNode;
}> & React.RefAttributes<unknown>>;
export default PreSelectedTable;
