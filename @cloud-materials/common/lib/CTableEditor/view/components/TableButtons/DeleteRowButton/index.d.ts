import type { FC } from 'react';
import type { BaseButtonProps } from '../BaseButton';
import type { TableEditor } from '../../../../model/TableEditor';
export interface DeleteRowButtonProps extends Omit<BaseButtonProps, 'onClick'> {
    /**
     * 删除行后的回调
     * @param rowData 被删除的行
     * @param tableEditor tableEditor实例
     * @returns
     */
    onDelete?: (rowData: Record<string, any>[], tableEditor: TableEditor) => void;
}
export declare const DeleteRowButton: FC<DeleteRowButtonProps>;
