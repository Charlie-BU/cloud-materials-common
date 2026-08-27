import { observer, useField } from '@formily/react';
import React, { useContext, useEffect } from 'react';
import type { Field } from '@formily/core';
import Agreement from '../../../../CAgreement';
import type { CAgreementProps } from '../../../../CAgreement/interface';
import { CConfigContext } from '../../../../CConfigProvider';
import classNames from 'classnames';

/**
 * 服务条款同意组件
 */
const CAgreement: React.FC<CAgreementProps> = observer(props => {
  const { useCssPrefix, locale } = useContext(CConfigContext);
  const cssPrefix = useCssPrefix('form-agreement');
  const field = useField() as Field;
  // 协议组件在 确认页 或者 卡片 中使用时，有上下的边距为16px。但在FormItem场景下需要调整这个边距。
  let dynamicMarginClass = cssPrefix`common`;

  useEffect(() => {
    // 设置自定义校验，协议字段为false或undefined时，不允许提交
    field.setValidator(value => {
      if (!value) {
        return locale.CAgreement.defaultErrorToolTip;
      }
    });
    // 设置required，用于展示 FormItem场景下 label 前面的星号
    field.setRequired(true);
  }, [field]);

  useEffect(() => {
    // 强制设置 help 为空格，在错误状态下，FormItem会自动添加错误的message信息进行展示，CAgreement组件需要自定义错误展示形式。
    if (field?.decoratorType?.displayName === 'FormItem') {
      field.decoratorProps = { ...field.decoratorProps, help: ' ' };
    }
  }, [field.validateStatus]);

  if (field?.decoratorType?.displayName === 'FormItem') {
    dynamicMarginClass = cssPrefix`formItem`;
  }

  return (
    <Agreement
      validateStatusError={!!field.validateStatus}
      {...props}
      className={classNames(cssPrefix``, dynamicMarginClass, props?.className)}
      style={props.style}
    />
  );
});

export default CAgreement;
