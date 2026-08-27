import type { CSSProperties, ReactNode } from 'react';
import type { ButtonProps } from '@arco-design/web-react/es/Button';
/**
 *  @title CGuideProps
 */
export interface CGuideProps {
    /**
     * 步骤列表
     */
    steps: CGuideStepProps[];
    /**
     * 透传给组件根节点的内联样式
     */
    style?: CSSProperties;
    /**
     * 挂到组件根节点的样式名
     */
    className?: string | string[];
    /**
     * 使用指引面板是否折叠
     */
    isFold?: boolean;
}
/**
 *  @title CGuideFoldButtonProps
 */
export interface CGuideFoldButtonProps {
    /**
     * 透传给组件根节点的内联样式
     */
    style?: CSSProperties;
    /**
     * 挂到组件上的样式名
     */
    className?: string | string[];
    /**
     * 按钮是否是折叠样式
     */
    isFold: boolean;
}
/**
 *  @title GuideStepProps
 */
export interface CGuideStepProps {
    /**
     * @zh 步骤数
     */
    titleIndex: string;
    /**
     * @zh 步骤标题
     */
    title: string;
    /**
     * @zh 步骤的简介
     */
    introduction?: ReactNode;
    /**
     * @zh 步骤的操作按钮
     */
    operationButton?: {
        text: string;
    } & ButtonProps;
    /**
     * @zh 步骤的自定义操作内容
     */
    operationRender?: ReactNode;
    /**
     * @zh 折叠状态
     */
    isFold?: boolean;
}
