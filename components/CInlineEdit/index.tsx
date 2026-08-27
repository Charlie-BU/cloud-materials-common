import type { ReactElement } from 'react';
import React, { cloneElement, Fragment, isValidElement, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { Input, InputNumber, Popover, Select, Spin } from '@arco-design/web-react';
import CEllipsis from '../CEllipsis';
import CPopoverVerify from '../CPopoverVerify';
import type { CPopoverVerifyProps } from '../CPopoverVerify/interface';
import { IconCheck, IconClose, IconEdit } from '@arco-design/web-react/icon';
import { identity, isEmpty, isNil, isPlainObject, noop } from 'lodash-es';
import type { CInlineEditProps, CInlineEditGlobalConfig } from './interface';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { useEdit } from '../hooks';
import { useCConfigContext } from '../CConfigProvider';
import createBuiltInComponent, { useBuiltIn } from '../_factory/builtInComponent';

const { TextArea } = Input;

const builtInMap = {
  Input,
  InputNumber,
  TextArea,
  Select,
};

export type BuiltInCpnType = typeof builtInMap;

const defaultOptBtnConfig = {
  btnType: 'icon',
  submitText: '',
  cancelText: '',
};

const cssRoot = classNamePrefixFactory('inline-edit');
export const testId = {
  container: cssRoot`container`,
  editIcon: cssRoot`editIcon`,
  submitOpt: cssRoot`submitOpt`,
  cancelOpt: cssRoot`cancelOpt`,
  input: cssRoot`input`,
  textarea: cssRoot`textarea`,
  inputnumber: cssRoot`inputnumber`,
  select: cssRoot`select`,
};

let globalConfig: CInlineEditGlobalConfig;

function CInlineEdit<T = string>(props: CInlineEditProps<T>) {
  const {
    value,
    renderFormat = identity,
    emptyData = '-',
    CEllipsisProps,
    showEditIcon = true,
    bizType,
    children,
    operationButton = defaultOptBtnConfig,
    initEditable = false,
    field = {
      component: 'Input',
    },
    onSubmit,
    onCancel = noop,
    fieldType = 'Input',
    options,
    arcoInputProps,
    arcoSelectProps,
    arcoTextareaProps,
    arcoInputNumberProps,
    arcoPopoverProps,
    disabled = false,
    disabledTips = '',
    asyncValidator,
    enableAsyncValidateWhenBlur = false,
    rules,
    style,
    className,
    suffix,
    editTips = '',
  } = props;
  const { renderBuiltIn } = useBuiltIn();
  const { locale, useCssPrefix } = useCConfigContext();
  const iconCls = useCssPrefix('')`icon`;
  const cssPrefix = useCssPrefix('inline-edit');
  const config = isPlainObject(globalConfig) && bizType ? globalConfig[bizType] : null;
  const curRules = rules ?? config?.rules;
  const [{ editing, editValue, submitting, valid }, { startEditing, setEditValue, handleSubmit, handleCancel }] =
    useEdit({
      value,
      initEditable,
      rules: curRules,
    });
  const fieldRef = useRef<{ focus: () => void }>(null);
  const [asyncValidating, setAsyncValidating] = useState(false);
  const [asyncErrMsg, setAsyncErrMsg] = useState<string>('');
  const displayContent = renderFormat(value);
  const { btnType, submitText, cancelText } = operationButton;
  const fieldProps = {
    value: editValue,
    onChange: setEditValue,
  };

  useEffect(() => {
    editing && fieldRef.current?.focus();
  }, [editing]);

  const onEditIncoClick = () => {
    if (disabled) {
      return;
    }
    startEditing();
  };

  const onBlur = async () => {
    /**
     * 只有通过本地校验，才触发异步校验
     */
    if (!valid || !enableAsyncValidateWhenBlur || typeof asyncValidator !== 'function') {
      return;
    }
    setAsyncValidating(true);
    try {
      const result = await asyncValidator(editValue);
      setAsyncValidating(false);
      setAsyncErrMsg(result || '');
    } catch (error) {
      setAsyncValidating(false);
    }
  };

  const onMouseDown = (event: React.MouseEvent<any>) => {
    event.preventDefault();
  };

  const submit = async () => {
    if (typeof asyncValidator === 'function') {
      try {
        setAsyncValidating(true);
        const result = await asyncValidator(editValue);
        setAsyncValidating(false);
        setAsyncErrMsg(result || '');
        if (result) {
          return;
        }
      } catch (error) {
        setAsyncValidating(false);
      }
    }
    handleSubmit(onSubmit);
  };

  const cancel = () => {
    if (submitting || asyncValidating) {
      return;
    }
    // 重置异步校验状态
    setAsyncErrMsg('');
    handleCancel(onCancel);
  };

  const wrapperProps = {
    style,
    'data-cy': testId.container,
    'data-testid': testId.container,
    className: cx(cssPrefix``, className),
  };

  const renderEditField = () => {
    if (isValidElement(children)) {
      return cloneElement(children, fieldProps);
    }
    if (typeof children === 'function') {
      return children(fieldProps);
    }
    const status = asyncErrMsg ? 'error' : '';
    if (fieldType === 'InputNumber') {
      return (
        <InputNumber
          style={{ width: 240 }}
          data-testid={testId.inputnumber}
          {...(fieldProps as any)}
          className={cssPrefix`inputnumber`}
          ref={fieldRef}
          status={status}
          onBlur={onBlur}
          {...arcoInputNumberProps}
        />
      );
    }
    if (fieldType === 'Textarea') {
      return (
        <Input.TextArea
          style={{ width: 240 }}
          data-testid={testId.textarea}
          autoSize={{ maxRows: 3 }}
          className={cssPrefix`textarea`}
          {...(fieldProps as any)}
          ref={fieldRef}
          onPressEnter={submit}
          status={status}
          onBlur={onBlur}
          {...arcoTextareaProps}
        />
      );
    }
    if (fieldType === 'Select') {
      return (
        <Select
          options={options}
          data-testid={testId.select}
          {...(fieldProps as any)}
          ref={fieldRef}
          className={cssPrefix`select`}
          placeholder={locale.CInlineEdit.placeholder}
          status={status}
          {...arcoSelectProps}
        />
      );
    }

    return renderBuiltIn(field, {
      commonProps: {
        ref: fieldRef,
        style: { width: 240 },
        placeholder: locale.CInlineEdit.placeholder,
        status,
        onBlur,
        ...fieldProps,
      },
      defaultPropsMap: {
        Input: {
          className: cssPrefix`input`,
          'data-testid': testId.input,
          onPressEnter: submit,
          allowClear: true,
          ...arcoInputProps,
        },
        InputNumber: {
          className: cssPrefix`inputnumber`,
          'data-testid': testId.inputnumber,
        },
        Textarea: {
          className: cssPrefix`textarea`,
          'data-testid': testId.textarea,
          autoSize: { maxRows: 3 },
        },
        Select: {
          className: cssPrefix`select`,
          'data-testid': testId.select,
        },
      },
    }) as ReactElement;
  };

  const BtnGroup = () => {
    if (btnType === 'text') {
      return (
        <div className={cssPrefix`opt`}>
          {submitting || asyncValidating ? (
            <Spin size={16} />
          ) : (
            <span
              data-testid={testId.submitOpt}
              className={cx(cssPrefix`opt__text`, {
                [cssPrefix`opt__invalid`]: !valid,
              })}
              onClick={submit}
              onMouseDown={onMouseDown}
            >
              {submitText || locale.CInlineEdit.confirm}
            </span>
          )}
          <span
            data-testid={testId.cancelOpt}
            className={cx(cssPrefix`opt__text`, cssPrefix`opt__cancel`, {
              [cssPrefix`opt__submitting`]: submitting || asyncValidating,
            })}
            onClick={cancel}
            onMouseDown={onMouseDown}
          >
            {cancelText || locale.CInlineEdit.cancel}
          </span>
        </div>
      );
    }
    return (
      <div className={cssPrefix`opt`}>
        {submitting || asyncValidating ? (
          <Spin size={16} />
        ) : (
          <IconCheck
            data-testid={testId.submitOpt}
            className={cx(cssPrefix`opt__icon`, cssPrefix`opt__check`, iconCls, {
              [cssPrefix`opt__invalid`]: !valid,
            })}
            onClick={submit}
            onMouseDown={onMouseDown}
          />
        )}
        <IconClose
          data-testid={testId.cancelOpt}
          className={cx(cssPrefix`opt__icon`, cssPrefix`opt__close`, iconCls, {
            [cssPrefix`opt__submitting`]: submitting || asyncValidating,
          })}
          onClick={cancel}
          onMouseDown={onMouseDown}
        />
      </div>
    );
  };

  const FieldWrapper = !isEmpty(curRules) ? CPopoverVerify : Fragment;
  const fieldWrapperProps: Omit<CPopoverVerifyProps, 'children'> | null = !isEmpty(curRules)
    ? { value: editValue, rules: curRules, arcoPopoverProps: { position: 'top', ...arcoPopoverProps } }
    : null;

  if (editing) {
    return (
      <div>
        <div {...wrapperProps}>
          <FieldWrapper {...fieldWrapperProps}>{renderEditField()}</FieldWrapper>
          <BtnGroup />
        </div>
        {asyncErrMsg && <div className={cssPrefix`error-message`}>{asyncErrMsg}</div>}
      </div>
    );
  }

  return (
    <div {...wrapperProps}>
      <CEllipsis
        {...CEllipsisProps}
        suffix={
          <>
            {CEllipsisProps?.suffix}
            {showEditIcon && (
              <Popover disabled={(!disabled || !disabledTips) && !editTips} content={disabledTips || editTips}>
                <IconEdit
                  className={cx(cssPrefix`edit`, iconCls, {
                    disabled,
                  })}
                  onClick={onEditIncoClick}
                  data-testid={testId.editIcon}
                />
              </Popover>
            )}
            {suffix}
          </>
        }
      >
        {isNil(displayContent) || displayContent === '' ? config?.emptyData || emptyData : displayContent}
      </CEllipsis>
    </div>
  );
}

const InnerCpn = Object.assign(createBuiltInComponent(CInlineEdit, builtInMap), {
  config(options: CInlineEditGlobalConfig) {
    globalConfig = { ...options };
  },
  displayName: 'CInlineEdit',
});

export default InnerCpn;
