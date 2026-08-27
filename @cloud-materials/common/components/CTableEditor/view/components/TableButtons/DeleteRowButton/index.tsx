import type { FC } from 'react';
import React from 'react';
import type { BaseButtonProps } from '../BaseButton';
import { BaseButton } from '../BaseButton';
import type { TableEditor } from '../../../../model/TableEditor';
import { IconCloseCircle } from '@arco-design/web-react/icon';
import cls from 'classnames';
import { useCConfigContext } from '../../../../../CConfigProvider';
import { usePrefix } from '../../../hooks/usePrefix';
import { testId } from '../../../../testId';

export interface DeleteRowButtonProps extends Omit<BaseButtonProps, 'onClick'> {
  /**
   * 删除行后的回调
   * @param rowData 被删除的行
   * @param tableEditor tableEditor实例
   * @returns
   */
  onDelete?: (rowData: Record<string, any>[], tableEditor: TableEditor) => void;
}

export const DeleteRowButton: FC<DeleteRowButtonProps> = props => {
  const { onDelete, icon = <IconCloseCircle />, text: _text, className, ...restProps } = props;

  const { locale } = useCConfigContext();
  const prefixCls = usePrefix('delete-row-button');

  const text = _text || locale.CTableEditor.deleteRow;

  const handleClick = (tableEditor: TableEditor) => {
    const rowData = tableEditor.deleteRows();
    onDelete?.(rowData, tableEditor);
  };

  return (
    <BaseButton
      icon={icon}
      text={text}
      disabled={tableEditor => !tableEditor.table.selectedRowKeys.length}
      className={cls(prefixCls, className)}
      {...restProps}
      onClick={handleClick}
      testId={testId.deleteRowButton}
    />
  );
};
