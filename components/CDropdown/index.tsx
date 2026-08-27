import React, { useMemo } from 'react';
import { Dropdown, Menu } from '@arco-design/web-react';
import { IconDown } from '@arco-design/iconbox-react-ve-o-design';
import { useControlledValue } from '../hooks/useControlledValue';
import { omit } from 'lodash-es';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import type { JSXElementConstructor, ComponentProps } from 'react';
import type { CDropdownProps } from './interface';

const cssPrefix = classNamePrefixFactory('cdropdown');
export const testId = {
  popover: cssPrefix`popover`,
  component: cssPrefix`component`,
};

function CStatusDropdown<T extends JSXElementConstructor<any>, ValueKey extends keyof ComponentProps<T>>(
  props: CDropdownProps<T, ValueKey>,
) {
  const { component, labelKey = '', valueKey = '', options = [], onChange, ...restProps } = props;
  const filterOptions = useMemo(() => options.filter(Boolean), [options]);

  const [value, setValue] = useControlledValue(props);

  const index = useMemo(() => {
    const result = filterOptions.findIndex(item => item?.[valueKey] === value);

    return result >= 0 ? result : undefined;
  }, [filterOptions, valueKey, value]);

  const handleChange = (index: number) => {
    const record = filterOptions[index];
    const value = record[valueKey];
    setValue(value);
    onChange?.(value);
  };

  const dropList = (
    <Menu onClickMenuItem={key => handleChange(Number(key))}>
      {filterOptions.map((item, index) => (
        <Menu.Item key={index.toString()}>{item?.[labelKey]}</Menu.Item>
      ))}
    </Menu>
  );

  const currentOption = useMemo(() => {
    if (typeof index === 'number') {
      const option = filterOptions[index];

      let element = option[labelKey];
      if (!!element) {
        element = (
          <>
            {element}
            <IconDown style={{ marginLeft: 4 }} />
          </>
        );
      }

      return {
        ...option,
        [labelKey]: element,
      };
    } else {
      return undefined;
    }
  }, [filterOptions, index, labelKey]);

  return (
    <Dropdown {...omit(restProps, ['value', 'defaultValue'])} droplist={dropList}>
      <span style={{ cursor: 'pointer' }} data-testid={testId.component} data-cy={testId.component}>
        {!!currentOption && !!component && React.createElement(component, currentOption)}
      </span>
    </Dropdown>
  );
}

CStatusDropdown.displayName = 'CStatusDropdown';

export default CStatusDropdown;
