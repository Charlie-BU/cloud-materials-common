import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Radio } from '@arco-design/web-react';
import type { CRadioProps, CRadioGroupProps } from './interface';
import classNames from 'classnames';
import { maxBy, isObject, isArray } from 'lodash-es';
import { renderValidChildren } from '../_utils/renderValidChildren';
import { CConfigContext } from '../CConfigProvider';
import { testId } from './utils';
import GroupConfigContext from './context';
import { CRadio } from './CRadio';

const Group = Radio.Group;

export const CGroup = (props: React.PropsWithChildren<CRadioGroupProps>) => {
  const {
    className,
    textLineType = 'single',
    type = 'button',
    heightSize,
    widthSize: widthSizeInProp,
    autoWidth,
    disabled,
    options,
    checkedStyle,
    iconLayout = 'left',
    horizontalLayout = 'center',
    radioProps,
    ...restProps
  } = props;

  const { useCssPrefix } = useContext(CConfigContext);
  const isButtonRadio = type === 'button';
  // CRadio特有样式
  const prefixCls = useCssPrefix('radio');
  // 分段选择器通用样式
  const btnSelectorCommonPrefixCls = useCssPrefix('btn-selector-common');
  // 宽度
  const [widthSize, setWidthSize] = useState(widthSizeInProp);
  // Group组件接收的配置
  const contextValue = useMemo(() => {
    return {
      textLineType,
      radioProps,
      horizontalLayout,
      iconLayout,
      widthSize: widthSize,
      heightSize,
      type,
    };
  }, [widthSize, heightSize, textLineType, radioProps, horizontalLayout, iconLayout, type]);

  const RadioListRef = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    if (autoWidth === 'groupAdaptive') {
      const maxLength = maxBy(RadioListRef.current, item => item.offsetWidth)?.offsetWidth;
      if (maxLength && maxLength > 0) setWidthSize(maxLength);
    }
  }, [autoWidth]);

  const cs = classNames(
    prefixCls``,
    prefixCls`group`,
    {
      [btnSelectorCommonPrefixCls``]: isButtonRadio, // 分段选择器通用样式
      [prefixCls`checked-style-${checkedStyle}`]: isButtonRadio && !!checkedStyle,
      [btnSelectorCommonPrefixCls`height-size`]: isButtonRadio,
      [btnSelectorCommonPrefixCls`height-size-small`]: isButtonRadio && heightSize === 'small',
      [btnSelectorCommonPrefixCls`width-size`]: isButtonRadio,
      [btnSelectorCommonPrefixCls`width-size-${widthSize}`]:
        isButtonRadio && !!widthSize && typeof widthSize === 'string',
    },
    className,
  );

  return (
    <GroupConfigContext.Provider value={contextValue}>
      <Group
        {...restProps}
        type={type}
        disabled={disabled}
        className={cs}
        data-cy={testId.groupContainer}
        data-testid={testId.groupContainer}
      >
        {options && isArray(options)
          ? options.map((optionItem, index) => {
              const option = isObject(optionItem) ? optionItem : { value: optionItem, label: optionItem };
              return (
                <CRadio
                  ref={(dom: HTMLDivElement) => RadioListRef.current.push(dom)}
                  key={option.value}
                  data-inner-option={optionItem}
                  data-inner-index={index}
                  disabled={option.disabled || disabled}
                  value={option.value}
                  tag={option.tag}
                  CTagProps={option.CTagProps}
                  arcoPopoverProps={option.arcoPopoverProps}
                />
              );
            })
          : renderValidChildren<CRadioProps<any> & { ref?: React.ForwardedRef<HTMLDivElement> }>(props.children, {
              ref: (dom: HTMLDivElement) => RadioListRef.current.push(dom),
            })}
      </Group>
    </GroupConfigContext.Provider>
  );
};
