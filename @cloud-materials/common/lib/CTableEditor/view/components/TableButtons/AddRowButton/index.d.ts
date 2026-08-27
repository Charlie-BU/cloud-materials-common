import type { FC } from 'react';
import type { BaseButtonProps } from '../BaseButton';
import type { TableEditor } from '../../../../model/TableEditor';
export interface AddRowButtonProps extends Omit<BaseButtonProps, 'onClick'> {
    /**
     * 自定义新增行函数，返回值为新增行的值
     * @param tableEditor tableEditor 实例
     * @returns
     */
    addRow: (tableEditor: TableEditor) => Record<string, any>;
    /**
     * 新增行后的回调
     * @param rowData 新增的行
     * @param tableEditor tableEditor 实例
     * @returns
     */
    onAdd?: (rowData: Record<string, any>, tableEditor: TableEditor) => void;
    /**
     * 新增的数据是放在顶部还是底部
     * @defaultValue 'bottom'
     */
    position?: 'top' | 'bottom';
}
export declare const AddRowButton: FC<AddRowButtonProps>;
