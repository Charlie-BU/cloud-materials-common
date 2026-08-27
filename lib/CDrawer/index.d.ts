/// <reference types="react" />
import type { CDrawerArcoFormProps } from './DrawerArcoForm';
import DrawerArcoForm from './DrawerArcoForm';
import DrawerForm from './DrawerForm';
import DrawerFormStep from './DrawerFormStep';
import type { CDrawerDetailProps } from './DrawerDetail';
import DrawerDetail from './DrawerDetail';
declare const CDrawer: import("react").ForwardRefExoticComponent<import("./interface").CDrawerProps & import("react").RefAttributes<HTMLDivElement>> & {
    open: <P extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("./interface").CDrawerProps & import("react").RefAttributes<HTMLDivElement>>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("./interface").CDrawerProps & import("react").RefAttributes<HTMLDivElement>, P>;
    close: (id?: number | undefined) => void;
} & {
    Form: (<FormData_1 extends import("../CForm").ObjectType = import("../CForm").ObjectType, GlobalData extends import("../CForm").ObjectType = import("../CForm").ObjectType>(props: import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CDrawerProps, "config", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_1, GlobalData, any, any>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null) & {
        create: import("../_factory/maskableComponent").CreateBuiltIn<import("./interface").CDrawerProps, "config">;
    } & Omit<import("react").JSXElementConstructor<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CDrawerProps, "config", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("../CForm").ObjectType, import("../CForm").ObjectType, any, any>> & {
        open: <P_1 extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<Omit<import("./interface").CDrawerProps, "onOk" | "onCancel"> & {
            footerFields?: import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[] | undefined;
            decoratorProps?: import("../_factory/maskableComponent").MaskableFormDecoratorProps | undefined;
            formFooter?: ((renderCancelBtn: import("../CForm").CFormFooterCustomRender, okBtn: import("../CForm").CFormFooterBuiltInButton, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[]) | undefined;
            formProps?: import("..").CFormProps<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("@storage-fe/formily-arco/es/FormStep").FormStepDecoratorProps>> | undefined;
            formConfig: import("../CForm").CFormConfig<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType>;
            formRef?: import("react").Ref<import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType> | null> | undefined;
            onOk?: ((values: import("../CForm").ObjectType, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => any) | undefined;
            onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
        }>) => import("../_factory/maskableComponent").StaticMethodsReturn<Omit<import("./interface").CDrawerProps, "onOk" | "onCancel"> & {
            footerFields?: import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[] | undefined;
            decoratorProps?: import("../_factory/maskableComponent").MaskableFormDecoratorProps | undefined;
            formFooter?: ((renderCancelBtn: import("../CForm").CFormFooterCustomRender, okBtn: import("../CForm").CFormFooterBuiltInButton, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[]) | undefined;
            formProps?: import("..").CFormProps<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("@storage-fe/formily-arco/es/FormStep").FormStepDecoratorProps>> | undefined;
            formConfig: import("../CForm").CFormConfig<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType>;
            formRef?: import("react").Ref<import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType> | null> | undefined;
            onOk?: ((values: import("../CForm").ObjectType, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => any) | undefined;
            onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
        }, P_1>;
        close: (id?: number | undefined) => void;
    }, "open"> & {
        open: <FormData_2 extends import("../CForm").ObjectType = import("../CForm").ObjectType, GlobalData_1 extends import("../CForm").ObjectType = import("../CForm").ObjectType, OnOkReturn = any, OnCancelReturn = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CDrawerProps, "config", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_2, GlobalData_1, OnOkReturn, OnCancelReturn>>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CDrawerProps, "config", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_2, GlobalData_1, OnOkReturn, OnCancelReturn>, OnOkReturn | OnCancelReturn>;
    };
    Detail: import("react").ForwardRefExoticComponent<CDrawerDetailProps & import("react").RefAttributes<HTMLDivElement>> & {
        open: <P_2 extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<CDrawerDetailProps & import("react").RefAttributes<HTMLDivElement>>) => import("../_factory/maskableComponent").StaticMethodsReturn<CDrawerDetailProps & import("react").RefAttributes<HTMLDivElement>, P_2>;
        close: (id?: number | undefined) => void;
    };
    ArcoForm: (<T extends unknown>(props: CDrawerArcoFormProps<T, unknown> & {
        ref?: import("react").Ref<HTMLDivElement> | undefined;
    }) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>) & {
        close: (id?: number | undefined) => void;
    } & {
        open: <T_1 extends Record<string, any>, OnOkReturn_1 = unknown>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<CDrawerArcoFormProps<T_1, OnOkReturn_1>>) => import("../_factory/maskableComponent").StaticMethodsReturn<CDrawerArcoFormProps<T_1, OnOkReturn_1>, OnOkReturn_1>;
    };
    FormStep: (<FormData_3 extends import("../CForm").ObjectType = import("../CForm").ObjectType, GlobalData_2 extends import("../CForm").ObjectType = import("../CForm").ObjectType>(props: import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CDrawerProps, "stepConfig", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_3, GlobalData_2, any, any>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null) & {
        create: import("../_factory/maskableComponent").CreateBuiltIn<import("./interface").CDrawerProps, "stepConfig">;
    } & Omit<import("react").JSXElementConstructor<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CDrawerProps, "stepConfig", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("../CForm").ObjectType, import("../CForm").ObjectType, any, any>> & {
        open: <P_3 extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<Omit<import("./interface").CDrawerProps, "onOk" | "onCancel"> & {
            footerFields?: import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[] | undefined;
            decoratorProps?: import("../_factory/maskableComponent").MaskableFormDecoratorProps | undefined;
            formFooter?: ((renderCancelBtn: import("../CForm").CFormFooterCustomRender, prevStepBtn: import("../CForm").CFormFooterBuiltInButton, nextStepBtn: import("../CForm").CFormFooterBuiltInButton, okBtn: import("../CForm").CFormFooterBuiltInButton, formStep: import("../CForm").CFormStep) => import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[]) | undefined;
            formProps?: import("..").CFormProps<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("@storage-fe/formily-arco/es/FormStep").FormStepDecoratorProps>> | undefined;
            formConfig: import("../CForm").CFormStepConfig<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType>;
            formRef?: import("react").Ref<import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType> | null> | undefined;
            onOk?: ((values: import("../CForm").ObjectType, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => any) | undefined;
            onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
        }>) => import("../_factory/maskableComponent").StaticMethodsReturn<Omit<import("./interface").CDrawerProps, "onOk" | "onCancel"> & {
            footerFields?: import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[] | undefined;
            decoratorProps?: import("../_factory/maskableComponent").MaskableFormDecoratorProps | undefined;
            formFooter?: ((renderCancelBtn: import("../CForm").CFormFooterCustomRender, prevStepBtn: import("../CForm").CFormFooterBuiltInButton, nextStepBtn: import("../CForm").CFormFooterBuiltInButton, okBtn: import("../CForm").CFormFooterBuiltInButton, formStep: import("../CForm").CFormStep) => import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[]) | undefined;
            formProps?: import("..").CFormProps<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("@storage-fe/formily-arco/es/FormStep").FormStepDecoratorProps>> | undefined;
            formConfig: import("../CForm").CFormStepConfig<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType>;
            formRef?: import("react").Ref<import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType> | null> | undefined;
            onOk?: ((values: import("../CForm").ObjectType, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => any) | undefined;
            onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
        }, P_3>;
        close: (id?: number | undefined) => void;
    }, "open"> & {
        open: <FormData_4 extends import("../CForm").ObjectType = import("../CForm").ObjectType, GlobalData_3 extends import("../CForm").ObjectType = import("../CForm").ObjectType, OnOkReturn_2 = any, OnCancelReturn_1 = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CDrawerProps, "stepConfig", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_4, GlobalData_3, OnOkReturn_2, OnCancelReturn_1>>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CDrawerProps, "stepConfig", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_4, GlobalData_3, OnOkReturn_2, OnCancelReturn_1>, OnOkReturn_2 | OnCancelReturn_1>;
    };
} & {
    openForm: (<FormData_2 extends import("../CForm").ObjectType = import("../CForm").ObjectType, GlobalData_1 extends import("../CForm").ObjectType = import("../CForm").ObjectType, OnOkReturn = any, OnCancelReturn = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CDrawerProps, "config", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_2, GlobalData_1, OnOkReturn, OnCancelReturn>>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CDrawerProps, "config", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_2, GlobalData_1, OnOkReturn, OnCancelReturn>, OnOkReturn | OnCancelReturn>) & (<P_4 extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<Omit<import("./interface").CDrawerProps, "onOk" | "onCancel"> & {
        footerFields?: import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[] | undefined;
        decoratorProps?: import("../_factory/maskableComponent").MaskableFormDecoratorProps | undefined;
        formFooter?: ((renderCancelBtn: import("../CForm").CFormFooterCustomRender, okBtn: import("../CForm").CFormFooterBuiltInButton, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[]) | undefined;
        formProps?: import("..").CFormProps<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("@storage-fe/formily-arco/es/FormStep").FormStepDecoratorProps>> | undefined;
        formConfig: import("../CForm").CFormConfig<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType>;
        formRef?: import("react").Ref<import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType> | null> | undefined;
        onOk?: ((values: import("../CForm").ObjectType, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => any) | undefined;
        onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
    }>) => import("../_factory/maskableComponent").StaticMethodsReturn<Omit<import("./interface").CDrawerProps, "onOk" | "onCancel"> & {
        footerFields?: import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[] | undefined;
        decoratorProps?: import("../_factory/maskableComponent").MaskableFormDecoratorProps | undefined;
        formFooter?: ((renderCancelBtn: import("../CForm").CFormFooterCustomRender, okBtn: import("../CForm").CFormFooterBuiltInButton, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[]) | undefined;
        formProps?: import("..").CFormProps<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("@storage-fe/formily-arco/es/FormStep").FormStepDecoratorProps>> | undefined;
        formConfig: import("../CForm").CFormConfig<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType>;
        formRef?: import("react").Ref<import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType> | null> | undefined;
        onOk?: ((values: import("../CForm").ObjectType, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => any) | undefined;
        onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
    }, P_4>);
    openDetail: (<P_2 extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<CDrawerDetailProps & import("react").RefAttributes<HTMLDivElement>>) => import("../_factory/maskableComponent").StaticMethodsReturn<CDrawerDetailProps & import("react").RefAttributes<HTMLDivElement>, P_2>) & (<P_5 extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<CDrawerDetailProps & import("react").RefAttributes<HTMLDivElement>>) => import("../_factory/maskableComponent").StaticMethodsReturn<CDrawerDetailProps & import("react").RefAttributes<HTMLDivElement>, P_5>);
    openArcoForm: (<T_1 extends Record<string, any>, OnOkReturn_1 = unknown>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<CDrawerArcoFormProps<T_1, OnOkReturn_1>>) => import("../_factory/maskableComponent").StaticMethodsReturn<CDrawerArcoFormProps<T_1, OnOkReturn_1>, OnOkReturn_1>) & (<P_6 extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<CDrawerArcoFormProps<unknown, unknown> & {
        ref?: import("react").Ref<HTMLDivElement> | undefined;
    }>) => import("../_factory/maskableComponent").StaticMethodsReturn<CDrawerArcoFormProps<unknown, unknown> & {
        ref?: import("react").Ref<HTMLDivElement> | undefined;
    }, P_6>);
    openFormStep: (<FormData_4 extends import("../CForm").ObjectType = import("../CForm").ObjectType, GlobalData_3 extends import("../CForm").ObjectType = import("../CForm").ObjectType, OnOkReturn_2 = any, OnCancelReturn_1 = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CDrawerProps, "stepConfig", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_4, GlobalData_3, OnOkReturn_2, OnCancelReturn_1>>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CDrawerProps, "stepConfig", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_4, GlobalData_3, OnOkReturn_2, OnCancelReturn_1>, OnOkReturn_2 | OnCancelReturn_1>) & (<P_7 extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<Omit<import("./interface").CDrawerProps, "onOk" | "onCancel"> & {
        footerFields?: import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[] | undefined;
        decoratorProps?: import("../_factory/maskableComponent").MaskableFormDecoratorProps | undefined;
        formFooter?: ((renderCancelBtn: import("../CForm").CFormFooterCustomRender, prevStepBtn: import("../CForm").CFormFooterBuiltInButton, nextStepBtn: import("../CForm").CFormFooterBuiltInButton, okBtn: import("../CForm").CFormFooterBuiltInButton, formStep: import("../CForm").CFormStep) => import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[]) | undefined;
        formProps?: import("..").CFormProps<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("@storage-fe/formily-arco/es/FormStep").FormStepDecoratorProps>> | undefined;
        formConfig: import("../CForm").CFormStepConfig<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType>;
        formRef?: import("react").Ref<import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType> | null> | undefined;
        onOk?: ((values: import("../CForm").ObjectType, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => any) | undefined;
        onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
    }>) => import("../_factory/maskableComponent").StaticMethodsReturn<Omit<import("./interface").CDrawerProps, "onOk" | "onCancel"> & {
        footerFields?: import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[] | undefined;
        decoratorProps?: import("../_factory/maskableComponent").MaskableFormDecoratorProps | undefined;
        formFooter?: ((renderCancelBtn: import("../CForm").CFormFooterCustomRender, prevStepBtn: import("../CForm").CFormFooterBuiltInButton, nextStepBtn: import("../CForm").CFormFooterBuiltInButton, okBtn: import("../CForm").CFormFooterBuiltInButton, formStep: import("../CForm").CFormStep) => import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[]) | undefined;
        formProps?: import("..").CFormProps<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("@storage-fe/formily-arco/es/FormStep").FormStepDecoratorProps>> | undefined;
        formConfig: import("../CForm").CFormStepConfig<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType>;
        formRef?: import("react").Ref<import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType> | null> | undefined;
        onOk?: ((values: import("../CForm").ObjectType, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => any) | undefined;
        onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
    }, P_7>);
} & {
    closeForm: (id?: number | undefined) => void;
    closeDetail: (id?: number | undefined) => void;
    closeArcoForm: (id?: number | undefined) => void;
    closeFormStep: (id?: number | undefined) => void;
} & {
    TriggerWrapper: import("react").FC<{
        inlineAttr?: boolean | undefined;
    }>;
    closeAll: () => void;
};
export { CDrawer as default, DrawerForm as CDrawerForm, DrawerDetail as CDrawerDetail, DrawerFormStep as CDrawerFormStep, DrawerArcoForm as CDrawerArcoForm, };
export type { CDrawerArcoFormProps, CDrawerDetailProps };
