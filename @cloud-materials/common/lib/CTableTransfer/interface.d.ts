import type { ReactNode, CSSProperties } from 'react';
import type { TransferProps } from '@arco-design/web-react';
import type { TableConfig } from '../CTable';
export type CTableProps = Omit<TableConfig<any>, 'libTableComponentProps'>;
export type SourceConfig = Omit<TableConfig<any>, 'libTableComponentProps'>;
export type TargetConfig = Omit<TableConfig<any>, 'libTableComponentProps' | 'rowKey' | 'data' | 'fetcher'>;
/**
 * @title CTableTransferProps
 */
export interface CTableTransferProps {
    /** 类名 */
    className?: string | string[];
    /**简单模式*/
    simple?: TransferProps['simple'];
    /**默认选中数据源value集合 */
    defaultSelectedValues?: string[];
    /**CTable Props透传*/
    CTableProps?: [SourceConfig, TargetConfig?];
    /**title渲染*/
    titleTexts?: CTableTransferListTitle[];
    /**搜索文案*/
    searchPlaceholder?: string;
    /**刷新数据源按钮*/
    refresh?: boolean | ReactNode;
    /**添加数据源按钮*/
    add?: boolean | ReactNode;
    /**指定数据源中的展示字段，默认为label， 搜素时以label为索引*/
    rowLabel?: string;
    /**是否展示右侧顶部删除全部按钮*/
    clear?: boolean;
    /**是否展示搜索框*/
    showSearch?: boolean;
    /**配置搜索索引字段（注：当指定的dataIndex有filter时，该配置失效）*/
    searchIndex?: string;
    /**左侧数据选择上限*/
    selectedMax?: number;
    /**触发选择上限，提示文案*/
    maxTooltip?: string;
    /**禁用穿梭框*/
    disabled?: boolean;
    /**穿梭按钮样式*/
    operationStyle?: CSSProperties;
    /**穿梭按钮文案*/
    operationTexts?: TransferProps['operationTexts'];
    /**左右两栏框的样式，通过数组为左右列表传入不同属性*/
    listStyle?: CSSProperties | CSSProperties[];
    /**预请求接口，远程模式下，获取右侧展示的数据源，默认数据合并到第一页起始位置*/
    fetchInitData?: (values: CTableTransferProps['defaultSelectedValues']) => Promise<{
        data: CTableTransferItem[];
    }>;
    /**数据项操作回调，返回数据项value集合*/
    onChange?: (keys: string[], selectedData: CTableTransferItem[]) => void;
    /**左侧添加数据源回调*/
    onAdd?: () => CTableTransferItem | void;
    /**获取数据源 */
    onDataSource?: (data: CTableTransferItem[]) => void;
}
export declare enum CTransferDirection {
    'Source' = "Source",
    'Target' = "Target"
}
/**
 * @title CTableTransferListTitle
 */
export type CTableTransferListTitle = string | ((params: {
    countTotal: number;
    countSelected?: number;
    checkbox?: ReactNode;
    refresh?: ReactNode;
    add?: ReactNode;
    delete?: ReactNode;
}) => JSX.Element);
/**
 * @title CTableTransferItem
 */
export type CTableTransferItem = {
    /**数据项value*/
    value?: string;
    /**数据项渲染时的label */
    label?: string;
    [key: string]: any;
};
