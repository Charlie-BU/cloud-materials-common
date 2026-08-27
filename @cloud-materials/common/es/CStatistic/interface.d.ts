import type { StatisticProps, CountdownProps } from '@arco-design/web-react';
import type { CSSProperties, ReactNode } from 'react';
/**
 * @title CStatisticProps
 */
export interface CStatisticProps extends Omit<StatisticProps, 'extra' | 'style' | 'className'> {
    style?: CSSProperties;
    className?: string | string[];
    /**
     * @zh 单位
     */
    unit?: string;
    /**
     * @zh 描述
     */
    describe?: ReactNode;
    /**
     * @zh  当没有数据或者数据 loading 时的占位符
     * @default  -
     */
    placeholder?: ReactNode;
    /**
     * @zh  数值展示的类型
     * @default default
     */
    type?: 'default' | 'link';
    /**
     * @zh 是否禁用； 只对 type 为 'link' 有用
     * @default false
     */
    disabled?: boolean;
    /**
     * @zh 边框设置
     * @default true
     */
    border?: boolean;
    /**
     * @zh  type 为 'link' 的点击事件
     */
    onClick?: () => void;
}
/**
 * @title CCountdownProps
 */
export interface CCountdownProps extends Omit<CountdownProps, 'extra' | 'style' | 'className'> {
    style?: CSSProperties;
    className?: string | string[];
    /**
     * @zh 单位
     */
    unit?: string;
    /**
     * @zh 在数值下的描述
     */
    describe?: ReactNode;
    /**
     * @zh 前缀
     */
    prefix?: ReactNode;
    /**
     * @zh 后缀
     */
    suffix?: ReactNode;
    /**
     * @zh 边框设置
     * @default true
     */
    border?: boolean;
}
/**
 * @title CStatisticListItemProps
 */
export interface CStatisticListItemProps extends CStatisticProps {
    /**
     * @zh 是否是倒计时
     */
    isCountdown?: boolean;
}
/**
 * @title CStatisticListCountdownItemProps
 */
export interface CStatisticListCountdownItemProps extends CCountdownProps {
    /**
     * @zh 是否是倒计时
     */
    isCountdown?: boolean;
}
/**
 * @title CStatisticListProps
 */
export interface CStatisticListProps {
    style?: CSSProperties;
    className?: string | string[];
    /**
     * @zh 列表标题
     */
    title?: ReactNode;
    /**
     * @zh 数据列表
     */
    list?: (CStatisticListItemProps | CStatisticListCountdownItemProps)[];
    /**
     * @zh 子元素
     */
    children?: ReactNode;
}
