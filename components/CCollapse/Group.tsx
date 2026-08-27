import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Popover } from '@arco-design/web-react';
import { useSize } from 'ahooks';
import type { CCollapseProps } from './interface';
import useLimitMaxRows from '../hooks/useLimitMaxRows';
import classNames from 'classnames';
import { STATUS, useCollapse } from './hooks';
import { testId } from '.';
import CTag from '../CTag';
import { useCConfigContext } from '../CConfigProvider';

export type GetItemKeyType<T> = (item: T) => string;

const HideStyle = {
  zIndex: -999,
  opacity: 0,
  height: 0,
};
interface CCollapseGroupProps<T> extends Omit<CCollapseProps<T>, 'data'> {
  data: T[];
}
const CCollapseGroup = <T extends any>(props: CCollapseGroupProps<T>) => {
  const {
    data,
    className,
    style,
    expanded,
    showRows = 3,
    showCount,
    maxRows,
    itemRender,
    operateRender,
    extraRender,
    defaultExpanded,
    onExpandedChange,
    mode,
    arcoPopoverProps,
    itemKey,
    suffixRender,
  } = props;
  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix('collapse');

  const containerRef = useRef(null);
  const groupRef = useRef(null);
  const popoverRef = useRef(null);
  const maxRowsContainerRef = mode === 'popover' ? popoverRef : groupRef;
  const { onVisibleChange, className: popoverClassName, ...restPopoverProps } = arcoPopoverProps || {};

  const { isOver: overHeight, setMaxHeight } = useLimitMaxRows({
    target: maxRowsContainerRef,
    maxRows: maxRows,
    manual: true,
  });

  const size = useSize(containerRef);
  const [{ showOpt, status, sliceIndex, expand }, { handleExpand, handleCollapse }] = useCollapse({
    ref: groupRef,
    showRows,
    defaultExpanded,
    expanded,
    length: data.length,
    showCount,
    containerWidth: size?.width,
  });

  useEffect(() => {
    onExpandedChange?.(expand);
  }, [expand]);

  useLayoutEffect(() => {
    if (status === STATUS.END && expand) {
      setMaxHeight();
    }
  }, [status, expand, maxRows]);

  const getItemKey: GetItemKeyType<T> = useMemo(() => {
    if (typeof itemKey === 'function') {
      return item => itemKey(item);
    }

    return item => (item as any)[itemKey!];
  }, [itemKey]);

  const displayData = data.slice(0, sliceIndex);

  const renderGroupItem = (item: T, index: number, isInPopover?: boolean) => {
    return itemRender ? (
      <div className={cssPrefix`group-item`} key={itemKey ? getItemKey(item) : index}>
        {itemRender(item, index, isInPopover)}
      </div>
    ) : (
      <div className={cssPrefix`group-item`} key={itemKey ? getItemKey(item) : index}>
        <CTag type={isInPopover ? 'outline' : undefined}>{item as any}</CTag>
      </div>
    );
  };

  const renderDefaultGroupOperate = (isExpanded: boolean) => {
    const restCount = data.length - sliceIndex;
    if (!showOpt) {
      return null;
    }
    if (operateRender) {
      return (
        // 自定义 render 也需要加外层，用来固定外层高度，需计算操作符是否和前一个元素在同一行，避免自定义样式导致计算失效。
        <div
          className={cssPrefix`operation`}
          onClick={isExpanded ? handleCollapse : handleExpand}
          data-cy={testId.operate}
        >
          {operateRender(isExpanded, restCount)}
        </div>
      );
    }
    return (
      <div
        className={cssPrefix`operation`}
        onClick={isExpanded ? handleCollapse : handleExpand}
        data-cy={testId.operate}
      >
        {isExpanded ? locale.CCollapse.close : `${locale.CCollapse.expand}(${data.length - sliceIndex})`}
      </div>
    );
  };

  // 展开收起默认样式
  const renderDefaultGroup = () => {
    let followOptRender;
    if (expand) {
      if (!overHeight) {
        followOptRender = renderDefaultGroupOperate(expand);
      }
    } else {
      followOptRender = renderDefaultGroupOperate(expand);
    }
    return (
      <>
        <div className={classNames(cssPrefix`group-container`, overHeight && expand ? 'over' : '')}>
          <div
            className={cssPrefix`group-content`}
            style={status !== STATUS.END ? HideStyle : undefined}
            ref={groupRef}
          >
            {displayData.map((item, index) => {
              return renderGroupItem(item, index);
            })}
            {followOptRender}
          </div>
        </div>
        {expand && overHeight && renderDefaultGroupOperate(true)}
      </>
    );
  };
  const renderPopoverGroup = () => {
    const restData = data.slice(sliceIndex);
    return (
      <div className={cssPrefix`group-content`} ref={groupRef} style={status !== STATUS.END ? HideStyle : undefined}>
        {displayData.map((item, index) => {
          return renderGroupItem(item, index);
        })}
        {showOpt && (
          <Popover
            unmountOnExit={false}
            onVisibleChange={visible => {
              if (visible) {
                setTimeout(() => {
                  setMaxHeight();
                }, 1);
              }
              onVisibleChange?.(visible);
            }}
            className={classNames(cssPrefix`group-popover`, popoverClassName)}
            content={
              <>
                <div className={cssPrefix`group-popover-content`} ref={popoverRef}>
                  {restData.map((item, index) => {
                    return renderGroupItem(item, index, true);
                  })}
                </div>
                {extraRender ? extraRender() : null}
              </>
            }
            position={'right'}
            {...restPopoverProps}
          >
            <div className={cssPrefix`operation`} data-cy={testId.operate}>
              {operateRender ? (
                operateRender(false, restData.length)
              ) : (
                <CTag type="outline" shape="round">
                  +{restData.length}
                </CTag>
              )}
            </div>
          </Popover>
        )}
        {suffixRender && <div className={cssPrefix`suffix`}>{suffixRender}</div>}
      </div>
    );
  };

  return (
    <div
      style={{ width: '100%', ...style }}
      className={classNames(cssPrefix``, cssPrefix`group`, className)}
      ref={containerRef}
      data-cy={testId.container}
    >
      {mode === 'popover' ? renderPopoverGroup() : renderDefaultGroup()}
    </div>
  );
};

export default CCollapseGroup;
