import React from 'react';
import type { SelectProps } from '@arco-design/web-react';
import { Select } from '@arco-design/web-react';
import { isStringOrNumber } from './utils';
import { useCConfigContext } from '../CConfigProvider';
import type { CRelationProps } from './interface';
import classNames from 'classnames';
import CTag from '../CTag';

type Option = Exclude<SelectProps['options'], undefined>[0];
type FixedTwoArray<T> = [T, T];

/**
 * 逻辑关系选择
 */
export function CRelation(props: CRelationProps): React.ReactElement {
  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix('conditions-relation');
  const defaultOptions = [
    { label: locale.CConditions.and, value: 'and' },
    { label: locale.CConditions.or, value: 'or' },
  ];

  const {
    readonly = false,
    disabled = false,
    size = readonly ? 'small' : 'default',
    value,
    onChange,
    style,
    className,
    children,
    options = children ? undefined : defaultOptions,
  } = props;

  const getSelectedDisplayValue = () => {
    const selected = (options as NonNullable<SelectProps['options']>).find(
      item => (isStringOrNumber(item) ? item : item.value) === value,
    );
    return (
      <span className={classNames(cssPrefix`card`, size === 'small' && cssPrefix`small`)}>
        {isStringOrNumber(selected) ? selected : selected?.label}
      </span>
    );
  };

  const isAnd = isStringOrNumber(options?.[0]) ? options?.[0] === 'and' : options?.[0]?.value === 'and';

  return (
    <div className={classNames(cssPrefix``, className)} style={style}>
      <div className={classNames(cssPrefix`upper-line`, readonly && cssPrefix`view`)} />
      {options ? (
        readonly ? (
          getSelectedDisplayValue()
        ) : options.length === 1 ? (
          <CTag
            size="large"
            type="bordered"
            className={classNames(
              cssPrefix`card`,
              size === 'small' && cssPrefix`small`,
              isAnd ? cssPrefix`first-color` : cssPrefix`second-color`,
              cssPrefix`one-option`,
            )}
          >
            {isStringOrNumber(options[0]) ? options[0] : options[0]?.label}
          </CTag>
        ) : options.length === 2 ? (
          <Toggle
            size={size}
            disabled={disabled}
            options={options as FixedTwoArray<Option>}
            value={value}
            onChange={onChange}
          />
        ) : (
          <Select
            className={cssPrefix`select`}
            disabled={disabled}
            options={options}
            value={value}
            onChange={onChange}
          />
        )
      ) : (
        children
      )}
      <div className={classNames(cssPrefix`lower-line`, readonly && cssPrefix`view`)} />
    </div>
  );
}

/** 逻辑关系切换卡片 */
export const Toggle = (props: {
  size?: 'small' | 'default';
  disabled?: boolean;
  options: FixedTwoArray<Option>;
  value?: string | number;
  onChange?: (val: string | number) => void;
}): React.ReactElement => {
  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix('conditions-relation');
  const { size = 'default', disabled = false, options, value, onChange } = props;
  const values = options.map(item => (isStringOrNumber(item) ? item : item.value));
  return (
    <div
      className={classNames(cssPrefix`toggle`, value === values[1] && cssPrefix`flipped`)}
      onClick={() => !disabled && onChange?.(value !== values[0] ? values[0] : values[1])}
    >
      <CTag
        cEllipsisProps={{
          showPopover: true,
          popoverContent: `${locale.CConditions.clickSwitch}“${
            isStringOrNumber(options[1]) ? options[1] : options[1]?.label
          }”`,
        }}
        size="large"
        type="bordered"
        className={classNames(cssPrefix`card`, size === 'small' && cssPrefix`small`, cssPrefix`first`)}
      >
        {isStringOrNumber(options[0]) ? options[0] : options[0]?.label}
      </CTag>

      <CTag
        cEllipsisProps={{
          showPopover: true,
          popoverContent: `${locale.CConditions.clickSwitch}“${
            isStringOrNumber(options[0]) ? options[0] : options[0]?.label
          }”`,
        }}
        size="large"
        type="bordered"
        className={classNames(cssPrefix`card`, size === 'small' && cssPrefix`small`, cssPrefix`second`)}
      >
        {isStringOrNumber(options[1]) ? options[1] : options[1]?.label}
      </CTag>
    </div>
  );
};

CRelation.displayName = 'CRelation';
export default CRelation;
