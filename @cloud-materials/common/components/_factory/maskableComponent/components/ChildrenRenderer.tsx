import type { AlertProps } from '@arco-design/web-react';
import { Alert } from '@arco-design/web-react';
import useResizeObserver from '@react-hook/resize-observer';
import classNames from 'classnames';
import { isNumber, isString } from 'lodash-es';
import React, { useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { useCConfigContext } from '../../../CConfigProvider';
import { useAutoRef } from '../../../hooks';
import type { AlertContentType, MaskableAlertProps } from '../interface';
import { useScrollPosition } from '../hooks/useScrollShadow';

export interface ChildrenRendererProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  contentTop?: AlertContentType;
  contentBottom?: AlertContentType;
  children: React.ReactElement<{ children: React.ReactChild }>;
  disableScrollShadow?: boolean;
  /** 顶部有内容时，应当和下面内容有一定距离，此时需要挂载的class */
  contentClassNameWhenContentTop?: string;
  maxHeight?: number;
  onMount?: (scrollElement: HTMLDivElement, maxHeight?: number) => void;
}

export const ChildrenRenderer = React.forwardRef<HTMLDivElement, ChildrenRendererProps>(
  (
    {
      children,
      contentBottom,
      contentTop,
      disableScrollShadow,
      contentClassNameWhenContentTop,
      maxHeight,
      onMount,
      ...resetProps
    },
    ref,
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const contentTopRef = useRef<HTMLDivElement>(null);
    const contentBottomRef = useRef<HTMLDivElement>(null);
    const [overflow, setOverflow] = useState(!Boolean(maxHeight));
    const onMountRef = useAutoRef(onMount);
    const [shouldTopShadow, shouldBottomShadow] = useScrollPosition(scrollRef);

    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => scrollRef.current);

    let contentTopNode = renderAlert(contentTop);
    let contentTopNodeInScrollBox = contentTopNode;
    let contentBottomNode = renderAlert(contentBottom);
    let contentBottomNodeInScrollBox = contentBottomNode;

    if (contentTop && (contentTop as MaskableAlertProps).sticky === false) {
      contentTopNode = null;
    } else {
      contentTopNodeInScrollBox = null;
    }

    if (contentBottom && (contentBottom as MaskableAlertProps).sticky === false) {
      contentBottomNode = null;
    } else {
      contentBottomNodeInScrollBox = null;
    }

    const { useCssPrefix } = useCConfigContext();
    const cssPrefix = useCssPrefix('maskable-children-renderer');

    const checkOverflow = (element: Element) => {
      if (maxHeight) {
        setOverflow(
          element.scrollHeight >
            maxHeight - (contentTopRef.current?.clientHeight ?? 0) - (contentBottomRef.current?.clientHeight ?? 0),
        );
      }
    };

    useLayoutEffect(() => {
      onMountRef.current?.(scrollRef.current!, maxHeight);
      checkOverflow(scrollRef.current!);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxHeight]);

    useResizeObserver(scrollRef, ({ target }) => {
      checkOverflow(target);
    });

    return (
      <>
        {contentTopNode && (
          <div className={cssPrefix`both-end`} ref={contentTopRef}>
            {contentTopNode}
          </div>
        )}
        <div className={cssPrefix``}>
          <div
            className={classNames(
              cssPrefix`scroll`,
              shouldTopShadow && cssPrefix`scroll-top-shadow`,
              shouldBottomShadow && cssPrefix`scroll-bottom-shadow`,
            )}
            ref={scrollRef}
            data-testid="maskable-scroll"
            style={{ overflow: overflow ? 'auto' : '' }}
          >
            {/* 这里的空div是为了适配form的top，防止top被传送到下面去了 */}
            <div>{contentTopNodeInScrollBox}</div>
            <div
              {...resetProps}
              className={classNames(
                resetProps.className,
                Boolean(contentTopNode ?? contentTopNodeInScrollBox) && contentClassNameWhenContentTop,
              )}
            >
              {children}
            </div>
            {contentBottomNodeInScrollBox}
          </div>
          {!disableScrollShadow && (
            // 内阴影需要单独起元素盖在上面，不然内容会在阴影上方
            <div
              className={classNames(
                cssPrefix`shadow`,
                shouldTopShadow && cssPrefix`shadow-top`,
                shouldBottomShadow && cssPrefix`shadow-bottom`,
              )}
              data-testid="maskable-shadow"
            />
          )}
        </div>
        {contentBottomNode && (
          <div className={cssPrefix`both-end`} ref={contentBottomRef}>
            {contentBottomNode}
          </div>
        )}
      </>
    );
  },
);

ChildrenRenderer.displayName = 'ChildrenRenderer';

export const isMaskableAlertType = (contentTop: AlertContentType): contentTop is MaskableAlertProps => {
  // 不是 reactElement，但是是对象
  if (contentTop && !React.isValidElement(contentTop) && typeof contentTop === 'object') {
    return true;
  }

  return false;
};

export function renderAlert(
  alert?: AlertContentType,
  options: {
    ref?: React.RefObject<HTMLElement>;
    extraProps?: AlertProps;
  } = {},
) {
  const { ref, extraProps } = options;

  if (isString(alert) || isNumber(alert)) {
    return <Alert {...extraProps} content={alert} ref={ref} />;
  }

  if (!isMaskableAlertType(alert)) {
    return alert;
  }

  if (alert.type === 'custom') {
    return alert.content;
  }

  if (!alert.content) {
    return null;
  }

  const { sticky: _, ...restProps } = alert;

  return <Alert {...extraProps} {...(restProps as AlertProps)} ref={ref} />;
}
