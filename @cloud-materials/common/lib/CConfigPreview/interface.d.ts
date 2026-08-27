import type { ButtonProps, DescriptionsProps, FormInstance } from '@arco-design/web-react';
import type { CSSProperties, ReactNode } from 'react';
import type { CFeeCalculatorProps } from '../CFeeCalculator/interface';
import type { CAgreementProps } from '../CAgreement/interface';
import type { KeyType, ValidateFieldsErrors } from '@arco-design/web-react/es/Form/interface';
/**
 * @title CConfigPreview组件属性
 */
export interface CConfigPreviewProps<FormData = any, FieldValue = FormData[keyof FormData], FieldKey extends KeyType = keyof FormData> {
    /**
     * @zh 整个卡片的最大高度
     * @defaultValue 600
     */
    maxHeight?: number;
    /**
     * @zh 监听的表单实例
     */
    watchedForm: FormInstance<FormData, FieldValue, FieldKey>;
    /**
     * @zh 配置详情
     */
    infoPreview?: InfoPreviewProps;
    /**
     * @zh 计费配置
     */
    feeConfig?: CFeeCalculatorProps;
    /**
     * @zh 协议配置
     */
    agreementConfig?: CAgreementProps;
    /**
     * @zh 提交按钮配置
     */
    submitButtonConfig?: ButtonProps;
    /**
     * @zh 点击提交前的回调函数，返回boolean，如果返回false，会终止提交流程。该方法的触发时机：表单校验完成后，onSubmit调用前。
     */
    beforeSubmit?: (options: {
        watchedFormErrors?: ValidateFieldsErrors;
        previewFormErrors?: ValidateFieldsErrors;
    }) => boolean | Promise<boolean>;
    /**
     * @zh 提交操作回调函数
     */
    onSubmit?: (v: FormData, u: {
        num?: number;
        duration?: number;
    }) => any | Promise<any>;
    /**
     * @zh 样式
     */
    style?: CSSProperties;
    /**
     * @zh className
     */
    className?: string;
}
/**
 * @title 配置详情
 */
export type InfoPreviewProps = {
    /**
     * @zh 标题
     */
    title: ReactNode;
    /**
     * @zh 需要动态展示的配置信息
     */
    fieldIndex: string[];
    /**
     * @zh 配置信息格式化。
     * formatter方法会依次对fieldIndex中配置的字段进行格式化。
     * 当前格式化中需要自己映射title的值，默认的title的值为fieldIndex的值。
     */
    formatter?: (data: InfoPreviewFormatterData) => InfoPreviewFormatterRes | undefined | null | void;
    /**
     * @zh Descriptions组件的布局
     */
    layout?: DescriptionsProps['layout'];
};
/**
 * @title 配置详情 数据格式化入参
 */
export interface InfoPreviewFormatterData {
    /**
     * @zh 字段的名称
     */
    fieldKey: string;
    /**
     * @zh 字段的标题，默认和fieldKey的值相同
     */
    title: string | JSX.Element;
    /**
     * @zh 字段的值
     */
    value: any;
}
/**
 * @title 配置详情 数据格式化返回
 */
export interface InfoPreviewFormatterRes {
    /**
     * @zh 字段的名称
     */
    fieldKey: string;
    /**
     * @zh 字段的标题
     */
    title: ReactNode;
    /**
     * @zh 字段的值
     */
    value: ReactNode;
}
