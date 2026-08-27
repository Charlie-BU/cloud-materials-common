import type { ModalProps } from '@arco-design/web-react';
import type { DefaultBuiltInComponentMapType } from '../CForm/interface';
import type { BaseProps, BuiltInFormProps, StaticMethodsExtraProps } from '../_factory/maskableComponent';
export interface BaseHooksProps {
    preventCloseSelectors?: string[];
}
/**
 * @title CModalProps
 */
export interface CModalProps extends BaseProps<Omit<ModalProps, 'visible'>> {
    /** footer 分割线 */
    footerDivider?: boolean;
    /**
     * 滚动容器的最大高度
     * @defaultValue 474
     */
    scrollMaxHeight?: number | 'none';
}
/**
 * @title CModalHooksProps
 */
export interface CModalHooksProps extends CModalProps, BaseHooksProps {
}
export type CModalStaticMethodsOptions = StaticMethodsExtraProps<CModalProps>;
/**
 * @title 默认的 ModalForm props 类型
 */
export type DefaultCModalFormProps = BuiltInFormProps<CModalProps, 'config', DefaultBuiltInComponentMapType>;
/**
 * @title 默认的 ModalFormStep props 类型
 */
export type DefaultCModalFormStepProps = BuiltInFormProps<CModalProps, 'stepConfig', DefaultBuiltInComponentMapType>;
/**
 * @title 默认的 ModalForm.open 参数类型
 */
export type DefaultCModalFormOpenArgumentType = StaticMethodsExtraProps<DefaultCModalFormProps>;
