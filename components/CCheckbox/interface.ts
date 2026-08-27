import type { CheckboxProps, PopoverProps, CheckboxGroupProps } from '@arco-design/web-react';
import type { ReactNode, ReactElement, ReactText } from 'react';
import type React from 'react';
import type { CTagProps } from '../CTag/interface';

/**
 * @title CCheckboxProps
 * @zh 继承自 arco CheckboxProps
 */
export interface CCheckboxProps extends CheckboxProps {
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
 * @title CCheckboxGroupProps
 * @zh 用于CCheckbox.Group的Props，继承自 arco CheckboxGroupProps
 */
export interface CCheckboxGroupProps<T extends ReactText> extends CheckboxGroupProps<T> {
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
   * @zh 支持配置水平布局。在有icon时，icon和文字默认一起居中布局，通过配置为stretch后可以左右伸展对齐。
   * @en horizontal layout
   * @defaultValue center
   */
  horizontalLayout?: 'center' | 'stretch';
  /**
   * @zh 支持将icon防止在文本的右侧
   * @en iconLayout config
   * @defaultValue left
   */
  iconLayout?: 'left' | 'right';
  /**
   * @zh checkbox group的选项配置
   * @en checkbox group option config
   */
  options?: CCheckboxGroupOption<T>[];
  /**
   * @zh 透传checkbox的props，可以直接在Group中配置Checkbox的样式等属性
   */
  checkboxProps?: Pick<CheckboxProps, 'style' | 'className'>;
}

/**
 * @zh 用于CCheckbox.Group.Options的Props。扩展自CheckboxGroupProps.options
 */
export type CCheckboxGroupOption<T> =
  | T
  | {
      /**
       * @zh checkbox的显示文本
       * @en checkbox label
       */
      label: ReactNode;
      /**
       * @zh 双行单选组的第二行展示文字
       * @en checkbox description
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
      value: T;
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

export interface CCheckboxOuterProps {
  (props: CCheckboxProps & { ref?: React.ForwardedRef<HTMLDivElement> }): ReactElement | null;
  Group: <T extends ReactText>(props: React.PropsWithChildren<CCheckboxGroupProps<T>>) => JSX.Element;
  displayName: string;
}
