import React, { useState } from 'react';
import { Input, Popconfirm, Popover } from '@arco-design/web-react';
import { IconEdit } from '@arco-design/web-react/icon';
import cs from 'classnames';

import { useMergeProps } from '../hooks/useMergeProps';
import { useCConfigContext } from '../CConfigProvider';
import type { CPopupEditProps } from './interface';
import { cssPrefix } from './util';
import { useEdit } from '../hooks/useEdit';
import CEllipsis from '../CEllipsis';

const { TextArea } = Input;

const cssRoot = cssPrefix``;
export const testId = {
  container: `${cssRoot}-container`,
  input: `${cssRoot}-input`,
  textArea: `${cssRoot}-textArea`,
  title: `${cssRoot}-title`,
  editIcon: `${cssRoot}-edit-icon`,
  popconfirm: `${cssRoot}-popconfirm`,
  error: `${cssRoot}-error`,
};

const getDefaultProps: (locale: any) => CPopupEditProps = (locale: any) => {
  return {
    defaultValue: '',
    type: 'input',
    placeholder: locale.CPopupEdit.placeholder,
    okButtonProps: { size: 'mini' },
    cancelButtonProps: { size: 'mini' },
    width: 240,
    showEdit: true,
    disabled: false,
    cEllipsisProps: {
      showCopy: false,
    },
    arcoPopoverProps: {
      disabled: true,
    },
    emptyNode: '-',
    maxLengthErrorMsg: locale.CPopupEdit.maxLengthErrorMsg,
  };
};

