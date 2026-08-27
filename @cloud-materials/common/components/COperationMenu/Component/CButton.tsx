/**
 * copy Arco Button 的实现
 * 原因：需要定制化一个没有 padding 的 text button, 如果直接在 Button 组件上通过 style/class 覆盖样式实现的话，
 * 在有 Popover 的场景下，根据 Trigger 的实现，会将 Button 上的属性移至包裹的 span 上，从而导致 Button 附加的样式丢失。
 * 定制化实现 Text Button 及 onClick 是  Promise 方法时添加 loading 效果
 */
import type { ReactNode } from 'react';
import React, { useRef, forwardRef, useContext, useState, useEffect } from 'react';
import cs from 'classnames';
import type { ButtonProps } from '@arco-design/web-react';
import { ConfigProvider, Button } from '@arco-design/web-react';
import { IconLoading } from '@arco-design/web-react/icon';
import { useMergeProps } from '../../hooks/useMergeProps';
import { useCConfigContext } from '../../CConfigProvider';

const Group = Button.Group;

const regexTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;

function processChildren(children?: ReactNode) {
  const childrenList: React.ReactNode[] = [];
  let isPrevChildPure = false;
  React.Children.forEach(children, child => {
    const isCurrentChildPure = typeof child === 'string' || typeof child === 'number';
    if (isCurrentChildPure && isPrevChildPure) {
      const lastIndex = childrenList.length - 1;
      const lastChild = childrenList[lastIndex];
      childrenList[lastIndex] = `${lastChild}${child}`;
    } else {
      childrenList.push(child);
    }
    isPrevChildPure = isCurrentChildPure;
  });
  return React.Children.map(childrenList, child => (typeof child === 'string' ? <span>{child}</span> : child));
}

const defaultProps: ButtonProps = {
  htmlType: 'button',
  type: 'default',
  shape: 'square',
};

function CButton(baseProps: ButtonProps, ref: any) {
  const props = useMergeProps<ButtonProps>(baseProps, defaultProps, {});
  const { prefixCls, autoInsertSpaceInButton, size: ctxSize } = useContext(ConfigProvider.ConfigContext);

  const {
    style,
    className,
    children,
    htmlType,
    type,
    status,
    size,
    shape,
    href,
    anchorProps,
    disabled,
    loading,
    loadingFixedWidth,
    icon,
    iconOnly,
    onClick,
    long,
    ...rest
  } = props;

  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix('operation-menu');

  const [isTwoCNChar, setIsTwoCNChar] = useState(false);
  const [promiseLoading, setPromiseLoading] = useState(false);

  const iconNode = loading || promiseLoading ? <IconLoading /> : icon;

  const innerButtonRef = useRef();
  const buttonRef = ref || innerButtonRef;
  // 标记组件是否 Mount
  const MountRef = useRef(false);

  // 记录组件挂载状态
  useEffect(() => {
    MountRef.current = true;

    return () => {
      MountRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (autoInsertSpaceInButton && buttonRef && buttonRef.current) {
      const textContent = buttonRef.current.textContent;
      if (regexTwoCNChar.test(textContent)) {
        if (!isTwoCNChar) {
          setIsTwoCNChar(true);
        }
      } else if (isTwoCNChar) {
        setIsTwoCNChar(false);
      }
    }
  }, [buttonRef.current, autoInsertSpaceInButton]);

  const cls = cssPrefix`opt-text-btn`;
  const classScopeEn = cssPrefix`opt-text-btn-en-US`;

  const isEn = locale.locale === 'en-US';
  const arcoPrefixCls = `${prefixCls}-btn`;

  const _type = type === 'default' ? 'secondary' : type;

  const classNames = cs(
    arcoPrefixCls,
    `${arcoPrefixCls}-${_type}`,
    `${arcoPrefixCls}-size-${size || ctxSize}`,
    `${arcoPrefixCls}-shape-${shape}`,
    {
      [`${arcoPrefixCls}-long`]: long,
      [`${arcoPrefixCls}-status-${status}`]: status,
      [`${arcoPrefixCls}-loading-fixed-width`]: loadingFixedWidth,
      [`${arcoPrefixCls}-loading`]: loading || promiseLoading,
      [`${arcoPrefixCls}-link`]: href,
      [`${arcoPrefixCls}-icon-only`]: iconOnly || (!children && children !== 0 && iconNode),
      [`${arcoPrefixCls}-disabled`]: disabled,
      [`${arcoPrefixCls}-two-chinese-chars`]: isTwoCNChar,
      [`${cls}`]: type === 'text',
    },
    isEn && classScopeEn,
    className,
  );

  const handleClick: React.MouseEventHandler<HTMLElement> = (event: any): void => {
    if (loading || promiseLoading) {
      typeof event?.preventDefault === 'function' && event.preventDefault();
      return;
    }

    if (!onClick) {
      return;
    }
    const result: any = onClick(event);

    if (!(result instanceof Promise)) {
      return;
    }
    setPromiseLoading(true);
    result.finally(() => {
      // 如果组件在异步操作完成时已经被卸载，则不用修改state
      if (MountRef.current) {
        setPromiseLoading(false);
      }
    });
  };

  const InnerContent = (
    <>
      {iconNode}
      {processChildren(children)}
    </>
  );

  if (href) {
    const _anchorProps: React.HTMLProps<HTMLAnchorElement> = { ...anchorProps };
    if (disabled) {
      delete _anchorProps.href;
    } else {
      _anchorProps.href = href;
    }
    return (
      <a ref={buttonRef} {...rest} {..._anchorProps} style={style} className={classNames} onClick={handleClick}>
        {InnerContent}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      {...rest}
      style={style}
      className={classNames}
      type={htmlType}
      disabled={disabled}
      onClick={handleClick}
    >
      {InnerContent}
    </button>
  );
}

const ForwardRefButton = forwardRef<any, ButtonProps>(CButton);
const CButtonComponent = ForwardRefButton as typeof ForwardRefButton & {
  __BYTE_BUTTON: boolean;
  Group: typeof Group;
};

CButtonComponent.__BYTE_BUTTON = true;
CButtonComponent.Group = Group;

CButtonComponent.displayName = 'CButton';

export default CButtonComponent;
