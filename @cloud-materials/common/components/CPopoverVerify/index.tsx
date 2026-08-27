import React, { useMemo, useState, useEffect, useRef } from 'react';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { Popover } from '@arco-design/web-react';
import { ICONS, formatRules } from './util';
import type { CPopoverVerifyProps } from './interface';
import classNames from 'classnames';
import { useValidate } from '../hooks';
import { useCConfigContext } from '../CConfigProvider';

export const cssPrefix = classNamePrefixFactory('popover-verify');

export const testId = {
  container: cssPrefix`container`,
  popover: cssPrefix`popover`,
};

enum RuleStatus {
  INIT = 'init',
  ERROR = 'error',
  SUCCESS = 'success',
}

const getIcon = (status: RuleStatus) => {
  switch (status) {
    case RuleStatus.INIT:
      return ICONS.init;
    case RuleStatus.ERROR:
      return ICONS.error;
    default:
      return ICONS.success;
  }
};

const CPopoverVerify = (props: CPopoverVerifyProps) => {
  const {
    rules,
    value,
    error: arcoFromItemError = false,
    onChange,
    arcoPopoverProps = {},
    children,
    errorKeys,
    className,
    style,
    validateOnRulesChange,
  } = props;

  const { getCPrefixCls } = useCConfigContext();
  const popoverVerifyCls = getCPrefixCls('popover-verify');
  const _rules = useMemo(() => formatRules(rules || []), [rules]);
  const [successFlag, setSuccessFlag] = useState(true); // 表示校验结果，不显示 children 的 error
  // 一直在进行实时校验
  const { isInit, errors } = useValidate({
    value,
    rules: _rules,
    validateOnRulesChange,
  });

  useEffect(() => {
    setSuccessFlag(errors.length === 0 || (errors.length > 0 && isInit && (value === '' || value === undefined)));
  }, [value, errors, isInit]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const getRuleStatus = (key: string | number) => {
    // 1. 外部校验：errorKeys
    if (errorKeys) {
      if (errorKeys.includes(key)) {
        return RuleStatus.ERROR;
      }
    } else {
      // 2. 内部校验
      // 一直在实时校验，但是在不同的编辑状态下，显示 icon 的状态可能不同

      // 在一般的没有编辑（isInit）的状态下，rule 状态显示为 init
      // 在已经编辑的状态下，rule 显示为 error + success
      // 在没有编辑（isInit）+ arcoFromItemError 状态下，rule 显示为 error + success

      // 因此这里可得到严格为 init 的条件
      if (!arcoFromItemError && isInit && (value === undefined || value === '')) {
        return RuleStatus.INIT;
      }
      if (errors.length > 0) {
        if (errors.map(error => error.key).includes(key)) {
          return RuleStatus.ERROR;
        }
        return RuleStatus.SUCCESS;
      }
    }
    return RuleStatus.SUCCESS;
  };

  // useEffect(() => {
  //   const handleFocusIn = () => {
  //     setFocus(true);
  //   };

  //   const handleFocusOut = () => {
  //     setFocus(false);
  //   };

  //   if (containerRef.current) {
  //     const observerRefValue = containerRef.current;
  //     observerRefValue.addEventListener('focusin', handleFocusIn);
  //     observerRefValue.addEventListener('focusout', handleFocusOut);
  //     return () => {
  //       observerRefValue.removeEventListener('focusin', handleFocusIn);
  //       observerRefValue.removeEventListener('focusout', handleFocusOut);
  //     };
  //   }
  // }, []);

  const renderRules = () => {
    if (!_rules?.length) {
      return null;
    }
    return (
      <div data-testid={testId.popover} data-cy={testId.popover}>
        {_rules.map(({ key, message }) => {
          const status = getRuleStatus(key);
          return (
            <div key={key} className={classNames(`${popoverVerifyCls}-rule`, `${popoverVerifyCls}-${status}-rule`)}>
              <span className={`${popoverVerifyCls}-rule-icon`}>{getIcon(status!)}</span>
              <span className={`${popoverVerifyCls}-rule-desc`}>{message}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const childrenWithProps =
    children && React.Children.only(children)
      ? React.cloneElement(children, {
          onChange: (val: any, e: any) => {
            // children 本身带的 onChange
            children.props?.onChange?.(val, e);
            // form 透传的 onChange
            if (onChange) {
              onChange(val, e);
            }
          },
          error: successFlag ? undefined : 'true',
          ...(value === undefined ? {} : { value }),
        })
      : null;

  return (
    <div
      data-testid={testId.container}
      data-cy={testId.container}
      ref={containerRef}
      style={style}
      className={classNames(popoverVerifyCls, className)}
    >
      <Popover
        disabled={!rules}
        content={renderRules()}
        position="right"
        trigger={['focus']}
        {...arcoPopoverProps}
        className={classNames(`${popoverVerifyCls}-popover`, arcoPopoverProps?.className)}
      >
        {childrenWithProps}
      </Popover>
    </div>
  );
};

CPopoverVerify.displayName = 'CPopoverVerify';

export default CPopoverVerify;
