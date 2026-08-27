import type { FC } from 'react';
import React from 'react';
import type { BaseButtonProps } from '../BaseButton';
import { BaseButton } from '../BaseButton';
import type { TableEditor } from '../../../../model/TableEditor';
import { useCConfigContext } from '../../../../../CConfigProvider';
import { testId } from '../../../../testId';

export interface SwitchButtonProps extends Omit<BaseButtonProps, 'onClick'> {
  /**
   * 切换编辑态后的回调
   * @param editable
   * @param tableEditor
   * @returns
   */
  onSwitch?: (editable: boolean, tableEditor: TableEditor) => void;
}

export const SwitchButton: FC<SwitchButtonProps> = props => {
  const { onSwitch, icon = null, text: _text, ...restProps } = props;

  const { locale } = useCConfigContext();

  const text = _text || locale.CTableEditor.switch;

  const handleClick = (tableEditor: TableEditor) => {
    const nextState = tableEditor.switchEditable();
    onSwitch?.(nextState, tableEditor);
  };

  return <BaseButton icon={icon} text={text} {...restProps} onClick={handleClick} testId={testId.switchButton} />;
};
