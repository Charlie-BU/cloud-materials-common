import type { FC } from 'react';
import React from 'react';
import type { BaseButtonProps } from '../BaseButton';
import { BaseButton } from '../BaseButton';
import type { TableEditor } from '../../../../model/TableEditor';
import { IconPlusCircle } from '@arco-design/web-react/icon';
import { useCConfigContext } from '../../../../../CConfigProvider';
import { testId } from '../../../../testId';

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

export const AddRowButton: FC<AddRowButtonProps> = props => {
  const { addRow, onAdd, icon = <IconPlusCircle />, text: _text, position = 'bottom', ...restProps } = props;

  const { locale } = useCConfigContext();

  const text = _text || locale.CTableEditor.addRow;

  const handleClick = (tableEditor: TableEditor) => {
    const data = addRow(tableEditor);
    const rowData = tableEditor.addRow(data, { position });
    onAdd?.(rowData, tableEditor);
  };

  return <BaseButton icon={icon} text={text} {...restProps} onClick={handleClick} testId={testId.addRowButton} />;
};
