import type { FC } from 'react';
import type { BaseButtonProps } from '../BaseButton';
import type { TableEditor } from '../../../../model/TableEditor';
export interface SwitchButtonProps extends Omit<BaseButtonProps, 'onClick'> {
    /**
     * 切换编辑态后的回调
     * @param editable
     * @param tableEditor
     * @returns
     */
    onSwitch?: (editable: boolean, tableEditor: TableEditor) => void;
}
export declare const SwitchButton: FC<SwitchButtonProps>;
