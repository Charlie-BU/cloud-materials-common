import type { FC } from 'react';
import React from 'react';
import type { BaseButtonProps } from '../BaseButton';
import { BaseButton } from '../BaseButton';
import type { TableEditor } from '../../../../model/TableEditor';
import { IconPlusCircle } from '@arco-design/web-react/icon';
import { transformFormValuesToArray } from '../../../../utils';
import { useCConfigContext } from '../../../../../CConfigProvider';
import { testId } from '../../../../testId';

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

export const SubmitButton: FC<SubmitButtonProps> = props => {
  const { onSubmit, onValidateError, icon = <IconPlusCircle />, text: _text, ...restProps } = props;

  const { locale } = useCConfigContext();

  const text = _text || locale.CTableEditor.submit;

  const handleClick = (tableEditor: TableEditor) => {
    tableEditor.form
      .submit()
      .then((values: any) => {
        // 2023-09-21更新，改为读取 initTotalData，因为 initTotalData 才是 table 的全量数据，totalData 只是当前数据（比如受控模式下筛选了就会改变）
        const v = transformFormValuesToArray(values, tableEditor.table.initTotalData);
        onSubmit?.(v, tableEditor);
      })
      .catch((e: Error) => {
        onValidateError?.(e);
        console.warn('校验失败, error:', e);
      });
  };

  return (
    <BaseButton
      icon={icon}
      text={text}
      disabled={tableEditor => !tableEditor?.hasChanged}
      {...restProps}
      onClick={handleClick}
      testId={testId.submitButton}
    />
  );
};
