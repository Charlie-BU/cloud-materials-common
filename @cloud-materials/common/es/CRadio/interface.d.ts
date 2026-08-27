import type { RadioProps, RadioGroupProps, PopoverProps } from '@arco-design/web-react';
import type { ReactNode, ReactElement } from 'react';
import type React from 'react';
import type { CTagProps } from '../CTag/interface';
/**
 * @title CRadioProps
 * @zh 继承自 arco RadioProps
 */
export interface CRadioProps<T> extends RadioProps<T> {
    /**
     * @zh 角标
     * @en tag
     */
    tag?: ReactNode;
    /**
     * @zh 角标的样式配置
     * @en tag cssproperties config
     */
    CTagProps?: Omit<CTagProps, 'shape' | 'type'>;
    /**
     * @zh Arco Popover 属性透传
     * @en Arco Popover props
     */
    arcoPopoverProps?: PopoverProps;
}
/**
 * @title CRadioGroupProps
 * @zh 用于CRadio.Group的Props，继承自 arco RadioGroupProps
 */
export interface CRadioGroupProps extends RadioGroupProps {
    /**
     * @zh 固定宽度配置
     * @en width config
     */
    widthSize?: 'small' | 'large' | 'default' | number;
    /**
     * @zh 自适应宽度配置，优先级低于widthSize属性，selfAdaptive表示单个按钮根据内部文字自适应，groupAdaptive表示单个按钮根据同组按钮宽度自适应
     * @en width config
     * @defaultValue selfAdaptive
     */
    autoWidth?: 'selfAdaptive' | 'groupAdaptive';
    /**
     * @zh 高度配置：默认是32px的高度，支持在空间有限情况下选在28px的small宽度
     * @en height config
     * @defaultValue default
     */
    heightSize?: 'default' | 'small' | number;
    /**
     * @zh 类型配置：配置单行文本模式或双行文本模式
     * @en type config
     * @defaultValue single
     */
    textLineType?: 'single' | 'double';
    /**
     * @zh 支持将icon放置在文本的右侧
     * @en iconLayout config
     * @defaultValue left
     */
    iconLayout?: 'left' | 'right';
    /**
     * @zh 支持配置水平布局。在有icon时，icon和文字默认一起居中布局，通过配置为stretch后可以左右伸展对齐。
     * @en horizontal layout
     * @defaultValue center
     */
    horizontalLayout?: 'center' | 'stretch';
    /**
     * @zh radio选中样式 (来自存储设计规范)
     * @en checked cssProperty
     */
    checkedStyle?: 'border';
    /**
     * @zh radio group的选项配置
     * @en radio group option config
     */
    options?: GroupOption[];
    /**
     * @zh 透传radio的样式props，可以直接在Group中配置Radio的样式等属性
     */
    radioProps?: Pick<RadioProps, 'style' | 'className'>;
}
/**
 * @zh 用于CRadio.Group.Options的Props
 */
export type GroupOption = string | number | {
    /**
     * @zh radio的显示文本
     * @en radio label
     */
    label: ReactNode;
    /**
     * @zh 双行单选组的第二行展示文字
     * @en radio description
     */
    description?: ReactNode;
    /**
     * @zh 图标配置
     * @en icon config
     */
    icon?: ReactNode;
    /**
     * @zh value
     * @en value
     */
    value: any;
    /**
     * @zh 禁用按钮
     * @en disable button
     */
    disabled?: boolean;
    /**
     * @zh 角标
     * @en tag
     */
    tag?: ReactNode;
    /**
     * @zh 角标的样式配置
     * @en tag cssproperties config
     */
    CTagProps?: Omit<CTagProps, 'shape' | 'type'>;
    /**
     * @zh Arco Popover 属性透传
     * @en Arco Popover props
     */
    arcoPopoverProps?: PopoverProps;
};
export interface CRadioOuterProps {
    <T>(props: CRadioProps<T> & {
        ref?: React.ForwardedRef<HTMLDivElement>;
    }): ReactElement | null;
    Group: (props: React.PropsWithChildren<CRadioGroupProps>) => JSX.Element;
    displayName: string;
}
