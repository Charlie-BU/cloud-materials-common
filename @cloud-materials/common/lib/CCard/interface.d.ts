import type { CSSProperties, ReactNode } from 'react';
import type { CardProps } from '@arco-design/web-react';
type CCardType = 'normal' | 'compact' | 'linkList' | 'default';
/**
 * @title CCardProps
 */
export interface CCardProps extends CardProps {
    style?: CSSProperties;
    className?: string | string[];
    /**
     * @zh 左上角 Icon
     */
    icon?: ReactNode;
    /**
     * @zh 卡片类型，默认值为 default，使用 arco 样式
     * @default default
     */
    type?: CCardType;
    /**
     * @zh LinkListCard 每列元素个数
     */
    cols?: number;
    /**
     * @zh LinkListCard 子元素配置
     */
    items?: CLinkListItemProps[];
}
/**
 * @title CLinkListItemProps
 */
export interface CLinkListItemProps {
    style?: CSSProperties;
    className?: string | string[];
    /**
     * @zh 标签
     */
    tag?: ReactNode;
    /**
     * @zh 内容
     */
    content?: ReactNode;
    /**
     * @zh 点击事件
     */
    onClick?: () => void;
}
export {};
