import React from 'react';
import type { CListEditorProps } from './interface';
declare const CListEditor: import("../_factory/builtInComponent/interface").BuiltInType<React.FC<CListEditorProps>, {
    Input: React.ForwardRefExoticComponent<import("@arco-design/web-react").InputProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType> & import("@arco-design/web-react/es/_util/hooks/useMergeProps").MergePropsOptions> & {
        Search: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input").InputSearchProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
        TextArea: React.ForwardRefExoticComponent<import("@arco-design/web-react").TextAreaProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefTextAreaType>>;
        Password: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input").InputPasswordProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
        Group: React.ForwardRefExoticComponent<import("@arco-design/web-react/es/Input/interface").InputGroupProps & {
            children?: React.ReactNode;
        } & React.RefAttributes<HTMLDivElement>>;
    };
    InputTag: React.ForwardRefExoticComponent<import("@arco-design/web-react").InputTagProps<any> & React.RefAttributes<{
        focus: () => void;
        blur: () => void;
    }>>;
    Select: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectProps & React.RefAttributes<import("@arco-design/web-react/es/Select/interface").SelectHandle>> & {
        Option: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionProps & React.RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTION__?: boolean | undefined;
        };
        OptGroup: React.ForwardRefExoticComponent<import("@arco-design/web-react").SelectOptionGroupProps & React.RefAttributes<unknown>> & {
            __ARCO_SELECT_OPTGROUP__?: boolean | undefined;
        };
    };
    InputNumber: React.ForwardRefExoticComponent<import("@arco-design/web-react").InputNumberProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefInputType>>;
    "Input.TextArea": React.ForwardRefExoticComponent<import("@arco-design/web-react").TextAreaProps & React.RefAttributes<import("@arco-design/web-react/es/Input").RefTextAreaType>>;
    Radio: typeof import("@arco-design/web-react/es/Radio/radio").default;
    "Radio.Group": typeof import("@arco-design/web-react/es/Radio/group").default;
    Switch: React.ForwardRefExoticComponent<import("@arco-design/web-react").SwitchProps & React.RefAttributes<unknown>> & {
        __BYTE_SWITCH: boolean;
    };
    Rate: React.ForwardRefExoticComponent<import("@arco-design/web-react").RateProps & React.RefAttributes<unknown>>;
    Slider: React.MemoExoticComponent<React.ForwardRefExoticComponent<import("@arco-design/web-react").SliderProps & React.RefAttributes<unknown>>>;
    TimePicker: import("@arco-design/web-react/es/TimePicker/interface").TimePickerDecorator;
    "TimePicker.RangePicker": React.ComponentClass<import("@arco-design/web-react").TimeRangePickerProps, any>;
    Cascader: React.FC<React.PropsWithChildren<import("@arco-design/web-react").CascaderProps<any>>>;
    Checkbox: React.FC<React.PropsWithChildren<import("@arco-design/web-react").CheckboxProps<any>>>;
}>;
export default CListEditor;
