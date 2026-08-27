import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useSize } from 'ahooks';
import type { CCollapseProps } from './interface';
import useLimitMaxRows from '../hooks/useLimitMaxRows';
import classNames from 'classnames';
import { STATUS, useCollapse } from './hooks';
import { testId } from '.';
import { useCConfigContext } from '../CConfigProvider';

const HideStyle = {
  zIndex: -999,
  opacity: 0,
  height: 0,
};
interface CCollapseTextProps<T> extends Omit<CCollapseProps<T>, 'data'> {
  data: string;
}
const CCollapseText = <T extends any>(props: CCollapseTextProps<T>) => {
  const {
    data,
    expanded,
    showRows = 3,
    maxRows,
    className,
    style,
    operateRender,
    defaultExpanded,
    onExpandedChange,
  } = props;
  const { useCssPrefix, locale } = useCConfigContext();
  const cssPrefix = useCssPrefix('collapse');
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const { isOver, setMaxHeight } = useLimitMaxRows({
    target: textRef,
    maxRows: maxRows,
    manual: true,
  });
  const size = useSize(containerRef);

  const [{ showOpt, status, sliceIndex, expand }, { handleExpand, handleCollapse }] = useCollapse({
    ref: textRef,
    showRows,
    defaultExpanded,
    expanded,
    length: data.length,
    containerWidth: size?.width,
  });

  useLayoutEffect(() => {
    if (defaultExpanded) {
      setMaxHeight();
    }
  }, []);

  useEffect(() => {
    onExpandedChange?.(expand);
  }, [expand]);

  useLayoutEffect(() => {
    if (status === STATUS.START) {
      setMaxHeight();
    }
  }, [status, maxRows]);

  const displayData = data.slice(0, sliceIndex);

  // 展开收起操作样式
  const renderTextOperate = () => {
    // 非数组
    let innerRender;
    if (operateRender) {
      innerRender = operateRender(expand);
    } else {
      innerRender = expand ? locale.CCollapse.close : locale.CCollapse.expand;
    }
    return (
      <div
        className={cssPrefix`operation`}
        data-cy={testId.operate}
        onClick={() => {
          if (expand) {
            handleCollapse();
          } else {
            handleExpand();
          }
        }}
      >
        {innerRender}
      </div>
    );
  };

  return (
    <div
      style={{ width: '100%', ...style }}
      className={classNames(cssPrefix``, cssPrefix`text`, className)}
      ref={containerRef}
      data-cy={testId.container}
    >
      <div className={classNames(cssPrefix`text-container`, isOver && expand ? 'over' : '')}>
        <div className={cssPrefix`text-content`} style={status !== STATUS.END ? HideStyle : undefined} ref={textRef}>
          {status !== STATUS.END ? (
            <>
              {Array.from(displayData).map((item, index) => {
                return (
                  <span key={index} className={cssPrefix`text-letter`}>
                    {item}
                  </span>
                );
              })}
              {showOpt && !expand && <span className={cssPrefix`text-ellipsis`}>...</span>}
            </>
          ) : (
            <>
              {displayData}
              {showOpt && !expand && <>...</>}
            </>
          )}
        </div>
      </div>
      {showOpt && renderTextOperate()}
    </div>
  );
};

export default CCollapseText;
