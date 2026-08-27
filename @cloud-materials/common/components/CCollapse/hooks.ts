import type React from 'react';
import { useLayoutEffect, useState } from 'react';
import { useUpdateEffect, useUpdateLayoutEffect } from 'ahooks';

export enum STATUS {
  INIT, // 初始状态
  START, // 开始计算
  MEASURING, // 调整计算位置
  END, // 计算完成
}
interface CollapseProps {
  /**
   * @zh 包裹列表的父元素
   */
  ref: React.MutableRefObject<any>;
  /**
   * @zh 默认展示行数
   */
  showRows: number;
  /**
   * 数据长度
   */
  length: number;
  /**
   * 默认展示数量
   */
  showCount?: number;
  /**
   * 外层容器宽度
   */
  containerWidth?: number;
  /**
   * 是否默认展开
   */
  defaultExpanded?: boolean;
  /**
   * 受控模式控制
   */
  expanded?: boolean;
}

export function useCollapse(props: CollapseProps) {
  const { ref, showRows, length, showCount, containerWidth, defaultExpanded, expanded } = props;
  const defaultSliceIndex = defaultExpanded || expanded ? length : showCount || length;

  const [showOpt, setShowOpt] = useState(false);
  const [sliceIndex, setSliceIndex] = useState(defaultSliceIndex);
  const [status, setStatus] = useState(STATUS.INIT);
  const [expand, setExpand] = useState(false);

  // 初步计算出截断位置
  const getFirstMeasure = () => {
    const children = ref.current?.children || [];

    let line = 1;
    let offsetTop = children[0].offsetTop;
    let enough = true;
    let sliceIndex = length;
    for (let i = 0; i < children.length; i++) {
      const childTop = children[i].offsetTop;
      if (childTop > offsetTop) {
        // 换行
        offsetTop = childTop;
        line++;
        if (line > showRows) {
          enough = false;
          sliceIndex = i;
          break;
        }
      }
    }
    return {
      enough: enough,
      sliceIndex: sliceIndex,
    };
  };

  // 重新开始计算
  const recalculate = () => {
    setSliceIndex(showCount || length);
    setStatus(STATUS.START);
  };

  const handleCalEnd = (finalSliceIndex: number) => {
    setSliceIndex(finalSliceIndex);
    setShowOpt(finalSliceIndex < length);
    setStatus(STATUS.END);
  };

  // 将省略号或者展开收起放进去进行计算
  const putEllipsis = () => {
    // 对比最后一个元素（展开收起）和倒数第二个元素的 offsetTop 值。
    const maxOffsetTop = ref.current?.children[sliceIndex - 2 < 0 ? 0 : sliceIndex - 2]?.offsetTop;
    const lastTop = ref.current?.lastElementChild?.offsetTop;
    if (lastTop !== maxOffsetTop) {
      setSliceIndex(sliceIndex - 1);
    } else {
      handleCalEnd(sliceIndex);
    }
  };

  const measure = () => {
    switch (status) {
      case STATUS.START: {
        if (showCount !== undefined) {
          handleCalEnd(showCount < length ? showCount : length);
          return;
        }
        const { enough, sliceIndex } = getFirstMeasure();
        if (enough) {
          handleCalEnd(sliceIndex);
        } else {
          setSliceIndex(sliceIndex);
          setShowOpt(true); // 操作符放到界面上，进行下一步计算
          setStatus(STATUS.MEASURING);
        }
        break;
      }
      case STATUS.MEASURING:
        putEllipsis();
        break;
      default:
        break;
    }
  };

  useLayoutEffect(() => {
    measure();
  }, [sliceIndex, status]);

  useUpdateEffect(() => {
    // 外部控制状态
    if (expanded !== undefined) {
      if (expanded) {
        handleExpand();
      } else {
        handleCollapse();
      }
    }
  }, [expanded]);

  useLayoutEffect(() => {
    if (defaultExpanded || expanded) {
      if (showCount !== undefined) {
        setShowOpt(showCount < length);
      } else {
        const { enough } = getFirstMeasure();
        if (!enough) {
          setShowOpt(true);
        }
      }
      setStatus(STATUS.END);
      setExpand(true);
    }
  }, []);

  useUpdateLayoutEffect(() => {
    // 正在计算中，不处理
    if (status === STATUS.MEASURING || !containerWidth) {
      return;
    }
    if (!expand) {
      recalculate();
    }
  }, [containerWidth]);

  useUpdateEffect(() => {
    recalculate();
  }, [showCount, showRows, length]);

  const handleExpand = () => {
    setSliceIndex(length);
    setExpand(true);
  };

  const handleCollapse = () => {
    recalculate();
    setExpand(false);
  };
  const state = { showOpt, expand, sliceIndex, status };
  const controls = { handleCollapse, handleExpand };
  return [state, controls] as const;
}
