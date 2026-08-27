import React from 'react';
import classNames from 'classnames';
import { InputTag, Tag, Popover } from '@arco-design/web-react';
import type { CBatchPasteInputProps, CBatchPasteInputValueType } from './interface';
import { isLegalIp } from './utils';
import { useCBatchPasteInput } from './hooks';
import { useCConfigContext } from '../CConfigProvider';
import { IconClose } from '@arco-design/iconbox-react-ve-o-design';
import { isFunction } from 'lodash-es';

const CBatchPasteInput: React.FC<CBatchPasteInputProps> = props => {
  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix('batch-paste');
  const {
    onChange,
    onInputChange,
    onPaste,
    onSplit,
    saveOnBlur = true,
    labelInValue = false,
    placeholder = locale.CBatchPasteInput.defaultPlaceholder,
    tagValidator,
    value,
    defaultValue,
    inputValue,
    separator,
    style,
    className,
    validatorMode,
    arcoTagProps,
    tagTips,
    ...otherProps
  } = props;

  const [cBatchPasteStatus, cBatchPasteStatusControl] = useCBatchPasteInput({
    value,
    defaultValue,
    inputValue,
    separator,
    onChange,
    labelInValue,
    onSplit,
  });

  // 自定义输入框tag样式
  const tagRender = (
    props: {
      value: any;
      label: React.ReactNode;
      closable: boolean;
      onClose: (event: any) => void;
    },
    tagIndex: number,
    values: CBatchPasteInputValueType[],
  ) => {
    const { label, value, closable, onClose } = props;
    let validatorResult = true;
    if (tagValidator) {
      validatorResult = tagValidator(value);
    } else {
      validatorResult = validatorMode ? isLegalIp(value, validatorMode) : true;
    }

    const finalArcoTagProps = isFunction(arcoTagProps) ? arcoTagProps({ value, values, tagIndex }) : arcoTagProps;

    const TagContent = (
      <Tag
        closable={closable}
        onClose={onClose}
        closeIcon={<IconClose />}
        {...finalArcoTagProps}
        className={classNames(
          cssPrefix`tag`,
          validatorResult ? cssPrefix`tag-normal` : cssPrefix`tag-error`,
          finalArcoTagProps?.className,
        )}
      >
        {label}
      </Tag>
    );
    return tagTips ? <Popover content={tagTips}>{TagContent}</Popover> : TagContent;
  };

  return (
    <InputTag
      data-cy="batch-paste-input"
      className={classNames(cssPrefix`input`, className)}
      style={style}
      allowClear
      icon={{ removeIcon: <IconClose />, clearIcon: <IconClose /> }}
      placeholder={placeholder}
      renderTag={tagRender}
      defaultValue={[]}
      onChange={v => {
        // 输入回车触发,且value不重复时触发
        cBatchPasteStatusControl.handleOnChange(v);
      }}
      value={cBatchPasteStatus.value} // 设置为受控的
      onPaste={async e => {
        // 粘贴时触发
        cBatchPasteStatusControl.handlePaste(e);
        // 调用用户传入的onPaste
        onPaste?.(e);
      }}
      inputValue={cBatchPasteStatus.inputValue} // 设置为受控的
      onInputChange={inputValue => {
        // 输入改变触发
        cBatchPasteStatusControl.handleInputChange(inputValue);
        // 调用用户传入的onInputChange
        onInputChange?.(inputValue);
      }}
      saveOnBlur={saveOnBlur}
      onBlur={() => {
        cBatchPasteStatusControl.setInputValue('');
      }}
      {...otherProps}
    />
  );
};

CBatchPasteInput.displayName = 'CBatchPasteInput';

export default CBatchPasteInput;