const CPopupEdit: React.FC<CPopupEditProps> = (props: CPopupEditProps) => {
  const { locale, useCssPrefix, cComponentConfig } = useCConfigContext();
  const classPrefix = useCssPrefix('popup-edit');
  const iconCls = useCssPrefix('')`icon`;
  const mergeProps = useMergeProps<CPopupEditProps>(props, getDefaultProps(locale), cComponentConfig?.CPopupEdit ?? {});
  const {
    style,
    rules,
    className,
    title,
    defaultValue,
    type,
    trigger,
    position,
    width,
    maxLength,
    placeholder,
    okButtonProps,
    cancelButtonProps,
    displayContent,
    displayEditIcon,
    cEllipsisProps,
    showCopy,
    cCopyProps,
    showEdit,
    disabled,
    arcoInputProps,
    arcoTextareaProps,
    arcoPopconfirmProps,
    arcoPopoverProps,
    suffix,
    emptyNode,
    maxLengthErrorMsg,
    onOk,
    onCancel,
  } = mergeProps;

  const newRules = rules || [];
  if (maxLength) {
    newRules.push({
      message: maxLengthErrorMsg,
      maxLength,
    });
  }
  const cNewEllipsisProps = useMergeProps({ showCopy, cCopyProps }, cEllipsisProps, {});

  const [
    {
      editValue,
      valid,
      errors: [error],
      submitting,
    },
    { setEditValue, handleSubmit, handleCancel },
  ] = useEdit({
    value: defaultValue,
    rules: newRules,
    stopAtFirstError: true,
  });
  const cNewArcoPopconfirmProps = useMergeProps(
    {
      trigger,
      position,
      cancelButtonProps,
      okButtonProps: { ...okButtonProps, disabled: !valid, loading: submitting },
    },
    arcoPopconfirmProps,
    {},
  );
  const fieldProps = {
    value: editValue,
    onChange: setEditValue,
  };
  const [visible, setVisible] = useState(showEdit);
  const [editIconIsActive, setEditIconIsActive] = useState(false);
  const [popupVisible, setPopupVisible] = useState(arcoPopconfirmProps?.popupVisible);
  const renderErrorMessage = () => {
    return (
      <>
        {error && (
          <div style={{ width: `${width}px` }} className={classPrefix`error-message`} data-testid={testId.error}>
            {error?.message}
          </div>
        )}
      </>
    );
  };
  const renderEditField = () => {
    if (type === 'input') {
      return (
        <>
          {/* 
            源力主题的问题： 只要 Input 有同层元素，focus 时就会多一个 class--->arco-input-inner-wrapper-focus:not(:first-child):not(:last-child) ； 
            会导致输入框的 border-radius 变为 0 （而不是 4），与我们的源力设计规范不符合。目前源力主题没找到原因，所以先用 div 把 Input 包起来，使其没有同层元素 
          */}
          <div>
            <Input
              allowClear
              ref={ref => ref?.focus()}
              maxLength={maxLength && { length: maxLength, errorOnly: true }}
              showWordLimit={!!maxLength}
              placeholder={placeholder}
              style={{ width: `${width}px` }}
              {...fieldProps}
              {...arcoInputProps}
              status={!!error ? 'error' : undefined}
              data-testid={testId.input}
              onPressEnter={onPressEnter}
            />
          </div>
          {renderErrorMessage()}
        </>
      );
    }
    if (type === 'textArea') {
      return (
        <>
          <div>
            <TextArea
              style={{
                minHeight: 75,
                width: `${width}px`,
              }}
              allowClear
              autoFocus
              status={!!error ? 'error' : undefined}
              maxLength={maxLength && { length: maxLength, errorOnly: true }}
              showWordLimit={!!maxLength}
              placeholder={placeholder}
              {...fieldProps}
              {...arcoTextareaProps}
              data-testid={testId.textArea}
              onPressEnter={onPressEnter}
              onFocus={e => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
            />
          </div>
          {renderErrorMessage()}
        </>
      );
    }
  };

  const onPressEnter = async () => {
    if (onOk) {
      try {
        await handleSubmit(onOk);
        setPopupVisible(false);
        setEditIconIsActive(false);
        setVisible(false);
      } catch (error) {
        setPopupVisible(true);
      }
    }
  };

  const renderEditIcon = () => {
    return (
      <Popover {...arcoPopoverProps}>
        <span
          className={cs(classPrefix`popconfirm-edit`, {
            [classPrefix`popconfirm-edit-icon-hide`]: !visible,
            [classPrefix`popconfirm-edit-icon-show`]: visible,
          })}
          style={{ marginLeft: cNewEllipsisProps?.showCopy ? '12px' : '4px' }}
          data-testid={testId.editIcon}
        >
          {mergeProps.hasOwnProperty('displayEditIcon') ? (
            displayEditIcon
          ) : (
            <IconEdit
              className={cs(iconCls, classPrefix`popconfirm-edit-icon`, {
                ['active']: editIconIsActive,
                ['disabled']: disabled,
              })}
            />
          )}
        </span>
      </Popover>
    );
  };

  const renderPopconfirmElement = () => {
    return (
      <Popconfirm
        className={cs(classPrefix`popconfirm`)}
        style={{ maxWidth: 'none', width: 'auto' }}
        icon={null}
        disabled={disabled}
        onVisibleChange={visible => {
          setPopupVisible(visible);
          if (!showEdit) {
            setVisible(visible);
          }
          setEditIconIsActive(visible);
          setEditValue(defaultValue);
        }}
        title={
          <div data-testid={testId.popconfirm}>
            {title && (
              <div className={classPrefix`popconfirm-title`} data-testid={testId.title}>
                {title}
              </div>
            )}
            {renderEditField()}
          </div>
        }
        cancelButtonProps={cancelButtonProps}
        okButtonProps={okButtonProps}
        trigger={trigger}
        onOk={() => {
          if (onOk) {
            return handleSubmit(onOk);
          }
        }}
        onCancel={() => handleCancel(onCancel)}
        position={position}
        okText={locale.CPopupEdit.confirm}
        {...cNewArcoPopconfirmProps}
        popupVisible={popupVisible}
      >
        {renderEditIcon()}
      </Popconfirm>
    );
  };

  return (
    <span
      className={cs(classPrefix``, className, {
        [classPrefix`hover-show-icon`]: !visible,
      })}
      style={{ ...style }}
      data-testid={testId.container}
    >
      <CEllipsis
        className={classPrefix`value`}
        content={<>{mergeProps.hasOwnProperty('displayContent') ? displayContent : defaultValue || emptyNode}</>}
        {...cNewEllipsisProps}
        suffix={
          <>
            {cNewEllipsisProps?.suffix && cNewEllipsisProps.suffix}
            {renderPopconfirmElement()}
            {suffix}
          </>
        }
      />
    </span>
  );
};

CPopupEdit.displayName = 'CPopupEdit';

export default CPopupEdit;
