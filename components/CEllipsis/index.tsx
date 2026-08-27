import React, { useMemo, useRef } from 'react';
import { isNil, noop, omit } from 'lodash-es';
import cx from 'classnames';
import type { CEllipsisProps } from './interface';
import classNamePrefixFactory from '../_utils/classNamePrefixFactory';
import { useCEllipsis } from './hooks';
import CCopy from '../CCopy';
import { getChildrenString } from '../_utils/reactChildren';
import { Popover } from '@arco-design/web-react';
import { useCConfigContext } from '../CConfigProvider';

const cssRoot = classNamePrefixFactory('ellipsis');
export const testId = {
  container: cssRoot`container`,
  content: cssRoot`content`,
  copy: cssRoot`copy`,
};

function CEllipsis(props: CEllipsisProps) {
  const {
    children,
    content,
    maxWidth,
    popoverContent,
    arcoPopoverProps,
    showPopover = 'auto',
    copyPosition = 'Container',
    showCopy = false,
    cCopyProps,
    style,
    suffix,
    onClick = noop,
    defaultText = '-',
    className,
  } = props;
  const { useCssPrefix } = useCConfigContext();
  const cssPrefix = useCssPrefix('ellipsis');
  const popoverCssPrefix = useCssPrefix('ellipsis-popover');
  const contentRef = useRef<HTMLParagraphElement>(null);
  const text = useMemo(() => children ?? content, [children, content]);
  const [{ isTextOverflow }] = useCEllipsis(contentRef);
  const disabled = showPopover === false || (showPopover === 'auto' && !isTextOverflow);

  const popContent = popoverContent || arcoPopoverProps?.content || text;
  const renderedPopContent =
    typeof popContent === 'function' ? popContent(isTextOverflow, getChildrenString(text)) : popContent;
  const popContentWithCopy =
    showCopy === true && copyPosition === 'Popover' ? (
      <>
        {renderedPopContent}
        <CCopy
          className={popoverCssPrefix`copy`}
          text={cCopyProps?.text || getChildrenString(renderedPopContent)}
          {...omit(cCopyProps, 'text')}
        />
      </>
    ) : (
      renderedPopContent
    );
  /** Copy 组件 hover 或固定渲染在容器中 */
  const copyInContainer = showCopy && copyPosition === 'Container';
  /** Copy 组件当 hover 时才渲染在容器中 */
  const copyInContainerByHover = copyInContainer && showCopy === 'hover';

  return (
    <div
      style={{
        maxWidth: maxWidth || '100%',
        ...style,
      }}
      className={cx(cssPrefix``, className, {
        [cssPrefix`copy`]: copyInContainerByHover,
      })}
      data-cy={testId.container}
      data-testid={testId.container}
    >
      <Popover
        className={cx(popoverCssPrefix``, {
          [popoverCssPrefix`disabled`]: disabled,
        })}
        // 由于 Popover 内部会进行 style: display 赋值，会覆盖外部传入的 display 值
        // 因此以下的 style: display 不生效
        // style={{
        //   display: disabled ? 'none' : '',
        // }}
        disabled={disabled}
        // Arco Popover 的 Bug, 当存在 extra 节点时，需特殊设置
        // popupVisible={arcoPopoverProps?.popupVisible || (isHover && !disabled)}
        content={popContentWithCopy}
        {...omit(arcoPopoverProps, 'content')}
      >
        <span
          ref={contentRef}
          data-testid={testId.content}
          className={cx(cssPrefix`content`, {
            [cssPrefix`pointer`]: !disabled,
            [cssPrefix`content__copy`]: copyInContainerByHover,
          })}
          onClick={onClick}
        >
          {isNil(text) || text === '' ? defaultText : text}
        </span>
      </Popover>
      {(copyInContainer || !!suffix) && (
        <div className={cssPrefix`extra`}>
          {copyInContainer && (
            <CCopy
              data-testid={testId.copy}
              text={cCopyProps?.text || getChildrenString(text)}
              {...omit(cCopyProps, 'text')}
              className={cx({
                [cssPrefix`hidden`]: showCopy === 'hover',
              })}
            />
          )}
          {!!suffix && typeof suffix === 'function' ? suffix() : suffix}
        </div>
      )}
    </div>
  );
}

CEllipsis.displayName = 'CEllipsis';

export default CEllipsis;

export { useCEllipsis } from './hooks';
