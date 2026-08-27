import type { CSSProperties, ReactNode } from 'react';
import type { ColProps, RowProps, PopoverProps } from '@arco-design/web-react';
import type { CEllipsisProps } from '../CEllipsis/interface';
import type { builtInMap } from './constant';
import type { DefineBuiltInHybridListType } from '../_factory/builtInComponent';
import type { BreakpointEnum } from '../hooks/useBreakpoint';
/**
 * 左右结构、上下结构。
 * @defaultValue horizon
 */
type Layout = 'horizon' | 'vertical';
/**
 * InfoSection 影响布局的属性
 */
export type CInfoSectionLayout = {
    layout: Layout | Partial<Record<BreakpointEnum, Layout>>;
    colNumber: number | Partial<Record<BreakpointEnum, number>>;
    direction: ('row' | 'column') | Record<BreakpointEnum, 'row' | 'column'>;
};
/**
 * 普通数据类型的 InfoSection 布局
 */
export type CInfoSectionLayoutNormalized = {
    layout: Layout;
    colNumber: number;
    direction: 'row' | 'column';
};
/**
 * @title ItemProps
 */
export interface ItemProps {
    /** 类名 */
    className?: string;
    /** 标签 */
    label?: ReactNode;
    /** 标签对应的内容 支持通用内置组件 */
    content?: DefineBuiltInHybridListType<typeof builtInMap>;
    /** k-v总样式 */
    itemStyle?: CSSProperties;
    /** 标签样式 */
    labelStyle?: CSSProperties;
    /** 内容样式 */
    contentStyle?: CSSProperties;
    /** 控制 label 宽度，栅格布局下不生效 */
    labelWidth?: number | 'normal' | 'small';
    /**
     * 左右或上下结构
     * @defaultValue horizon
     */
    layout?: CInfoSectionLayout['layout'];
    /** 透传内容省略参数，生效需要开启 enableEllipsis */
    cEllipsisProps?: Omit<CEllipsisProps, 'content'>;
    /**
     * 是否开启内容省略
     * @defaultValue false
     */
    enableEllipsis?: boolean;
    /**
     * 当 Content 的内容为空时默认展示的元素
     * @defaultValue -
     */
    defaultEmptyContent?: ReactNode;
    /** 列序号 */
    columnNum?: number;
    /**
     * 动态计算标签宽度
     * @defaultValue true
     */
    auto?: boolean;
    /** 子元素 */
    children?: ReactNode;
    /**
     * 是否隐藏该项，不占位
     * @defaultValue false
     */
    hidden?: boolean;
    /**
     * 是否可见，占位
     * @defaultValue true
     */
    visible?: boolean;
    /** 标签栅格，透传arco props */
    arcoLabelColProps?: ColProps;
    /** 内容栅格，透传arco props */
    arcoContentColProps?: ColProps;
    /** 包裹标签与内容栅格，透传arco props */
    arcoRowProps?: RowProps;
    /** content右侧内容，包含内置组件 */
    extraContent?: DefineBuiltInHybridListType<typeof builtInMap>;
    /** 控制占位数，在 direction 为 row 时生效 */
    span?: number;
}
/**
 * @title CInfoSectionProps
 */
export interface CInfoSectionProps extends Pick<ItemProps, 'layout' | 'itemStyle' | 'labelStyle' | 'contentStyle' | 'labelWidth' | 'auto' | 'children' | 'className' | 'arcoLabelColProps' | 'arcoContentColProps' | 'arcoRowProps' | 'hidden' | 'visible'> {
    /**
     * 是否自适应
     * @defaultValue true
     */
    responsive?: boolean;
    /**
     * 整体布局
     */
    layout?: CInfoSectionLayout['layout'];
    /**
     *  列数，支持一排一、一排二、一排三、一排四。
     * @defaultValue 2
     */
    colNumber?: CInfoSectionLayout['colNumber'];
    /** 支持自定义标题 */
    title?: ReactNode;
    /** 整个容器区样式对象，可覆盖原容器样式 */
    style?: CSSProperties;
    /** 内容区样式对象，可覆盖原内容区样式 */
    sectionStyle?: CSSProperties;
    /** 不包含标题的区域样式 */
    wrapperStyle?: CSSProperties;
    /**
     * 定义 infoItemList 按竖或是横排列
     * @defaultValue row
     */
    direction?: CInfoSectionLayout['direction'];
    /** 模块编辑，尽量不要用这个，用moduleEditor */
    onModuleEditorClick?: ModuleEditorProps['onClick'];
    /** 模块编辑 */
    moduleEditor?: ModuleEditorProps;
    /**
     * 无边距模式
     * @defaultValue false
     */
    noMargin?: boolean;
}
/**
 * @title ModuleEditorProps
 */
interface ModuleEditorProps {
    /**
     *  是否展示ModuleEditor组件
     * @defaultValue true
     */
    showModuleEditor?: boolean;
    /**
     * 定义点击事件
     */
    onClick?: (event?: any) => void;
    /**
     * disable状态
     * @defaultValue false
     */
    disable?: boolean;
    /**
     * 自定义disable文本，不传则展示默认文案
     */
    disableContent?: ReactNode;
    /**
     * 传入popoverProps才会展示popover
     */
    popoverProps?: PopoverProps;
}
/**
 * @title CInfoSectionData
 */
export interface CInfoSectionData extends Pick<CInfoSectionProps, 'onModuleEditorClick' | 'moduleEditor' | 'title' | 'layout' | 'colNumber' | 'labelWidth' | 'hidden' | 'visible' | 'className'> {
    /** 支持自动分割或者手动分割 */
    infoItemList?: ItemProps[];
    /** 分割好的数据 */
    splitItemList?: ItemProps[][];
}
/**
 * @title CInfoSectionListProps
 */
export interface CInfoSectionListProps extends Omit<CInfoSectionProps, 'title' | 'children' | 'editor' | 'onModuleEditorClick' | 'moduleEditor'> {
    /** 传入列表数据渲染 */
    listData?: CInfoSectionData[];
}
export {};
