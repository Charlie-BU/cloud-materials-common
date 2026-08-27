import type { FC } from 'react';
import type { BaseButtonProps } from '../BaseButton';
import type { TableEditor } from '../../../../model/TableEditor';
export interface SubmitButtonProps extends Omit<BaseButtonProps, 'onClick'> {
    /**
     * TableEditor 内部表单校验通过后的回调
     * @param values
     * @param tableEditor
     * @returns
     */
    onSubmit?: (values: Record<string, any>, tableEditor: TableEditor) => void;
    /**
     * 校验失败的回调
     * @param error
     * @returns
     */
    onValidateError?: (error: Error) => void;
}
export declare const SubmitButton: FC<SubmitButtonProps>;
