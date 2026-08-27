import type { ReactText } from 'react';
import React, { useEffect, useRef, useState, useContext, useMemo } from 'react';
import { Checkbox } from '@arco-design/web-react';
import type { CCheckboxGroupProps, CCheckboxProps } from './interface';
import classNames from 'classnames';
import { maxBy, isObject, isArray } from 'lodash-es';
import { renderValidChildren } from '../_utils/renderValidChildren';
import { CConfigContext } from '../CConfigProvider';
import { testId } from './utils';
import { GroupConfigContext } from './context';
import { CCheckbox } from './CCheckbox';

const Group = Checkbox.Group;

export const CGroup = <T extends ReactText>(props: React.PropsWithChildren<CCheckboxGroupProps<T>>) => {
  const {
    className,
    textLineType = 'single',
    heightSize,
    widthSize: widthSizeInProp,
    autoWidth,
    disabled,
    options,
    checkboxProps,
    iconLayout = 'left',
    horizontalLayout = 'center',
    ...restProps
  } = props;

  const { useCssPrefix } = useContext(CConfigContext);
  // CCheckbox特有样式
  const prefixCls = useCssPrefix('checkbox');
  // 分段选择器通用样式
  const btnSelectorCommonPrefixCls = useCssPrefix('btn-selector-common');

  const [widthSize, setWidthSize] = useState(widthSizeInProp);
  // Group组件接收的配置
  const contextValue = useMemo(() => {
    return {
      textLineType,
      checkboxProps,
      horizontalLayout,
      iconLayout,
      widthSize: widthSize,
      heightSize,
    };
  }, [widthSize, heightSize, textLineType, checkboxProps, horizontalLayout, iconLayout]);

  const CheckboxListRef = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    if (autoWidth === 'groupAdaptive') {
      const maxLength = maxBy(CheckboxListRef.current, item => item.offsetWidth)?.offsetWidth;
      if (maxLength && maxLength > 0) setWidthSize(maxLength);
    }
  }, [autoWidth]);

  const cs = classNames(
    prefixCls``,
    prefixCls`group`,
    btnSelectorCommonPrefixCls``, // 分段选择器通用样式
    {
      [prefixCls`height-size`]: true,
      [prefixCls`height-size-small`]: heightSize === 'small',
      [btnSelectorCommonPrefixCls`height-size`]: true,
      [btnSelectorCommonPrefixCls`height-size-small`]: heightSize === 'small',
      [btnSelectorCommonPrefixCls`width-size`]: true,
      [btnSelectorCommonPrefixCls`width-size-${widthSize}`]: !!widthSize && typeof widthSize === 'string',
    },
    className,
  );

  return (
    <GroupConfigContext.Provider value={contextValue}>
      <div data-cy={testId.groupContainer} data-testid={testId.groupContainer} className={cs}>
        <Group disabled={disabled} {...restProps}>
          {options && isArray(options)
            ? options.map((optionItem, index) => {
                const option = isObject(optionItem) ? optionItem : { value: optionItem, label: optionItem };
                return (
                  <CCheckbox
                    // 仅通过Group的option属性来配置多选组时，才能支持同组内自适应
                    ref={(dom: HTMLDivElement) => CheckboxListRef.current.push(dom)}
                    key={option.value}
                    data-inner-index={index}
                    data-inner-option={optionItem}
                    disabled={option.disabled || disabled}
                    value={option.value}
                    tag={option.tag}
                    CTagProps={option.CTagProps}
                    arcoPopoverProps={option.arcoPopoverProps}
                  />
                );
              })
            : renderValidChildren<CCheckboxProps & { ref?: React.ForwardedRef<HTMLDivElement> }>(props.children, {
                ref: (dom: HTMLDivElement) => CheckboxListRef.current.push(dom),
              })}
        </Group>
      </div>
    </GroupConfigContext.Provider>
  );
};
