/// <reference types="react" />
import ModalArcoForm from './ModalArcoForm';
import ModalTable from './ModalTable';
import ModalForm from './ModalForm';
import { ModalFormStep } from './ModalFormStep';
declare const CModal: import("react").ForwardRefExoticComponent<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>> & {
    open: <P extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, P>;
    close: (id?: number | undefined) => void;
} & {
    Form: (<FormData_1 extends import("../CForm").ObjectType = import("../CForm").ObjectType, GlobalData extends import("../CForm").ObjectType = import("../CForm").ObjectType>(props: import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "config", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_1, GlobalData, any, any>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null) & {
        create: import("../_factory/maskableComponent").CreateBuiltIn<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "config">;
    } & Omit<import("react").JSXElementConstructor<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "config", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("../CForm").ObjectType, import("../CForm").ObjectType, any, any>> & {
        open: <P_1 extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<Omit<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "onOk" | "onCancel"> & {
            footerFields?: import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[] | undefined;
            decoratorProps?: import("../_factory/maskableComponent").MaskableFormDecoratorProps | undefined;
            formFooter?: ((renderCancelBtn: import("../CForm").CFormFooterCustomRender, okBtn: import("../CForm").CFormFooterBuiltInButton, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[]) | undefined;
            formProps?: import("..").CFormProps<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("@storage-fe/formily-arco/es/FormStep").FormStepDecoratorProps>> | undefined;
            formConfig: import("../CForm").CFormConfig<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType>;
            formRef?: import("react").Ref<import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType> | null> | undefined;
            onOk?: ((values: import("../CForm").ObjectType, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => any) | undefined;
            onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
        }>) => import("../_factory/maskableComponent").StaticMethodsReturn<Omit<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "onOk" | "onCancel"> & {
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
        open: <FormData_2 extends import("../CForm").ObjectType = import("../CForm").ObjectType, GlobalData_1 extends import("../CForm").ObjectType = import("../CForm").ObjectType, OnOkReturn = any, OnCancelReturn = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "config", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_2, GlobalData_1, OnOkReturn, OnCancelReturn>>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "config", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_2, GlobalData_1, OnOkReturn, OnCancelReturn>, OnOkReturn | OnCancelReturn>;
    };
    Table: (<T extends Record<string, any> = any, OnOkReturn_1 = unknown>(props: import("./ModalTable").CModalTableProps<T, OnOkReturn_1> & {
        ref?: import("react").Ref<HTMLDivElement> | undefined;
    }) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>) & {
        close: (id?: number | undefined) => void;
    } & {
        open: <T_1 extends Record<string, any>, OnOkReturn_2 = unknown>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("./ModalTable").CModalTableProps<T_1, OnOkReturn_2>>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("./ModalTable").CModalTableProps<T_1, OnOkReturn_2>, OnOkReturn_2>;
    };
    ArcoForm: (<T_2 extends unknown, OnOkReturn_3 = unknown>(props: import("./ModalArcoForm").CModalArcoFormProps<T_2, OnOkReturn_3> & {
        ref?: import("react").Ref<HTMLDivElement> | undefined;
    }) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>) & {
        close: (id?: number | undefined) => void;
    } & {
        open: <T_3 extends Record<string, any>, OnOkReturn_4 = unknown>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("./ModalArcoForm").CModalArcoFormProps<T_3, OnOkReturn_4>>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("./ModalArcoForm").CModalArcoFormProps<T_3, OnOkReturn_4>, OnOkReturn_4>;
    };
    FormStep: (<FormData_3 extends import("../CForm").ObjectType = import("../CForm").ObjectType, GlobalData_2 extends import("../CForm").ObjectType = import("../CForm").ObjectType>(props: import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "stepConfig", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_3, GlobalData_2, any, any>) => import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | null) & {
        create: import("../_factory/maskableComponent").CreateBuiltIn<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "stepConfig">;
    } & Omit<import("react").JSXElementConstructor<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "stepConfig", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("../CForm").ObjectType, import("../CForm").ObjectType, any, any>> & {
        open: <P_2 extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<Omit<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "onOk" | "onCancel"> & {
            footerFields?: import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[] | undefined;
            decoratorProps?: import("../_factory/maskableComponent").MaskableFormDecoratorProps | undefined;
            formFooter?: ((renderCancelBtn: import("../CForm").CFormFooterCustomRender, prevStepBtn: import("../CForm").CFormFooterBuiltInButton, nextStepBtn: import("../CForm").CFormFooterBuiltInButton, okBtn: import("../CForm").CFormFooterBuiltInButton, formStep: import("../CForm").CFormStep) => import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[]) | undefined;
            formProps?: import("..").CFormProps<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("@storage-fe/formily-arco/es/FormStep").FormStepDecoratorProps>> | undefined;
            formConfig: import("../CForm").CFormStepConfig<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType>;
            formRef?: import("react").Ref<import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType> | null> | undefined;
            onOk?: ((values: import("../CForm").ObjectType, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => any) | undefined;
            onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
        }>) => import("../_factory/maskableComponent").StaticMethodsReturn<Omit<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "onOk" | "onCancel"> & {
            footerFields?: import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[] | undefined;
            decoratorProps?: import("../_factory/maskableComponent").MaskableFormDecoratorProps | undefined;
            formFooter?: ((renderCancelBtn: import("../CForm").CFormFooterCustomRender, prevStepBtn: import("../CForm").CFormFooterBuiltInButton, nextStepBtn: import("../CForm").CFormFooterBuiltInButton, okBtn: import("../CForm").CFormFooterBuiltInButton, formStep: import("../CForm").CFormStep) => import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[]) | undefined;
            formProps?: import("..").CFormProps<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("@storage-fe/formily-arco/es/FormStep").FormStepDecoratorProps>> | undefined;
            formConfig: import("../CForm").CFormStepConfig<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType>;
            formRef?: import("react").Ref<import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType> | null> | undefined;
            onOk?: ((values: import("../CForm").ObjectType, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => any) | undefined;
            onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
        }, P_2>;
        close: (id?: number | undefined) => void;
    }, "open"> & {
        open: <FormData_4 extends import("../CForm").ObjectType = import("../CForm").ObjectType, GlobalData_3 extends import("../CForm").ObjectType = import("../CForm").ObjectType, OnOkReturn_5 = any, OnCancelReturn_1 = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "stepConfig", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_4, GlobalData_3, OnOkReturn_5, OnCancelReturn_1>>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "stepConfig", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_4, GlobalData_3, OnOkReturn_5, OnCancelReturn_1>, OnOkReturn_5 | OnCancelReturn_1>;
    };
} & {
    openForm: (<FormData_2 extends import("../CForm").ObjectType = import("../CForm").ObjectType, GlobalData_1 extends import("../CForm").ObjectType = import("../CForm").ObjectType, OnOkReturn = any, OnCancelReturn = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "config", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_2, GlobalData_1, OnOkReturn, OnCancelReturn>>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "config", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_2, GlobalData_1, OnOkReturn, OnCancelReturn>, OnOkReturn | OnCancelReturn>) & (<P_3 extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<Omit<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "onOk" | "onCancel"> & {
        footerFields?: import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[] | undefined;
        decoratorProps?: import("../_factory/maskableComponent").MaskableFormDecoratorProps | undefined;
        formFooter?: ((renderCancelBtn: import("../CForm").CFormFooterCustomRender, okBtn: import("../CForm").CFormFooterBuiltInButton, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[]) | undefined;
        formProps?: import("..").CFormProps<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("@storage-fe/formily-arco/es/FormStep").FormStepDecoratorProps>> | undefined;
        formConfig: import("../CForm").CFormConfig<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType>;
        formRef?: import("react").Ref<import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType> | null> | undefined;
        onOk?: ((values: import("../CForm").ObjectType, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => any) | undefined;
        onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
    }>) => import("../_factory/maskableComponent").StaticMethodsReturn<Omit<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "onOk" | "onCancel"> & {
        footerFields?: import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[] | undefined;
        decoratorProps?: import("../_factory/maskableComponent").MaskableFormDecoratorProps | undefined;
        formFooter?: ((renderCancelBtn: import("../CForm").CFormFooterCustomRender, okBtn: import("../CForm").CFormFooterBuiltInButton, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[]) | undefined;
        formProps?: import("..").CFormProps<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("@storage-fe/formily-arco/es/FormStep").FormStepDecoratorProps>> | undefined;
        formConfig: import("../CForm").CFormConfig<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType>;
        formRef?: import("react").Ref<import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType> | null> | undefined;
        onOk?: ((values: import("../CForm").ObjectType, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => any) | undefined;
        onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
    }, P_3>);
    openTable: (<T_1 extends Record<string, any>, OnOkReturn_2 = unknown>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("./ModalTable").CModalTableProps<T_1, OnOkReturn_2>>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("./ModalTable").CModalTableProps<T_1, OnOkReturn_2>, OnOkReturn_2>) & (<P_4 extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("./ModalTable").CModalTableProps<Record<string, any>, unknown> & {
        ref?: import("react").Ref<HTMLDivElement> | undefined;
    }>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("./ModalTable").CModalTableProps<Record<string, any>, unknown> & {
        ref?: import("react").Ref<HTMLDivElement> | undefined;
    }, P_4>);
    openArcoForm: (<T_3 extends Record<string, any>, OnOkReturn_4 = unknown>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("./ModalArcoForm").CModalArcoFormProps<T_3, OnOkReturn_4>>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("./ModalArcoForm").CModalArcoFormProps<T_3, OnOkReturn_4>, OnOkReturn_4>) & (<P_5 extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("./ModalArcoForm").CModalArcoFormProps<unknown, unknown> & {
        ref?: import("react").Ref<HTMLDivElement> | undefined;
    }>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("./ModalArcoForm").CModalArcoFormProps<unknown, unknown> & {
        ref?: import("react").Ref<HTMLDivElement> | undefined;
    }, P_5>);
    openFormStep: (<FormData_4 extends import("../CForm").ObjectType = import("../CForm").ObjectType, GlobalData_3 extends import("../CForm").ObjectType = import("../CForm").ObjectType, OnOkReturn_5 = any, OnCancelReturn_1 = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "stepConfig", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_4, GlobalData_3, OnOkReturn_5, OnCancelReturn_1>>) => import("../_factory/maskableComponent").StaticMethodsReturn<import("../_factory/maskableComponent").BuiltInFormProps<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "stepConfig", Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, FormData_4, GlobalData_3, OnOkReturn_5, OnCancelReturn_1>, OnOkReturn_5 | OnCancelReturn_1>) & (<P_6 extends unknown = any>(props: import("../_factory/maskableComponent").StaticMethodsExtraProps<Omit<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "onOk" | "onCancel"> & {
        footerFields?: import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[] | undefined;
        decoratorProps?: import("../_factory/maskableComponent").MaskableFormDecoratorProps | undefined;
        formFooter?: ((renderCancelBtn: import("../CForm").CFormFooterCustomRender, prevStepBtn: import("../CForm").CFormFooterBuiltInButton, nextStepBtn: import("../CForm").CFormFooterBuiltInButton, okBtn: import("../CForm").CFormFooterBuiltInButton, formStep: import("../CForm").CFormStep) => import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[]) | undefined;
        formProps?: import("..").CFormProps<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("@storage-fe/formily-arco/es/FormStep").FormStepDecoratorProps>> | undefined;
        formConfig: import("../CForm").CFormStepConfig<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType>;
        formRef?: import("react").Ref<import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType> | null> | undefined;
        onOk?: ((values: import("../CForm").ObjectType, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => any) | undefined;
        onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
    }>) => import("../_factory/maskableComponent").StaticMethodsReturn<Omit<import("./interface").CModalProps & import("react").RefAttributes<HTMLDivElement>, "onOk" | "onCancel"> & {
        footerFields?: import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[] | undefined;
        decoratorProps?: import("../_factory/maskableComponent").MaskableFormDecoratorProps | undefined;
        formFooter?: ((renderCancelBtn: import("../CForm").CFormFooterCustomRender, prevStepBtn: import("../CForm").CFormFooterBuiltInButton, nextStepBtn: import("../CForm").CFormFooterBuiltInButton, okBtn: import("../CForm").CFormFooterBuiltInButton, formStep: import("../CForm").CFormStep) => import("../CForm").CFormFooterItem<import("../CForm").ObjectType, import("../CForm").ObjectType>[]) | undefined;
        formProps?: import("..").CFormProps<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType, import("react").JSXElementConstructor<import("@storage-fe/formily-arco/es/FormStep").FormStepDecoratorProps>> | undefined;
        formConfig: import("../CForm").CFormStepConfig<import("../CForm").ObjectType, import("../CForm").ObjectType, Omit<Omit<{}, never>, keyof import("../CForm").DefaultBuiltInComponentMapType> & import("../CForm").DefaultBuiltInComponentMapType>;
        formRef?: import("react").Ref<import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType> | null> | undefined;
        onOk?: ((values: import("../CForm").ObjectType, form: import("../CForm").CForm<import("../CForm").ObjectType, import("../CForm").ObjectType>) => any) | undefined;
        onCancel?: ((e?: MouseEvent | undefined) => any) | undefined;
    }, P_6>);
} & {
    closeForm: (id?: number | undefined) => void;
    closeTable: (id?: number | undefined) => void;
    closeArcoForm: (id?: number | undefined) => void;
    closeFormStep: (id?: number | undefined) => void;
} & {
    TriggerWrapper: import("react").FC<{
        inlineAttr?: boolean | undefined;
    }>;
    closeAll: () => void;
} & {
    error: <T_4 extends unknown = boolean>(props: import("./copyStaticsFromArcoModal").CustomConfirmProps) => Promise<T_4> & import("@arco-design/web-react/es/Modal/interface").ModalReturnProps;
    warning: <T_5 extends unknown = boolean>(props: import("./copyStaticsFromArcoModal").CustomConfirmProps) => Promise<T_5> & import("@arco-design/web-react/es/Modal/interface").ModalReturnProps;
    success: <T_6 extends unknown = boolean>(props: import("./copyStaticsFromArcoModal").CustomConfirmProps) => Promise<T_6> & import("@arco-design/web-react/es/Modal/interface").ModalReturnProps;
    info: <T_7 extends unknown = boolean>(props: import("./copyStaticsFromArcoModal").CustomConfirmProps) => Promise<T_7> & import("@arco-design/web-react/es/Modal/interface").ModalReturnProps;
    confirm: <T_8 extends unknown = boolean>(props: import("./copyStaticsFromArcoModal").CustomConfirmProps) => Promise<T_8> & import("@arco-design/web-react/es/Modal/interface").ModalReturnProps;
};
export { CModal as default, ModalForm as CModalForm, ModalTable as CModalTable, ModalArcoForm as CModalArcoForm, ModalFormStep as CModalFormStep, };
export type { CModalArcoFormProps } from './ModalArcoForm';
export type { CModalTableProps } from './ModalTable';
