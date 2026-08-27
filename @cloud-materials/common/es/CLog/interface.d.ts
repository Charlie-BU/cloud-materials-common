import { CSSProperties } from 'react';
import type { CStatusProps } from '../CStatus/interface';
import type { COperationMenuProps, Operation } from '../COperationMenu/interface';
import type { ListProps } from '@arco-design/web-react/es/List';
export declare enum DefaultOperationEnum {
    'theme' = "theme",
    'download' = "download",
    'fullScreen' = "fullScreen"
}
export type DefaultOperationItem = {
    type: string;
};
export type OperationItem = Operation | DefaultOperationItem;
export type LogDataObjectItem = {
    Log: string;
    Time?: string | number;
    [key: string]: any;
};
export type LogDataItem = LogDataObjectItem | string;
export type ListInLogProps = Partial<Pick<ListProps, 'offsetBottom' | 'throttleDelay' | 'scrollLoading' | 'virtualListProps' | 'onReachBottom' | 'dataSource' | 'onListScroll'>>;
/**
 * @title CLogProps
 */
export interface CLogProps extends Pick<ListProps, 'offsetBottom' | 'throttleDelay' | 'scrollLoading' | 'virtualListProps' | 'onReachBottom'> {
    style?: CSSProperties;
    className?: string | string[];
    /**
     * @zh 展示最新的日志, 本地模式适用
     * @defaultValue false
     */
    showLatest?: boolean;
    /**
     * @zh 默认主题色
     * @defaultValue white
     */
    defaultTheme?: 'white' | 'black';
    /** 标题 title */
    title?: React.ReactNode;
    /** 状态展示 */
    cStatusProps?: CStatusProps;
    /**
     * @zh 顶部额外自定义渲染内容
     */
    extraHeaderContent?: React.ReactNode;
    /** 是否展示序列号 */
    showSerialNumber?: boolean;
    /** 序列号类型: 时间/行号 默认为行号 */
    serialNumberType?: 'number' | 'time';
    /** 序列号格式化 */
    formatSerial?: (val: string | number) => string;
    /** 是否展示搜索 */
    showSearch?: boolean;
    /** 操作按钮, 默认外露一个操作 */
    operationConfig?: {
        displayNum?: number;
        operations?: OperationItem[];
    };
    /** 自定义操作按钮, 传递内置操作按钮 */
    renderOperation?: (defaultOperations?: COperationMenuProps) => React.ReactNode;
    /** 首次加载数据 */
    loading?: boolean;
    /** 无数据时候的展示元素 */
    noDataElement?: React.ReactNode;
    /** 本地数据 */
    dataSource?: {
        total: number;
        data: LogDataItem[];
    };
    /** 获取日志数据 */
    fetcher?: (currentPage: number) => Promise<{
        total: number;
        data: LogDataItem[];
    }>;
    /**
     * @zh 自定义渲染
     */
    renderItem?: (item: LogDataItem, index: number) => React.ReactNode;
    /**
     * @zh 下载文件名
     * @defaultValue log.txt
     */
    fileName?: string;
    /** 默认页码 */
    defaultPage?: number;
    /** 自定义下载的方法, 内置的下载方法只下载已加载了的数据 */
    handleDownload?: () => void;
    /** 单行点击回调 */
    onClickItem?: (val: LogDataItem) => void;
    /** 支持外部传入搜索数据 */
    searchText?: string;
    /** 自定义 footer */
    renderFooter?: () => React.ReactNode;
}
