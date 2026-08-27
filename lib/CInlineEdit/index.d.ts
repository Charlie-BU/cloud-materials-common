import React from 'react';
import type { CInlineEditProps, CInlineEditGlobalConfig } from './interface';
declare const builtInMap: {
    Input: React.ForwardRefExoticComponent<import("@arco-design/web-react").InputProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType> & import("@arco-design/web-react/es/_util/hooks/useMergeProps").MergePropsOptions> & {
        Search: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input").InputSearchProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
        TextArea: React.ForwardRefExoticComponent<import("@arco-design/web-react").TextAreaProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefTextAreaType>>;
        Password: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input").InputPasswordProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
        Group: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input/interface").InputGroupProps & {
            children?: React.ReactNode;
        } & React.RefAttributes<HTMLDivElement>>;
    };
    InputNumber: React.ForwardRefExoticComponent<import("@arco-design/web-react").InputNumberProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
    TextArea: React.ForwardRefExoticComponent<import("@arco-design/web-react").TextAreaProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefTextAreaType>>;
    Select: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectProps & React.RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>> & {
        Option: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionProps & React.RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTION__?: boolean | undefined;
        };
        OptGroup: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionGroupProps & React.RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTGROUP__?: boolean | undefined;
        };
    };
};
export type BuiltInCpnType = typeof builtInMap;
export declare const testId: {
    container: string;
    editIcon: string;
    submitOpt: string;
    cancelOpt: string;
    input: string;
    textarea: string;
    inputnumber: string;
    select: string;
};
declare function CInlineEdit<T = string>(props: CInlineEditProps<T>): JSX.Element;
declare const InnerCpn: typeof CInlineEdit & {
    register: <R extends import("../_factory/builtInComponent/interface").ComponentsMap>(componentsMap: R, defaultProps?: import("../_factory/builtInComponent").DefineComponentPropsMapType<Omit<{
        Input: React.ForwardRefExoticComponent<import("@arco-design/web-react").InputProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType> & import("@arco-design/web-react/es/_util/hooks/useMergeProps").MergePropsOptions> & {
            Search: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input").InputSearchProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
            TextArea: React.ForwardRefExoticComponent<import("@arco-design/web-react").TextAreaProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefTextAreaType>>;
            Password: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input").InputPasswordProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
            Group: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input/interface").InputGroupProps & {
                children?: React.ReactNode;
            } & React.RefAttributes<HTMLDivElement>>;
        };
        InputNumber: React.ForwardRefExoticComponent<import("@arco-design/web-react").InputNumberProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
        TextArea: React.ForwardRefExoticComponent<import("@arco-design/web-react").TextAreaProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefTextAreaType>>;
        Select: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectProps & React.RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>> & {
            Option: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionProps & React.RefAttributes<unknown>> & {
                __ARCO_SELECT_OPTION__?: boolean | undefined;
            };
            OptGroup: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionGroupProps & React.RefAttributes<unknown>> & {
                __ARCO_SELECT_OPTGROUP__?: boolean | undefined;
            };
        };
    }, keyof R> & R> | undefined) => import("../_factory/builtInComponent/interface").BuiltInType<typeof CInlineEdit, Omit<{
        Input: React.ForwardRefExoticComponent<import("@arco-design/web-react").InputProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType> & import("@arco-design/web-react/es/_util/hooks/useMergeProps").MergePropsOptions> & {
            Search: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input").InputSearchProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
            TextArea: React.ForwardRefExoticComponent<import("@arco-design/web-react").TextAreaProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefTextAreaType>>;
            Password: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input").InputPasswordProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
            Group: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input/interface").InputGroupProps & {
                children?: React.ReactNode;
            } & React.RefAttributes<HTMLDivElement>>;
        };
        InputNumber: React.ForwardRefExoticComponent<import("@arco-design/web-react").InputNumberProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
        TextArea: React.ForwardRefExoticComponent<import("@arco-design/web-react").TextAreaProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefTextAreaType>>;
        Select: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectProps & React.RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>> & {
            Option: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionProps & React.RefAttributes<unknown>> & {
                __ARCO_SELECT_OPTION__?: boolean | undefined;
            };
            OptGroup: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionGroupProps & React.RefAttributes<unknown>> & {
                __ARCO_SELECT_OPTGROUP__?: boolean | undefined;
            };
        };
    }, keyof R> & R>;
    defineComponentOptions: <K extends "Select" | "Input" | "InputNumber" | "TextArea">(component: K, props?: import("../_factory/builtInComponent").PickReactComponentProps<{
        Input: React.ForwardRefExoticComponent<import("@arco-design/web-react").InputProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType> & import("@arco-design/web-react/es/_util/hooks/useMergeProps").MergePropsOptions> & {
            Search: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input").InputSearchProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
            TextArea: React.ForwardRefExoticComponent<import("@arco-design/web-react").TextAreaProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefTextAreaType>>;
            Password: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input").InputPasswordProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
            Group: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input/interface").InputGroupProps & {
                children?: React.ReactNode;
            } & React.RefAttributes<HTMLDivElement>>;
        };
        InputNumber: React.ForwardRefExoticComponent<import("@arco-design/web-react").InputNumberProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
        TextArea: React.ForwardRefExoticComponent<import("@arco-design/web-react").TextAreaProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefTextAreaType>>;
        Select: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectProps & React.RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>> & {
            Option: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionProps & React.RefAttributes<unknown>> & {
                __ARCO_SELECT_OPTION__?: boolean | undefined;
            };
            OptGroup: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionGroupProps & React.RefAttributes<unknown>> & {
                __ARCO_SELECT_OPTGROUP__?: boolean | undefined;
            };
        };
    }[K]> | undefined, ref?: React.RefObject<unknown> | undefined) => any;
    useBuiltIn: () => import("../_factory/builtInComponent/interface").BuiltInContextType<{
        Input: React.ForwardRefExoticComponent<import("@arco-design/web-react").InputProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType> & import("@arco-design/web-react/es/_util/hooks/useMergeProps").MergePropsOptions> & {
            Search: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input").InputSearchProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
            TextArea: React.ForwardRefExoticComponent<import("@arco-design/web-react").TextAreaProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefTextAreaType>>;
            Password: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input").InputPasswordProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
            Group: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input/interface").InputGroupProps & {
                children?: React.ReactNode;
            } & React.RefAttributes<HTMLDivElement>>;
        };
        InputNumber: React.ForwardRefExoticComponent<import("@arco-design/web-react").InputNumberProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
        TextArea: React.ForwardRefExoticComponent<import("@arco-design/web-react").TextAreaProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefTextAreaType>>;
        Select: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectProps & React.RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>> & {
            Option: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionProps & React.RefAttributes<unknown>> & {
                __ARCO_SELECT_OPTION__?: boolean | undefined;
            };
            OptGroup: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionGroupProps & React.RefAttributes<unknown>> & {
                __ARCO_SELECT_OPTGROUP__?: boolean | undefined;
            };
        };
    }>;
} & {
    config(options: CInlineEditGlobalConfig): void;
    displayName: string;
};
export default InnerCpn;
