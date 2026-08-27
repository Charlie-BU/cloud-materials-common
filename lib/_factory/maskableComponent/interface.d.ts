import type React from 'react';
import type { AlertProps, ButtonProps, PopconfirmProps } from '@arco-design/web-react';
import type { CFormFooterBuiltInButton, CFormFooterCustomRender, CFormProps, CFormStep } from '../../CForm';
import type { CForm, CFormFooterItem, FormType, ObjectType, PureComponentsMap } from '../../CForm/interface';
import type { TriggerWrapper } from './TriggerWrapper';
import type { MaskableFormDecorator, MaskableFormDecoratorProps } from './components';
import type { PickReactComponentProps } from '../builtInComponent';
import type { CComponentConfig } from '../../CConfigProvider/interface';
export interface MaskableAlertProps extends Omit<AlertProps, 'type'> {
    type?: 'custom' | AlertProps['type'] | (string & {});
    /**
     * 顶部alert固定位置
     * @defaultValue true
     */
    sticky?: boolean;
}
export type AlertContentType = React.ReactNode | MaskableAlertProps;
export type BaseProps<T = unknown> = {
    /**
     * @zh 传入number类型时将被转换为 `Boolean(visible)`，modal将会变得不受控
     */
    visible?: boolean | number;
    mask?: boolean;
    /**
     * @zh 弹窗内容部分上部插入齐边内容
     */
    contentTop?: AlertContentType;
    /**
     * @zh 弹窗内容部分下部插入齐边内容
     */
    contentBottom?: AlertContentType;
    confirmLoading?: boolean;
    contentClassName?: string;
    confirmOnOk?: PopconfirmProps | false;
    /** 这里需要用any去最大化onOk的参数和返回值范围，以便做扩展 */
    onOk?: (...args: unknown[]) => Promise<any> | any;
    onCancel?: (e?: MouseEvent) => any;
    style?: React.CSSProperties;
    afterClose?: () => void;
    children?: any;
    footer?: React.ReactNode | ((cancelButtonNode: React.ReactNode, okButtonNode: React.ReactNode) => React.ReactNode);
    okText?: React.ReactNode;
    cancelText?: React.ReactNode;
    okButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    /**
     * @zh 隐藏 cancel 按钮
     */
    hideCancel?: boolean;
} & Omit<T, 'onOk' | 'onCancel'>;
export interface BaseHooksProps {
    preventCloseSelectors?: string[];
}
export type StaticMethodsExtraProps<T = unknown> = {
    content?: React.ReactNode;
    /** 当配置mask: false时，第二次调用会更新已经打开的实例，此时如果设置forceNew: true 则强制新开一个实例覆盖在之前的实例之上 */
    forceNew?: boolean;
    /**
     * 是否在作为Promise使用open函数时抛出onOk的错误，默认为 false 以避免 slardar 噪音
     * ```ts
     *  CModal.open({
     *    throwOnOkErrorInPromise: true
     *  }).catch(() => {
     *    // 可以捕获到onOk抛出的异常，否则不会
     *  })
     * ```
     *
     * @defaultValue false
     */
    throwOnOkErrorInPromise?: boolean;
    wrapper?: [React.JSXElementConstructor<any>, Record<string, any>?];
    getMountContainer?: () => Element;
} & T;
export type CommonComponentTypeProps = Pick<BaseProps, 'mask' | 'visible' | 'onCancel' | 'onOk' | 'children'> & {
    afterClose?: () => void;
};
export type StaticMethodsReturn<T extends Record<string, any> = {}, P extends any = any> = Promise<P> & {
    id: number;
    update: (options: Partial<StaticMethodsExtraProps<T>>) => void;
    close: () => void;
};
export type DefineStatic<M extends Record<string, React.JSXElementConstructor<any>>> = {
    [key in keyof M]: M[key];
} & {
    [key in keyof M as `open${Capitalize<key & string>}`]: ReturnType<CreateStaticMethods<M[key]>>['open'];
} & {
    [key in keyof M as `close${Capitalize<key & string>}`]: ReturnType<CreateStaticMethods<M[key]>>['close'];
};
export type FormConfigKeyUnion = keyof Pick<CFormProps, 'config' | 'stepConfig'>;
export type BuiltInFormProps<MaskableProps extends BaseProps, FormConfigKey extends FormConfigKeyUnion, ComponentsMap extends PureComponentsMap, FormData extends ObjectType = ObjectType, GlobalData extends ObjectType = ObjectType, OnOkReturn = any, OnCancelReturn = any> = Omit<MaskableProps, 'onOk' | 'onCancel'> & {
    footerFields?: CFormFooterItem<FormData, GlobalData>[];
    decoratorProps?: MaskableFormDecoratorProps;
    formFooter?: (...args: FormConfigKey extends 'config' ? [renderCancelBtn: CFormFooterCustomRender, okBtn: CFormFooterBuiltInButton, form: CForm<FormData, GlobalData>] : [
        renderCancelBtn: CFormFooterCustomRender,
        prevStepBtn: CFormFooterBuiltInButton,
        nextStepBtn: CFormFooterBuiltInButton,
        okBtn: CFormFooterBuiltInButton,
        formStep: CFormStep
    ]) => CFormFooterItem<FormData, GlobalData>[];
    /**
     * 透传给 CForm 的 props
     */
    formProps?: CFormProps<FormData, GlobalData, ComponentsMap>;
    /**
     * 对应 CFormProps 的 config 或 stepConfig
     */
    formConfig: Required<CFormProps<FormData, GlobalData, ComponentsMap>>[FormConfigKey];
    formRef?: React.Ref<CForm<FormData, GlobalData> | null>;
    onOk?: (values: FormData, form: CForm<FormData, GlobalData>) => Promise<OnOkReturn> | OnOkReturn;
    onCancel?: (e?: MouseEvent) => Promise<OnCancelReturn> | OnCancelReturn;
};
export interface CreateBuiltIn<MaskableProps extends BaseProps, FormConfigKey extends FormConfigKeyUnion> {
    <ComponentsMap extends PureComponentsMap>(Form: React.JSXElementConstructor<CFormProps<any, any, ComponentsMap, any>>): (<FormData extends ObjectType = ObjectType, GlobalData extends ObjectType = ObjectType>(props: BuiltInFormProps<MaskableProps, FormConfigKey, ComponentsMap, FormData, GlobalData>) => React.ReactElement | null) & {
        create: CreateBuiltIn<MaskableProps, FormConfigKey>;
    } & Omit<ReturnType<CreateStaticMethods<React.JSXElementConstructor<BuiltInFormProps<MaskableProps, FormConfigKey, ComponentsMap>>>>, 'open'> & {
        open: <FormData extends ObjectType = ObjectType, GlobalData extends ObjectType = ObjectType, OnOkReturn = any, OnCancelReturn = any>(props: StaticMethodsExtraProps<BuiltInFormProps<MaskableProps, FormConfigKey, ComponentsMap, FormData, GlobalData, OnOkReturn, OnCancelReturn>>) => StaticMethodsReturn<BuiltInFormProps<MaskableProps, FormConfigKey, ComponentsMap, FormData, GlobalData, OnOkReturn, OnCancelReturn>, OnOkReturn | OnCancelReturn>;
    };
}
export interface CreateBuiltInForm {
    <MaskableProps extends BaseProps, FormConfigKey extends FormConfigKeyUnion>(Component: React.ComponentType<MaskableProps>, formType: FormConfigKey, options: {
        plugin?: new () => Plugin<MaskableProps>;
        defaultProps?: MaskableProps;
        /** 组件名 */
        componentName: Extract<keyof CComponentConfig, 'CModal.Form' | 'CModal.FormStep' | 'CDrawer.Form' | 'CDrawer.FormStep'>;
    }): CreateBuiltIn<MaskableProps, FormConfigKey>;
}
export interface CreateStaticMethods<T extends React.JSXElementConstructor<CommonComponentTypeProps> = React.JSXElementConstructor<CommonComponentTypeProps>> {
    <C extends T>(Component: C): C & {
        /** 通过js函数打开一个组件 */
        open: <P extends any = any>(props: StaticMethodsExtraProps<PickReactComponentProps<C>>) => StaticMethodsReturn<PickReactComponentProps<C>, P>;
        /** 通过js函数关闭一个组件，不传入id将关闭所有 */
        close: (id?: number) => void;
    };
}
export interface CreateMaskableComponent {
    <C extends React.JSXElementConstructor<BaseProps>, M extends Record<string, React.JSXElementConstructor<any> & ReturnType<CreateStaticMethods<React.JSXElementConstructor<any>>>>>(Component: C, attachComponentsMap: M): ReturnType<CreateStaticMethods<C>> & DefineStatic<M> & {
        TriggerWrapper: typeof TriggerWrapper;
        /** 一键关闭所有通过open打开的内容 */
        closeAll: () => void;
    };
}
export interface Plugin<T extends BaseProps> {
    getExtraMaskableProps: (oldProps: T) => T;
    getFormProps: (oldFormProps: React.ComponentProps<FormType<any, typeof MaskableFormDecorator>>) => typeof oldFormProps;
}
