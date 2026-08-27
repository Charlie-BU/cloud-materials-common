import React from 'react';
import type { CInlineEditProps } from '../../../../CInlineEdit/interface';
interface Props extends Omit<CInlineEditProps, 'value' | 'onSubmit'> {
    value?: any;
    onChange?: (value: any) => void;
    /**如果配置了 onSubmit，则会接管组件的默认 onChange 行为，用户需要在 onSubmit 中处理提交逻辑 */
    onSubmit?: (value: any, oldValue: any, /** 父组件下发的 onChange */ onChange: (v: any) => void) => void;
}
export declare const EditableCell: React.FC<Props>;
export {};
