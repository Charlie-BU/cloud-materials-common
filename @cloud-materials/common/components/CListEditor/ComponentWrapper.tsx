import type { ReactElement } from 'react';
import React, { useEffect } from 'react';
import type { ComponentProps, ComponentWrapperProps } from './interface';
import { Input, InputTag, Select } from '@arco-design/web-react';
import CPopoverVerify from '../CPopoverVerify';
import { useCConfigContext } from '../CConfigProvider';
import type { CLocale } from '../locales/default';
import { useBuiltIn } from '../_factory/builtInComponent';
import type { DefineBuiltInHybridListType } from '../_factory/builtInComponent';
import type { builtInMap } from './constant';

enum ComponentEnum {
  'input-rules' = 'input-rules',
  input = 'input',
  'input-multiple-rules' = 'input-multiple-rules',
  'input-multiple' = 'input-multiple',
  'select-rules' = 'select-rules',
  select = 'select',
}

const renderComponent = ({
  rules,
  width,
  disabled,
  popoverVerify,
  cAsyncSelectProps,
  listEditorCls,
  locale,
  arcoInputProps,
  arcoInputTagProps,
  ...rest
}: ComponentProps & {
  locale: CLocale;
  listEditorCls: string;
}) => ({
  'input-rules': (
    <CPopoverVerify
      rules={rules}
      {...rest}
      arcoPopoverProps={{ position: 'bottom' }}
      {...(typeof popoverVerify === 'object' ? popoverVerify : {})}
    >
      <Input placeholder={locale.CListEditor.placeholder} style={{ width }} disabled={disabled} {...arcoInputProps} />
    </CPopoverVerify>
  ),
  input: (
    <Input
      placeholder={locale.CListEditor.placeholder}
      style={{ width }}
      {...rest}
      disabled={disabled}
      {...arcoInputProps}
    />
  ),
  'input-multiple-rules': (
    <CPopoverVerify rules={rules} {...rest} {...(typeof popoverVerify === 'object' ? popoverVerify : {})}>
      <InputTag
        style={{ width }}
        placeholder={locale.CListEditor.placeholder}
        className={`${listEditorCls}-component-inputTag`}
        disabled={disabled}
        {...arcoInputTagProps}
      />
    </CPopoverVerify>
  ),
  'input-multiple': (
    <InputTag
      style={{ width }}
      disabled={disabled}
      placeholder={locale.CListEditor.placeholder}
      className={`${listEditorCls}-component-inputTag`}
      {...arcoInputTagProps}
      {...rest}
    />
  ),
  'select-rules': (
    <CPopoverVerify
      {...rest}
      rules={rules}
      {...(typeof popoverVerify === 'object' ? popoverVerify : {})}
      arcoPopoverProps={{ disabled: true }}
    >
      <Select
        placeholder={locale.CListEditor.selectPlaceholder}
        style={{ width, minWidth: 83 }}
        disabled={disabled}
        {...cAsyncSelectProps}
      />
    </CPopoverVerify>
  ),
  select: (
    <Select
      placeholder={locale.CListEditor.selectPlaceholder}
      style={{ width }}
      {...rest}
      disabled={disabled}
      {...cAsyncSelectProps}
    />
  ),
});

const ComponentWrapper = (props: ComponentWrapperProps) => {
  const {
    component,
    index,
    label,
    disabled,
    changeListValue,
    handleEditingDisableVerify,
    triggerPropName = 'value',
    multiple,
    rules = [],
    popoverVerify,
    itemOptions,
    ...rest
  } = props;

  const { locale, getCPrefixCls } = useCConfigContext();
  const listEditorCls = getCPrefixCls('list-editor');
  const { renderBuiltIn } = useBuiltIn();

  useEffect(() => {
    changeListValue(`[${index}].${label}`, rest[triggerPropName]);
    handleEditingDisableVerify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rest[triggerPropName]]);

  const com = renderComponent({
    rules,
    popoverVerify,
    disabled,
    locale,
    listEditorCls,
    ...rest,
    ...itemOptions,
  })[
    `${component}${multiple ? '-multiple' : ''}${
      rules?.length && Boolean(popoverVerify) ? '-rules' : ''
    }` as ComponentEnum
  ];
  if (com) {
    return com;
  }

  if (React.isValidElement(component)) {
    if (rules?.length && Boolean(popoverVerify)) {
      return (
        <CPopoverVerify
          rules={rules}
          {...rest}
          {...itemOptions}
          {...(typeof popoverVerify === 'object' ? popoverVerify : {})}
        >
          {React.cloneElement(component as ReactElement, { disabled, autoFocus: true })}
        </CPopoverVerify>
      );
    }
    return React.cloneElement(component as ReactElement, { disabled, ...rest });
  }

  if (rules?.length && Boolean(popoverVerify)) {
    return (
      <CPopoverVerify
        rules={rules}
        {...rest}
        {...itemOptions}
        {...(typeof popoverVerify === 'object' ? popoverVerify : {})}
      >
        {
          renderBuiltIn(component as DefineBuiltInHybridListType<typeof builtInMap>, {
            commonProps: { disabled, ...rest, ...itemOptions },
          }) as ReactElement
        }
      </CPopoverVerify>
    );
  }

  return (
    <>
      {renderBuiltIn(component as DefineBuiltInHybridListType<typeof builtInMap>, {
        commonProps: { disabled, ...rest, ...itemOptions },
      })}
    </>
  );
};

export default ComponentWrapper;
