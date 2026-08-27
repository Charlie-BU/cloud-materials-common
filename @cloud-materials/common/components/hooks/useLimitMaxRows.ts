import { useSize } from 'ahooks';
import { useLayoutEffect, useState } from 'react';
import { getTargetElement } from '../_utils/getTargetElement';

interface UseLimitMaxRowsProps {
  // 列表父元素，ref 或者 dom 元素，默认将 maxHeight 设置到该元素上
  target: any;
  // 最大行数，不传不生效
  maxRows?: number;
  // 是否手动设置，通过调用 setMaxHeight 来生效
  manual?: boolean;
}

/**
 * 限制最大展示行数 Hook，传入父元素和最大展示行数进行计算，将最大高度设置在父元素上
 */
const useLimitMaxRows = (props: UseLimitMaxRowsProps) => {
  const { target, maxRows, manual } = props;
  const [isOver, setIsOver] = useState(false);
  const [maxHeight, setMaxHeightValue] = useState<number | undefined>();
  const size = useSize(target);
  const setMaxHeight = () => {
    const targetDom = getTargetElement(target);
    if (!maxRows) {
      return;
    }
    const children = targetDom?.children || [];
    if (!children.length) {
      return;
    }
    let line = 1;
    let isOver = false;
    let offsetTop = children[0].offsetTop;
    let totalHeight = offsetTop;
    const parentStyle = window.getComputedStyle(targetDom);
    const paddingTop = parseInt(parentStyle.paddingTop);
    const paddingBottom = parseInt(parentStyle.paddingBottom);
    const boxSizing = parentStyle.boxSizing;
    for (let i = 1; i < children.length; i++) {
      const childTop = children[i].offsetTop;
      const clientHeight = children[i].getBoundingClientRect().height;
      if (childTop > offsetTop) {
        // 换行
        offsetTop = childTop;
        totalHeight = childTop;
        line++;
        if (line > maxRows) {
          isOver = true;
          totalHeight += Math.floor(clientHeight / 2);
          // 需要减掉父元素的 padding。
          if (boxSizing === 'content-box') {
            totalHeight = totalHeight - paddingTop - paddingBottom;
          }
          break;
        }
      }
    }

    if (isOver) {
      setMaxHeightValue(totalHeight);
      targetDom.style.maxHeight = `${totalHeight}px`;
      targetDom.style.overflow = 'auto';
      setIsOver(true);
    } else {
      setMaxHeightValue(undefined);
      targetDom.style.maxHeight = 'none';
      targetDom.style.overflow = 'visible';
      setIsOver(false);
    }
  };
  useLayoutEffect(() => {
    if (!manual && size) {
      setMaxHeight();
    }
  }, [size]);

  return { isOver, maxHeight, setMaxHeight };
};
export default useLimitMaxRows;
