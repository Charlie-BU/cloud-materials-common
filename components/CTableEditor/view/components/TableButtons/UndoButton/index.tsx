import type { FC } from 'react';
import React from 'react';
import type { BaseButtonProps } from '../BaseButton';
import { BaseButton } from '../BaseButton';
import type { TableEditor } from '../../../../model/TableEditor';
import type { UndoType } from '../../../../types';
import { IconClose } from '@arco-design/web-react/icon';
import { useCConfigContext } from '../../../../../CConfigProvider';
import { testId } from '../../../../testId';

export interface UndoButtonProps extends Omit<BaseButtonProps, 'onClick'> {
  /**
   * 撤销类型: 撤销上一步操作 | 撤销全部操作
   * @defaultValue 'LastStep'
   */
  type?: UndoType;
}

export const UndoButton: FC<UndoButtonProps> = props => {
  const { icon = <IconClose />, text: _text, type = 'LastStep', ...restProps } = props;

  const { locale } = useCConfigContext();

  const text = _text || locale.CTableEditor.undo;

  const handleClick = (tableEditor: TableEditor) => {
    tableEditor.undo({ type });
  };

  return (
    <BaseButton
      icon={icon}
      text={text}
      disabled={tableEditor => {
        if (type === 'AllSteps') {
          return !tableEditor.hasChanged;
        }
        return !tableEditor.hasActionHistory;
      }}
      {...restProps}
      onClick={handleClick}
      testId={testId.undoButton}
    />
  );
};
