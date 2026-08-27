import type { FC } from 'react';
import type { BaseButtonProps } from '../BaseButton';
import type { UndoType } from '../../../../types';
export interface UndoButtonProps extends Omit<BaseButtonProps, 'onClick'> {
    /**
     * 撤销类型: 撤销上一步操作 | 撤销全部操作
     * @defaultValue 'LastStep'
     */
    type?: UndoType;
}
export declare const UndoButton: FC<UndoButtonProps>;
