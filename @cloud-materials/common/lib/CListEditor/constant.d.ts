/// <reference types="react" />
import { Radio } from '@arco-design/web-react';
import type { CascaderProps, CheckboxProps } from '@arco-design/web-react';
export declare const cssPrefix: (string: TemplateStringsArray, ...params: any[]) => string;
export declare const testId: {
    root: string;
    rowItem: string;
    deleteButton: string;
};
export declare const builtInMap: {
    Input: import("react").ForwardRefExoticComponent<import("@arco-design/web-react").InputProps & import("react").RefAttributes<import("@arco-design/web-react/es/Input").RefInputType> & import("@arco-design/web-react/es/_util/hooks/useMergeProps").MergePropsOptions> & {
        Search: import("react").ForwardRefExoticComponent<import("@arco-design/web-react/es/Input").InputSearchProps & import("react").RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
        TextArea: import("react").ForwardRefExoticComponent<import("@arco-design/web-react").TextAreaProps & import("react").RefAttributes<import("@arco-design/web-react/es/Input").RefTextAreaType>>;
        Password: import("react").ForwardRefExoticComponent<import("@arco-design/web-react/es/Input").InputPasswordProps & import("react").RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
        Group: import("react").ForwardRefExoticComponent<import("@arco-design/web-react/es/Input/interface").InputGroupProps & {
            children?: import("react").ReactNode;
        } & import("react").RefAttributes<HTMLDivElement>>;
    };
    InputTag: import("react").ForwardRefExoticComponent<import("@arco-design/web-react").InputTagProps<any> & import("react").RefAttributes<{
        focus: () => void;
        blur: () => void;
    }>>;
    Select: import("react").ForwardRefExoticComponent<import("@arco-design/web-react").SelectProps & import("react").RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>> & {
        Option: import("react").ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionProps & import("react").RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTION__?: boolean | undefined;
        };
        OptGroup: import("react").ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionGroupProps & import("react").RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTGROUP__?: boolean | undefined;
        };
    };
    InputNumber: import("react").ForwardRefExoticComponent<import("@arco-design/web-react").InputNumberProps & import("react").RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
    "Input.TextArea": import("react").ForwardRefExoticComponent<import("@arco-design/web-react").TextAreaProps & import("react").RefAttributes<import("@arco-design/web-react/es/Input").RefTextAreaType>>;
    Radio: typeof Radio;
    "Radio.Group": typeof import("@arco-design/web-react/es/Radio/group").default;
    Switch: import("react").ForwardRefExoticComponent<import("@arco-design/web-react").SwitchProps & import("react").RefAttributes<unknown>> & {
        __BYTE_SWITCH: boolean;
    };
    Rate: import("react").ForwardRefExoticComponent<import("@arco-design/web-react").RateProps & import("react").RefAttributes<unknown>>;
    Slider: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<import("@arco-design/web-react").SliderProps & import("react").RefAttributes<unknown>>>;
    TimePicker: import("@arco-design/web-react/es/TimePicker/interface").TimePickerDecorator;
    "TimePicker.RangePicker": import("react").ComponentClass<import("@arco-design/web-react").TimeRangePickerProps, any>;
    Cascader: import("react").FC<import("react").PropsWithChildren<CascaderProps<any>>>;
    Checkbox: import("react").FC<import("react").PropsWithChildren<CheckboxProps<any>>>;
};
