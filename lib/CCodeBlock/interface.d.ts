import type { CSSProperties, ReactNode } from 'react';
import type { TabsProps, SelectProps } from '@arco-design/web-react';
/**
 * @title OperationItem
 */
interface OperationItem {
    /** 组件提供的按钮 */
    type?: 'download' | 'copy';
    /** 按钮图标（自定义按钮可传） */
    render?: ReactNode;
    /** hover按钮显示文字 */
    popoverContent?: ReactNode;
    /** 按钮点击事件（自定义按钮可传） */
    onClick?: () => void | Promise<void>;
    /**
     * 下载文件名称 格式为 文件名.后缀（下载按钮可传）
     * @defaultValue 'code.txt'
     */
    fileName?: string;
}
/**
 * @title CCodeBlockProps
 */
export interface CCodeBlockProps {
    /** 代码框内容 */
    data: string | string[];
    /** 类型，可配置为 普通 | 精简 */
    /** @default normal */
    type?: 'normal' | 'simple';
    /** 代码框标题 */
    title?: ReactNode;
    /** 配置可操作按钮 */
    operationGroup?: OperationItem[];
    /** 是否展示行数 */
    showRowNumber?: boolean;
    /** Select的数据来源 */
    selectOptions?: string[];
    /** 下拉选框透传Props */
    arcoSelectProps?: Partial<SelectProps>;
    /** Tab的数据来源 */
    tabTitles?: string[];
    /** tabs透传Props */
    arcoTabsProps?: Partial<TabsProps>;
    /** 切换tab事件 */
    onChangeTab?: (key: string) => void | Promise<void>;
    /** 代码框是否处于loading状态 */
    loading?: boolean;
    /** CSS样式 */
    style?: CSSProperties;
    /** 自定义className */
    className?: string | string[];
    /** 没有数据的时候现实的元素 */
    noDataElement?: string | ReactNode;
}
export {};
