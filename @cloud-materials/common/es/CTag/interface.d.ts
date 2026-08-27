import type React from 'react';
import type { ButtonProps, TagProps as ArcoTagProps } from '@arco-design/web-react';
import type { CCollapseProps, CCopyProps, CEllipsisProps } from '..';
import type { ARCO_COLORS, COLORS, LINEAR_COLORS, TYPES } from './constant';
export type Color = (typeof COLORS)[number];
export type ArcoColor = (typeof ARCO_COLORS)[number];
export type LinearColor = (typeof LINEAR_COLORS)[number];
export type Type = (typeof TYPES)[number];
/**
 * @title CTagProps
 */
export interface CTagProps extends Omit<ArcoTagProps, 'color' | 'prefix' | 'size'> {
    /**
     * @zh 标签颜色
     * @en Color of Tag
     * @description 支持内置颜色：blue，green，pink，darkblue，aquamarine，brown，gray
     * @description 支持 Arco 内置颜色：red，orangered，orange，gold，lime，cyan，arcoblue，purple，pinkpurple，magenta
     * @description `shape`为`"mark" | "default"`时支持渐变色：linearRed，linearGold，linearOrangered
     */
    color?: Color | ArcoColor | LinearColor | string;
    /**
     * @zh 自动溢出省略
     * @en Auto ellipsis
     */
    cEllipsisProps?: Omit<CEllipsisProps, 'showCopy' | 'cCopyProps' | 'copyPosition' | 'content' | 'children'>;
    /**
     * @zh 标签最大宽度，设置为 "100%" 时根据容器计算宽度
     * @en Max width of Tag
     * @defaultValue 160
     */
    maxWidth?: number | string;
    /**
     * @zh 前缀
     * @en Prefix of Tag
     */
    prefix?: React.ReactNode;
    /**
     * @zh 尺寸，支持 large，medium，small
     * @en Size of Tag, support large, medium, small
     * @defaultValue "medium"
     */
    size?: 'large' | 'medium' | 'small';
    /**
     * @zh 形状，分为矩形圆角（default），全圆角（round），异形标签（mark）
     * @en Shape of Tag, divided into rectangular rounded (default) , full rounded corners (round), special-shaped labels (mark)
     * @defaultValue "default"
     */
    shape?: 'default' | 'round' | 'mark';
    /**
     * @zh Tag 颜色填充方式，分为全部填充（default），半透明（bordered），线性（outline），文字（text-dot），纯文字（text）；type="bordered" 情况下，bordered 属性不生效
     * @en Type of Tag, divided into fill all (default), translucent (bordered), linear (outline), text (text); “bordered“ attribute does not take effect when type="bordered"
     * @defaultValue "default"
     */
    type?: Type;
}
/**
 * @title CTagsProps
 */
export interface CTagsProps extends Pick<CTagProps, 'size' | 'shape' | 'type'> {
    /**
     * @zh 子元素
     * @en children
     */
    children?: React.ReactNode[];
    /**
     * @zh 数据源
     * @en Data source
     */
    data?: string[] | PrefixDataProps[];
    /**
     * @zh class 属性
     * @en Class attributes
     */
    className?: string | string[];
    /**
     * @zh 展开收起属性
     * @en Collapse props
     */
    cCollapseProps?: Pick<CCollapseProps<any>, 'arcoPopoverProps' | 'className' | 'defaultExpanded' | 'showRows' | 'extraRender' | 'maxRows' | 'mode' | 'onExpandedChange' | 'operateRender' | 'style'>;
    /**
     * @zh 开启复制功能，开启后 cCollapseProps.mode 默认设置为 "popover"
     * @en Copyable
     */
    copyable?: boolean | CopyableProps;
    /**
     * @zh 最多展示多少条数据，没有设置平铺展示
     * @en The maximum number of displayed data
     */
    maxShowCount?: number;
    /**
     * @zh 子元素渲染方式，会覆盖传入的 size，shape，type 属性
     * @en Sub-element rendering method
     */
    renderItem?: (item: string | PrefixDataProps, index: number) => React.ReactNode;
    /**
     * @zh 样式
     */
    style?: React.CSSProperties;
}
/**
 * @title PrefixDataProps
 */
export interface PrefixDataProps {
    /**
     * @zh 前缀
     * @en Prefix
     */
    prefix: string;
    /**
     * @zh 标签内容
     * @en Tag content
     */
    value: string;
}
/**
 * @title CopyableProps
 */
export interface CopyableProps extends Omit<CCopyProps, 'text'> {
    /**
     * @zh 复制内容分隔符
     * @defaultValue "\n"
     */
    separator?: string;
    /**
     * @zh 复制按钮文案
     * @defaultValue "复制"
     */
    buttonText?: string;
    /**
     * @zh 复制按钮文案 Props
     */
    arcoButtonProps?: ButtonProps;
}
