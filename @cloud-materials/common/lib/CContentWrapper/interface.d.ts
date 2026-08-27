import type { ButtonProps } from '@arco-design/web-react';
import type { CSSProperties, ReactNode } from 'react';
export interface OperationItem {
    icon: ReactNode;
    name: string;
    onClick: () => void;
}
/**
 * @title CContentWrapperProps
 */
export interface CContentWrapperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'className' | 'children'> {
    /** 标题（设置为 null 时，不显示标题） */
    title?: ReactNode;
    /** 标题的提示框*/
    tooltip?: ReactNode;
    /** 返回操作 */
    onBack?: () => void;
    /** 标题右侧功能区域，该参数渲染为固定样式*/
    operationList?: OperationItem[];
    /** 标题右侧功能区域，该参数自定义渲染样式 */
    customOperation?: ReactNode;
    /** 隐藏 header */
    hideHeader?: boolean;
    /**
     * @zh 全屏模式
     * @defaultValue normal
     */
    layout?: 'normal' | 'fullPage';
    /**
     * 自定义渲染 normal 布局下的右侧内容
     */
    renderContent?: ((content: {
        header: React.ReactNode;
        body: React.ReactNode;
    }) => React.ReactNode) | false;
    /** 内容组件 */
    content?: ReactNode;
    children?: ReactNode;
    /** 左侧content占位，如果有该参数，渲染为两列布局，否则渲染为整页布局*/
    leftContent?: ReactNode;
    /** 底部组件(不传入leftContent时支持配置footer) */
    footer?: ReactNode;
    /** 底部按钮位置 */
    footerBtnPosition?: 'left' | 'right';
    /** 底部按钮在右侧时，左侧传入的组件 */
    footerContent?: ReactNode;
    /** 取消事件 */
    onCancel?: () => void;
    /** 取消文字 */
    cancelText?: string;
    /** 取消按钮arcoProps */
    cancelButtonProps?: ButtonProps;
    /** 确认事件 */
    onSubmit?: () => Promise<any> | any;
    /** 确认文字 */
    submitText?: string;
    /** 确认按钮arcoProps */
    submitButtonProps?: ButtonProps;
    /** 节点类型 */
    className?: string | string[];
    /** 内置的 arco 组件的前缀 */
    prefixCls?: string;
    /**
     * @zh 全屏模式下是否自动宽度撑满，默认不撑满、宽度1260
     * @defaultValue false
     */
    autoWidthForFullPage?: boolean;
    /**
     * @zh 是否按当前视图自动高度撑满，默认是height：100% (主要是兼容初版存量逻辑)
     * @defaultValue false
     */
    autoHeightWithViewPort?: boolean;
    /**
     * @zh layout 为 normal 时的专属配置
     * @en config for normal-layout
     */
    configForNormalLayout?: {
        /**
         * @zh layout 为 normal 时，content 的style
         */
        contentStyle?: CSSProperties;
        /**
         * @zh layout 为 normal 时，header 的style
         */
        headerStyle?: CSSProperties;
    };
    /**
     * @zh 页面顶部的自定义内容
     */
    customTopContent?: ReactNode;
}
